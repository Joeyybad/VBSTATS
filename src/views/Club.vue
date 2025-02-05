<template>
    <div class="flex justify-center items-center min-h-screen pt-20 pb-20">
        <div class="text-center p-6 w-full max-w-md">
            <h2 class="text-3xl font-bold text-white mb-6">Club</h2>

            <!-- Affichage du nom et du logo si un club existe -->
            <div v-if="club">
                <img :src="club.logo" alt="Logo du club" class="w-20 h-20 mx-auto mb-4 rounded-full">

                <!-- Nom du club avec icône Modifier -->
                <div class="flex items-center justify-center gap-2">
                    <h3 class="text-2xl font-semibold text-white">{{ club.nom }}</h3>
                    <img @click="modifierClub" src="/src/assets/edition.png" alt="Modifier"
                        class="w-6 h-6 cursor-pointer hover:scale-110 transition filter invert">
                </div>
            </div>

            <!-- Si aucun club n'est défini, afficher "Ajouter Club" avec icône -->
            <div v-else>
                <div class="flex items-center justify-center gap-2">
                    <h3 class="text-2xl font-semibold text-white">Ajouter un club</h3>
                    <img @click="ajouterClub" src="/src/assets/plus.png" alt="Ajouter"
                        class="w-6 h-6 cursor-pointer hover:scale-110 transition filter invert">
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: "Compte",
    data() {
        return {
            club: null // Si null => pas de club, sinon { nom: 'Nom du Club', logo: 'url_du_logo' }
        };
    },
    methods: {
        ajouterClub() {
            console.log("Ajout d'un club...");
            // Logique pour ajouter un club
            this.club = { nom: "Mon Club", logo: "/src/assets/mon-club-logo.png" };
        },
        modifierClub() {
            console.log("Modification du club...");
            // Logique pour modifier un club
        }
    }
};
</script>
