<template>
  <div class="panel">
    <div class="flex items-center justify-between mb-5">
      <h5 class="font-semibold text-lg dark:text-white-light">Kategori Bazlı Stoklar</h5>
    </div>
    <!-- Scroll container - maksimum yükseklik 300px -->
    <div class="space-y-3 max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
      <div v-for="(item, index) in enhancedCategoryStocks" :key="item.name" :class="`flex items-center justify-between p-3 bg-${item.color}/10 rounded-lg`">
        <div class="flex items-center">
          <div :class="`w-3 h-3 bg-${item.color} rounded-full mr-3`"></div>
          <span class="font-medium">{{ item.name }}</span>
        </div>
        <span :class="`font-bold text-${item.color}`">{{ item.count }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'

interface CategoryStock {
  name: string
  count: number
  color: string
}

const props = defineProps<{ categoryStocks: CategoryStock[] }>()

// Renk paleti
const colorPalette = ['primary', 'success', 'warning', 'info', 'secondary', 'danger']

// Kategorilere farklı renkler atayan computed
const enhancedCategoryStocks = computed(() => {
  return props.categoryStocks.map((item, index) => ({
    ...item,
    color: colorPalette[index % colorPalette.length]
  }))
})
</script>
