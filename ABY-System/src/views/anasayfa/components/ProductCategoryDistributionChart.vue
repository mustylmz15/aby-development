<template>
  <div class="panel">
    <div class="flex items-center justify-between mb-5">
      <h5 class="font-semibold text-lg dark:text-white-light">Ürün Kategorisi Dağılımı</h5>
    </div>
    <div class="relative">
      <!-- Pasta Grafik (Mock SVG) -->
      <div class="flex items-center justify-center h-64">
        <div class="relative w-48 h-48">
          <svg class="w-full h-full transform -rotate-90" viewBox="0 0 42 42">
            <template v-for="(item, idx) in chartData" :key="item.name">
              <circle
                cx="21" cy="21" r="15.915" fill="transparent"
                :stroke="item.color"
                stroke-width="3"
                :stroke-dasharray="item.percentage + ' ' + (100 - item.percentage)"
                :stroke-dashoffset="-chartData.slice(0, idx).reduce((acc, cur) => acc + cur.percentage, 0)"
              />
            </template>
          </svg>
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center">
              <p class="text-2xl font-bold">{{ totalValue }}</p>
              <p class="text-xs text-gray-500">Toplam Ürün</p>
            </div>
          </div>
        </div>
      </div>
      <!-- Legend -->
      <div class="max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div class="space-y-2 mt-4 pr-2">
          <!-- Ana kategoriler (pasta grafikte gösterilen) -->
          <div v-for="item in chartData" :key="item.name" class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-3 h-3 rounded-full mr-2" :style="{ backgroundColor: item.color }"></div>
              <span class="text-sm font-medium">{{ item.name }}</span>
            </div>
            <span class="text-sm font-medium">{{ item.value }} adet ({{ item.percentage.toFixed(1) }}%)</span>
          </div>

          <!-- Ayırıcı çizgi (Alt Parçalar kategorisi varsa) -->
          <div v-if="processedData.excludedCategories.length > 0" class="border-t border-gray-200 my-3"></div>

          <!-- Kapsam dışı kategoriler (pasta grafikte gösterilmeyen) -->
          <div v-for="item in processedData.excludedCategories" :key="'excluded-' + item.name" class="flex items-center justify-between opacity-85">
            <div class="flex items-center">
              <div class="w-2 h-2 rounded-full mr-2 bg-gray-500"></div>
              <span class="text-sm text-gray-700 dark:text-gray-300">{{ item.name }}</span>
            </div>
            <span class="text-sm text-gray-700 dark:text-gray-300">{{ item.value }} adet ({{ item.percentage.toFixed(1) }}%)</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'

interface ProductCategory {
  name: string
  value: number
  color: string
}

const props = defineProps<{ productCategoryDistribution: ProductCategory[] }>()

// Renk paleti (hex kodları)
const colorPalette = ['#8b5cf6', '#06b6d4', '#84cc16', '#f59e0b', '#ef4444', '#6366f1', '#ec4899']

// Toplam değer hesaplama
const totalValue = computed(() => {
  return props.productCategoryDistribution.reduce((acc, cur) => acc + cur.value, 0)
})

// Ana kategoriler (pasta grafikte gösterilecek) ve kapsam dışı kategoriler
const processedData = computed(() => {
  const sortedData = props.productCategoryDistribution
    .sort((a, b) => b.value - a.value)

  // "Alt Parçalar" kategorisini kapsam dışında tut
  const mainCategories = sortedData.filter(item => item.name !== 'Alt Parçalar')
  const excludedCategories = sortedData.filter(item => item.name === 'Alt Parçalar')

  // Ana kategorilerin toplam değeri (pasta grafik için)
  const mainCategoriesTotal = mainCategories.reduce((acc, cur) => acc + cur.value, 0)

  // Ana kategoriler için yüzdelik hesaplama (sadece ana kategoriler toplamına göre)
  const mainCategoriesWithPercentage = mainCategories.map((item, index) => ({
    ...item,
    color: colorPalette[index % colorPalette.length],
    percentage: mainCategoriesTotal > 0 ? (item.value / mainCategoriesTotal) * 100 : 0
  }))

  // Kapsam dışı kategoriler için yüzdelik hesaplama (genel toplama göre)
  const excludedCategoriesWithPercentage = excludedCategories.map((item, index) => ({
    ...item,
    color: '#9ca3af', // Gri renk
    percentage: totalValue.value > 0 ? (item.value / totalValue.value) * 100 : 0
  }))

  return {
    mainCategories: mainCategoriesWithPercentage,
    excludedCategories: excludedCategoriesWithPercentage,
    allCategories: [...mainCategoriesWithPercentage, ...excludedCategoriesWithPercentage]
  }
})

// Pasta grafik için veri (Alt Parçalar hariç, yeniden hesaplanmış yüzdelerle)
const chartData = computed(() => {
  return processedData.value.mainCategories
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
