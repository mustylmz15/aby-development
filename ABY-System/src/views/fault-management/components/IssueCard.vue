<template>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <!-- Kart Başlığı -->
        <div class="flex items-center mb-4">
            <div class="flex items-center justify-center w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg mr-3">
                <svg class="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Sorun ve Tanı Bilgileri
            </h3>
        </div>

        <!-- Bilgi Listesi -->
        <div class="space-y-5">
            <!-- Bildirilen Sorun -->
            <div>
                <div class="flex items-center mb-2">
                    <svg class="w-4 h-4 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span class="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Bildirilen Sorun
                    </span>
                </div>
                <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <p class="text-sm text-red-900 dark:text-red-100 leading-relaxed">
                        {{ data.reportedIssue }}
                    </p>
                </div>
            </div>

            <!-- Tanı -->
            <div>
                <div class="flex items-center mb-2">
                    <svg class="w-4 h-4 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    <span class="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Kargo Bilgileri
                    </span>
                </div>
                <div v-if="data.diagnosis" class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <p class="text-sm text-blue-900 dark:text-blue-100 leading-relaxed">
                        {{ data.diagnosis }}
                    </p>
                </div>
                <div v-else class="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <div class="flex items-center text-gray-500 dark:text-gray-400">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="text-sm italic">Henüz tanı yapılmamış</span>
                    </div>
                </div>
            </div>

            <!-- Yapılan İşlemler -->
            <div>
                <div class="flex items-center mb-2">
                    <svg class="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span class="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Yapılan İşlemler
                    </span>
                </div>
                <div v-if="data.actionsTaken" class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <p class="text-sm text-green-900 dark:text-green-100 leading-relaxed">
                        {{ data.actionsTaken }}
                    </p>
                </div>
                <div v-else class="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <div class="flex items-center text-gray-500 dark:text-gray-400">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="text-sm italic">Henüz işlem yapılmamış</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Durum Özeti -->
        <div class="mt-5 pt-4 border-t border-gray-200 dark:border-gray-600">
            <div class="flex items-center justify-between">
                <div class="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>İşlem Durumu:</span>
                </div>
                <span :class="getProgressStatusClass()" class="text-xs font-medium px-2 py-1 rounded-full">
                    {{ getProgressStatusText() }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IssueCard } from '../api/fault'

interface Props {
    data: IssueCard
}

const props = defineProps<Props>()

// İşlem durumu hesaplama
const getProgressStatusClass = () => {
    const hasIssue = !!props.data.reportedIssue
    const hasDiagnosis = !!props.data.diagnosis
    const hasActions = !!props.data.actionsTaken

    if (hasIssue && hasDiagnosis && hasActions) {
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    } else if (hasIssue && hasDiagnosis) {
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
    } else if (hasIssue) {
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    }
    return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
}

const getProgressStatusText = () => {
    const hasIssue = !!props.data.reportedIssue
    const hasDiagnosis = !!props.data.diagnosis
    const hasActions = !!props.data.actionsTaken

    if (hasIssue && hasDiagnosis && hasActions) {
        return 'Tamamlandı'
    } else if (hasIssue && hasDiagnosis) {
        return 'Bildirildi'
    } else if (hasIssue) {
        return 'Sorun Bildirildi'
    }
    return 'Beklemede'
}
</script>
