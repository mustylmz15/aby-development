<template>
  <div>
    <!-- Seçili Depo Bilgisi - En Üstte -->
    <div v-if="selectedWarehouse && selectedWarehouseData" class="mb-4 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-700">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="p-2 bg-emerald-500 rounded-lg shadow-lg">
            <i class="fa fa-warehouse text-white"></i>
          </div>
          <div>
            <h3 class="font-bold text-gray-900 dark:text-white">{{ selectedWarehouseData.name }}</h3>
            <div class="flex items-center gap-3 mt-1 text-xs text-gray-600 dark:text-gray-300">
              <span class="flex items-center gap-1">
                <i class="fa fa-map-marker-alt text-red-500"></i>
                {{ selectedWarehouseData.city }}
              </span>
              <span class="flex items-center gap-1">
                <i class="fa fa-tag text-blue-500"></i>
                {{ getWarehouseTypeLabel(selectedWarehouseData.type) }}
              </span>
            </div>
          </div>
        </div>
        
        <!-- İstatistik Özetleri -->
        <div class="flex items-center gap-4">
          <div class="text-center">
            <div class="text-lg font-bold text-gray-900 dark:text-white">{{ totalItems }}</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">Toplam</div>
          </div>
          <div class="text-center">
            <div class="text-lg font-bold text-green-600">{{ availableItems }}</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">Mevcut</div>
          </div>
          <div class="text-center">
            <div class="text-lg font-bold text-yellow-600">{{ reservedItems }}</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">Rezerve</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filtreleme Alanı -->
    <div class="bg-white dark:bg-gray-800 rounded-t-2xl shadow-lg border border-gray-100 dark:border-gray-700 border-b-0 p-6">
      <div class="grid grid-cols-1 gap-4" :class="isWarehouseUser ? 'md:grid-cols-4' : 'md:grid-cols-5'">
        <!-- Depo Seçimi - Sadece admin/yönetici için göster -->
        <div v-if="!isWarehouseUser">
          <label class="block text-sm font-bold text-gray-800 dark:text-gray-100 mb-2">
            <i class="fa fa-warehouse mr-2 text-emerald-600"></i>
            Depo Seçin
          </label>
          <select 
            :value="selectedWarehouse" 
            @change="$emit('warehouse-change', ($event.target as HTMLSelectElement).value)"
            class="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
          >
            <option value="">Depo seçiniz...</option>
            <option v-for="warehouse in warehouses" :key="warehouse.id" :value="warehouse.id">
              {{ warehouse.name }} - {{ warehouse.city }}
            </option>
          </select>
        </div>

        <!-- Depo personeli için bilgi kartı -->
        <div v-else class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-blue-500 rounded-lg">
              <i class="fa fa-user-tag text-white text-sm"></i>
            </div>
            <div>
              <h4 class="font-semibold text-blue-900 dark:text-blue-100 text-sm">Atanmış Deponuz</h4>
              <p class="text-blue-700 dark:text-blue-300 text-xs font-medium">
                {{ assignedWarehouseName }}
              </p>
            </div>
          </div>
        </div>
        
        <!-- Durum Filtresi -->
        <div>
          <label class="block text-sm font-bold text-gray-800 dark:text-gray-100 mb-2">
            <i class="fa fa-info-circle mr-2 text-blue-600"></i>
            Stok Durumu
          </label>
          <select 
            :value="selectedStatus" 
            @change="$emit('status-change', ($event.target as HTMLSelectElement).value)"
            class="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
          >
            <option value="">Tüm Durumlar</option>
            <option value="DEPO">Depoda</option>
            <option value="AVAILABLE">Mevcut</option>
            <option value="RESERVED">Rezerve</option>
            <option value="IN_TRANSIT">Transfer Halinde</option>
            <option value="IN_REPAIR">Onarımda</option>
            <option value="DAMAGED">Hasarlı</option>
          </select>
        </div>
        
        <!-- Arama -->
        <div>
          <label class="block text-sm font-bold text-gray-800 dark:text-gray-100 mb-2">
            <i class="fa fa-search mr-2 text-purple-600"></i>
            Ürün Ara
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="fa fa-search text-gray-400"></i>
            </div>
            <input 
              :value="searchTerm"
              @input="$emit('search-change', ($event.target as HTMLInputElement).value)"
              type="text"
              placeholder="Ürün adı veya kodu..."
              class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 transition-all duration-200"
            />
          </div>
        </div>
        
        <!-- Temizle Butonu -->
        <div class="flex items-end">
          <button 
            @click="$emit('clear-filters')"
            class="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-4 py-3 text-sm font-bold hover:bg-orange-200 dark:hover:bg-orange-900/50 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200"
          >
            <i class="fa fa-broom"></i>
            <span>Temizle</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Warehouse {
  id: string
  name: string
  city: string
  type: string
  address?: string
}

interface Props {
  selectedWarehouse: string
  selectedStatus: string
  searchTerm: string
  warehouses: Warehouse[]
  isWarehouseUser: boolean
  assignedWarehouseName: string
  selectedWarehouseData: Warehouse | undefined
  totalItems: number
  availableItems: number
  reservedItems: number
}

defineProps<Props>()

defineEmits<{
  'warehouse-change': [value: string]
  'status-change': [value: string] 
  'search-change': [value: string]
  'clear-filters': []
}>()

const getWarehouseTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    'CENTRAL': 'Merkez Depo',
    'STANDARD': 'Standart Depo', 
    'REPAIR': 'Onarım Merkezi',
    'FIELD': 'Saha Depo',
    'TRANSIT': 'Transfer Deposu'
  }
  return labels[type] || type
}
</script>
