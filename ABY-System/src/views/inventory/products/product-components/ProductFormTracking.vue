<template>
  <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
    <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">📋 Takip Seçenekleri</h3>
    <div class="space-y-4">
      <div class="flex items-center space-x-3">
        <input v-model="model.isSerialized" type="checkbox" id="isSerialNumberTracked" class="form-checkbox h-5 w-5 text-primary" />
        <label for="isSerialNumberTracked" class="flex-1 cursor-pointer">
          <span class="font-medium text-gray-900 dark:text-white">🔢 Seri Numarası Takibi</span>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Bu ürün seri numarası ile takip edilsin (Tekil ürünler için)</p>
        </label>
      </div>
      <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-3 rounded">
        <p class="text-blue-800 dark:text-blue-200 text-sm">
          <strong>ℹ️ Not:</strong> Seri numarası takibi aktif edildiğinde, stok girişi "Ürün Yönetimi" sayfasından yapılacak.
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps<{ model: any }>();
</script>
