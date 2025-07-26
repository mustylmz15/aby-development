<template>
  <div>
    <!-- Başlık ve Navigasyon -->
    <div class="panel mb-5 bg-white dark:bg-gray-900 rounded-2xl shadow p-8">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h5 class="font-bold text-2xl dark:text-white mb-2 tracking-tight">Yeni Ürün Ekle</h5>
          <p class="text-gray-500 dark:text-gray-400 text-base">Sisteme yeni bir ürün ekleyin ve kategori bilgilerini belirleyin</p>
        </div>
        <router-link to="/inventory/products" class="btn btn-outline-primary rounded-xl border border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900 transition-all duration-200 px-4 py-2 flex items-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Geri Dön
        </router-link>
      </div>
    </div>
    <!-- Ana Form -->
    <div class="panel bg-white dark:bg-gray-900 rounded-2xl shadow p-8">
      <form class="space-y-8" @submit.prevent="onSubmit">
        <ProductFormBasic :model="form" :unit-options="unitOptions" />
        <ProductFormCategory :model="form" :category-options="categoryOptions" :sub-category-options="subCategoryOptions" />
        <ProductFormTracking :model="form" />

        <!-- Ek Bilgiler Paneli -->
        <div class="border border-gray-200 dark:border-gray-700 rounded-2xl p-8 bg-gray-50 dark:bg-gray-800 shadow-sm">
          <h3 class="text-xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight">Ek Bilgiler</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- parentId (Üst Ürün) 
            <div>
              <label class="block text-base font-semibold mb-3 text-gray-700 dark:text-gray-200">Üst Ürün (parentId)</label>
              <input v-model="form.parentId" type="text" class="form-input rounded-xl border-gray-300 dark:border-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900 px-4 py-2 transition-all duration-200 shadow-sm" placeholder="Üst ürün ID veya adı" />
            </div>-->
            <div>
              <label class="block text-base font-semibold mb-3 text-gray-700 dark:text-gray-200">Marka</label>
              <input v-model="form.brand" type="text" class="form-input rounded-xl border-gray-300 dark:border-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900 px-4 py-2 transition-all duration-200 shadow-sm" placeholder="Marka giriniz" />
            </div>
            <div>
              <label class="block text-base font-semibold mb-3 text-gray-700 dark:text-gray-200">Model</label>
              <input v-model="form.model" type="text" class="form-input rounded-xl border-gray-300 dark:border-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900 px-4 py-2 transition-all duration-200 shadow-sm" placeholder="Model giriniz" />
            </div>
             <!-- Konsinye mi ? 
            <div class="flex items-center mt-6">
              <input v-model="form.isConsumable" type="checkbox" id="isConsumable" class="form-checkbox h-5 w-5 text-primary" />
              <label for="isConsumable" class="ml-2 text-base font-medium text-gray-700 dark:text-gray-200">Tüketilebilir mi (isConsumable)</label>
            </div>
            -->
            <div>
              <label class="block text-base font-semibold mb-3 text-gray-700 dark:text-gray-200">Minimum stok seviyesi</label>
              <input v-model.number="form.minimumStock" type="number" min="0" class="form-input rounded-xl border-gray-300 dark:border-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900 px-4 py-2 transition-all duration-200 shadow-sm" placeholder="Minimum stok seviyesi" />
            </div>
            <div class="flex items-center mt-6">
              <input v-model="form.isActive" type="checkbox" id="isActive" class="form-checkbox h-5 w-5 text-primary" />
              <label for="isActive" class="ml-2 text-base font-medium text-gray-700 dark:text-gray-200">Aktif mi</label>
            </div>
            <!-- createdAt, updatedAt kaldırıldı -->
          </div>
          <!-- specifications (JSON veya key-value) 
          <div class="mt-6">
            <label class="block text-base font-semibold mb-3 text-gray-700 dark:text-gray-200">Özellikler (specifications, JSON)</label>
            <textarea :value="specificationsString" @input="(e) => onSpecInput(e)" class="form-textarea rounded-xl border-gray-300 dark:border-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900 px-4 py-2 transition-all duration-200 shadow-sm" rows="3" placeholder='{"anahtar": "değer"}'></textarea>
            <div v-if="specError" class="text-red-500 text-xs mt-1">Geçersiz JSON formatı!</div>
          </div>-->
        </div>
        <!-- Ek Bilgiler Paneli Sonu -->

        <ProductFormActions @cancel="onCancel" />
      </form>
    </div>
    <!-- Success/Error Notification -->
    <div v-if="notification" class="fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg bg-green-100 border border-green-400 text-green-700">
      <div class="flex items-center">
        <span class="flex-1">{{ notification }}</span>
        <button class="ml-4 text-lg font-bold" @click="notification = ''">&times;</button>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import ProductFormBasic from './product-components/ProductFormBasic.vue';
