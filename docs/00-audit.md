# 00 — Auditoría técnica del proyecto
**Proyecto:** lumera-landing  
**Repo:** https://github.com/arqsam/lumera-landing  
**Branch auditada:** `fix/header-effects`  
**Fecha de auditoría:** 2026-06-30  
**Auditor:** arqsam  

---

## 1. Stack confirmado

| Capa | Tecnología | Versión |
|---|---|---|
| Framework UI | Vue 3 (`<script setup>`) | ^3.5.17 |
| Lenguaje | TypeScript | ~5.8.3 |
| Bundler | Vite | ^7.0.4 |
| Estilos | SCSS + Tailwind CSS | sass ^1.89.2 / tailwind ^4.1.11 |
| Animaciones | GSAP | ^3.13.0 |
| Iconos | @heroicons/vue | ^2.2.0 |
| Testing | Vitest + Testing Library Vue | ^3.2.4 / ^8.1.0 |
| Type check | vue-tsc | ^2.2.12 |

**Observación:** Tailwind v4 usa `@tailwindcss/postcss` como plugin, lo cual es correcto para esa versión. Sin embargo, el `tailwind.config.js` actual usa la sintaxis de configuración de Tailwind v3 (`theme.extend`). Esto es una deuda técnica menor que puede causar comportamientos inesperados.

---

## 2. Inventario de archivos (estado actual)

```
lumera-landing/
├── public/
│   ├── images/
│   │   ├── produc...       ← nombre truncado, asset de producto (imagen)
│   │   └── woman_...       ← nombre truncado, asset de modelo/lifestyle
│   └── videos/
│       └── skinca...       ← video de fondo hero (skincare_02.mp4 según código)
├── src/
│   ├── assets/
│   │   ├── styles/
│   │   │   ├── main.scss   ← estilos globales / variables SCSS
│   │   │   └── _v...       ← variables SCSS parcial (_variables.scss presumiblemente)
│   │   └── main.css
│   ├── components/
│   │   ├── __tests__/
│   │   │   ├── Header.spec.ts   ← tests unitarios del Header
│   │   │   └── Hero.spec.ts     ← tests unitarios del Hero
│   │   ├── Header.vue           ← COMPONENTE COMPLETO
│   │   └── Hero.vue             ← COMPONENTE COMPLETO
│   ├── tests/
│   │   └── setup.ts             ← configuración global de Vitest
│   ├── App.vue                  ← solo monta <Hero />, sin router
│   ├── main.ts                  ← entrada de la app
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── postcss.config.js
└── .eslintrc.cjs
```

---

## 3. Análisis de componentes existentes

### 3.1 `Hero.vue` — ✅ Funcional, listo para integración

**Qué hace:**
- Sección `100vh` con video de fondo en loop (autoplay, muted, playsinline)
- Overlay con blur + glow radial + círculo animado en gradiente dorado
- Título principal: "Ilumina tu rutina. *Vive Lumera.*"
- Subtítulo: "Tecnología para el cuidado de tu piel, mente y bienestar."
- Botón CTA: "Explorar productos"
- Animaciones de entrada con GSAP (`from` en título, subtítulo y botón)
- Micro-interacción de hover en el botón (glow via `boxShadow`)

**Decisiones de diseño implícitas detectadas:**
- Sistema de tokens SCSS: `$color-light`, `$color-gray-light-ultra`, `$color-gray-medium`, `$color-gray-dark`, `$font-heading`, `$font-main`, `$breakpoint-md`, `$shadow-color-light`
- Paleta: tonos gris/blanco con acento dorado/ámbar (`#ffc20c`, `#ffb347`)
- Tipografía: dos fuentes distintas (heading y main), peso ligero (300) para cuerpo, extrabold (900) para acento

**Deuda técnica identificada:**
- Encoding roto en strings: `"pequeÃ±o"`, `"TecnologÃ­a"`, `"FilosofÃ­a"` — caracteres especiales en español mal codificados (UTF-8 issue). Afecta la visualización en producción.
- El botón CTA (`hero-button`) dispara la visibilidad del Header mediante un event listener DOM directo (`querySelector + mouseenter`), acoplamiento frágil entre componentes. Debe refactorizarse con emits o un estado compartido (Pinia o composable).
- Sin atributo `alt` ni `aria-label` en el video o en las imágenes del `public/`.

### 3.2 `Header.vue` — ✅ Funcional con lógica avanzada

**Qué hace:**
- Navbar flotante con aparición/desaparición animada via GSAP
- Lógica diferenciada mobile/desktop:
  - **Mobile:** aparece tras 800ms de delay o al hacer scroll > 30px
  - **Desktop:** aparece al hacer hover sobre `.hero-button` (primera vez), se mantiene visible mientras el hero esté en viewport
- Menú hamburger en mobile (drawer lateral con transición `slide-fade`)
- Links de navegación: Tienda, Filosofía, Galería, Gaceta
- Ícono de carrito (ShoppingBagIcon)

