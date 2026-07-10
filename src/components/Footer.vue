<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const email = ref("");
const suscrito = ref(false);
const errorEmail = ref(false);

const suscribir = () => {
  const esValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
  if (!esValido) {
    errorEmail.value = true;
    return;
  }
  errorEmail.value = false;
  suscrito.value = true;
  email.value = "";
};

const links = [
  { label: "Tienda", href: "#tienda" },
  { label: "Filosofía", href: "#filosofia" },
  { label: "Galería", href: "#galeria" },
  { label: "Gaceta", href: "#gaceta" },
];

const redes = [
  {
    nombre: "Instagram",
    href: "#",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
    </svg>`,
  },
  {
    nombre: "TikTok",
    href: "#",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
    </svg>`,
  },
  {
    nombre: "Pinterest",
    href: "#",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.22-5.17 1.22-5.17s-.31-.62-.31-1.54c0-1.45.84-2.53 1.88-2.53.89 0 1.32.67 1.32 1.47 0 .9-.57 2.24-.87 3.48-.25 1.04.52 1.88 1.54 1.88 1.85 0 3.09-2.37 3.09-5.18 0-2.14-1.44-3.74-4.04-3.74-2.94 0-4.77 2.2-4.77 4.64 0 .84.24 1.43.62 1.89.17.2.19.28.13.51-.04.17-.15.57-.19.73-.06.24-.25.32-.46.23-1.32-.54-1.94-2-1.94-3.63 0-2.69 2.26-5.9 6.74-5.9 3.6 0 5.97 2.6 5.97 5.4 0 3.69-2.05 6.45-5.07 6.45-1.01 0-1.97-.55-2.3-1.17l-.64 2.47c-.19.74-.7 1.66-1.05 2.23.79.24 1.62.37 2.49.37 5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
    </svg>`,
  },
];

onMounted(() => {
  gsap.from(".footer-logo", {
    opacity: 0,
    y: 30,
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#footer",
      start: "top 85%",
      once: true,
    },
  });

  gsap.from(".footer-newsletter, .footer-links-col, .footer-redes", {
    opacity: 0,
    y: 20,
    duration: 1,
    ease: "power2.out",
    stagger: 0.15,
    scrollTrigger: {
      trigger: "#footer",
      start: "top 80%",
      once: true,
    },
  });
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach((t) => t.kill());
});
</script>

<template>
  <footer id="footer" data-theme="dark" class="footer-section">

    <!-- Imagen de fondo sutil -->
    <div class="footer-bg" aria-hidden="true">
      <img src="/images/model_01.png" alt="" />
    </div>

    <!-- Overlay -->
    <div class="footer-overlay" aria-hidden="true"></div>

    <div class="footer-inner">

      <!-- Logo y tagline -->
      <div class="footer-logo-wrapper">
        <a href="#hero" class="footer-logo">Lumera</a>
        <p class="footer-tagline">
          Tecnología natural para tu piel,<br />mente y bienestar.
        </p>
      </div>

      <!-- Grid: newsletter + links + redes -->
      <div class="footer-grid">

        <!-- Newsletter -->
        <div class="footer-newsletter">
          <h3 class="footer-newsletter-title">Únete a la gaceta</h3>
          <p class="footer-newsletter-desc">
            Rituales, ciencia y bienestar — directo a tu correo.
          </p>
          <div class="footer-form">
            <input
              v-model="email"
              type="email"
              placeholder="tu@correo.com"
              class="footer-input"
              :class="{ 'footer-input--error': errorEmail }"
              @keyup.enter="suscribir"
              aria-label="Correo electrónico para newsletter"
            />
            <button class="footer-btn" @click="suscribir">
              {{ suscrito ? '✓' : 'Suscribir' }}
            </button>
          </div>
          <Transition name="fade">
            <p v-if="errorEmail" class="footer-error">
              Ingresa un correo válido.
            </p>
            <p v-else-if="suscrito" class="footer-success">
              ¡Bienvenida a Lumera!
            </p>
          </Transition>
        </div>

        <!-- Links de navegación -->
        <div class="footer-links-col">
          <h3 class="footer-col-title">Explorar</h3>
          <nav>
            <a
              v-for="link in links"
              :key="link.label"
              :href="link.href"
              class="footer-link"
            >
              {{ link.label }}
            </a>
          </nav>
        </div>

        <!-- Redes sociales -->
        <div class="footer-redes">
          <h3 class="footer-col-title">Síguenos</h3>
          <div class="footer-redes-icons">
            <a
              v-for="red in redes"
              :key="red.nombre"
              :href="red.href"
              class="footer-red-link"
              :aria-label="red.nombre"
              v-html="red.icon"
            </a>
          </div>
        </div>

      </div>

      <!-- Copyright -->
      <div class="footer-bottom">
        <p class="footer-copyright">
          © 2026 Lumera. Todos los derechos reservados.
        </p>
        <p class="footer-legal">
          <a href="#" class="footer-legal-link">Privacidad</a>
          <span>·</span>
          <a href="#" class="footer-legal-link">Términos</a>
        </p>
      </div>

    </div>

  </footer>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;
@use "sass:color";

.footer-section {
  position: relative;
  background-color: $color-primary;
  overflow: hidden;
  color: $color-light;
}

// Imagen de fondo sutil
.footer-bg {
  position: absolute;
  inset: 0;
  z-index: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    filter: brightness(0.3) saturate(0.2);
  }
}

// Overlay gradiente
.footer-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    to bottom,
    rgba($color-primary, 0.7) 0%,
    rgba($color-primary, 0.92) 40%,
    rgba($color-primary, 0.98) 100%
  );
}

.footer-inner {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: $spacing-lg $spacing-md;
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
}

// Logo y tagline
.footer-logo-wrapper {
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;
}

.footer-logo {
  font-family: $font-heading;
  font-size: 2.5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: $color-light;
  text-decoration: none;
  // Transición explícita para todas las propiedades que cambian
  transition:
    filter 0.5s ease,
    text-shadow 0.5s ease,
    -webkit-text-stroke 0.5s ease;

  &:hover {
    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.1);
    filter: drop-shadow(0 2px 12px rgba(255, 255, 255, 0.4));
    text-shadow: 0 1px 8px rgba(255, 255, 255, 0.25);
  }

  @media (min-width: $breakpoint-md) {
    font-size: 3.5rem;
  }
}

.footer-tagline {
  font-family: $font-main;
  font-size: 0.9rem;
  font-weight: 300;
  color: $color-gray-light;
  line-height: 1.6;
}

// Grid
.footer-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-lg;

  @media (min-width: $breakpoint-md) {
    grid-template-columns: 1.8fr 1fr 1fr;
    gap: $spacing-lg;
    align-items: start;
  }
}

// Newsletter
.footer-newsletter {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-newsletter-title {
  font-family: $font-heading;
  font-size: 1.1rem;
  font-weight: 400;
  color: $color-light;
}

.footer-newsletter-desc {
  font-family: $font-main;
  font-size: 0.85rem;
  font-weight: 300;
  color: $color-gray-light;
  line-height: 1.6;
}

.footer-form {
  display: flex;
  gap: 0;
  border: 1px solid rgba($color-light, 0.2);
  border-radius: 9999px;
  overflow: hidden;
  transition: border-color 0.3s ease;

  &:focus-within {
    border-color: rgba($color-secondary, 0.6);
  }
}

.footer-input {
  flex: 1;
  background: transparent;
  border: none;
  padding: 0.75rem 1.2rem;
  font-family: $font-main;
  font-size: 0.85rem;
  font-weight: 300;
  color: $color-light;
  outline: none;

  &::placeholder {
    color: rgba($color-light, 0.35);
  }

  &--error {
    color: #ff6b6b;
  }
}

.footer-btn {
  background-color: $color-secondary;
  color: $color-light;
  border: none;
  padding: 0.75rem 1.4rem;
  font-family: $font-main;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  cursor: pointer;
  white-space: nowrap;
  transition:
    filter 0.5s ease,
    text-shadow 0.5s ease,
    -webkit-text-stroke 0.5s ease;


  &:hover {
    background-color: color.adjust(#be8e6b, $lightness: -6%);
    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.1);
    filter: drop-shadow(0 2px 12px rgba(255, 255, 255, 0.4));
    text-shadow: 0 1px 8px rgba(255, 255, 255, 0.25);
  }
}

.footer-error {
  font-family: $font-main;
  font-size: 0.75rem;
  color: #ff6b6b;
}

.footer-success {
  font-family: $font-main;
  font-size: 0.75rem;
  color: $color-secondary;
  font-style: italic;
}

// Columnas links y redes
.footer-col-title {
  font-family: $font-heading;
  font-size: 1rem;
  font-weight: 400;
  color: $color-light;
  margin-bottom: $spacing-sm;
}

.footer-links-col nav {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.footer-link {
  font-family: $font-main;
  font-size: 0.85rem;
  font-weight: 300;
  color: $color-gray-light;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: color 0.3s ease;
  width: fit-content;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background-color: $color-secondary;
    transition: width 0.3s ease;
  }

  &:hover {
    color: $color-light;
    &::after { width: 100%; }
  }
}

// Redes
.footer-redes-icons {
  display: flex;
  gap: $spacing-sm;
}

.footer-red-link {
  width: 2.2rem;
  height: 2.2rem;
  color: $color-gray-light;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease, transform 0.3s ease;

  svg {
    width: 100%;
    height: 100%;
  }

  &:hover {
    color: $color-secondary;
    transform: translateY(-3px);
  }
}

// Bottom
.footer-bottom {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: $spacing-md;
  border-top: 1px solid rgba($color-light, 0.08);

  @media (min-width: $breakpoint-md) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.footer-copyright {
  font-family: $font-main;
  font-size: 0.75rem;
  font-weight: 300;
  color: rgba($color-light, 0.4);
}

.footer-legal {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-family: $font-main;
  font-size: 0.75rem;
  color: rgba($color-light, 0.3);
}

.footer-legal-link {
  color: rgba($color-light, 0.4);
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: $color-light;
  }
}

// Transición fade
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>