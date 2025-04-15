<template>
    <div>
        <Header /> <!-- Affiche le Header sur toutes les pages -->
        <router-view /> <!-- Affiche le contenu des pages ici -->
        <AppFooter /> <!-- Affiche le Footer sur toutes les pages -->
    </div>
</template>

<script>
import AppFooter from "@/components/AppFooter.vue";
import Header from "@/components/Header.vue";

export default {
    components: {
        Header,
        AppFooter
    }
};
</script>
