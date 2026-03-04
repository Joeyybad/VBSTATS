<template>
  <BaseNotification
    :show="notification.show"
    :title="notification.title"
    :message="notification.message"
    :type="notification.type"
    @close="notification.show = false"
  />

  <div class="max-w-2xl mx-auto w-full py-8 space-y-8 text-white">
    <div class="flex flex-col gap-1 border-b border-white/10 pb-6">
      <h1 class="text-3xl font-bold tracking-tight">Modifier mon Club</h1>
      <p class="text-slate-400">
        Gérez l'identité et les informations de votre équipe.
      </p>
    </div>

    <div v-if="initialLoading" class="flex justify-center py-20">
      <div
        class="w-10 h-10 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin"
      ></div>
    </div>

    <form v-else @submit.prevent="onFormSubmit" class="space-y-6">
      <div
        class="bg-slate-800/40 border border-white/10 rounded-2xl p-6 space-y-4 backdrop-blur-sm"
      >
        <h3 class="text-lg font-semibold flex items-center gap-2">
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
              <path
                d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
              />
              <path
                d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
              />
            </svg>
          </span>
          Détails de l'équipe
        </h3>

        <AuthInput
          label="Nom du club"
          v-model="clubName"
          :error="errors.clubName"
        />

        <div class="space-y-2">
          <label class="block text-sm font-medium text-slate-300"
            >Description</label
          >
          <textarea
            v-model="description"
            rows="4"
            class="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-yellow-500/50 transition-all resize-none"
          ></textarea>
          <p v-if="errors.description" class="text-red-500 text-xs mt-1">
            {{ errors.description }}
          </p>
        </div>
      </div>

      <div
        class="bg-slate-800/40 border border-white/10 rounded-2xl p-6 space-y-4 backdrop-blur-sm"
      >
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <AuthInput
            label="Code Postal"
            v-model="postalCode"
            placeholder="72000"
          />

          <div class="sm:col-span-2 space-y-2">
            <label class="block text-sm font-medium text-slate-300"
              >Ville</label
            >
            <select
              v-model="location"
              class="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all appearance-none cursor-pointer"
            >
              <option v-for="city in cities" :key="city" :value="city">
                {{ city }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div
        class="bg-slate-800/40 border border-white/10 rounded-2xl p-6 space-y-4 backdrop-blur-sm"
      >
        <h3 class="text-lg font-semibold">Logo du club</h3>
        <div
          class="flex flex-col sm:flex-row items-center gap-6 p-4 border-2 border-dashed border-white/10 rounded-2xl"
        >
          <div
            class="relative w-32 h-32 bg-slate-900 rounded-2xl overflow-hidden border border-yellow-500/50 shadow-lg shadow-yellow-500/10"
          >
            <img
              v-if="previewUrl"
              :src="previewUrl"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="flex-1">
            <input
              type="file"
              id="logo-edit"
              class="hidden"
              @change="handleFileUpload"
              accept="image/*"
            />
            <label
              for="logo-edit"
              class="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg cursor-pointer transition-colors text-sm font-semibold"
            >
              Changer le logo
            </label>
            <p class="text-xs text-slate-500 mt-2">
              Format recommandé : Carré, PNG ou JPG.
            </p>
          </div>
        </div>
      </div>

      <div
        class="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 space-y-4"
      >
        <h3 class="text-lg font-semibold text-red-400">Confirmation</h3>
        <p class="text-sm text-slate-400">
          Saisissez votre mot de passe actuel pour enregistrer les
          modifications.
        </p>
        <div
          class="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 space-y-4"
        >
          <h3
            class="text-lg font-semibold text-red-400 flex items-center gap-2"
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
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Confirmation
          </h3>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-slate-300"
              >Mot de passe actuel</label
            >
            <input
              v-model="currentPassword"
              type="password"
              placeholder="Saisissez vos 6 caractères (ou plus !)"
              class="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all"
              :class="{ 'border-red-500/50': errors.currentPassword }"
            />
            <p v-if="errors.currentPassword" class="text-red-500 text-xs mt-1">
              {{ errors.currentPassword }}
            </p>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-end gap-4 pt-4">
        <button
          type="button"
          @click="$router.push({ name: 'Club' })"
          class="text-slate-400 hover:text-white font-medium"
        >
          Annuler
        </button>
        <button
          type="submit"
          :disabled="saving"
          class="px-8 py-2.5 bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 text-slate-900 font-bold rounded-xl transition-all active:scale-95 shadow-lg shadow-yellow-500/10"
        >
          {{ saving ? "Enregistrement..." : "Mettre à jour" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { fetchCitiesByPostalCode } from "@/assets/js/cityFetch.js";
import { useClubStore } from "@/stores/club";
import { useUserStore } from "@/stores/user";
import api from "@/config";
import { useField, useForm } from "vee-validate";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import * as yup from "yup";

import AuthInput from "@/components/AuthInput.vue";
import BaseNotification from "@/components/BaseNotification.vue";

const userStore = useUserStore();
const clubStore = useClubStore();
const router = useRouter();

const initialLoading = ref(true);
const saving = ref(false);
const postalCode = ref("");
const location = ref("");
const cities = ref([]);
const file = ref(null);
const previewUrl = ref(null);

// Notification
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

// Validation
const schema = yup.object({
  clubName: yup.string().min(4, "Trop court").required("Requis"),
  description: yup.string().min(10, "Minimum 10 caractères").required("Requis"),
  currentPassword: yup
    .string()
    .min(6, "Minimum 6 caractères")
    .required("Requis"),
});

const { handleSubmit, errors, setValues } = useForm({
  validationSchema: schema,
});
const { value: clubName } = useField("clubName");
const { value: description } = useField("description");
const { value: currentPassword } = useField("currentPassword");

onMounted(async () => {
  try {
    await clubStore.fetchClubByUserId(userStore.user.id, userStore.token);
    if (clubStore.club) {
      setValues({
        clubName: clubStore.club.name,
        description: clubStore.club.description,
        currentPassword: "",
      });
      location.value = clubStore.club.location || "";
      cities.value = location.value ? [location.value] : [];
      if (clubStore.club.clubImg) {
        previewUrl.value = `http://localhost:8081/api/uploads/logos/${clubStore.club.clubImg}`;
      }
    }
  } catch (e) {
    triggerNotify("Erreur", "Données club introuvables", "error");
  } finally {
    initialLoading.value = false;
  }
});

watch(postalCode, async (newCode) => {
  if (newCode.length === 5) {
    cities.value = await fetchCitiesByPostalCode(newCode);
    if (cities.value.length === 1) location.value = cities.value[0];
  }
});

function handleFileUpload(event) {
  const selected = event.target.files[0];
  if (selected) {
    file.value = selected;
    previewUrl.value = URL.createObjectURL(selected);
  }
}
watch(currentPassword, (newValue) => {
  console.log("Valeur perçue par Vee-Validate :", newValue);
  console.log("Longueur :", newValue ? newValue.length : 0);
});

const onFormSubmit = handleSubmit(
  async (values) => {
    console.log("🚀 Validation réussie ! Valeurs envoyées :", values);
    saving.value = true;
    try {
      const formData = new FormData();
      const updateData = {
        id: clubStore.club.id,
        clubName: values.clubName,
        description: values.description,
        location: location.value,
        currentPassword: values.currentPassword,
      };

      formData.append(
        "request",
        new Blob([JSON.stringify(updateData)], { type: "application/json" }),
      );

      if (file.value) {
        formData.append("clubImg", file.value);
      }

      const response = await api.put("/club/update", formData);
      console.log("✅ Réponse serveur :", response.data);

      triggerNotify("Succès", "Le club a été mis à jour !", "success");
      setTimeout(() => router.push({ name: "Club" }), 2000);
    } catch (error) {
      console.error("❌ Erreur API :", error);
      const errorMsg = error.response?.data || "Erreur lors de la mise à jour";
      triggerNotify("Erreur", errorMsg, "error");
    } finally {
      saving.value = false;
    }
  },
  (invalid) => {
    // CETTE PARTIE S'EXÉCUTE SI LE FORMULAIRE EST INVALIDE
    console.warn("⚠️ Formulaire invalide :", invalid.errors);
  },
);
</script>
