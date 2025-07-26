<template>
  <div class="panel mb-5">
    <div class="flex items-center justify-between mb-4">
      <h2 class="font-semibold text-xl">Ürün Listesi</h2>
      <div class="flex items-center gap-3">
        <router-link
          to="/inventory/products/subparts"
          class="inline-flex items-center gap-2 rounded-lg bg-blue-500 text-white px-6 py-2 text-base font-semibold shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Alt Parça İlişkilendirme
        </router-link>
        <router-link
          to="/inventory/products/new"
          class="inline-flex items-center gap-2 rounded-lg bg-green-400 text-white px-6 py-2 text-base font-semibold shadow hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-200"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Yeni Ürün Ekle
        </router-link>
      </div>
    </div>
    <!-- Filtreleme Bileşeni -->
    <ProductFilter :categories="categories" :brands="brands" :subCategories="subCategories" :statusList="statusList" @filter="onFilter" />

    <!-- Ürün Listesi Bileşeni -->
    <ProductList :products="products" />

    <!-- Sayfalama Bileşeni -->
    <ProductPagination :pagination="pagination" @page-change="onPageChange" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ProductFilter from './product-components/ProductFilter.vue';
import { fetchCategories } from './product-components/category-api';
import ProductList from './product-components/ProductList.vue';
import ProductPagination from './product-components/ProductPagination.vue';

// Kategoriler veritabanından dinamik çekilecek
const categories = ref<string[]>([]);
const subCategories = ref(["Telefon", "Masa"]);
const statusList = ref([
  { value: '', label: 'Tümü' },
  { value: true, label: 'Aktif' },
  { value: false, label: 'Pasif' }
]);

const allProducts = ref<any[]>([]); // Tüm ürünler burada tutulacak
const products = ref<any[]>([]);    // Filtrelenmiş ürünler burada
const brands = ref<string[]>([]);
const pagination = ref({
  page: 1,
  pageSize: 10,
  total: 0,
});

const fetchProducts = async () => {
  // Token'ı localStorage'dan veya uygun yerden alın
  const token = localStorage.getItem('token');
  const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
  const url = `${baseUrl}/api/v1/products`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    }
  });
  if (res.ok) {
    const data = await res.json();
    const items = Array.isArray(data) ? data : (data.items || []);
    // Alt parça kategorisindeki ürünleri listeden çıkar
    const filteredItems = items.filter(item => 
      item.category !== 'Alt Parçalar' && 
      item.category !== 'Alt Parca' && 
      item.category !== 'alt-parca'
    );
    allProducts.value = filteredItems;
    products.value = filteredItems;
    pagination.value.total = filteredItems.length;
    // Markaları otomatik doldur
    brands.value = [...new Set(filteredItems.map((p: any) => p.brand).filter((b: any) => typeof b === 'string' && b))].map(b => String(b));
  } else {
    allProducts.value = [];
    products.value = [];
    brands.value = [];
    pagination.value.total = 0;
  }
};


const onFilter = (filterParams: any) => {
  let filtered = allProducts.value;
  // Dinamik filtreleme: stok numarası, ürün adı veya kodu
  if (filterParams.skuOrName) {
    const search = filterParams.skuOrName.toLowerCase();
    filtered = filtered.filter(p =>
      ((p.name || '') + (p.sku || '') + (p.stockNumber || '')).toLowerCase().includes(search)
    );
  }
  if (filterParams.category)
    filtered = filtered.filter(p => p.category === filterParams.category);
  if (filterParams.brand)
    filtered = filtered.filter(p => p.brand === filterParams.brand);
  if (filterParams.isActive !== '')
    filtered = filtered.filter(p => p.isActive === filterParams.isActive);
  products.value = filtered;
  pagination.value.page = 1;
  pagination.value.total = filtered.length;
};

const onPageChange = (page: number) => {
  pagination.value.page = page;
};

onMounted(async () => {
  await fetchProducts();
  // Kategorileri veritabanından çek
  const token = localStorage.getItem('token');
  const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
  categories.value = await fetchCategories(token, baseUrl);
});
</script>

<style scoped>
/* Gerekirse özel stiller eklenebilir */
 </style>

