# 02 — Technical Specification
**Proyecto:** Lumera Landing Page  
**Versión:** 1.0  
**Fecha:** 2026-06-30  
**Autor:** arqsam  
**Estado:** Aprobado — base para implementación  

---

## 1. Stack tecnológico

```
Vue 3.5          → Framework UI (Composition API, <script setup>)
TypeScript 5.8   → Tipado estático en todos los archivos .vue y .ts
Vite 7           → Bundler y dev server
SCSS + Tailwind  → Estilos: SCSS para componentes y tokens, Tailwind para utilidades
GSAP 3.13        → Animaciones de entrada y micro-interacciones
@heroicons/vue   → Iconos SVG (outline style)
Vitest 3 + Testing Library Vue → Tests unitarios de componentes
```

---

## 2. Estructura de carpetas (target v1.0)

```
lumera-landing/
├── docs/                          ← documentación SDD
│   ├── 00-audit.md
│   ├── 01-prd.md
│   ├── 02-technical-spec.md       ← este archivo
│   ├── 03-acceptance-report.md    ← se completa al final
│   └── adr/
│       ├── 0001-gsap-animations.md
│       ├── 0002-scss-tokens.md
│       └── 0003-no-router.md
├── public/
│   ├── images/                    ← assets de producto y lifestyle
│   └── videos/
│       └── skincare_02.mp4        ← video de fondo del Hero
├── src/
│   ├── assets/
│   │   └── styles/
│   │       ├── _variables.scss    ← tokens de diseño (colores, tipografía, breakpoints)
│   │       └── main.scss          ← estilos globales, resets, imports
│   ├── components/
│   │   ├── __tests__/
│   │   │   ├── Header.spec.ts
│   │   │   ├── Hero.spec.ts
│   │   │   ├── Tienda.spec.ts     ← por crear
│   │   │   ├── Filosofia.spec.ts  ← por crear
│   │   │   ├── Galeria.spec.ts    ← por crear
│   │   │   ├── Gaceta.spec.ts     ← por crear
│   │   │   └── Footer.spec.ts     ← por crear
│   │   ├── Header.vue             ← refactor pendiente (DT-02, DT-03)
│   │   ├── Hero.vue               ← fix pendiente (DT-01)
│   │   ├── Tienda.vue             ← por crear
│   │   ├── Filosofia.vue          ← por crear
│   │   ├── Galeria.vue            ← por crear
│   │   ├── Gaceta.vue             ← por crear
│   │   └── Footer.vue             ← por crear
│   ├── composables/
│   │   └── useHeaderVisibility.ts ← por crear (extrae lógica de Header, resuelve DT-03)
│   ├── tests/
│   │   └── setup.ts
│   ├── App.vue                    ← monta todos los componentes en orden
│   ├── main.ts
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

---

## 3. Arquitectura de componentes

### 3.1 Jerarquía correcta (post-refactor)

```
App.vue
  ├── Header.vue          ← recibe: heroVisible (boolean via composable)
  └── <main>
        ├── Hero.vue       ← emite: heroButtonHovered, heroInView
        ├── Tienda.vue
        ├── Filosofia.vue
        ├── Galeria.vue
        ├── Gaceta.vue
        └── Footer.vue
```

### 3.2 Composable `useHeaderVisibility.ts`

Extrae la lógica de visibilidad del Header fuera del DOM acoplado. Responsabilidades:

```typescript
// Expone:
const { isHeaderVisible } = useHeaderVisibility()

// Internamente maneja:
// - scroll listener (mobile y desktop)
// - IntersectionObserver sobre #hero (reemplaza querySelector)
// - estado hasAppeared para lógica de primera aparición en desktop
```

El Hero notifica al composable mediante un `ref` compartido, no mediante `querySelector`.

---

## 4. Sistema de diseño — tokens SCSS

Estos tokens ya existen en `_variables.scss` y son la fuente de verdad visual del proyecto. No duplicar en Tailwind config.

### 4.1 Colores (inferidos del código auditado)

```scss
$color-light          // blanco o casi blanco — texto sobre fondos oscuros
$color-gray-light-ultra  // gris muy claro — fondo del botón CTA
$color-gray-medium    // gris medio — texto del botón CTA
$color-gray-dark      // gris oscuro — texto hover del botón
$shadow-color-light   // overlay semitransparente del hero

