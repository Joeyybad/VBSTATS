<template>
  <nav
    v-if="userStore.isAuthenticated"
    class="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-[999] md:hidden"
  >
    <div
      class="bg-gray-900/60 backdrop-blur-xl border border-white/10 py-3 px-8 rounded-full shadow-2xl flex justify-between items-center"
    >
      <router-link :to="{ name: 'Profil' }" class="nav-link group">
        <img
          src="@/assets/profil.png"
          class="w-7 h-7 filter invert opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
        />
      </router-link>

      <router-link
        :to="{ name: 'Club' }"
        class="nav-link bg-blue-600 p-4 rounded-full -translate-y-6 shadow-lg shadow-blue-500/40 hover:bg-blue-500 transition-all duration-300"
      >
        <img
          src="@/assets/ballon-de-volley-ball.png"
          class="w-7 h-7 filter invert"
        />
      </router-link>

      <div @click="handleLogout" class="nav-link group cursor-pointer">
        <img
          src="@/assets/volley-ball.png"
          class="w-7 h-7 filter invert opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-12"
          title="Déconnexion"
        />
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const handleLogout = () => {
  userStore.logout();
  router.push("/");
};
</script>
