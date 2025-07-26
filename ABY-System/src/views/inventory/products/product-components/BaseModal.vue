<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-3xl relative animate-fadeIn">
      <button
        class="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white text-xl"
        @click="$emit('close')"
        aria-label="Kapat"
      >
        &times;
      </button>
      <div class="p-6">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ show: boolean }>();
defineEmits(['close']);
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fadeIn {
  animation: fadeIn 0.18s cubic-bezier(0.4,0,0.2,1);
}
</style>
