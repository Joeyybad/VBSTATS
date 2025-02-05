<template>
    <div>
        <main>
            <router-view /> <!-- Affiche le contenu des routes ici -->
        </main>
        <AppFooter /> <!-- Affiche le footer en dehors de router-view -->
    </div>
</template>

<script>
import AppFooter from "../components/AppFooter.vue";

export default {
    components: { AppFooter },
};
</script>