<template>
  <div
    class="bg-gray-800/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl transition-all duration-500 hover:border-white/20"
  >
    <div v-if="$slots.header" class="mb-6">
      <slot name="header"></slot>
    </div>

    <slot></slot>

    <div v-if="$slots.footer" class="mt-8 pt-6 border-t border-white/5">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup></script>
