<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Onay Merkezi</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">Bekleyen onayları yönetin ve inceleyin</p>
      </div>
      
      <!-- Tarih Filtresi -->
      <div class="flex items-center gap-3">
        <div class="relative">
          <input
            v-model="dateFilter.start"
            type="date"
            class="form-input w-40"
            placeholder="Başlangıç"
          />
        </div>
        <span class="text-gray-400">-</span>
        <div class="relative">
          <input
            v-model="dateFilter.end"
            type="date"
            class="form-input w-40"
            placeholder="Bitiş"
          />
        </div>
        <button
          @click="resetDateFilter"
          class="btn btn-outline-secondary"
          title="Filtreyi temizle"
        >
          <i class="fa fa-times"></i>
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div v-if="!initialLoading" class="grid grid-cols-1 md:grid-cols-3 gap-6" :class="{ 'md:grid-cols-1 max-w-2x1 mx-auto': isDepoPersoneli || isOnarimPersoneli }">
      <!-- Arızalı Ürün Onayları - ONARIM_PERSONELI için göster, DEPO_PERSONELI için gizle -->
      <div 
        v-if="!isDepoPersoneli"
        @click="setActiveTab('fault')"
        :class="[
          'relative cursor-pointer transition-all duration-300 transform hover:scale-105',
          activeTab === 'fault' 
            ? 'ring-2 ring-red-500 shadow-lg' 
            : 'hover:shadow-md'
        ]"
      >
        <div class="panel !p-0 border-0 bg-gradient-to-r from-red-500 to-red-600 text-white">
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                  <i class="fa fa-exclamation-triangle text-2xl"></i>
                </div>
                <div>
                  <h3 class="text-lg font-semibold">Arızalı Ürünler</h3>
                  <p class="text-red-100 text-sm">Onarım onayları</p>
                </div>
              </div>
              <div class="text-right">
                <div class="text-2xl font-bold">{{ faultCount }}</div>
                <div class="text-red-100 text-xs">Bekleyen</div>
              </div>
            </div>
            
            <!-- Progress Bar -->
            <div class="bg-white/20 rounded-full h-2">
              <div 
                class="bg-white rounded-full h-2 transition-all duration-500"
                :style="{ width: faultCount > 0 ? '100%' : '0%' }"
              ></div>
            </div>
          </div>
          
          <!-- Active Indicator -->
          <div 
            v-if="activeTab === 'fault'"
            class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-white rounded-t-lg"
          ></div>
        </div>
      </div>

      <!-- Onarım Dönüş Onayları - DEPO_PERSONELI için göster, ONARIM_PERSONELI için gizle -->
      <div 
        v-if="!isOnarimPersoneli" 
        @click="setActiveTab('repair')"
        :class="[
          'relative cursor-pointer transition-all duration-300 transform hover:scale-105',
          activeTab === 'repair' 
            ? 'ring-2 ring-blue-500 shadow-lg' 
            : 'hover:shadow-md'
        ]"
      >
        <div class="panel !p-0 border-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                  <i class="fa fa-tools text-2xl"></i>
                </div>
                <div>
                  <h3 class="text-lg font-semibold">Onarım Dönüşü</h3>
                  <p class="text-blue-100 text-sm">Depoya iade onayları</p>
                </div>
              </div>
              <div class="text-right">
                <div class="text-2xl font-bold">{{ repairCount }}</div>
                <div class="text-blue-100 text-xs">Bekleyen</div>
              </div>
            </div>
            
            <!-- Progress Bar -->
            <div class="bg-white/20 rounded-full h-2">
              <div 
                class="bg-white rounded-full h-2 transition-all duration-500"
                :style="{ width: repairCount > 0 ? '100%' : '0%' }"
              ></div>
            </div>
          </div>
          
          <!-- Active Indicator -->
          <div 
            v-if="activeTab === 'repair'"
            class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-white rounded-t-lg"
          ></div>
        </div>
      </div>

      <!-- Transfer Onayları - DEPO_PERSONELI ve ONARIM_PERSONELI için gizle -->
      <div 
        v-if="!isDepoPersoneli && !isOnarimPersoneli"
        @click="setActiveTab('transfer')"
        :class="[
          'relative cursor-pointer transition-all duration-300 transform hover:scale-105',
          activeTab === 'transfer' 
            ? 'ring-2 ring-green-500 shadow-lg' 
            : 'hover:shadow-md'
        ]"
      >
        <div class="panel !p-0 border-0 bg-gradient-to-r from-green-500 to-green-600 text-white">
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                  <i class="fa fa-exchange-alt text-2xl"></i>
                </div>
                <div>
                  <h3 class="text-lg font-semibold">Depo Transferi</h3>
                  <p class="text-green-100 text-sm">Transfer onayları</p>
                </div>
              </div>
              <div class="text-right">
                <div class="text-2xl font-bold">{{ transferCount }}</div>
                <div class="text-green-100 text-xs">Bekleyen</div>
              </div>
            </div>
            
            <!-- Progress Bar -->
            <div class="bg-white/20 rounded-full h-2">
              <div 
                class="bg-white rounded-full h-2 transition-all duration-500"
                :style="{ width: transferCount > 0 ? '100%' : '0%' }"
              ></div>
            </div>
          </div>
          
          <!-- Active Indicator -->
          <div 
            v-if="activeTab === 'transfer'"
            class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-white rounded-t-lg"
          ></div>
        </div>
      </div>
    </div>

    <!-- Quick Summary -->
    <div v-if="!initialLoading" class="panel">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center">
            <i class="fa fa-chart-pie text-primary text-lg"></i>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900 dark:text-white">Onay Özeti</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">Toplam bekleyen onaylar</p>
          </div>
        </div>
        <div class="flex items-center gap-6">
          <div class="text-center">
            <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ totalPending }}</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">Toplam</div>
          </div>
          <div class="text-center">
            <div class="text-lg font-semibold text-green-600">{{ completedToday }}</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">Bugün onaylanan</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Area -->
    <div class="transition-all duration-300">
      <!-- Initial Loading State - API'lerden cevap beklerken -->
      <div v-if="initialLoading" class="flex flex-col items-center justify-center py-16">
        <div class="relative">
          <div class="animate-spin rounded-full h-16 w-16 border-4 border-primary/20 border-t-primary"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <i class="fa fa-check-circle text-primary text-xl"></i>
          </div>
        </div>
        <div class="mt-6 text-center">
          <h3 class="text-lg font-bold text-gray-800 dark:text-gray-100">Onay Merkezi Yükleniyor...</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300 mt-1 font-medium">
            Kullanıcı bilgileri ve onay durumları kontrol ediliyor...
          </p>
        </div>
      </div>
      
      <!-- Tab Content Loading State -->
      <div v-else-if="loading" class="flex items-center justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
      
      <!-- Content Components -->
      <div v-else-if="isAuthenticated && !initialLoading">
        <Transition name="fade" mode="out-in">
          <FaultApproval 
            v-if="activeTab === 'fault'" 
            :key="'fault-' + refreshKey"
            :date-filter="dateFilter"
            @approval-completed="onApprovalCompleted"
          />
          <RepairApproval 
            v-else-if="activeTab === 'repair'" 
            :key="'repair-' + refreshKey"
            :date-filter="dateFilter"
            @approval-completed="onApprovalCompleted"
          />
          <TransferApproval 
            v-else-if="activeTab === 'transfer'" 
            :key="'transfer-' + refreshKey"
            :date-filter="dateFilter"
            @approval-completed="onApprovalCompleted"
          />
        </Transition>
      </div>
      
      <!-- Unauthorized State -->
      <div v-else-if="!isAuthenticated && !initialLoading" class="text-center py-12">
        <div class="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fa fa-lock text-3xl text-gray-400 dark:text-gray-500"></i>
        </div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Oturum Gerekli</h3>
        <p class="text-gray-500 dark:text-gray-400 mb-4">Bu sayfaya erişebilmek için giriş yapmanız gerekmektedir.</p>
        <button @click="router.push('/auth/login')" class="btn btn-primary">
          Giriş Yap
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import FaultApproval from './components/faultApproval.vue'
import RepairApproval from './components/repairApproval.vue'
import TransferApproval from './components/transferApproval.vue'
import { userApi } from './api/userApi'
import { useGlobalApprovalNotifications } from './composables/useApprovalNotifications'