import ProductFormCategory from './product-components/ProductFormCategory.vue';
import { useCategoryOptions } from '../categories/category-components/useCategoryOptions';
import ProductFormTracking from './product-components/ProductFormTracking.vue';
import ProductFormActions from './product-components/ProductFormActions.vue';
import type { ProductFormModel } from './product-components/product-form.model';

const router = useRouter();
const route = useRoute();
const form = ref<ProductFormModel>({
  id: undefined,
  parentId: null,
  sku: '',
  name: '',
  description: '',
  category: '',
  brand: '',
  model: '',
  isSerialized: false,
  isConsumable: false,
  unitOfMeasure: '',
  minimumStock: null,
  specifications: {},
  isActive: true,
  // createdAt ve updatedAt kaldırıldı (backend otomatik atar)
});

// Dinamik seçenekler
const unitOptions = ref<string[]>([]);
const { categoryOptions } = useCategoryOptions();
const subCategoryOptions = ref<string[]>([]);
const notification = ref('');

// specifications alanı için string <-> object dönüşümü
const specificationsString = ref(JSON.stringify(form.value.specifications || {}, null, 2));
const specError = ref(false);

function onSpecInput(e: Event) {
  const val = (e.target as HTMLTextAreaElement).value;
  specificationsString.value = val;
  try {
    form.value.specifications = val ? JSON.parse(val) : {};
    specError.value = false;
  } catch {
    specError.value = true;
  }
}

// form.specifications değişirse textarea güncelle (dışarıdan güncelleme olursa)
watch(() => form.value.specifications, (val) => {
  nextTick(() => {
    specificationsString.value = JSON.stringify(val || {}, null, 2);
  });
});

// API'den sadece birim ve alt kategori seçenekleri çekilecek
const fetchOptions = async () => {
  try {
    // Birim seçenekleri (örnek endpoint: /api/v1/units)
    const unitRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/units`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    if (unitRes.ok) unitOptions.value = await unitRes.json();

    // Alt kategori seçenekleri (örnek endpoint: /api/v1/subcategories)
    const subCatRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/subcategories`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    if (subCatRes.ok) subCategoryOptions.value = await subCatRes.json();
  } catch (e) {
    // Hata durumunda statik bırak
  }
};

onMounted(async () => {
  await fetchOptions();
  // Eğer düzenleme modunda ve id varsa ürünü API'den çek
  if (route.query.edit === '1' && route.query.id) {
    const token = localStorage.getItem('token');
    const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
    const res = await fetch(`${baseUrl}/api/v1/products/${route.query.id}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      }
    });
    if (res.ok) {
      const data = await res.json();
      Object.assign(form.value, data);
    }
  }
});


const onSubmit = async () => {
  try {
    const token = localStorage.getItem('token');
    const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
    let url = `${baseUrl}/api/v1/products`;
    let method = 'POST';
    if (route.query.edit === '1' && route.query.id) {
      url = `${baseUrl}/api/v1/products/${route.query.id}`;
      method = 'PUT';
    }
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify({
        sku: form.value.sku,
        name: form.value.name,
        description: form.value.description,
        category: form.value.category,
        brand: form.value.brand,
        model: form.value.model,
        isSerialized: form.value.isSerialized,
        isConsumable: form.value.isConsumable,
        // unitOfMeasure alanı gönderilmiyor
        minimumStock: form.value.minimumStock,
        specifications: form.value.specifications,
        isActive: form.value.isActive
      })
    });
    if (res.ok) {
      notification.value = method === 'POST' ? 'Ürün başarıyla eklendi!' : 'Ürün başarıyla güncellendi!';
      setTimeout(() => router.push('/inventory/products'), 1500);
    } else {
      const err = await res.json();
      notification.value = err.message || 'Bir hata oluştu!';
    }
  } catch (e) {
    notification.value = 'Sunucu hatası!';
  }
};

const onCancel = () => {
  router.push('/inventory/products');
};
</script>

<style scoped>
.tab-item a.active {
    border-color: var(--primary);
    color: var(--primary);
    border-bottom-color: var(--primary);
}
</style>
