<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          Ürün - Alt Parça İlişkilendirme
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">
          Ürünlere alt parça atayarak onarım süreçlerini yönetin
        </p>
      </div>
      <div class="flex items-center space-x-3">
        <button
          @click="handleRefresh"
          :disabled="loading"
          class="btn btn-outline-primary"
          title="Listeleri yenile"
        >
          <IconRefresh class="w-4 h-4 mr-2" :class="{ 'animate-spin': loading }" />
          {{ loading ? 'Yenileniyor...' : 'Yenile' }}
        </button>
        <button
          @click="handleSave"
          :disabled="!selectedProduct || selectedSubParts.length === 0 || saving"
          class="btn btn-success"
        >
          <IconSave class="w-4 h-4 mr-2" />
          {{ saving ? 'Ekleniyor...' : 'Alt Parça Ekle' }}
        </button>
      </div>
    </div>

    <!-- İlişkilendirme Formu -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Ürün Seçimi -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center gap-3 mb-4">
          <div class="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <IconBox class="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Ana Ürün Seçimi</h3>
        </div>

        <!-- Ürün Arama -->
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ürün Ara
            </label>
            <div class="relative">
              <input
                v-model="productSearchTerm"
                type="text"
                placeholder="Ürün adı, SKU veya kodu ile ara..."
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                @input="filterProducts"
              />
              <IconSearch class="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <!-- Ürün Listesi -->
          <div class="border border-gray-300 dark:border-gray-600 rounded-lg max-h-80 overflow-y-auto">
            <div v-if="filteredProducts.length === 0" class="p-4 text-center text-gray-500 dark:text-gray-400">
              {{ productSearchTerm ? 'Arama kriterlerine uygun ürün bulunamadı' : 'Ürün bulunamadı' }}
            </div>
            <div
              v-for="product in filteredProducts"
              :key="product.id"
              @click="selectProduct(product)"
              class="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-200 dark:border-gray-600 last:border-b-0"
              :class="{
                'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800': selectedProduct?.id === product.id
              }"
            >
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="font-medium text-gray-900 dark:text-white">{{ product.name }}</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">SKU: {{ product.sku }}</p>
                  <p class="text-sm text-gray-500 dark:text-gray-500">{{ product.category || 'Kategori yok' }}</p>
                </div>
                <div v-if="selectedProduct?.id === product.id" class="text-blue-600 dark:text-blue-400">
                  <IconCheck class="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Seçili Ürün Bilgisi -->
        <div v-if="selectedProduct" class="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 class="font-medium text-blue-900 dark:text-blue-100 mb-2">Seçili Ürün</h4>
          <div class="space-y-1 text-sm">
            <p><span class="font-medium">Ad:</span> {{ selectedProduct.name }}</p>
            <p><span class="font-medium">SKU:</span> {{ selectedProduct.sku }}</p>
            <p><span class="font-medium">Kategori:</span> {{ selectedProduct.category || 'Yok' }}</p>
          </div>
        </div>
      </div>

      <!-- Alt Parça Seçimi -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center gap-3 mb-4">
          <div class="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <IconComponents class="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Alt Parça Seçimi</h3>
        </div>

        <!-- Alt Parça Arama -->
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Alt Parça Ara
              <span class="text-xs text-gray-500 dark:text-gray-400 font-normal">
                (Sadece "Alt Parçalar" kategorisindeki ürünler gösterilir)
              </span>
            </label>
            <div class="relative">
              <input
                v-model="subPartSearchTerm"
                type="text"
                placeholder="Alt parça adı, SKU veya kodu ile ara..."
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                @input="filterSubParts"
              />
              <IconSearch class="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <!-- Alt Parça Listesi -->
          <div class="border border-gray-300 dark:border-gray-600 rounded-lg max-h-80 overflow-y-auto">
            <div v-if="filteredSubParts.length === 0" class="p-4 text-center text-gray-500 dark:text-gray-400">
              {{ subPartSearchTerm ? 'Arama kriterlerine uygun alt parça bulunamadı' : 'Alt parça bulunamadı' }}
            </div>
            <div
              v-for="subPart in filteredSubParts"
              :key="subPart.id"
              @click="toggleSubPart(subPart)"
              class="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-200 dark:border-gray-600 last:border-b-0"
              :class="{
                'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800': isSubPartSelected(subPart.id)
              }"
            >
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="font-medium text-gray-900 dark:text-white">{{ subPart.name }}</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">SKU: {{ subPart.sku }}</p>
                  <p class="text-sm text-gray-500 dark:text-gray-500">{{ subPart.category || 'Kategori yok' }}</p>
                </div>
                <div class="flex items-center">
                  <input
                    type="checkbox"
                    :checked="isSubPartSelected(subPart.id)"
                    @click.stop="toggleSubPart(subPart)"
                    class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Seçili Alt Parçalar -->
        <div v-if="selectedSubParts.length > 0" class="mt-4">
          <h4 class="font-medium text-gray-900 dark:text-white mb-3">
            Seçili Alt Parçalar ({{ selectedSubParts.length }})
          </h4>
          <div class="space-y-2">
            <div
              v-for="subPart in selectedSubParts"
              :key="subPart.id"
              class="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800"
            >
              <div class="flex-1">
                <p class="text-sm font-medium text-green-900 dark:text-green-100">{{ subPart.name }}</p>
                <p class="text-xs text-green-700 dark:text-green-300">{{ subPart.sku }}</p>
              </div>
              <button
                @click="removeSubPart(subPart.id)"
                class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                title="Kaldır"
              >
                <IconX class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mevcut İlişkiler -->
    <div v-if="selectedProduct && existingRelations.length > 0" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          Mevcut Alt Parça İlişkileri
        </h3>
        <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
          {{ existingRelations.length }} Alt Parça
        </span>
      </div>
      
      <!-- Tablo -->
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left">
          <thead class="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" class="px-6 py-3 font-medium">Alt Parça Adı</th>
              <th scope="col" class="px-6 py-3 font-medium">SKU</th>
              <th scope="col" class="px-6 py-3 font-medium">Kategori</th>
              <th scope="col" class="px-6 py-3 font-medium">Durum</th>
              <th scope="col" class="px-6 py-3 font-medium text-center">İşlem</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr
              v-for="relation in existingRelations"
              :key="relation.id"
              class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <div>
                    <p class="font-medium text-gray-900 dark:text-white">
                      {{ relation.component?.name || 'Bilinmeyen Alt Parça' }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-gray-600 dark:text-gray-400">
                {{ relation.component?.sku || '-' }}
              </td>
              <td class="px-6 py-4 text-gray-600 dark:text-gray-400">
                {{ relation.component?.category || '-' }}
              </td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200">
                  <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Aktif
                </span>
              </td>
              <td class="px-6 py-4 text-center">
                <button
                  @click="removeExistingRelation(relation.id)"
                  class="inline-flex items-center px-3 py-1.5 border border-red-300 dark:border-red-600 text-red-700 dark:text-red-400 bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md text-xs font-medium transition-colors"
                  title="İlişkiyi Sil"
                >
                  <IconTrash class="w-3 h-3 mr-1" />
                  Sil
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Mevcut İlişki Yoksa Bilgi Mesajı -->
    <div v-else-if="selectedProduct && existingRelations.length === 0" class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-blue-800 dark:text-blue-200">
            Henüz Alt Parça İlişkisi Bulunmuyor
          </h3>
          <p class="text-sm text-blue-700 dark:text-blue-300 mt-1">
            Bu ürün için henüz tanımlanmış alt parça bulunmamaktadır. Yukarıdan alt parça seçerek ilişki kurabilirsiniz.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useMeta } from '@/composables/use-meta';
