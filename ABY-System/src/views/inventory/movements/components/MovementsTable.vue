<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
    <!-- Enhanced Loading state -->
    <div v-if="loading" class="flex flex-col justify-center items-center py-16">
      <div class="relative">
        <div class="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <i class="fa fa-exchange-alt text-primary-600 text-xl"></i>
        </div>
      </div>          <div class="mt-6 text-center">
            <h3 class="text-lg font-medium text-gray-800 dark:text-gray-100">Veriler yükleniyor...</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">Lütfen bekleyiniz...</p>
          </div>
    </div>

    <!-- Enhanced Error state -->
    <div v-else-if="error" class="text-center py-16">
      <div class="mx-auto mb-6 w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
        <svg class="w-10 h-10 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
        </svg>
      </div>
      <div class="max-w-md mx-auto">
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Bir hata oluştu</h3>
        <p class="text-gray-700 dark:text-gray-200">{{ error }}</p>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else-if="!items || items.length === 0" class="text-center py-16">
      <div class="mx-auto mb-6 w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
        <i class="fa fa-exchange-alt text-gray-400 text-2xl"></i>
      </div>
      <div class="max-w-md mx-auto">
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Henüz hareket kaydı yok</h3>
        <p class="text-gray-600 dark:text-gray-400">Stok hareketleri burada görüntülenecek</p>
      </div>
    </div>

    <!-- Table Content -->
    <div v-else class="overflow-x-auto">
      <table class="min-w-full">
        <thead>
          <tr class="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              <div class="flex items-center gap-2">
                <i class="fa fa-hashtag"></i>
                <span>Referans No</span>
              </div>
            </th>
            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              <div class="flex items-center gap-2">
                <i class="fa fa-cube"></i>
                <span>Ürün</span>
              </div>
            </th>
            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              <div class="flex items-center gap-2">
                <i class="fa fa-sort-numeric-up"></i>
                <span>Miktar</span>
              </div>
            </th>
            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              <div class="flex items-center gap-2">
                <i class="fa fa-info-circle"></i>
                <span>Durum</span>
              </div>
            </th>
            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              <div class="flex items-center gap-2">
                <i class="fa fa-warehouse"></i>
                <span>Kaynak Depo</span>
              </div>
            </th>
            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              <div class="flex items-center gap-2">
                <i class="fa fa-warehouse"></i>
                <span>Hedef Depo</span>
              </div>
            </th>
            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              <div class="flex items-center gap-2">
                <i class="fa fa-calendar"></i>
                <span>Tarih</span>
              </div>
            </th>
            <th class="px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              <div class="flex items-center justify-center gap-2">
                <i class="fa fa-cogs"></i>
                <span>İşlemler</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
          <MovementsTableRow 
            v-for="(item, index) in items" 
            :key="item.id"
            :item="item" 
            :index="index"
            @show-detail="$emit('show-detail', $event)" 
          />
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup lang="ts">
import MovementsTableRow from './MovementsTableRow.vue';

const props = defineProps<{ 
  items: any[];
  loading?: boolean;
  error?: string | null;
}>();

const emit = defineEmits(['show-detail']);
</script>
