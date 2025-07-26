<template>
  <div class="max-w-4xl mx-auto">
    <!-- Form Header -->
    <div class="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
      <div class="p-3 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl shadow-lg">
        <i class="fa fa-warehouse text-2xl text-white"></i>
      </div>
      <div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {{ warehouse ? 'Depo Düzenle' : 'Yeni Depo Ekle' }}
        </h3>
        <p class="text-gray-600 dark:text-gray-300 font-medium">Depo bilgilerini doldurarak kaydedin</p>
      </div>
    </div>

    <!-- Form Content -->
    <form @submit.prevent="onSubmit" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Depo Kodu 
        <div class="space-y-2">
          <label class="text-sm font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <i class="fa fa-barcode text-primary-600"></i>
            Depo Kodu
          </label>
          <input 
            v-model="form.code" 
            required 
            class="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 focus:border-primary-500 focus:ring-4 focus:ring-primary-200 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 transition-all duration-200"
            placeholder="Depo kodunu girin..."
          />
        </div>
        -->
        <!-- Depo Adı -->
        <div class="space-y-2">
          <label class="text-sm font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <i class="fa fa-warehouse text-primary-600"></i>
            Depo Adı
          </label>
          <input 
            v-model="form.name" 
            required 
            class="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 focus:border-primary-500 focus:ring-4 focus:ring-primary-200 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 transition-all duration-200"
            placeholder="Depo adını girin..."
          />
        </div>
      </div>

      <!-- Depo Adresi - Full Width -->
      <div class="space-y-2">
        <label class="text-sm font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <i class="fa fa-map-marker-alt text-primary-600"></i>
          Depo Adresi
        </label>
        <textarea 
          v-model="form.address" 
          rows="3"
          class="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 focus:border-primary-500 focus:ring-4 focus:ring-primary-200 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 transition-all duration-200 resize-none"
          placeholder="Depo adresini girin..."
        ></textarea>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Depo Tipi -->
        <div class="space-y-2">
          <label class="text-sm font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <i class="fa fa-tags text-primary-600"></i>
            Depo Tipi
          </label>
          <select 
            v-model="form.type" 
            required 
            class="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 focus:border-primary-500 focus:ring-4 focus:ring-primary-200 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
          >
            <option value="">Depo tipi seçin...</option>
            <option v-for="type in warehouseTypes" :key="type.value" :value="type.value">{{ type.label }}</option>
          </select>
        </div>

        <!-- Depo Kapasitesi 
        <div class="space-y-2">
          <label class="text-sm font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <i class="fa fa-cube text-primary-600"></i>
            Depo Kapasitesi
          </label>
          <div class="relative">
            <input 
              v-model.number="form.capacity" 
              type="number" 
              min="0" 
              class="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 focus:border-primary-500 focus:ring-4 focus:ring-primary-200 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 transition-all duration-200"
              placeholder="Kapasite (m³)"
            />
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span class="text-gray-500 text-sm">m³</span>
            </div>
          </div>
        </div>
        -->
        <!-- Organizasyon -->
        <div class="space-y-2">
          <label class="text-sm font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <i class="fa fa-building text-primary-600"></i>
            Organizasyon
          </label>
          <input 
            v-model="form.organizationId" 
            disabled 
            class="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            placeholder="Otomatik atanır"
          />
        </div>

        <!-- Durum -->
        <div class="space-y-2">
          <label class="text-sm font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <i class="fa fa-toggle-on text-primary-600"></i>
            Durum
          </label>
          <select 
            v-model="form.isActive" 
            required 
            class="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 focus:border-primary-500 focus:ring-4 focus:ring-primary-200 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
          >
            <option :value="true">🟢 Aktif</option>
            <option :value="false">🔴 Pasif</option>
          </select>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button 
          type="button" 
          class="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-100 text-gray-700 border border-gray-200 px-6 py-3 text-sm font-semibold shadow-sm hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all duration-200 order-2 sm:order-1" 
          @click="$emit('cancel')"
        >
          <i class="fa fa-times"></i>
          <span>İptal</span>
        </button>
        <button 
          type="submit" 
          class="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-200 text-blue-700 px-6 py-3 text-sm font-medium hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200 order-1 sm:order-2"
        >
          <i class="fa fa-save"></i>
          <span>{{ warehouse ? 'Güncelle' : 'Kaydet' }}</span>
        </button>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Warehouse, WarehouseTypeOption, StatusOption, Project } from './types';

const props = defineProps<{
  warehouse?: Warehouse;
  warehouseTypes: WarehouseTypeOption[];
  statusOptions: StatusOption[];
  projects?: Project[];
}>();

const emit = defineEmits(['save', 'cancel']);

const form = ref<{
  id?: string;
  code: string;
  name: string;
  address: string;
  type: string;
  capacity: number | null;
  organizationId: string;
  isActive: boolean;
  projects: string[];
}>({
  id: undefined,
  code: '',
  name: '',
  address: '',
  type: '',
  capacity: null,
  organizationId: 'e5f759a4-21ce-477c-8369-b9f359a7bb8e',
  isActive: true,
  projects: [],
});

watch(() => props.warehouse, (val) => {
  if (val) {
    form.value = {
      id: val.id,
      code: val.code || '',
      name: val.name || '',
      address: val.address || '',
      type: val.type || '',
      capacity: val.capacity ?? null,
      organizationId: val.organizationId || 'e5f759a4-21ce-477c-8369-b9f359a7bb8e',
      isActive: val.isActive ?? true,
      projects: Array.isArray(val.projects) ? val.projects.map((p: any) => p.id) : [],
    };
  } else {
    form.value = {
      id: undefined,
      code: '',
      name: '',
      address: '',
      type: '',
      capacity: null,
      organizationId: 'e5f759a4-21ce-477c-8369-b9f359a7bb8e',
      isActive: true,
      projects: [],
    };
  }
}, { immediate: true });

function onSubmit() {
  emit('save', { ...form.value });
}
</script>
