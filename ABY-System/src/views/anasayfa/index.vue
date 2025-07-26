<template>
    <div>
        <!-- Breadcrumb -->
        <ul class="flex space-x-2 rtl:space-x-reverse">
            <li>
                <a href="javascript:;" class="text-primary hover:underline">Anasayfa</a>
            </li>
        </ul>

        <!-- Loading State -->
        <div v-if="loading" class="pt-5">
            <div class="flex items-center justify-center min-h-[400px]">
                <div class="flex items-center space-x-2">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <span class="text-gray-600">Dashboard verileri yükleniyor...</span>
                </div>
            </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="pt-5">
            <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                <div class="flex items-center">
                    <div class="text-red-600 mr-3">⚠️</div>
                    <div>
                        <h3 class="text-red-800 font-medium">Hata</h3>
                        <p class="text-red-600 text-sm mt-1">{{ error }}</p>
                        <button 
                            @click="loadDashboardData" 
                            class="mt-3 bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700"
                        >
                            Tekrar Dene
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Dashboard Content -->
        <div v-else-if="dashboardData" class="pt-5">
            <!-- Ana İstatistik Kartları -->
            <DashboardStatsCards :stats="dashboardData.stats" />

            <div class="grid lg:grid-cols-3 gap-6 mb-6">
                <CategoryStocksCard :categoryStocks="dashboardData.categoryStocks" />
                <CriticalAlertsCard :criticalAlerts="dashboardData.criticalAlerts" />
                <RecentMovementsCard :recentMovements="dashboardData.recentMovements" />
            </div>

            <div class="grid lg:grid-cols-3 gap-6 mb-6">
                <ProjectStockDistributionChart :projectStockDistribution="dashboardData.projectStockDistribution" />
                <ProductCategoryDistributionChart :productCategoryDistribution="dashboardData.productCategoryDistribution" />
                <WarehouseStatusChart :warehouseStatus="dashboardData.warehouseStatus" />
            </div>

            <div class="grid lg:grid-cols-2 gap-6 mb-6">
                <MostMovedProductsTable :mostMovedProducts="dashboardData.mostMovedProducts" />
                <MostFaultyProductsTable :mostFaultyProducts="dashboardData.mostFaultyProducts" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DashboardStatsCards from './components/DashboardStatsCards.vue'
import CategoryStocksCard from './components/CategoryStocksCard.vue'
import CriticalAlertsCard from './components/CriticalAlertsCard.vue'
import RecentMovementsCard from './components/RecentMovementsCard.vue'
import ProjectStockDistributionChart from './components/ProjectStockDistributionChart.vue'
import ProductCategoryDistributionChart from './components/ProductCategoryDistributionChart.vue'
import WarehouseStatusChart from './components/WarehouseStatusChart.vue'
import MostMovedProductsTable from './components/MostMovedProductsTable.vue'
import MostFaultyProductsTable from './components/MostFaultyProductsTable.vue'
import { fetchDashboardData, type DashboardResponse } from './api/dashboard-api'

// Kullanıcı bilgisi localStorage'dan alınır
function getUserInfo() {
  try {
    const userStr = localStorage.getItem('user')
    if (!userStr) return null
    return JSON.parse(userStr)
  } catch (e) {
    return null
  }
}

// Dashboard verilerini yönetmek için reactive ref
const dashboardData = ref<DashboardResponse | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

// Dashboard verilerini API'den çek
const loadDashboardData = async () => {
  try {
    // Token kontrolü - token yoksa veri yükleme
    const token = localStorage.getItem('token');
    if (!token) {
      error.value = 'Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.';
      loading.value = false;
      return;
    }

    loading.value = true
    error.value = null
    const user = getUserInfo()
    let role: string | undefined = undefined
    let warehouseId: string | undefined = undefined
    if (user) {
      // Rolü al
      role = Array.isArray(user.roles) ? user.roles[0] : user.role
      // Eğer depo ile ilgili bir rolse, assignments içinden resourceId alınabilir
      const warehouseRoles = ['WAREHOUSE_MANAGER', 'DEPO_SORUMLUSU', 'DEPO_PERSONELI']
      if (role && warehouseRoles.includes(role)) {
        const assignment = (user.assignments || []).find(a => a.role === role && a.resourceType === 'WAREHOUSE')
        if (assignment) {
          warehouseId = assignment.resourceId
        }
      }
    }
    // fetchDashboardData fonksiyonuna parametre olarak rol ve warehouseId gönder
    dashboardData.value = await fetchDashboardData({
      role: role ?? undefined,
      warehouseId: warehouseId ?? undefined
    })
  } catch (err: any) {
    // Token ile ilgili hatalar için özel mesaj
    if (err.message && err.message.includes('Authentication token not found')) {
      error.value = 'Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.';
    } else {
      error.value = 'Dashboard verileri yüklenirken hata oluştu';
    }
    console.error('Dashboard data loading error:', err)
  } finally {
    loading.value = false
  }
}

// Component mount edildiğinde verileri yükle
onMounted(() => {
  loadDashboardData()
})
</script>
