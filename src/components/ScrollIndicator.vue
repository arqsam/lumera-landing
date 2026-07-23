<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";

const props = defineProps<{
  targetId: string;
  delay?: number;
  light?: boolean;
}>();

const isVisible = ref(false);
const indicatorRef = ref<HTMLButtonElement | null>(null);
let timeout: ReturnType<typeof setTimeout> | null = null;

const scrollToNext = () => {
  const target = document.querySelector(`#${props.targetId}`);
  target?.scrollIntoView({ behavior: "smooth" });
};

onMounted(() => {
  timeout = setTimeout(() => {
    isVisible.value = true;
    // Espera al siguiente tick para que el elemento esté en el DOM
    setTimeout(() => {
      if (indicatorRef.value) {
        gsap.fromTo(
          indicatorRef.value,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 1.8, ease: "power3.out" },
        );
      }
    }, 50);
  }, props.delay ?? 3000);
});

onUnmounted(() => {
  if (timeout) clearTimeout(timeout);
});
</script>

<template>
  <button
    v-if="isVisible"
    ref="indicatorRef"
    class="scroll-indicator"
    :class="{ 'scroll-indicator--light': props.light }"
    @click="scrollToNext"
    :aria-label="`Ir a la sección ${targetId}`"
  >
    <span class="scroll-indicator-label">Descubrir</span>
    <div class="scroll-indicator-arrow">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.2"
      >
        <path d="M12 5v14M5 12l7 7 7-7" />
      </svg>
    </div>
  </button>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.scroll-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  padding: 0.5rem;
  opacity: 0; // empieza invisible, GSAP lo anima
  transition: transform 0.4s ease;

  &:hover {
    transform: translateY(4px);
  }
}

.scroll-indicator--light {
  color: rgba($color-light, 0.75);
}

.scroll-indicator-label {
  font-family: $font-main;
  font-size: 0.65rem;
  font-weight: 300;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  opacity: 0.6;
}

.scroll-indicator-arrow {
  width: 1.4rem;
  height: 1.4rem;
  animation: bounce-slow 3s ease-in-out infinite;

  svg {
    width: 100%;
    height: 100%;
  }
}

@keyframes bounce-slow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(6px);
  }
}
</style>
