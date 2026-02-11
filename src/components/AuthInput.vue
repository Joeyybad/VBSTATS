<template>
  <div class="text-left w-full">
    <label :for="id" class="block text-sm font-medium text-slate-300 mb-1 ml-1">
      {{ label }}
    </label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all placeholder:text-slate-500"
      :class="{ 'border-yellow-600 ring-1 ring-yellow-600/20': error }"
      :placeholder="placeholder"
    />
    <p
      v-if="error"
      class="text-yellow-500 text-xs mt-1 ml-1 font-medium italic"
    >
      {{ error }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  modelValue: String,
  error: String,
  id: String,
  type: { type: String, default: "text" },
  placeholder: String,
});
defineEmits(["update:modelValue"]);
</script>
