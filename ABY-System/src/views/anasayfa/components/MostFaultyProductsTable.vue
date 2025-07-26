<template>
  <div class="panel">
    <div class="flex items-center justify-between mb-5">
      <h5 class="font-semibold text-lg dark:text-white-light">En Çok Arızadaki Ürünler</h5>
      <a href="#" class="text-primary text-sm hover:underline">Detaylı Rapor</a>
    </div>
    <div class="table-responsive">
      <table class="table-auto w-full">
        <thead>
          <tr>
            <th class="text-left py-2">Ürün</th>
            <th class="text-center py-2">Arıza Adedi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in mostFaultyProducts" :key="item.name" class="border-b border-gray-100 dark:border-gray-700">
            <td class="py-3">
              <div>
                <p class="font-medium">{{ item.name }}</p>
                <p class="text-xs text-gray-500">Arıza bilgisi</p>
              </div>
            </td>
            <td class="py-3 text-center">
              <span :class="`badge bg-${item.badge} text-white`">{{ item.count }} arıza</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup lang="ts">
interface MostFaultyProduct {
  name: string
  count: number
  badge: string
}

defineProps<{ mostFaultyProducts: MostFaultyProduct[] }>()
</script>
