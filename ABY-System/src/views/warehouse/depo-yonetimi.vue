<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Simple Header -->
    <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
            <i class="fa fa-warehouse text-blue-600 dark:text-blue-400"></i>
          </div>
          <div>
            <h1 class="text-xl font-semibold text-gray-900 dark:text-white">Depo Yönetimi</h1>
            <p class="text-sm text-gray-500 dark:text-gray-400">Depo işlemleri ve stok takibi</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="px-6 py-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <!-- Toplam Depo -->
        <div class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Toplam Depo</p>
              <p class="text-2xl font-semibold text-blue-600 dark:text-blue-400">{{ totalWarehouses }}</p>
            </div>
            <div class="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <i class="fa fa-warehouse text-blue-600 dark:text-blue-400"></i>
            </div>
          </div>
        </div>

        <!-- Aktif Depo -->
        <div class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Aktif Depo</p>
              <p class="text-2xl font-semibold text-green-600 dark:text-green-400">{{ activeWarehouses }}</p>
            </div>
            <div class="w-10 h-10 bg-green-50 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <i class="fa fa-check-circle text-green-600 dark:text-green-400"></i>
            </div>
          </div>
        </div>

        <!-- Pasif Depo -->
        <div class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Pasif Depo</p>
              <p class="text-2xl font-semibold text-orange-600 dark:text-orange-400">{{ inactiveWarehouses }}</p>
            </div>
            <div class="w-10 h-10 bg-orange-50 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
              <i class="fa fa-pause-circle text-orange-600 dark:text-orange-400"></i>
            </div>
          </div>
        </div>

        <!-- Merkez Depo -->
        <div class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Merkez Depo</p>
              <p class="text-2xl font-semibold text-purple-600 dark:text-purple-400">{{ centralWarehouses }}</p>
            </div>
            <div class="w-10 h-10 bg-purple-50 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <i class="fa fa-star text-purple-600 dark:text-purple-400"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-12">
        <div class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-blue-500 bg-white transition ease-in-out duration-150">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Yükleniyor...
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <div class="text-red-600 dark:text-red-400 mb-4">
          <i class="fa fa-exclamation-triangle text-2xl"></i>
        </div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Bir hata oluştu</h3>
        <p class="text-gray-500 dark:text-gray-400 mb-4">{{ error }}</p>
        <button 
          @click="loadUserData" 
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <i class="fa fa-refresh mr-2"></i>
          Tekrar Dene
        </button>
      </div>

      <!-- Main Content -->
      <div v-else>
        <WarehouseManagementPage
          :warehouses="warehouses"
          :projects="projects"
          :loading="isLoading"
          :error="error"
          @refresh="loadUserData"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getWarehouses } from './api/warehouse-api';
import WarehouseManagementPage from './pages/WarehouseManagementPage.vue';
import type { Warehouse } from './components/types';

const isLoading = ref(false)
const error = ref<string | null>(null)
const warehouses = ref<Warehouse[]>([])
const projects = ref([])

// Statistics computed properties
const totalWarehouses = computed(() => warehouses.value.length)
const activeWarehouses = computed(() => warehouses.value.filter(w => w.status === 'ACTIVE').length)
const inactiveWarehouses = computed(() => warehouses.value.filter(w => w.status === 'INACTIVE').length)
const centralWarehouses = computed(() => warehouses.value.filter(w => w.type === 'CENTRAL').length)

// API'dan depo verisi çekme fonksiyonu
const loadUserData = async () => {
  isLoading.value = true
  error.value = null
  try {
    warehouses.value = await getWarehouses();
  } catch (e: unknown) {
    if (typeof e === 'object' && e !== null && 'message' in e) {
      error.value = (e as { message: string }).message;
    } else if (typeof e === 'string') {
      error.value = e;
    } else {
      error.value = 'Depo verileri alınamadı.';
    }
  } finally {
    isLoading.value = false;
  }
}

// Lifecycle
onMounted(() => {
  loadUserData()
})
</script>

<style scoped>
/* Custom animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

/* Smooth transitions */
* {
  transition: all 0.2s ease-in-out;
}

/* Focus states */
button:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Hover effects */
.hover-scale:hover {
  transform: scale(1.02);
}
</style>
