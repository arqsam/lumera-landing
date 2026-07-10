<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollIndicator from "./ScrollIndicator.vue";

gsap.registerPlugin(ScrollTrigger);

const frases = [
  { numero: "01", texto: "Ciencia que nace de la naturaleza." },
  { numero: "02", texto: "Pureza certificada en cada gota." },
  { numero: "03", texto: "Bienestar que se siente en tu piel." },
];

const fraseActiva = ref(0);
let intervalo: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  intervalo = setInterval(() => {
    fraseActiva.value = (fraseActiva.value + 1) % frases.length;
  }, 3000);

  // Entrada de la sección
  gsap.from(".filosofia-eyebrow", {
    opacity: 0,
    y: 20,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#filosofia",
      start: "top 80%",
      once: true,
    },
  });

  gsap.from(".filosofia-cards", {
    opacity: 0,
    x: 30,
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#filosofia",
      start: "top 75%",
      once: true,
    },
  });

  // Parallax imagen
  gsap.to(".deco--model img", {
    y: -250,
    ease: "none",
    scrollTrigger: {
      trigger: "#filosofia",
      start: "top bottom",
      end: "bottom top",
      scrub: 2,
    },
  });

  // Aura sutil
  gsap.to(".deco--aura", {
    y: -60,
    ease: "none",
    scrollTrigger: {
      trigger: "#filosofia",
      start: "top bottom",
      end: "bottom top",
      scrub: 3,
    },
  });
});

onUnmounted(() => {
  if (intervalo) clearInterval(intervalo);
  ScrollTrigger.getAll().forEach((t) => t.kill());
});
</script>

<template>
  <section id="filosofia" data-theme="dark" class="filosofia-section">
    <div class="filosofia-deco" aria-hidden="true">
      <div class="deco deco--model">
        <img src="/images/model_01.png" alt="" />
      </div>
      <div class="deco deco--aura"></div>
    </div>

    <!-- Layout de 3 columnas -->
    <div class="filosofia-content">
      <!-- Columna izquierda: eyebrow + frase rotativa -->
      <div class="filosofia-left">
        <span class="filosofia-eyebrow">Nuestra filosofía</span>

        <transition name="frase" mode="out-in">
          <div :key="fraseActiva" class="filosofia-frase">
            <span class="filosofia-frase-numero">
              {{ frases[fraseActiva].numero }}
            </span>
            <p class="filosofia-frase-texto">
              {{ frases[fraseActiva].texto }}
            </p>
          </div>
        </transition>

        <div class="filosofia-dots">
          <button
            v-for="(_, i) in frases"
            :key="i"
            class="filosofia-dot"
            :class="{ 'filosofia-dot--active': i === fraseActiva }"
            @click="fraseActiva = i"
            :aria-label="`Ver frase ${i + 1}`"
          />
        </div>
      </div>

      <!-- Columna central: espacio para la imagen -->
      <div class="filosofia-center" aria-hidden="true"></div>

      <!-- Columna derecha: cards -->
      <div class="filosofia-right">
        <div class="filosofia-cards">
          <article
            v-for="(pilar, i) in [
              {
                numero: '01',
                titulo: 'Ciencia Natural',
                descripcion:
                  'Fórmulas respaldadas por investigación con ingredientes 100% de origen vegetal.',
              },
              {
                numero: '02',
                titulo: 'Pureza Comprobada',
                descripcion:
                  'Sin componentes artificiales. Cada ingrediente certificado antes de llegar a ti.',
              },
              {
                numero: '03',
                titulo: 'Bienestar Integral',
                descripcion:
                  'Una práctica diaria que conecta tu piel, tu mente y tu estilo de vida.',
              },
            ]"
            :key="i"
            class="filosofia-card"
          >
            <span class="filosofia-card-numero">{{ pilar.numero }}</span>
            <div class="filosofia-card-body">
              <h3 class="filosofia-card-titulo">{{ pilar.titulo }}</h3>
              <p class="filosofia-card-descripcion">{{ pilar.descripcion }}</p>
            </div>
          </article>
        </div>

        <div class="filosofia-scroll-indicator">
          <ScrollIndicator targetId="tienda" :delay="5000" :light="true" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.filosofia-section {
  position: relative;
  height: 100vh;
  background-color: $color-primary;
  display: flex;
  align-items: stretch;
  overflow: hidden;

  // Aura esquina superior izquierda
  &::before {
    content: "";
    position: absolute;
    top: -120px;
    left: -120px;
    width: 550px;
    height: 550px;
    border-radius: 9999px;
    background: radial-gradient(
      circle,
      rgba(150, 169, 253, 0.14) 0%,
      rgba($color-secondary, 0.08) 40%,
      transparent 65%
    );
    filter: blur(70px);
    pointer-events: none;
    z-index: 0;
  }
}

