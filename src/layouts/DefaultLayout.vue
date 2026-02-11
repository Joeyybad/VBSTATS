<template>
  <div class="flex flex-col min-h-screen bg-slate-900 text-white">
    <Header />

    <main class="flex-1 pt-24 px-4 w-full max-w-lg mx-auto">
      <slot />
    </main>

    <AppFooter />

    <Navbar />

    <div class="h-32 w-full pr-ev-footer-gap"></div>
  </div>
</template>

<script>
import AppFooter from "@/components/AppFooter.vue";
import Header from "@/components/Header.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  components: {
    Header,
    AppFooter,
    Navbar,
  },
};
</script>
