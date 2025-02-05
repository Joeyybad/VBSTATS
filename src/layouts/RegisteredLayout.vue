<template>
    <div>
        <Header />
        <main>
            <router-view /> <!-- Affiche le contenu de la route -->
        </main>
        <Navbar />
    </div>
</template>

<script>
import Header from "../components/Header.vue";
import Navbar from "../components/Navbar.vue";

export default {
    components: { Navbar, Header }
};
</script>
