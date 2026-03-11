<template>
  <BaseNotification
    :show="notification.show"
    :title="notification.title"
    :message="notification.message"
    :type="notification.type"
    @close="notification.show = false"
  />

  <BaseModal
    :show="showConfirmModal"
    title="Valider la feuille ?"
    type="info"
    @close="showConfirmModal = false"
  >
    <template #icon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    </template>

    <template #message>
      Souhaitez-vous enregistrer cette composition pour le match contre
      <span class="text-white font-bold">{{
        match.opponent || "l'adversaire"
      }}</span>
      ?
    </template>

    <template #actions>
      <button
        @click="showConfirmModal = false"
        class="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors"
      >
        Réviser
      </button>
      <button
        @click="executeValidation"
        class="flex-1 py-3 bg-green-500 hover:bg-green-600 text-slate-900 font-black rounded-xl transition-colors shadow-lg shadow-green-500/20"
      >
        Confirmer
      </button>
    </template>
  </BaseModal>

  <div class="max-w-6xl mx-auto w-full py-8 space-y-8 px-4">
    <div
      class="flex flex-col gap-1 border-b border-white/10 pb-6 text-center sm:text-left"
    >
      <h1
        class="text-3xl font-bold tracking-tight text-white italic underline decoration-yellow-500 underline-offset-8"
      >
        Feuille de Match
      </h1>
      <p class="text-slate-400 italic">
        Sélectionnez votre 6 de départ et vos remplaçants.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
      <div class="lg:col-span-1 space-y-4">
        <div
          class="bg-slate-800/40 border border-white/10 p-6 rounded-3xl backdrop-blur-sm shadow-xl"
        >
          <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span
              class="w-2 h-2 bg-green-500 rounded-full animate-pulse"
            ></span>
            Effectif disponible
          </h3>
          <div v-if="loading" class="text-slate-500 text-sm animate-pulse">
            Chargement...
          </div>
          <ul
            v-else
            class="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar"
          >
            <li
              v-for="player in availablePlayers"
              :key="player.id"
              class="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/5 hover:border-white/20 transition-all"
            >
              <div class="flex items-center gap-3">
                <span class="text-yellow-500 font-mono font-bold w-6"
                  >#{{ player.jerseyNumber }}</span
                >
                <span class="text-white text-sm font-medium"
                  >{{ player.firstname }} {{ player.lastname }}</span
                >
              </div>
              <button
                v-if="!player.isInTeam && !player.isSubstitute"
                @click="addToTeam(player)"
                class="w-8 h-8 flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-slate-900 rounded-lg transition-transform active:scale-90 font-bold"
              >
                +
              </button>
              <span
                v-else
                class="text-[10px] uppercase tracking-widest text-slate-500 font-bold px-2 py-1 bg-white/5 rounded"
                >Sélectionné</span
              >
            </li>
          </ul>
        </div>

        <div
          class="bg-slate-800/40 border border-white/10 p-6 rounded-3xl backdrop-blur-sm shadow-xl space-y-4"
        >
          <h3 class="text-lg font-bold text-white mb-2 italic">
            Détails du Match
          </h3>
          <div class="space-y-3 text-left">
            <div class="space-y-1">
              <label
                class="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1"
                >Adversaire</label
              >
              <input
                v-model="match.opponent"
                type="text"
                placeholder="Ex: Paris Volley"
                class="w-full px-4 py-2 bg-slate-900/50 border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all"
              />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div class="space-y-1">
                <label
                  class="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1"
                  >Lieu</label
                >
                <input
                  v-model="match.location"
                  type="text"
                  class="w-full px-4 py-2 bg-slate-900/50 border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all"
                />
              </div>
              <div class="space-y-1">
                <label
                  class="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1"
                  >Date</label
                >
                <input
                  v-model="match.date"
                  type="date"
                  class="w-full px-4 py-2 bg-slate-900/50 border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:col-span-2 space-y-6">
        <div
          class="bg-slate-800/40 border border-white/10 p-8 rounded-3xl backdrop-blur-sm shadow-xl flex flex-col items-center"
        >
          <div
            class="relative terrain-bg border-4 border-white/80 w-full max-w-[500px] aspect-[16/10] rounded-sm shadow-2xl overflow-hidden mb-8"
          >
            <div
              class="absolute left-1/2 top-0 h-full border-l-4 border-dashed border-white/30 z-0"
            ></div>
            <div
              class="absolute left-[30%] top-0 h-full border-l-2 border-white/20 z-0"
            ></div>

            <transition-group name="list">
              <div
                v-for="(player, index) in team"
                :key="player.id"
                :style="{
                  top: player.position.top,
                  left: player.position.left,
                }"
                class="absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-slate-900 font-black text-lg cursor-pointer z-10 shadow-lg border-2 border-slate-900 group transition-all duration-500"
                @click="selectPlayerToReplace(player)"
                :class="{
                  'ring-4 ring-white animate-pulse':
                    selectedPlayerToReplace?.id === player.id,
                }"
              >
                {{ player.jerseyNumber }}
                <div
                  class="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900 text-white text-[10px] rounded border border-white/10 opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none z-50"
                >
                  {{ player.firstname }} ({{ player.positionName }})
                </div>
              </div>
            </transition-group>
          </div>

          <div class="w-full">
            <h3
              class="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4"
            >
              Banc de touche
            </h3>
            <div class="flex flex-wrap gap-3">
              <div
                v-for="player in substitutes"
                :key="player.id"
                class="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-xl group transition-all hover:border-yellow-500/30"
              >
                <span class="text-yellow-500 font-bold"
                  >#{{ player.jerseyNumber }}</span
                >
                <span class="text-white text-sm">{{ player.lastname }}</span>
                <button
                  @click="replacePlayer(player)"
                  class="text-slate-500 hover:text-yellow-500 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="m7 21-4-4 4-4" />
                    <path d="M3 17h18" />
                    <path d="m17 3 4 4-4 4" />
                    <path d="M21 7H3" />
                  </svg>
                </button>
              </div>
              <div
                v-if="substitutes.length === 0"
                class="text-slate-600 text-xs italic"
              >
                Aucun remplaçant sur le banc
              </div>
            </div>
          </div>

          <button
            @click="confirmValidation"
            :disabled="team.length < 6"
            class="mt-8 w-full py-4 bg-green-500 hover:bg-green-600 disabled:bg-slate-700 disabled:text-slate-500 text-slate-900 font-black text-lg rounded-2xl transition-all shadow-xl shadow-green-500/10 active:scale-95 flex items-center justify-center gap-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            VALIDER LA FEUILLE DE MATCH
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "@/config";
import BaseNotification from "@/components/BaseNotification.vue";
import BaseModal from "@/components/BaseModal.vue";

