<template>
  <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
    <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Temel Bilgiler</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="block text-sm font-medium mb-2">Stok Numarası <span class="text-red-500">*</span></label>
        <input v-model="model.sku" type="text" class="form-input" placeholder="Stok kodu giriniz" required />
      </div>
      <div>
        <label class="block text-sm font-medium mb-2">Ürün Adı <span class="text-red-500">*</span></label>
        <input v-model="model.name" type="text" class="form-input" placeholder="Ürün adı giriniz" required />
      </div>
      <!-- Birim (unitOfMeasure) alanı kaldırıldı -->
    </div>
    <div class="mt-4">
      <label class="block text-sm font-medium mb-2">Açıklama</label>
      <textarea v-model="model.description" class="form-textarea" rows="2" placeholder="Ürün açıklaması..."></textarea>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps<{ model: any, unitOptions: string[] }>();
</script>
