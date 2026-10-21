# 03 — Reporte de aceptación
**Proyecto:** Lumera Landing Page  
**Versión evaluada:** v1.0.0 + PR #27 (`chore/portfolio-hardening`) + rama `fix/mobile-layout-a11y` (revisión visual, 2026-10-19)  
**Fecha de redacción:** 2026-10-16 · **Actualizado:** 2026-10-19  
**Fuente de criterios:** [01-prd.md](./01-prd.md) sección 5

> **Cómo leer este reporte.** Cada criterio tiene un estado y la evidencia que lo respalda.
> Solo se marca ✅ lo que se verificó. Lo demás queda ⬜ **Pendiente** con el comando o
> procedimiento exacto para cerrarlo. Al completar la evidencia, cambia el estado y pega el resultado.

Leyenda: ✅ Cumplido · 🟡 Cumplido con desviación documentada · ⬜ Pendiente de evidencia

---

## 1. Calidad técnica

| ID | Criterio | Estado | Evidencia / cómo verificar |
|---|---|---|---|
| CS-01 | Lighthouse ≥ 85 (Performance, Accessibility, Best Practices) | ✅ | Producción, Chrome DevTools, modo **Mobile**, ventana de incógnito, 2 corridas el 2026-10-16: Performance **96** y **95**, Accessibility **89**, Best Practices **100**, SEO 100. FCP 2.1–2.3 s, LCP 2.1–2.4 s, TBT 0 ms, CLS 0, Speed Index 3.1 s. Detalle antes/después en la sección 4.b. Accessibility pasa con margen estrecho (4 puntos). Escritorio no medido. |
| CS-02 | `vue-tsc -b` sin errores | ✅ | `npm run build` (que ejecuta `vue-tsc -b`) pasa en el CI del PR #27 y en local (v1.0.0: 369 módulos, JS 209.14 kB / gzip 80.90 kB, CSS 34.35 kB / gzip 6.18 kB). |
| CS-03 | `vitest --run` sin fallos | ✅ | `npm test` pasa en el CI del PR #27. Línea base local en v1.0.0: Vitest 3.2.4, 7 archivos, 39 tests, todos pasan. Se modificó una aserción en `Header.spec.ts` (etiqueta del botón de tienda). |
| CS-04 | Sin caracteres con encoding roto | ✅ | Búsqueda de patrones de texto mal codificado (`Ã±`, `Ã­`, `â€`…) en `src/`, `index.html` y `README.md`: sin coincidencias. Las únicas ocurrencias están en `docs/00-audit.md`, como ejemplos del problema original. |

## 2. Funcionalidad

| ID | Criterio | Estado | Evidencia / cómo verificar |
|---|---|---|---|
| CS-05 | 6 secciones + Footer en escritorio (≥ 1024 px) | ✅ | Revisión visual por el autor con capturas de escritorio el 2026-10-19: sin defectos reportados. Orden en `App.vue`: Hero, Filosofía, Tienda, Galería, Gaceta, Footer. |
| CS-06 | 6 secciones + Footer en móvil (375 px) | ⬜ | La revisión del 2026-10-19 halló dos defectos (H-1 Filosofía, H-2 Header en Tienda), corregidos en `fix/mobile-layout-a11y`. Falta repetir la revisión a 375 px tras el fix e incluir capturas de Gaceta y Footer, que no se revisaron. |
| CS-07 | El Header aparece/desaparece según la lógica definida | ⬜ | **Sin cobertura automática:** `Header.spec.ts` solo prueba el logo, los links y el botón de tienda, no la lógica de visibilidad (`useHeaderVisibility.ts`). Se añadió `useHeaderVisibility.spec.ts` (5 tests del observador de tema) en `fix/mobile-layout-a11y`. Revisión en móvil (2026-10-19/20): el header se ve correcto en Gaceta; en el Footer debía ocultarse y no lo hacía (H-3, corregido con un observador del footer y 2 tests). Falta reverificar en móvil y escritorio. |
| CS-08 | El CTA del Hero hace scroll suave | 🟡 | **Desviación:** la spec pedía un CTA "Explorar productos" hacia Tienda. La implementación tiene el botón "Descubrir", que baja a `#filosofia` (`Hero.vue`). Registrada en PRD v1.1 sección 9. Falta confirmar el scroll en el navegador. |
| CS-09 | El menú hamburger móvil abre y cierra | ⬜ | Verificación manual a 375 px: abrir con "Abrir menú" y cerrar con "Cerrar menú". |

## 3. Proceso / portafolio

