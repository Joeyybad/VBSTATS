<template>
    <div class="flex justify-center items-center min-h-screen pt-20 pb-20">
        <div class="text-center p-6 w-full max-w-md">
            <h2 class="text-3xl font-bold text-white mb-6">Club</h2>

            <!-- Affichage du nom et du logo si un club existe -->
            <div v-if="loading">Chargement...</div>

            <div v-else-if="club" class="border rounded border-yellow-600 ">
                <img :src="`http://localhost:8082/api/uploads/logos/${club.clubImg}`" alt="Logo du club"
                    class="w-28 h-28 mx-auto mb-4 rounded-none">

                <!-- Nom du club avec icône Modifier -->
                <div class="flex items-center justify-center gap-2 ">
                    <h3 class="text-2xl font-semibold text-white">{{ club.name }}</h3>
                    <img @click="modifierClub" src="/src/assets/edition.png" alt="Modifier"
                        class="w-6 h-6 cursor-pointer hover:scale-110 transition filter invert">
                </div>
                <div>
                    <p class="text-xl p-3">
                        {{ club.description }}
                    </p>

                </div>
                <div>
                    <p class="text-xl p-3">
                        {{ club.location }}
                    </p>

                </div>
            </div>

            <!-- Si aucun club n'est défini, afficher "Ajouter Club" avec icône -->
            <div v-else>
                <div class="flex items-center justify-center gap-2">
                    <h3 class="text-2xl font-semibold text-white">Ajouter un club</h3>
                    <router-link :to="{ name: 'ClubCreate' }"><img @click="ajouterClub" src="/src/assets/plus.png"
                            alt="Ajouter"
                            class="w-6 h-6 cursor-pointer hover:scale-110 transition filter invert" /></router-link>

                </div>
            </div>
        </div>
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
import { onMounted, ref } from 'vue';

const userStore = useUserStore();
const loading = ref(true);
const club = ref(null);

onMounted(async () => {
    try {
        const userId = userStore.user?.id;
        if (!userId) {
            console.error('Utilisateur non connecté');
            loading.value = false;
            return;
        }

        const response = await axios.get(`http://localhost:8082/api/club/by-user/${userId}`);
        club.value = response.data;
        console.log(club.value);
    } catch (error) {
        console.error('Erreur lors de la récupération du club :', error);
    } finally {
        loading.value = false;
    }
});
</script>
