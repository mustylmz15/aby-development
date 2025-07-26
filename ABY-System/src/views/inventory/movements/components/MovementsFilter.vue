<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 mb-6">
    <div class="flex items-center gap-3 mb-4">
      <div class="p-2 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl shadow-lg">
        <i class="fa fa-filter text-white"></i>
      </div>
      <div>
        <h4 class="text-lg font-bold text-gray-900 dark:text-gray-100">Filtrele</h4>
        <p class="text-sm text-gray-600 dark:text-gray-300 font-medium">Stok hareketlerini filtreleyerek arayın</p>
      </div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
      <div class="space-y-2">
        <label class="text-sm font-bold text-gray-800 dark:text-gray-100">Ürün / Seri No</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i class="fa fa-search text-gray-400"></i>
          </div>
          <input 
            v-model="search" 
            type="text" 
            placeholder="Ürün veya Seri No Ara" 
            class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 focus:border-primary-500 focus:ring-4 focus:ring-primary-200 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 transition-all duration-200"
          />
        </div>
      </div>
      
      <div class="space-y-2">
        <label class="text-sm font-bold text-gray-800 dark:text-gray-100">Hareket Tipi</label>
        <select 
          v-model="type" 
          class="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 focus:border-primary-500 focus:ring-4 focus:ring-primary-200 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
        >
          <option value="">Tüm Tipler</option>
          <option value="TRANSFER">Transfer</option>
          <option value="GIRIS">Giriş</option>
          <option value="CIKIS">Çıkış</option>
        </select>
      </div>
      
      <div class="space-y-2">
        <label class="text-sm font-bold text-gray-800 dark:text-gray-100">Tarih</label>
        <input 
          v-model="date" 
          type="date" 
          class="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 focus:border-primary-500 focus:ring-4 focus:ring-primary-200 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
        />
      </div>
      
      <div class="flex items-end">
        <button 
          @click="$emit('filter', { search, type, date })" 
          class="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-200 text-blue-700 px-4 py-3 text-sm font-medium hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200"
        >
          <i class="fa fa-search"></i>
          <span>Filtrele</span>
        </button>
      </div>
      
      <div class="flex items-end">
        <button 
          @click="reset" 
          class="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-orange-200 text-orange-700 px-4 py-3 text-sm font-medium hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-colors duration-200"
        >
          <i class="fa fa-broom"></i>
          <span>Temizle</span>
        </button>
      </div>
      
      <div class="flex items-end">
        <button 
          @click="$emit('addMovement')" 
          class="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-200 text-emerald-700 px-4 py-3 text-sm font-medium hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-colors duration-200"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
          </svg>
          <span>Yeni Transfer</span>
        </button>
      </div>
      
      <div class="flex items-end">
        <button 
          @click="$emit('print')" 
          class="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-purple-200 text-purple-700 px-4 py-3 text-sm font-medium hover:bg-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors duration-200"
        >
          <i class="fa fa-print"></i>
          <span>Yazdır</span>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['filter', 'addMovement', 'print']);

const search = ref('');
const type = ref('');
const date = ref('');

function reset() {
  search.value = '';
  type.value = '';
  date.value = '';
  emit('filter', { search: '', type: '', date: '' });
}
</script>