// Layout 3 columnas
.filosofia-content {
  position: relative;
  z-index: 3;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto;
  padding: 6rem $spacing-md $spacing-lg;
  gap: $spacing-lg;

  @media (min-width: $breakpoint-lg) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    align-items: center;
    padding: 0 $spacing-lg;
    gap: 0;
  }
}

// Columna izquierda
.filosofia-left {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
  z-index: 4;

  @media (min-width: $breakpoint-lg) {
    padding-right: $spacing-md;
    justify-content: center;
    height: 100%;
    padding-left: clamp(1rem, 4vw, 4rem);
  }
}

.filosofia-eyebrow {
  font-family: $font-main;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: $color-secondary;
  /* border: 1px solid rgba($color-secondary, 0.3); */
  padding: 0.4rem 1rem;
  border-radius: 9999px;
  width: fit-content;
}

.filosofia-frase {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filosofia-frase-numero {
  font-family: $font-main;
  font-size: 0.65rem;
  font-weight: 300;
  letter-spacing: 0.3em;
  color: rgba($color-secondary, 0.5);
}

.filosofia-frase-texto {
  font-family: $font-heading;
  font-size: clamp(1.6rem, 3vw, 2.6rem);
  font-weight: 300;
  color: $color-light;
  line-height: 1.2;
  text-shadow: 0 2px 30px rgba(0, 0, 0, 0.5);
}

.filosofia-dots {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.filosofia-dot {
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background-color: rgba($color-light, 0.2);
  border: none;
  cursor: pointer;
  transition: all 0.4s ease;
  padding: 0;

  &--active {
    background-color: $color-secondary;
    width: 20px;
  }
}

// Columna central — espacio vacío para la imagen de fondo
.filosofia-center {
  display: none;

  @media (min-width: $breakpoint-lg) {
    display: block;
  }
}

// Columna derecha
.filosofia-right {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
  z-index: 4;

  @media (min-width: $breakpoint-lg) {
    justify-content: center;
    height: 100%;
    padding-right: clamp(1rem, 4vw, 4rem);
  }
}

.filosofia-cards {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

// Cards con hover de iluminación
.filosofia-card {
  display: flex;
  align-items: flex-start;
  gap: $spacing-sm;
  padding: $spacing-sm $spacing-sm;
  border: none;
  border-radius: 0.75rem;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  cursor: default;
  // Altura uniforme — todas iguales
  min-height: 90px;
  transition:
    box-shadow 0.5s ease,
    background-color 0.5s ease;

  // Luz blanca desde arriba
  &::before {
    content: "";
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
    width: 120%;
    height: 80px;
    background: radial-gradient(
      ellipse at center top,
      rgba(255, 255, 255, 0.19) 0%,
      transparent 80%
    );
    opacity: 0;
    transition: opacity 0.5s ease;
    pointer-events: none;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(16px);
    box-shadow:
      0 0 30px rgba(255, 255, 255, 0.04),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);

    &::before {
      opacity: 1;
    }
  }
}

.filosofia-card-numero {
  font-family: $font-main;
  font-size: 0.65rem;
  font-weight: 300;
  letter-spacing: 0.2em;
  color: rgba($color-secondary, 0.5);
  flex-shrink: 0;
  padding-top: 3px;
}

.filosofia-card-body {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.filosofia-card-titulo {
  font-family: $font-heading;
  font-size: 0.95rem;
  font-weight: 400;
  color: $color-light;
}

.filosofia-card-descripcion {
  font-family: $font-main;
  font-size: 0.8rem;
  font-weight: 300;
  color: $color-gray-light;
  line-height: 1.6;
}

.filosofia-scroll-indicator {
  display: flex;
  justify-content: center;

  @media (min-width: $breakpoint-lg) {
    justify-content: flex-start;
  }
}

// Transición frases
.frase-enter-active {
  transition: all 0.6s ease;
}
.frase-leave-active {
  transition: all 0.35s ease;
}
.frase-enter-from {
  opacity: 0;
  transform: translateY(16px);
}
.frase-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

// ── Capa decorativa ────────────────────────────────────────

.filosofia-deco {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.deco {
  position: absolute;
  will-change: transform;
}

// Imagen — centrada, más nítida, no tan grande
.deco--model {
  // Ocupa toda la sección como fondo
  position: absolute;
  inset: 0;
  width: 100%;
  height: 120%; // extra para parallax
  top: 0;
  left: 0;
  transform: none;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 15%; // muestra el rostro
    display: block;
    filter: brightness(0.45) saturate(0.85);
  }
}

// Aura sutil detrás de la imagen
.deco--aura {
  width: clamp(300px, 40vw, 580px);
  height: clamp(300px, 40vw, 580px);
  border-radius: 9999px;
  background: radial-gradient(
    circle,
    rgba(150, 169, 253, 0.1) 0%,
    rgba($color-secondary, 0.06) 40%,
    transparent 70%
  );
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  filter: blur(40px);
}
</style>
