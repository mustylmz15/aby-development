<template>
  <tr class="hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all duration-200" :class="index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50/50 dark:bg-gray-800/70'">
    <td class="px-6 py-4">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
          <i class="fa fa-hashtag text-green-600 dark:text-green-400 text-sm"></i>
        </div>
        <div>
          <div class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ item.transferNumber || item.id }}</div>
        </div>
      </div>
    </td>
    <td class="px-6 py-4">
      <div class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ item.productId || '-' }}</div>
    </td>
    <td class="px-6 py-4">
      <div class="text-sm font-medium text-gray-900 dark:text-gray-100">
        {{ typeof item.quantity === 'number' ? item.quantity : (parseInt(item.quantity) || 0) }}
      </div>
    </td>
    <td class="px-6 py-4">
      <MovementStatusBadge :status="item.status" />
    </td>
    <td class="px-6 py-4">
      <div class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ item.sourceWarehouse || '-' }}</div>
    </td>
    <td class="px-6 py-4">
      <div class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ item.targetWarehouse || '-' }}</div>
    </td>
    <td class="px-6 py-4">
      <div class="text-sm font-medium text-gray-900 dark:text-gray-100">
        {{ item.createdAt ? new Date(item.createdAt).toLocaleString() : '-' }}
      </div>
    </td>
    <td class="px-6 py-4">
      <div class="flex items-center justify-center gap-2">
        <button 
          @click="$emit('show-detail', item)"
          class="inline-flex items-center gap-1 rounded bg-blue-100 text-blue-700 px-2 py-1 text-xs font-medium hover:bg-blue-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <i class="fa fa-eye text-xs"></i>
          <span>Detay</span>
        </button>
      </div>
    </td>
  </tr>
</template>
<script setup lang="ts">
import MovementStatusBadge from './MovementStatusBadge.vue';

const props = defineProps<{ 
  item: any;
  index: number;
}>();

const emit = defineEmits(['show-detail']);
</script>
