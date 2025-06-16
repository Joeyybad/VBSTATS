<template>
    <div v-if="showSuccessMessage"
        class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-center mt-4">
        Utilisateur modifié avec succès
    </div>
    <div class="pt-24 pb-40 max-w-md mx-auto text-white">
        <h2 class="text-2xl font-bold mb-6 text-center">Modifier mes informations</h2>

        <form @submit.prevent="onSubmit" class="space-y-4">
            <div>
                <label class="block">Email :</label>
                <input v-model="email" type="email" class="w-full border text-yellow-600 p-2 rounded" />
                <p class="text-red-500 text-sm">{{ errors.email }}</p>
            </div>

            <div>
                <label class="block">Prénom :</label>
                <input v-model="firstname" type="text" class="w-full border text-yellow-600 p-2 rounded" />
                <p class="text-red-500 text-sm">{{ errors.firstname }}</p>
            </div>

            <div>
                <label class="block">Nom :</label>
                <input v-model="lastname" type="text" class="w-full border text-yellow-600 p-2 rounded" />
                <p class="text-red-500 text-sm">{{ errors.lastname }}</p>
            </div>

            <!-- Mot de passe actuel requis -->
            <div>
                <label class="block text-red-400 font-semibold">Mot de passe:</label>
                <input v-model="currentPassword" type="password" required
                    class="w-full border text-yellow-600 p-2 rounded" />
                <p class="text-red-500 text-sm">{{ errors.currentPassword }}</p>
            </div>

            <!-- Option pour changer le mot de passe -->
            <div>
                <label class="inline-flex items-center">
                    <input type="checkbox" v-model="showNewPasswordFields" class="mr-2" />
                    <span>Changer le mot de passe</span>
                </label>
            </div>

            <!-- Champs pour nouveau mot de passe -->
            <div v-if="showNewPasswordFields">
                <div>
                    <label class="block">Nouveau mot de passe :</label>
                    <input v-model="newPassword" type="password" class="w-full border text-yellow-600 p-2 rounded" />
                    <p class="text-red-500 text-sm">{{ errors.newPassword }}</p>
                </div>

                <div>
                    <label class="block">Confirmation du mot de passe :</label>
                    <input v-model="confirmPassword" type="password"
                        class="w-full border text-yellow-600 p-2 rounded" />
                    <p class="text-red-500 text-sm">{{ errors.confirmPassword }}</p>
                </div>
            </div>

            <button type="submit" class="bg-yellow-600 hover:bg-yellow-800 text-white px-4 py-2 rounded">
                Enregistrer
            </button>
        </form>

        <router-link :to="{ name: 'Profil' }"
            class="fixed bottom-30 left-15 flex items-center space-x-2 text-white hover:text-yellow-400 transition">
            <img src="/src/assets/undo.png" alt="Retour" class="w-6 h-6 filter invert" />
            <span>Retour</span>
        </router-link>
    </div>
</template>
<script setup>
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import { useField, useForm } from 'vee-validate';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import * as yup from 'yup';

const userStore = useUserStore();
const router = useRouter();
const showSuccessMessage = ref(false);
const showNewPasswordFields = ref(false);

// Déclaration du schéma
const schema = yup.object({
    email: yup.string().email('Email invalide').required('Email requis'),
    firstname: yup.string().required('Le prénom est requis'),
    lastname: yup.string().required('Le nom est requis'),
    currentPassword: yup.string().required('Mot de passe actuel requis'),
    newPassword: yup.string().when('confirmPassword', {
        is: (val) => val && val.length > 0,
        then: (schema) => schema.min(6, 'Minimum 6 caractères').required('Nouveau mot de passe requis'),
        otherwise: (schema) => schema.notRequired(),
    }),
    confirmPassword: yup.string().oneOf([yup.ref('newPassword')], 'Les mots de passe ne correspondent pas'),
});

// On initialise le formulaire
const { handleSubmit, errors } = useForm({
    validationSchema: schema,
    initialValues: {
        email: userStore.user.email,
        firstname: userStore.user.firstname,
        lastname: userStore.user.lastname,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    },
});

// Champs
const { value: email } = useField('email');
const { value: firstname } = useField('firstname');
const { value: lastname } = useField('lastname');
const { value: currentPassword } = useField('currentPassword');
const { value: newPassword } = useField('newPassword');
const { value: confirmPassword } = useField('confirmPassword');

// Fonction de soumission
const onSubmit = handleSubmit(async (values) => {
    try {
        const updatedUserRequest = {
            user: {
                ...userStore.user,
                email: values.email,
                firstname: values.firstname,
                lastname: values.lastname,
                password: showNewPasswordFields.value ? values.newPassword : '',
            },
            confirmPassword: showNewPasswordFields.value ? values.confirmPassword : '',
            currentPassword: values.currentPassword,
        };

        await axios.put('http://localhost:8082/user/update', updatedUserRequest, {
            headers: {
                Authorization: `Bearer ${userStore.token}`,
            },
        });

        userStore.setUser(updatedUserRequest.user, userStore.token);
        showSuccessMessage.value = true;
        setTimeout(() => router.push('/profil'), 2000);
    } catch (error) {
        console.error('Erreur lors de la mise à jour :', error);
        alert(error.response?.data || 'Une erreur est survenue');
    }
});
</script>