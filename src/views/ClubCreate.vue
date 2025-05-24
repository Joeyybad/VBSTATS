<template>
    <div class="pt-24 pb-40 max-w-md mx-auto text-white">
        <div v-if="showSuccessMessage"
            class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-center mt-4">
            Club créé
        </div>

        <h2 class="text-2xl font-bold mb-6 text-center">Création du club</h2>

        <form @submit.prevent="onSubmit" class="space-y-4">
            <div>
                <label class="block">Nom du club :</label>
                <input v-model="clubName" type="text" class="w-full border text-yellow-600 p-2 rounded" />
                <p class="text-red-500 text-sm">{{ errors.clubName }}</p>
            </div>

            <div>
                <label class="block">Description du club: </label>
                <textarea id="description" v-model="description" name="description"
                    class="border text-yellow-600 rounded" rows="4" cols="60" aria-label="description"></textarea>
                <p class="text-red-500 text-sm">{{ errors.description }}</p>
            </div>

            <button type="submit" class="bg-yellow-600 hover:bg-yellow-800 text-white px-4 py-2 rounded">
                Enregistrer
            </button>
        </form>

        <router-link :to="{ name: 'Club' }"
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


// Déclaration du schéma
const schema = yup.object({
    clubName: yup.string().min(4, 'Le nom du club doit être supérieur à 4').required('Le nom du club est requis'),
    description: yup.string().min(10, 'La description doit avoir 10 caractères').required('La description du club est requise'),

});

// On initialise le formulaire
const { handleSubmit, errors } = useForm({
    validationSchema: schema,
    initialValues: {
        clubName: "",
        description: ""
    },
});

// Champs
const { value: clubName } = useField('clubName');
const { value: description } = useField('description');

const onSubmit = handleSubmit(async (values) => {
    try {
        console.log('Création du club avec :', values);

        // Exemple d'appel à une API pour créer le club
        await axios.post('/api/clubs', {
            name: values.clubName,
            description: values.description,
            userId: userStore.user?.id // si ton backend attend l'id du créateur
        });

        showSuccessMessage = ref(true);
        setTimeout(() => {
            router.push({ name: 'Club' });
        }, 2000);

    } catch (error) {
        console.error('Erreur lors de la création du club:', error);
    }
});



</script>