const route = useRoute();
const router = useRouter();
const clubId = route.params.clubId;

const allPlayers = ref([]);
const loading = ref(true);
const team = ref([]);
const substitutes = ref([]);
const selectedPlayerToReplace = ref(null);
const showConfirmModal = ref(false);

const notification = ref({
  show: false,
  title: "",
  message: "",
  type: "success",
});

const match = ref({
  opponent: "",
  location: "Domicile",
  date: new Date().toISOString().split("T")[0],
});

const triggerNotify = (title, message, type = "success") => {
  notification.value = { show: true, title, message, type };
  setTimeout(() => {
    notification.value.show = false;
  }, 3000);
};

const fetchPlayers = async () => {
  try {
    const response = await api.get(`/players/club/${clubId}`);
    allPlayers.value = response.data;
  } catch (error) {
    triggerNotify("Erreur", "Impossible de charger l'effectif.", "error");
  } finally {
    loading.value = false;
  }
};

onMounted(fetchPlayers);

const availablePlayers = computed(() =>
  allPlayers.value.map((player) => ({
    ...player,
    isInTeam: team.value.some((p) => p.id === player.id),
    isSubstitute: substitutes.value.some((p) => p.id === player.id),
  })),
);

const volleyPositions = [
  { name: "P1", top: "75%", left: "80%" },
  { name: "P6", top: "75%", left: "50%" },
  { name: "P5", top: "75%", left: "20%" },
  { name: "P4", top: "25%", left: "20%" },
  { name: "P3", top: "25%", left: "50%" },
  { name: "P2", top: "25%", left: "80%" },
];

const addToTeam = (player) => {
  if (team.value.length < 6) {
    team.value.push({
      ...player,
      position: volleyPositions[team.value.length],
      positionName: volleyPositions[team.value.length].name,
    });
    triggerNotify(
      "Joueur ajouté",
      `${player.firstname} est sur le terrain.`,
      "success",
    );
  } else {
    substitutes.value.push(player);
    triggerNotify("Banc", `${player.firstname} est remplaçant.`, "info");
  }
};

const selectPlayerToReplace = (player) => {
  selectedPlayerToReplace.value =
    selectedPlayerToReplace.value?.id === player.id ? null : player;
};

const replacePlayer = (sub) => {
  if (!selectedPlayerToReplace.value) {
    triggerNotify(
      "Sélection requise",
      "Cliquez d'abord sur un joueur du terrain à remplacer.",
      "info",
    );
    return;
  }

  const index = team.value.findIndex(
    (p) => p.id === selectedPlayerToReplace.value.id,
  );
  if (index !== -1) {
    const currentOnField = selectedPlayerToReplace.value;
    substitutes.value.push(currentOnField);
    team.value[index] = {
      ...sub,
      position: currentOnField.position,
      positionName: currentOnField.positionName,
    };
    substitutes.value = substitutes.value.filter((p) => p.id !== sub.id);
    triggerNotify(
      "Changement effectué",
      `Entrée de ${sub.firstname}`,
      "success",
    );
  }
  selectedPlayerToReplace.value = null;
};

const confirmValidation = () => {
  showConfirmModal.value = true;
};

const executeValidation = () => {
  showConfirmModal.value = false;
  triggerNotify(
    "Match Validé",
    "Feuille de match enregistrée avec succès !",
    "success",
  );

  // Simulation de redirection vers les stats du match
  setTimeout(() => {
    router.push({ name: "Matchstats" });
  }, 2000);
};
</script>

<style scoped>
.terrain-bg {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  position: relative;
}

.terrain-bg::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(
    circle at 2px 2px,
    rgba(255, 255, 255, 0.1) 1px,
    transparent 0
  );
  background-size: 20px 20px;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
</style>
