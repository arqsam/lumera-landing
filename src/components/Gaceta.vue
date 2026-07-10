<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Articulo {
  id: number;
  categoria: string;
  titulo: string;
  extracto: string;
  contenido: string;
  imagen: string;
  fecha: string;
  tiempo: string;
  destacado: boolean;
}

const articulos: Articulo[] = [
  {
    id: 1,
    categoria: "Ritual",
    titulo: "La rutina de noche que transforma tu piel mientras duermes.",
    extracto:
      "Descubre cómo los ingredientes activos trabajan en sincronía con tu ciclo circadiano para regenerar, nutrir e iluminar desde adentro.",
    contenido:
      "La noche es el momento en que tu piel trabaja más. Mientras duermes, el ritmo circadiano activa los mecanismos de regeneración celular, aumenta la producción de colágeno y reduce la inflamación acumulada durante el día. Una rutina nocturna bien diseñada no interrumpe este proceso — lo potencia. El primer paso es la limpieza profunda: remover no solo el maquillaje, sino los residuos de contaminación que oxidan la piel durante el día. El segundo paso es el tratamiento activo: sérum con retinol, ácidos o péptidos según tu tipo de piel. El tercer paso es el sellado: una crema nutritiva que crea una barrera que retiene la hidratación toda la noche. Con Lumera, cada paso está formulado para trabajar en armonía con tu biología.",
    imagen: "/images/model_07.png",
    fecha: "12 Jun 2026",
    tiempo: "5 min",
    destacado: true,
  },
  {
    id: 2,
    categoria: "Ciencia",
    titulo:
      "Vitamina C: el ingrediente que redefine el concepto de luminosidad.",
    extracto:
      "No todas las formas de vitamina C son iguales. Te explicamos cuál es la más estable y por qué marca la diferencia en tu piel.",
    contenido:
      "El ácido ascórbico puro es la forma más potente de vitamina C, pero también la más inestable. Se oxida con la luz y el aire, perdiendo eficacia antes de llegar a tu piel. Por eso en Lumera optamos por el ascorbil glucósido: una forma estable que se convierte en vitamina C activa al contacto con la piel, con una penetración más profunda y sin irritación. Los resultados son visibles desde la primera semana: tono más uniforme, manchas más claras y una luminosidad que no viene de un filtro — viene de adentro.",
    imagen: "/images/product_06.png",
    fecha: "5 Jun 2026",
    tiempo: "4 min",
    destacado: false,
  },
  {
    id: 3,
    categoria: "Bienestar",
    titulo: "Skincare como meditación: el poder de la presencia en tu rutina.",
    extracto:
      "Convertir el cuidado de la piel en un momento de atención plena no es un lujo — es una práctica que cambia cómo te relacionas contigo misma.",
    contenido:
      "La mayoría aplicamos nuestros productos apuradas, pensando en lo que sigue. Pero el tacto consciente sobre la piel activa el sistema nervioso parasimpático — el de la calma. Cuando masajeas un sérum con intención, cuando respiras el aroma de una crema, cuando notas la temperatura de tus manos sobre tu rostro, estás practicando presencia. Y esa presencia tiene efectos reales: reduce el cortisol, mejora la circulación facial y hace que los ingredientes penetren mejor. La próxima vez que abras un producto Lumera, date dos minutos. Solo dos. Tu piel y tu mente lo van a notar.",
    imagen: "/images/model_06.png",
    fecha: "28 May 2026",
    tiempo: "6 min",
    destacado: false,
  },
];

const destacado = articulos.find((a) => a.destacado)!;
const secundarios = articulos.filter((a) => !a.destacado);

// Modal
const articuloAbierto = ref<Articulo | null>(null);

const abrirArticulo = (articulo: Articulo) => {
  articuloAbierto.value = articulo;
  document.body.style.overflow = "hidden";
};

const cerrarArticulo = () => {
  articuloAbierto.value = null;
  document.body.style.overflow = "";
};

onMounted(() => {
  gsap.from(".gaceta-eyebrow, .gaceta-title", {
    opacity: 0,
    y: 30,
    duration: 1,
    ease: "power2.out",
    stagger: 0.15,
    scrollTrigger: {
      trigger: "#gaceta",
      start: "top 80%",
      once: true,
    },
  });

  gsap.from(".gaceta-destacado", {
    opacity: 0,
    x: -40,
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".gaceta-grid",
      start: "top 80%",
      once: true,
    },
  });

  gsap.from(".gaceta-secundario", {
    opacity: 0,
    x: 40,
    duration: 1.2,
    ease: "power2.out",
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".gaceta-grid",
      start: "top 80%",
      once: true,
    },
  });
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach((t) => t.kill());
  document.body.style.overflow = "";
});
</script>

