<template>
  <span :class="badgeClass">
    <i :class="iconClass"></i>
    <span>{{ label }}</span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{ status: string }>();

const badgeClass = computed(() => {
  switch (props.status) {
    case 'active':
    case 'AKTIF':
      return 'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    case 'inactive':
    case 'PASIF':
      return 'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
    case 'maintenance':
    case 'BAKIM':
      return 'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
    case 'pending':
    case 'BEKLIYOR':
      return 'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
    default:
      return 'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
  }
});

const iconClass = computed(() => {
  switch (props.status) {
    case 'active':
    case 'AKTIF':
      return 'fa fa-check-circle';
    case 'inactive':
    case 'PASIF':
      return 'fa fa-times-circle';
    case 'maintenance':
    case 'BAKIM':
      return 'fa fa-wrench';
    case 'pending':
    case 'BEKLIYOR':
      return 'fa fa-clock';
    default:
      return 'fa fa-info-circle';
  }
});

const label = computed(() => {
  switch (props.status) {
    case 'active':
    case 'AKTIF':
      return 'Aktif';
    case 'inactive':
    case 'PASIF':
      return 'Pasif';
    case 'maintenance':
    case 'BAKIM':
      return 'Bakım';
    case 'pending':
    case 'BEKLIYOR':
      return 'Bekliyor';
    default:
      return props.status;
  }
});
</script>
