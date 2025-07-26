<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden border border-gray-200 dark:border-gray-700">
      <!-- Header -->
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Stok Detayları</h3>
        <button 
          @click="$emit('close')"
          class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-200"
        >
          <i class="fa fa-times text-xl"></i>
        </button>
      </div>

      <!-- Content -->
      <div class="px-6 py-4 max-h-[calc(90vh-140px)] overflow-y-auto">
        <!-- Main Info Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <!-- Left Column -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Ürün:</label>
              <p class="text-gray-900 dark:text-gray-100 font-medium">{{ getProductName(item?.productId) }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Toplam Miktar:</label>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {{ item?.totalQuantity || 0 }} adet
              </span>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Durum:</label>
              <span :class="getStatusBadgeClass(item?.status)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium">
                {{ getStatusName(item?.status) }}
              </span>
            </div>
          </div>

          <!-- Right Column -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Depo:</label>
              <p class="text-gray-900 dark:text-gray-100">{{ getWarehouseName(item?.currentWarehouseId) }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Ürün Sayısı:</label>
              <p class="text-gray-900 dark:text-gray-100">{{ getItemCount() }} farklı kayıt</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Oluşturulma Tarihi:</label>
              <p class="text-gray-900 dark:text-gray-100 text-sm">{{ formatDate(item?.createdAt) }}</p>
            </div>
          </div>
        </div>

        <!-- Serial Numbers Table -->
        <div class="mb-4">
          <h4 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Seri Numaraları</h4>
          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Sıra
                  </th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Seri Numarası
                  </th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Durum
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="(serialNumber, index) in getSerialNumbers()" :key="index" class="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {{ index + 1 }}
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 font-mono">
                    {{ serialNumber }}
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap">
                    <span :class="getStatusBadgeClass(item?.status)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                      {{ getStatusName(item?.status) }}
                    </span>
                  </td>
                </tr>
                <tr v-if="getSerialNumbers().length === 0">
                  <td colspan="3" class="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                    Bu ürün grubu için seri numarası bulunamadı
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-between items-center px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <button 
          @click="printTransfer"
          class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <i class="fa fa-print"></i>
          Yazdır
        </button>
        <button 
          @click="$emit('close')"
          class="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-200"
        >
          Kapat
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { getProducts } from '../api/center-stock-api';
import { getWarehouses } from '../api/warehouses-api';

const props = defineProps<{ show: boolean, item: any }>();
const emit = defineEmits(['close']);

const products = ref<any[]>([]);
const warehouses = ref<any[]>([]);

// Methods
function getProductName(productId: string) {
  if (!productId) return 'Ürün belirtilmemiş';
  const product = products.value.find(p => p.id === productId);
  return product ? (product.name || product.productName || product.title || productId) : productId;
}

function getWarehouseName(warehouseId: string) {
  if (!warehouseId) return 'Depo belirtilmemiş';
  const warehouse = warehouses.value.find(w => w.id === warehouseId);
  return warehouse ? (warehouse.name || warehouse.code || warehouseId) : warehouseId;
}

function getStatusName(status: string) {
  const statusNames: Record<string, string> = {
    'DEPO': 'Depoda',
    'IN_STOCK': 'Stokta',
    'RESERVED': 'Rezerve',
    'OUT_OF_STOCK': 'Stok Dışı'
  };
  return statusNames[status] || status || 'Belirtilmemiş';
}

function getStatusBadgeClass(status: string) {
  const classes: Record<string, string> = {
    'DEPO': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'IN_STOCK': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'RESERVED': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'OUT_OF_STOCK': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  };
  return classes[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
}

function formatDate(dateString: string | null) {
  if (!dateString) return 'Belirtilmemiş';
  return new Date(dateString).toLocaleString('tr-TR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function getItemCount() {
  if (props.item?.items) {
    return props.item.items.length;
  }
  if (props.item?.serialNumbers) {
    return props.item.serialNumbers.length;
  }
  return 1;
}

function getSerialNumbers() {
  if (props.item?.serialNumbers && props.item.serialNumbers.length > 0) {
    return props.item.serialNumbers;
  }
  if (props.item?.items && props.item.items.length > 0) {
    return props.item.items.map((item: any) => item.serialNumber).filter(Boolean);
  }
  return [];
}

function printTransfer() {
  window.print();
}

// Lifecycle
onMounted(async () => {
  try {
    const [productsData, warehousesData] = await Promise.all([
      getProducts(),
      getWarehouses()
    ]);
    products.value = productsData;
    warehouses.value = warehousesData;
  } catch (error) {
    console.error('Veriler yüklenirken hata:', error);
  }
});
</script>

<style scoped>
.modal-overlay {
  backdrop-filter: blur(4px);
  animation: fadeIn 0.2s ease-out;
}

.modal-content {
  animation: slideIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { 
    opacity: 0; 
    transform: translateY(-20px) scale(0.95); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0) scale(1); 
  }
}

.bg-opacity-40 {
  background-color: rgba(0,0,0,0.4);
}

/* Scrollbar stil tanımlamaları */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Status badge animasyonları */
.inline-flex {
  transition: all 0.2s ease-in-out;
}

/* Hover efektleri */
button {
  transition: all 0.2s ease-in-out;
}

button:hover {
  transform: translateY(-1px);
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .bg-white {
    background-color: #1f2937;
    color: white;
  }
  
  .text-gray-700 {
    color: #e5e7eb;
  }
  
  .text-gray-900 {
    color: #f9fafb;
  }
  
  .overflow-y-auto::-webkit-scrollbar-track {
    background: #374151;
  }
  
  .overflow-y-auto::-webkit-scrollbar-thumb {
    background: #6b7280;
  }
  
  .overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }
}
</style>
