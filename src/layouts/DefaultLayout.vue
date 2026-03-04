<template>
  <div class="flex flex-col min-h-screen bg-slate-900 text-white">
    <Header />

    <main class="flex-1 pt-24 px-4 w-full max-w-7xl mx-auto">
      <router-view />
    </main>

    <AppFooter class="hidden md:block" />

    <Navbar class="z-[999]" />

    <div class="h-24 md:hidden"></div>
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import AppFooter from "@/components/AppFooter.vue";
import Navbar from "@/components/Navbar.vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
</script>
