# 01 — Product Requirements Document (PRD)
**Proyecto:** Lumera Landing Page  
**Versión:** 1.0  
**Fecha:** 2026-06-30  
**Autor:** arqsam  
**Estado:** Draft — pendiente de validación  

---

## 1. Contexto y problema

Lumera es una marca de skincare online que necesita una landing page de alto impacto para comunicar su identidad de marca, atraer clientes potenciales y dirigirlos hacia la tienda de productos.

Actualmente existe un prototipo con la sección Hero y el Header implementados, pero la landing está incompleta: no tiene las secciones de contenido que convierten a un visitante en cliente potencial, no está documentada, y no puede desplegarse en producción.

**Problema a resolver:** Completar la landing page hasta un estado publicable, con calidad de producción, que pueda ser usada como pieza de portafolio profesional demostrando un proceso de desarrollo gestionado con metodología Spec-Driven Development.

---

## 2. Objetivo del producto

Construir una landing page completa para Lumera que:

1. Comunique la identidad de marca (elegancia, tecnología, bienestar)
2. Presente los productos de forma atractiva
3. Genere una acción de conversión (click a tienda / suscripción)
4. Sea desplegable en producción y auditable como portafolio de PM/Dev

---

## 3. Usuarios objetivo

### Persona A — Visitante potencial (usuario final de Lumera)
- Mujer 25-40 años, interesada en skincare de calidad
- Llega desde redes sociales o búsqueda orgánica
- Necesita entender en menos de 10 segundos qué es Lumera y por qué es diferente
- Acción esperada: hacer click en "Explorar productos"

### Persona B — Reclutador / evaluador técnico (usuario del portafolio)
- PM o tech lead evaluando el perfil del desarrollador
- Revisa el repo de GitHub para evaluar calidad de proceso
- Necesita ver: documentación, trazabilidad de decisiones, calidad del código, tests
- Acción esperada: leer el README, navegar `/docs`, revisar los Issues cerrados

---

## 4. Alcance — v1.0

### ✅ IN SCOPE (lo que SÍ se construye en esta versión)

| # | Sección | Descripción |
|---|---|---|
| 1 | **Header** | Navbar flotante con animación. YA EXISTE — requiere refactor de arquitectura |
| 2 | **Hero** | Sección fullscreen con video, título, subtítulo y CTA. YA EXISTE — requiere fix de encoding |
| 3 | **Tienda** | Grid de productos destacados (3-4 cards) con nombre, descripción breve y precio |
| 4 | **Filosofía** | Sección de identidad de marca: valores, misión, diferenciadores |
| 5 | **Galería** | Grid visual de imágenes de lifestyle/producto |
| 6 | **Gaceta** | Sección de contenido/blog: 2-3 artículos destacados en formato card |
| 7 | **Footer** | Links, redes sociales, copyright |
| 8 | **Documentación SDD** | `/docs`: audit, PRD, spec técnica, ADRs, README |
| 9 | **GitHub Projects** | Backlog completo con Issues trazables a esta spec |

### ❌ OUT OF SCOPE (NO va en v1.0)

- Backend o base de datos real
- Carrito de compras funcional (el ícono existe pero no conecta a nada)
- Pasarela de pagos
- CMS o sistema de gestión de contenido
- Multilenguaje (i18n)
- Modo oscuro / claro
- Animaciones de scroll avanzadas (ScrollTrigger de GSAP)
- SEO técnico avanzado (meta tags dinámicos, sitemap, schema.org)
- Analytics (Google Analytics, etc.)

---

## 5. Criterios de éxito (aceptación)

Estos criterios son la base del `03-acceptance-report.md` que se completará al final del proyecto.

### Calidad técnica
- [ ] **CS-01** — Score de Lighthouse ≥ 85 en Performance, Accessibility y Best Practices (medido en producción o preview)
- [ ] **CS-02** — Cero errores de TypeScript en build (`vue-tsc -b` pasa sin errores)
- [ ] **CS-03** — Suite de tests pasa completamente (`vitest --run` sin fallos)
- [ ] **CS-04** — Sin caracteres con encoding roto visibles en la UI