**Deuda técnica identificada:**
- Mismo problema de encoding UTF-8: `"FilosofÃ­a"`, `"GalerÃ­a"`, `"menÃº"` — afecta labels de aria y texto visible
- Acoplamiento al DOM: `document.querySelector(".hero-button")` desde Header es un anti-pattern en Vue. Si el componente se renderiza antes que Hero, el querySelector devuelve `null`
- `<style scoped lang="scss">` está vacío — todos los estilos del Header viven presumiblemente en el archivo SCSS global, lo cual dificulta el mantenimiento
- El Header se importa y monta **dentro** de `Hero.vue`, no en `App.vue`. Esto crea una jerarquía semánticamente incorrecta (`<header>` dentro de `<section>`)
- No hay transición de salida del drawer móvil al hacer click en un link (solo cierra el menú, no anima)

### 3.3 `App.vue` — ⚠️ Solo scaffolding

```vue
<script setup lang="ts">
import Hero from "./components/Hero.vue";
</script>
<template>
  <Hero />
</template>
```

Solo monta Hero. No hay router, no hay layout global, no hay otras secciones. Es el estado esperado para un inicio de proyecto.

---

## 4. Estado de los tests

### `Hero.spec.ts` — ✅ Bien estructurado
- Verifica título, subtítulo y botón presentes en el DOM
- Verifica atributos del video (`autoplay`, `muted`, `loop`, `playsinline`)
- Verifica existencia de overlays y wrappers
- Verifica que GSAP sea llamado con los selectores correctos

### `Header.spec.ts` — ⚠️ Parcialmente válido
- Verifica logo, links de navegación y botón de carrito
- Los tests dependen de simular hover en `.hero-button` para que aparezca el Header — esto refleja el mismo acoplamiento DOM que existe en el componente
- El encoding roto en los strings de los tests (`"FilosofÃ­a"`, `"GalerÃ­a"`) podría causar falsos negativos

---

## 5. Lo que NO existe aún (secciones pendientes)

Basado en los `href` del Header, estas secciones están declaradas en la navegación pero **no tienen componente ni implementación**:

| Sección | href | Estado |
|---|---|---|
| Tienda | `#tienda` | ❌ No existe |
| Filosofía | `#filosofia` | ❌ No existe |
| Galería | `#galeria` | ❌ No existe |
| Gaceta | `#gaceta` | ❌ No existe |
| Footer | — | ❌ No existe |

---

## 6. Deuda técnica consolidada

| ID | Tipo | Descripción | Severidad |
|---|---|---|---|
| DT-01 | Bug | Encoding UTF-8 roto en caracteres especiales en español | 🔴 Alta |
| DT-02 | Arquitectura | Header montado dentro de Hero en lugar de App.vue | 🟠 Media |
| DT-03 | Arquitectura | Acoplamiento DOM entre Header y Hero via `querySelector` | 🟠 Media |
| DT-04 | Config | `tailwind.config.js` usa sintaxis v3 con Tailwind v4 | 🟡 Baja |
| DT-05 | Accesibilidad | Sin `alt` en imágenes de `public/`, aria-labels incompletos | 🟡 Baja |
| DT-06 | Mantenimiento | Estilos del Header no están en su propio `<style scoped>` | 🟡 Baja |
| DT-07 | Testing | Strings con encoding roto en spec files de Header | 🟡 Baja |

---

## 7. Decisiones técnicas implícitas (a documentar en ADRs)

Estas decisiones ya están tomadas en el código pero nunca se documentaron formalmente:

1. **GSAP como motor de animaciones** (en lugar de CSS transitions o Vue `<Transition>`)
2. **SCSS con sistema de variables/tokens propio** (en lugar de CSS custom properties o Tailwind tokens puros)
3. **Sin Vue Router** (single-page scroll en lugar de multi-ruta)
4. **Sin Pinia** (estado local con `ref` en cada componente)
5. **Header con aparición condicional basada en scroll/hover** (en lugar de siempre visible)
6. **Video de fondo en Hero** (en lugar de imagen estática)

---

## 8. Diagnóstico general

| Categoría | Estado | Nota |
|---|---|---|
| Componentes existentes | ✅ Sólidos | Hero y Header están bien construidos visualmente |
| Animaciones | ✅ Profesionales | GSAP usado correctamente |
| Tests | ✅ Existen | Base de tests sana, necesitan corrección de encoding |
| Arquitectura de componentes | ⚠️ Mejorable | Acoplamiento DOM a resolver |
| Secciones de la landing | ❌ Incompleta | 5 de 6 secciones por construir |
| Documentación | ❌ Inexistente | README es el default de Vite |
| GitHub Projects / Issues | ❌ Inexistente | Sin backlog, sin trazabilidad |

**Conclusión:** El proyecto tiene una base técnica de buena calidad (animaciones reales, tests, TypeScript, SCSS estructurado). El trabajo real es: corregir deuda técnica crítica (DT-01, DT-02, DT-03), construir las 5 secciones faltantes, y levantar toda la capa de gestión SDD (docs, ADRs, backlog en GitHub Projects).