// Router
const router = useRouter()

// Onay bildirimleri composable'ı
const { 
  notifications: approvalNotifications,
  getNotificationCount,
  refreshNotifications,
  isLoading: notificationsLoading
} = useGlobalApprovalNotifications()

// Reactive data
const activeTab = ref<'fault' | 'repair' | 'transfer'>('fault')
const loading = ref(false)
const initialLoading = ref(true) // API'lerden cevap beklerken ana loading
const refreshKey = ref(0)
const isAuthenticated = ref(false)

// User data
const userInfo = ref<any>(null)
const userRoles = ref<any[]>([])
const userPermissions = ref<any[]>([])
const userLoading = ref(false)

// Counts - API'den gelen gerçek sayılar
const faultCount = computed(() => getNotificationCount('fault'))
const repairCount = computed(() => getNotificationCount('repair'))
const transferCount = computed(() => getNotificationCount('transfer'))
const completedToday = ref(0)

// Date filter
const dateFilter = ref({
  start: '',
  end: ''
})

// Computed
const totalPending = computed(() => {
  if (isDepoPersoneli.value) {
    return repairCount.value
  }
  if (isOnarimPersoneli.value) {
    return faultCount.value
  }
  return faultCount.value + repairCount.value + transferCount.value
})

const userRole = computed(() => {
  // API'den gelen roller kontrol et
  if (userRoles.value && userRoles.value.length > 0) {
    const primaryRole = userRoles.value[0]
    return typeof primaryRole === 'string' ? primaryRole : (primaryRole.name || primaryRole.code)
  }
  
  return null
})

