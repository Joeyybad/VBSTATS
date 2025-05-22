<template>

    <div class="relative min-h-screen flex flex-col justify-center items-center">
        <div class="absolute top-4 right-6 text-white">
            Bonjour, <span class="text-yellow-400"><strong>{{ user?.firstname }}</strong></span>
        </div>
        <!-- Ajout d'un fond pour vérifier l'affichage -->
        <div class="text-center p-6 w-full max-w-md">
            <h2 class="text-2xl font-semibold text-white mb-6">Profil</h2>

            <!-- Espace Compte -->
            <div
                class="flex justify-center items-center border border-white rounded-lg p-4 mb-4 hover:bg-gray-700 cursor-pointer">
                <router-link :to="{ name: 'Compte' }" class="flex items-center gap-2">
                    <span class="text-white text-lg">Espace Compte</span>
                    <img src="/src/assets/profil.png" alt="Profil" class="w-8 h-8 filter invert">
                </router-link>
            </div>

            <!-- Espace Club -->
            <div
                class="flex justify-center items-center border border-white rounded-lg p-4 hover:bg-gray-700 cursor-pointer">
                <router-link :to="{ name: 'Club' }" class="flex items-center gap-2">
                    <span class="text-white text-lg">Espace Club</span>
                    <img src="/src/assets/ballon-de-volley-ball.png" alt="Club" class="w-8 h-8 filter invert">
                </router-link>
            </div>
        </div>
    </div>
    <!-- Bouton retour en bas à gauche -->
    <router-link :to="{ name: 'Home' }"
        class="fixed bottom-30 left-15 flex items-center space-x-2 text-white hover:text-yellow-400 transition">
        <img src="/src/assets/undo.png" alt="Retour" class="w-6 h-6 filter invert" />
        <span>Retour</span>
    </router-link>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import { computed } from 'vue';
const authStore = useUserStore();
const user = computed(() => authStore.user);
</script>
<style></style>