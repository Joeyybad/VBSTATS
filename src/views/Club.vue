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
    title="Supprimer le joueur ?"
    type="danger"
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
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        <line x1="10" x2="10" y1="11" y2="17" />
        <line x1="14" x2="14" y1="11" y2="17" />
      </svg>
    </template>

    <template #message>
      Cette action est irréversible. Le joueur sera définitivement retiré de
      l'effectif de l'ASCA.
    </template>

    <template #actions>
      <button
        @click="showConfirmModal = false"
        class="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors"
      >
        Annuler
      </button>
      <button
        @click="executeDelete"
        class="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-red-500/20"
      >
        Supprimer
      </button>
    </template>
  </BaseModal>

  <div class="max-w-2xl mx-auto w-full py-8 space-y-8">
    <div class="flex flex-col gap-1 border-b border-white/10 pb-6">
      <h1 class="text-3xl font-bold tracking-tight text-white italic">
        Mon Club
      </h1>
      <p class="text-slate-400">Identité et effectif de votre équipe.</p>
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

    <div v-else-if="club" class="space-y-8">
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
              <div
                v-else
                class="text-slate-600 font-bold uppercase tracking-widest text-xs"
              >
                No Logo
              </div>
            </div>
          </div>
          <h2 class="text-3xl font-bold text-white mb-2">{{ club.name }}</h2>
          <div
            class="flex items-center gap-2 text-yellow-500 font-medium mb-6 italic"
          >
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
        <div
          class="bg-white/5 p-4 flex justify-between items-center px-8 border-t border-white/5"
        >
          <span
            class="text-xs text-slate-500 uppercase tracking-widest font-semibold"
            >Club ID: #{{ club.id }}</span
          >
          <router-link
            :to="{ name: 'EditClub' }"
            class="inline-flex items-center gap-2 px-5 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-bold rounded-xl transition-all"
          >
            <img src="/src/assets/edition.png" class="w-4 h-4 filter invert" />
            Editer
          </router-link>
        </div>
      </div>

      <div
        class="bg-slate-800/40 border border-white/10 rounded-3xl backdrop-blur-sm shadow-xl overflow-hidden"
      >
        <div class="p-8 space-y-8">
          <h3 class="text-xl font-bold text-white flex items-center gap-3">
            <div class="p-2 bg-yellow-500/10 rounded-lg text-yellow-500">
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
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            Effectif de l'équipe
          </h3>

          <form
            @submit.prevent="addPlayer"
            class="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/5 p-6 rounded-2xl border border-white/5"
          >
            <AuthInput
              label="Prénom"
              v-model="playerForm.firstname"
              placeholder="Jean"
            />
            <AuthInput
              label="Nom"
              v-model="playerForm.lastname"
              placeholder="Dupont"
            />
            <AuthInput
              label="N° Maillot"
              v-model="playerForm.jerseyNumber"
              type="number"
              placeholder="10"
            />
            <div class="space-y-2">
              <label class="block text-sm font-medium text-slate-300"
                >Poste</label
              >
              <select
                v-model="playerForm.position"
                class="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none cursor-pointer focus:ring-2 focus:ring-yellow-500/50 transition-all appearance-none"
              >
                <option value="PASSEUR">Passeur</option>
                <option value="RÉCEP-ATTAQUANT">Récep-Attaquant</option>
                <option value="CENTRAL">Central</option>
                <option value="POINTU">Pointu</option>
                <option value="LIBERO">Libero</option>
              </select>
            </div>
            <div class="sm:col-span-2 pt-2">
              <button
                type="submit"
                :disabled="savingPlayer"
                class="w-full py-3 bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 text-slate-900 font-bold rounded-xl transition-all shadow-lg shadow-yellow-500/10"
              >
                {{ savingPlayer ? "Recrutement..." : "Ajouter le joueur" }}
              </button>
            </div>
          </form>

          <div class="space-y-4">
            <h4
              class="text-sm font-semibold text-slate-500 uppercase tracking-widest"
            >
              Joueurs ({{ players.length }})
            </h4>

            <div
              v-if="players.length === 0"
              class="text-center py-8 border-2 border-dashed border-white/5 rounded-2xl text-slate-500 text-sm italic"
            >
              Aucun joueur enregistré.
            </div>

            <div v-else class="grid gap-3">
              <div
                v-for="player in players"
                :key="player.id"
                class="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-yellow-500/30 transition-all group"
              >
                <div class="flex items-center gap-4">
                  <div
                    class="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center font-bold text-yellow-500 border border-yellow-500/20"
                  >
                    {{ player.jerseyNumber }}
                  </div>
                  <div>
                    <p class="text-white font-bold">
                      {{ player.firstname }} {{ player.lastname }}
                    </p>
                    <p
                      class="text-[10px] uppercase tracking-wider text-slate-500 font-bold"
                    >
                      {{ player.position }}
                    </p>
                  </div>
                </div>
                <button
                  @click="confirmDelete(player.id)"
                  class="p-2 text-slate-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                >
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
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" x2="10" y1="11" y2="17" />
                    <line x1="14" x2="14" y1="11" y2="17" />
                  </svg>
                </button>
              </div>
            </div>

            <div
              v-if="players.length >= 6"
              class="mt-8 p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in zoom-in duration-500"
            >
              <div class="flex items-center gap-4">
                <div
                  class="p-3 bg-yellow-500 rounded-xl shadow-lg shadow-yellow-500/20"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="black"
                    stroke-width="2.5"
                  >
                    <path
                      d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
                    />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <div>
                  <h4 class="text-white font-bold text-lg">
                    Effectif complet !
                  </h4>
                  <p class="text-slate-400 text-sm">
                    Prêt pour la feuille de match.
                  </p>
                </div>
              </div>
              <button
                @click="
                  $router.push({
                    name: 'Gamesheet',
                    params: { clubId: club.id },
                  })
                "
                class="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-black rounded-xl transition-all shadow-xl shadow-yellow-500/10 flex items-center gap-2"
              >
                Feuille de match →
              </button>
            </div>

            <div
              v-else-if="players.length > 0"
              class="mt-6 p-4 bg-white/5 border border-white/5 rounded-xl text-center"
            >
              <p class="text-slate-500 text-sm italic">
                Il vous manque encore
                <span class="text-yellow-500 font-bold">{{
                  6 - players.length
                }}</span>
                joueur(s) pour lancer un match.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="text-center py-20 bg-slate-800/40 border border-dashed border-white/10 rounded-3xl backdrop-blur-sm"
    >
      <div
        class="inline-flex items-center justify-center w-16 h-16 bg-yellow-500/10 rounded-full mb-6"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#eab308"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-white mb-2">Aucun club trouvé</h2>
      <p class="text-slate-400 mb-8 max-w-sm mx-auto">
        Vous n'avez pas encore de club rattaché à votre compte. Créez votre
        identité sportive pour commencer à gérer vos joueurs.
      </p>
      <button
        @click="$router.push({ name: 'ClubCreate' })"
        class="px-8 py-3 bg-yellow-500 cursor-pointer hover:bg-yellow-600 text-slate-900 font-black rounded-xl transition-all shadow-lg shadow-yellow-500/20"
      >
        Créer mon club
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
import api from "@/config";
import { onMounted, ref } from "vue";
import AuthInput from "@/components/AuthInput.vue";
import BaseNotification from "@/components/BaseNotification.vue";
import BaseModal from "@/components/BaseModal.vue";

