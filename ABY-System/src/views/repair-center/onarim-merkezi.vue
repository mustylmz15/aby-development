<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="panel">
      <div class="flex items-center justify-between mb-5">
        <h1 class="text-xl font-semibold dark:text-white-light">
          <i class="fa fa-tools mr-2"></i>
          Onarım Merkezi
        </h1>
        <div class="flex items-center space-x-3">
          <div class="text-sm text-gray-500">
            Son Güncelleme: {{ formatDate(new Date()) }}
          </div>
          <button 
            @click="refreshData" 
            class="btn btn-primary btn-sm"
            :disabled="loading"
          >
            <i class="fa fa-refresh mr-1" :class="{ 'animate-spin': loading }"></i>
            Yenile
          </button>
        </div>
      </div>
    </div>

    <!-- Statistics Dashboard -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Onarım Bekleyen -->
      <div class="panel bg-gradient-to-r from-orange-400 to-orange-500 text-white">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-2xl font-bold">{{ diagnosedCount }}</div>
            <div class="text-sm opacity-90">Onarım Bekleyen</div>
            <div class="text-xs opacity-75 mt-1">Onarım Merkezi Arızalı Ürün Durumu</div>
          </div>
          <div class="bg-white/20 p-3 rounded-full">
            <i class="fa fa-clock-o text-2xl"></i>
          </div>
        </div>
      </div>
      
      <!-- Onarılan -->
      <div class="panel bg-gradient-to-r from-emerald-400 to-emerald-500 text-white">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-2xl font-bold">{{ repairedCount }}</div>
            <div class="text-sm opacity-90">Onarılan</div>
            <div class="text-xs opacity-75 mt-1">Onarım Merkezi Onarım Durumu</div>
          </div>
          <div class="bg-white/20 p-3 rounded-full">
            <i class="fa fa-check-circle text-2xl"></i>
          </div>
        </div>
      </div>
      
      <!-- Gönderilen -->
      <div class="panel bg-gradient-to-r from-slate-400 to-slate-500 text-white">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-2xl font-bold">{{ returnedCount }}</div>
            <div class="text-sm opacity-90">Depoya Gönderilen</div>
            <div class="text-xs opacity-75 mt-1">Depolara Göderilen Ürünler</div>
          </div>
          <div class="bg-white/20 p-3 rounded-full">
            <i class="fa fa-shipping-fast text-2xl"></i>
          </div>
        </div>
      </div>
      
      <!-- Toplam -->
      <div class="panel bg-gradient-to-r from-indigo-400 to-indigo-500 text-white">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-2xl font-bold">{{ totalRepairs }}</div>
            <div class="text-sm opacity-90">Toplam Onarım</div>
            <div class="text-xs opacity-75 mt-1">Aktif Durumlar</div>
          </div>
          <div class="bg-white/20 p-3 rounded-full">
            <i class="fa fa-tools text-2xl"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Panel -->
    <div class="panel">
      <!-- Tab Navigation -->
      <div class="mb-6">
        <div class="border-b border-gray-200 dark:border-gray-700">
          <nav class="-mb-px flex space-x-8">
            <button
              v-for="tab in tabs"
              :key="tab.key"
              @click="activeTab = tab.key"
              :class="[
                'whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors relative',
                activeTab === tab.key
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              <i :class="tab.icon" class="mr-2"></i>
              {{ tab.label }}
              <span 
                v-if="tab.count > 0"
                class="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-orange-500 rounded-full"
              >
                {{ tab.count }}
              </span>
            </button>
          </nav>
        </div>
      </div>

      <!-- Tab Content -->
      <div class="tab-content">
        <!-- DIAGNOSED Tab -->
        <div v-show="activeTab === 'diagnosed'" class="space-y-6">
          <ArızaBekleyenUrunler 
            :loading="loading"
            @refresh="refreshData"
            @view-details="showRepairDetails"
          />
        </div>

        <!-- REPAIRED Tab -->
        <div v-show="activeTab === 'tested'" class="space-y-6">
          <TamirOlanUrunler 
            :loading="loading"
            @refresh="refreshData"
            @view-repair-details="handleViewRepairDetails"
            @return-to-warehouse="handleReturnToWarehouse"
          />
        </div>

        <!-- RETURNED Tab -->
        <div v-show="activeTab === 'returned'" class="space-y-6">
          <GonderilenUrunler 
            :loading="loading"
            @refresh="refreshData"
          />
        </div>
      </div>
    </div>

    <!-- Detail Modal -->
    <ArizaDetayModal
      v-if="selectedRepair"
      :repair="selectedRepair"
      @close="closeDetailModal"
      @start-repair="handleStartRepair"
    />

    <!-- Onarım Detay Modal -->
    <OnarimDetayModal
      v-if="selectedRepairDetails"
      :repairDetails="selectedRepairDetails"
      @close="closeRepairDetailModal"
      @return-to-warehouse="handleReturnFromModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import ArızaBekleyenUrunler from './components/ariza-bekleyen-urunler.vue';
