<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from "vue";
import { gsap } from "gsap";
import { ShoppingBagIcon } from "@heroicons/vue/24/outline";

const isVisible = ref(false);
const hasAppeared = ref(false);
const showHeader = ref(false);

onMounted(() => {
  const triggerBtn = document.querySelector(".hero-button");
  if (triggerBtn) {
    triggerBtn.addEventListener("mouseenter", () => {
      if (!hasAppeared.value) {
        hasAppeared.value = true;
        isVisible.value = true;
      }
    });
  }

  window.addEventListener("scroll", () => {
    const hero = document.querySelector("#hero");
    if (!hero) return;

    const rect = hero.getBoundingClientRect();

    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      isVisible.value = true;
    } else {
      isVisible.value = false;
    }
  });
});

watch(isVisible, (visible) => {
  if (visible) {
    showHeader.value = true;
    nextTick(() => {
      gsap.set(".header-nav", { y: -60, opacity: 0 });
      gsap.to(".header-nav", {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      });
    });
  } else {
    gsap.to(".header-nav", {
      y: -60,
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        showHeader.value = false;
      },
    });
  }
});
</script>

<template>
  <header v-if="showHeader" class="header-nav">
    <a href="#hero" class="header-logo">Lumera</a>
    <nav class="header-nav-links">
      <a href="#tienda" class="header-nav-link">Tienda</a>
      <a href="#filosofia" class="header-nav-link">Filosofía</a>
      <a href="#galeria" class="header-nav-link">Galería</a>
      <a href="#gaceta" class="header-nav-link">Gaceta</a>
    </nav>

    <button class="header-buy-button" aria-label="bag">
      <div style="width: 23px; height: auto">
        <ShoppingBagIcon class="size-6 text-black" />
      </div>
    </button>
  </header>
</template>

<style scoped lang="scss"></style>
