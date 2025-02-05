<template>
    <div class="flex justify-center items-center min-h-screen pt-20 pb-20">
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
</template>


<script>
export default {
    name: 'Profil'
}
</script>