<template>
  <div>
    <!-- Combined Filter and Table Section -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <!-- Filter Header -->
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <i class="fa fa-warehouse text-blue-600 dark:text-blue-400 text-sm"></i>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Depo Listesi</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ filteredWarehouses.length }} depo bulundu</p>
            </div>
          </div>
          <button 
            @click="onAddWarehouse"
            class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <i class="fa fa-plus text-xs"></i>
            Yeni Depo
          </button>
        </div>
      </div>

      <!-- Compact Filter Section -->
      <div class="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Depo Tipi -->
          <div>
            <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Depo Tipi</label>
            <select 
              v-model="filters.type" 
              @change="applyFilters"
              class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Tümü</option>
              <option v-for="type in warehouseTypes.slice(1)" :key="type.value" :value="type.value">{{ type.label }}</option>
            </select>
          </div>
          
          <!-- Durum -->
          <div>
            <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Durum</label>
            <select 
              v-model="filters.status" 
              @change="applyFilters"
              class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Tümü</option>
              <option v-for="status in statusOptions.slice(1)" :key="status.value" :value="status.value">{{ status.label }}</option>
            </select>
          </div>
          
          <!-- Actions -->
          <div class="flex items-end gap-2">
            <button 
              @click="onReset"
              class="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium rounded-md transition-colors"
            >
              <i class="fa fa-undo text-xs"></i>
              Temizle
            </button>
            <button 
              @click="onRefresh"
              class="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md transition-colors"
            >
              <i class="fa fa-refresh text-xs"></i>
              Yenile
            </button>
          </div>
        </div>
      </div>

      <!-- Table Section -->
      <div class="overflow-x-auto">
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center py-12">
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
            @click="onRefresh" 
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <i class="fa fa-refresh mr-2"></i>
            Tekrar Dene
          </button>
        </div>

        <!-- Table -->
        <table v-else class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Depo Adı
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Durum
              </th>
              <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <WarehouseTableRow
              v-for="(warehouse, index) in filteredWarehouses"
              :key="warehouse.id"
              :warehouse="warehouse"
              :index="index"
              @select="onSelectWarehouse"
              @edit="onEditWarehouse"
              @delete="onDeleteWarehouse"
            />
          </tbody>
        </table>

        <!-- Empty State -->
        <div v-if="!loading && !error && filteredWarehouses.length === 0" class="text-center py-12">
          <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <i class="fa fa-warehouse text-2xl text-gray-400"></i>
          </div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Depo bulunamadı</h3>
          <p class="text-gray-500 dark:text-gray-400">Kriterlere uygun depo bulunmuyor.</p>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <BaseModal v-model="showForm">
      <WarehouseForm
        :warehouse="selectedWarehouse ?? undefined"
        :warehouseTypes="warehouseTypes"
        :statusOptions="statusOptions"
        :projects="props.projects"
        @save="onSaveWarehouse"
        @cancel="onCancelForm"
      />
    </BaseModal>
    
    <BaseModal v-model="showDetail">
      <WarehouseDetail
        v-if="selectedWarehouse"
        :warehouse="selectedWarehouse"
        @edit="onEditWarehouse"
        @delete="onDeleteWarehouse"
        @close="onCloseDetail"
      />
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import WarehouseTableRow from '../components/WarehouseTableRow.vue';
import WarehouseForm from '../components/WarehouseForm.vue';
import WarehouseDetail from '../components/WarehouseDetail.vue';
import BaseModal from '../components/BaseModal.vue';
import type { Warehouse, WarehouseTypeOption, StatusOption } from '../components/types';
import Swal from 'sweetalert2';

// PROPS
const props = defineProps<{
  warehouses: Warehouse[];
  projects?: any[];
  loading?: boolean;
  error?: string | null;
}>();
const emit = defineEmits(['refresh']);

// Local state
const warehouseTypes = ref<WarehouseTypeOption[]>([
  { value: '', label: 'Tümü' },
  { value: 'STANDARD', label: 'Standart' },
  { value: 'CENTRAL', label: 'Merkez' },
  { value: 'FIELD', label: 'Saha' },
  { value: 'REPAIR', label: 'Tamir' },
]);

