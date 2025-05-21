<template>
    <div class="pt-24 pb-20 max-w-md mx-auto text-white">
        <h2 class="text-2xl font-bold mb-6 text-center">Modifier mes informations</h2>

        <form @submit.prevent="onSubmit" class="space-y-4">
            <div>
                <label class="block">Email :</label>
                <input v-model="form.email" type="email" class="w-full  border text-yellow-600 p-2 rounded" />
            </div>
            <div>
                <label class="block">Prénom :</label>
                <input v-model="form.firstname" type="text" class="w-full  border text-yellow-600 p-2 rounded" />
            </div>
            <div>
                <label class="block">Nom :</label>
                <input v-model="form.lastname" type="text" class="w-full border text-yellow-600 p-2 rounded" />
            </div>
            <div>
                <label class="block">Mot de passe :</label>
                <input v-model="form.password" type="password" class="w-full border text-yellow-600 p-2 rounded" />
            </div>
            <div>
                <label class="block"> Confirmation du mot de passe :</label>
                <input v-model="form.confirmPassword" type="password"
                    class="w-full border text-yellow-600 p-2 rounded" />
            </div>

            <button type="submit" class=" bg-yellow-600 hover:bg-yellow-800 text-white px-4 py-2 rounded">
                Enregistrer
            </button>
        </form>
        <!-- Bouton retour en bas à gauche -->
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const form = ref({
    email: userStore.user.email,
    firstname: userStore.user.firstname,
    lastname: userStore.user.lastname,
    password: '', // A remplir
    confirmPassword: '' // A remplir

});

const onSubmit = async () => {
    try {
        const updatedUser = {
            ...userStore.user,
            email: fromJSON.value.email,
            firstname: form.value.firstname,
            lastname: form.value.lastname,
            password: form.value.password,
            confirmPassword: form.value.confirmPassword
        };

        await axios.put('http://localhost:8082/api/user/update', updatedUser, {
            headers: {
                Authorization: `Bearer ${userStore.token}`,
            },
        });

        // Met à jour le store local
        userStore.setUser(updatedUser, userStore.token);

        alert('Profil mis à jour avec succès');
        router.push('/profil');
    } catch (error) {
        console.error('Erreur lors de la mise à jour :', error);
        alert('Une erreur est survenue');
    }
};
</script>