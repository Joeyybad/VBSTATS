<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      <div
        class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        @click="$emit('close')"
      ></div>

      <div
        class="relative bg-slate-900 border border-white/10 p-8 rounded-3xl shadow-2xl max-w-sm w-full space-y-6 animate-in zoom-in duration-300"
      >
        <div class="flex flex-col items-center text-center space-y-4">
          <div
            :class="[
              'p-4 rounded-full',
              type === 'danger'
                ? 'bg-red-500/10 text-red-500'
                : 'bg-yellow-500/10 text-yellow-500',
            ]"
          >
            <slot name="icon"></slot>
          </div>

          <h3 class="text-xl font-bold text-white">{{ title }}</h3>
          <p class="text-slate-400 text-sm">
            <slot name="message"></slot>
          </p>
        </div>

        <div class="flex gap-3">
          <slot name="actions"></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({
  show: Boolean,
  title: String,
  type: {
    type: String,
    default: "info",
  },
});

defineEmits(["close"]);
</script>
