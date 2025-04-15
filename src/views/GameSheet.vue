<template>
    <div class="text-center py-10 pb-20">
        <h2 class="mb-5 text-xl font-bold">Feuille de match</h2>

        <!-- Grille principale : Joueurs disponibles + Infos match -->
        <div class="grid grid-cols-2 gap-8 pt-8">
            <!-- Colonne gauche : Joueurs disponibles -->
            <div class=" border border-white bg-gray-800/50 backdrop-blur-lg p-6 rounded-lg shadow-lg">
                <h3 class="text-lg font-semibold text-white mb-4">Joueurs disponibles</h3>
                <ul>
                    <li v-for="player in availablePlayers" :key="player.id"
                        class="flex items-center justify-between text-white text-sm py-2 border-b border-gray-600">
                        <span>{{ player.name }}</span>
                        <!-- Cacher le bouton si le joueur est déjà dans l'équipe ou remplaçant -->
                        <button v-if="!player.isInTeam && !player.isSubstitute" @click="addToTeam(player)"
                            class="px-2 py-1 text-sm bg-green-500 rounded hover:bg-green-600 transition">
                            +
                        </button>
                    </li>
                </ul>

            </div>

            <!-- Colonne droite : Informations du match -->
            <div class=" border border-white bg-gray-800/50 backdrop-blur-lg p-6 rounded-lg shadow-lg">
                <h3 class="text-lg font-semibold text-white mb-4">Informations du match</h3>
                <div class="space-y-3">
                    <div>
                        <label class="block text-sm font-medium text-white">Équipe adverse</label>
                        <input v-model="match.opponent" type="text"
                            class="w-full px-3 py-2 bg-gray-700 border border-gray-500 rounded-md text-white">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-white">Lieu</label>
                        <input v-model="match.location" type="text"
                            class="w-full px-3 py-2 bg-gray-700 border border-gray-500 rounded-md text-white">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-white">Date</label>
                        <input v-model="match.date" type="date"
                            class="w-full px-3 py-2 bg-gray-700 border border-gray-500 rounded-md text-white">
                    </div>
                </div>
            </div>
        </div>

        <!-- Terrain de volley + Remplaçants -->
        <div class="mt-5 flex justify-center items-start relative">
            <!-- Terrain -->
            <div class="relative terrain border-4 border-white w-[400px] h-[250px] flex items-center justify-center">
                <!-- Ligne des 5 mètres (verticale) -->
                <div class="absolute left-1/2 top-0 h-full border-l-2 border-white"></div>


                <!-- Joueurs sur le terrain -->
                <div v-for="(player, index) in team" :key="player.id"
                    :style="{ top: player.position.top, left: player.position.left }"
                    class="absolute w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs cursor-pointer group"
                    @click="selectPlayerToReplace(player)"
                    :class="{ 'ring-4 ring-yellow-400': selectedPlayerToReplace && selectedPlayerToReplace.id === player.id }">

                    {{ player.number }}
                    <div
                        class="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition">
                        {{ player.name }}
                    </div>
                </div>
            </div>
            <!-- Remplaçants (à droite du terrain) -->
            <div v-if="substitutes.length > 0" class="ml-6 bg-gray-800 p-4 rounded-lg shadow-lg w-40">
                <h3 class="text-lg font-semibold text-white mb-3">Remplaçants</h3>
                <ul>
                    <li v-for="player in substitutes" :key="player.id"
                        class="flex items-center justify-between text-white text-sm py-2 border-b border-gray-600">
                        <span>{{ player.name }}</span>
                        <button @click="replacePlayer(player)"
                            class="px-2 py-1 text-sm bg-blue-500 rounded hover:bg-blue-600 transition">↩</button>
                    </li>
                </ul>
            </div>
        </div>
        <button @click="validateAndRedirect"
            class="mt-6 px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition">
            Valider et commencer le match
        </button>

    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';

// Simulation de chargement depuis une base de données
const allPlayers = ref([]);
const loadPlayersFromDB = () => {
    allPlayers.value = [
        { id: 1, name: "Joueur 1", number: 1 },
        { id: 2, name: "Joueur 2", number: 2 },
        { id: 3, name: "Joueur 3", number: 3 },
        { id: 4, name: "Joueur 4", number: 4 },
        { id: 5, name: "Joueur 5", number: 5 },
        { id: 6, name: "Joueur 6", number: 6 },
        { id: 7, name: "Joueur 7", number: 7 },
        { id: 8, name: "Joueur 8", number: 8 },
    ];
};
onMounted(loadPlayersFromDB);

// Joueurs disponibles et remplaçants
const team = ref([]);
const substitutes = ref([]);
const match = ref({
    opponent: "",
    location: "",
    date: "",
});

// Calcul des joueurs encore disponibles
const availablePlayers = computed(() =>
    allPlayers.value.map(player => ({
        ...player,
        isInTeam: team.value.some(p => p.id === player.id),
        isSubstitute: substitutes.value.some(p => p.id === player.id),
    }))
);

const isInTeam = (player) => {
    return team.value.some(p => p.id === player.id);
};

// Ajouter un joueur sur le terrain (max 6)
const addToTeam = (player) => {
    // Vérifier si le joueur est déjà dans l'équipe
    const alreadyInTeam = team.value.some(p => p.id === player.id);
    if (alreadyInTeam) return; // On arrête la fonction si le joueur est déjà présent

    if (team.value.length < 6) {
        team.value.push({
            ...player,
            position: getInitialPosition(team.value.length)
        });
    } else {
        substitutes.value.push(player);
    }
};

// Retirer un joueur du terrain (devient remplaçant)
const removeFromTeam = (player) => {
    team.value = team.value.filter(p => p.id !== player.id);
    substitutes.value.push(player);
};

const selectedPlayerToReplace = ref(null);
const selectPlayerToReplace = (player) => {
    selectedPlayerToReplace.value = player;
};

const replacePlayer = (sub) => {
    if (!selectedPlayerToReplace.value) {
        alert("Cliquez d'abord sur un joueur à remplacer !");
        return;
    }

    const index = team.value.findIndex(p => p.id === selectedPlayerToReplace.value.id);
    if (index !== -1) {
        const savedPosition = selectedPlayerToReplace.value.position;

        substitutes.value.push(selectedPlayerToReplace.value);
        team.value[index] = {
            ...sub,
            position: savedPosition
        };

        substitutes.value = substitutes.value.filter(p => p.id !== sub.id);
    }

    selectedPlayerToReplace.value = null;
};




// Positionnement initial des joueurs
const getInitialPosition = (index) => {
    const positions = [
        { top: "20%", left: "25%" },
        { top: "20%", left: "75%" },
        { top: "50%", left: "25%" },
        { top: "50%", left: "75%" },
        { top: "80%", left: "25%" },
        { top: "80%", left: "75%" },
    ];
    return positions[index] || { top: "50%", left: "50%" };
};

// Drag & Drop
const dragStart = (event, player) => {
    event.dataTransfer.setData("playerId", player.id);
};
const drop = (event, player) => {
    const playerId = event.dataTransfer.getData("playerId");
    const movingPlayer = team.value.find(p => p.id == playerId);
    if (movingPlayer) {
        movingPlayer.position = { top: event.offsetY + "px", left: event.offsetX + "px" };
    }
};
</script>

<style>
.terrain {
    background-color: #F7AB64;
}
</style>
