<template>
    <div>
        <!-- Breadcrumb -->
        <ul class="flex space-x-2 rtl:space-x-reverse">
            <li>
                <a href="javascript:;" class="text-primary hover:underline">Dashboard</a>
            </li>
            <li class="before:content-['/'] before:mr-2 rtl:before:ml-2">
                <span>Arıza Yönetimi</span>
            </li>
        </ul>        <!-- Header -->
        <div class="pt-5 flex items-center justify-between">
            <h1 class="text-2xl font-bold text-primary">Arıza Yönetimi Dashboard</h1>
            <div class="flex gap-2">
                <button type="button" class="btn btn-outline-primary" @click="refreshData">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                    Yenile
                </button>
                <div class="flex gap-2">
                    <button type="button" class="btn btn-outline-primary" @click="exportData">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        Dışa Aktar
                    </button>
                </div>
                <button type="button" class="btn btn-primary" @click="createNewFault">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Yeni Arıza Kaydı
                </button>
            </div>
        </div>        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <div class="panel">
                <div class="flex items-center">
                    <div class="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                        <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.083 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ stats.totalFaults }}</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Toplam Arıza</p>
                    </div>
                </div>
            </div>

            <div class="panel">
                <div class="flex items-center">
                    <div class="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
                        <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ stats.openFaults }}</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Bildirilen Arıza</p>
                    </div>
                </div>
            </div>

            <!--<div class="panel">
                <div class="flex items-center">
                    <div class="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center">
                        <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ stats.inProgressFaults }}</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Güncellenen Arıza</p>
                    </div>
                </div>
            </div>
                -->
            <div class="panel">
                <div class="flex items-center">
                    <div class="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                        <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ stats.resolvedFaults }}</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Onarıma Gönderilen</p>
                    </div>
                </div>
            </div>

            <div class="panel">
                <div class="flex items-center">
                    <div class="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ stats.totalProducts }}</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Toplam Ürün</p>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Ürün İstatistikleri 
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <div class="panel">
                <h5 class="font-semibold text-lg dark:text-white-light mb-4">Ürün Kategorileri</h5>
                <div class="space-y-3">
                    <div v-for="category in productCategories" :key="category.name" class="flex items-center justify-between">
                        <div class="flex items-center">
                            <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: category.color }"></div>
                            <span class="ml-3 text-sm text-gray-700 dark:text-gray-300">{{ category.name }}</span>
                        </div>
                        <div class="text-right">
                            <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ category.count }}</span>
                            <span class="text-xs text-gray-500 ml-1">adet</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="panel">
                <h5 class="font-semibold text-lg dark:text-white-light mb-4">Onarım Merkezleri</h5>
                <div class="space-y-3">
                    <div v-for="center in repairCenterStats" :key="center.name" class="flex items-center justify-between">
                        <div class="flex items-center">
                            <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                            <span class="ml-3 text-sm text-gray-700 dark:text-gray-300">{{ center.name }}</span>
                        </div>
                        <div class="text-right">
                            <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ center.activeRepairs }}</span>
                            <span class="text-xs text-gray-500 ml-1">aktif</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>   -->
             <!-- Filters and Search -->
        <div class="panel mt-6">
            <div class="flex items-center justify-between mb-5">
                <h5 class="font-semibold text-lg dark:text-white-light">
                    Arıza Kayıtları
                    <span class="text-sm font-normal text-gray-500 ml-2">({{ filteredFaults.length }} kayıt)</span>
                </h5>
                
            </div> 
            <div class="flex flex-col lg:flex-row gap-4 mb-6">
                <div class="flex-1">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Arama</label>
                    <input 
                        type="text" 
                        v-model="searchTerm" 
                        placeholder="Arıza ID, başlık veya açıklama ara..." 
                        class="form-input"
                    />
                </div>
                  

                <div class="w-full lg:w-48">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Proje</label>
                    <select v-model="projectFilter" class="form-select">
                        <option value="">Tüm Projeler</option>
                        <option v-for="projectId in uniqueProjects" :key="projectId" :value="projectId">
                            {{ getProjectName(projectId) }}
                        </option>
                    </select>
                </div>

                <div class="flex items-end">
                    <button type="button" class="btn btn-outline-secondary" @click="clearFilters">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        Temizle
                    </button>
                </div>
            </div>
       
                       
            <div class="overflow-x-auto">
                <table class="table-auto w-full">
                    <thead>
                        <tr class="bg-gray-50 dark:bg-gray-800">
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Arıza ID</th>
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Seri Numarası</th>
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Proje</th>
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Ürün</th>
                            <!-- <th class="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Miktar</th> -->
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Durum</th>
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Lokasyon</th>
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Oluşturulma</th>
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(fault, idx) in paginatedFaults" :key="fault.id" class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                            <td class="px-4 py-3 text-sm font-medium text-primary flex items-center gap-2">
                                <span>{{ fault.id || '-' }}</span>
                            </td>
                            <td class="px-4 py-3 text-sm text-gray-900 dark:text-white">{{ fault.serialNumber || fault.title || '-' }}</td>
                            <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{{ getProjectName(fault.project) }}</td>
                            <td class="px-4 py-3 text-sm text-gray-900 dark:text-white">{{ getProductName(fault.product) }}</td>
                            <!-- <td class="px-4 py-3 text-sm text-gray-900 dark:text-white">{{ fault.quantity || '-' }}</td> -->
                            <td class="px-4 py-3">
                                <span class="badge" :class="getStatusClass(fault.status)">{{ getStatusDisplayText(fault.status) }}</span>
                            </td>
                            <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{{ getWarehouseName(fault.customer) }}</td>
                            <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{{ fault.createdAt }}</td>
                            <td class="px-4 py-3">
                                <div class="flex gap-1">
                                    <button 
                                        type="button" 
                                        class="btn btn-sm btn-outline-primary"
                                        @click="viewFault(fault)"
                                        title="Detay Görüntüle"
                                    >
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                        </svg>
                                    </button>
                                  <!--  <button 
                                        type="button" 
                                        class="btn btn-sm btn-outline-warning"
                                        @click="editFault(fault.id)"
                                        title="Güncelle"
                                    >
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                        </svg>
                                    </button>-->
                                    <button 
                                        v-if="fault.status !== 'Gönderildi'"
                                        type="button" 
                                        class="btn btn-sm btn-outline-success"
                                        @click="sendToRepair(fault.id)"
                                        title="Onarıma Gönder"
                                    >
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>            <!-- Pagination -->
            <div class="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
                <div class="text-sm text-gray-600 dark:text-gray-400">
                    {{ paginationInfo }}
                </div>
                
                <div class="flex items-center gap-2">
                    <label class="text-sm text-gray-600 dark:text-gray-400">Sayfa başına:</label>
                    <select v-model="itemsPerPage" class="form-select w-20" @change="currentPage = 1">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>

                <div class="flex gap-1">
                    <button 
                        type="button" 
                        class="btn btn-sm btn-outline-secondary" 
                        :disabled="currentPage === 1"
                        @click="currentPage = 1"
                    >
                        İlk
                    </button>
                    <button 
                        type="button" 
                        class="btn btn-sm btn-outline-secondary" 
                        :disabled="currentPage === 1"
                        @click="currentPage--"
                    >
                        Önceki
                    </button>
                    
                    <template v-for="page in visiblePages" :key="page">
                        <button 
                            v-if="typeof page === 'number'"
                            type="button" 
                            class="btn btn-sm"
                            :class="page === currentPage ? 'btn-primary' : 'btn-outline-secondary'"
                            @click="currentPage = page"
                        >
                            {{ page }}
                        </button>
                        <span v-else class="px-2 text-gray-500">{{ page }}</span>
                    </template>
                    
                    <button 
                        type="button" 
                        class="btn btn-sm btn-outline-secondary" 
                        :disabled="currentPage === totalPages"
                        @click="currentPage++"
                    >
                        Sonraki
                    </button>
                    <button 
                        type="button" 
                        class="btn btn-sm btn-outline-secondary" 
                        :disabled="currentPage === totalPages"
                        @click="currentPage = totalPages"
                    >
                        Son
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

