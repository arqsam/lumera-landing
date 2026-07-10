<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import { gsap } from "gsap";
import {
  EllipsisVerticalIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import { useHeaderVisibility } from "../composables/useHeaderVisibility";

const { isVisible, isPastHero, isDarkSection } = useHeaderVisibility();
const showHeader = ref(false);
const isMenuOpen = ref(false);

const closeMenu = () => {
  isMenuOpen.value = false;
};

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

const irATienda = () => {
  const tienda = document.querySelector("#tienda");
  tienda?.scrollIntoView({ behavior: "smooth" });
  if (isMenuOpen.value) closeMenu();
};
</script>

<template>
  <header
    v-if="showHeader"
    class="header-nav"
    :class="{
      'header-nav--scrolled': isPastHero,
      'header-nav--dark': isDarkSection,
      'header-nav--light': !isDarkSection,
    }"
  >
    <a href="#hero" class="header-logo">Lumera</a>
    <nav class="header-nav-links desktop-only">
      <a href="#filosofia" class="header-nav-link">Filosofía</a>
      <a href="#tienda" class="header-nav-link">Tienda</a>
      <a href="#galeria" class="header-nav-link">Galería</a>
      <a href="#gaceta" class="header-nav-link">Gaceta</a>
    </nav>

    <button
      class="header-buy-button desktop-only"
      aria-label="bag"
      @click="irATienda"
    >
      <div style="width: 23px; height: auto">
        <ShoppingBagIcon class="size-6 text-black" />
      </div>
    </button>
    <!-- Mobile-->
    <button
      class="header-menu-button mobile-only"
      @click="isMenuOpen = !isMenuOpen"
      aria-label="Open menú"
    >
      <EllipsisVerticalIcon class="size-6" />
    </button>
    <!-- Mobile Drawer -->
    <transition name="slide-fade">
      <aside v-if="isMenuOpen" class="mobile-menu">
        <button
          class="mobile-close"
          style="margin-top: 2rem"
          @click="closeMenu"
        >
          <XMarkIcon class="size-6" />
        </button>
        <nav class="mobile-nav-links">
          <a href="#filosofia" class="header-nav-link">Filosofía</a>
          <a href="#tienda" class="header-nav-link">Tienda</a>
          <a href="#galeria" class="header-nav-link">Galería</a>
          <a href="#gaceta" class="header-nav-link">Gaceta</a>
          <div style="display: flex; justify-content: center">
            <button
              class="header-buy-button mobile-buy"
              style="margin-top: 2rem"
              @click="irATienda"
            >
              <ShoppingBagIcon class="size-6" />
            </button>
          </div>
        </nav>
      </aside>
    </transition>
  </header>
</template>

<style scoped lang="scss"></style>
