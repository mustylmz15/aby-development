<template>
  <span :class="statusClasses" class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold">
    <i :class="statusIcon"></i>
    <span>{{ statusText }}</span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  status: string;
}>();

const statusText = computed(() => {
  switch (props.status?.toLowerCase()) {
    case 'pending':
    case 'beklemede':
      return 'Beklemede';
    case 'approved':
    case 'onaylandi':
      return 'Onaylandı';
    case 'rejected':
    case 'reddedildi':
      return 'Reddedildi';
    case 'completed':
    case 'tamamlandi':
      return 'Tamamlandı';
    case 'cancelled':
    case 'iptal':
      return 'İptal';
    case 'transfer':
      return 'Transfer';
    case 'giris':
      return 'Giriş';
    case 'cikis':
      return 'Çıkış';
    default:
      return props.status || 'Bilinmiyor';
  }
});

const statusIcon = computed(() => {
  switch (props.status?.toLowerCase()) {
    case 'pending':
    case 'beklemede':
      return 'fa fa-clock';
    case 'approved':
    case 'onaylandi':
      return 'fa fa-check';
    case 'rejected':
    case 'reddedildi':
      return 'fa fa-times';
    case 'completed':
    case 'tamamlandi':
      return 'fa fa-check-circle';
    case 'cancelled':
    case 'iptal':
      return 'fa fa-ban';
    case 'transfer':
      return 'fa fa-exchange-alt';
    case 'giris':
      return 'fa fa-arrow-down';
    case 'cikis':
      return 'fa fa-arrow-up';
    default:
      return 'fa fa-question';
  }
});

const statusClasses = computed(() => {
  switch (props.status?.toLowerCase()) {
    case 'pending':
    case 'beklemede':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
    case 'approved':
    case 'onaylandi':
    case 'completed':
    case 'tamamlandi':
      return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    case 'rejected':
    case 'reddedildi':
    case 'cancelled':
    case 'iptal':
      return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
    case 'transfer':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
    case 'giris':
      return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400';
    case 'cikis':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  }
});
</script>