// Proje, ürün ve depo listeleri API'den alınacak
const projects = ref<any[]>([]);
const products = ref<any[]>([]);
const warehouses = ref<any[]>([]);
const repairs = ref<any[]>([]);

// ID'den depo adı bul
const getWarehouseName = (warehouseId: string) => {
    const warehouse = warehouses.value.find((w: any) => w.id === warehouseId);
    return warehouse ? warehouse.name : warehouseId || '-';
};

// ID'den proje adı bul
const getProjectName = (projectId: string) => {
    const project = projects.value.find((p: any) => p.id === projectId);
    return project ? project.name : projectId || '-';
};

// ID'den ürün adı bul
const getProductName = (productId: string) => {
    const product = products.value.find((p: any) => p.id === productId);
    return product ? product.name : productId || '-';
};
import { useRouter } from 'vue-router';
import { useMeta } from '@/composables/use-meta';
import { fetchStockItems } from './api/stockItemsApi';

// Meta
useMeta({ title: 'Arıza Yönetimi' });

// Router
const router = useRouter();


// Reactive data
const searchTerm = ref('');
const statusFilter = ref('');
const projectFilter = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(10);


// Stat kartlarını filtrelenmiş arızalara göre dinamik hesapla
const stats = computed(() => {
    const arr = filteredFaults.value;
    return {
        totalFaults: arr.length,
        openFaults: arr.filter(f => f.status === 'ARIZALI').length,
        inProgressFaults: arr.filter(f => f.status === 'GÜNCELLENDİ').length,
        resolvedFaults: arr.filter(f => f.status === 'GÖNDERİLDİ').length,
        totalProducts: new Set(arr.map(f => f.product)).size
    };
});

