<template>
  <BaseNotification
    :show="notification.show"
    :title="notification.title"
    :message="notification.message"
    :type="notification.type"
    @close="notification.show = false"
  />

  <AuthLayout
    title="Inscription"
    subtitle="Rejoignez la communauté VB Stats et digitalisez votre club"
    buttonText="Créer mon compte"
    :loading="loading"
    @submit="submitForm"
  >
    <template #fields>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AuthInput
          label="Prénom"
          v-model="firstname"
          :error="firstnameMeta.touched ? firstnameError : ''"
          placeholder="Jean"
        />
        <AuthInput
          label="Nom"
          v-model="lastname"
          :error="lastnameMeta.touched ? lastnameError : ''"
          placeholder="Dupont"
        />
      </div>

      <AuthInput
        label="Email"
        v-model="email"
        type="email"
        :error="emailMeta.touched ? emailError : ''"
        placeholder="exemple@volley.fr"
      />

      <AuthInput
        label="Mot de passe"
        v-model="password"
        type="password"
        :error="passwordMeta.touched ? passwordError : ''"
        placeholder="******"
      />

      <AuthInput
        label="Confirmation du mot de passe"
        v-model="confirmPassword"
        type="password"
        :error="confirmPasswordMeta.touched ? confirmPasswordError : ''"
        placeholder="******"
      />
    </template>

    <template #footer>
      <div class="text-slate-400">
        Déjà un compte ?
        <router-link
          to="/connexion"
          class="text-yellow-500 hover:text-yellow-400 font-semibold transition-colors underline-offset-4 hover:underline"
        >
          Connectez-vous ici
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
import api from "@/config";

// Imports des composants
import AuthLayout from "@/layouts/AuthLayout.vue";
import AuthInput from "@/components/AuthInput.vue";
import BaseNotification from "@/components/BaseNotification.vue";

const router = useRouter();
const loading = ref(false);

// Système de notification
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
  }, 4000);
};

// 1. Schéma de validation Yup
const schema = yup.object({
  firstname: yup.string().trim().required("Le prénom est requis"),
  lastname: yup.string().trim().required("Le nom est requis"),
  email: yup
    .string()
    .trim()
    .email("Email invalide")
    .required("L'email est requis"),
  password: yup
    .string()
    .trim()
    .min(6, "Minimum 6 caractères")
    .required("Le mot de passe est requis"),
  confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref("password")], "Les mots de passe ne correspondent pas")
    .required("Veuillez confirmer le mot de passe"),
});

// 2. Initialisation de Vee-Validate
const { handleSubmit } = useForm({ validationSchema: schema });

const {
  value: firstname,
  errorMessage: firstnameError,
  meta: firstnameMeta,
} = useField("firstname");
const {
  value: lastname,
  errorMessage: lastnameError,
  meta: lastnameMeta,
} = useField("lastname");
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
const {
  value: confirmPassword,
  errorMessage: confirmPasswordError,
  meta: confirmPasswordMeta,
} = useField("confirmPassword");

// 3. Logique de soumission
const onSubmit = async (values) => {
  loading.value = true;
  try {
    await api.post("/user/create", {
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    });

    triggerNotify(
      "Inscription réussie !",
      "Votre compte a été créé. Vous allez être redirigé vers la connexion.",
      "success",
    );

    setTimeout(() => {
      router.push("/connexion");
    }, 2500);
  } catch (error) {
    const errorMsg =
      error.response?.data || "Une erreur est survenue lors de l'inscription.";
    triggerNotify("Échec de l'inscription", errorMsg, "error");
  } finally {
    loading.value = false;
  }
};

const submitForm = handleSubmit(onSubmit);
</script>
