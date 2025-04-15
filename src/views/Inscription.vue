<template>
    <div class="flex justify-center items-center min-h-screen">
        <div class="text-center p-4 w-full max-w-md">
            <!-- Logo -->
            <img src="/Users/nkungajordan/Documents/VBSTATS/VBStatsVue/src/assets/VBStats.png" alt="logo"
                class="w-1/2 sm:w-1/5 md:w-1/4 lg:w-1/3 mx-auto mb-6">

            <!-- Texte + formulaire -->
            <div class="mb-8">
                <p>L'application incontournable pour votre club de volley</p>
                <h2 class="text-1xl font-semibold text-white mb-4 mt-5">Inscription</h2>
                <form class="space-y-2">
                    <div>
                        <label for="email" class="block text-sm font-medium text-white">Email</label>
                        <input type="email" id="email" name="email"
                            class="w-full px-4 py-2 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                        <label for="password" class="block text-sm font-medium text-white">Mot de passe</label>
                        <input type="password" id="password" name="password"
                            class="w-full px-4 py-2 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                        <label for="passwordConf" class="block text-sm font-medium text-white">Confirmation du mot de
                            passe</label>
                        <input type="password" id="passwordConf" name="passwordConf"
                            class="w-full px-4 py-2 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div class="text-center">
                        <button type="submit" class="px-6 py-2 text-white rounded-md hover:bg-yellow-600">
                            S'inscrire</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Inscription'
}
</script>