const productCategories = ref<any[]>([]);
const repairCenterStats = ref<any[]>([]);
const faults = ref<any[]>([]);

// API'den veri çekme
import { fetchRepairById } from './api/stockItemsApi';
onMounted(async () => {
    try {
        // Proje, ürün ve depo listelerini paralel çek
        const [projectRes, productRes, warehouseRes, repairsRes,stockRes] = await Promise.all([
            axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/projects`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }),
            axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/products`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }),
            axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/warehouses`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }),
            axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/repairs?status=RECEIVED`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }),

            fetchStockItems()
        ]);
        projects.value = projectRes.data;
        products.value = productRes.data;
        warehouses.value = warehouseRes.data;
     
        console.log(repairsRes.data)
        // API'den gelen veriyi tabloya uygun şekilde dönüştür
        faults.value = repairsRes.data.map((item: any) => {
            return {
                id: item.id,
                serialNumber: item.item.serialNumber || '-',
                project: item.item.currentProject.id || '-',
                product: item.item.product.id || '-',
                status: item.status || '-',
                customer: item.warehouseId || '-',
                createdAt: item.createdAt ? new Date(item.createdAt).toLocaleString('tr-TR') : '-'
            };
        });
    } catch (e) {
        console.error('Arıza kayıtları/proje/ürünler/depolar alınamadı:', e);
    }
    console.log('Arıza kayıtları:', faults.value);
});

// Computed
const filteredFaults = computed(() => {
    let filtered = faults.value;

    // Sadece durumu 'RECEIVED' olanları göster
    filtered = filtered.filter(fault => fault.status === 'RECEIVED');

    // Arama filtresi
    if (searchTerm.value) {
        const term = searchTerm.value.toLowerCase();
        filtered = filtered.filter(fault => 
            (fault.id && fault.id.toLowerCase().includes(term)) ||
            (fault.serialNumber && fault.serialNumber.toLowerCase().includes(term)) ||
            (fault.product && fault.product.toLowerCase().includes(term)) ||
            (fault.customer && fault.customer.toLowerCase().includes(term))
        );
    }

    // Proje filtresi
    if (projectFilter.value) {
        filtered = filtered.filter(fault => fault.project === projectFilter.value);
    }

    return filtered;
});

const uniqueProjects = computed(() => {
    const projects = [...new Set(faults.value.map(fault => fault.project))];
    return projects.sort();
});

const totalPages = computed(() => {
    return Math.ceil(filteredFaults.value.length / itemsPerPage.value);
});

const paginatedFaults = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return filteredFaults.value.slice(start, end);
});

const visiblePages = computed(() => {
    const pages: (number | string)[] = [];
    const total = totalPages.value;
    const current = currentPage.value;
    
    if (total <= 7) {
        for (let i = 1; i <= total; i++) {
            pages.push(i);
        }
    } else {
        if (current <= 4) {
            pages.push(1, 2, 3, 4, 5, '...', total);
        } else if (current >= total - 3) {
            pages.push(1, '...', total - 4, total - 3, total - 2, total - 1, total);
        } else {
            pages.push(1, '...', current - 1, current, current + 1, '...', total);
        }
    }
    
    return pages.filter(page => page !== '...' || pages.indexOf(page) === pages.lastIndexOf(page));
});

const paginationInfo = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value + 1;
    const end = Math.min(start + itemsPerPage.value - 1, filteredFaults.value.length);
    const total = filteredFaults.value.length;
    
    if (total === 0) return 'Kayıt bulunamadı';
    return `${start}-${end} / ${total} kayıt gösteriliyor`;
});

// Methods
const getStatusClass = (status: string) => {
    switch (status) {
        case 'RECEIVED':
        case 'Bildirildi':
            return 'bg-red-500';
        case 'Güncellendi':
            return 'bg-yellow-500';
        case 'Gönderildi':
            return 'bg-green-500';
        default:
            return 'bg-gray-500';
    }
};

const getStatusDisplayText = (status: string) => {
    switch (status) {
        case 'RECEIVED':
            return 'Arızalı';
        case 'Bildirildi':
            return 'Bildirildi';
        case 'Güncellendi':
            return 'Güncellendi';
        case 'Gönderildi':
            return 'Gönderildi';
        default:
            return status;
    }
};