### Funcionalidad
- [ ] **CS-05** — Las 6 secciones + Footer renderizan correctamente en desktop (≥1024px)
- [ ] **CS-06** — Las 6 secciones + Footer renderizan correctamente en mobile (375px)
- [ ] **CS-07** — El Header aparece/desaparece según la lógica definida en desktop y mobile
- [ ] **CS-08** — El CTA "Explorar productos" hace scroll suave hacia la sección Tienda
- [ ] **CS-09** — El menú hamburger en mobile abre y cierra correctamente

### Proceso / portafolio
- [ ] **CS-10** — El repo tiene un README que explica el proyecto y enlaza a `/docs`
- [ ] **CS-11** — Existe `/docs/00-audit.md`, `/docs/01-prd.md`, `/docs/02-technical-spec.md`
- [ ] **CS-12** — Existen al menos 3 ADRs en `/docs/adr/`
- [ ] **CS-13** — GitHub Projects tiene un Kanban con todos los Issues cerrados y trazables a commits
- [ ] **CS-14** — El historial de commits referencia Issues (`feat: hero fix (#N)`)

---

## 6. Restricciones

| Restricción | Detalle |
|---|---|
| Stack fijo | Vue 3 + TypeScript + Vite. No cambiar de framework |
| Sin backend | Todo el contenido es estático hardcodeado en los componentes |
| Herramientas gratuitas | GitHub, Vitest, Vercel/Netlify free tier para deploy |
| Tiempo estimado | 2-3 semanas de trabajo parcial (sesiones de 2-3h) |
| Agente de IA | Claude Code como ejecutor de tareas contra esta spec |

---

## 7. Secciones — descripción funcional detallada

### 7.1 Hero (refactor)
- Corregir encoding UTF-8 en todos los strings
- Mover el `<Header />` de `Hero.vue` a `App.vue`
- Refactorizar la comunicación Hero → Header usando un composable o emit
- El CTA debe hacer scroll a `#tienda`

### 7.2 Tienda
- Grid de 3-4 producto cards
- Cada card: imagen, nombre del producto, descripción corta (1 línea), precio
- Botón "Ver producto" por card (sin funcionalidad real en v1)
- Layout: 1 columna en mobile, 2-3 columnas en desktop

### 7.3 Filosofía
- Sección con fondo diferenciado (color sólido o imagen suave)
- Heading principal de la sección
- 3 pilares de la marca en formato icono + título + párrafo breve
- Sin animaciones complejas en v1 (CSS transitions son suficientes)

### 7.4 Galería
- Grid de imágenes de lifestyle (usar assets de `public/images/`)
- Mínimo 4 imágenes, máximo 6
- Layout masonry o grid uniforme
- Click en imagen: lightbox simple o sin interacción (válido para v1)

### 7.5 Gaceta
- 2-3 cards de artículos
- Cada card: imagen, categoría, título, extracto (2 líneas), fecha
- Contenido hardcodeado en v1
- Link "Leer más" sin destino real

### 7.6 Footer
- Logo Lumera
- Links de navegación (mismos del Header)
- Iconos de redes sociales (Instagram, TikTok, Pinterest — sin URLs reales)
- Copyright: © 2026 Lumera. Todos los derechos reservados.

---

## 8. Dependencias entre secciones

```
App.vue
  ├── Header.vue          ← depende de: estado scroll/viewport
  └── main layout
        ├── Hero.vue       ← trigger del Header
        ├── Tienda.vue     ← destino del CTA del Hero
        ├── Filosofia.vue  ← independiente
        ├── Galeria.vue    ← depende de: assets en public/images
        ├── Gaceta.vue     ← independiente
        └── Footer.vue     ← independiente
```

---

## 9. Historial de versiones de este documento

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0 | 2026-06-30 | Documento inicial basado en auditoría `00-audit.md` |
