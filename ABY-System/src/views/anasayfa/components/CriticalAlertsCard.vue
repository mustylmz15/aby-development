<template>
  <div class="panel">
    <div class="flex items-center justify-between mb-5">
      <h5 class="font-semibold text-lg dark:text-white-light">Kritik Stok Uyarıları</h5>
    </div>
    <!-- Scroll container - maksimum yükseklik 300px -->
    <div class="space-y-4 max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
      <div v-for="item in criticalAlerts" :key="item.product" :class="`flex items-center justify-between p-3 border-l-4 border-${item.level} bg-${item.level}/5 rounded`">
        <div>
          <p :class="`font-semibold text-${item.level}`">{{ item.product }}</p>
          <p class="text-xs text-gray-500">{{ item.warehouse }}</p>
        </div>
        <div class="text-right">
          <p :class="`font-bold text-${item.level}`">{{ item.current }}</p>
          <p class="text-xs text-gray-500">Min: {{ item.minimum }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{ criticalAlerts: Array<{ product: string, warehouse: string, current: number, minimum: number, level: string }> }>()
</script>
