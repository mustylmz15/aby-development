<template>
    <div class="space-y-6">
        <!-- Page Header -->
        <div class="flex items-center justify-between">
            <div>
                <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">
                    Arıza Detayları
                </h1>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Arıza bilgileri ve işlem detayları
                </p>
            </div>
            <div class="flex space-x-3">
                <button 
                    v-if="faultData && faultData.generalInfo.status === 'RECEIVED'"
                    @click="sendToRepair"
                    class="btn btn-success"
                >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Onarıma Gönder
                </button>
                <button 
                    @click="downloadPDF"
                    :disabled="loading || !faultData"
                    class="btn btn-primary"
                >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    PDF İndir
                </button>
                <button 
                    @click="goBack"
                    class="btn btn-outline-secondary"
                >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Geri Dön
                </button>
            </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
            <div class="flex items-center">
                <svg class="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <p class="text-red-700">{{ error }}</p>
            </div>
        </div>

        <!-- Content -->
        <div v-else-if="faultData" class="pdf-content grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Genel Bilgiler Kartı -->
            <GeneralInfoCard :data="faultData.generalInfo" />
            
            <!-- Ürün ve Envanter Bilgileri Kartı -->
            <ProductInfoCard :data="faultData.productInfo" />
            
            <!-- Sorun ve Tanı Kartı - Full width -->
            <div class="lg:col-span-2">
                <IssueCard :data="faultData.issue" />
            </div>
            
            <!-- Personel ve Atama Kartı -->
            <PersonnelCard :data="faultData.personnel" />
            
            <!-- Zaman Takibi Kartı -->
            <TimelineCard :data="faultData.timeline" />
            
            <!-- Maliyet ve Parça Kartı - Full width (sadece admin) -->
            <div v-if="isAdmin" class="lg:col-span-2">
                <CostCard :data="faultData.cost" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchRepairById } from './api/stockItemsApi'
import type { FaultDetailCards } from './api/fault'
import GeneralInfoCard from './components/GeneralInfoCard.vue'
import ProductInfoCard from './components/ProductInfoCard.vue'
import IssueCard from './components/IssueCard.vue'
//import PersonnelCard from './components/PersonnelCard.vue'
//import TimelineCard from './components/TimelineCard.vue'
import CostCard from './components/CostCard.vue'

const route = useRoute()
const router = useRouter()

// Reactive data
const loading = ref(true)
const error = ref<string | null>(null)
const faultData = ref<FaultDetailCards | null>(null)

// Methods
const goBack = () => {
    router.push('/ariza-yonetimi/')
}

const sendToRepair = () => {
    const repairId = route.params.id as string
    router.push(`/ariza-yonetimi/onarim-gonder/${repairId}`)
}

const downloadPDF = async () => {
    if (!faultData.value) return
    
    try {
        // Sayfayı print moduna geçir
        window.print()
    } catch (error) {
        console.error('PDF oluşturma hatası:', error)
        alert('PDF oluşturulurken bir hata oluştu')
    }
}

const loadFaultDetail = async () => {
    try {
        loading.value = true
        error.value = null
        
        const repairId = route.params.id as string
        if (!repairId) {
            throw new Error('Arıza ID bulunamadı')
        }

        const data = await fetchRepairById(repairId)
        faultData.value = data
    } catch (err: any) {
        error.value = err.message || 'Veri yüklenirken bir hata oluştu'
        console.error('Fault detail yükleme hatası:', err)
    } finally {
        loading.value = false
    }
}

// Admin kontrolü
let isAdmin = false
try {
  const userStr = localStorage.getItem('user')
  if (userStr) {
    const userObj = JSON.parse(userStr)
    // Rol bilgisi assignments[0].role veya role olabilir, ikisini de kontrol et
    isAdmin = (userObj.role === 'admin') || (userObj.assignments?.[0]?.role === 'admin')
  }
} catch (e) {
  isAdmin = false
}

// Lifecycle
onMounted(() => {
    loadFaultDetail()
})
</script>

<style scoped>
.btn {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-weight: 500;
    transition: all 0.2s;
}

.btn-primary {
    background: #3b82f6;
    color: white;
    border: 1px solid #3b82f6;
}

.btn-primary:hover:not(:disabled) {
    background: #2563eb;
    border-color: #2563eb;
}

.btn-primary:disabled {
    background: #9ca3af;
    border-color: #9ca3af;
    cursor: not-allowed;
}

.btn-success {
    background: #10b981;
    color: white;
    border: 1px solid #10b981;
}

.btn-success:hover {
    background: #059669;
    border-color: #059669;
}

.btn-outline-secondary {
    border: 1px solid #d1d5db;
    color: #374151;
    background: transparent;
}

.btn-outline-secondary:hover {
    background: #f9fafb;
}

.dark .btn-outline-secondary {
    border-color: #4b5563;
    color: #d1d5db;
}

.dark .btn-outline-secondary:hover {
    background: #374151;
}

/* Print Styles - Tek sayfa optimizasyonu */
@media print {
    body * {
        visibility: hidden;
    }
    
    .pdf-content, .pdf-content * {
        visibility: visible;
    }
    
    .pdf-content {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        display: grid !important;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        font-size: 11px;
    }
    
    /* Sayfa başlığı */
    .pdf-content::before {
        content: "Arıza Detayları";
        grid-column: 1 / -1;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 10px;
        padding-bottom: 5px;
        border-bottom: 1px solid #000;
    }
    
    /* Full width kartları */
    .lg\\:col-span-2 {
        grid-column: 1 / -1;
    }
    
    /* Kart stilleri */
    .pdf-content > div {
        margin-bottom: 8px;
        break-inside: avoid;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }
    
    /* Butonları gizle */
    button {
        display: none !important;
    }
    
    /* Header'ı gizle */
    .space-y-6 > div:first-child {
        display: none !important;
    }
    
    /* Spacing'leri azalt */
    .space-y-6 > * + * {
        margin-top: 0 !important;
    }
    
    .space-y-4 > * + * {
        margin-top: 4px !important;
    }
    
    .space-y-5 > * + * {
        margin-top: 4px !important;
    }
    
    /* Padding'leri azalt */
    .p-6 {
        padding: 6px !important;
    }
    
    .p-4 {
        padding: 4px !important;
    }
    
    .p-3 {
        padding: 3px !important;
    }
    
    .mb-4 {
        margin-bottom: 4px !important;
    }
    
    .mb-6 {
        margin-bottom: 6px !important;
    }
    
    /* Font boyutlarını azalt */
    .text-lg {
        font-size: 12px !important;
    }
    
    .text-sm {
        font-size: 10px !important;
    }
    
    .text-xs {
        font-size: 9px !important;
    }
    
    /* Icon boyutlarını azalt */
    .w-10.h-10 {
        width: 20px !important;
        height: 20px !important;
    }
    
    .w-8.h-8 {
        width: 16px !important;
        height: 16px !important;
    }
    
    .w-5.h-5 {
        width: 12px !important;
        height: 12px !important;
    }
    
    .w-4.h-4 {
        width: 10px !important;
        height: 10px !important;
    }
    
    /* Dark mode'u devre dışı bırak */
    .dark {
        background: white !important;
        color: black !important;
    }
    
    /* Timeline çizgisini kısalt */
    .absolute.left-4 {
        display: none !important;
    }
    
    /* Grid gap'leri azalt */
    .gap-6 {
        gap: 4px !important;
    }
    
    .gap-4 {
        gap: 3px !important;
    }
    
    /* Sayfa ayarları */
    @page {
        margin: 0.5cm;
        size: A4;
    }
}
</style>