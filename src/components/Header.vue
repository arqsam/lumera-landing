<script setup lang="ts">
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import { ShoppingBagIcon } from "@heroicons/vue/24/outline";

const isVisible = ref(false);

onMounted(() => {
  const triggerBtn = document.querySelector(".hero-button");
  if (triggerBtn) {
    triggerBtn.addEventListener("mouseenter", () => {
      if (!isVisible.value) {
        isVisible.value = true;
        gsap.fromTo(
          ".header-nav",
          { y: -60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
        );
      }
    });
  }
});
</script>

<template>
  <header v-if="isVisible" class="header-nav">
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
