# Lumera Landing Page

> Landing page de marca premium de skincare construida con Vue 3 + TypeScript, aplicando **Spec-Driven Development** como metodología de gestión y desarrollo.

**🔗 Demo en vivo:** [lumera-landing-lumera.vercel.app](https://lumera-landing-lumera.vercel.app)

---

## Vista general

Lumera es una marca de skincare que combina ciencia aplicada con ingredientes 100% naturales. Esta landing page comunica la identidad de marca, presenta los productos y genera conversión hacia la tienda.

El proyecto fue desarrollado aplicando un proceso completo de **Spec-Driven Development (SDD)**: desde la auditoría técnica inicial hasta el backlog trazable en GitHub Projects, con cada commit referenciando un Issue derivado del PRD.

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework | Vue 3 (Composition API, `<script setup>`) |
| Lenguaje | TypeScript 5.8 |
| Bundler | Vite 7 |
| Estilos | SCSS + Tailwind CSS 4 |
| Animaciones | GSAP 3.13 + ScrollTrigger |
| Iconos | @heroicons/vue |
| Testing | Vitest 3 + Testing Library Vue |
| Deploy | Vercel (free tier) |

---

## Secciones de la landing

| # | Sección | Descripción |
|---|---|---|
| 1 | **Hero** | Video de fondo fullscreen, animaciones de entrada GSAP, CTA a Filosofía |
| 2 | **Filosofía** | Imagen parallax full-screen, frases rotativas, cards con hover glass |
| 3 | **Tienda** | Grid de productos con animaciones ScrollTrigger, cards con hover suave |
| 4 | **Galería** | Collage editorial 3 columnas, título sticky con efecto glass, parallax por columna |
| 5 | **Gaceta** | Layout tipo revista, modal de artículo completo, animaciones de entrada |
| 6 | **Footer** | Newsletter con validación, redes sociales, imagen de fondo sutil |

---

## Proceso SDD aplicado

Este proyecto no es solo código — es evidencia de un proceso de gestión profesional completo.

### Documentación en `/docs`

```
docs/
├── 00-audit.md          # Inventario técnico del estado inicial del proyecto
├── 01-prd.md            # PRD v1.0 con alcance, personas y criterios de aceptación
├── 02-technical-spec.md # Arquitectura, convenciones, sistema de diseño
├── 03-acceptance-report.md
└── adr/
    ├── 0001-gsap-animations.md   # Por qué GSAP sobre CSS animations
    ├── 0002-scss-tokens.md       # Sistema de tokens SCSS como fuente de verdad
    └── 0003-no-router.md        # Single-page scroll vs Vue Router
```

### Trazabilidad Issues → Commits

Cada Issue del backlog fue derivado del PRD con criterios de aceptación medibles. Cada commit referencia el Issue que resuelve:

```
feat: add Tienda section with GSAP scroll animations (#7)
fix: correct UTF-8 encoding for Spanish characters (#4)
refactor: extract header visibility logic to composable (#6)
```

### GitHub Project (Kanban)

El board del proyecto muestra el ciclo completo: Backlog → In Progress → In Review → Done, con trazabilidad de cada decisión tomada durante el desarrollo.

---

## Instalación y desarrollo local

```bash
# Clonar el repositorio
git clone https://github.com/arqsam/lumera-landing.git
cd lumera-landing

# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Correr tests
npm run test

# Build de producción
npm run build
```

---

## Tests

```bash
npm run test        # Correr todos los tests una vez
npm run test:ui     # Abrir Vitest UI
```

Los tests cubren todos los componentes principales con Testing Library Vue:
renderizado, accesibilidad (aria-labels, roles), interacciones y criterios de aceptación del PRD.

---

## Arquitectura de componentes

```
App.vue
├── Header.vue                    ← navbar flotante con lógica de visibilidad
└── main
    ├── Hero.vue                  ← sección fullscreen con video
    ├── Filosofia.vue             ← parallax + frases rotativas
    ├── Tienda.vue                ← grid de productos
    ├── Galeria.vue               ← collage editorial
    ├── Gaceta.vue                ← blog/revista con modal
    └── Footer.vue                ← newsletter + redes
src/composables/
    └── useHeaderVisibility.ts    ← lógica de visibilidad del header
src/components/
    └── ScrollIndicator.vue       ← indicador de scroll reutilizable
```

---

## Decisiones técnicas destacadas

**Sin Vue Router** — La landing es single-page scroll. La navegación usa anchors HTML nativos con `scroll-behavior: smooth`. Ver [ADR 0003](./docs/adr/0003-no-router.md).

**GSAP como motor de animaciones** — Control preciso de timing, secuenciación y callbacks. ScrollTrigger para animaciones vinculadas al scroll. Ver [ADR 0001](./docs/adr/0001-gsap-animations.md).

**SCSS tokens como fuente de verdad** — Sistema de variables propio (`_variables.scss`) en lugar de extender Tailwind. Ver [ADR 0002](./docs/adr/0002-scss-tokens.md).

**Header adaptativo por sección** — `data-theme="dark|light"` en cada sección + `IntersectionObserver` en el composable para cambiar el estilo del Header automáticamente.

---

## Estructura de branches

```
main          ← producción (release v1.0)
develop       ← integración continua
feat/*        ← nuevas secciones
fix/*         ← correcciones
refactor/*    ← mejoras de arquitectura
docs/*        ← documentación
```

---

## Recursos

- [PRD v1.0](./docs/01-prd.md) — Product Requirements Document
- [Spec Técnica](./docs/02-technical-spec.md) — Arquitectura y convenciones
- [GitHub Project](https://github.com/arqsam/lumera-landing/projects) — Kanban del proyecto
- [Demo](https://lumera-landing-lumera.vercel.app) — Sitio en producción

---

## Autor

**arqsam** — Fullstack Developer / Project Manager  
Desarrollado con metodología Spec-Driven Development como pieza de portafolio profesional.
