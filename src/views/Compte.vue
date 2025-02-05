<template>
    <div class="flex justify-center items-center min-h-screen">

        <div class="text-center p-6 w-full max-w-md">
            <h2 class="text-center text-2xl font-semibold text-white"> Compte </h2>
            <!-- Email Section -->
            <h3 class="text-1xl font-semibold text-white mb-2">
                {{ email ? email : "Email" }}
            </h3>
            <button @click="modifierEmail"
                class="border border-white rounded-lg p-4 w-full max-w-[200px] mx-auto mb-6 text-white hover:bg-gray-700 transition">
                Modifier
            </button>

            <!-- Mot de passe Section -->
            <h3 class="text-1xl font-semibold text-white mb-4">
                {{ password ? "********" : "Mot de passe" }}
            </h3>
            <button @click="modifierPassword"
                class="border border-white rounded-lg p-4 w-full max-w-[200px] mx-auto mb-6 text-white hover:bg-gray-700 transition">
                Modifier
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Compte",
    data() {
        return {
            email: "", // Mettre une valeur dynamique ici si besoin
            password: "" // Mettre une valeur dynamique ici si besoin
        };
    },
    methods: {
        modifierEmail() {
            console.log("Modifier l'email");
            // Ajouter ici la logique pour modifier l'email
        },
        modifierPassword() {
            console.log("Modifier le mot de passe");
            // Ajouter ici la logique pour modifier le mot de passe
        }
    }
};
</script>
