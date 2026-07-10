<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const columna1 = [
  { src: "/images/model_01.png", alt: "Modelo Lumera con piel luminosa" },
  { src: "/images/product_01.png", alt: "Radiance Elixir Lumera" },
  { src: "/images/model_05.png", alt: "Dos modelos Lumera" },
  { src: "/images/product_04.png", alt: "Mattifying Mineral Sunscreen Lumera" },
  { src: "/images/model_02.png", alt: "Modelo Lumera con piel radiante" },
  { src: "/images/product_05.png", alt: "Hydrating Repair Cream Lumera" },
];

const columna2 = [
  { src: "/images/product_02.png", alt: "Nourishing Facial Oil Lumera" },
  { src: "/images/model_03.png", alt: "Modelo aplicando crema Lumera" },
  { src: "/images/product_01.png", alt: "Radiance Elixir Lumera" },
  { src: "/images/model_04.png", alt: "Modelo aplicando sérum Lumera" },
  { src: "/images/model_01.png", alt: "Modelo Lumera con piel luminosa" },
];

const columna3 = [
  { src: "/images/product_05.png", alt: "Hydrating Repair Cream Lumera" },
  { src: "/images/model_02.png", alt: "Modelo Lumera con piel radiante" },
  { src: "/images/product_03.png", alt: "Hydrating Water Cream Lumera" },
  { src: "/images/model_05.png", alt: "Modelos Lumera" },
  { src: "/images/product_02.png", alt: "Nourishing Facial Oil Lumera" },
];

onMounted(() => {
  const titulo = document.querySelector(
    ".galeria-titulo-wrapper",
  ) as HTMLElement;

  // Entrada del título cuando la sección llega al viewport
  gsap.from(titulo, {
    opacity: 0,
    y: 40,
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#galeria",
      start: "top 60%",
      once: true,
    },
  });

  // Título aparece cuando la sección entra
  gsap.to(titulo, {
    opacity: 1,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#galeria",
      start: "top center",
      end: "top 20%",
      scrub: 1,
    },
  });

  // Título desaparece antes de llegar a Gaceta
  gsap.to(titulo, {
    opacity: 0,
    duration: 0.8,
    ease: "power2.in",
    scrollTrigger: {
      trigger: "#galeria",
      start: "75% center",
      end: "93% center",
      scrub: 1,
    },
  });

  // Parallax por columna — sin cambios
  gsap.to(".galeria-col--1", {
    y: -80,
    ease: "none",
    scrollTrigger: {
      trigger: "#galeria",
      start: "top bottom",
      end: "bottom top",
      scrub: 2,
    },
  });

  gsap.to(".galeria-col--2", {
    y: -140,
    ease: "none",
    scrollTrigger: {
      trigger: "#galeria",
      start: "top bottom",
      end: "bottom top",
      scrub: 1.5,
    },
  });

  gsap.to(".galeria-col--3", {
    y: -100,
    ease: "none",
    scrollTrigger: {
      trigger: "#galeria",
      start: "top bottom",
      end: "bottom top",
      scrub: 2.5,
    },
  });
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach((t) => t.kill());
});
</script>

<template>
  <section id="galeria" data-theme="light" class="galeria-section">
    <!-- Título sticky superpuesto — acompaña el scroll -->
    <div class="galeria-titulo-wrapper">
      <span class="galeria-eyebrow">Galería</span>
      <h2 class="galeria-title">
        Lumera<br />
        <em class="galeria-title--italic">en cada momento.</em>
      </h2>
    </div>

    <!-- Collage full-width sin gaps -->
    <div class="galeria-collage">
      <div class="galeria-col galeria-col--1">
        <div
          v-for="(item, i) in columna1"
          :key="`c1-${i}`"
          class="galeria-img-wrapper"
        >
          <img :src="item.src" :alt="item.alt" loading="lazy" />
        </div>
      </div>

      <div class="galeria-col galeria-col--2">
        <div
          v-for="(item, i) in columna2"
          :key="`c2-${i}`"
          class="galeria-img-wrapper"
        >
          <img :src="item.src" :alt="item.alt" loading="lazy" />
        </div>
      </div>

      <div class="galeria-col galeria-col--3">
        <div
          v-for="(item, i) in columna3"
          :key="`c3-${i}`"
          class="galeria-img-wrapper"
        >
          <img :src="item.src" :alt="item.alt" loading="lazy" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.galeria-section {
  background-color: $color-light;
  position: relative;
  overflow: hidden;
}

.galeria-titulo-wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  text-align: center;
  pointer-events: none;
  width: 100%;
  padding: 0 $spacing-md;
  opacity: 0; // GSAP lo muestra
}

.galeria-eyebrow {
  display: inline-block;
  font-family: $font-main;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: $color-light;
  margin-bottom: 0.5rem;
  text-shadow: 0 1px 8px rgba(255, 255, 255, 0.6);
}

.galeria-title {
  font-family: $font-heading;
  font-size: clamp(5rem, 12vw, 12rem);
  font-weight: 900;
  line-height: 1;
  // Sin color — el efecto glass lo da el background-clip
  color: transparent;
  // Fondo blanco semitransparente recortado a la forma de las letras
  background-color: rgba(255, 255, 255, 0.25);
  -webkit-background-clip: text;
  background-clip: text;
  // Contorno sutil para definir las letras
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.1);
  filter: drop-shadow(0 2px 12px rgba(255, 255, 255, 0.4));
  text-shadow: 0 1px 8px rgba(255, 255, 255, 0.25);
}

// "en cada momento"
.galeria-title--italic {
  display: block;
  font-family: $font-heading;
  font-style: italic;
  font-weight: 300;
  font-size: clamp(1.2rem, 2vw, 2rem);
  color: $color-gray-light-ultra;
  background: none;
  -webkit-background-clip: unset;
  background-clip: unset;
  -webkit-text-stroke: 0;
  filter: none;
  /* text-shadow: 0 1px 8px rgba(255, 255, 255, 0.2); */
  margin-top: 0.5rem;
}

// Collage — 3 columnas sin gap entre columnas
.galeria-collage {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  align-items: start;
}

.galeria-col {
  display: flex;
  flex-direction: column;
  gap: 0;
  will-change: transform;
}

// Offsets para asimetría — negativos para eliminar espacios blancos
.galeria-col--1 {
  margin-top: -40px;
}

.galeria-col--2 {
  margin-top: 60px;
}

.galeria-col--3 {
  margin-top: 20px;
}

// Imágenes — altura automática para no recortar
.galeria-img-wrapper {
  width: 100%;
  overflow: hidden;
  cursor: zoom-in;
  // Separación mínima entre imágenes
  margin-bottom: 4px;

  img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: cover;
    filter: saturate(0.92);
    transition:
      transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94),
      filter 0.7s ease;
  }

  &:hover img {
    transform: scale(1.14);
    filter: saturate(1.2) brightness(1.05);
  }
}

// ── Mobile — 2 columnas ────────────────────────────────────

@media (max-width: #{$breakpoint-lg}) {
  .galeria-collage {
    grid-template-columns: repeat(2, 1fr);
  }

  .galeria-col--3 {
    display: none;
  }

  .galeria-col--1 {
    margin-top: 0;
  }

  .galeria-col--2 {
    margin-top: 30px;
  }

  .galeria-titulo-wrapper {
    margin-bottom: -120px;
  }

  .galeria-title {
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-size: clamp(4rem, 8vw, 8rem);
  }
  .galeria-title--italic {
    margin-top: 1rem;
    color: $color-gray-medium;
  }
}
</style>
