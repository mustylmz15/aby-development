<template>
  <div class="border border-gray-200 dark:border-gray-700 rounded-2xl p-8 bg-white dark:bg-gray-900 shadow">
    <h3 class="text-xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight">Kategori Bilgileri</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <label class="block text-base font-semibold mb-3 text-gray-700 dark:text-gray-200">Kategori<span class="text-red-500">*</span></label>
        <select v-model="model.category" class="form-select rounded-xl border-gray-300 dark:border-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900 px-4 py-2 transition-all duration-200 shadow-sm" required>
          <option value="">Seçiniz</option>
          <option v-for="cat in categoryOptions" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps<{ model: any, categoryOptions: any[] }>();
</script>