import TamirOlanUrunler from './components/tamir-olan-urunler.vue';
import GonderilenUrunler from './components/gonderilen-urunler.vue';
import ArizaDetayModal from './components/modals/ariza-detay-modal.vue';
import OnarimDetayModal from './components/modals/onarim-detay-modal.vue';
import { repairAPI } from './api/repair-api';
import type { Repair, RepairDetails } from './api/types';

// Composables
const router = useRouter();

// Reactive Data
const loading = ref(false);
const activeTab = ref('diagnosed');

// Modal State
const selectedRepair = ref<Repair | null>(null);
const selectedRepairDetails = ref<RepairDetails | null>(null);

// Statistics Data
const diagnosedCount = ref(0);
const repairedCount = ref(0);
const returnedCount = ref(0);
const totalRepairs = ref(0);

// Tab configuration
const tabs = computed(() => [
  {
    key: 'diagnosed',
    label: 'Onarım Bekleyen',
    icon: 'fa fa-clock-o',
    count: diagnosedCount.value
  },
  {
    key: 'tested',
    label: 'Onarılan',
    icon: 'fa fa-check-circle',
    count: repairedCount.value
  }
  // Gönderilen tab'ını geçici olarak gizledik - endpoint hazır olunca açılacak
  /* {
    key: 'returned',
    label: 'Depoya Gönderilen',
    icon: 'fa fa-shipping-fast',
    count: returnedCount.value
  } */
]);

// Methods
const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

const loadStatistics = async () => {
  try {
    // DIAGNOSED durumundaki ürünleri al
    const diagnosedRepairs = await repairAPI.getRepairsByStatus('DIAGNOSED');
    diagnosedCount.value = diagnosedRepairs.length;

    // REPAIRED durumundaki ürünleri al
    const repairedRepairs = await repairAPI.getRepairsByStatus('REPAIRED');
    repairedCount.value = repairedRepairs.length;

    // Return-to-warehouse henüz backend'de yok, 0 olarak ayarla
    returnedCount.value = 0;

    // Toplam hesapla (sadece mevcut durumlar)
    totalRepairs.value = diagnosedCount.value + repairedCount.value;

  } catch (error) {
    console.error('İstatistik verisi yükleme hatası:', error);
    
  }
};

const refreshData = async () => {
  loading.value = true;
  try {
    await loadRepairData();
    await loadStatistics();

  } catch (error) {
    console.error('Veri yenileme hatası:', error);
  
  } finally {
    loading.value = false;
  }
};

// Modal Methods
const showRepairDetails = (repair: Repair) => {
  selectedRepair.value = repair;
};

const closeDetailModal = () => {
  selectedRepair.value = null;
};

const handleStartRepair = (repair: Repair) => {
  selectedRepair.value = null;
  router.push(`/onarim-merkezi/onarim/${repair.id}`);
};

// Yeni handler metodlar
const handleViewRepairDetails = async (repair: Repair) => {
  try {
    loading.value = true;
    const repairDetails = await repairAPI.getRepairDetails(repair.id);
    selectedRepairDetails.value = repairDetails;
  } catch (error) {
    console.error('Onarım detayları yüklenirken hata:', error);
  } finally {
    loading.value = false;
  }
};

const handleReturnToWarehouse = (repair: Repair) => {
  // Depoya geri gönderme işlemi
  router.push(`/onarim-merkezi/onarimdan-gonder/${repair.id}`);
};

const closeRepairDetailModal = () => {
  selectedRepairDetails.value = null;
};

const handleReturnFromModal = (repairDetails: RepairDetails) => {
  // Modal'dan gelen RepairDetails kullanarak depoya gönderme
  router.push(`/onarim-merkezi/onarimdan-gonder/${repairDetails.id}`);
  selectedRepairDetails.value = null;
};

const loadRepairData = async () => {
  try {
    // Sadece verilerin yenilendiğini simüle ediyoruz
    // Alt komponentler kendi verilerini yönetiyorlar
    await Promise.resolve();
  } catch (error) {
    console.error('Onarım verisi yükleme hatası:', error);
  }
};

// Lifecycle
onMounted(() => {
  refreshData();
});
</script>

<style scoped>
.tab-content {
  min-height: 400px;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Statistics Cards Enhancement */
.panel {
  transition: all 0.3s ease;
}

.panel:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

/* Tab Navigation Enhancement */
.tab-content > div {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Count Badge Styling */
nav button {
  position: relative;
}

nav button span {
  position: absolute;
  top: -8px;
  right: -8px;
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

/* Loading State Enhancement */
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn:disabled i.animate-spin {
  color: #6b7280;
}
</style>