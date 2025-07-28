<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
        <!-- Üst Başlık -->
        <div class="flex items-center justify-between mb-8">
            <div class="flex items-center space-x-4">
                <button @click="goBack" 
                        class="w-10 h-10 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-105">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                </button>
                <div class="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM9 7l-5 5h5V7zM12 2a10 10 0 100 20 10 10 0 000-20z"></path>
                    </svg>
                </div>
                <div>
                    <h1 class="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                        S1 Bildirim Detayları
                    </h1>
                    <p class="text-gray-600 dark:text-gray-400 text-sm mt-1">2025_S1.xlsx dosyasından alınan tüm bildirim verileri</p>
                </div>
            </div>
            <div class="flex items-center space-x-4">
                <div class="bg-white dark:bg-gray-800 px-6 py-3 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <div class="flex items-center space-x-2">
                        <svg class="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {{ new Date().toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' }) }}
                        </span>
                    </div>
                </div>
                
                <!-- Excel Yenileme Butonu -->
                <button @click="loadExcelData" :disabled="isLoadingExcel"
                        class="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-2xl shadow-lg border border-emerald-200 transition-all duration-300 transform hover:scale-105 disabled:cursor-not-allowed disabled:transform-none">
                    <div class="flex items-center space-x-2">
                        <svg v-if="!isLoadingExcel" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                        </svg>
                        <svg v-else class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span class="text-sm font-medium">
                            {{ isLoadingExcel ? 'Yükleniyor...' : 'Verilerini Yenile' }}
                        </span>
                    </div>
                </button>
            </div>
        </div>

        <!-- İstatistik Kartları -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <!-- Toplam Bildirim -->
            <div class="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl p-6 text-white">
                <div class="flex items-center justify-between mb-4">
                    <div class="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4 19l5-5V9l-5 5v5z"></path>
                        </svg>
                    </div>
                    <span class="text-2xl font-bold">{{ formatNumber(notificationStats.total) }}</span>
                </div>
                <h3 class="text-lg font-semibold mb-1">Toplam Bildirim</h3>
                <p class="text-blue-100 text-sm">Tüm kayıtlar</p>
            </div>

            <!-- Açık Bildirim -->
            <div class="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl p-6 text-white">
                <div class="flex items-center justify-between mb-4">
                    <div class="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <span class="text-2xl font-bold">{{ formatNumber(notificationStats.open) }}</span>
                </div>
                <h3 class="text-lg font-semibold mb-1">Açık Bildirim</h3>
                
            </div>

            <!-- Kapalı Bildirim -->
            <div class="bg-gradient-to-br from-gray-500 to-slate-600 rounded-2xl shadow-xl p-6 text-white">
                <div class="flex items-center justify-between mb-4">
                    <div class="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
                        </svg>
                    </div>
                    <span class="text-2xl font-bold">{{ formatNumber(notificationStats.closed) }}</span>
                </div>
                <h3 class="text-lg font-semibold mb-1">Kapalı Bildirim</h3>
                
            </div>

            <!-- SLA Geçen -->
            <div class="bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl shadow-xl p-6 text-white">
                <div class="flex items-center justify-between mb-4">
                    <div class="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <span class="text-2xl font-bold">{{ formatNumber(notificationStats.interventionSLA) }}</span>
                </div>
                <h3 class="text-lg font-semibold mb-1">Müdahale SLA Geçen</h3>
                
            </div>
        </div>

        <!-- Bildirim Tablosu -->
        <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700">
            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-xl font-bold text-gray-800 dark:text-white">Bildirim Listesi</h2>
                        <p class="text-gray-600 dark:text-gray-400 text-sm mt-1">2025_S1.xlsx dosyasından alınan veriler</p>
                    </div>
                    <div class="flex items-center space-x-3">
                        <div class="bg-amber-100 dark:bg-amber-900/20 px-3 py-1 rounded-full">
                            <span class="text-amber-700 dark:text-amber-400 text-sm font-medium">
                                {{ formatNumber(filteredData.length) }}{{ filteredData.length !== tableData.length ? ' / ' + formatNumber(tableData.length) : '' }} kayıt
                            </span>
                        </div>
                        <div class="bg-blue-100 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                            <span class="text-blue-700 dark:text-blue-400 text-sm font-medium">{{ formatNumber(tableHeaders.length) }} sütun</span>
                        </div>
                        <div v-if="searchQuery.trim()" class="bg-green-100 dark:bg-green-900/20 px-3 py-1 rounded-full">
                            <span class="text-green-700 dark:text-green-400 text-sm font-medium">Filtrelenmiş</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Filtreleme Alanı -->
            <div class="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <!-- Arama Kutusu -->
                    <div class="md:col-span-2">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Arama Yap
                        </label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </div>
                            <input v-model="searchQuery" 
                                   @input="onSearchChange"
                                   type="text" 
                                   class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white dark:bg-gray-700 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 dark:focus:placeholder-gray-500 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm dark:text-white"
                                   placeholder="Tabloda arama yapın...">
                        </div>
                    </div>
                    
                    <!-- Sütun Seçimi -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Arama Yapılacak Sütun
                        </label>
                        <select v-model="selectedColumn" 
                                @change="onSearchChange"
                                class="block w-full px-3 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 text-sm dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Tüm Sütunlar</option>
                            <option v-for="header in tableHeaders" :key="header" :value="header">
                                {{ header }}
                            </option>
                        </select>
                    </div>
                </div>
                
                <!-- Filtreleme Sonucu -->
                <div v-if="searchQuery.trim()" class="mt-4 flex items-center space-x-4">
                    <div class="bg-blue-100 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                        <span class="text-blue-700 dark:text-blue-400 text-sm font-medium">
                            {{ formatNumber(filteredData.length) }} kayıt bulundu
                        </span>
                    </div>
                    <button @click="searchQuery = ''; selectedColumn = ''; onSearchChange()" 
                            class="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 underline">
                        Filtreyi Temizle
                    </button>
                </div>
            </div>
            
            <div class="overflow-x-auto max-h-[600px] overflow-y-auto">
                <div v-if="isLoadingExcel" class="flex items-center justify-center py-12">
                    <div class="flex items-center space-x-3">
                        <svg class="w-6 h-6 animate-spin text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span class="text-gray-600 dark:text-gray-400">Excel verileri yükleniyor...</span>
                    </div>
                </div>
                
                <table v-else class="w-full">
                    <thead class="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider sticky left-0 bg-gray-50 dark:bg-gray-700 z-10">
                                Sıra
                            </th>
                            <th v-for="header in tableHeaders" :key="header" 
                                class="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[120px]">
                                {{ header }}
                            </th>
                            <th v-if="tableHeaders.length > 0" 
                                class="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Geçen SLA Süresi (Gün)
                            </th>
                            <th v-if="tableHeaders.length > 0" 
                                class="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                SLA Durumu
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        <tr v-for="(row, index) in paginatedData" :key="index" 
                            class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                            <td class="px-3 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 sticky left-0 bg-white dark:bg-gray-800 z-10 border-r border-gray-200 dark:border-gray-700">
                                {{ (currentPage - 1) * pageSize + index + 1 }}
                            </td>
                            <td v-for="header in tableHeaders" :key="`${index}-${header}`" 
                                class="px-3 py-4 text-sm text-gray-900 dark:text-gray-100 min-w-[120px]">
                                <div class="truncate max-w-[200px]" :title="formatCellValue(row[header])">
                                    {{ formatCellValue(row[header]) }}
                                </div>
                            </td>
                            <td v-if="tableHeaders.length > 0" 
                                class="px-3 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                <span v-if="row.R_minus_Q !== null && row.R_minus_Q !== undefined" 
                                      :class="row.R_minus_Q > 1 ? 'text-red-600 dark:text-red-400 font-bold' : 'text-gray-600 dark:text-gray-400'">
                                    {{ row.R_minus_Q.toFixed(2) }}
                                </span>
                                <span v-else class="text-gray-400">-</span>
                            </td>
                            <td v-if="tableHeaders.length > 0" 
                                class="px-3 py-4 whitespace-nowrap">
                                <span v-if="row.SLA_Status" 
                                      :class="row.SLA_Status === 'SLA Geçti' 
                                        ? 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' 
                                        : 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'">
                                    {{ row.SLA_Status }}
                                </span>
                                <span v-else class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400">
                                    Belirsiz
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                
                <div v-if="!isLoadingExcel && tableData.length === 0" 
                     class="flex items-center justify-center py-12">
                    <div class="text-center">
                        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">Veri bulunamadı</h3>
                        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Excel dosyasından veri alınamadı.</p>
                    </div>
                </div>
            </div>
            
            <!-- Sayfalama Kontrolleri -->
            <div v-if="!isLoadingExcel && tableData.length > 0" class="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                    <!-- Sol taraf - Sayfa boyutu seçimi -->
                    <div class="flex items-center space-x-4">
                        <div class="flex items-center space-x-2">
                            <label class="text-sm text-gray-700 dark:text-gray-300 font-medium">
                                Sayfa başına:
                            </label>
                            <select v-model="pageSize" 
                                    @change="changePageSize(pageSize)"
                                    class="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 text-sm bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                                <option v-for="size in pageSizeOptions" :key="size" :value="size">
                                    {{ size }}
                                </option>
                            </select>
                        </div>
                        <div class="text-sm text-gray-700 dark:text-gray-300">
                            <span>{{ formatNumber(Math.min((currentPage - 1) * pageSize + 1, filteredData.length)) }} - {{ formatNumber(Math.min(currentPage * pageSize, filteredData.length)) }}</span>
                            <span class="text-gray-500 mx-1">•</span>
                            <span>{{ formatNumber(filteredData.length) }} toplam kayıt</span>
                            <span v-if="filteredData.length !== tableData.length" class="text-blue-600 dark:text-blue-400">
                                ({{ formatNumber(tableData.length) }} kayıttan filtrelendi)
                            </span>
                        </div>
                    </div>
                    
                    <!-- Sağ taraf - Sayfa navigasyonu -->
                    <div class="flex items-center space-x-2">
                        <div class="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                            <span>Sayfa {{ currentPage }} / {{ totalPages }}</span>
                        </div>
                        
                        <div class="flex items-center space-x-1">
                            <button @click="currentPage = 1" 
                                    :disabled="currentPage <= 1"
                                    :class="[
                                        'px-2 py-1 rounded text-sm font-medium transition-all duration-200',
                                        currentPage <= 1 
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-600' 
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500'
                                    ]">
                                İlk
                            </button>
                            
                            <button @click="currentPage = Math.max(1, currentPage - 1)" 
                                    :disabled="currentPage <= 1"
                                    :class="[
                                        'px-3 py-1 rounded text-sm font-medium transition-all duration-200',
                                        currentPage <= 1 
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-600' 
                                            : 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
                                    ]">
                                ‹ Önceki
                            </button>
                            
                            <div class="flex items-center space-x-1">
                                <template v-for="page in getVisiblePages()" :key="page">
                                    <button v-if="typeof page === 'number'"
                                            @click="currentPage = page"
                                            :class="[
                                                'w-8 h-8 rounded text-sm font-medium transition-all duration-200',
                                                currentPage === page 
                                                    ? 'bg-blue-500 text-white dark:bg-blue-600' 
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                            ]">
                                        {{ page }}
                                    </button>
                                    <span v-else class="text-gray-400 px-1">...</span>
                                </template>
                            </div>
                            
                            <button @click="currentPage = Math.min(totalPages, currentPage + 1)" 
                                    :disabled="currentPage >= totalPages"
                                    :class="[
                                        'px-3 py-1 rounded text-sm font-medium transition-all duration-200',
                                        currentPage >= totalPages 
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-600' 
                                            : 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
                                    ]">
                                Sonraki ›
                            </button>
                            
                            <button @click="currentPage = totalPages" 
                                    :disabled="currentPage >= totalPages"
                                    :class="[
                                        'px-2 py-1 rounded text-sm font-medium transition-all duration-200',
                                        currentPage >= totalPages 
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-600' 
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500'
                                    ]">
                                Son
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useExcel } from '@/composables/use-excel';

