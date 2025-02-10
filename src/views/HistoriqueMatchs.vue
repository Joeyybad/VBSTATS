<template>
    <div class="flex justify-center items-center min-h-screen pt-20 pb-20">
        <div class="text-center p-6 w-full max-w-lg">
            <h2 class="text-2xl font-semibold text-white mb-6">Historique des Matchs</h2>

            <div v-if="club && club.games.length > 0" class="space-y-4">
                <ul>
                    <li v-for="game in club.games" :key="game.id"
                        class="flex justify-between items-center border border-white rounded-lg p-4 hover:bg-gray-700 cursor-pointer">

                        <!-- Infos Match -->
                        <div class="text-left">
                            <h3 class="text-white text-lg font-bold">{{ game.dom }} VS {{ game.ext }}</h3>
                            <span class="text-gray-400 text-sm italic">{{ formatDate(game.date) }}</span>
                        </div>

                        <!-- Résultat (cliquable pour voir les détails) -->
                        <router-link :to="{ name: 'MatchDetails', params: { id: game.id } }"
                            class="text-yellow-500 font-bold text-lg hover:underline">
                            {{ game.score }}
                        </router-link>
                    </li>
                </ul>
            </div>

            <!-- Message si aucun match n'est disponible -->
            <p v-else class="text-white text-sm">Aucun match trouvé.</p>
        </div>
    </div>
    <img src="/src/assets/annuler.png" alt="Retour"
        class="fixed bottom-16 left-4 w-8 h-8 filter invert cursor-pointer hover:scale-110 transition-transform duration-300 z-50">
</template>

<script>
export default {
    name: 'Historique',
    props: {
        club: Object // On suppose que les données du club sont passées en prop depuis le parent
    },
    methods: {
        formatDate(dateStr) {
            const date = new Date(dateStr);
            return date.toLocaleDateString("fr-FR", {
                weekday: 'short', year: 'numeric', month: 'long', day: 'numeric'
            });
        }
    }
};
</script>
