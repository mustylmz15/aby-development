<template>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <!-- Kart Başlığı -->
        <div class="flex items-center mb-4">
            <div class="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg mr-3">
                <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Genel Bilgiler
            </h3>
        </div>

        <!-- Bilgi Listesi -->
        <div class="space-y-4">
            <!-- Arıza Numarası -->
            <div class="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
                <span class="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Arıza Numarası
                </span>
                <span class="text-sm font-semibold text-gray-900 dark:text-white font-mono">
                    {{ data.repairNumber }}
                </span>
            </div>

            <!-- Durum -->
            <div class="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
                <span class="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Durum
                </span>
                <span :class="getStatusClass(data.status)" class="px-2 py-1 rounded-full text-xs font-medium">
                    {{ getStatusText(data.status) }}
                </span>
            </div>

            <!-- Öncelik -->
            <div class="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
                <span class="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Öncelik
                </span>
                <span :class="getPriorityClass(data.priority)" class="px-2 py-1 rounded-full text-xs font-medium">
                    {{ getPriorityText(data.priority) }}
                </span>
            </div>

            <!-- Çağrı Referansı -->
            <div class="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
                <span class="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Çağrı Referansı
                </span>
                <span class="text-sm font-semibold text-gray-900 dark:text-white font-mono">
                    {{ data.callReference }}
                </span>
            </div>

            <!-- Oluşturulma Tarihi -->
            <div class="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
                <span class="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Oluşturulma Tarihi
                </span>
                <span class="text-sm text-gray-900 dark:text-white">
                    {{ formatDate(data.createdAt) }}
                </span>
            </div>

            <!-- Alınma Tarihi -->
            <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Alınma Tarihi
                </span>
                <span class="text-sm text-gray-900 dark:text-white">
                    {{ formatDate(data.receivedAt) }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { GeneralInfoCard } from '../api/fault'

interface Props {
    data: GeneralInfoCard
}

defineProps<Props>()

// Status formatı
const getStatusClass = (status: string) => {
    const statusClasses = {
        'RECEIVED': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        'IN_PROGRESS': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        'COMPLETED': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        'RETURNED': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
    }
    return statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-800'
}

const getStatusText = (status: string) => {
    const statusTexts = {
        'RECEIVED': 'Alındı',
        'IN_PROGRESS': 'İşlemde',
        'COMPLETED': 'Tamamlandı',
        'RETURNED': 'İade Edildi',
    }
    return statusTexts[status as keyof typeof statusTexts] || status
}

// Priority formatı
const getPriorityClass = (priority: string) => {
    const priorityClasses = {
        'LOW': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        'NORMAL': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        'HIGH': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
        'URGENT': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    }
    return priorityClasses[priority as keyof typeof priorityClasses] || 'bg-gray-100 text-gray-800'
}

const getPriorityText = (priority: string) => {
    const priorityTexts = {
        'LOW': 'Düşük',
        'NORMAL': 'Normal',
        'HIGH': 'Yüksek',
        'URGENT': 'Acil',
    }
    return priorityTexts[priority as keyof typeof priorityTexts] || priority
}

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
</script>
