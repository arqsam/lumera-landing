<script setup lang="ts">
import { onMounted, nextTick } from "vue";
import { gsap } from "gsap";
import Header from "./Header.vue";

onMounted(async () => {
  await nextTick();

  gsap.from(".hero-title", {
    opacity: 0,
    y: 40,
    duration: 1.4,
    ease: "power2.out",
    delay: 0.2,
  });

  gsap.from(".hero-subtitle", {
    opacity: 0,
    y: 30,
    duration: 1.4,
    ease: "power2.out",
    delay: 0.5,
  });

  gsap.fromTo(
    ".hero-button",
    { opacity: 0, y: 5 },
    {
      opacity: 1,
      y: 0,
      duration: 1.4,
      ease: "power2.out",
      delay: 0.9,
    }
  );

  const button = document.querySelector(".hero-button");
  if (button) {
    button.addEventListener("mouseenter", () => {
      gsap.to(button, {
        boxShadow: "0 0 25px rgba(255, 255, 255, 0.7)",
        rotation: 0.2,
        duration: 0.3,
        ease: "power1.out",
      });
    });
    button.addEventListener("mouseleave", () => {
      gsap.to(button, {
        boxShadow: "none",
        rotation: 0,
        duration: 0.3,
        ease: "power1.inOut",
      });
    });
  }
});
</script>

<template>
  <Header />
  <section class="hero-section">
    <video class="hero-video" autoplay muted loop playsinline>
      <source src="/videos/skincare_02.mp4" type="video/mp4" />
      Tu navegador no soporta el video.
    </video>

    <div class="hero-glow"></div>
    <div class="hero-overlay"></div>

    <div class="hero-content-wrapper">
      <div class="hero-content">
        <h1 class="hero-title">
          Ilumina tu rutina.
          <span class="hero-title--italic">Vive Lumera.</span>
        </h1>
        <p class="hero-subtitle">
          Tecnología para el cuidado de tu piel, mente y bienestar.
        </p>
      </div>
    </div>

    <div class="hero-button-wrapper">
      <button class="hero-button">Explorar productos</button>
    </div>

    <div class="hero-background-circle"></div>
  </section>
</template>
<style scoped lang="scss">
.hero-section {
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
}

.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  filter: brightness(0.8);
}

.hero-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle,
    rgba(168, 168, 167, 0.5),
    transparent 70%
  );
  z-index: 2;
  pointer-events: none;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background-color: $shadow-color-light;
  backdrop-filter: blur(4px);
  z-index: 2;
}

.hero-content-wrapper {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  z-index: 3;
  position: relative;
  text-align: center;
}

.hero-content {
  padding: 1.5rem;
}

.hero-title {
  color: $color-light;
  font-family: $font-heading;
  font-weight: 300;
  font-size: 3rem;
  line-height: 1.2;
  margin-bottom: 1rem;

  @media (min-width: $breakpoint-md) {
    font-size: 4.5rem;
  }
}

.hero-title--italic {
  font-family: $font-heading;
  font-weight: 900;
}

.hero-subtitle {
  color: $color-gray-light-ultra;
  font-size: 1.8rem;
  font-family: $font-main;
  font-weight: 300;
  margin-bottom: 2rem;
}

.hero-button-wrapper {
  position: relative;
  z-index: 3;
  display: flex;
  justify-content: center;
  margin-bottom: 4rem;
}

.hero-button {
  background-color: $color-gray-light-ultra;
  color: $color-gray-medium;
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  font-family: $font-main;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease-in-out;
  width: 18rem;
  height: 3.5rem;

  &:hover {
    background-color: $color-light;
    color: $color-gray-dark;
    transform: scale(1.05);
  }

  @media (min-width: $breakpoint-md) {
    width: 50rem;
  }
}

.hero-background-circle {
  position: absolute;
  top: -2.5rem;
  left: 50%;
  width: min(100vw, 100vh);
  height: min(100vw, 100vh);
  transform: translateX(-50%);
  background: linear-gradient(
    to top right,
    rgba(#ffc20c, 0.3),
    rgba(#ffb347, 0.1)
  );
  border-radius: 9999px;
  filter: blur(96px);
  animation: pulse-slow 8s ease-in-out infinite;
  z-index: 1;
}

@keyframes pulse-slow {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.5;
  }
}
</style>
