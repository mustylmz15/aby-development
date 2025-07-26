<template>
  <div>
    <!-- Modern Table Container -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-16">
        <div class="relative">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <i class="fa fa-warehouse text-primary-600"></i>
          </div>
        </div>
        <span class="ml-4 text-gray-700 dark:text-gray-200 font-semibold">Depolar yükleniyor...</span>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-16">
        <div class="mx-auto mb-4 w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
          <i class="fa fa-exclamation-triangle text-2xl text-red-500"></i>
        </div>
        <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Bir hata oluştu</h3>
        <p class="text-gray-700 dark:text-gray-200 font-medium">{{ error }}</p>
      </div>

      <!-- Table Content -->
      <div v-else class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="bg-gray-800 dark:bg-gray-700">
              <th class="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                <div class="flex items-center gap-2">
                  <i class="fa fa-warehouse"></i>
                  <span>Depo Adı</span>
                </div>
              </th>
              <th class="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                <div class="flex items-center gap-2">
                  <i class="fa fa-tags"></i>
                  <span>Tip</span>
                </div>
              </th>
              <th class="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                <div class="flex items-center gap-2">
                  <i class="fa fa-map-marker-alt"></i>
                  <span>Şehir</span>
                </div>
              </th>
              <th class="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                <div class="flex items-center gap-2">
                  <i class="fa fa-info-circle"></i>
                  <span>Durum</span>
                </div>
              </th>
              <th class="px-6 py-4 text-center text-sm font-bold text-white uppercase tracking-wider">
                <div class="flex items-center justify-center gap-2">
                  <i class="fa fa-cogs"></i>
                  <span>İşlemler</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
            <WarehouseTableRow
              v-for="(warehouse, index) in warehouses"
              :key="warehouse.id"
              :warehouse="warehouse"
              :index="index"
              @select="onSelect(warehouse)"
              @edit="onEdit(warehouse)"
              @delete="onDelete(warehouse)"
            />
          </tbody>
        </table>

        <!-- Empty State -->
        <div v-if="!loading && !error && warehouses.length === 0" class="text-center py-16">
          <div class="flex flex-col items-center gap-4">
            <div class="p-6 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-3xl shadow-xl">
              <i class="fa fa-warehouse text-6xl text-gray-400"></i>
            </div>
            <div class="text-2xl font-bold text-gray-800 dark:text-gray-100">Depo Bulunamadı</div>
            <div class="text-gray-600 dark:text-gray-300 max-w-md font-medium">
              Henüz depo eklenmemiş. İlk deponuzu ekleyerek başlayın!
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import WarehouseTableRow from './WarehouseTableRow.vue';
import type { Warehouse } from './types';

const props = defineProps<{
  warehouses: Warehouse[];
  loading?: boolean;
  error?: string | null;
}>();

const emit = defineEmits(['select', 'edit', 'delete']);

function onSelect(warehouse: Warehouse) {
  emit('select', warehouse);
}
function onEdit(warehouse: Warehouse) {
  emit('edit', warehouse);
}
function onDelete(warehouse: Warehouse) {
  emit('delete', warehouse);
}
</script>
