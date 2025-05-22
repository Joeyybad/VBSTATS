<template>
    <div v-if="showSuccessMessage"
        class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-center mt-4">
        Utilisateur modifié avec succès
    </div>
    <div class="pt-24 pb-20 max-w-md mx-auto text-white">
        <h2 class="text-2xl font-bold mb-6 text-center">Modifier mes informations</h2>

        <form @submit.prevent="onSubmit" class="space-y-4">
            <div>
                <label class="block">Email :</label>
                <input v-model="form.email" type="email" class="w-full border text-yellow-600 p-2 rounded" />
                <p class="text-red-500 text-sm">{{ errors.email }}</p>
            </div>

            <div>
                <label class="block">Prénom :</label>
                <input v-model="form.firstname" type="text" class="w-full border text-yellow-600 p-2 rounded" />
                <p class="text-red-500 text-sm">{{ errors.firstname }}</p>
            </div>

            <div>
                <label class="block">Nom :</label>
                <input v-model="form.lastname" type="text" class="w-full border text-yellow-600 p-2 rounded" />
                <p class="text-red-500 text-sm">{{ errors.lastname }}</p>
            </div>

            <!-- Mot de passe actuel requis -->
            <div>
                <label class="block text-red-400 font-semibold">Mot de passe:</label>
                <input v-model="form.currentPassword" type="password" required
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
                    <input v-model="form.newPassword" type="password"
                        class="w-full border text-yellow-600 p-2 rounded" />
                    <p class="text-red-500 text-sm">{{ errors.newPassword }}</p>
                </div>

                <div>
                    <label class="block">Confirmation du mot de passe :</label>
                    <input v-model="form.confirmPassword" type="password"
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
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import * as yup from 'yup';

const userStore = useUserStore();
const router = useRouter();
const showSuccessMessage = ref(false);
const showNewPasswordFields = ref(false);

//initialisation du formulaire
const form = ref({
    email: userStore.user.email,
    firstname: userStore.user.firstname,
    lastname: userStore.user.lastname,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
});

//Schema de validation des champs du formulaire
const schema = yup.object({
    email: yup.string().trim().email('Email invalide').required('Email requis'),
    firstname: yup.string().trim().required('Le prénom est requis'),
    lastname: yup.string().trim().required('Le nom est requis'),
    currentPassword: yup.string().required('Mot de passe actuel requis'),

    newPassword: yup.string().when('confirmPassword', {
        is: (val) => val && val.length > 0,
        then: (schema) => schema.min(6, 'Minimum 6 caractères').required('Nouveau mot de passe requis'),
        otherwise: (schema) => schema.notRequired(),
    }),

    confirmPassword: yup.string().oneOf(
        [yup.ref('newPassword')],
        'Les mots de passe ne correspondent pas'
    ),
});


// On appelle useForm
const { handleSubmit, errors } = useForm({
    validationSchema: schema,
    initialValues: form.value,
});

// fonction de soumission
const onSubmit = handleSubmit(async () => {
    try {
        const updatedUserRequest = {
            user: {
                ...userStore.user,
                email: form.value.email,
                firstname: form.value.firstname,
                lastname: form.value.lastname,
                password: showNewPasswordFields.value ? form.value.newPassword : '',
            },
            confirmPassword: showNewPasswordFields.value ? form.value.confirmPassword : '',
            currentPassword: form.value.currentPassword,
        };

        await axios.put('http://localhost:8082/api/user/update', updatedUserRequest, {
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