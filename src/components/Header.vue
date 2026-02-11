<template>
  <header
    :class="[
      'fixed top-0 left-0 w-full z-50 px-6 py-4 transition-all duration-300',
      isHidden ? '-translate-y-full' : 'translate-y-0',
      lastScrollY > 50 ? 'bg-gray-900/80 backdrop-blur-lg' : 'bg-transparent',
    ]"
  >
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      <router-link
        :to="{ name: 'Connexion' }"
        class="hover:scale-105 transition-transform"
      >
        <img src="@/assets/VBStats.png" alt="Logo" class="w-12 h-auto" />
      </router-link>

      <div class="text-xs font-mono text-white/50 uppercase tracking-widest">
        Live Stats
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// Variables réactives (on enlève les types TS)
const isHidden = ref(false);
const lastScrollY = ref(0);

const handleScroll = () => {
  const currentScrollY = window.scrollY;

  // Cache si on descend, montre si on remonte
  isHidden.value = currentScrollY > lastScrollY.value && currentScrollY > 50;

  // Mise à jour de la position
  lastScrollY.value = currentScrollY;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
