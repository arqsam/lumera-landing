# ADR 0003 — Sin Vue Router en v1.0 (single-page scroll)

**Fecha:** 2026-06-30  
**Estado:** Aceptado  
**Autores:** arqsam  

---

## Contexto

Vue Router es el sistema de enrutamiento oficial de Vue 3 y se incluye por defecto en proyectos Vue generados con `create-vue`. Sin embargo, el proyecto fue inicializado sin Vue Router (no aparece en `package.json`).

Una landing page puede implementarse de dos formas:

1. **Multi-ruta con Vue Router** — cada sección es una ruta (`/tienda`, `/filosofia`), con navegación real entre páginas
2. **Single-page scroll** — toda la landing es una sola página, la navegación son anchors (`#tienda`, `#filosofia`) con scroll suave

---

## Decisión

Se mantiene la arquitectura **single-page scroll sin Vue Router** para v1.0.

La navegación del Header usa anchors HTML nativos (`href="#tienda"`) con scroll suave via CSS (`scroll-behavior: smooth` en el elemento `html`).

---

## Razones

**A favor de single-page scroll:**
- Una landing page de conversión es por definición una sola página — el usuario no navega a "rutas", sino que desciende por el contenido
- Elimina la complejidad de Vue Router (guards, lazy loading de rutas, history mode, configuración en el servidor de deploy)
- Los anchors HTML nativos son accesibles por defecto y funcionan sin JavaScript
- Reduce el bundle size al no incluir Vue Router (~20KB)
- Más simple de desplegar en Vercel/Netlify sin configuración adicional de redirects

**Trade-offs asumidos:**
- Si en el futuro se añaden páginas reales (página de producto individual, blog completo), será necesario incorporar Vue Router — esto implicará un refactor de `App.vue` y `main.ts`
- La URL del browser no cambia al navegar entre secciones — no hay deep linking a secciones específicas

---

## Consecuencias

- `App.vue` monta todos los componentes de sección directamente, en orden vertical
- El `index.html` es el único punto de entrada
- El Header usa `<a href="#id-de-seccion">` para la navegación, no `<RouterLink>`
- Para activar scroll suave, `src/assets/styles/main.scss` debe incluir:
  ```scss
  html {
    scroll-behavior: smooth;
  }
  ```
- Si en v2 se requiere Vue Router, la migración es: instalar `vue-router`, envolver `App.vue` en `<RouterView>`, y convertir los anchors en `<RouterLink>` con hash mode

---

## Revisión programada

Revisar esta decisión si en v2 se incorpora: página de detalle de producto, blog con URLs propias, o panel de usuario.
