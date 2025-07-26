<template>
  <tr :class="[
    index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50/50 dark:bg-gray-800/70',
    'hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all duration-200'
  ]">
    <td class="px-6 py-4">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
          <i class="fa fa-warehouse text-blue-600 dark:text-blue-400 text-sm"></i>
        </div>
        <div>
          <div class="text-sm font-medium text-gray-900 dark:text-gray-100">
            {{ warehouse.name }}
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400">{{ warehouse.description || 'Depo açıklaması' }}</div>
        </div>
      </div>
    </td>
    <td class="px-6 py-4">
      <WarehouseStatusBadge :status="warehouse.status || (warehouse.is_active ? 'active' : 'inactive')" />
    </td>
    <td class="px-6 py-4">
      <div class="flex items-center justify-center gap-2">
        <button 
          class="inline-flex items-center gap-1 rounded bg-blue-100 text-blue-700 px-2 py-1 text-xs font-medium hover:bg-blue-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400" 
          @click="$emit('select', warehouse)"
        >
          <i class="fa fa-eye text-xs"></i>
          <span>Detay</span>
        </button>
        <button 
          class="inline-flex items-center gap-1 rounded bg-amber-100 text-amber-700 px-2 py-1 text-xs font-medium hover:bg-amber-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400" 
          @click="$emit('edit', warehouse)"
        >
          <i class="fa fa-edit text-xs"></i>
          <span>Düzenle</span>
        </button>
        <button 
          class="inline-flex items-center gap-1 rounded bg-red-100 text-red-700 px-2 py-1 text-xs font-medium hover:bg-red-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400" 
          @click="$emit('delete', warehouse)"
        >
          <i class="fa fa-trash text-xs"></i>
          <span>Sil</span>
        </button>
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
import WarehouseStatusBadge from './WarehouseStatusBadge.vue';
import type { Warehouse } from './types';

const props = defineProps<{ 
  warehouse: Warehouse; 
  index: number; 
}>();
</script>
