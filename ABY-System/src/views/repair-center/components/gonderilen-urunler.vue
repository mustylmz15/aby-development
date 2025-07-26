<template>
  <div class="panel">
    <!-- Header ve Filtreler -->
    <div class="mb-5">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 class="text-lg font-semibold dark:text-white-light">
          <i class="fa fa-shipping-fast mr-2"></i>
          Depoya Gönderilen Ürünler
        </h2>
        
        <!-- Filtreler -->
        <div class="flex flex-col md:flex-row gap-3">
          <!-- Arama -->
          <div class="relative">
            <input
              v-model="filters.search"
              type="text"
              placeholder="Ürün adı, SKU veya seri no ara..."
              class="form-input w-full md:w-64 pl-10"
            />
            <i class="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
          
          <!-- Depo Filtresi -->
          <select v-model="filters.warehouse" class="form-select w-full md:w-48">
            <option value="">Tüm Depolar</option>
            <option v-for="warehouse in availableWarehouses" :key="warehouse" :value="warehouse">
              {{ warehouse }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-8">
      <i class="fa fa-spinner fa-spin text-2xl text-gray-400"></i>
      <p class="mt-2 text-gray-500">Veriler yükleniyor...</p>
    </div>

    <!-- Tablo -->
    <div v-else-if="paginatedRepairs.length > 0" class="table-responsive">
      <table class="table-hover">
        <thead>
          <tr>
            <th>Onarım No</th>
            <th>Ürün Adı</th>
            <th>SKU</th>
            <th>Seri No</th>
            <th>Hedef Depo</th>
            <th>Onarım Deposu</th>
            <th>Gönderim Tarihi</th>
            <th>Durum</th>
            <th>Kargo/Araç</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="repair in paginatedRepairs" :key="repair.id">
            <td>
              <span class="font-mono text-sm">{{ repair.repairNumber }}</span>
            </td>
            <td>
              <div class="font-medium">{{ getProductName(repair) }}</div>
            </td>
            <td>
              <span class="text-sm text-gray-600">{{ getProductSku(repair) }}</span>
            </td>
            <td>
              <span class="font-mono">{{ getSerialNumber(repair) }}</span>
            </td>
            <td>
              <div class="text-sm">
                <i class="fa fa-warehouse mr-1 text-blue-500"></i>
                {{ getTargetWarehouse(repair) }}
              </div>
            </td>
            <td>
              <div class="text-sm text-gray-600">{{ repair.repairWarehouse?.name || '-' }}</div>
            </td>
            <td>
              <div class="text-sm">{{ formatDate(repair.completedAt || repair.receivedAt) }}</div>
            </td>
            <td>
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                <i class="fa fa-truck mr-1"></i>
                Depoya Gönderildi
              </span>
            </td>
            <td>
              <div class="text-sm">
                <div class="flex items-center text-gray-600">
                  <i class="fa fa-shipping-fast mr-1"></i>
                  Kargo Bilgisi
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Boş Durum -->
    <div v-else class="text-center py-8">
      <i class="fa fa-inbox text-4xl text-gray-400 mb-4"></i>
      <h3 class="text-lg font-medium text-gray-600 mb-2">Ürün Bulunamadı</h3>
      <p class="text-gray-500">
        {{ hasActiveFilters ? 'Filtrelere uygun ürün bulunamadı' : 'Henüz depoya gönderilmiş ürün bulunmuyor' }}
      </p>
    </div>

    <!-- Sayfalama -->
    <div v-if="totalPages > 1" class="mt-6 flex items-center justify-between">
      <div class="text-sm text-gray-600">
        {{ paginationInfo }}
      </div>
      <div class="flex space-x-1">
        <button @click="currentPage = 1" :disabled="currentPage === 1" class="btn btn-outline-primary btn-sm">
          <i class="fa fa-angle-double-left"></i>
        </button>
        <button @click="currentPage--" :disabled="currentPage === 1" class="btn btn-outline-primary btn-sm">
          <i class="fa fa-angle-left"></i>
        </button>
        <span class="px-3 py-1 text-sm">{{ currentPage }} / {{ totalPages }}</span>
        <button @click="currentPage++" :disabled="currentPage === totalPages" class="btn btn-outline-primary btn-sm">
          <i class="fa fa-angle-right"></i>
        </button>
        <button @click="currentPage = totalPages" :disabled="currentPage === totalPages" class="btn btn-outline-primary btn-sm">
          <i class="fa fa-angle-double-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { repairAPI } from '../api/repair-api';
import type { Repair } from '../api/types';

// Props
interface Props {
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
});