// Acento (hardcoded en Hero, debe migrar a variable)
$color-accent-gold    // #ffc20c — círculo de fondo del hero
$color-accent-amber   // #ffb347 — gradiente del círculo
```

### 4.2 Tipografía

```scss
$font-heading   // fuente para títulos (serif o display)
$font-main      // fuente para cuerpo y UI
```

### 4.3 Breakpoints

```scss
$breakpoint-md  // ≥ 768px — punto de quiebre mobile/desktop
```

**Acción requerida:** Confirmar y documentar los valores reales de estas variables en `_variables.scss` antes de crear componentes nuevos. Todos los componentes nuevos DEBEN usar estos tokens — prohibido hardcodear valores de color o tipografía.

---

## 5. Convenciones de código

### 5.1 Componentes Vue

```vue
<!-- Orden estándar dentro de cada .vue -->
<script setup lang="ts">
  // 1. imports de Vue (ref, onMounted, etc.)
  // 2. imports de librerías externas (gsap, heroicons)
  // 3. imports de composables propios
  // 4. imports de componentes hijos
  // 5. props y emits
  // 6. estado reactivo (refs, computed)
  // 7. funciones y handlers
  // 8. lifecycle hooks (onMounted al final)
</script>

<template>
  <!-- un solo elemento raíz por componente -->
</template>

<style scoped lang="scss">
  /* todos los estilos del componente aquí, no en main.scss */
</style>
```

### 5.2 Naming

| Elemento | Convención | Ejemplo |
|---|---|---|
| Componentes | PascalCase | `Tienda.vue`, `Footer.vue` |
| Clases CSS | BEM-like con prefijo del componente | `.tienda-card`, `.footer-links` |
| Composables | camelCase con prefijo `use` | `useHeaderVisibility.ts` |
| Archivos de test | mismo nombre + `.spec.ts` | `Tienda.spec.ts` |
| Branches Git | `tipo/descripcion-corta` | `feat/tienda-section` |
| Commits Git | Conventional Commits | `feat: add Tienda component (#5)` |

### 5.3 Conventional Commits (obligatorio)

```
feat:     nueva funcionalidad
fix:      corrección de bug
docs:     cambios en documentación
refactor: cambio de código sin cambio de comportamiento
test:     añadir o corregir tests
style:    cambios de formato/estilo sin lógica
chore:    tareas de mantenimiento (deps, config)
```

Todos los commits deben referenciar el Issue de GitHub: `feat: hero encoding fix (#2)`

---

## 6. Animaciones — convenciones GSAP

GSAP es el motor único de animaciones con lógica. CSS transitions solo para micro-interacciones simples (hover states sin JS).

### 6.1 Patrones aprobados

```typescript
// Entrada de sección (al montar)
gsap.from(".componente-elemento", {
  opacity: 0,
  y: 40,
  duration: 1.2,
  ease: "power2.out",
  delay: 0.2,
})

// Salida de elemento (al desmontar o ocultar)
gsap.to(".elemento", {
  opacity: 0,
  y: -60,
  duration: 0.8,
  ease: "power2.inOut",
  onComplete: () => { /* cleanup */ }
})
```

### 6.2 Reglas

- Duración de entrada: entre 1.0s y 1.5s
- Duración de salida: entre 0.6s y 0.9s (más rápida que entrada)
- Ease estándar: `power2.out` para entradas, `power2.inOut` para salidas
- Delay máximo entre elementos en secuencia: 0.3s
- No usar GSAP para hover states simples en secciones nuevas — usar CSS `transition`

---

## 7. Testing — estrategia

### 7.1 Qué testear por componente

| Tipo de test | Qué verifica |
|---|---|
| Render test | El componente monta sin errores, elementos clave presentes en DOM |
| Props test | El componente responde correctamente a sus props |
| Interaction test | Clicks, hovers, eventos del usuario funcionan |
| Accessibility test | aria-labels, roles semánticos presentes |

### 7.2 Qué NO testear

- Animaciones de GSAP (ya cubierto en Hero.spec.ts con mock)
- Estilos CSS/SCSS (no es responsabilidad de los unit tests)
- Funcionalidad de librerías externas (heroicons, gsap)

### 7.3 Estructura mínima de cada spec

```typescript
describe("NombreComponente.vue", () => {
  it("renderiza sin errores", () => { ... })
  it("muestra el contenido esperado", () => { ... })
  it("responde a interacciones del usuario", () => { ... })
})
```

---

## 8. Responsividad

Dos breakpoints activos en v1.0:

| Breakpoint | Rango | Variable SCSS |
|---|---|---|
| Mobile | < 768px | base (sin media query) |
| Desktop | ≥ 768px | `@media (min-width: $breakpoint-md)` |

**Regla:** mobile-first. Estilos base = mobile, desktop sobreescribe con `@media (min-width: $breakpoint-md)`.

---

## 9. Deploy (target)

- **Plataforma:** Vercel (free tier) o Netlify (free tier)
- **Comando de build:** `vue-tsc -b && vite build`
- **Directorio de output:** `dist/`
- **Variables de entorno:** ninguna en v1.0 (todo estático)
- **Branch de producción:** `main`

---

## 10. Historial de versiones

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0 | 2026-06-30 | Documento inicial basado en auditoría `00-audit.md` |
