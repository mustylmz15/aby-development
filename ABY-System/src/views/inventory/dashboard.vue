
<template>
  <div>
    <div class="panel">
      <div class="flex items-center justify-between mb-5">
        <h5 class="font-semibold text-lg dark:text-white-light">Stok Yönetimi Dashboard</h5>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
        <!-- Toplam Ürün Kartı (Dinamik) -->
        <div class="panel bg-gradient-to-r from-blue-500 to-blue-400">
          <div class="flex justify-between">
            <div class="text-white">
              <h5 class="text-2xl font-semibold">
                <span v-if="isProductLoading">...</span>
                <span v-else>{{ totalProductCount }}</span>
              </h5>
              <h6 class="font-semibold mb-0">Toplam Ürün</h6>
            </div>
            <div class="text-white">
              <i class="las la-box text-4xl"></i>
            </div>
          </div>
        </div>

        <!-- Toplam Kategori Kartı (Dinamik) -->
        <div class="panel bg-gradient-to-r from-green-500 to-green-400">
          <div class="flex justify-between">
            <div class="text-white">
              <h5 class="text-2xl font-semibold">{{ categories.length }}</h5>
              <h6 class="font-semibold mb-0">Toplam Kategori</h6>
            </div>
            <div class="text-white">
              <i class="las la-tags text-4xl"></i>
            </div>
          </div>
        </div>

        <!-- Toplam Depo Kartı (Dinamik) -->
        <div class="panel bg-gradient-to-r from-orange-500 to-orange-400">
          <div class="flex justify-between">
            <div class="text-white">
              <h5 class="text-2xl font-semibold">
                <span v-if="isWarehouseLoading">...</span>
                <span v-else>{{ totalWarehouseCount }}</span>
              </h5>
              <h6 class="font-semibold mb-0">Toplam Depo</h6>
            </div>
            <div class="text-white">
              <i class="las la-warehouse text-4xl"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-6 mb-6">
        <!-- Son Hareketler (Mock) -->
        <div class="panel h-full">
          <div class="flex items-center justify-between mb-5">
            <h5 class="font-semibold text-lg dark:text-white-light">Son Stok Hareketleri</h5>
            <router-link to="/inventory/movements" class="text-primary hover:underline">Tümünü Gör</router-link>
          </div>
          <div class="table-responsive">
            <table class="table-striped">
              <thead>
                <tr>
                  <th>Tarih</th>
                  <th>Ürün</th>
                  <th>Hareket Türü</th>
                  <th>Miktar</th>
                  <th>Depo</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(m, i) in lastMovements" :key="m.id || i">
                  <td>{{ m.date }}</td>
                  <td>{{ m.product }}</td>
                  <td>
                    <span
                      :class="[
                        'inline-block px-3 py-1 rounded-full font-semibold text-xs',
                        m.type === 'in' ? 'bg-green-100 text-green-800 border border-green-300' :
                        m.type === 'out' ? 'bg-red-100 text-red-800 border border-red-300' :
                        m.type === 'transfer' ? 'bg-blue-100 text-blue-800 border border-blue-300' :
                        'bg-gray-200 text-gray-900 border border-gray-300'
                      ]"
                    >
                      {{ movementTypeLabel(m.type) }}
                    </span>
                  </td>
                  <td>{{ m.amount }} {{ m.unit || 'adet' }}</td>
                  <td>{{ m.warehouse }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { fetchAllTransfers, fetchProducts, movementTypeLabel } from './movements/api/stock-transfer-api';

// Kullanıcı depo kontrolü
const userWarehouseId = ref<string | null>(null);
const isWarehouseUser = ref(false);

// Kullanıcının atanmış depo ID'sini al
const getUserWarehouseId = () => {
  try {
    const user = localStorage.getItem('user');
    if (!user) return null;
    
    const userObj = JSON.parse(user);
    const warehouseAssignment = userObj.assignments?.find((a: any) => 
      a.resourceType === 'WAREHOUSE' && a.role === 'DEPO_PERSONELI'
    );
    
    return warehouseAssignment?.resourceId || null;
  } catch (error) {
    console.error('Kullanıcı depo ID alınamadı:', error);
    return null;
  }
};

const movements = ref<any[]>([]); // API'den gelen transferler
const flatMovements = ref<any[]>([]); // Düzleştirilmiş hareketler
const isLoading = ref(false);
const error = ref<string | null>(null);
const productMap = ref<Record<string, string>>({});

// Kategoriler (hardcoded)
const categories = [
  { id: 1, name: 'Hareketli Kamera' },
  { id: 2, name: 'Sabit Kamera' },
  { id: 3, name: 'Kayıt Cihazı' },
  { id: 4, name: 'Lazer Kamera' },
  { id: 5, name: 'Termal Kamera' },
  { id: 6, name: 'Switch' },
  { id: 7, name: 'Geko' },
  { id: 8, name: 'Yaka Kamerası' },
  { id: 9, name: 'Alt Parçalar' },
];

// Toplam Ürün ve Depo için state
const totalProductCount = ref<number>(0);
const totalWarehouseCount = ref<number>(0);
const isProductLoading = ref(true);
const isWarehouseLoading = ref(true);

// Anasayfadaki gibi environment değişkeni ve Bearer token ile fetch fonksiyonu
function getAuthToken() {
  const token = localStorage.getItem('token');
  return token ? `Bearer ${token}` : '';
}

async function fetchDashboardSummary(warehouseId?: string) {
  try {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
    let API_URL = `${API_BASE_URL}/api/v1/dashboard/summary`;
    
    // Depo personeli ise warehouse parametresi ekle
    if (warehouseId) {
      API_URL += `?warehouseId=${warehouseId}`;
    }
    
    const authToken = getAuthToken();
    const response = await fetch(API_URL, {
      headers: {
        'Authorization': authToken,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const responseText = await response.text();
      throw new Error(`Invalid response format. Expected JSON, got: ${contentType}, body: ${responseText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Dashboard summary fetch error:', error);
    throw error;
  }
}

// Sadece toplam ürün ve depo sayısını çek
async function loadSummaryCounts() {
  isProductLoading.value = true;
  isWarehouseLoading.value = true;
  try {
    const summary = await fetchDashboardSummary(userWarehouseId.value || undefined);
    totalProductCount.value = summary?.stats?.totalStock || 0;
    
    // Depo personeli ise sadece 1 depo, yoksa toplam depo sayısı
    if (isWarehouseUser.value) {
      totalWarehouseCount.value = 1;
    } else {
      totalWarehouseCount.value = summary?.stats?.activeWarehouses || 0;
    }
  } catch (e) {
    totalProductCount.value = 0;
    totalWarehouseCount.value = isWarehouseUser.value ? 1 : 0;
    console.error('Dashboard summary error:', e);
  } finally {
    isProductLoading.value = false;
    isWarehouseLoading.value = false;
  }
}


// Transferleri ve ürünleri API'den çek, kullanıcının deposuna göre filtrele
async function loadMovements() {
  isLoading.value = true;
  error.value = null;
  try {
    // Ürünleri çek ve map oluştur
    const products = await fetchProducts();
    productMap.value = {};
    products.forEach((p: any) => {
      productMap.value[p.id] = p.name || p.productName || p.title || p.id;
    });
    
    // Transferleri çek
    const transfers = await fetchAllTransfers();
    movements.value = transfers;
    
    // Her transferin transferStockItems dizisini açıp, her item'ı ayrı hareket gibi göster
    let flat = transfers.flatMap((transfer: any, idx: number) => {
      return (transfer.transferStockItems || []).map((item: any, i: number) => {
        const productId = item.productId || item.stockItem?.productId || '';
        const productName = productMap.value[productId] || productId || '-';
        return {
          id: item.id || `${transfer.id || idx + 1}-${i + 1}`,
          date: item.createdAt || transfer.createdAt || '',
          product: productName,
          type: transfer.type || '',
          amount: item.quantity ?? '',
          unit: item.unit || 'adet',
          warehouse:
            (transfer.sourceWarehouse?.name || transfer.sourceWarehouseId || '') +
            (transfer.targetWarehouse ? ' → ' + (transfer.targetWarehouse?.name || transfer.targetWarehouseId || '') : ''),
          sourceWarehouseId: transfer.sourceWarehouseId,
          targetWarehouseId: transfer.targetWarehouseId
        };
      });
    });
    
    // Depo personeli ise sadece kendi deposuyla ilgili hareketleri filtrele
    if (isWarehouseUser.value && userWarehouseId.value) {
      flat = flat.filter(movement => 
        movement.sourceWarehouseId === userWarehouseId.value || 
        movement.targetWarehouseId === userWarehouseId.value
      );
    }
    
    // Tarihe göre azalan sırala (en yeni başta)
    flat.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    flatMovements.value = flat;
  } catch (e: any) {
    error.value = e?.message || 'Stok hareketleri alınamadı.';
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  // Kullanıcının depo atamasını kontrol et
  userWarehouseId.value = getUserWarehouseId();
  isWarehouseUser.value = !!userWarehouseId.value;
  
  // Verileri yükle
  loadMovements();
  loadSummaryCounts();
});

// Son hareketleri grupla ve topla
const lastMovements = computed(() => {
  // Önce flatMovements'i grupla
  const groupedMovements = new Map();
  
  flatMovements.value.forEach(movement => {
    // Gruplama anahtarı: ürün + hareket türü + depo bilgisi
    const key = `${movement.product}_${movement.type}_${movement.warehouse}`;
    
    if (groupedMovements.has(key)) {
      // Varsa miktarı topla
      const existing = groupedMovements.get(key);
      existing.amount = (parseFloat(existing.amount) || 0) + (parseFloat(movement.amount) || 0);
      // En son tarihi kullan
      if (movement.date > existing.date) {
        existing.date = movement.date;
      }
    } else {
      // Yoksa yeni ekle
      groupedMovements.set(key, {
        ...movement,
        amount: parseFloat(movement.amount) || 0
      });
    }
  });
  
  // Map'i array'e çevir, tarihe göre sırala ve ilk 5'ini al
  return Array.from(groupedMovements.values())
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    .slice(0, 5);
});

</script>