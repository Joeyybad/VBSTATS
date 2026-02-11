<template>
  <div
    v-if="showSuccessMessage"
    class="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded-lg shadow-md"
  >
    Utilisateur inscrit avec succès ! Redirection...
  </div>

  <AuthLayout
    title="Inscription"
    subtitle="L'application incontournable pour votre club de volley"
    buttonText="S'inscrire"
    :loading="loading"
    @submit="submitForm"
  >
    <template #fields>
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
      Déjà un compte ?
      <router-link
        to="/connexion"
        class="text-yellow-500 hover:underline font-semibold"
      >
        Connectez-vous
      </router-link>
    </template>
  </AuthLayout>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import api from "@/config";

// Import des nouveaux composants
import AuthLayout from "@/layouts/AuthLayout.vue";
import AuthInput from "@/components/AuthInput.vue";

const router = useRouter();
const showSuccessMessage = ref(false);
const loading = ref(false);

// 1. Schéma de validation Yup
const schema = yup.object({
  firstname: yup.string().trim().required("Le prénom est requis"),
  lastname: yup.string().trim().required("Le nom est requis"),
  email: yup.string().trim().email("Email invalide").required("Email requis"),
  password: yup
    .string()
    .trim()
    .min(6, "Minimum 6 caractères")
    .required("Mot de passe requis"),
  confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref("password")], "Les mots de passe ne correspondent pas")
    .required("Confirmation requise"),
});

// 2. Initialisation de Vee-Validate
const { handleSubmit } = useForm({
  validationSchema: schema,
});

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

    showSuccessMessage.value = true;

    setTimeout(() => {
      router.push("/connexion");
    }, 2000);
  } catch (error) {
    const message = error.response?.data || "Erreur lors de l'inscription";
    alert(`Erreur : ${message}`);
  } finally {
    loading.value = false;
  }
};

const submitForm = handleSubmit(onSubmit);
</script>

<style scoped>
/* Plus besoin de .input-style ou .error-text ici ! 
   Tout est géré à l'intérieur de AuthInput et AuthLayout.
*/
</style>
