<template>
  <header
    :class="[
      'fixed top-0 left-0 w-full z-50 px-6 py-4 transition-all duration-300',
      isHidden ? '-translate-y-full' : 'translate-y-0',
      lastScrollY > 50
        ? 'bg-gray-900/90 backdrop-blur-lg border-b border-white/5'
        : 'bg-transparent',
    ]"
  >
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      <router-link to="/" class="hover:scale-105 transition-transform">
        <img src="@/assets/VBStats.png" alt="Logo" class="w-12 h-auto" />
      </router-link>

      <nav class="hidden md:flex items-center gap-8">
        <router-link
          to="/"
          class="text-gray-300 hover:text-white transition-colors"
          >Accueil</router-link
        >

        <template v-if="userStore.isAuthenticated">
          <router-link
            :to="{ name: 'Club' }"
            class="text-gray-300 hover:text-white transition-colors"
            >Mon Club</router-link
          >
          <router-link
            :to="{ name: 'Profil' }"
            class="text-gray-300 hover:text-white transition-colors"
            >Mon Profil</router-link
          >

          <button
            @click="handleLogout"
            class="ml-4 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/50 rounded-lg transition-all text-sm font-bold"
          >
            Déconnexion
          </button>
        </template>

        <template v-else>
          <router-link
            :to="{ name: 'Connexion' }"
            class="text-yellow-500 font-bold hover:text-yellow-400"
            >Connexion</router-link
          >
          <router-link
            :to="{ name: 'Inscription' }"
            class="text-yellow-500 font-bold hover:text-yellow-400 ml-4"
            >Inscription</router-link
          >
        </template>
      </nav>

      <div
        class="text-[10px] md:text-xs font-mono text-white/50 uppercase tracking-widest flex items-center gap-2"
      >
        <span class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        Live Stats
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();
const isHidden = ref(false);
const lastScrollY = ref(0);

const handleLogout = () => {
  userStore.logout();
  router.push("/");
};

const handleScroll = () => {
  const currentScrollY = window.scrollY;
  isHidden.value = currentScrollY > lastScrollY.value && currentScrollY > 50;
  lastScrollY.value = currentScrollY;
};

onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));
</script>
