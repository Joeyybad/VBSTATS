<template>
  <main
    class="min-h-[80vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8"
  >
    <div
      class="mb-10 transform hover:scale-105 transition-transform duration-300"
    >
      <img
        src="@/assets/VBStats.png"
        alt="VBStat Logo"
        class="w-40 sm:w-48 md:w-56 lg:w-64 drop-shadow-2xl"
      />
    </div>

    <div class="text-center max-w-2xl mx-auto space-y-6">
      <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
        Élevez votre jeu avec <span class="text-yellow-500">VB Stats</span>
      </h1>

      <p class="text-lg text-gray-300 leading-relaxed">
        L'outil ultime pour digitaliser vos prises de notes en temps réel.
        Transformez vos matchs et entraînements en
        <span class="text-white font-semibold">statistiques concrètes</span>
        pour faire progresser votre équipe.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center pt-8">
        <router-link
          to="/inscription"
          class="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold rounded-full shadow-lg hover:shadow-yellow-500/20 transition-all duration-200 text-center"
        >
          Commencer gratuitement
        </router-link>

        <router-link
          to="/connexion"
          class="px-8 py-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-900 font-bold rounded-full transition-all duration-200 text-center"
        >
          Se connecter
        </router-link>
      </div>
    </div>

    <div
      class="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center text-gray-400 text-sm"
    >
      <div class="flex flex-col items-center">
        <span class="text-yellow-500 mb-2">📊</span>
        <p>Stats détaillées</p>
      </div>
      <div class="flex flex-col items-center">
        <span class="text-yellow-500 mb-2">⏱️</span>
        <p>Prise de note rapide</p>
      </div>
      <div class="flex flex-col items-center">
        <span class="text-yellow-500 mb-2">🏐</span>
        <p>Spécial Volley-ball</p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  console.log("Home.vue est bien monté");
});
</script>

<style scoped>
/* On peut ajouter un petit dégradé subtil en arrière-plan si besoin */
.home-page {
  background: radial-gradient(circle at center, #1e293b 0%, #0f172a 100%);
}
</style>
