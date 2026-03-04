<template>
  <BaseNotification
    :show="notification.show"
    :title="notification.title"
    :message="notification.message"
    :type="notification.type"
    @close="notification.show = false"
  />

  <div class="max-w-2xl mx-auto w-full py-8 space-y-8">
    <div class="flex flex-col gap-1 border-b border-white/10 pb-6">
      <h1 class="text-3xl font-bold tracking-tight text-white">
        Créer mon club
      </h1>
      <p class="text-slate-400">
        Configurez l'identité de votre équipe pour commencer à enregistrer vos
        statistiques.
      </p>
    </div>

    <form @submit.prevent="onFormSubmit" class="space-y-6">
      <div
        class="bg-slate-800/40 border border-white/10 rounded-2xl p-6 space-y-4 backdrop-blur-sm"
      >
        <h3
          class="text-lg font-semibold text-white mb-4 flex items-center gap-2"
        >
          <span class="p-1.5 bg-yellow-500/10 rounded-lg text-yellow-500">
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
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
              <path d="M4 22h16" />
              <path
                d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"
              />
              <path
                d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"
              />
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
            </svg>
          </span>
          Informations du club
        </h3>

        <AuthInput
          label="Nom du club"
          v-model="clubName"
          :error="errors.clubName"
          placeholder="Ex: Paris Volley Club"
        />

        <div class="space-y-2">
          <label class="block text-sm font-medium text-slate-300"
            >Description</label
          >
          <textarea
            v-model="description"
            rows="4"
            placeholder="Parlez-nous de l'histoire du club ou de vos objectifs..."
            class="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all resize-none"
          ></textarea>
          <p v-if="errors.description" class="text-red-500 text-xs mt-1">
            {{ errors.description }}
          </p>
        </div>
      </div>

      <div
        class="bg-slate-800/40 border border-white/10 rounded-2xl p-6 space-y-4 backdrop-blur-sm"
      >
        <h3
          class="text-lg font-semibold text-white mb-4 flex items-center gap-2"
        >
          <span class="p-1.5 bg-blue-500/10 rounded-lg text-blue-500">
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
          </span>
          Localisation
        </h3>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <AuthInput
            label="Code Postal"
            v-model="postalCode"
            placeholder="75001"
          />

          <div class="sm:col-span-2 space-y-2">
            <label class="block text-sm font-medium text-slate-300"
              >Ville</label
            >
            <select
              v-model="location"
              class="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all appearance-none cursor-pointer"
            >
              <option value="" disabled>-- Sélectionnez une ville --</option>
              <option
                v-for="city in cities"
                :key="city"
                :value="city"
                class="bg-slate-800 text-white"
              >
                {{ city }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div
        class="bg-slate-800/40 border border-white/10 rounded-2xl p-6 space-y-4 backdrop-blur-sm"
      >
        <h3
          class="text-lg font-semibold text-white mb-4 flex items-center gap-2"
        >
          <span class="p-1.5 bg-green-500/10 rounded-lg text-green-500">
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
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </span>
          Identité visuelle
        </h3>

        <div
          class="flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl p-8 hover:border-yellow-500/50 hover:bg-yellow-500/5 transition-all duration-300"
        >
          <input
            type="file"
            id="logo-upload"
            class="hidden"
            @change="handleFileUpload"
            accept="image/*"
          />

          <div v-if="!previewUrl" class="text-center">
            <label for="logo-upload" class="cursor-pointer group">
              <div
                class="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-slate-500 group-hover:text-yellow-500"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </div>
              <span
                class="text-sm font-medium text-slate-400 group-hover:text-white transition-colors"
                >Cliquez pour ajouter un logo</span
              >
            </label>
          </div>

          <div v-else class="relative group">
            <img
              :src="previewUrl"
              class="w-32 h-32 object-cover rounded-2xl border-2 border-yellow-500 shadow-lg shadow-yellow-500/20"
            />
            <button
              @click="
                file = null;
                previewUrl = null;
              "
              type="button"
              class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:scale-110 transition-transform"
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
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-end gap-4 pt-4">
        <button
          type="button"
          @click="$router.push({ name: 'Club' })"
          class="px-6 py-2.5 text-slate-400 hover:text-white transition-colors font-medium"
        >
          Annuler
        </button>
        <button
          type="submit"
          :disabled="loading"
          class="px-8 py-2.5 bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 font-bold rounded-xl transition-all shadow-lg shadow-yellow-500/10 active:scale-95"
        >
          {{ loading ? "Création en cours..." : "Créer mon club" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { fetchCitiesByPostalCode } from "@/assets/js/cityFetch.js";
import { useUserStore } from "@/stores/user";
import { useField, useForm } from "vee-validate";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import * as yup from "yup";
import api from "@/config";

// Composants
import AuthInput from "@/components/AuthInput.vue";
import BaseNotification from "@/components/BaseNotification.vue";

const userStore = useUserStore();
const router = useRouter();
const loading = ref(false);

// Localisation
const postalCode = ref("");
const location = ref("");
const cities = ref([]);

// Fichier
const file = ref(null);
const previewUrl = ref(null);

// Notification State
const notification = ref({
  show: false,
  title: "",
  message: "",
  type: "success",
});
const triggerNotify = (title, message, type = "success") => {
  notification.value = { show: true, title, message, type };
  setTimeout(() => (notification.value.show = false), 4000);
};

// Schéma de validation
const schema = yup.object({
  clubName: yup
    .string()
    .min(4, "Le nom doit faire au moins 4 caractères")
    .required("Requis"),
  description: yup
    .string()
    .min(10, "La description doit faire au moins 10 caractères")
    .required("Requis"),
});

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
  initialValues: { clubName: "", description: "" },
});

const { value: clubName } = useField("clubName");
const { value: description } = useField("description");

function handleFileUpload(event) {
  const selected = event.target.files[0];
  if (selected) {
    file.value = selected;
    previewUrl.value = URL.createObjectURL(selected);
  }
}

watch(postalCode, async (newCode) => {
  if (newCode.length === 5) {
    cities.value = await fetchCitiesByPostalCode(newCode);
    if (cities.value.length === 1) {
      location.value = cities.value[0];
    }
  } else {
    cities.value = [];
    location.value = "";
  }
});

const onFormSubmit = handleSubmit(async (values) => {
  loading.value = true;
  try {
    const formData = new FormData();
    formData.append("clubName", values.clubName);
    formData.append("description", values.description);
    formData.append("location", location.value);
    formData.append("userId", userStore.user?.id || "");
    if (file.value) {
      formData.append("clubImg", file.value);
    }

    await api.post("/club/create", formData);

    triggerNotify(
      "Club créé",
      "Votre club a été enregistré avec succès !",
      "success",
    );

    setTimeout(() => {
      router.push({ name: "Club" });
    }, 2000);
  } catch (error) {
    const msg =
      error.response?.data || "Une erreur est survenue lors de la création.";
    triggerNotify("Erreur", msg, "error");
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
/* Suppression des styles par défaut du select sur certains navigateurs */
select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1.5em;
}
</style>
