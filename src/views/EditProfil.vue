<template>
    <div class="pt-24 pb-20 max-w-md mx-auto text-white">
        <h2 class="text-2xl font-bold mb-6">Modifier mes informations</h2>

        <form @submit.prevent="onSubmit" class="space-y-4">
            <div>
                <label class="block">Prénom :</label>
                <input v-model="form.firstname" type="text" class="w-full text-black p-2 rounded" />
            </div>
            <div>
                <label class="block">Nom :</label>
                <input v-model="form.lastname" type="text" class="w-full text-black p-2 rounded" />
            </div>
            <div>
                <label class="block">Mot de passe :</label>
                <input v-model="form.password" type="password" class="w-full text-black p-2 rounded" />
            </div>

            <button type="submit" class="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded">
                Enregistrer
            </button>
        </form>
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
    firstname: userStore.user.firstname,
    lastname: userStore.user.lastname,
    password: '', // A remplir
});

const onSubmit = async () => {
    try {
        const updatedUser = {
            ...userStore.user,
            firstname: form.value.firstname,
            lastname: form.value.lastname,
            password: form.value.password,
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