import Swal from 'sweetalert2';

// Icons
import IconRefresh from '@/components/icon/icon-refresh.vue';
import IconSave from '@/components/icon/icon-save.vue';
import IconBox from '@/components/icon/icon-box.vue';
import IconComponents from '@/components/icon/icon-components.vue';
import IconSearch from '@/components/icon/icon-search.vue';
import IconCheck from '@/components/icon/icon-check.vue';
import IconX from '@/components/icon/icon-x.vue';
import IconTrash from '@/components/icon/icon-trash.vue';

// Meta
useMeta({ title: 'Ürün - Alt Parça İlişkilendirme' });

// State
const loading = ref(false);
const saving = ref(false);

// Products
const products = ref<any[]>([]);
const productSearchTerm = ref('');
const filteredProducts = ref<any[]>([]);
const selectedProduct = ref<any>(null);

// Sub Parts
const subParts = ref<any[]>([]);
const subPartSearchTerm = ref('');
const filteredSubParts = ref<any[]>([]);
const selectedSubParts = ref<any[]>([]);

// Existing Relations
const existingRelations = ref<any[]>([]);

// API Base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// Auth Helper
const getAuthToken = () => {
  const token = localStorage.getItem('token');
  return token ? `Bearer ${token}` : '';
};

// API Functions
const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/products`, {
      headers: {
        'Authorization': getAuthToken(),
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      const allProducts = Array.isArray(data) ? data : (data.items || []);
      // Alt parça kategorisindeki ürünleri ana ürün listesinden çıkar
      products.value = allProducts.filter(product => 
        product.category !== 'Alt Parçalar' && 
        product.category !== 'Alt Parca' && 
        product.category !== 'alt-parca'
      );
      filteredProducts.value = [...products.value];
    }
  } catch (error) {
    console.error('Ürünler yüklenirken hata:', error);
    await Swal.fire({
      title: 'Hata!',
      text: 'Ürünler yüklenirken bir hata oluştu.',
      icon: 'error',
      confirmButtonText: 'Tamam'
    });
  }
};

const fetchSubParts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/products`, {
      headers: {
        'Authorization': getAuthToken(),
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      const allProducts = Array.isArray(data) ? data : (data.items || []);
      // "Alt Parçalar" kategorisindeki ürünleri filtrele
      subParts.value = allProducts.filter(product => 
        product.category === 'Alt Parçalar' || product.category === 'Alt Parca' || product.category === 'alt-parca'
      );
      filteredSubParts.value = [...subParts.value];
    }
  } catch (error) {
    console.error('Alt parçalar yüklenirken hata:', error);
    // Hata durumunda tüm ürünlerden alt parça kategorisini filtrele
    const allProducts = Array.isArray(products.value) ? products.value : [];
    subParts.value = allProducts.filter(product => 
      product.category === 'Alt Parçalar' || product.category === 'Alt Parca' || product.category === 'alt-parca'
    );
    filteredSubParts.value = [...subParts.value];
  }
};

