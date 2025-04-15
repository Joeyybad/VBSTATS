<template>
    <main class="home-page px-4 sm:px-6 lg:px-8">
        <div class="flex justify-center items-center m-10">
            <img src="/src/assets/VBStats.png" alt="VBStatLogo" class="w-40 sm:w-48 md:w-56 lg:w-64" />
        </div>
        <div class="text-center space-y-4 mb-9 mx-5 max-w-3xl mx-auto">
            <p>
                VB Stats est une application qui vous permettra de digitaliser vos prises de notes lors de vos matchs
                volley et entraînement de volley. Vous pourrez également tirer des statistiques de ces derniers pour
                améliorer
                votre activité.
            </p>
            <p class="text-white">
                <router-link to="/inscription" class="text-white hover:text-yellow-400 transition-colors">
                    inscription
                </router-link>
                ou
                <router-link to="/connexion" class="text-white hover:text-yellow-400 transition-colors">
                    connexion
                </router-link>
            </p>
        </div>
    </main>
</template>

<script>
export default {
    name: 'Home',
    mounted() {
        console.log('Home.vue est bien monté');
    }
}
</script>