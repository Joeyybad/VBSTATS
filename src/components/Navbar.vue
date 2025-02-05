<script setup lang="ts">
import { RouterLink } from 'vue-router';

</script>

<template>
    <footer class="fixed bottom-0 bg-gray-800/50 backdrop-blur-lg py-4 left-0 w-full text-white py-4">
        <div class="grid grid-cols-3 items-center text-center gap-x-4 md:gap-x-20">
            <!-- Lien 1 (Gauche) -->
            <div class="flex justify-start items-center pl-4">
                <router-link :to="{ name: 'Profil' }"><img src="/src/assets/profil.png" alt="Profil"
                        class="w-10 h-auto filter invert hover:scale-110 transition-transform duration-300 cursor-pointer"></router-link>
            </div>

            <!-- Lien 2 (Centre) -->
            <div class="flex justify-center items-center">

                <router-link :to="{ name: 'Club' }"><img src="/src/assets/ballon-de-volley-ball.png" alt="Club"
                        class="w-10 h-auto filter invert hover:scale-110 transition-transform duration-300 cursor-pointer">
                </router-link>
            </div>

            <!-- Lien 3 (Droite) -->

            <div class="flex justify-end items-center pr-4">

                <img src="/src/assets/volley-ball.png" alt="Match"
                    class="w-10 h-auto filter invert hover:scale-110 transition-transform duration-300 cursor-pointer">

            </div>
        </div>
    </footer>
</template>
