<template>
    <div v-if="showSuccessMessage"
        class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-center mt-4">
        Utilisateur connecté
    </div>
    <div class="flex justify-center items-center min-h-screen">

        <div class="text-center p-4 w-full max-w-md">
            <!-- Logo -->
            <img src="/Users/nkungajordan/Documents/VBSTATS/VBStatsVue/src/assets/VBStats.png" alt="logo"
                class="w-1/2 sm:w-1/5 md:w-1/4 lg:w-1/3 mx-auto mb-6">

            <!-- Texte + formulaire -->
            <div>
                <p>L'application incontournable pour votre club de volley</p>
                <h2 class="text-1xl font-semibold text-white mb-4 mt-5">Connexion</h2>
                <form @submit.prevent="submitForm" class="space-y-4">
                    <div>
                        <label for="email" class="block text-sm font-medium text-white">Email utilisateur</label>
                        <input v-model="email" type="text" id="email" name="email"
                            class="w-full px-4 py-2 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <span v-if="emailMeta.touched && emailError" class="error-text">{{ emailError }}</span>
                    </div>
                    <div>
                        <label for="password" class="block text-sm font-medium text-white">Mot de passe</label>
                        <input v-model="password" type="password" id="password" name="password"
                            class="w-full px-4 py-2 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <span v-if="passwordMeta.touched && passwordError" class="error-text">{{ passwordError }}</span>
                    </div>
                    <div class="text-center">
                        <button type="submit" :disabled="loading"
                            class="px-6 py-2 text-white rounded-md hover:bg-yellow-600">Se
                            connecter</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import { useField, useForm } from 'vee-validate';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import * as yup from 'yup';
const showSuccessMessage = ref(false);

const router = useRouter();

// construction d'un schèma pour les input validations
const schema = yup.object({
    email: yup.string()
        .trim()
        .required('Email ou mot de passe invalide')
        .email('Email ou mot de passe invalide'),
    password: yup.string()
        .trim()
        .required('Email ou mot de passe invalide')
        .min(6, 'Email ou mot de passe invalide'),
});

const { handleSubmit } = useForm({
    validationSchema: schema,
})

const { value: email, errorMessage: emailError, meta: emailMeta } = useField('email')
const { value: password, errorMessage: passwordError, meta: passwordMeta } = useField('password')

const userStore = useUserStore();

const onSubmit = async (values) => {
    try {
        const response = await axios.post('http://localhost:8082/api/user/login', {
            email: values.email,
            password: values.password
        });

        console.log('Utilisateur connecté :', response.data);
        showSuccessMessage.value = true;
        userStore.setUser(response.data.user);
        setTimeout(() => {
            router.push('/profil');
        }, 2000);

    } catch (error) {
        if (error.response) {
            alert(`Erreur du serveur : ${error.response.data}`);
        } else {
            alert('Erreur réseau, impossible de joindre le serveur.');
        }
    }
}

const submitForm = handleSubmit(onSubmit); // ⚠️ Doit être après onSubmit et handleSubmit

</script>

<style scoped>
.input-style {
    border: 1px white solid;
    border-radius: 7px;
    @apply w-full px-4 py-2 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500;
}

.error-text {
    @apply text-red-500 text-xs block mt-1;
    color: rgb(255, 191, 0);
}
</style>