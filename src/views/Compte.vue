<template>
  <div class="max-w-2xl mx-auto w-full py-8 space-y-8">
    <div class="flex flex-col gap-1 border-b border-white/10 pb-6">
      <h1 class="text-3xl font-bold tracking-tight text-white">Mon Compte</h1>
      <p class="text-slate-400">
        Consultez et gérez vos informations personnelles.
      </p>
    </div>

    <div
      class="bg-slate-800/40 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm shadow-xl"
    >
      <div class="p-6 space-y-6">
        <div
          class="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-4 gap-2"
        >
          <span
            class="text-sm font-medium text-slate-500 uppercase tracking-wider"
            >Adresse Email</span
          >
          <span class="text-lg text-white font-medium">{{ user?.email }}</span>
        </div>

        <div
          class="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-4 gap-2"
        >
          <span
            class="text-sm font-medium text-slate-500 uppercase tracking-wider"
            >Prénom</span
          >
          <span class="text-lg text-white font-medium">{{
            user?.firstname
          }}</span>
        </div>

        <div
          class="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-4 gap-2"
        >
          <span
            class="text-sm font-medium text-slate-500 uppercase tracking-wider"
            >Nom</span
          >
          <span class="text-lg text-white font-medium">{{
            user?.lastname
          }}</span>
        </div>
      </div>

      <div class="bg-white/5 p-4 flex justify-end">
        <router-link
          :to="{ name: 'EditCompte' }"
          class="px-6 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold rounded-xl transition-all duration-200 shadow-lg shadow-yellow-500/10 active:scale-95"
        >
          Modifier le profil
        </router-link>
      </div>
    </div>

    <div
      class="p-6 rounded-2xl border border-red-500/20 bg-red-500/5 flex items-center justify-between"
    >
      <div>
        <h3 class="text-red-500 font-bold">Session</h3>
        <p class="text-xs text-red-500/60">
          Vous souhaitez quitter votre session actuelle ?
        </p>
      </div>
      <button
        @click="handleLogout"
        class="px-4 py-2 border border-red-500/50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all text-sm font-bold"
      >
        Déconnexion
      </button>
    </div>

    <div class="pt-4">
      <button
        @click="$router.push({ name: 'Profil' })"
        class="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group"
      >
        <img
          src="/src/assets/undo.png"
          alt="Retour"
          class="w-4 h-4 filter invert opacity-50 group-hover:opacity-100"
        />
        Retour au menu Profil
      </button>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import { computed } from "vue";

const authStore = useUserStore();
const router = useRouter();
const user = computed(() => authStore.user);

const handleLogout = () => {
  authStore.logout();
  router.push("/");
};
</script>