const router = useRouter();
const { loadDashboardData, getTableData } = useExcel();

// Sayıları nokta ile ayıran formatlar
const formatNumber = (num: number): string => {
    return num.toLocaleString('tr-TR');
};

// Loading state
const isLoadingExcel = ref(false);

// Bildirim İstatistikleri
const notificationStats = ref({
    total: 0,
    open: 0,
    closed: 0,
    interventionSLA: 0
});

// Tablo verileri
const tableData = ref<any[]>([]);
const tableHeaders = ref<string[]>([]);
const nonEmptyColumnIndexes = ref<number[]>([]);

// Filtreleme
const searchQuery = ref('');
const selectedColumn = ref('');

// Sayfalama
const currentPage = ref(1);
const pageSize = ref(10); // Daha az kayıt göster ki tablo daha hızlı yüklensin
const pageSizeOptions = [10, 50, 100, 500];

// Filtrelenmiş veri
const filteredData = computed(() => {
    if (!searchQuery.value.trim()) {
        return tableData.value;
    }
    
    const query = searchQuery.value.toLowerCase().trim();
    
    return tableData.value.filter(row => {
        if (selectedColumn.value && selectedColumn.value !== '') {
            // Belirli bir sütunda ara
            const cellValue = row[selectedColumn.value];
            if (cellValue !== null && cellValue !== undefined) {
                return cellValue.toString().toLowerCase().includes(query);
            }
            return false;
        } else {
            // Tüm sütunlarda ara
            return tableHeaders.value.some(header => {
                const cellValue = row[header];
                if (cellValue !== null && cellValue !== undefined) {
                    return cellValue.toString().toLowerCase().includes(query);
                }
                return false;
            });
        }
    });
});

