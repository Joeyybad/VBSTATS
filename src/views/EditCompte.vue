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
        Modifier mes informations
      </h1>
      <p class="text-slate-400">
        Mettez à jour vos données personnelles et sécurisez votre compte.
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
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </span>
          Informations personnelles
        </h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AuthInput
            label="Prénom"
            v-model="firstname"
            :error="errors.firstname"
            placeholder="Prénom"
          />
          <AuthInput
            label="Nom"
            v-model="lastname"
            :error="errors.lastname"
            placeholder="Nom"
          />
        </div>

        <AuthInput
          label="Email"
          v-model="email"
          type="email"
          :error="errors.email"
          placeholder="votre@email.com"
        />
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
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </span>
          Sécurité
        </h3>

        <AuthInput
          label="Confirmer avec votre mot de passe actuel"
          v-model="currentPassword"
          type="password"
          :error="errors.currentPassword"
          placeholder="••••••"
        />

        <div class="pt-2">
          <label class="inline-flex items-center cursor-pointer group">
            <input
              type="checkbox"
              v-model="showNewPasswordFields"
              class="sr-only peer"
            />
            <div
              class="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"
            ></div>
            <span
              class="ms-3 text-sm font-medium text-slate-300 group-hover:text-white transition-colors"
              >Changer le mot de passe</span
            >
          </label>
        </div>

        <Transition name="expand">
          <div
            v-if="showNewPasswordFields"
            class="space-y-4 pt-4 border-t border-white/5"
          >
            <AuthInput
              label="Nouveau mot de passe"
              v-model="newPassword"
              type="password"
              :error="errors.newPassword"
              placeholder="Minimum 6 caractères"
            />
            <AuthInput
              label="Confirmer le nouveau mot de passe"
              v-model="confirmPassword"
              type="password"
              :error="errors.confirmPassword"
              placeholder="••••••"
            />
          </div>
        </Transition>
      </div>

      <div class="flex items-center justify-end gap-4 pt-4">
        <button
          type="button"
          @click="$router.push({ name: 'Compte' })"
          class="px-6 py-2.5 text-slate-400 hover:text-white transition-colors font-medium"
        >
          Annuler
        </button>
        <button
          type="submit"
          :disabled="loading"
          class="px-8 py-2.5 bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 font-bold rounded-xl transition-all shadow-lg shadow-yellow-500/10 active:scale-95"
        >
          {{ loading ? "Enregistrement..." : "Enregistrer les modifications" }}
        </button>
      </div>
    </form>

    <div class="pt-4 border-t border-white/5">
      <button
        @click="$router.push({ name: 'Compte' })"
        class="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group"
      >
        <img
          src="/src/assets/undo.png"
          alt="Retour"
          class="w-4 h-4 filter invert opacity-50 group-hover:opacity-100"
        />
        Retour aux informations
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import api from "@/config";

// Composants
import AuthInput from "@/components/AuthInput.vue";
import BaseNotification from "@/components/BaseNotification.vue";

const userStore = useUserStore();
const router = useRouter();
const loading = ref(false);
const showNewPasswordFields = ref(false);

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
  email: yup.string().email("Email invalide").required("L'email est requis"),
  firstname: yup.string().required("Le prénom est requis"),
  lastname: yup.string().required("Le nom est requis"),
  currentPassword: yup
    .string()
    .required("Mot de passe actuel requis pour valider"),
  newPassword: yup.string().when("showNewPassword", {
    is: () => showNewPasswordFields.value,
    then: (s) =>
      s.min(6, "Minimum 6 caractères").required("Nouveau mot de passe requis"),
    otherwise: (s) => s.notRequired(),
  }),
  confirmPassword: yup.string().when("showNewPassword", {
    is: () => showNewPasswordFields.value,
    then: (s) =>
      s
        .oneOf(
          [yup.ref("newPassword")],
          "Les mots de passe ne correspondent pas",
        )
        .required("Confirmation requise"),
    otherwise: (s) => s.notRequired(),
  }),
});

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
  initialValues: {
    email: userStore.user.email,
    firstname: userStore.user.firstname,
    lastname: userStore.user.lastname,
  },
});

const { value: email } = useField("email");
const { value: firstname } = useField("firstname");
const { value: lastname } = useField("lastname");
const { value: currentPassword } = useField("currentPassword");
const { value: newPassword } = useField("newPassword");
const { value: confirmPassword } = useField("confirmPassword");

const onFormSubmit = handleSubmit(async (values) => {
  loading.value = true;
  try {
    // On crée un objet "plat" qui correspond au DTO UpdateUserRequest
    const payload = {
      id: userStore.user.id,
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      currentPassword: values.currentPassword,
      newPassword: showNewPasswordFields.value ? values.newPassword : null,
      confirmPassword: showNewPasswordFields.value
        ? values.confirmPassword
        : null,
    };
    const response = await api.put("/user/update", payload);

    // Mise à jour du store (on garde le token actuel)
    userStore.setUser(response.data, userStore.token);

    triggerNotify(
      "Succès",
      "Vos informations ont été mises à jour avec succès !",
      "success",
    );

    setTimeout(() => router.push({ name: "Compte" }), 2000);
  } catch (error) {
    const msg = error.response?.data || "Erreur lors de la mise à jour.";
    triggerNotify("Erreur", msg, "error");
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease-in-out;
  max-height: 300px;
  overflow: hidden;
}
.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}
</style>
