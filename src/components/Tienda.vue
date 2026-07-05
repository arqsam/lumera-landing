<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  alt: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Sérum Luminoso",
    description:
      "Vitamina C estabilizada para una piel radiante desde el primer uso.",
    price: "$890",
    image: "/images/product_01.jpg",
    alt: "Sérum luminoso Lumera con vitamina C",
  },
  {
    id: 2,
    name: "Ritual Dorado",
    description:
      "Aceite facial con extractos botánicos para nutrir e iluminar.",
    price: "$1,200",
    image: "/images/woman_yellow.jpg",
    alt: "Modelo aplicando el ritual dorado Lumera",
  },
  {
    id: 3,
    name: "Crema Calma",
    description:
      "Hidratación profunda con ácido hialurónico y aloe vera orgánico.",
    price: "$750",
    image: "/images/product_01.jpg",
    alt: "Crema calmante Lumera con aloe vera",
  },
];

onMounted(() => {
  // Entrada suave del título y subtítulo
  gsap.from(".tienda-header", {
    opacity: 0,
    y: 50,
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#tienda",
      start: "top 80%",
      once: true,
    },
  });

  // Cards entran en cascada
  gsap.from(".tienda-card", {
    opacity: 0,
    y: 60,
    duration: 1,
    ease: "power2.out",
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".tienda-grid",
      start: "top 85%",
      once: true,
    },
  });
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach((t) => t.kill());
});
</script>

<template>
  <section id="tienda" class="tienda-section">
    <div class="tienda-header">
      <h2 class="tienda-title">Nuestra Tienda</h2>
      <p class="tienda-subtitle">
        Productos formulados con intención, para una rutina que transforma.
      </p>
    </div>

    <div class="tienda-grid">
      <article
        v-for="product in products"
        :key="product.id"
        class="tienda-card"
      >
        <div class="tienda-card-image-wrapper">
          <img
            :src="product.image"
            :alt="product.alt"
            class="tienda-card-image"
          />
        </div>
        <div class="tienda-card-body">
          <h3 class="tienda-card-name">{{ product.name }}</h3>
          <p class="tienda-card-description">{{ product.description }}</p>
          <div class="tienda-card-footer">
            <span class="tienda-card-price">{{ product.price }}</span>
            <button class="tienda-card-button">Ver producto</button>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.tienda-section {
  padding: $spacing-lg $spacing-md;
  background-color: $color-light;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.tienda-header {
  text-align: center;
  margin-bottom: $spacing-lg;
}

.tienda-title {
  font-family: $font-heading;
  font-size: 2.5rem;
  font-weight: 400;
  color: $color-primary;
  margin-bottom: $spacing-xs;

  @media (min-width: $breakpoint-md) {
    font-size: 3rem;
  }
}

.tienda-subtitle {
  font-family: $font-main;
  font-size: 1rem;
  color: $color-gray-medium;
  font-weight: 300;
  max-width: 480px;
  margin: 0 auto;
}

.tienda-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-md;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: $breakpoint-md) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: $breakpoint-lg) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.tienda-card {
  background-color: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: $shadow-elevated;
  transition:
    transform 0.4s ease,
    box-shadow 0.5s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 35px rgba(0, 0, 0, 0.09);
  }
}

.tienda-card-image-wrapper {
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

.tienda-card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;

  .tienda-card:hover & {
    transform: scale(1.04);
  }
}

.tienda-card-body {
  padding: $spacing-sm $spacing-sm $spacing-md;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: $spacing-xs;
}

.tienda-card-name {
  font-family: $font-heading;
  font-size: 1.25rem;
  font-weight: 400;
  color: $color-primary;
}

.tienda-card-description {
  font-family: $font-main;
  font-size: 0.9rem;
  color: $color-gray-medium;
  font-weight: 300;
  line-height: 1.5;
  flex: 1;
}

.tienda-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: $spacing-sm;
}

.tienda-card-price {
  font-family: $font-main;
  font-size: 1.1rem;
  font-weight: 600;
  color: $color-secondary;
}

.tienda-card-button {
  font-family: $font-main;
  font-size: 0.875rem;
  font-weight: 400;
  color: $color-light;
  background-color: $color-gray-medium;
  padding: 0.5rem 1.5rem;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.4s ease;
  letter-spacing: 0.03em;

  &:hover {
    background-color: $color-gray-dark;
    transform: scale(1.02);
  }
}

// Transición suave al fondo claro de la siguiente sección
.hero-section::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 180px;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(249, 250, 251, 0.85) 70%,
    #f9fafb 100%
  );
  z-index: 4;
  pointer-events: none;
}
</style>
