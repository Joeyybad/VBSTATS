<template>
  <BaseNotification
    :show="notification.show"
    :title="notification.title"
    :message="notification.message"
    :type="notification.type"
    @close="notification.show = false"
  />

  <AuthLayout
    title="Connexion"
    subtitle="Accédez à votre tableau de bord VB Stats"
    buttonText="Se connecter"
    :loading="loading"
    @submit="submitForm"
  >
    <template #fields>
      <AuthInput
        label="Email utilisateur"
        v-slot:default
        v-model="email"
        type="email"
        :error="emailMeta.touched ? emailError : ''"
        placeholder="votre@email.com"
      />

      <AuthInput
        label="Mot de passe"
        v-model="password"
        type="password"
        :error="passwordMeta.touched ? passwordError : ''"
        placeholder="••••••"
      />
    </template>

    <template #footer>
      <div class="text-slate-400">
        Pas encore de compte ?
        <router-link
          to="/inscription"
          class="text-yellow-500 hover:text-yellow-400 font-semibold transition-colors underline-offset-4 hover:underline"
        >
          Inscrivez-vous gratuitement
        </router-link>
      </div>
    </template>
  </AuthLayout>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useUserStore } from "@/stores/user";
import api from "@/config";

// Import des composants
import AuthLayout from "@/layouts/AuthLayout.vue";
import AuthInput from "@/components/AuthInput.vue";
import BaseNotification from "@/components/BaseNotification.vue";

const router = useRouter();
const userStore = useUserStore();

// États de l'interface
const showNotify = ref(false);
const loading = ref(false);

// 1. Schéma de validation Yup
const schema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Format d'email invalide")
    .required("L'email est requis"),
  password: yup
    .string()
    .trim()
    .min(6, "Le mot de passe doit faire au moins 6 caractères")
    .required("Le mot de passe est requis"),
});

// 2. Initialisation Vee-Validate
const { handleSubmit } = useForm({
  validationSchema: schema,
});

const {
  value: email,
  errorMessage: emailError,
  meta: emailMeta,
} = useField("email");
const {
  value: password,
  errorMessage: passwordError,
  meta: passwordMeta,
} = useField("password");

const notification = ref({
  show: false,
  title: "",
  message: "",
  type: "success",
});

const triggerNotify = (title, message, type = "success") => {
  notification.value = { show: true, title, message, type };
  setTimeout(() => {
    notification.value.show = false;
  }, 3000);
};

// 3. Logique de connexion
const onSubmit = async (values) => {
  loading.value = true;
  try {
    const response = await api.post("/user/login", {
      email: values.email,
      password: values.password,
    });

    // Stockage dans Pinia
    userStore.setUser(response.data.user, response.data.token);

    // Notification Succès dynamique
    triggerNotify("Connexion réussie", "Content de vous revoir !", "success");

    // Redirection après un court délai pour laisser le temps de voir le succès
    setTimeout(() => {
      router.push("/");
    }, 1500);
  } catch (error) {
    // Erreur dynamique (on récupère le message du back-end s'il existe)
    const errorMsg = error.response?.data || "Email ou mot de passe incorrect.";
    // Notification Erreur dynamique
    triggerNotify("Erreur de connexion", errorMsg, "error");
  } finally {
    loading.value = false;
  }
};

const submitForm = handleSubmit(onSubmit);
</script>
