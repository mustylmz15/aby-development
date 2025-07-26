<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 mb-6">
    <div class="flex items-center gap-3 mb-4">
      <div class="p-2 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl shadow-lg">
        <i class="fa fa-filter text-white"></i>
      </div>
      <div>
        <h4 class="text-lg font-bold text-gray-900 dark:text-gray-100">Filtrele</h4>
        <p class="text-sm text-gray-600 dark:text-gray-300 font-medium">Depoları filtreleyerek arayın</p>
      </div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
      <div class="space-y-2">
        <label class="text-sm font-bold text-gray-800 dark:text-gray-100">Depo Tipi</label>
        <select 
          v-model="filters.type" 
          class="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 focus:border-primary-500 focus:ring-4 focus:ring-primary-200 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
        >
          <option value="">Tüm Tipler</option>
          <option v-for="type in warehouseTypes" :key="type.value" :value="type.value">{{ type.label }}</option>
        </select>
      </div>
      
      <div class="space-y-2">
        <label class="text-sm font-bold text-gray-800 dark:text-gray-100">Durum</label>
        <select 
          v-model="filters.status" 
          class="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 focus:border-primary-500 focus:ring-4 focus:ring-primary-200 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
        >
          <option value="">Tüm Durumlar</option>
          <option v-for="status in statusOptions" :key="status.value" :value="status.value">{{ status.label }}</option>
        </select>
      </div>
      
      <div class="space-y-2">
        <label class="text-sm font-bold text-gray-800 dark:text-gray-100">Şehir</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i class="fa fa-map-marker-alt text-gray-400"></i>
          </div>
          <input 
            v-model="filters.city" 
            class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 focus:border-primary-500 focus:ring-4 focus:ring-primary-200 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 transition-all duration-200" 
            placeholder="Şehir ara..." 
          />
        </div>
      </div>
      
      <div class="flex items-end">
        <button 
          class="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-200 text-blue-700 px-4 py-3 text-sm font-medium hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200" 
          @click="$emit('filter', { ...filters })"
        >
          <i class="fa fa-search"></i>
          <span>Filtrele</span>
        </button>
      </div>
      
      <div class="flex items-end">
        <button 
          class="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-green-200 text-green-700 px-4 py-3 text-sm font-medium hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors duration-200" 
          @click="$emit('refresh')"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"></path>
          </svg>
          <span>Yenile</span>
        </button>
      </div>
      
      <div class="flex items-end">
        <button 
          class="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-orange-200 text-orange-700 px-4 py-3 text-sm font-medium hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-colors duration-200" 
          @click="resetFilters"
        >
          <i class="fa fa-broom"></i>
          <span>Temizle</span>
        </button>
      </div>
      
      <div class="flex items-end">
        <button 
          class="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-200 text-emerald-700 px-4 py-3 text-sm font-medium hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-colors duration-200" 
          @click="$emit('addWarehouse')"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
          </svg>
          <span>Yeni Depo Ekle</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import type { WarehouseTypeOption, StatusOption } from './types';

const props = defineProps<{
  warehouseTypes: WarehouseTypeOption[];
  statusOptions: StatusOption[];
}>();

const emit = defineEmits(['filter', 'reset', 'refresh', 'addWarehouse']);

const filters = reactive({
  type: '',
  status: '',
  city: ''
});

function resetFilters() {
  filters.type = '';
  filters.status = '';
  filters.city = '';
  emit('reset');
}
</script>
