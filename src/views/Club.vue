<template>
  <div class="max-w-2xl mx-auto w-full py-8 space-y-8">
    <div class="flex flex-col gap-1 border-b border-white/10 pb-6">
      <h1 class="text-3xl font-bold tracking-tight text-white">Mon Club</h1>
      <p class="text-slate-400">
        Consultez les informations officielles de votre équipe.
      </p>
    </div>

    <div
      v-if="loading"
      class="flex flex-col items-center justify-center py-20 space-y-4"
    >
      <div
        class="w-10 h-10 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin"
      ></div>
      <p class="text-slate-500 animate-pulse">Recherche de votre club...</p>
    </div>

    <div v-else-if="club" class="space-y-6">
      <div
        class="bg-slate-800/40 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm shadow-xl"
      >
        <div class="p-8 flex flex-col items-center text-center">
          <div class="relative group">
            <div
              class="absolute -inset-1 bg-gradient-to-tr from-yellow-500 to-orange-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"
            ></div>
            <div
              class="relative w-32 h-32 bg-slate-900 rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden mb-6"
            >
              <img
                v-if="club.clubImg"
                :src="`http://localhost:8081/api/uploads/logos/${club.clubImg}`"
                alt="Logo"
                class="w-full h-full object-cover"
              />
              <div v-else class="text-slate-600">Logo</div>
            </div>
          </div>

          <h2 class="text-3xl font-bold text-white mb-2">{{ club.name }}</h2>

          <div class="flex items-center gap-2 text-yellow-500 font-medium mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {{ club.location }}
          </div>

          <p class="text-slate-300 leading-relaxed max-w-md italic">
            "{{ club.description }}"
          </p>
        </div>

        <div class="bg-white/5 p-4 flex justify-between items-center px-8">
          <span
            class="text-xs text-slate-500 uppercase tracking-widest font-semibold"
            >Identifiant Club: #{{ club.id }}</span
          >
          <router-link
            :to="{ name: 'EditClub' }"
            class="inline-flex items-center gap-2 px-5 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-bold rounded-xl transition-all active:scale-95"
          >
            <img src="/src/assets/edition.png" class="w-4 h-4 filter invert" />
            Modifier le club
          </router-link>
        </div>
      </div>
    </div>

    <div v-else>
      <router-link
        :to="{ name: 'ClubCreate' }"
        class="group relative block w-full border-2 border-dashed border-white/10 rounded-3xl p-12 text-center hover:border-yellow-500/50 hover:bg-yellow-500/5 transition-all duration-300"
      >
        <div
          class="mx-auto w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
        >
          <img
            src="/src/assets/plus.png"
            alt="Ajouter"
            class="w-8 h-8 filter invert opacity-50 group-hover:opacity-100"
          />
        </div>
        <h3 class="text-xl font-bold text-white mb-1">Aucun club enregistré</h3>
        <p class="text-slate-500 max-w-xs mx-auto text-sm leading-relaxed">
          Vous n'avez pas encore de club rattaché à votre compte. Créez-en un
          pour commencer à gérer vos joueurs.
        </p>
        <div
          class="mt-6 inline-flex items-center font-bold text-yellow-500 group-hover:translate-x-1 transition-transform"
        >
          Créer un club maintenant →
        </div>
      </router-link>
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
import api from "@/config";
import { onMounted, ref } from "vue";

const userStore = useUserStore();
const loading = ref(true);
const club = ref(null);

onMounted(async () => {
  try {
    const userId = userStore.user?.id;
    if (!userId) {
      loading.value = false;
      return;
    }

    const response = await api.get(`/club/by-user/${userId}`);
    // On vérifie si response.data contient bien un club (pas vide)
    club.value = response.data && response.data.id ? response.data : null;
  } catch (error) {
    console.error("Erreur lors de la récupération du club :", error);
    club.value = null;
  } finally {
    loading.value = false;
  }
});
</script>
