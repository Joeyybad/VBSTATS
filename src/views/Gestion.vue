<template>
    <div class="flex justify-center items-center min-h-screen pt-20 pb-20">
        <div class="text-center p-6 w-full max-w-lg rounded-lg shadow-lg">

            <!-- Logo du club -->
            <div v-if="club">
                <img :src="club.logo" alt="Logo du club" class="w-20 h-20 mx-auto mb-2 rounded-full">
            </div>

            <!-- Formulaire de gestion -->
            <div>
                <h2 class="text-lg font-semibold text-white mb-4">Gestion du Club</h2>
                <form class="space-y-3" @submit.prevent="submitForm">
                    <div class="flex items-center gap-4">
                        <label for="name" class="text-sm font-medium text-white w-24 text-right">Nom :</label>
                        <input type="text" id="name" v-model="clubName"
                            class="flex-1 px-4 py-2 border border-white rounded-md bg-gray-700 text-white text-sm">
                    </div>
                    <div class="flex items-center gap-4">
                        <label for="city" class="text-sm font-medium text-white w-24 text-right">Localité :</label>
                        <input type="text" id="city" v-model="city"
                            class="flex-1 px-4 py-2 border border-white rounded-md bg-gray-700 text-white text-sm">
                    </div>
                    <div class="flex items-center gap-4">
                        <label for="coach" class="text-sm font-medium text-white w-24 text-right">Coach :</label>
                        <input type="text" id="coach" v-model="coach"
                            class="flex-1 px-4 py-2 border border-white rounded-md bg-gray-700 text-white text-sm">
                    </div>

                    <!-- Bouton aligné à droite -->
                    <div class="flex justify-end">
                        <button type="submit"
                            class="px-4 w-30 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 transition">
                            Valider
                        </button>
                    </div>
                </form>
            </div>

            <!-- Formulaire d'ajout de joueur -->
            <div class="mt-6">
                <h2 class="text-lg font-semibold text-white mb-3">Ajouter un joueur</h2>
                <form class="space-y-2" @submit.prevent="addPlayer">
                    <div class="flex items-center gap-4">
                        <label class="text-sm font-medium text-white w-24 text-right">Nom :</label>
                        <input type="text" v-model="newPlayer.name"
                            class="flex-1 px-4 py-2 border border-white rounded-md bg-gray-700 text-white text-sm">
                    </div>
                    <div class="flex items-center gap-4">
                        <label class="text-sm font-medium text-white w-24 text-right">Position :</label>
                        <input type="text" v-model="newPlayer.role"
                            class="flex-1 px-4 py-2 border border-white rounded-md bg-gray-700 text-white text-sm">
                    </div>
                    <div class="flex items-center gap-4">
                        <label class="text-sm font-medium text-white w-24 text-right">Photo :</label>
                        <input type="text" v-model="newPlayer.photo"
                            class="flex-1 px-4 py-2 border border-white rounded-md bg-gray-700 text-white text-sm">
                    </div>
                    <div class="flex justify-end">
                        <button type="submit"
                            class="w-30 px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 transition">
                            Ajouter
                        </button>
                    </div>
                </form>
            </div>

            <!-- Liste des joueurs (overflow activé uniquement ici) -->
            <div v-if="club && club.players.length"
                class="mt-6 max-h-60 overflow-auto border border-white rounded-lg p-3">
                <h2 class="text-lg font-semibold text-white mb-3">Joueurs</h2>
                <ul class="space-y-2">
                    <li v-for="player in club.players" :key="player.id"
                        class="flex items-center justify-between bg-gray-700 text-white px-4 py-2 rounded-md text-sm">
                        <div class="flex items-center space-x-3">
                            <img :src="player.photo" alt="Joueur" class="w-10 h-10 rounded-full">
                            <span>{{ player.name }} - {{ player.role }}</span>
                        </div>
                        <button @click="removePlayer(player.id)"
                            class="text-red-500 hover:text-red-700 text-sm font-bold">
                            ✖
                        </button>
                    </li>
                </ul>
            </div>

            <!-- Message si aucun joueur n'est ajouté -->
            <div v-else class="mt-6">
                <p class="text-white text-sm">Aucun joueur ajouté pour l'instant.</p>
            </div>
        </div>
    </div>

    <img src="/src/assets/annuler.png" alt="Retour"
        class="fixed bottom-16 left-4 w-8 h-8 filter invert cursor-pointer hover:scale-110 transition-transform duration-300 z-50">

</template>

<script>
export default {
    name: 'Gestion',
    data() {
        return {
            club: {
                logo: "https://via.placeholder.com/150",
                players: [
                    { id: 1, name: "Joueur 1", role: "Attaquant", photo: "https://via.placeholder.com/50" },
                    { id: 2, name: "Joueur 2", role: "Défenseur", photo: "https://via.placeholder.com/50" }
                ]
            },
            clubName: '',
            city: '',
            coach: '',
            newPlayer: { name: '', role: '', photo: '' }
        };
    },
    methods: {
        submitForm() {
            console.log("Formulaire soumis avec :", {
                clubName: this.clubName,
                city: this.city,
                coach: this.coach
            });
        },
        addPlayer() {
            if (!this.newPlayer.name.trim() || !this.newPlayer.role.trim()) {
                alert("Veuillez remplir le nom et la position du joueur.");
                return;
            }

            const newId = this.club.players.length
                ? Math.max(...this.club.players.map(p => p.id)) + 1
                : 1;

            this.club.players.push({
                id: newId,
                name: this.newPlayer.name,
                role: this.newPlayer.role,
                photo: this.newPlayer.photo || "https://via.placeholder.com/50"
            });

            this.newPlayer = { name: '', role: '', photo: '' };
        },
        removePlayer(id) {
            this.club.players = this.club.players.filter(player => player.id !== id);
        }
    }
};
</script>