// ÉTATS
const userStore = useUserStore();
const loading = ref(true);
const club = ref(null);
const players = ref([]);
const savingPlayer = ref(false);

// ÉTATS MODALES & NOTIFS
const showConfirmModal = ref(false);
const playerToDeleteId = ref(null);
const notification = ref({
  show: false,
  title: "",
  message: "",
  type: "success",
});

const playerForm = ref({
  firstname: "",
  lastname: "",
  jerseyNumber: "",
  position: "PASSEUR",
});

// ACTIONS
const triggerNotify = (title, message, type = "success") => {
  notification.value = { show: true, title, message, type };
  setTimeout(() => {
    notification.value.show = false;
  }, 3000);
};

const fetchPlayers = async (clubId) => {
  try {
    const response = await api.get(`/players/club/${clubId}`);
    players.value = response.data;
  } catch (error) {
    console.error("Erreur joueurs:", error);
  }
};

const addPlayer = async () => {
  if (!playerForm.value.firstname || !playerForm.value.lastname) {
    triggerNotify(
      "Champs requis",
      "Le nom et le prénom sont obligatoires.",
      "error",
    );
    return;
  }
  savingPlayer.value = true;
  try {
    const response = await api.post(
      `/players/add/${club.value.id}`,
      playerForm.value,
    );
    players.value.push(response.data);
    playerForm.value = {
      firstname: "",
      lastname: "",
      jerseyNumber: "",
      position: "PASSEUR",
    };
    triggerNotify(
      "Recrutement réussi",
      "Le joueur a rejoint le club !",
      "success",
    );
  } catch (error) {
    triggerNotify("Erreur", "Impossible d'ajouter le joueur.", "error");
  } finally {
    savingPlayer.value = false;
  }
};

const confirmDelete = (id) => {
  playerToDeleteId.value = id;
  showConfirmModal.value = true;
};

const executeDelete = async () => {
  if (!playerToDeleteId.value) return;
  try {
    await api.delete(`/players/${playerToDeleteId.value}`);
    players.value = players.value.filter(
      (p) => p.id !== playerToDeleteId.value,
    );
    showConfirmModal.value = false;
    triggerNotify("Joueur supprimé", "L'effectif a été mis à jour.", "success");
  } catch (error) {
    triggerNotify(
      "Erreur",
      "Le serveur n'a pas pu supprimer le joueur.",
      "error",
    );
  } finally {
    playerToDeleteId.value = null;
  }
};

onMounted(async () => {
  try {
    const userId = userStore.user?.id;
    if (!userId) return;
    const response = await api.get(`/club/by-user/${userId}`);
    club.value = response.data && response.data.id ? response.data : null;
    if (club.value) await fetchPlayers(club.value.id);
  } catch (error) {
    club.value = null;
  } finally {
    loading.value = false;
  }
});
</script>
