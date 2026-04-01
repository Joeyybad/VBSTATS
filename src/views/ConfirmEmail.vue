<template>
  <div class="min-h-screen bg-slate-900 flex items-center justify-center px-4">
    <div
      class="max-w-md w-full bg-slate-800 p-8 rounded-2xl border border-slate-700 text-center"
    >
      <h2 class="text-2xl font-bold text-white mb-4">Activation du compte</h2>

      <div v-if="status === 'loading'" class="text-slate-400">
        <p>Vérification de votre jeton en cours...</p>
      </div>

      <div v-if="status === 'success'" class="space-y-4">
        <div class="text-green-500 text-5xl">✓</div>
        <p class="text-slate-300">Votre compte a été activé avec succès !</p>
        <router-link
          to="/connexion"
          class="block w-full py-3 bg-yellow-500 text-slate-900 font-bold rounded-xl hover:bg-yellow-400 transition-colors"
        >
          Se connecter
        </router-link>
      </div>

      <div v-if="status === 'error'" class="space-y-4">
        <div class="text-red-500 text-5xl">✕</div>
        <p class="text-slate-300">{{ errorMessage }}</p>
        <router-link to="/inscription" class="text-yellow-500 hover:underline">
          Réessayer l'inscription
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import api from "@/config";

const route = useRoute();
const status = ref("loading");
const errorMessage = ref("");

onMounted(async () => {
  const token = route.query.token; // On récupère le token du lien mail

  if (!token) {
    status.value = "error";
    errorMessage.value = "Jeton d'activation manquant.";
    return;
  }

  try {
    // On appelle le back pour valider le token
    await api.get(`/user/confirm?token=${token}`);
    status.value = "success";
  } catch (error) {
    status.value = "error";
    errorMessage.value =
      error.response?.data || "Le lien est invalide ou a expiré.";
  }
});
</script>
