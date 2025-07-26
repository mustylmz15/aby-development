<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
    <div class="flex items-center gap-3 mb-6">
      <div class="p-3 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl shadow-lg">
        <i class="fa fa-exchange-alt text-white text-xl"></i>
      </div>
      <div>
        <h4 class="text-xl font-bold text-gray-900 dark:text-gray-100">Transfer Bilgileri</h4>
        <p class="text-sm text-gray-600 dark:text-gray-300 font-medium">Stok transfer işlemi için gerekli bilgileri doldurun</p>
      </div>
    </div>

    <form class="space-y-6" @submit.prevent="handleTransfer">
      <!-- Kaynak Depo -->
      <div class="space-y-2">
        <label class="text-sm font-bold text-gray-800 dark:text-gray-100">Kaynak Depo</label>
        <select 
          v-model="form.sourceWarehouseId" 
          class="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 focus:border-primary-500 focus:ring-4 focus:ring-primary-200 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
          required
        >
          <option value="" disabled>Depo Seçiniz</option>
          <option v-for="warehouse in warehouses" :key="warehouse.id" :value="warehouse.id">
            {{ warehouse.name }} ({{ warehouse.id }})
          </option>
        </select>
        <div v-if="sourceWarehouseWarning" class="flex items-center gap-2 text-red-600 text-sm">
          <i class="fa fa-exclamation-triangle"></i>
          <span>{{ sourceWarehouseWarning }}</span>
        </div>
      </div>

      <!-- Hedef Depo -->
      <div class="space-y-2">
        <label class="text-sm font-bold text-gray-800 dark:text-gray-100">Hedef Depo</label>
        <select 
          v-model="form.targetWarehouseId" 
          class="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 focus:border-primary-500 focus:ring-4 focus:ring-primary-200 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
          required
        >
          <option value="" disabled>Hedef Depo Seçiniz</option>
          <option v-for="warehouse in targetWarehouses" :key="warehouse.id + '-target'" :value="warehouse.id">
            {{ warehouse.name }} ({{ warehouse.id }})
          </option>
        </select>
      </div>

      <!-- Ürün Seçimi -->
      <div class="space-y-2">
        <label class="text-sm font-bold text-gray-800 dark:text-gray-100">Ürün</label>
        <select 
          v-model="form.productId" 
          class="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 focus:border-primary-500 focus:ring-4 focus:ring-primary-200 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
          required
        >
          <option value="" disabled>Ürün Seçiniz</option>
          <option v-for="product in products" :key="product.id" :value="product.id">
            {{ product.name }}
          </option>
        </select>

        <!-- Ürün Detayları -->
        <div v-if="selectedProduct" class="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
          <h5 class="font-bold text-gray-900 dark:text-gray-100 mb-3">Ürün Detayları</h5>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-300">Stok Kodu:</span>
              <span class="font-bold text-gray-900 dark:text-gray-100">{{ selectedProduct.sku }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-300">Ürün Adı:</span>
              <span class="font-bold text-gray-900 dark:text-gray-100">{{ selectedProduct.name }}</span>
            </div>
            <div class="flex justify-between col-span-2">
              <span class="text-gray-600 dark:text-gray-300">Açıklama:</span>
              <span class="font-bold text-gray-900 dark:text-gray-100">{{ selectedProduct.description || '-' }}</span>
            </div>
          </div>

          <!-- Seri Numarası Seçimi -->
          <div v-if="selectedProduct.isSerialized" class="mt-4">
            <label class="text-sm font-bold text-gray-800 dark:text-gray-100 mb-2 block">
              Seri Numarası Seçimi
              <span class="text-xs text-gray-500 font-normal ml-2">({{ serialNumbers.length }} adet mevcut)</span>
            </label>
            <div class="border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 max-h-64 overflow-hidden relative">
              <!-- Scrollable Liste Container -->
              <div class="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800 p-3">
                <div v-if="serialNumbers.length === 0" class="text-center py-6 text-gray-500 dark:text-gray-400">
                  <i class="fa fa-info-circle text-2xl mb-2"></i>
                  <p class="text-sm">Bu ürün için bu depoda seri numarası bulunamadı.</p>
                </div>
                <div v-else>
                  <div v-for="(s, index) in serialNumbers" :key="s" class="flex items-center justify-between py-2 px-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-150">
                    <div class="flex items-center gap-3">
                      <span class="text-xs text-gray-400 font-mono min-w-[2rem]">{{ String(index + 1).padStart(2, '0') }}</span>
                      <span class="text-sm font-medium text-gray-900 dark:text-gray-100 font-mono">{{ s }}</span>
                    </div>
                    <button 
                      type="button" 
                      class="px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 min-w-[4rem]" 
                      :class="selectedSerialNumbers.includes(s) 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 cursor-default' 
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/30'"
                      @click="addSerialNumber(s)" 
                      :disabled="selectedSerialNumbers.includes(s)"
                    >
                      <i v-if="selectedSerialNumbers.includes(s)" class="fa fa-check mr-1"></i>
                      {{ selectedSerialNumbers.includes(s) ? 'Seçildi' : 'Ekle' }}
                    </button>
                  </div>
                </div>
              </div>
              
              <!-- Scroll İndikatörü -->
              <div v-if="serialNumbers.length > 8" class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-t from-gray-200 to-transparent dark:from-gray-700 pointer-events-none"></div>
            </div>

            <!-- Seçilen Seri Numaraları -->
            <div v-if="selectedSerialNumbers.length" class="mt-3">
              <div class="text-sm font-bold text-gray-800 dark:text-gray-100 mb-2">
                Seçilen Seri Numaraları:
                <span class="text-xs text-green-600 dark:text-green-400 font-normal ml-1">({{ selectedSerialNumbers.length }} adet)</span>
              </div>
              <div class="border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700/50 max-h-32 overflow-hidden">
                <div class="max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800 p-3">
                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="s in selectedSerialNumbers" 
                      :key="s" 
                      class="inline-flex items-center gap-2 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded-full px-3 py-1 text-xs font-semibold transition-all duration-200 hover:bg-green-200 dark:hover:bg-green-900/30"
                    >
                      <span class="font-mono">{{ s }}</span>
                      <button 
                        type="button" 
                        class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-bold hover:scale-110 transition-transform duration-150" 
                        @click="removeSerialNumber(s)"
                        title="Seri numarasını kaldır"
                      >
                        ×
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">Birden fazla seri numarası seçebilirsiniz.</p>
          </div>

          <!-- Miktar (Seri numarasız ürünler için) -->
          <div v-else class="mt-4">
            <label class="text-sm font-bold text-gray-800 dark:text-gray-100 mb-2 block">Miktar</label>
            <input 
              type="number" 
              v-model="form.quantity" 
              class="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 focus:border-primary-500 focus:ring-4 focus:ring-primary-200 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200" 
              placeholder="Miktar giriniz" 
              min="1" 
              required
            />
          </div>
        </div>
      </div>

      <!-- Konsinye Checkbox
      <div class="flex items-center gap-3">
        <input 
          type="checkbox" 
          v-model="form.isConsignment" 
          id="isConsignment" 
          class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
        />
        <label for="isConsignment" class="text-sm font-medium text-gray-700 dark:text-gray-300">Konsinye Transfer</label>
      </div>
        -->
      <!-- Açıklama -->
      <div class="space-y-2">
        <label class="text-sm font-bold text-gray-800 dark:text-gray-100">Açıklama</label>
        <textarea 
          v-model="form.note" 
          rows="3"
          class="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 focus:border-primary-500 focus:ring-4 focus:ring-primary-200 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 transition-all duration-200" 
          placeholder="Opsiyonel açıklama yazabilirsiniz..."
        ></textarea>
      </div>

      <!-- Form Actions -->
      <div class="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button 
          type="button" 
          class="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-200 text-gray-700 px-6 py-3 text-sm font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-200 order-2 sm:order-1" 
          @click="resetForm"
        >
          <i class="fa fa-times"></i>
          <span>Temizle</span>
        </button>
        <button 
          type="submit" 
          class="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-200 text-emerald-700 px-6 py-3 text-sm font-medium hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-colors duration-200 order-1 sm:order-2"
          :disabled="isSubmitting"
        >
          <i v-if="isSubmitting" class="fa fa-spinner fa-spin"></i>
          <i v-else class="fa fa-exchange-alt"></i>
          <span>{{ isSubmitting ? 'Transfer Ediliyor...' : 'Transfer Et' }}</span>
        </button>
      </div>
    </form>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { fetchAllStocks, fetchWarehouses, fetchProducts, transferStock } from '../api/stock-transfer-api';
import Swal from 'sweetalert2';

// State
const isSubmitting = ref(false);

// Form sıfırlama fonksiyonu
function resetForm() {
  form.value = {
    sourceWarehouseId: '',
    targetWarehouseId: '',
    productId: '',
    quantity: 1,
    selectedSerialNumbers: [],
    isConsignment: false,
    note: ''
  };
  selectedProduct.value = null;
  serialNumbers.value = [];
  selectedSerialNumbers.value = [];
  sourceWarehouseWarning.value = '';
  
  // Hedef depo listesini sıfırla - tüm depoları göster
  targetWarehouses.value = [...allTargetWarehouses.value];
  
  // Ürün listesini sıfırla - tüm ürünleri göster
  products.value = [...allProducts.value];
}

// Transfer işlemini başlatan fonksiyon
async function handleTransfer() {
  // Basit validasyonlar
  if (!form.value.sourceWarehouseId || !form.value.targetWarehouseId) {
    await Swal.fire({
      title: 'Hata!',
      text: 'Kaynak ve hedef depo seçilmelidir.',
      icon: 'error',
      confirmButtonText: 'Tamam',
      confirmButtonColor: '#dc3545',
      padding: '2em',
      customClass: { popup: 'sweet-alerts' }
    });
    return;
  }
  if (!form.value.productId) {
    await Swal.fire({
      title: 'Hata!',
      text: 'Ürün seçilmelidir.',
      icon: 'error',
      confirmButtonText: 'Tamam',
      confirmButtonColor: '#dc3545',
      padding: '2em',
      customClass: { popup: 'sweet-alerts' }
    });
    return;
  }
  if (form.value.sourceWarehouseId === form.value.targetWarehouseId) {
    await Swal.fire({
      title: 'Hata!',
      text: 'Kaynak ve hedef depo aynı olamaz.',
      icon: 'error',
      confirmButtonText: 'Tamam',
      confirmButtonColor: '#dc3545',
      padding: '2em',
      customClass: { popup: 'sweet-alerts' }
    });
    return;
  }
  if (selectedProduct.value && selectedProduct.value.isSerialized && selectedSerialNumbers.value.length === 0) {
    await Swal.fire({
      title: 'Hata!',
      text: 'Seri numarası seçmelisiniz.',
      icon: 'error',
      confirmButtonText: 'Tamam',
      confirmButtonColor: '#dc3545',
      padding: '2em',
      customClass: { popup: 'sweet-alerts' }
    });
    return;
  }
  if (!selectedProduct.value?.isSerialized && (!form.value.quantity || form.value.quantity < 1)) {
    await Swal.fire({
      title: 'Hata!',
      text: 'Geçerli bir miktar giriniz.',
      icon: 'error',
      confirmButtonText: 'Tamam',
      confirmButtonColor: '#dc3545',
      padding: '2em',
      customClass: { popup: 'sweet-alerts' }
    });
    return;
  }

  // Transfer onayı SweetAlert
  const result = await Swal.fire({
    title: 'Transfer Onayı',
    text: 'Bu stok transferini gerçekleştirmek istediğinizden emin misiniz?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Evet, Transfer Et',
    cancelButtonText: 'İptal',
    confirmButtonColor: '#10b981',
    cancelButtonColor: '#6b7280',
    padding: '2em',
    customClass: { popup: 'sweet-alerts' }
  });

  if (!result.isConfirmed) {
    return;
  }

  isSubmitting.value = true;

  // Transfer payload'unu hazırla (serili ürünlerde gerçek stok item ID'si gönderilmeli)
  let items: { stockUnitId: string, quantity: number }[] = [];
  if (selectedProduct.value?.isSerialized) {
    items = selectedSerialNumbers.value.map(sn => {
      const stockItem = depoStocks.value.find(s =>
        s.serialNumber === sn &&
        s.productId === form.value.productId &&
        s.currentWarehouseId === form.value.sourceWarehouseId
      );
      return stockItem ? { stockUnitId: stockItem.id, quantity: 1 } : null;
    }).filter(Boolean) as { stockUnitId: string, quantity: number }[];
    if (items.length === 0) {
      await Swal.fire({
        title: 'Hata!',
        text: 'Seçilen seri numaralarına ait stok bulunamadı!',
        icon: 'error',
        confirmButtonText: 'Tamam',
        confirmButtonColor: '#dc3545',
        padding: '2em',
        customClass: { popup: 'sweet-alerts' }
      });
      isSubmitting.value = false;
      return;
    }
  } else {
    items = [{ stockUnitId: form.value.productId, quantity: form.value.quantity }];
  }

  try {
    await transferStock({
      sourceWarehouseId: form.value.sourceWarehouseId,
      targetWarehouseId: form.value.targetWarehouseId,
      requestedBy: localStorage.getItem('userId') || 'frontend-user',
      items
    });
    
    await Swal.fire({
      title: 'Başarılı!',
      text: 'Stok transferi başarıyla tamamlandı!',
      icon: 'success',
      confirmButtonText: 'Tamam',
      confirmButtonColor: '#10b981',
      padding: '2em',
      customClass: { popup: 'sweet-alerts' }
    });
    
    // Formu sıfırla
    resetForm();
  } catch (e: any) {
    await Swal.fire({
      title: 'Hata!',
      text: 'Transfer sırasında hata oluştu: ' + (e?.response?.data?.message || e.message || e),
      icon: 'error',
      confirmButtonText: 'Tamam',
      confirmButtonColor: '#dc3545',
      padding: '2em',
      customClass: { popup: 'sweet-alerts' }
    });
  } finally {
    isSubmitting.value = false;
  }
}

const form = ref({
  sourceWarehouseId: '',
  targetWarehouseId: '',
  productId: '',
  quantity: 1,
  selectedSerialNumbers: [] as string[],
  isConsignment: false,
  note: ''
});
const warehouses = ref<{ id: string, name: string }[]>([]);
const targetWarehouses = ref<{ id: string, name: string }[]>([]); // Hedef depolar için ayrı liste
const allTargetWarehouses = ref<{ id: string, name: string }[]>([]); // Tüm hedef depolar (filtrelenmemiş)
const depoStocks = ref<any[]>([]);
const sourceWarehouseWarning = ref('');
const products = ref<any[]>([]);
const allProducts = ref<any[]>([]); // Tüm ürünler (filtrelenmemiş)
const productMap = ref<Record<string, any>>({});
const selectedProduct = ref<any>(null);
const serialNumbers = ref<string[]>([]);
const selectedSerialNumbers = ref<string[]>([]);

onMounted(async () => {
  const stocks = await fetchAllStocks();
  depoStocks.value = stocks.filter((s: any) => s.status === 'DEPO');
  
  // Kaynak depolar için normal API
  const allWarehouses = await fetchWarehouses();
  warehouses.value = allWarehouses.map((w: any) => ({ id: w.id, name: w.name }));

  // Hedef depolar için özel API
  await fetchTargetWarehouses();

  // Ürünleri çek ve map oluştur
  const allProductsData = await fetchProducts();
  productMap.value = {};
  allProductsData.forEach((p: any) => { productMap.value[p.id] = p; });
  allProducts.value = allProductsData;
  products.value = allProductsData; // İlk başta tüm ürünleri göster
});

// Hedef depolar için API çağrısı
async function fetchTargetWarehouses() {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token bulunamadı');
      return;
    }

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/warehouses/onlydepo`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // API response yapısına göre adjust et
    const warehousesArray = Array.isArray(data) ? data : (data.data || []);
    allTargetWarehouses.value = warehousesArray.map((w: any) => ({ 
      id: w.id, 
      name: w.name || w.warehouseName || w.title 
    }));
    
    // İlk yüklemede tüm hedef depoları göster
    targetWarehouses.value = [...allTargetWarehouses.value];
    
    console.log('Hedef depolar yüklendi:', allTargetWarehouses.value);
  } catch (error) {
    console.error('Hedef depolar yüklenirken hata:', error);
    // Hata durumunda normal depoları kullan
    allTargetWarehouses.value = [...warehouses.value];
    targetWarehouses.value = [...warehouses.value];
  }
}

watch(() => form.value.sourceWarehouseId, (newVal) => {
  // Hedef depo listesini güncelle - kaynak depoyu çıkar
  if (newVal) {
    targetWarehouses.value = allTargetWarehouses.value.filter(w => w.id !== newVal);
    
    // Eğer hedef depo olarak kaynak depo seçilmişse, temizle
    if (form.value.targetWarehouseId === newVal) {
      form.value.targetWarehouseId = '';
    }

    // Sadece seçilen depodaki ürünleri göster
    const warehouseProductIds = depoStocks.value
      .filter(s => s.currentWarehouseId === newVal)
      .map(s => s.productId);
    
    // Benzersiz ürün ID'lerini al
    const uniqueProductIds = [...new Set(warehouseProductIds)];
    
    // Ürün listesini filtrele
    products.value = allProducts.value.filter(p => uniqueProductIds.includes(p.id));
    
    // Eğer seçili ürün artık listede yoksa, temizle
    if (form.value.productId && !uniqueProductIds.includes(form.value.productId)) {
      form.value.productId = '';
      selectedProduct.value = null;
      serialNumbers.value = [];
      selectedSerialNumbers.value = [];
      form.value.selectedSerialNumbers = [];
    }
  } else {
    // Kaynak depo seçilmemişse tüm hedef depoları ve ürünleri göster
    targetWarehouses.value = [...allTargetWarehouses.value];
    products.value = [...allProducts.value];
  }

  if (!newVal) {
    sourceWarehouseWarning.value = '';
    serialNumbers.value = [];
    selectedSerialNumbers.value = [];
    form.value.selectedSerialNumbers = [];
    return;
  }
  
  const hasStock = depoStocks.value.some((s: any) => s.currentWarehouseId === newVal);
  sourceWarehouseWarning.value = hasStock ? '' : 'Bu depoda stok bulunmamaktadır!';
  
  // Ürün seçilmişse ve seri numaralıysa, seri numaralarını güncelle
  if (form.value.productId && selectedProduct.value?.isSerialized) {
    updateSerialNumbers();
  }
});

watch(() => form.value.productId, (newVal) => {
  if (!newVal) {
    selectedProduct.value = null;
    serialNumbers.value = [];
    selectedSerialNumbers.value = [];
    form.value.selectedSerialNumbers = [];
    return;
  }
  selectedProduct.value = productMap.value[newVal] || null;
  if (selectedProduct.value && selectedProduct.value.isSerialized) {
    // Kaynak depo seçilmişse sadece o depodaki stokları göster
    updateSerialNumbers();
  } else {
    serialNumbers.value = [];
    selectedSerialNumbers.value = [];
    form.value.selectedSerialNumbers = [];
  }
});

// Seri numaralarını güncelleyen yardımcı fonksiyon
function updateSerialNumbers() {
  if (!form.value.productId || !selectedProduct.value?.isSerialized) {
    serialNumbers.value = [];
    selectedSerialNumbers.value = [];
    form.value.selectedSerialNumbers = [];
    return;
  }
  
  // Sadece seçilen kaynak depodaki ürünleri filtrele
  const filteredStocks = depoStocks.value.filter((s: any) => 
    s.productId === form.value.productId && 
    s.serialNumber &&
    (!form.value.sourceWarehouseId || s.currentWarehouseId === form.value.sourceWarehouseId)
  );
  
  serialNumbers.value = filteredStocks.map((s: any) => s.serialNumber);
  
  // Mevcut seçimleri kontrol et - kaynak depo değişmişse geçersiz olanları kaldır
  const validSerialNumbers = selectedSerialNumbers.value.filter(sn => 
    serialNumbers.value.includes(sn)
  );
  
  if (validSerialNumbers.length !== selectedSerialNumbers.value.length) {
    selectedSerialNumbers.value = validSerialNumbers;
    form.value.selectedSerialNumbers = [...validSerialNumbers];
  }
}

function addSerialNumber(sn: string) {
  if (!selectedSerialNumbers.value.includes(sn)) {
    selectedSerialNumbers.value.push(sn);
    form.value.selectedSerialNumbers = [...selectedSerialNumbers.value];
  }
}

function removeSerialNumber(sn: string) {
  selectedSerialNumbers.value = selectedSerialNumbers.value.filter(s => s !== sn);
  form.value.selectedSerialNumbers = [...selectedSerialNumbers.value];
}
</script>

<style scoped>
/* Özel Scrollbar Stilleri */
.scrollbar-thin {
  scrollbar-width: thin;
}

.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  @apply bg-gray-100 dark:bg-gray-800 rounded-full;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  @apply bg-gray-300 dark:bg-gray-600 rounded-full;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400 dark:bg-gray-500;
}

.scrollbar-thumb-gray-300::-webkit-scrollbar-thumb {
  @apply bg-gray-300;
}

.scrollbar-track-gray-100::-webkit-scrollbar-track {
  @apply bg-gray-100;
}

.dark .scrollbar-thumb-gray-600::-webkit-scrollbar-thumb {
  @apply bg-gray-600;
}

.dark .scrollbar-track-gray-800::-webkit-scrollbar-track {
  @apply bg-gray-800;
}

/* Firefox scrollbar stilleri */
.scrollbar-thin {
  scrollbar-color: rgb(209 213 219) rgb(243 244 246);
}

.dark .scrollbar-thin {
  scrollbar-color: rgb(75 85 99) rgb(31 41 55);
}
</style>
