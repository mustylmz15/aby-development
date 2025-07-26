<template>
  <div class="panel">
    <div class="flex items-center justify-between mb-5">
      <h5 class="font-semibold text-lg dark:text-white-light">Proje Bazlı Stok Dağılımı</h5>
    </div>
    <div class="relative">
      <!-- Pasta Grafik (Mock SVG) -->
      <div class="flex items-center justify-center h-64">
        <div class="relative w-48 h-48">
          <svg class="w-full h-full transform -rotate-90" viewBox="0 0 42 42">
            <template v-for="(item, idx) in activeProjects" :key="item.name">
              <circle
                cx="21" cy="21" r="15.915" fill="transparent"
                :stroke="item.color"
                stroke-width="3"
                :stroke-dasharray="item.percentage + ' ' + (100 - item.percentage)"
                :stroke-dashoffset="-activeProjects.slice(0, idx).reduce((acc, cur) => acc + cur.percentage, 0)"
              />
            </template>
          </svg>
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center">
              <p class="text-2xl font-bold">{{ totalValue }}</p>
              <p class="text-xs text-gray-500">Toplam Stok</p>
            </div>
          </div>
        </div>
      </div>
      <!-- Legend -->
      <div class="max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div class="space-y-2 mt-4 pr-2">
          <div v-for="item in chartData" :key="item.name" class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-3 h-3 rounded-full mr-2" :style="{ backgroundColor: item.color }"></div>
              <span class="text-sm">{{ item.name }}</span>
            </div>
            <span class="text-sm font-medium">{{ item.value }} adet ({{ item.percentage.toFixed(1) }}%)</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'

interface ProjectStock {
  name: string
  value: number
  color: string
}

const props = defineProps<{ projectStockDistribution: ProjectStock[] }>()

// Renk paleti (hex kodları)
const colorPalette = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16']

// Toplam değer hesaplama
const totalValue = computed(() => {
  return props.projectStockDistribution.reduce((acc, cur) => acc + cur.value, 0)
})

// Renk ve yüzdelik hesaplama (büyükten küçüğe sıralı)
const chartData = computed(() => {
  return props.projectStockDistribution
    .map((item, index) => ({
      ...item,
      color: colorPalette[index % colorPalette.length],
      percentage: totalValue.value > 0 ? (item.value / totalValue.value) * 100 : 0
    }))
    .sort((a, b) => b.value - a.value) // Büyükten küçüğe sırala
})

// Stoku olan projeler (computed chart data)
const activeProjects = computed(() => {
  return chartData.value.filter(item => item.value > 0)
})
</script>

<style scoped>
/* Custom scrollbar styles */
.scrollbar-thin {
  scrollbar-width: thin;
}

.scrollbar-thumb-gray-300::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thumb-gray-300::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.scrollbar-thumb-gray-300::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.scrollbar-thumb-gray-300::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Firefox scrollbar */
.scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 #f1f5f9;
}
</style>
