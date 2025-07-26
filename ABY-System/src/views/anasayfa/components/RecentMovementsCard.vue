<template>
  <div class="panel">
    <div class="flex items-center justify-between mb-5">
      <h5 class="font-semibold text-lg dark:text-white-light">Son Hareketler</h5>
      <router-link to="/inventory/movements" class="text-primary text-sm hover:underline">Tümünü Gör</router-link>
    </div>
    <!-- Scroll container - maksimum yükseklik 300px -->
    <div class="space-y-3 max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
      <div v-for="item in recentMovements" :key="item.id" class="flex items-center space-x-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
        <div class="flex flex-col items-center">
          <div :class="[
            'w-2 h-2 rounded-full',
            getMovementTypeClass(item.type)
          ]"></div>
          <span class="text-xs text-gray-400 dark:text-gray-500 mt-1 font-medium">
            {{ getMovementTypeAbbreviation(item.type) }}
          </span>
        </div>
        <div class="flex-1">
          <p class="text-sm font-medium">{{ item.product }} {{ getMovementTypeText(item.type) }}</p>
          <div class="flex items-center justify-between text-xs text-gray-500">
            <div class="flex items-center space-x-1">
              <span>{{ getSourceWarehouse(item) }}</span>
              <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
              <span>{{ getTargetWarehouse(item) }}</span>
            </div>
            <span class="text-xs text-gray-400">{{ formatDateTime(item.time) }}</span>
          </div>
        </div>
        <span :class="[
          'badge text-xs',
          getMovementBadgeClass(item.type)
        ]">
          {{ item.amount }}
        </span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
interface RecentMovement {
  id: string
  type: string
  product: string
  warehouse: string
  sourceWarehouse?: string
  targetWarehouse?: string
  time: string
  amount: number
}

defineProps<{ recentMovements: RecentMovement[] }>()

// Hareket türüne göre CSS class'ını döndür
const getMovementTypeClass = (type: string) => {
  switch (type) {
    case 'ARIZA':
      return 'bg-danger'
    case 'ONARIMDA':
      return 'bg-warning'
    case 'GIRIS':
      return 'bg-success'
    case 'CIKIS':
      return 'bg-primary'
    case 'TRANSFER':
      return 'bg-info'
    default:
      return 'bg-secondary'
  }
}

// Hareket türüne göre metin döndür
const getMovementTypeText = (type: string) => {
  switch (type) {
    case 'ARIZA':
      return 'Arıza Bildirimi'
    case 'ONARIMDA':
      return 'Onarımda'
    case 'GIRIS':
      return 'Giriş'
    case 'CIKIS':
      return 'Çıkış'
    case 'TRANSFER':
      return 'Transfer'
    default:
      return type
  }
}

// Hareket türüne göre kısaltma döndür
const getMovementTypeAbbreviation = (type: string) => {
  switch (type) {
    case 'ARIZA':
      return 'ARZ'
    case 'ONARIMDA':
      return 'ONR'
    case 'GIRIS':
      return 'GRS'
    case 'CIKIS':
      return 'CKS'
    case 'TRANSFER':
      return 'TRF'
    default:
      return type.substring(0, 3)
  }
}

// Kaynak depo bilgisini döndür
const getSourceWarehouse = (item: RecentMovement) => {
  if (item.type === 'TRANSFER' && item.sourceWarehouse) {
    return item.sourceWarehouse
  }
  if (item.type === 'CIKIS') {
    return item.warehouse
  }
  return item.warehouse
}

// Hedef depo bilgisini döndür
const getTargetWarehouse = (item: RecentMovement) => {
  if (item.type === 'TRANSFER' && item.targetWarehouse) {
    return item.targetWarehouse
  }
  if (item.type === 'GIRIS') {
    return item.warehouse
  }
  if (item.type === 'CIKIS') {
    return 'Dış'
  }
  return item.warehouse
}

// Tarih ve saat formatını düzenle
const formatDateTime = (timeString: string) => {
  try {
    const date = new Date(timeString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    const dateStr = date.toLocaleDateString('tr-TR')
    const timeStr = date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
    
    if (date.toDateString() === today.toDateString()) {
      return `Bugün ${timeStr}`
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Dün ${timeStr}`
    } else {
      return `${dateStr} ${timeStr}`
    }
  } catch (e) {
    return timeString
  }
}

// Hareket türüne göre badge class'ını döndür
const getMovementBadgeClass = (type: string) => {
  switch (type) {
    case 'ARIZA':
      return 'badge-outline-danger'
    case 'ONARIMDA':
      return 'badge-outline-warning'
    case 'GIRIS':
      return 'badge-outline-success'
    case 'CIKIS':
      return 'badge-outline-primary'
    case 'TRANSFER':
      return 'badge-outline-info'
    default:
      return 'badge-outline-secondary'
  }
}
</script>
