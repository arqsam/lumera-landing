# ADR 0004 — ScrollTrigger incorporado en v1.0 (desviación del PRD)

**Fecha:** 2026-10-16  
**Estado:** Aceptado (registra una decisión ya implementada)  
**Autores:** arqsam  
**Relacionado:** [ADR 0001](./0001-gsap-animations.md), [PRD](../01-prd.md) sección 4

---

## Contexto

El PRD v1.0 dejaba **fuera de alcance** las "animaciones de scroll avanzadas (ScrollTrigger de GSAP)", y el ADR 0001 anticipaba incorporarlo hasta una v2.

Durante la implementación, las secciones Tienda, Filosofía, Galería, Gaceta y Footer se construyeron con `ScrollTrigger` (ver `ScrollTrigger` importado en esos cinco componentes), y el README ya lo documenta como parte del stack. El código y la spec quedaron desalineados.

En Spec-Driven Development la spec es la fuente de verdad: cuando la implementación se aparta de ella, la desviación debe quedar registrada, no ignorada.

---

## Decisión

Se **mantiene** `ScrollTrigger` en v1.0 y se actualiza la spec para reflejarlo:

- El PRD pasa a v1.1: ScrollTrigger sale de "fuera de alcance".
- El ADR 0001 apunta a este documento en lugar de diferir el plugin a v2.

---

## Razones

**A favor:**
- Las secciones ya funcionan con él y tienen tests; quitarlo sería trabajo sin beneficio.
- Es el plugin oficial de GSAP, ya instalado con `gsap` (sin dependencia nueva).
- Es lo que da el efecto editorial (parallax, título sticky de Galería) que define la identidad visual.

**Trade-offs asumidos:**
- Mayor peso de JavaScript que con animaciones solo de entrada (el plugin se suma al core de GSAP).
- Los componentes que lo usan deben limpiar sus triggers al desmontarse.
- Posible impacto en rendimiento móvil: debe medirse en el reporte de aceptación (CS-01).

---

## Consecuencias

- Todo componente que registre `ScrollTrigger` debe destruir sus instancias en `onUnmounted`.
- Hoy `Tienda.vue`, `Filosofia.vue`, `Galeria.vue`, `Gaceta.vue` y `Footer.vue` lo hacen con `ScrollTrigger.getAll().forEach(t => t.kill())`, lo cual elimina **todos** los triggers de la página, no solo los propios. Es aceptable mientras la landing sea de una sola vista; si se añaden rutas (ver ADR 0003), conviene guardar y limpiar solo los triggers propios de cada componente.
- Se revisa esta decisión si Lighthouse Performance en móvil queda por debajo de 85.