// Emits
const emit = defineEmits<{
  refresh: [];
}>();

// Reactive Data
const repairs = ref<Repair[]>([]);
const currentPage = ref(1);
const itemsPerPage = ref(20);

// Filters
const filters = ref({
  search: '',
  warehouse: ''
});

// Computed
const availableWarehouses = computed(() => {
  const warehouses = repairs.value.map(r => r.repairWarehouse?.name || '').filter(Boolean);
  return [...new Set(warehouses)].sort();
});

const filteredRepairs = computed(() => {
  let filtered = repairs.value;

  // Arama filtresi
  if (filters.value.search) {
    const search = filters.value.search.toLowerCase();
    filtered = filtered.filter(repair => 
      getProductName(repair).toLowerCase().includes(search) ||
      getProductSku(repair).toLowerCase().includes(search) ||
      getSerialNumber(repair).toLowerCase().includes(search) ||
      repair.repairNumber.toLowerCase().includes(search)
    );
  }

  // Depo filtresi
  if (filters.value.warehouse) {
    filtered = filtered.filter(repair => 
      repair.repairWarehouse?.name === filters.value.warehouse
    );
  }

  return filtered;
});

const totalPages = computed(() => {
  return Math.ceil(filteredRepairs.value.length / itemsPerPage.value);
});

const paginatedRepairs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredRepairs.value.slice(start, end);
});

const paginationInfo = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value + 1;
  const end = Math.min(currentPage.value * itemsPerPage.value, filteredRepairs.value.length);
  return `${start}-${end} / ${filteredRepairs.value.length} kayıt`;
});

const hasActiveFilters = computed(() => {
  return filters.value.search || filters.value.warehouse;
});

// Methods
const getProductName = (repair: Repair): string => {
  return repair.item?.product?.name || 'Bilinmeyen Ürün';
};

const getProductSku = (repair: Repair): string => {
  return repair.item?.product?.sku || '-';
};

const getSerialNumber = (repair: Repair): string => {
  return repair.item?.serialNumber || '-';
};

const getTargetWarehouse = (repair: Repair): string => {
  // Bu bilgi return-to-warehouse işleminden gelecek
  // Şimdilik currentWarehouse'u gösterelim
  return repair.item?.currentWarehouse?.name || 'Bilinmeyen Depo';
};

const loadRepairs = async () => {
  try {
    // Şimdilik REPAIRED durumundaki ürünleri gösterelim
    // Gerçekte return-to-warehouse durumundaki ürünler gelecek
    const allRepaired = await repairAPI.getRepairsByStatus('REPAIRED');
    
    // Bu listeden depoya gönderilmiş olanları filtreleyelim
    // Şimdilik tüm REPAIRED'ları gösterelim, ileride backend'de yeni durum eklenecek
    repairs.value = allRepaired.filter(repair => {
      // Gelecekte burada return-to-warehouse durumu kontrol edilecek
      // Şimdilik tamamlanmış olanları gösterelim
      return repair.completedAt !== null;
    });
  } catch (error) {
    console.error('Gönderilmiş onarım listesi yükleme hatası:', error);
    // Hata durumunda boş array
    repairs.value = [];
  }
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Watchers
watch(() => props.loading, (newVal) => {
  if (!newVal) {
    loadRepairs();
  }
});

watch([() => filters.value.search, () => filters.value.warehouse], () => {
  currentPage.value = 1;
});

// Lifecycle
onMounted(() => {
  if (!props.loading) {
    loadRepairs();
  }
});
</script>

<style scoped>
.table-responsive {
  overflow-x: auto;
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border: 1px solid transparent;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
}

.btn-outline-primary {
  color: #3b82f6;
  background-color: transparent;
  border-color: #3b82f6;
}

.btn-outline-primary:hover:not(:disabled) {
  color: white;
  background-color: #3b82f6;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