| ID | Criterio | Estado | Evidencia |
|---|---|---|---|
| CS-10 | README explica el proyecto y enlaza a `/docs` | ✅ | `README.md` secciones "Proceso SDD aplicado" y "Recursos". |
| CS-11 | Existen audit, PRD y spec técnica | ✅ | `docs/00-audit.md`, `docs/01-prd.md`, `docs/02-technical-spec.md`. |
| CS-12 | Al menos 3 ADRs | ✅ | `docs/adr/0001` a `0004` (4 ADRs). |
| CS-13 | Kanban con Issues cerrados y trazables | ✅ | Tablero de GitHub Projects revisado el 2026-10-19: 13 ítems en Done y 0 en Backlog / In Progress / In Review. Observación: los PR #25, #26 y #27 aparecen sin estado ("No Status"); moverlos a Done. |
| CS-14 | Commits referencian Issues | 🟡 | Todos los commits de funcionalidad desde `0a6433a` en adelante referencian un Issue (`#2` … `#23`). Seis commits no lo hacen: tres del prototipo inicial de 2025 (anteriores al proceso SDD), dos de la base documental y el de versión `1.0.0`. |

---

## 2.b Desviaciones entre spec y código

| # | Spec decía | Código hace | Resolución |
|---|---|---|---|
| D-1 | ScrollTrigger fuera de alcance | Usado en Tienda, Filosofía, Galería, Gaceta y Footer | [ADR 0004](./adr/0004-scrolltrigger-en-v1.md); PRD v1.1 |
| D-2 | CTA "Explorar productos" → `#tienda` | Botón "Descubrir" → `#filosofia` | PRD v1.1 sección 9 |
| D-3 | Orden Hero → Tienda → Filosofía (sección 4 del PRD) | Hero → Filosofía → Tienda | Orden vigente: el de `App.vue`; documentado en PRD v1.1 |

## 2.c Hallazgos de la revisión visual (2026-10-19)

| # | Dónde | Síntoma | Causa | Corrección |
|---|---|---|---|---|
| H-1 | Filosofía, móvil | La sección siguiente tapa parte de la card informativa | `height: 100vh` con `overflow: hidden`: el contenido apilado supera la pantalla y se recorta | `min-height: 100svh` en móvil/tablet; altura fija solo desde `$breakpoint-lg` |
| H-2 | Tienda, móvil | El Header no cambia al tema claro y se ve como en el Hero | El observador usaba `threshold: 0.5`; Tienda mide más de 2 pantallas y nunca llega al 50 % visible | Franja bajo el header (`rootMargin: "-5% 0px -90% 0px"`, `threshold: 0`); el Footer también se observa; test añadido |
| H-3 | Footer, móvil | El header seguía visible sobre el footer | `useHeaderVisibility` nunca ocultaba el header tras su primera aparición | Observador del footer sobre una franja de 96 px superior; el header se oculta al entrar y reaparece al salir |

Corrección de accesibilidad incluida: texto del botón del Hero de 3.3:1 a 8.5:1 de contraste, h2 oculto en Filosofía (orden h1 > h2 > h3) y puntos de paginación de 24×24 px.

**Pendiente (no bloqueante):** el color `$color-secondary` (#be8e6b) sobre blanco da 2.89:1 (precios, eyebrows, etiquetas, "Suscribir"). Es decisión de diseño; una variante de texto más oscura (≈ #8f6140, ≈ 5.3:1) lo resolvería. Otras oportunidades de Lighthouse: recursos que bloquean el render (≈ 450 ms), entrega de imágenes (≈ 454 KiB).

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

## 4.b Resultados de Lighthouse (móvil, producción)

| Categoría | Antes (producción con v1.0.0) | Después (producción tras el PR #27) |
|---|---|---|
| Performance | 54 (corrida incompleta: "the page loaded too slowly to finish") | **96** |
| Accessibility | 84 | **89** |
| Best Practices | 100 | **100** |
| SEO | 75 | **100** |

Métricas de la corrida "después": First Contentful Paint 2.1 s y Largest Contentful Paint 2.1 s.

Notas de método:
- Medido por el autor en Chrome DevTools (Lighthouse), modo Mobile, en ventana de incógnito. Los despliegues *preview* de Vercel exigen inicio de sesión, por lo que se midió producción.
- El "antes" quedó incompleto porque la versión anterior descargaba cerca de 40 MB y excedía el límite de tiempo de la simulación móvil; debe leerse como cota inferior, no como cifra exacta.
- Las puntuaciones de Lighthouse varían entre corridas; se reporta la captura registrada.

---

## 5. Conclusión

**Aceptación parcial.** Los criterios técnicos automatizables están cumplidos: CS-01 (Lighthouse 96 / 89 / 100 en móvil), CS-02 y CS-03 (CI en verde) y CS-04 (sin texto roto), junto con los de proceso CS-10, CS-11 y CS-12.

**Cumplidos con desviación documentada:** CS-08 (CTA "Descubrir" hacia Filosofía) y CS-14 (seis commits previos al proceso SDD sin referencia a Issue).

**Cumplidos tras esta revisión:** CS-05 (escritorio) y CS-13 (tablero).

**Pendientes de evidencia:** CS-06 y CS-07 (repetir a 375 px tras los fixes H-1 y H-2, con Gaceta y Footer) y CS-09 (menú móvil abrir/cerrar).

**Riesgo a vigilar:** Accessibility es la categoría más cercana al umbral (89 frente a 85). Conviene revisar las auditorías fallidas del informe y corregirlas en un PR pequeño.
