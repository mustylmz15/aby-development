<template>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <!-- Kart Başlığı -->
        <div class="flex items-center mb-4">
            <div class="flex items-center justify-center w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-lg mr-3">
                <svg class="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Maliyet ve Parça Bilgileri
            </h3>
        </div>

        <!-- Maliyet Özeti -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <!-- İşçilik Saatleri -->
            <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div class="flex items-center justify-between mb-2">
                    <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span v-if="data.laborHours" class="text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                        Belirlendi
                    </span>
                    <span v-else class="text-xs bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                        Beklemede
                    </span>
                </div>
                <h4 class="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">İşçilik Saatleri</h4>
                <p v-if="data.laborHours" class="text-lg font-bold text-blue-900 dark:text-blue-100">
                    {{ data.laborHours }} saat
                </p>
                <p v-else class="text-sm italic text-blue-700 dark:text-blue-300">
                    Henüz belirlenmemiş
                </p>
            </div>

            <!-- Toplam Maliyet -->
            <div class="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4">
                <div class="flex items-center justify-between mb-2">
                    <svg class="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    <span v-if="data.cost" class="text-xs bg-emerald-100 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200 px-2 py-1 rounded-full">
                        Hesaplandı
                    </span>
                    <span v-else class="text-xs bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                        Beklemede
                    </span>
                </div>
                <h4 class="text-sm font-medium text-emerald-900 dark:text-emerald-100 mb-1">Toplam Maliyet</h4>
                <p v-if="data.cost" class="text-lg font-bold text-emerald-900 dark:text-emerald-100">
                    {{ formatCurrency(data.cost) }}
                </p>
                <p v-else class="text-sm italic text-emerald-700 dark:text-emerald-300">
                    Henüz hesaplanmamış
                </p>
            </div>

            <!-- Parça Sayısı -->
            <div class="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                <div class="flex items-center justify-between mb-2">
                    <svg class="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span v-if="data.partsUsed.length > 0" class="text-xs bg-orange-100 dark:bg-orange-800 text-orange-800 dark:text-orange-200 px-2 py-1 rounded-full">
                        {{ data.partsUsed.length }} parça
                    </span>
                    <span v-else class="text-xs bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                        Parça yok
                    </span>
                </div>
                <h4 class="text-sm font-medium text-orange-900 dark:text-orange-100 mb-1">Kullanılan Parça</h4>
                <p class="text-lg font-bold text-orange-900 dark:text-orange-100">
                    {{ data.partsUsed.length }} adet
                </p>
            </div>
        </div>

        <!-- Kullanılan Parçalar Listesi -->
        <div class="border-t border-gray-200 dark:border-gray-600 pt-4">
            <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                <svg class="w-4 h-4 mr-2 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                Kullanılan Parçalar
            </h4>
            
            <div v-if="data.partsUsed.length > 0" class="space-y-3">
                <div v-for="(part, index) in data.partsUsed" :key="index" 
                     class="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                                <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-gray-900 dark:text-white">
                                    {{ part.name || `Parça ${index + 1}` }}
                                </p>
                                <p class="text-xs text-gray-500 dark:text-gray-400">
                                    Kod: {{ part.code || 'Belirtilmemiş' }}
                                </p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="text-sm font-semibold text-gray-900 dark:text-white">
                                {{ part.quantity || 1 }} adet
                            </p>
                            <p v-if="part.cost" class="text-xs text-gray-500 dark:text-gray-400">
                                {{ formatCurrency(part.cost) }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div v-else class="text-center py-6">
                <svg class="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Henüz parça kullanılmamış</p>
                <p class="text-xs text-gray-400 dark:text-gray-500">Onarım tamamlandığında kullanılan parçalar burada görünecek</p>
            </div>
        </div>

        <!-- Maliyet Breakdown -->
        <div v-if="data.cost || data.laborHours" class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
            <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Maliyet Dağılımı</h4>
            <div class="space-y-2">
                <div v-if="data.laborHours" class="flex justify-between text-sm">
                    <span class="text-gray-600 dark:text-gray-400">İşçilik ({{ data.laborHours }} saat)</span>
                    <span class="font-medium text-gray-900 dark:text-white">
                        {{ formatCurrency(getLaborCost()) }}
                    </span>
                </div>
                <div v-if="getPartsCost() > 0" class="flex justify-between text-sm">
                    <span class="text-gray-600 dark:text-gray-400">Parça Maliyeti</span>
                    <span class="font-medium text-gray-900 dark:text-white">
                        {{ formatCurrency(getPartsCost()) }}
                    </span>
                </div>
                <div v-if="data.cost" class="flex justify-between text-sm font-semibold border-t pt-2">
                    <span class="text-gray-900 dark:text-white">Toplam</span>
                    <span class="text-emerald-600 dark:text-emerald-400">
                        {{ formatCurrency(data.cost) }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { CostCard } from '../api/fault'

interface Props {
    data: CostCard
}

const props = defineProps<Props>()

// Para formatı
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY'
    }).format(amount)
}

// İşçilik maliyeti hesaplama (saatlik 100 TL varsayımı)
const getLaborCost = () => {
    if (!props.data.laborHours) return 0
    return props.data.laborHours * 100 // 100 TL/saat
}

// Parça maliyeti hesaplama
const getPartsCost = () => {
    return props.data.partsUsed.reduce((total, part) => {
        return total + (part.cost || 0) * (part.quantity || 1)
    }, 0)
}
</script>
