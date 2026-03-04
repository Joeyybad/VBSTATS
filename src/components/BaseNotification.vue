<template>
  <Transition name="toast">
    <div
      v-if="show"
      class="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-sm"
    >
      <div
        class="bg-slate-900 border backdrop-blur-md p-4 rounded-xl shadow-2xl flex items-center gap-4"
        :class="typeClasses"
      >
        <div class="p-2 rounded-full bg-white/5">
          <component :is="iconComponent" class="w-5 h-5" />
        </div>

        <div class="flex flex-col">
          <p class="text-sm font-bold text-white">{{ title }}</p>
          <p class="text-xs text-slate-400">{{ message }}</p>
        </div>

        <button
          @click="$emit('close')"
          class="ml-auto text-slate-500 hover:text-white transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  show: Boolean,
  title: String,
  message: String,
  type: {
    type: String,
    default: "success", // success, error, info
  },
});

defineEmits(["close"]);

// Gestion des styles selon le type
const typeClasses = computed(() => {
  return {
    "border-green-500/50 shadow-green-500/10": props.type === "success",
    "border-red-500/50 shadow-red-500/10": props.type === "error",
    "border-blue-500/50 shadow-blue-500/10": props.type === "info",
  };
});

// Icônes simples en SVG (ou utilise une lib d'icônes si tu en as une)
const iconComponent = computed(() => {
  if (props.type === "error") return "span"; // Tu peux mettre un SVG ici
  return "span";
});
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, -20px);
}
</style>