const isDepoPersoneli = computed(() => {
  return userRole.value === 'DEPO_PERSONELI'
})

const isOnarimPersoneli = computed(() => {
  return userRole.value === 'ONARIM_PERSONELI'
})

// Methods
const loadUserInfo = async () => {
  userLoading.value = true
  try {
    const detailedInfo = await userApi.getDetailedInfo()
    userInfo.value = detailedInfo.profile
    userRoles.value = detailedInfo.roles || []
    userPermissions.value = detailedInfo.permissions || []
  } catch (error) {
    console.error('Kullanıcı bilgileri yüklenirken hata:', error)
  } finally {
    userLoading.value = false
  }
}

const checkAuth = () => {
  const token = localStorage.getItem('token')
  if (!token) {
    isAuthenticated.value = false
    router.push('/auth/login')
    return false
  }
  isAuthenticated.value = true
  return true
}

const setActiveTab = (tab: 'fault' | 'repair' | 'transfer') => {
  if (!checkAuth()) return
  
  // Depo personeli için sadece repair, onarım personeli için sadece fault tab'ına erişim
  if (isDepoPersoneli.value && tab !== 'repair') {
    return
  }
  if (isOnarimPersoneli.value && tab !== 'fault') {
    return
  }
  
  if (activeTab.value !== tab) {
    loading.value = true
    activeTab.value = tab
    
    // Simulate loading delay for smooth transition
    setTimeout(() => {
      loading.value = false
    }, 300)
  }
}

const onApprovalCompleted = async () => {
  completedToday.value++
  // API'den bildirimleri yenile
  await refreshNotifications()
  // Child component'leri yenile
  refreshKey.value++
}

const resetDateFilter = () => {
  dateFilter.value = {
    start: '',
    end: ''
  }
}

// Watchers
watch(dateFilter, async () => {
  if (checkAuth() && !initialLoading.value) {
    // Bildirimleri yenile ve sonra component'leri refresh et
    await refreshNotifications()
    refreshKey.value++
  }
}, { deep: true })

// Storage event listener to detect logout
const handleStorageChange = (e: StorageEvent) => {
  if (e.key === 'token' && !e.newValue) {
    // Token was removed (logout)
    isAuthenticated.value = false
    router.push('/auth/login')
  }
}

// Lifecycle
onMounted(async () => {
  initialLoading.value = true
  
  try {
    if (!checkAuth()) return
    
    // Paralel olarak tüm API çağrılarını başlat
    const promises = [
      loadUserInfo(),
      refreshNotifications()
    ]
    
    // Tüm API çağrılarının tamamlanmasını bekle
    await Promise.all(promises)
    
    // Rol bazında varsayılan tab ayarı
    if (isDepoPersoneli.value) {
      activeTab.value = 'repair'
    } else if (isOnarimPersoneli.value) {
      activeTab.value = 'fault'
    }
    
    // Initialize completed today count (could be fetched from API)
    completedToday.value = 0
    
  } catch (error) {
    console.error('Onay merkezi yüklenirken hata:', error)
  } finally {
    // Minimum 1 saniye göster (UX için)
    setTimeout(() => {
      initialLoading.value = false
    }, 1000)
  }
  
  // Listen for storage changes (logout from another tab)
  window.addEventListener('storage', handleStorageChange)
})

onUnmounted(() => {
  window.removeEventListener('storage', handleStorageChange)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Custom scrollbar for better UX */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Dark mode scrollbar */
.dark ::-webkit-scrollbar-track {
  background: #2d3748;
}

.dark ::-webkit-scrollbar-thumb {
  background: #4a5568;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #5a6578;
}

/* Panel enhancements */
.panel {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.panel:hover {
  transform: translateY(-1px);
}

/* Ring animation for active cards */
@keyframes ring-pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
}

.ring-2 {
  animation: ring-pulse 2s infinite;
}
</style>