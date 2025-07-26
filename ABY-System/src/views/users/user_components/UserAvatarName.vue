<template>
  <div class="flex items-center">
    <div class="flex-shrink-0 w-12 h-12">
      <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
        <span class="text-white font-bold text-lg">{{ initials }}</span>
      </div>
    </div>
    <div class="ml-4">
      <div class="text-sm font-semibold text-gray-900">{{ name }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ name: string }>();
const initials = props.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0,2);
</script>
