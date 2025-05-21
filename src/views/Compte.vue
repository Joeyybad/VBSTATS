<template>
    <div class="min-h-screen flex flex-col items-center bg-[#302F2F] px-4 py-16">
        <!-- Titre éloigné du haut -->
        <h2 class="text-4xl font-bold text-white mb-12 mt-8">Compte</h2>

        <!-- Bloc infos avec fond gris transparent -->
        <div class="text-center p-6 w-full max-w-md rounded-lg shadow-lg  border bg-opacity-60 backdrop-blur-sm">
            <!-- Email Section -->
            <h3 class="text-lg font-semibold text-white mb-2">
                {{ user?.email }}
            </h3>
            <!-- Prénom Section -->
            <h3 class="text-lg font-semibold text-white mb-2">
                {{ user?.firstname }}
            </h3>
            <!-- Nom Section -->
            <h3 class="text-lg font-semibold text-white mb-6">
                {{ user?.lastname }}
            </h3>
            <router-link :to="{ name: 'EditProfil' }"
                class="px-6 py-2 text-white rounded-md bg-yellow-600 hover:bg-green-700 transition duration-200">
                <button> Modifier</button>

            </router-link>

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
const authStore = useUserStore();
const user = authStore.user;
</script>

<style></style>