<template>
  <section id="gaceta" data-theme="light" class="gaceta-section">
    <div class="gaceta-header">
      <span class="gaceta-eyebrow">Gaceta Lumera</span>
      <h2 class="gaceta-title">
        Conocimiento que<br />
        <em class="gaceta-title--italic">ilumina.</em>
      </h2>
    </div>

    <div class="gaceta-grid">
      <!-- Artículo destacado — izquierda -->
      <article class="gaceta-destacado" @click="abrirArticulo(destacado)">
        <div class="gaceta-destacado-imagen">
          <img :src="destacado.imagen" :alt="destacado.titulo" />
          <span class="gaceta-categoria">{{ destacado.categoria }}</span>
        </div>
        <div class="gaceta-destacado-body">
          <div class="gaceta-meta">
            <span>{{ destacado.fecha }}</span>
            <span class="gaceta-meta-sep">·</span>
            <span>{{ destacado.tiempo }} lectura</span>
          </div>
          <h3 class="gaceta-destacado-titulo">{{ destacado.titulo }}</h3>
          <p class="gaceta-destacado-extracto">{{ destacado.extracto }}</p>
          <button
            class="gaceta-leer-mas"
            @click.stop="abrirArticulo(destacado)"
          >
            Leer más
          </button>
        </div>
      </article>

      <!-- Artículos secundarios — derecha -->
      <div class="gaceta-secundarios">
        <article
          v-for="articulo in secundarios"
          :key="articulo.id"
          class="gaceta-secundario"
          @click="abrirArticulo(articulo)"
        >
          <div class="gaceta-secundario-imagen">
            <img :src="articulo.imagen" :alt="articulo.titulo" />
            <span class="gaceta-categoria">{{ articulo.categoria }}</span>
          </div>
          <div class="gaceta-secundario-body">
            <div class="gaceta-meta">
              <span>{{ articulo.fecha }}</span>
              <span class="gaceta-meta-sep">·</span>
              <span>{{ articulo.tiempo }} lectura</span>
            </div>
            <h3 class="gaceta-secundario-titulo">{{ articulo.titulo }}</h3>
            <p class="gaceta-secundario-extracto">{{ articulo.extracto }}</p>
            <button
              class="gaceta-leer-mas"
              @click.stop="abrirArticulo(articulo)"
            >
              Leer más
            </button>
          </div>
        </article>
      </div>
    </div>

    <!-- Modal de artículo -->
    <Transition name="modal">
      <div
        v-if="articuloAbierto"
        class="gaceta-modal-overlay"
        @click="cerrarArticulo"
      >
        <div class="gaceta-modal" @click.stop>
          <button class="gaceta-modal-cerrar" @click="cerrarArticulo">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div class="gaceta-modal-imagen">
            <img :src="articuloAbierto.imagen" :alt="articuloAbierto.titulo" />
            <span class="gaceta-categoria">{{
              articuloAbierto.categoria
            }}</span>
          </div>

          <div class="gaceta-modal-body">
            <div class="gaceta-meta">
              <span>{{ articuloAbierto.fecha }}</span>
              <span class="gaceta-meta-sep">·</span>
              <span>{{ articuloAbierto.tiempo }} lectura</span>
            </div>
            <h2 class="gaceta-modal-titulo">{{ articuloAbierto.titulo }}</h2>
            <p class="gaceta-modal-extracto">{{ articuloAbierto.extracto }}</p>
            <div class="gaceta-modal-divider"></div>
            <p class="gaceta-modal-contenido">
              {{ articuloAbierto.contenido }}
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.gaceta-section {
  background-color: $color-light;
  padding: $spacing-lg $spacing-md;
  // Necesario para que el modal cubra la galería arriba
  position: relative;
}

.gaceta-header {
  margin-bottom: $spacing-lg;
}

.gaceta-eyebrow {
  display: inline-block;
  font-family: $font-main;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: $color-secondary;
  margin-bottom: $spacing-sm;
}

.gaceta-title {
  font-family: $font-heading;
  font-size: clamp(2rem, 3.5vw, 3.2rem);
  font-weight: 300;
  color: $color-primary;
  line-height: 1.2;
  margin-top: $spacing-xs;
}

.gaceta-title--italic {
  font-style: italic;
  color: $color-secondary;
}

.gaceta-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-lg;

  @media (min-width: $breakpoint-lg) {
    grid-template-columns: 1.4fr 1fr;
    align-items: start;
  }
}

// ── Artículo destacado ─────────────────────────────────────

.gaceta-destacado {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
  cursor: pointer;

  &:hover .gaceta-destacado-imagen img {
    transform: scale(1.03);
  }
}