// Sayfalanmış veri
const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return filteredData.value.slice(start, end);
});

// Toplam sayfa sayısı
const totalPages = computed(() => {
    return Math.ceil(filteredData.value.length / pageSize.value);
});

// Sayfa boyutu değiştiğinde sayfayı sıfırla
const changePageSize = (newSize: number) => {
    pageSize.value = newSize;
    currentPage.value = 1;
};

// Arama yapıldığında sayfayı sıfırla
const onSearchChange = () => {
    currentPage.value = 1;
};

// Geri dön
const goBack = () => {
    router.go(-1);
};

// Görünür sayfa numaralarını hesapla
const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    const total = totalPages.value;
    const current = currentPage.value;
    
    if (total <= 7) {
        // 7 sayfa veya daha azsa hepsini göster
        for (let i = 1; i <= total; i++) {
            pages.push(i);
        }
    } else {
        // İlk sayfa
        pages.push(1);
        
        if (current > 4) {
            pages.push('...');
        }
        
        // Orta sayfalar
        const start = Math.max(2, current - 1);
        const end = Math.min(total - 1, current + 1);
        
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        
        if (current < total - 3) {
            pages.push('...');
        }
        
        // Son sayfa
        if (total > 1) {
            pages.push(total);
        }
    }
    
    return pages;
};

