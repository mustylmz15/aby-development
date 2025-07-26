<template>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <!-- Kart Başlığı -->
        <div class="flex items-center mb-4">
            <div class="flex items-center justify-center w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-lg mr-3">
                <svg class="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Zaman Takibi
            </h3>
        </div>

        <!-- Timeline -->
        <div class="relative">
            <!-- Timeline Line -->
            <div class="absolute left-4 top-8 bottom-8 w-0.5 bg-gray-200 dark:bg-gray-600"></div>
            
            <!-- Timeline Items -->
            <div class="space-y-6">
                <!-- Alınma Zamanı -->
                <div class="relative flex items-start">
                    <div class="flex items-center justify-center w-8 h-8 bg-green-100 dark:bg-green-900 border-2 border-green-500 dark:border-green-400 rounded-full z-10">
                        <svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div class="ml-4 flex-1">
                        <div class="flex items-center justify-between mb-1">
                            <h4 class="text-sm font-medium text-gray-900 dark:text-white">
                                Arıza Alındı
                            </h4>
                            <span class="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">
                                Tamamlandı
                            </span>
                        </div>
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                            {{ formatDate(data.receivedAt) }}
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            {{ getTimeAgo(data.receivedAt) }}
                        </p>
                    </div>
                </div>

                <!-- Başlama Zamanı -->
                <div class="relative flex items-start">
                    <div :class="data.startedAt ? 'bg-blue-100 dark:bg-blue-900 border-blue-500 dark:border-blue-400' : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600'"
                         class="flex items-center justify-center w-8 h-8 border-2 rounded-full z-10">
                        <svg v-if="data.startedAt" class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <svg v-else class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div class="ml-4 flex-1">
                        <div class="flex items-center justify-between mb-1">
                            <h4 :class="data.startedAt ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'"
                                class="text-sm font-medium">
                                İşlem Başlatıldı
                            </h4>
                            <span v-if="data.startedAt"
                                  class="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                                Tamamlandı
                            </span>
                            <span v-else
                                  class="text-xs bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                                Beklemede
                            </span>
                        </div>
                        <p v-if="data.startedAt" class="text-sm text-gray-600 dark:text-gray-400">
                            {{ formatDate(data.startedAt) }}
                        </p>
                        <p v-else class="text-sm italic text-gray-500 dark:text-gray-400">
                            Henüz başlatılmamış
                        </p>
                        <p v-if="data.startedAt" class="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            {{ getTimeAgo(data.startedAt) }}
                        </p>
                    </div>
                </div>

                <!-- Tamamlanma Zamanı -->
                <div class="relative flex items-start">
                    <div :class="data.completedAt ? 'bg-purple-100 dark:bg-purple-900 border-purple-500 dark:border-purple-400' : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600'"
                         class="flex items-center justify-center w-8 h-8 border-2 rounded-full z-10">
                        <svg v-if="data.completedAt" class="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <svg v-else class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div class="ml-4 flex-1">
                        <div class="flex items-center justify-between mb-1">
                            <h4 :class="data.completedAt ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'"
                                class="text-sm font-medium">
                                İşlem Tamamlandı
                            </h4>
                            <span v-if="data.completedAt"
                                  class="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full">
                                Tamamlandı
                            </span>
                            <span v-else
                                  class="text-xs bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                                Beklemede
                            </span>
                        </div>
                        <p v-if="data.completedAt" class="text-sm text-gray-600 dark:text-gray-400">
                            {{ formatDate(data.completedAt) }}
                        </p>
                        <p v-else class="text-sm italic text-gray-500 dark:text-gray-400">
                            Henüz tamamlanmamış
                        </p>
                        <p v-if="data.completedAt" class="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            {{ getTimeAgo(data.completedAt) }}
                        </p>
                    </div>
                </div>

                <!-- İade Zamanı -->
                <div class="relative flex items-start">
                    <div :class="data.returnedAt ? 'bg-orange-100 dark:bg-orange-900 border-orange-500 dark:border-orange-400' : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600'"
                         class="flex items-center justify-center w-8 h-8 border-2 rounded-full z-10">
                        <svg v-if="data.returnedAt" class="w-4 h-4 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                        </svg>
                        <svg v-else class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div class="ml-4 flex-1">
                        <div class="flex items-center justify-between mb-1">
                            <h4 :class="data.returnedAt ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'"
                                class="text-sm font-medium">
                                Ürün İade Edildi
                            </h4>
                            <span v-if="data.returnedAt"
                                  class="text-xs bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-2 py-1 rounded-full">
                                Tamamlandı
                            </span>
                            <span v-else
                                  class="text-xs bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                                Beklemede
                            </span>
                        </div>
                        <p v-if="data.returnedAt" class="text-sm text-gray-600 dark:text-gray-400">
                            {{ formatDate(data.returnedAt) }}
                        </p>
                        <p v-else class="text-sm italic text-gray-500 dark:text-gray-400">
                            Henüz iade edilmemiş
                        </p>
                        <p v-if="data.returnedAt" class="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            {{ getTimeAgo(data.returnedAt) }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Süre Özeti -->
        <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
            <div class="grid grid-cols-2 gap-4 text-center">
                <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                    <p class="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">Toplam Süre</p>
                    <p class="text-sm font-semibold text-blue-900 dark:text-blue-100">
                        {{ getTotalDuration() }}
                    </p>
                </div>
                <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                    <p class="text-xs text-green-600 dark:text-green-400 font-medium mb-1">Aktif Süre</p>
                    <p class="text-sm font-semibold text-green-900 dark:text-green-100">
                        {{ getActiveDuration() }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { TimelineCard } from '../api/fault'

interface Props {
    data: TimelineCard
}

const props = defineProps<Props>()

// Tarih formatı
const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('tr-TR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

// Zaman farkı hesaplama
const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMinutes = Math.floor(diffMs / (1000 * 60))
    
    if (diffDays > 0) {
        return `${diffDays} gün önce`
    } else if (diffHours > 0) {
        return `${diffHours} saat önce`
    } else if (diffMinutes > 0) {
        return `${diffMinutes} dakika önce`
    } else {
        return 'Az önce'
    }
}

// Toplam süre hesaplama
const getTotalDuration = () => {
    const endDate = props.data.returnedAt || props.data.completedAt || new Date().toISOString()
    const startDate = props.data.receivedAt
    
    const diffMs = new Date(endDate).getTime() - new Date(startDate).getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    
    if (diffDays > 0) {
        return `${diffDays} gün ${diffHours} saat`
    } else {
        return `${diffHours} saat`
    }
}

// Aktif çalışma süresi
const getActiveDuration = () => {
    if (!props.data.startedAt) {
        return 'Başlatılmamış'
    }
    
    const endDate = props.data.completedAt || new Date().toISOString()
    const startDate = props.data.startedAt
    
    const diffMs = new Date(endDate).getTime() - new Date(startDate).getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    
    if (diffDays > 0) {
        return `${diffDays} gün ${diffHours} saat`
    } else {
        return `${diffHours} saat`
    }
}
</script>