const fetchExistingRelations = async (productId: string) => {
  if (!productId) {
    existingRelations.value = [];
    return;
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/products/${productId}/components`, {
      headers: {
        'Authorization': getAuthToken(),
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      existingRelations.value = Array.isArray(data) ? data : (data.items || []);
    }
  } catch (error) {
    console.error('Mevcut ilişkiler yüklenirken hata:', error);
    existingRelations.value = [];
  }
};

const saveRelations = async () => {
  if (!selectedProduct.value || selectedSubParts.value.length === 0) {
    await Swal.fire({
      title: 'Uyarı!',
      text: 'Lütfen bir ürün ve en az bir alt parça seçin.',
      icon: 'warning',
      confirmButtonText: 'Tamam'
    });
    return;
  }

  saving.value = true;
  try {
    const payload = selectedSubParts.value.map(sp => ({
      componentProductId: sp.id,
      quantity: 1,
      notes: ""
    }));

    // Her zaman POST metodu kullan
    const response = await fetch(`${API_BASE_URL}/api/v1/products/${selectedProduct.value.id}/add-component`, {
      method: 'POST',
      headers: {
        'Authorization': getAuthToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      await Swal.fire({
        title: 'Başarılı!',
        text: 'Alt parça ilişkileri başarıyla kaydedildi.',
        icon: 'success',
        confirmButtonText: 'Tamam'
      });
      
      // İlişkileri yenile
      await fetchExistingRelations(selectedProduct.value.id);
      selectedSubParts.value = [];
      // Alt parça listesini yeniden filtrele (çift ekleme önlemi için)
      filterSubParts();
    } else {
      throw new Error('Kaydetme işlemi başarısız');
    }
  } catch (error) {
    console.error('Kaydetme hatası:', error);
    await Swal.fire({
      title: 'Hata!',
      text: 'Alt parça ilişkileri kaydedilirken bir hata oluştu.',
      icon: 'error',
      confirmButtonText: 'Tamam'
    });
  } finally {
    saving.value = false;
  }
};

const removeExistingRelation = async (relationId: string) => {
  const result = await Swal.fire({
    title: 'Emin misiniz?',
    text: 'Bu alt parça ilişkisini silmek istediğinizden emin misiniz?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Evet, Sil',
    cancelButtonText: 'İptal',
    confirmButtonColor: '#dc3545'
  });

  if (!result.isConfirmed) return;

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/products/${selectedProduct.value.id}/components/${relationId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': getAuthToken()
      }
    });

    if (response.ok) {
      await Swal.fire({
        title: 'Başarılı!',
        text: 'Alt parça ilişkisi başarıyla silindi.',
        icon: 'success',
        confirmButtonText: 'Tamam'
      });
      
      // İlişkileri yenile
      if (selectedProduct.value) {
        await fetchExistingRelations(selectedProduct.value.id);
        // Alt parça listesini yeniden filtrele
        filterSubParts();
      }
    } else {
      throw new Error('Silme işlemi başarısız');
    }
  } catch (error) {
    console.error('Silme hatası:', error);
    await Swal.fire({
      title: 'Hata!',
      text: 'Alt parça ilişkisi silinirken bir hata oluştu.',
      icon: 'error',
      confirmButtonText: 'Tamam'
    });
  }
};

// Methods
const filterProducts = () => {
  const searchTerm = productSearchTerm.value.toLowerCase();
  filteredProducts.value = products.value.filter(product =>
    product.name?.toLowerCase().includes(searchTerm) ||
    product.sku?.toLowerCase().includes(searchTerm) ||
    product.code?.toLowerCase().includes(searchTerm) ||
    product.category?.toLowerCase().includes(searchTerm)
  );
};

const filterSubParts = () => {
  const searchTerm = subPartSearchTerm.value.toLowerCase();
  filteredSubParts.value = subParts.value.filter(subPart => {
    // Arama terimi kontrolü
    const matchesSearch = subPart.name?.toLowerCase().includes(searchTerm) ||
      subPart.sku?.toLowerCase().includes(searchTerm) ||
      subPart.code?.toLowerCase().includes(searchTerm);
    
    // Zaten seçili olanları ve mevcut ilişkileri çıkar
    const isNotSelected = !isSubPartSelected(subPart.id);
    const isNotInExistingRelations = !existingRelations.value.some(rel => 
      rel.component?.id === subPart.id || rel.componentId === subPart.id
    );
    
    return matchesSearch && isNotSelected && isNotInExistingRelations;
  });
};

const selectProduct = async (product: any) => {
  selectedProduct.value = product;
  selectedSubParts.value = [];
  await fetchExistingRelations(product.id);
  // Ürün değiştiğinde alt parça listesini yeniden filtrele
  filterSubParts();
};

const toggleSubPart = (subPart: any) => {
  const index = selectedSubParts.value.findIndex(sp => sp.id === subPart.id);
  if (index > -1) {
    selectedSubParts.value.splice(index, 1);
  } else {
    selectedSubParts.value.push(subPart);
  }
  // Seçimler değiştiğinde listeyi yeniden filtrele
  filterSubParts();
};

const isSubPartSelected = (subPartId: string) => {
  return selectedSubParts.value.some(sp => sp.id === subPartId);
};

const removeSubPart = (subPartId: string) => {
  selectedSubParts.value = selectedSubParts.value.filter(sp => sp.id !== subPartId);
  // Seçimler değiştiğinde listeyi yeniden filtrele
  filterSubParts();
};

const handleRefresh = async () => {
  loading.value = true;
  try {
    await Promise.all([
      fetchProducts(),
      fetchSubParts()
    ]);
    
    if (selectedProduct.value) {
      await fetchExistingRelations(selectedProduct.value.id);
    }
  } finally {
    loading.value = false;
  }
};

const handleSave = () => {
  saveRelations();
};

// Lifecycle
onMounted(async () => {
  loading.value = true;
  try {
    await Promise.all([
      fetchProducts(),
      fetchSubParts()
    ]);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-outline-primary {
  border: 1px solid #3b82f6;
  color: #3b82f6;
  background: transparent;
}

.btn-outline-primary:hover {
  background-color: #3b82f6;
  color: white;
}

.btn-success {
  background-color: #10b981;
  color: white;
  border: 1px solid #10b981;
}

.btn-success:hover {
  background-color: #059669;
  border-color: #059669;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
