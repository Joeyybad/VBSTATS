<template>
    <div v-if="showSuccessMessage"
        class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-center mt-4">
        Club modifié avec succès
    </div>

    <div class="pt-24 pb-40 max-w-md mx-auto text-white">
        <h2 class="text-2xl font-bold mb-6 text-center">Modifier les informations du club</h2>

        <!-- Affiche le formulaire uniquement si le club est chargé -->
        <form v-if="clubStore.club" @submit.prevent="onSubmit" class="space-y-4">
            <div>
                <label class="block">Nom du club :</label>
                <input v-model="clubName" type="text" class="w-full border text-yellow-600 p-2 rounded" />
                <p class="text-red-500 text-sm">{{ errors.clubName }}</p>
            </div>

            <div>
                <label class="block">Description :</label>
                <input v-model="description" type="text" class="w-full border text-yellow-600 p-2 rounded" />
                <p class="text-red-500 text-sm">{{ errors.description }}</p>
            </div>

            <div>
                <label for="postal-code">Code Postal</label>
                <input v-model="postalCode" class="w-full border text-yellow-600 p-2 rounded" type="text"
                    id="postal-code" name="postal-code" aria-label="Code Postal" />
                <select v-if="cities.length" v-model="location" class="w-full border text-yellow-600 p-2 rounded"
                    id="city">
                    <option value="">--Choisissez une ville--</option>
                    <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
                </select>
            </div>

            <div>
                <label>Logo du club :</label>
                <img v-if="clubImg" :src="clubImg" class="w-32 mt-2 rounded shadow" />
                <input class="w-full border text-yellow-600 p-2 rounded" type="file" @change="handleFileUpload"
                    accept="image/*" />
                <img v-if="previewUrl" :src="previewUrl" class="w-32 mt-2 rounded shadow" />
            </div>

            <div>
                <label class="block text-red-400 font-semibold">Mot de passe :</label>
                <input v-model="currentPassword" type="password" required
                    class="w-full border text-yellow-600 p-2 rounded" />
                <p class="text-red-500 text-sm">{{ errors.currentPassword }}</p>
            </div>

            <button type="submit" class="bg-yellow-600 hover:bg-yellow-800 text-white px-4 py-2 rounded">
                Enregistrer
            </button>
        </form>

        <!-- Chargement pendant la récupération des données -->
        <div v-else class="text-center text-yellow-500 py-10">
            Chargement des informations du club...
        </div>

        <router-link :to="{ name: 'Club' }"
            class="fixed bottom-30 left-15 flex items-center space-x-2 text-white hover:text-yellow-400 transition">
            <img src="/src/assets/undo.png" alt="Retour" class="w-6 h-6 filter invert" />
            <span>Retour</span>
        </router-link>
    </div>
</template>

<script setup>
import { fetchCitiesByPostalCode } from '@/assets/js/cityFetch.js';
import { useClubStore } from '@/stores/club';
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import { useField, useForm } from 'vee-validate';
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import * as yup from 'yup';

const userStore = useUserStore();
const clubStore = useClubStore();
const router = useRouter();

const postalCode = ref('');
const location = ref('');
const cities = ref([]);
const showSuccessMessage = ref(false);
const file = ref(null);
const previewUrl = ref(null);
const currentPassword = ref('');
const club = computed(() => clubStore.club);

console.log("User Store token :", userStore.token);
console.log("User Store user :", userStore.user);

// Schéma de validation
const schema = yup.object({
    clubName: yup.string().min(4, 'Le nom du club doit être supérieur à 4').required('Le nom du club est requis'),
    description: yup.string().min(10, 'La description doit avoir 10 caractères').required('La description du club est requise'),
});

const { handleSubmit, errors, setValues } = useForm({
    validationSchema: schema,
});

const { value: clubName } = useField('clubName');
const { value: description } = useField('description');


if (file.value) {
    formData.append('clubImg', file.value);
}

// Chargement initial
onMounted(async () => {
    await clubStore.fetchClubByUserId(userStore.user.id, userStore.token);

    if (clubStore.club) {
        setValues({
            clubName: clubStore.club.name,
            description: clubStore.club.description,
        });
        location.value = clubStore.club.location || '';
        previewUrl.value = clubStore.club.clubImg;
    }
    if (location.value) {
        cities.value = [location.value]; // Pour que le <select> ait une option affichée
    }
    if (clubStore.club.clubImg) {
        previewUrl.value = `http://localhost:8082/api/uploads/logos/${clubStore.club.clubImg}`;
    }
});

// Villes par code postal
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

// Upload de fichier
function handleFileUpload(event) {
    const selected = event.target.files[0];
    if (selected) {
        file.value = selected;
        previewUrl.value = URL.createObjectURL(selected);
    }
}

// Soumission
const onSubmit = handleSubmit(async (values) => {
    try {
        const formData = new FormData();
        formData.append('request', new Blob([JSON.stringify({
            id: userStore.user.clubId,
            clubName: values.clubName,
            description: values.description,
            location: location.value,
            currentPassword: currentPassword.value,
        })], { type: 'application/json' }));

        if (file.value) {
            formData.append('clubImg', file.value);
        }

        await axios.put('http://localhost:8082/api/club/update', formData, {
            headers: {
                Authorization: `Bearer ${userStore.token}`,
                // Pas besoin de définir Content-Type manuellement pour FormData
            },
        }, console.log('Token envoyé :', userStore.token));

        showSuccessMessage.value = true;
        setTimeout(() => {
            router.push({ name: 'Club' });
        }, 2000);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du club:', error);
        if (error.response) {
            console.error('Message backend :', error.response.data);
        }
    }
});

</script>
