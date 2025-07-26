<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
    <!-- Header -->
    <div class="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center gap-3">
        <div class="p-2 bg-primary-100 dark:bg-primary-900 rounded-xl">
          <i class="fa fa-plus text-primary-600 dark:text-primary-400 text-xl"></i>
        </div>
        <div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Yeni Stok Ekle</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300">Merkez depoya ürün ekleyin</p>
        </div>
      </div>
    </div>

    <!-- Form Content -->
    <form @submit.prevent="onSubmit" class="p-6 space-y-6">
      <!-- Product Selection Card -->
      <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-5 border border-blue-200 dark:border-blue-800">
        <div class="flex items-center gap-3 mb-4">
          <div class="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <i class="fa fa-box text-blue-600 dark:text-blue-400"></i>
          </div>
          <h4 class="text-lg font-semibold text-blue-900 dark:text-blue-100">Ürün Seçimi</h4>
          <span class="text-red-500 text-sm">*</span>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">Ürün</label>
            <select 
              v-model="form.productId" 
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
              required
            >
              <option value="">Ürün seçiniz...</option>
              <option v-for="product in products" :key="product.id" :value="product.id">
                {{ product.name || product.productName || product.title }}
              </option>
            </select>
          </div>

          <!-- Product Details -->
          <div v-if="selectedProduct" class="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
            <h5 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
              <i class="fa fa-info-circle mr-2 text-gray-500"></i>
              Ürün Detayları
            </h5>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Stok Kodu</label>
                <input 
                  type="text" 
                  :value="selectedProduct?.sku || 'Belirtilmemiş'" 
                  class="w-full px-3 py-2 text-sm bg-gray-100 dark:bg-gray-600 border border-gray-200 dark:border-gray-500 rounded-lg text-gray-700 dark:text-gray-300" 
                  readonly 
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Seri Numarası Gerekli</label>
                <span :class="isSerialized ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'" class="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium">
                  <i :class="isSerialized ? 'fa fa-exclamation-triangle' : 'fa fa-check'" class="mr-1"></i>
                  {{ isSerialized ? 'Gerekli' : 'Gerekli Değil' }}
                </span>
              </div>
              <div class="md:col-span-2">
                <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Açıklama</label>
                <textarea 
                  :value="selectedProduct?.description || 'Açıklama bulunmamaktadır'" 
                  class="w-full px-3 py-2 text-sm bg-gray-100 dark:bg-gray-600 border border-gray-200 dark:border-gray-500 rounded-lg text-gray-700 dark:text-gray-300" 
                  rows="2" 
                  readonly
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quantity and Status Card -->
      <div class="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-5 border border-green-200 dark:border-green-800">
        <div class="flex items-center gap-3 mb-4">
          <div class="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
            <i class="fa fa-sort-numeric-up text-green-600 dark:text-green-400"></i>
          </div>
          <h4 class="text-lg font-semibold text-green-900 dark:text-green-100">Miktar ve Durum</h4>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-green-700 dark:text-green-300 mb-2">
              Miktar <span class="text-red-500">*</span>
            </label>
            <input 
              v-model.number="form.quantity" 
              type="number" 
              min="1"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200" 
              placeholder="Adet giriniz..." 
              required 
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-green-700 dark:text-green-300 mb-2">
              Stok Durumu <span class="text-red-500">*</span>
            </label>
            <select 
              v-model="form.status" 
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200" 
              required
            >
              <option value="DEPO">Depoda</option>
              <option value="IN_STOCK">Stokta</option>
              <option value="RESERVED">Rezerve</option>
              <option value="OUT_OF_STOCK">Stok Dışı</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Warehouse Card -->
      <div class="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-5 border border-purple-200 dark:border-purple-800">
        <div class="flex items-center gap-3 mb-4">
          <div class="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
            <i class="fa fa-warehouse text-purple-600 dark:text-purple-400"></i>
          </div>
          <h4 class="text-lg font-semibold text-purple-900 dark:text-purple-100">Depo Bilgisi</h4>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-purple-700 dark:text-purple-300 mb-2">Hedef Depo</label>
          <div class="flex items-center gap-3 p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
            <div class="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <i class="fa fa-warehouse text-purple-600 dark:text-purple-400"></i>
            </div>
            <div>
              <p class="font-medium text-gray-900 dark:text-gray-100">{{ centralWarehouseName }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">Merkez depo (otomatik)</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Serial Numbers Card -->
      <div class="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl p-5 border border-orange-200 dark:border-orange-800">
        <div class="flex items-center gap-3 mb-4">
          <div class="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
            <i class="fa fa-barcode text-orange-600 dark:text-orange-400"></i>
          </div>
          <h4 class="text-lg font-semibold text-orange-900 dark:text-orange-100">Seri Numaraları</h4>
          <span v-if="isSerialized" class="text-red-500 text-sm">*</span>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-orange-700 dark:text-orange-300 mb-2">
            Seri Numaraları {{ isSerialized ? '(Zorunlu)' : '(Opsiyonel)' }}
          </label>
          <textarea
            v-model="form.serialNumbers"
            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
            rows="3"
            :placeholder="isSerialized ? 'Seri numaralarını virgül ile ayırarak giriniz (örn: SN001, SN002, SN003)' : 'Bu ürün için seri numarası gerekmemektedir'"
            :required="isSerialized"
            :disabled="!isSerialized"
            :class="{ 'opacity-50 cursor-not-allowed': !isSerialized }"
          ></textarea>
          <div v-if="isSerialized" class="mt-2 text-xs text-orange-600 dark:text-orange-300">
            <i class="fa fa-info-circle mr-1"></i>
            Seri numarası sayısı, belirtilen miktar ile eşleşmelidir.
          </div>
          <div v-if="isSerialized && serialError" class="mt-2 text-red-500 text-sm flex items-center">
            <i class="fa fa-exclamation-triangle mr-2"></i>
            Seri numarası zorunlu!
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button 
          type="reset" 
          class="btn btn-danger"
          @click="resetForm"
        >
          <i class="fa fa-eraser"></i>
          Temizle
        </button>
        <button
          type="submit"
          class="btn btn-success"
          :disabled="loading || !form.productId"
        >
          <div v-if="loading" class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
          <i v-else class="fa fa-plus"></i>
          <span v-if="loading">Ekleniyor...</span>
          <span v-else>Stok Ekle</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">

import { ref, onMounted, watch } from 'vue';
import { addCentralStockItem, getProducts, getProjects } from '../api/center-stock-api';
import Swal from 'sweetalert2';

const emit = defineEmits(['success']);


const form = ref({
  productId: '',
  quantity: 1,
  serialNumbers: '',
  isConsignment: false,
  status: 'DEPO',
  currentWarehouseId: '',
  projectId: null,
});
const projects = ref<any[]>([]);


const products = ref<any[]>([]);
const selectedProduct = ref<any>(null);
const warehouses = ref<any[]>([]);
const centralWarehouseId = ref('');
const centralWarehouseName = ref('Merkez Depo');
const isSerialized = ref(false);
const serialError = ref(false);
const loading = ref(false); // Yüklenme durumu

async function getWarehouses() {
  const token = localStorage.getItem('token');
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/warehouses`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  warehouses.value = data.data ? data.data.filter((w:any) => w.type === 'CENTRAL') : [];
  if (warehouses.value.length > 0) {
    // Eğer sadece bir merkez depo varsa otomatik seçili yap
    centralWarehouseId.value = warehouses.value[0].id;
    if (!form.value.currentWarehouseId) {
      form.value.currentWarehouseId = centralWarehouseId.value;
    }
    centralWarehouseName.value = warehouses.value[0].name || 'Merkez Depo';
  }
}

function resetForm() {
  const staticWarehouseId = 'd9e8390a-2631-445c-be22-14846a3f3bb1';
  form.value = {
    productId: '',
    quantity: 1,
    serialNumbers: '',
    isConsignment: false,
    status: 'DEPO',
    currentWarehouseId: staticWarehouseId,
    projectId: null,
  };
  selectedProduct.value = null;
  isSerialized.value = false;
  serialError.value = false;
}

onMounted(async () => {
  loading.value = true;
  products.value = await getProducts();
  projects.value = await getProjects();
  await getWarehouses();
  loading.value = false;
});

// Ürün seçimi değiştiğinde isSerialized güncelle
watch(
  () => form.value.productId,
  (val) => {
    const selected = products.value.find((p: any) => p.id === val);
    selectedProduct.value = selected || null;
    isSerialized.value = !!selected?.isSerialized;
    // Seri numarası alanını temizle ve hata sıfırla
    if (!isSerialized.value) {
      form.value.serialNumbers = '';
      serialError.value = false;
    }
  }
);



async function onSubmit() {
  // getWarehouses tamamlanmadan veya id yoksa submit engelle
  // Sabit merkez depo id'si ile test
  const staticWarehouseId = 'd9e8390a-2631-445c-be22-14846a3f3bb1';
  form.value.currentWarehouseId = staticWarehouseId;
  if (!form.value.currentWarehouseId) return;

  // isSerialized ise seri numarası zorunlu
  if (isSerialized.value && !form.value.serialNumbers.trim()) {
    serialError.value = true;
    await Swal.fire({
      icon: 'error',
      title: 'Hata!',
      text: 'Seri numarası zorunludur!',
      padding: '2em',
      customClass: { popup: 'sweet-alerts' },
      confirmButtonText: 'Tamam'
    });
    return;
  }
  serialError.value = false;

  loading.value = true;


  let items: any[] = [];
  if (isSerialized.value) {
    // Girilen seri numaralarını diziye çevir
    const serials = form.value.serialNumbers.split(',').map((s: string) => s.trim()).filter(Boolean);
    if (serials.length !== form.value.quantity) {
      serialError.value = true;
      loading.value = false;
      await Swal.fire({
        icon: 'error',
        title: 'Hata!',
        text: 'Seri numarası sayısı miktar ile eşleşmiyor!',
        padding: '2em',
        customClass: { popup: 'sweet-alerts' },
        confirmButtonText: 'Tamam'
      });
      return;
    }
    // Her bir serial için ayrı item oluştur
    items = serials.map((serial: string) => ({
      productId: form.value.productId,
      quantity: 1,
      isConsignment: form.value.isConsignment,
      status: form.value.status,
      currentWarehouseId: staticWarehouseId,
      serialNumber: serial,
      projectId: form.value.projectId || null
    }));
  } else {
    // Seri bazlı değilse tek item, quantity kadar
    items = [{
      productId: form.value.productId,
      quantity: form.value.quantity,
      isConsignment: form.value.isConsignment,
      status: form.value.status,
      currentWarehouseId: staticWarehouseId,
      serialNumber: null,
      projectId: form.value.projectId || null
    }];
  }

  const payload = {
    warehouseId: staticWarehouseId,
    items
  };

  console.log('STOK EKLE PAYLOAD:', payload);
  try {
    await addCentralStockItem(payload);
    emit('success');
    // currentWarehouseId merkez depo olarak kalmalı
    form.value = { productId: '', quantity: 1, serialNumbers: '', isConsignment: false, status: 'DEPO', currentWarehouseId: staticWarehouseId, projectId: null };
  } catch (error: any) {
    // Hata durumunda SweetAlert ile uyarı göster
    await Swal.fire({
      icon: 'error',
      title: 'Hata!',
      text: 'Stok eklenirken bir hata oluştu: ' + (error?.message || 'Bilinmeyen hata'),
      padding: '2em',
      customClass: { popup: 'sweet-alerts' },
      confirmButtonText: 'Tamam'
    });
  } finally {
    loading.value = false;
  }
}
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

/* Primary color definitions */
.from-primary-50 { --tw-gradient-from: #eff6ff; }
.to-blue-50 { --tw-gradient-to: #eff6ff; }
.bg-primary-100 { background-color: #dbeafe; }
.bg-primary-900 { background-color: #1e3a8a; }
.text-primary-600 { color: #2563eb; }
.text-primary-400 { color: #60a5fa; }
.bg-primary-500 { background-color: #3b82f6; }
.bg-primary-700 { background-color: #1d4ed8; }
.bg-primary-600 { background-color: #2563eb; }
.bg-primary-800 { background-color: #1e40af; }
.focus\:ring-primary-500:focus { 
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5); 
}
.focus\:border-primary-500:focus { 
  border-color: #3b82f6; 
}
.focus\:ring-primary-400:focus { 
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.5); 
}

/* Dark mode adjustments */
:global(.dark) .from-gray-900 { --tw-gradient-from: #111827; }
:global(.dark) .to-gray-800 { --tw-gradient-to: #1f2937; }
:global(.dark) .bg-primary-900 { background-color: #1e3a8a; }
:global(.dark) .text-primary-400 { color: #60a5fa; }

/* Card gradients */
.from-blue-50 { --tw-gradient-from: #eff6ff; }
.to-indigo-50 { --tw-gradient-to: #eef2ff; }
.from-blue-900\/20 { --tw-gradient-from: rgba(30, 58, 138, 0.2); }
.to-indigo-900\/20 { --tw-gradient-to: rgba(49, 46, 129, 0.2); }

.from-green-50 { --tw-gradient-from: #f0fdf4; }
.to-emerald-50 { --tw-gradient-to: #ecfdf5; }
.from-green-900\/20 { --tw-gradient-from: rgba(20, 83, 45, 0.2); }
.to-emerald-900\/20 { --tw-gradient-to: rgba(6, 78, 59, 0.2); }

.from-purple-50 { --tw-gradient-from: #faf5ff; }
.to-pink-50 { --tw-gradient-to: #fdf2f8; }
.from-purple-900\/20 { --tw-gradient-from: rgba(88, 28, 135, 0.2); }
.to-pink-900\/20 { --tw-gradient-to: rgba(131, 24, 67, 0.2); }

.from-orange-50 { --tw-gradient-from: #fff7ed; }
.to-amber-50 { --tw-gradient-to: #fffbeb; }
.from-orange-900\/20 { --tw-gradient-from: rgba(154, 52, 18, 0.2); }
.to-amber-900\/20 { --tw-gradient-to: rgba(120, 53, 15, 0.2); }

/* Enhanced transitions */
.transition-colors {
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* Button hover effects */
button:hover {
  transform: translateY(-1px);
}

button:disabled {
  transform: none !important;
  opacity: 0.5;
  cursor: not-allowed;
}

/* Form input enhancements */
input:focus, select:focus, textarea:focus {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15), 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Card shadows */
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Color text definitions */
.text-blue-700 { color: #1d4ed8; }
.text-blue-300 { color: #93c5fd; }
.text-green-700 { color: #15803d; }
.text-green-300 { color: #86efac; }
.text-purple-700 { color: #7c3aed; }
.text-purple-300 { color: #c4b5fd; }
.text-orange-700 { color: #c2410c; }
.text-orange-300 { color: #fdba74; }

/* Border colors */
.border-blue-200 { border-color: #bfdbfe; }
.border-green-200 { border-color: #bbf7d0; }
.border-purple-200 { border-color: #e9d5ff; }
.border-orange-200 { border-color: #fed7aa; }

:global(.dark) .border-blue-800 { border-color: #1e40af; }
:global(.dark) .border-green-800 { border-color: #166534; }
:global(.dark) .border-purple-800 { border-color: #6b21a8; }
:global(.dark) .border-orange-800 { border-color: #9a3412; }

/* Disabled state styling */
.opacity-50 {
  opacity: 0.5;
}

.cursor-not-allowed {
  cursor: not-allowed;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .grid-cols-1.md\:grid-cols-2 {
    grid-template-columns: 1fr;
  }
  
  .px-6 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
