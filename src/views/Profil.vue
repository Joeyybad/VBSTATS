<template>
  <div class="max-w-2xl mx-auto w-full py-8 space-y-8">
    <div class="flex flex-col gap-1 border-b border-white/10 pb-6">
      <h1 class="text-3xl font-bold tracking-tight text-white">Mon Profil</h1>
      <p class="text-slate-400">
        Bonjour,
        <span class="text-yellow-500 font-medium">{{ user?.firstname }}</span
        >. Gérez vos informations et votre club.
      </p>
    </div>

    <div class="grid gap-4">
      <router-link
        :to="{ name: 'Compte' }"
        class="group flex items-center justify-between p-4 rounded-xl border border-white/10 bg-slate-800/40 hover:bg-slate-800 hover:border-white/20 transition-all duration-200"
      >
        <div class="flex items-center gap-4">
          <div
            class="p-2 bg-slate-700/50 rounded-lg group-hover:bg-yellow-500/20 transition-colors"
          >
            <img
              src="/src/assets/profil.png"
              alt="Profil"
              class="w-6 h-6 filter invert opacity-70 group-hover:opacity-100"
            />
          </div>
          <div>
            <h3 class="text-lg font-medium text-white">Espace Compte</h3>
            <p class="text-sm text-slate-500">
              Modifier vos identifiants et mot de passe
            </p>
          </div>
        </div>
        <span
          class="text-slate-600 group-hover:text-white transition-transform group-hover:translate-x-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </span>
      </router-link>

      <router-link
        :to="{ name: 'Club' }"
        class="group flex items-center justify-between p-4 rounded-xl border border-white/10 bg-slate-800/40 hover:bg-slate-800 hover:border-white/20 transition-all duration-200"
      >
        <div class="flex items-center gap-4">
          <div
            class="p-2 bg-slate-700/50 rounded-lg group-hover:bg-blue-500/20 transition-colors"
          >
            <img
              src="/src/assets/ballon-de-volley-ball.png"
              alt="Club"
              class="w-6 h-6 filter invert opacity-70 group-hover:opacity-100"
            />
          </div>
          <div>
            <h3 class="text-lg font-medium text-white">Espace Club</h3>
            <p class="text-sm text-slate-500">
              Gérer votre équipe et vos joueurs
            </p>
          </div>
        </div>
        <span
          class="text-slate-600 group-hover:text-white transition-transform group-hover:translate-x-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </span>
      </router-link>
    </div>

    <div class="pt-6">
      <button
        @click="$router.push('/')"
        class="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <img
          src="/src/assets/undo.png"
          alt="Retour"
          class="w-4 h-4 filter invert opacity-50"
        />
        Retour à l'accueil
      </button>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import { computed } from "vue";

const authStore = useUserStore();
const user = computed(() => authStore.user);
</script>