// Excel'den veri yükleme
const loadExcelData = async () => {
    isLoadingExcel.value = true;
    try {
        // İstatistikleri yükle
        const data = await loadDashboardData();
        notificationStats.value = {
            total: data.notifications.total,
            open: data.notifications.open,
            closed: data.notifications.closed,
            interventionSLA: data.notifications.interventionSLA
        };
        
        // Tablo verilerini yükle
        const tableResult = await getTableData();
        tableHeaders.value = tableResult.headers;
        tableData.value = tableResult.data;
        nonEmptyColumnIndexes.value = tableResult.nonEmptyColumnIndexes;
        
        console.log('Bildirim detay verileri yüklendi:', {
            stats: notificationStats.value,
            headers: tableHeaders.value,
            dataCount: tableData.value.length,
            nonEmptyColumns: nonEmptyColumnIndexes.value.length
        });
    } catch (error) {
        console.error('Bildirim verileri yüklenirken hata:', error);
    } finally {
        isLoadingExcel.value = false;
    }
};

// Tarih formatla
const formatDate = (dateValue: any) => {
    if (!dateValue) return '-';
    try {
        const date = new Date(dateValue);
        return date.toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch {
        return dateValue.toString();
    }
};

// Hücre değerini formatla
const formatCellValue = (value: any) => {
    if (value === null || value === undefined || value === '') {
        return '-';
    }
    
    // Tarih kontrol et
    if (typeof value === 'string' || typeof value === 'number') {
        const dateValue = new Date(value);
        if (!isNaN(dateValue.getTime()) && value.toString().length > 8) {
            try {
                return dateValue.toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                });
            } catch {
                // Tarih formatı başarısızsa orijinal değeri döndür
            }
        }
    }
    
    // Sayı kontrol et
    if (typeof value === 'number') {
        if (Number.isInteger(value)) {
            return value.toString();
        } else {
            return value.toFixed(2);
        }
    }
    
    // String olarak döndür
    const strValue = value.toString();
    
    // Çok uzun stringleri kısalt
    if (strValue.length > 50) {
        return strValue.substring(0, 47) + '...';
    }
    
    return strValue;
};

// Sayfa yüklendiğinde verileri al
onMounted(() => {
    loadExcelData();
});
</script>
