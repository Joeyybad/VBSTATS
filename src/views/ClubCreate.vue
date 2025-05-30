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
            <div>
                <label for=" block postal-code">Code Postal</label>
                <input v-model="postalCode" class="w-full border text-yellow-600 p-2 rounded" type="text"
                    id="postal-code" name="postal-code" aria-label="Code Postal">
                <select v-model="location" class="w-full border text-yellow-600 p-2 rounded" id="city">
                    <option value="">--Choisissez une ville--</option>
                    <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
                </select>
            </div>
            <div>
                <label>Logo du club :</label>
                <input class="w-full border text-yellow-600 p-2 rounded" type="file" @change="handleFileUpload"
                    accept="image/*" />
                <img v-if="previewUrl" :src="previewUrl" class="w-32 mt-2 rounded shadow" />
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
import { fetchCitiesByPostalCode } from '@/assets/js/cityFetch.js';
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import { useField, useForm } from 'vee-validate';
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import * as yup from 'yup';

const authStore = useUserStore();
const user = computed(() => authStore.user);
const postalCode = ref('');
const location = ref('');
const cities = ref([])
const userStore = useUserStore();
const router = useRouter();
const showSuccessMessage = ref(false);
const file = ref(null);
const previewUrl = ref(null);


// Déclaration du schéma
const schema = yup.object({
    clubName: yup.string().min(4, 'Le nom du club doit être supérieur à 4').required('Le nom du club est requis'),
    description: yup.string().min(10, 'La description doit avoir 10 caractères').required('La description du club est requise')
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
        location.value = '';
    }
});


const onSubmit = handleSubmit(async (values) => {
    try {
        const formData = new FormData();
        formData.append('clubName', values.clubName);
        formData.append('description', values.description);
        formData.append('location', location.value);
        formData.append('userId', userStore.user?.id || '');
        if (file.value) {
            formData.append('clubImg', file.value);
        }
        console.log("ID utilisateur envoyé:", userStore.user?.id);
        await axios.post('http://localhost:8082/api/club/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        showSuccessMessage.value = true;
        setTimeout(() => {
            router.push({ name: 'Club' });
        }, 2000);
    } catch (error) {
        console.error('Erreur lors de la création du club:', error);
        if (error.response) {
            console.error('Message backend :', error.response.data);
        }
    }
});



</script>