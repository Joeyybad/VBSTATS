<template>
    <div class="text-center py-30">
        <h2 class="mb-5 text-xl font-bold">{{ match.homeTeam }} vs {{ match.awayTeam }}</h2>

        <div class="grid grid-cols-4 text-center gap-x-4 md:gap-x-20">
            <!-- Joueurs ayant participé -->
            <div>
                <h3 class="font-semibold mb-2">Joueurs</h3>
                <ul>
                    <li v-for="player in match.players" :key="player.id"
                        class="text-sm cursor-pointer text-blue-400 hover:underline" @click="openPlayerStats(player)">
                        {{ player.name }}
                    </li>
                </ul>
            </div>

            <!-- Gestes techniques réussis/tentés -->
            <div>
                <h3 class="font-semibold mb-2">Gestes techniques</h3>
                <ul>
                    <li v-for="(value, key) in match.moves" :key="key" class="text-sm">
                        {{ key }} : {{ value.success }}/{{ value.attempts }}
                    </li>
                </ul>
            </div>

            <!-- Situations favorables -->
            <div>
                <h3 class="font-semibold mb-2">Situations favorables</h3>
                <ul>
                    <li v-for="(value, key) in match.favorableSituations" :key="key" class="text-sm">
                        {{ key }} : {{ value.success }}/{{ value.attempts }}
                    </li>
                </ul>
            </div>

            <!-- Points marqués -->
            <div>
                <h3 class="font-semibold mb-2">Points marqués</h3>
                <p class="text-lg font-bold">{{ match.points }}</p>
            </div>
        </div>

        <!-- Pop-up des stats du joueur -->
        <div v-if="selectedPlayer" class="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md">
            <div class="bg-white p-6 rounded-lg shadow-lg w-96 text-black">
                <h3 class="text-lg font-bold mb-4">Stats de {{ selectedPlayer.name }}</h3>
                <ul>
                    <li v-for="(value, key) in selectedPlayer.stats" :key="key" class="text-sm">
                        {{ key }} : {{ value.success }}/{{ value.attempts }}
                    </li>
                </ul>
                <button @click="closePlayerStats"
                    class="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                    Fermer
                </button>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue';

// Simulation des données récupérées de la base de données
const match = ref({
    homeTeam: "Équipe A",
    awayTeam: "Équipe B",
    players: [
        { id: 1, name: "Joueur 1", stats: { "Attaques": { success: 5, attempts: 10 }, "Passes": { success: 8, attempts: 15 } } },
        { id: 2, name: "Joueur 2", stats: { "Réceptions": { success: 3, attempts: 7 }, "Contres": { success: 2, attempts: 5 } } },
        { id: 3, name: "Joueur 3", stats: { "Services": { success: 4, attempts: 9 }, "Passes": { success: 6, attempts: 12 } } },
    ],
    moves: {
        "Attaques": { success: 10, attempts: 25 },
        "Passes": { success: 15, attempts: 30 },
        "Réceptions": { success: 8, attempts: 20 },
        "Contres": { success: 5, attempts: 15 },
        "Services": { success: 12, attempts: 28 },
    },
    favorableSituations: {
        "Attaques": { success: 6, attempts: 12 },
        "Passes": { success: 10, attempts: 22 },
        "Réceptions": { success: 4, attempts: 10 },
    },
    points: 25,
});

// Gestion de la pop-up
const selectedPlayer = ref(null);

const openPlayerStats = (player) => {
    selectedPlayer.value = player;
};

const closePlayerStats = () => {
    selectedPlayer.value = null;
};
</script>
