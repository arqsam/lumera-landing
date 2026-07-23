<script setup lang="ts">
import Filosofia from "./components/Filosofia.vue";
import Footer from "./components/Footer.vue";
import Gaceta from "./components/Gaceta.vue";
import Galeria from "./components/Galeria.vue";
import Header from "./components/Header.vue";
import Hero from "./components/Hero.vue";
import Tienda from "./components/Tienda.vue";
</script>

<template>
  <Header />
  <main>
    <Hero />
    <Filosofia />
    <Tienda />
    <Galeria />
    <Gaceta />
  </main>
  <Footer />
</template>

<style scoped></style>