const viewFault = (fault: any) => {
    const plainFault = JSON.parse(JSON.stringify(fault));
    console.log('Detay sayfasına gönderilen veri:', plainFault);
    router.push({
        path: `/ariza-yonetimi/detay/${plainFault.id}`,
        state: { fault: plainFault }
    });
};

const editFault = (faultId: string) => {
    router.push(`/ariza-yonetimi/guncelle/${faultId}`);
};

const createNewFault = () => {
    router.push('/ariza-yonetimi/yeni');
};

const refreshData = () => {
    // Sayfayı yenile
    window.location.reload();
};

const clearFilters = () => {
    searchTerm.value = '';
    statusFilter.value = '';
    projectFilter.value = '';
    currentPage.value = 1;
};

const exportData = async () => {
    try {
        // Veriler hazırlanıyor
        const exportedData = filteredFaults.value.map(fault => ({
            'Arıza ID': fault.id,
            'Başlık': fault.title,
            'Proje': fault.project,
            'Ürün': fault.product,
            'Durum': fault.status,
            'Müşteri': fault.customer,
            'Oluşturulma Tarihi': fault.createdAt
        }));
        
        // Şimdilik sadece CSV export yapacağız
        exportAsCSV(exportedData);
        
    } catch (error) {
        console.error('Export hatası:', error);
        alert('Export işlemi sırasında bir hata oluştu.');
    }
};

// CSV export fallback fonksiyonu
const exportAsCSV = (data: any[]) => {
    if (data.length === 0) return;
    
    // CSV header
    const headers = Object.keys(data[0]);
    let csvContent = headers.join(',') + '\n';
    
    // CSV rows
    data.forEach(row => {
        const values = headers.map(header => {
            const value = row[header] || '';
            // CSV için özel karakterleri escape et
            return `"${String(value).replace(/"/g, '""')}"`;
        });
        csvContent += values.join(',') + '\n';
    });
    
    // Dosya adını oluştur
    const now = new Date();
    const dateStr = now.toLocaleDateString('tr-TR').replace(/\./g, '-');
    const timeStr = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }).replace(':', '-');
    const fileName = `Arıza_Kayitlari_${dateStr}_${timeStr}.csv`;
    
    // CSV dosyasını indir
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const sendToRepair = (faultId: string) => {
    router.push(`/ariza-yonetimi/onarim-gonder/${faultId}`);
};
</script>

<style scoped>
.badge {
    display: inline-flex;
    align-items: center;
    padding: 0.125rem 0.625rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
    color: white;
}

.panel {
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    padding: 1.5rem;
}

.dark .panel {
    background-color: #1b2e4b;
}

.btn {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 1rem;
    border: 1px solid transparent;
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: 0.375rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    cursor: pointer;
    transition: all 0.2s;
}

.btn-primary {
    color: white;
    background-color: #3b82f6;
    border-color: #3b82f6;
}

.btn-primary:hover {
    background-color: #2563eb;
    border-color: #2563eb;
}

.btn-outline-primary {
    color: #1d4ed8;
    background-color: transparent;
    border-color: #3b82f6;
}

.btn-outline-primary:hover {
    background-color: #eff6ff;
}

.btn-outline-warning {
    color: #d97706;
    background-color: transparent;
    border-color: #f59e0b;
}

.btn-outline-warning:hover {
    background-color: #fffbeb;
}

.btn-outline-secondary {
    color: #374151;
    background-color: transparent;
    border-color: #6b7280;
}

.btn-outline-secondary:hover {
    background-color: #f9fafb;
}

.btn-sm {
    padding: 0.375rem 0.75rem;
    font-size: 0.75rem;
}

.form-input,
.form-select {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    background-color: white;
    transition: all 0.2s;
}

.dark .form-input,
.dark .form-select {
    background-color: #374151;
    border-color: #4b5563;
    color: white;
}

.form-input:focus,
.form-select:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
    border-color: #3b82f6;
}

.btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.btn-success {
    color: white;
    background-color: #10b981;
    border-color: #10b981;
}

.btn-success:hover:not(:disabled) {
    background-color: #059669;
    border-color: #059669;
}

.btn-outline-success {
    color: #059669;
    background-color: transparent;
    border-color: #10b981;
}

.btn-outline-success:hover {
    background-color: #ecfdf5;
}

.cursor-pointer {
    cursor: pointer;
}

.cursor-pointer:hover {
    text-decoration: underline;
}

.table-auto {
    border-collapse: collapse;
}

.table-auto th,
.table-auto td {
    border-bottom: 1px solid #e5e7eb;
}

.dark .table-auto th,
.dark .table-auto td {
    border-bottom-color: #374151;
}
</style>
