# 03 — Reporte de aceptación
**Proyecto:** Lumera Landing Page  
**Versión evaluada:** v1.0.0 + endurecimiento de portafolio (rama `chore/portfolio-hardening`)  
**Fecha de redacción:** 2026-10-16  
**Fuente de criterios:** [01-prd.md](./01-prd.md) sección 5

> **Cómo leer este reporte.** Cada criterio tiene un estado y la evidencia que lo respalda.
> Solo se marca ✅ lo que se verificó. Lo demás queda ⬜ **Pendiente** con el comando o
> procedimiento exacto para cerrarlo. Al completar la evidencia, cambia el estado y pega el resultado.

Leyenda: ✅ Cumplido · 🟡 Cumplido con desviación documentada · ⬜ Pendiente de evidencia

---

## 1. Calidad técnica

| ID | Criterio | Estado | Evidencia / cómo verificar |
|---|---|---|---|
| CS-01 | Lighthouse ≥ 85 (Performance, Accessibility, Best Practices) | ⬜ | Correr Lighthouse (DevTools o PageSpeed Insights) sobre la URL de producción en móvil y escritorio y pegar los 3 puntajes. Antes de esta rama `public/` pesaba 40 MB; ahora 1.83 MB (ver sección 4). |
| CS-02 | `vue-tsc -b` sin errores | ⬜ | `npm ci && npm run build` → pegar la salida. |
| CS-03 | `vitest --run` sin fallos | ⬜ | `npm test` → pegar el resumen (archivos, tests, fallos). Se modificó una aserción en `Header.spec.ts` (etiqueta del botón de tienda). |
| CS-04 | Sin caracteres con encoding roto | ✅ | Búsqueda de patrones de texto mal codificado (`Ã±`, `Ã­`, `â€`…) en `src/`, `index.html` y `README.md`: sin coincidencias. Las únicas ocurrencias están en `docs/00-audit.md`, como ejemplos del problema original. |

## 2. Funcionalidad

| ID | Criterio | Estado | Evidencia / cómo verificar |
|---|---|---|---|
| CS-05 | 6 secciones + Footer en escritorio (≥ 1024 px) | ⬜ | Capturas a 1280 px de cada sección. Orden en `App.vue`: Hero, Filosofía, Tienda, Galería, Gaceta, Footer. |
| CS-06 | 6 secciones + Footer en móvil (375 px) | ⬜ | Capturas a 375 px (DevTools, modo dispositivo). |
| CS-07 | El Header aparece/desaparece según la lógica definida | ⬜ | **Sin cobertura automática:** `Header.spec.ts` solo prueba el logo, los links y el botón de tienda, no la lógica de visibilidad (`useHeaderVisibility.ts`). Verificar manualmente en escritorio y móvil y, idealmente, añadir un test del composable. |
| CS-08 | El CTA del Hero hace scroll suave | 🟡 | **Desviación:** la spec pedía un CTA "Explorar productos" hacia Tienda. La implementación tiene el botón "Descubrir", que baja a `#filosofia` (`Hero.vue`). Registrada en PRD v1.1 sección 9. Falta confirmar el scroll en el navegador. |
| CS-09 | El menú hamburger móvil abre y cierra | ⬜ | Verificación manual a 375 px: abrir con "Abrir menú" y cerrar con "Cerrar menú". |

## 3. Proceso / portafolio

| ID | Criterio | Estado | Evidencia |
|---|---|---|---|
| CS-10 | README explica el proyecto y enlaza a `/docs` | ✅ | `README.md` secciones "Proceso SDD aplicado" y "Recursos". |
| CS-11 | Existen audit, PRD y spec técnica | ✅ | `docs/00-audit.md`, `docs/01-prd.md`, `docs/02-technical-spec.md`. |
| CS-12 | Al menos 3 ADRs | ✅ | `docs/adr/0001` a `0004` (4 ADRs). |
| CS-13 | Kanban con Issues cerrados y trazables | ⬜ | No verificable desde el código. Adjuntar captura del tablero de GitHub Projects y la lista de Issues cerrados. |
| CS-14 | Commits referencian Issues | 🟡 | Todos los commits de funcionalidad desde `0a6433a` en adelante referencian un Issue (`#2` … `#23`). Seis commits no lo hacen: tres del prototipo inicial de 2025 (anteriores al proceso SDD), dos de la base documental y el de versión `1.0.0`. |

---

## 2.b Desviaciones entre spec y código

| # | Spec decía | Código hace | Resolución |
|---|---|---|---|
| D-1 | ScrollTrigger fuera de alcance | Usado en Tienda, Filosofía, Galería, Gaceta y Footer | [ADR 0004](./adr/0004-scrolltrigger-en-v1.md); PRD v1.1 |
| D-2 | CTA "Explorar productos" → `#tienda` | Botón "Descubrir" → `#filosofia` | PRD v1.1 sección 9 |
| D-3 | Orden Hero → Tienda → Filosofía (sección 4 del PRD) | Hero → Filosofía → Tienda | Orden vigente: el de `App.vue`; documentado en PRD v1.1 |

---

## 4. Anexo — Optimización de medios (cambio de esta rama)

Medido sobre los archivos de `public/`:

| Recurso | Antes | Después |
|---|---|---|
| `product_01.jpg` (5298×3027) | 13.2 MB, **solo se precargaba en `index.html`; ningún componente lo usaba** | eliminado |
| 13 imágenes PNG | 15.1 MB | 0.53 MB (WebP calidad 82) |
| `skincare_02.mp4` (Hero) | 12.1 MB, 4.0 Mbps, con pista de audio | 1.35 MB, 0.45 Mbps, sin audio (el video está silenciado) |
| Poster del video | no existía | 15 KB (WebP), se precarga |
| **Total `public/`** | **≈ 40 MB** | **1.83 MB** |

Calidad: las imágenes se compararon contra los originales con PSNR de 38.6–42.9 dB y revisión visual lado a lado; no tenían transparencia real. El video se ve ligeramente más suave en primeros planos de piel, algo que el overlay oscuro del Hero atenúa.

---

## 5. Conclusión

_(Completar al cerrar la evidencia: indicar si v1.0.1 se acepta, con qué puntajes de Lighthouse y qué criterios quedan abiertos.)_
