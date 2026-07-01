# ADR 0002 — Sistema de tokens SCSS propio

**Fecha:** 2026-06-30  
**Estado:** Aceptado  
**Autores:** arqsam  

---

## Contexto

El proyecto usa tanto SCSS como Tailwind CSS. Esto genera una tensión: Tailwind tiene su propio sistema de tokens (colores, espaciado, tipografía) configurables en `tailwind.config.js`, mientras que SCSS permite variables propias en `_variables.scss`. Usar ambos sin una decisión clara lleva a inconsistencias donde algunos componentes usan `$color-light` y otros usan `text-white`, representando el mismo valor pero sin conexión entre sí.

El proyecto ya tiene un sistema de tokens SCSS establecido (`$color-light`, `$font-heading`, `$breakpoint-md`, etc.) usado extensivamente en `Hero.vue` y presumiblemente en los estilos globales.

---

## Decisión

Los **tokens de diseño** (colores de marca, tipografías, breakpoints) viven en **`src/assets/styles/_variables.scss`** como variables SCSS. Son la fuente de verdad visual del proyecto.

Tailwind se usa únicamente para **utilidades de layout y espaciado genérico** donde escribir SCSS sería verboso sin aportar valor semántico (ej: `flex`, `items-center`, `gap-4`).

**Prohibido:**
- Hardcodear valores de color o tipografía directamente en componentes (`color: #ffc20c`)
- Duplicar tokens en `tailwind.config.js` (no extender el theme de Tailwind con los colores de marca)

---

## Razones

**A favor de SCSS como fuente de verdad:**
- Los tokens ya existen y están en uso — cambiarlos rompe componentes existentes
- SCSS variables permiten uso dentro de cálculos y funciones SCSS (`lighten()`, `darken()`, `mix()`)
- Mejor integración con los `<style scoped>` de Vue que el sistema de Tailwind
- Más expresivo semánticamente: `$color-accent-gold` vs `text-yellow-400`

**Trade-offs asumidos:**
- Dos sistemas coexisten (SCSS tokens + Tailwind utilities) — requiere disciplina del equipo
- Tailwind purge/tree-shaking puede no eliminar clases si no están listadas en `content`
- Un desarrollador nuevo debe aprender dónde vive cada tipo de estilo

---

## Consecuencias

- Todo componente nuevo usa `<style scoped lang="scss">` y referencia tokens de `_variables.scss`
- Para importar variables en un componente: `@use '../assets/styles/variables' as *` (o el path relativo correcto)
- Los colores hardcodeados detectados en `Hero.vue` (`#ffc20c`, `#ffb347`) deben migrarse a variables en el próximo refactor (registrado como DT-01 en `00-audit.md`)
- `tailwind.config.js` se mantiene con el `theme.extend` vacío — no se extiende con tokens de marca
