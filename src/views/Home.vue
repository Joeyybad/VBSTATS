<script setup>
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();
</script>

<template>
  <div
    class="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
  >
    <div
      :class="[
        'transition-all duration-700 flex justify-center',
        userStore.isAuthenticated ? 'mb-6 scale-90' : 'mb-12 scale-100',
      ]"
    >
      <div
        :class="[
          'relative p-4 rounded-3xl transition-all duration-1000 backdrop-blur-sm border',
          userStore.isAuthenticated
            ? 'bg-slate-800/40 border-yellow-500/20 shadow-[0_0_20px_rgba(234,179,8,0.2)] animate-logo-pop'
            : 'bg-slate-900/20 border-white/5 grayscale opacity-60',
        ]"
      >
        <img
          src="@/assets/VBStats.png"
          alt="VBStat Logo"
          :class="[
            'transition-all duration-1000 h-auto mx-auto',
            userStore.isAuthenticated ? 'w-16 sm:w-24' : 'w-24 sm:w-32 md:w-40',
          ]"
        />
      </div>
    </div>

    <div v-if="userStore.isAuthenticated" class="w-full max-w-4xl space-y-8">
      <div class="text-center">
        <h1 class="text-3xl font-extrabold text-white">
          Ravi de vous revoir,
          <span class="text-yellow-500">{{ userStore.user?.firstname }}</span> !
        </h1>
        <p class="text-gray-400 mt-2">Que souhaitez-vous faire aujourd'hui ?</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <router-link
          to="/club"
          class="group p-6 bg-slate-800/40 border border-white/5 rounded-3xl hover:border-blue-500/50 hover:bg-slate-800/60 transition-all duration-300"
        >
          <div class="flex items-center gap-4">
            <div
              class="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform"
            >
              🏢
            </div>
            <div>
              <h3 class="text-xl font-bold text-white">Mon Club</h3>
              <p class="text-gray-400 text-sm">
                {{
                  userStore.isAdmin
                    ? "Gérer l'identité et l'effectif"
                    : "Voir l'identité et l'effectif"
                }}
              </p>
            </div>
          </div>
        </router-link>

        <router-link
          v-if="userStore.isStaff"
          to="/match"
          class="group p-6 bg-slate-800/40 border border-white/5 rounded-3xl hover:border-yellow-500/50 hover:bg-slate-800/60 transition-all duration-300"
        >
          <div class="flex items-center gap-4">
            <div
              class="w-14 h-14 bg-yellow-500/20 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform"
            >
              ⏱️
            </div>
            <div>
              <h3 class="text-xl font-bold text-white">Lancer un Match</h3>
              <p class="text-gray-400 text-sm">
                Prise de statistiques en temps réel
              </p>
            </div>
          </div>
        </router-link>

        <router-link
          v-if="userStore.isStaff"
          to="/historique"
          class="group p-6 bg-slate-800/40 border border-white/5 rounded-3xl hover:border-purple-500/50 hover:bg-slate-800/60 transition-all duration-300"
        >
          <div class="flex items-center gap-4">
            <div
              class="w-14 h-14 bg-purple-500/20 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform"
            >
              📅
            </div>
            <div>
              <h3 class="text-xl font-bold text-white">Historique</h3>
              <p class="text-gray-400 text-sm">Consulter les anciens matchs</p>
            </div>
          </div>
        </router-link>

        <router-link
          to="/profil"
          class="group p-6 bg-slate-800/40 border border-white/5 rounded-3xl hover:border-green-500/50 hover:bg-slate-800/60 transition-all duration-300"
        >
          <div class="flex items-center gap-4">
            <div
              class="w-14 h-14 bg-green-500/20 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform"
            >
              👤
            </div>
            <div>
              <h3 class="text-xl font-bold text-white">Mon Profil</h3>
              <p class="text-gray-400 text-sm">Paramètres et informations</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <div v-else class="text-center max-w-2xl mx-auto space-y-6"></div>
  </div>
</template>
<style scoped>
.home-page {
  background: radial-gradient(circle at center, #1e293b 0%, #0f172a 100%);
}
@keyframes logo-pop {
  0% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.animate-logo-pop {
  animation: logo-pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
</style>
