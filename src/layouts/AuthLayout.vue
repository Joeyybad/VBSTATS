<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-900 px-4">
    <div class="w-full max-w-md text-center">
      <img src="@/assets/VBStats.png" class="w-24 mx-auto mb-6" />

      <div
        class="bg-slate-800 p-8 rounded-2xl shadow-2xl border border-white/10"
      >
        <h2 class="text-2xl font-bold text-white mb-2">{{ title }}</h2>
        <p class="text-slate-400 text-sm mb-6">{{ subtitle }}</p>

        <form @submit.prevent="$emit('submit')" class="space-y-4">
          <slot name="fields" />

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-yellow-500 py-3 rounded-lg font-bold text-slate-900"
          >
            <span v-if="loading">Chargement...</span>
            <slot v-else name="button-text">{{ buttonText }}</slot>
          </button>
        </form>

        <div class="mt-6 text-sm">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(["title", "subtitle", "buttonText", "loading"]);
defineEmits(["submit"]);
</script>