.gaceta-destacado-imagen {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4 / 3;

  @media (min-width: $breakpoint-lg) {
    aspect-ratio: 3 / 2;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
    transition: transform 0.6s ease;
    filter: saturate(0.92);
  }
}

.gaceta-categoria {
  position: absolute;
  top: $spacing-sm;
  left: $spacing-sm;
  font-family: $font-main;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: $color-light;
  background-color: $color-secondary;
  padding: 0.3rem 0.8rem;
  border-radius: 9999px;
}

.gaceta-destacado-body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.gaceta-meta {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-family: $font-main;
  font-size: 0.75rem;
  font-weight: 300;
  color: $color-gray-medium;
  letter-spacing: 0.05em;
}

.gaceta-meta-sep {
  color: $color-gray-light;
}

.gaceta-destacado-titulo {
  font-family: $font-heading;
  font-size: clamp(1.4rem, 2.5vw, 2rem);
  font-weight: 400;
  color: $color-primary;
  line-height: 1.25;
}

.gaceta-destacado-extracto {
  font-family: $font-main;
  font-size: 0.9rem;
  font-weight: 300;
  color: $color-gray-medium;
  line-height: 1.7;
}

// ── Artículos secundarios ──────────────────────────────────

.gaceta-secundarios {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.gaceta-secundario {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: $spacing-sm;
  cursor: pointer;
  padding-bottom: $spacing-md;
  border-bottom: 1px solid rgba($color-primary, 0.08);

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  &:hover .gaceta-secundario-imagen img {
    transform: scale(1.05);
  }

  @media (min-width: $breakpoint-md) {
    grid-template-columns: 160px 1fr;
  }
}

.gaceta-secundario-imagen {
  position: relative;
  overflow: hidden;
  aspect-ratio: 1 / 1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
    transition: transform 0.6s ease;
    filter: saturate(0.92);
  }
}

.gaceta-secundario-body {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
}

.gaceta-secundario-titulo {
  font-family: $font-heading;
  font-size: clamp(0.95rem, 1.5vw, 1.15rem);
  font-weight: 400;
  color: $color-primary;
  line-height: 1.3;
}

.gaceta-secundario-extracto {
  font-family: $font-main;
  font-size: 0.8rem;
  font-weight: 300;
  color: $color-gray-medium;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.gaceta-leer-mas {
  font-family: $font-main;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: $color-primary;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  position: relative;
  width: fit-content;
  transition: color 0.3s ease;

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: $color-secondary;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  &:hover {
    color: $color-secondary;
    &::after {
      transform: scaleX(1);
    }
  }
}

// ── Modal ──────────────────────────────────────────────────

.gaceta-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $spacing-md;
}

.gaceta-modal {
  background: $color-light;
  max-width: 780px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: $breakpoint-md) {
    grid-template-columns: 1fr 1.2fr;
    max-height: 85vh;
  }

  // Scrollbar sutil
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba($color-secondary, 0.3);
    border-radius: 9999px;
  }
}

.gaceta-modal-cerrar {
  position: absolute;
  top: $spacing-sm;
  right: $spacing-sm;
  width: 2.2rem;
  height: 2.2rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition:
    background 0.3s ease,
    transform 0.3s ease;

  svg {
    width: 1rem;
    height: 1rem;
    color: $color-primary;
  }

  &:hover {
    background: $color-light;
    transform: scale(1.08);
  }
}

.gaceta-modal-imagen {
  position: relative;
  overflow: hidden;
  aspect-ratio: 1 / 1;

  @media (min-width: $breakpoint-md) {
    aspect-ratio: auto;
    min-height: 100%;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
  }
}

.gaceta-modal-body {
  padding: $spacing-lg $spacing-md;
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
  overflow-y: auto;
}

.gaceta-modal-titulo {
  font-family: $font-heading;
  font-size: clamp(1.4rem, 2vw, 1.8rem);
  font-weight: 400;
  color: $color-primary;
  line-height: 1.2;
}

.gaceta-modal-extracto {
  font-family: $font-main;
  font-size: 0.9rem;
  font-weight: 400;
  color: $color-gray-medium;
  line-height: 1.7;
  font-style: italic;
}

.gaceta-modal-divider {
  width: 3rem;
  height: 1px;
  background-color: $color-secondary;
  margin: $spacing-xs 0;
}

.gaceta-modal-contenido {
  font-family: $font-main;
  font-size: 0.88rem;
  font-weight: 300;
  color: $color-primary;
  line-height: 1.8;
}

// ── Transición modal ───────────────────────────────────────

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.35s ease;

  .gaceta-modal {
    transition:
      transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
      opacity 0.35s ease;
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;

  .gaceta-modal {
    transform: scale(0.94);
    opacity: 0;
  }
}
</style>
