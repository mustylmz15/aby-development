<template>
  <div class="mb-4 flex gap-4 flex-nowrap overflow-x-auto items-center bg-white dark:bg-gray-900 rounded-xl shadow p-4">
    <input
      v-model="filters.skuOrName"
      type="text"
      class="form-input rounded-xl border-gray-300 dark:border-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900 px-4 py-2 transition-all duration-200 shadow-sm"
      placeholder="Ürün adı veya kodu..."
    />
    <select v-model="filters.category" class="form-select rounded-xl border-gray-300 dark:border-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900 px-4 py-2 transition-all duration-200 shadow-sm">
      <option value="">Tüm Kategoriler</option>
      <option v-for="cat in categories" :key="cat.id || cat" :value="cat.name || cat">{{ cat.name || cat }}</option>
    </select>
    <select v-model="filters.brand" class="form-select rounded-xl border-gray-300 dark:border-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900 px-4 py-2 transition-all duration-200 shadow-sm">
      <option value="">Tüm Markalar</option>
      <option v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</option>
    </select>
    <select v-model="filters.isActive" class="form-select rounded-xl border-gray-300 dark:border-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900 px-4 py-2 transition-all duration-200 shadow-sm">
      <option value="">Tümü</option>
      <option :value="true">Aktif</option>
      <option :value="false">Pasif</option>
    </select>
    <button
      class="inline-flex items-center gap-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm font-semibold shadow-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
      @click="onClear"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
      Temizle
    </button>
    <button
      class="inline-flex items-center gap-2 rounded-full bg-blue-100 dark:bg-gray-200 text-gray-500 px-5 py-2 text-sm font-bold shadow-lg hover:from-primary-600 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all duration-200"
      @click="onFilterClick">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-7 7V21a1 1 0 01-2 0v-7.293l-7-7A1 1 0 013 6V4z" /></svg>
      Filtrele
    </button>
  </div>
</template>
<style scoped>
.flex-nowrap {
  flex-wrap: nowrap !important;
}
.form-input, .form-select {
  min-width: 180px;
  /* Modern görünüm için ekstra padding ve border-radius tailwind ile sağlanıyor */
}
</style>
<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue';
const props = defineProps<{ categories: any[], brands?: string[] }>();
const emit = defineEmits(['filter']);

const filters = ref({
  skuOrName: '',
  category: '',
  brand: '',
  isActive: ''
});

function onClear() {
  filters.value = { skuOrName: '', category: '', brand: '', isActive: '' };
  emit('filter', filters.value);
}

function onFilterClick() {
  emitFilter();
}

function emitFilter() {
  // isActive değerini uygun tipe çevir
  let isActiveVal: boolean|string = filters.value.isActive;
  if (isActiveVal === 'true') isActiveVal = true;
  else if (isActiveVal === 'false') isActiveVal = false;
  else if (isActiveVal === '') isActiveVal = '';
  // Yeni filtre objesi oluştur
  const filterObj = {
    ...filters.value,
    isActive: isActiveVal
  };
  emit('filter', filterObj);
}

// Dinamik filtreleme için watcher (tüm filtreler için)
watch(
  () => [filters.value.skuOrName, filters.value.category, filters.value.brand, filters.value.isActive],
  () => {
    emitFilter();
  }
);
</script>
