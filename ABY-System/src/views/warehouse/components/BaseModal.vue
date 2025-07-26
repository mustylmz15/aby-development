<template>
  <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-lg p-6 relative">
      <button class="absolute top-2 right-2 text-gray-400 hover:text-gray-700" @click="$emit('update:modelValue', false)">
        <span class="text-2xl">&times;</span>
      </button>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ modelValue: boolean }>()
defineEmits(['update:modelValue'])
</script>

<style scoped>
.fixed {
  backdrop-filter: blur(2px);
}
</style>
