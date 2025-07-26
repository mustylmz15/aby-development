
<template>
  <div>
    <!-- Modern Search and Filter Section -->
    <div class="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div class="flex-1 max-w-md">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="fa fa-search text-gray-400"></i>
            </div>
            <input 
              type="text" 
              v-model="searchTerm"
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
              placeholder="Ürün adı, seri no ile arayın..."
            />
          </div>
        </div>
        <div class="flex items-center gap-3">
          <select 
            v-model="statusFilter"
            class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
          >
            <option value="">Tüm Durumlar</option>
            <option value="DEPO">Depoda</option>
            <option value="IN_STOCK">Stokta</option>
            <option value="RESERVED">Rezerve</option>
            <option value="OUT_OF_STOCK">Stok Dışı</option>
          </select>
          <div class="text-sm text-gray-600 dark:text-gray-400">
            Toplam: <span class="font-semibold text-primary-600 dark:text-primary-400">{{ groupedItems.length }}</span> ürün grubu
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Loading state -->
    <div v-if="isLoading" class="flex flex-col justify-center items-center py-16">
      <div class="relative">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <i class="fa fa-warehouse text-primary-600"></i>
        </div>
      </div>
      <div class="mt-4 text-center">
        <h3 class="text-lg font-medium text-gray-800 dark:text-gray-100">Stok verileri yükleniyor...</h3>
        <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">Lütfen bekleyiniz...</p>
      </div>
    </div>

    <!-- Enhanced Error state -->
    <div v-else-if="error" class="text-center py-16">
      <div class="mx-auto mb-6 w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
        <i class="fa fa-exclamation-triangle text-red-500 text-2xl"></i>
      </div>
      <div class="max-w-md mx-auto">
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Veri yüklenirken hata oluştu</h3>
        <p class="text-gray-600 dark:text-gray-300 mb-6">{{ error }}</p>
        <button 
          @click="loadData" 
          class="inline-flex items-center gap-2 rounded-lg bg-primary-600 text-white px-4 py-2 text-sm font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-200"
        >
          <i class="fa fa-refresh"></i>
          <span>Tekrar Dene</span>
        </button>
      </div>
    </div>

    <!-- Modern Table -->
    <div v-else class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th scope="col" class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <i class="fa fa-hashtag mr-2"></i>ID
              </th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <i class="fa fa-box mr-2"></i>Ürün
              </th>
              <!-- seri numarası kolonu
              <th scope="col" class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <i class="fa fa-barcode mr-2"></i>Seri No
              </th>
              -->
              <th scope="col" class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <i class="fa fa-sort-numeric-up mr-2"></i>Miktar
              </th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <i class="fa fa-flag mr-2"></i>Durum
              </th>
              <!-- seri numarası kolonu 
              <th scope="col" class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <i class="fa fa-warehouse mr-2"></i>Depo
              </th>
              -->
              <th scope="col" class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <i class="fa fa-calendar mr-2"></i>Oluşturulma
              </th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <i class="fa fa-cogs mr-2"></i>İşlemler
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="item in paginatedItems" :key="item.id" class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                {{ item.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div>
                    <div>
                      <span class="badge badge-outline-primary"> {{ getProductName(item.productId) }}</span>
                    </div>
                  </div>
                  <div class="ml-3">
                    <div class="text-sm font-medium text-gray-900 dark:text-gray-100">
                     
                    </div>
                  </div>
                </div>
              </td>
              <!-- seri numarası kolonu 
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 font-mono">
                {{ item.serialNumber || '-' }}
              </td>
                -->
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="badge badge-outline-primary">
                  {{ item.totalQuantity }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                
                  <span class="badge badge-outline-success">
                    {{ getStatusName(item.status) }}
                  </span>
                
              </td>
              <!--
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                <div class="flex items-center">
                  <i class="fa fa-warehouse text-gray-400 mr-2"></i>
                  {{ getWarehouseName(item.currentWarehouseId) }}
                </div>
              </td>
              -->
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ formatDate(item.createdAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button 
                  @click="openDetail(item)"
                  class="inline-flex items-center gap-1 px-3 py-1.5 border border-transparent text-xs font-medium rounded-lg text-primary-600 bg-primary-50 hover:bg-primary-100 dark:bg-primary-900 dark:text-primary-400 dark:hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                >
                  <i class="fa fa-eye"></i>
                  Detay
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="groupedItems.length === 0" class="text-center py-16">
        <div class="mx-auto mb-6 w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
          <i class="fa fa-box-open text-gray-400 text-2xl"></i>
        </div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Stok bulunamadı</h3>
        <p class="text-gray-500 dark:text-gray-400">
          {{ searchTerm || statusFilter ? 'Arama kriterlerinize uygun stok bulunmamaktadır.' : 'Merkez depoda henüz stok bulunmamaktadır.' }}
        </p>
      </div>

      <!-- Modern Pagination -->
      <div v-if="totalPages > 1" class="bg-gray-50 dark:bg-gray-900 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700 dark:text-gray-300">
            <span class="font-medium">{{ (currentPage - 1) * pageSize + 1 }}</span>
            -
            <span class="font-medium">{{ Math.min(currentPage * pageSize, groupedItems.length) }}</span>
            arası, toplam
            <span class="font-medium">{{ groupedItems.length }}</span>
            grup
          </div>
          <div class="flex items-center gap-2">
            <button 
              :disabled="currentPage === 1"
              @click="currentPage--"
              class="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-sm leading-5 font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <i class="fa fa-chevron-left mr-1"></i>
              Önceki
            </button>
            <span class="text-sm text-gray-700 dark:text-gray-300 px-3">
              {{ currentPage }} / {{ totalPages }}
            </span>
            <button 
              :disabled="currentPage === totalPages"
              @click="currentPage++"
              class="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-sm leading-5 font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Sonraki
              <i class="fa fa-chevron-right ml-1"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Detail Modal -->
    <CenterStockDetailModal 
      v-if="showDetail" 
      :show="showDetail" 
      :item="selectedItem" 
      @close="closeDetail" 
    />
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { getCentralStockItems, getProducts } from '../api/center-stock-api';
import { getWarehouses } from '../api/warehouses-api';
import CenterStockDetailModal from './CenterStockDetailModal.vue';

// Reactive data
const items = ref<any[]>([]);
const products = ref<any[]>([]);
const warehouses = ref<any[]>([]);
const centralWarehouses = ref<any[]>([]);
const showDetail = ref(false);
const selectedItem = ref<any>(null);

// UI State
const isLoading = ref(true);
const error = ref<string | null>(null);

// Filters and Search
const searchTerm = ref('');
const statusFilter = ref('');

// Pagination
const currentPage = ref(1);
const pageSize = ref(10);

// Methods
function openDetail(item: any) {
  selectedItem.value = item;
  showDetail.value = true;
}

function closeDetail() {
  showDetail.value = false;
  selectedItem.value = null;
}

function getProductName(productId: string) {
  const product = products.value.find((p: any) => p.id === productId);
  return product ? product.name || product.productName || product.title || productId : productId;
}

function getWarehouseName(warehouseId: string) {
  const warehouse = centralWarehouses.value.find((w: any) => w.id === warehouseId);
  return warehouse ? (warehouse.name || warehouse.code || warehouseId) : 'Merkez Depoda Yok';
}

function getStatusName(status: string) {
  const statusNames: Record<string, string> = {
    'DEPO': 'Depoda',
    'IN_STOCK': 'Stokta',
    'RESERVED': 'Rezerve',
    'OUT_OF_STOCK': 'Stok Dışı'
  };
  return statusNames[status] || status;
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

function getStatusIcon(status: string) {
  const icons: Record<string, string> = {
    'DEPO': 'fa fa-check-circle',
    'IN_STOCK': 'fa fa-box',
    'RESERVED': 'fa fa-lock',
    'OUT_OF_STOCK': 'fa fa-times-circle'
  };
  return icons[status] || 'fa fa-question-circle';
}

function formatDate(dateString: string | null) {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleString('tr-TR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

async function loadData() {
  try {
    isLoading.value = true;
    error.value = null;
    
    const [itemsData, productsData, warehousesData] = await Promise.all([
      getCentralStockItems(),
      getProducts(),
      getWarehouses()
    ]);
    
    items.value = itemsData;
    products.value = productsData;
    warehouses.value = warehousesData;
    centralWarehouses.value = warehousesData.filter((w: any) => 
      w.type === 'CENTRAL' || w.warehouse_type === 'CENTRAL'
    );
  } catch (e: any) {
    error.value = e.message || 'Veriler yüklenirken bir hata oluştu';
    console.error('Error loading data:', e);
  } finally {
    isLoading.value = false;
  }
}

// Computed properties
const filteredItems = computed(() => {
  const centralIds = centralWarehouses.value.map((w: any) => w.id);
  let result = items.value.filter((item: any) => centralIds.includes(item.currentWarehouseId));
  
  // Search filter
  if (searchTerm.value) {
    const search = searchTerm.value.toLowerCase();
    result = result.filter((item: any) => {
      const productName = getProductName(item.productId).toLowerCase();
      const serialNumber = (item.serialNumber || '').toLowerCase();
      return productName.includes(search) || serialNumber.includes(search);
    });
  }
  
  // Status filter
  if (statusFilter.value) {
    result = result.filter((item: any) => item.status === statusFilter.value);
  }
  
  return result;
});

// Group items by product
const groupedItems = computed(() => {
  const groups: Record<string, any> = {};
  
  filteredItems.value.forEach((item: any) => {
    const productId = item.productId || 'unknown';
    
    if (!groups[productId]) {
      groups[productId] = {
        id: productId,
        productId: productId,
        items: [],
        totalQuantity: 0,
        serialNumbers: [],
        status: item.status,
        createdAt: item.createdAt,
        currentWarehouseId: item.currentWarehouseId
      };
    }
    
    groups[productId].items.push(item);
    groups[productId].totalQuantity += parseInt(item.quantity) || 1;
    if (item.serialNumber && !groups[productId].serialNumbers.includes(item.serialNumber)) {
      groups[productId].serialNumbers.push(item.serialNumber);
    }
  });
  
  const result = Object.values(groups);
  console.log('Grouped items:', result);
  return result;
});

const totalPages = computed(() => {
  return Math.ceil(groupedItems.value.length / pageSize.value);
});

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return groupedItems.value.slice(start, end);
});

// Watchers
watch([searchTerm, statusFilter], () => {
  currentPage.value = 1; // Reset to first page when filters change
});

// Lifecycle
onMounted(() => {
  loadData();
});
</script>

<style scoped>
/* Loading animation */
@keyframes spin-smooth {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin-smooth 1s linear infinite;
}

/* Primary color definitions for consistency */
.text-primary-600 { color: #2563eb; }
.text-primary-400 { color: #60a5fa; }
.bg-primary-50 { background-color: #eff6ff; }
.bg-primary-100 { background-color: #dbeafe; }
.bg-primary-600 { background-color: #2563eb; }
.bg-primary-700 { background-color: #1d4ed8; }
.bg-primary-800 { background-color: #1e40af; }
.bg-primary-900 { background-color: #1e3a8a; }
.bg-primary-200 { background-color: #bfdbfe; }
.border-t-primary-600 { border-top-color: #2563eb; }
.focus\:ring-primary-500:focus { 
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5); 
}
.focus\:border-primary-500:focus { 
  border-color: #3b82f6; 
}

/* Dark mode primary colors */
:global(.dark) .text-primary-400 { color: #60a5fa; }
:global(.dark) .bg-primary-900 { background-color: #1e3a8a; }
:global(.dark) .bg-primary-800 { background-color: #1e40af; }

/* Enhanced hover effects */
.hover\:bg-gray-50:hover {
  background-color: #f9fafb;
}

.hover\:bg-primary-100:hover {
  background-color: #dbeafe;
}

:global(.dark) .hover\:bg-gray-700:hover {
  background-color: #374151;
}

:global(.dark) .hover\:bg-primary-800:hover {
  background-color: #1e40af;
}

/* Smooth transitions */
.transition-colors {
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* Focus ring improvements */
.focus\:ring-2:focus {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

.focus\:ring-offset-2:focus {
  box-shadow: 0 0 0 2px #fff, 0 0 0 4px rgba(59, 130, 246, 0.5);
}

/* Button disabled state */
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Table enhancements */
table {
  border-collapse: separate;
  border-spacing: 0;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.5);
}

/* Enhanced form inputs */
input[type="text"], select {
  background-clip: padding-box;
}

input[type="text"]:focus, select:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Badge enhancements */
.inline-flex.items-center.px-2\.5.py-0\.5.rounded-full {
  font-weight: 500;
  letter-spacing: 0.025em;
}

/* Icon spacing */
.fa {
  line-height: inherit;
}

/* Responsive improvements */
@media (max-width: 640px) {
  .px-6 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .py-4 {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }
}
</style>
