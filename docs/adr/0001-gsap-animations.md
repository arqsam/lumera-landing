# ADR 0001 — GSAP como motor de animaciones

**Fecha:** 2026-06-30  
**Estado:** Aceptado  
**Autores:** arqsam  

---

## Contexto

La landing page de Lumera requiere animaciones de entrada para los elementos principales (título, subtítulo, botón CTA) y comportamientos animados del Header (aparición/desaparición con scroll). La marca apunta a un posicionamiento premium, por lo que las animaciones deben sentirse fluidas y profesionales, no genéricas.

Las opciones evaluadas fueron:

1. **CSS transitions y keyframes** — nativo del browser, sin dependencias
2. **Vue `<Transition>` y `<TransitionGroup>`** — integrado en el framework
3. **GSAP (GreenSock Animation Platform)** — librería especializada en animaciones

---

## Decisión

Se usa **GSAP** como motor principal de animaciones con lógica (entradas de sección, aparición del Header, micro-interacciones del botón CTA).

CSS transitions se reservan para hover states simples que no requieren control programático.

Vue `<Transition>` se usa únicamente para el drawer del menú mobile, donde la integración con `v-if` de Vue simplifica el código.

---

## Razones

**A favor de GSAP:**
- Control preciso sobre timing, easing y secuenciación de múltiples elementos
- API declarativa y legible (`gsap.from`, `gsap.to`, `gsap.fromTo`)
- Rendimiento superior a CSS animations complejas (usa `requestAnimationFrame` optimizado)
- Permite callbacks en puntos del timeline (`onComplete`, `onStart`) necesarios para la lógica del Header
- Estándar de la industria en proyectos frontend de alta calidad — reconocible en un portafolio

**En contra / trade-offs asumidos:**
- Añade ~30KB al bundle (GSAP core)
- Requiere mock en tests unitarios (resuelto en `setup.ts`)
- Curva de aprendizaje si otro desarrollador toma el proyecto

---

## Consecuencias

- Todos los archivos que usan animaciones con lógica importan `gsap` directamente
- Los tests que verifican animaciones mockean `gsap` completo (ver `src/tests/setup.ts`)
- Las duraciones y easings siguen las convenciones definidas en `02-technical-spec.md` sección 6
- En v2 se puede incorporar `ScrollTrigger` (plugin de GSAP) para animaciones al hacer scroll, sin cambiar la decisión base
