<template>
    <header
        :class="['fixed top-0 left-0 w-full text-white py-4 transition-opacity duration-300', isHidden ? 'opacity-0' : 'opacity-100']">
        <div class="grid grid-cols-1 gap-x-4 md:gap-x-20">
            <!-- Logo -->
            <div class="flex justify-start items-center pl-4">
                <router-link :to="{ name: 'Connexion' }">
                    <img src="/src/assets/VBStats.png" alt="VBStatLogo"
                        class="w-20 h-auto hover:scale-110 transition-transform duration-300 cursor-pointer">
                </router-link>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    data() {
        return {
            isHidden: false,
            lastScrollY: 0
        };
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll);
    },
    beforeUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    },
    methods: {
        handleScroll() {
            const currentScrollY = window.scrollY;
            this.isHidden = currentScrollY > this.lastScrollY;
            this.lastScrollY = currentScrollY;
        }
    }
};
</script>