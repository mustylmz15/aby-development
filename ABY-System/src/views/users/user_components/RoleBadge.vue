<template>
  <span :class="badgeClass">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{ color?: string }>();
const badgeClass = computed(() =>
  props.color || 'inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold shadow-sm transition-all duration-200 hover:shadow-md bg-gradient-to-r from-blue-500 to-blue-600 text-white border border-blue-400/30'
);
</script>