const statusOptions = ref<StatusOption[]>([
  { value: '', label: 'Tümü' },
  { value: 'active', label: 'Aktif' },
  { value: 'inactive', label: 'Pasif' },
]);

const selectedWarehouse = ref<Warehouse | null>(null);
const showForm = ref(false);
const showDetail = ref(false);
const filters = ref({ type: '', status: '' });

// Filtreli depo listesi
const filteredWarehouses = computed(() => {
  return (props.warehouses || []).filter(w => {
    return (
      (!filters.value.type || w.type === filters.value.type) &&
      (!filters.value.status || w.status === filters.value.status)
    );
  });
});

function applyFilters() {
  // Filtreler reactive olduğu için otomatik olarak filteredWarehouses güncellenir
}

function onAddWarehouse() {
  selectedWarehouse.value = null;
  showForm.value = true;
}

function onFilter(f: typeof filters.value) {
  filters.value = { ...f };
}

function onReset() {
  filters.value = { type: '', status: '' };
}

function onRefresh() {
  emit('refresh');
}

function onSelectWarehouse(warehouse: Warehouse) {
  selectedWarehouse.value = warehouse;
  showDetail.value = true;
}

function onEditWarehouse(warehouse: Warehouse) {
  selectedWarehouse.value = warehouse;
  showForm.value = true;
}

import { createWarehouse, updateWarehouse, deleteWarehouse } from '../api/warehouse-api';

async function onDeleteWarehouse(warehouse: Warehouse) {
  if (!warehouse.id) {
    await Swal.fire({
      icon: 'error',
      title: 'Hata!',
      text: 'Depo ID bulunamadı!',
      padding: '2em',
      customClass: { popup: 'sweet-alerts' },
      confirmButtonText: 'Tamam'
    });
    return;
  }
  
  const result = await Swal.fire({
    title: 'Depoyu Sil',
    text: 'Bu depoyu silmek istediğinize emin misiniz?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Evet, Sil!',
    cancelButtonText: 'İptal',
    padding: '2em',
    customClass: { popup: 'sweet-alerts' }
  });

  if (result.isConfirmed) {
    try {
      await deleteWarehouse(warehouse.id);
      await Swal.fire({
        icon: 'success',
        title: 'Başarılı!',
        text: 'Depo başarıyla silindi!',
        padding: '2em',
        customClass: { popup: 'sweet-alerts' },
        confirmButtonText: 'Tamam'
      });
      emit('refresh');
    } catch (err: any) {
      await Swal.fire({
        icon: 'error',
        title: 'Hata!',
        text: 'Depo silinemedi: ' + (err?.message || 'Bilinmeyen hata'),
        padding: '2em',
        customClass: { popup: 'sweet-alerts' },
        confirmButtonText: 'Tamam'
      });
    }
  }
}

async function onSaveWarehouse(warehouse: Warehouse) {
  try {
    console.log('Depo kaydet (formdan gelen):', warehouse);
    if (warehouse.id) {
      await updateWarehouse(warehouse.id, warehouse);
      await Swal.fire({
        icon: 'success',
        title: 'Başarılı!',
        text: 'Depo başarıyla güncellendi!',
        padding: '2em',
        customClass: { popup: 'sweet-alerts' },
        confirmButtonText: 'Tamam'
      });
    } else {
      await createWarehouse(warehouse);
      await Swal.fire({
        icon: 'success',
        title: 'Başarılı!',
        text: 'Depo başarıyla oluşturuldu!',
        padding: '2em',
        customClass: { popup: 'sweet-alerts' },
        confirmButtonText: 'Tamam'
      });
    }
    showForm.value = false;
    emit('refresh');
  } catch (err: any) {
    await Swal.fire({
      icon: 'error',
      title: 'Hata!',
      text: 'Depo kaydedilemedi: ' + (err?.message || 'Bilinmeyen hata'),
      padding: '2em',
      customClass: { popup: 'sweet-alerts' },
      confirmButtonText: 'Tamam'
    });
  }
}

function onCancelForm() {
  showForm.value = false;
}

function onCloseDetail() {
  showDetail.value = false;
}
</script>
