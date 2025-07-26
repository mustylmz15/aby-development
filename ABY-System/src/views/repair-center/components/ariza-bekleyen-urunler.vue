<template>
  <div class="panel">
    <!-- Header ve Filtreler -->
    <div class="mb-5">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 class="text-lg font-semibold dark:text-white-light">
          <i class="fa fa-clock-o mr-2"></i>
          Onarım Bekleyen Ürünler
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
          
          <!-- Öncelik Filtresi 
          <select v-model="filters.priority" class="form-select w-full md:w-32">
            <option value="">Tüm Öncelikler</option>
            <option value="LOW">Düşük</option>
            <option value="NORMAL">Normal</option>
            <option value="HIGH">Yüksek</option>
            <option value="URGENT">Acil</option>
          </select>
          -->
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
            <th>Arıza Açıklaması</th>
            <th>Depo</th>
            <th>Alınma Tarihi</th>
            <th>Bildiren</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="repair in paginatedRepairs" :key="repair.id">
            <!-- Ana Satır -->
            <tr 
              @click="toggleActions(repair.id)"
              class="cursor-pointer transition-all duration-200"
              :class="{ 
                'bg-blue-100 dark:bg-blue-900/30 border-l-4 border-blue-500': openActionId === repair.id,
                'hover:bg-gray-50 dark:hover:bg-gray-700': openActionId !== repair.id
              }"
            >
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
                <div class="max-w-xs truncate" :title="repair.reportedIssue">
                  {{ repair.reportedIssue }}
                </div>
              </td>
              <td>
                <div class="text-sm">{{ repair.repairWarehouse?.name || '-' }}</div>
              </td>
              <td>
                <div class="text-sm">{{ formatDate(repair.receivedAt) }}</div>
              </td>
              <td>
                <div class="text-sm">
                  {{ getReportedByName(repair) }}
                </div>
              </td>
            </tr>

            <!-- Genişletilen Satır - Butonlar -->
            <tr v-if="openActionId === repair.id" class="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-600">
              <td colspan="9" class="px-6 py-4">
                <div class="flex items-center justify-center space-x-4">
                  <button
                    @click.stop="viewDetails(repair)"
                    class="btn btn-outline-primary flex items-center space-x-2"
                  >
                    <i class="fa fa-eye"></i>
                    <span>Detay Görüntüle</span>
                  </button>
                  <button
                    @click.stop="startRepair(repair)"
                    class="btn btn-success flex items-center space-x-2"
                  >
                    <i class="fa fa-play"></i>
                    <span>Onarıma Başla</span>
                  </button>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <!-- Boş Durum -->
    <div v-else class="text-center py-8">
      <i class="fa fa-inbox text-4xl text-gray-400 mb-4"></i>
      <h3 class="text-lg font-medium text-gray-600 mb-2">Ürün Bulunamadı</h3>
      <p class="text-gray-500">
        {{ hasActiveFilters ? 'Filtrelere uygun ürün bulunamadı' : 'DIAGNOSED durumunda ürün bulunmuyor' }}
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
import { useRouter } from 'vue-router';
import { repairAPI } from '../api/repair-api';
import type { Repair, RepairPriority } from '../api/types';

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
  'view-details': [repair: Repair];
}>();

// Router
const router = useRouter();

// Reactive Data
const repairs = ref<Repair[]>([]);
const currentPage = ref(1);
const itemsPerPage = ref(20);
const openActionId = ref<string | null>(null);

// Filters
const filters = ref({
  search: '',
  warehouse: '',
  priority: '' as '' | RepairPriority
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

  // Öncelik filtresi
  if (filters.value.priority) {
    filtered = filtered.filter(repair => 
      repair.priority === filters.value.priority
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
  return filters.value.search || filters.value.warehouse || filters.value.priority;
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

const getReportedByName = (repair: Repair): string => {
  const user = repair.reportedByUser;
  if (!user) return '-';
  return `${user.firstName} ${user.lastName}`;
};

const loadRepairs = async () => {
  try {
    repairs.value = await repairAPI.getRepairsByStatus('DIAGNOSED');
  } catch (error) {
    console.error('DIAGNOSED onarım listesi yükleme hatası:', error);
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

const getPriorityText = (priority: RepairPriority): string => {
  const labels = {
    LOW: 'Düşük',
    NORMAL: 'Normal',
    HIGH: 'Yüksek',
    URGENT: 'Acil'
  };
  return labels[priority] || priority;
};

const getPriorityClass = (priority: RepairPriority): string => {
  const classes = {
    LOW: 'badge badge-secondary',
    NORMAL: 'badge badge-primary',
    HIGH: 'badge badge-warning',
    URGENT: 'badge badge-danger'
  };
  return classes[priority] || 'badge badge-secondary';
};

const toggleActions = (repairId: string) => {
  openActionId.value = openActionId.value === repairId ? null : repairId;
};

const viewDetails = (repair: Repair) => {
  openActionId.value = null;
  emit('view-details', repair);
};

const closeDetailModal = () => {
  // Bu metod artık gerekli değil - parent'ta yönetiliyor
};

const startRepair = (repair: Repair) => {
  openActionId.value = null;
  // Onarım sayfasına yönlendir
  router.push(`/onarim-merkezi/onarim/${repair.id}`);
};

const handleStartRepair = (repair: Repair) => {
  // Bu metod artık gerekli değil - parent'ta yönetiliyor
  router.push(`/onarim-merkezi/onarim/${repair.id}`);
};

// Watchers
watch(() => props.loading, (newVal) => {
  if (!newVal) {
    loadRepairs();
  }
});

watch([() => filters.value.search, () => filters.value.warehouse, () => filters.value.priority], () => {
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

.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.badge-secondary {
  background-color: #f3f4f6;
  color: #1f2937;
}

.badge-primary {
  background-color: #dbeafe;
  color: #1e40af;
}

.badge-warning {
  background-color: #fef3c7;
  color: #92400e;
}

.badge-danger {
  background-color: #fee2e2;
  color: #dc2626;
}

/* Row hover and selection effects */
tbody tr {
  transition: all 0.2s ease;
}

tbody tr:hover {
  background-color: rgba(59, 130, 246, 0.05);
}

/* Expanded row styling */
tbody tr.bg-gray-50 {
  border-top: 1px solid #e5e7eb;
}

tbody tr.bg-gray-50:hover {
  background-color: #f9fafb !important;
}

/* Button styling for expanded row */
.btn-success {
  background-color: #10b981;
  color: white;
  border: 1px solid #10b981;
}

.btn-success:hover {
  background-color: #059669;
  border-color: #059669;
}
</style>
