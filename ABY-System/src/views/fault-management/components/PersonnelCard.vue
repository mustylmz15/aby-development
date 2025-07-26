<template>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <!-- Kart Başlığı -->
        <div class="flex items-center mb-4">
            <div class="flex items-center justify-center w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg mr-3">
                <svg class="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Personel ve Atama Bilgileri
            </h3>
        </div>

        <!-- Personel Listesi -->
        <div class="space-y-4">
            <!-- Bildiren Kişi -->
            <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div class="flex items-start">
                    <div class="flex items-center justify-center w-8 h-8 bg-green-100 dark:bg-green-800 rounded-full mr-3 flex-shrink-0">
                        <svg class="w-4 h-4 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <div class="flex-1">
                        <div class="flex items-center justify-between mb-1">
                            <h4 class="text-sm font-medium text-green-900 dark:text-green-100">
                                Bildiren Kişi
                            </h4>
                            <span class="text-xs bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">
                                Aktif
                            </span>
                        </div>
                        <p class="text-sm font-semibold text-green-800 dark:text-green-200">
                            {{ data.reportedBy.name }}
                        </p>
                        <p class="text-xs text-green-600 dark:text-green-300 mt-1">
                            {{ data.reportedBy.email }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Atanan Kişi -->
            <div :class="data.assignedTo ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'" 
                 class="border rounded-lg p-4">
                <div class="flex items-start">
                    <div :class="data.assignedTo ? 'bg-blue-100 dark:bg-blue-800' : 'bg-gray-200 dark:bg-gray-600'" 
                         class="flex items-center justify-center w-8 h-8 rounded-full mr-3 flex-shrink-0">
                        <svg :class="data.assignedTo ? 'text-blue-600 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400'" 
                             class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <div class="flex-1">
                        <div class="flex items-center justify-between mb-1">
                            <h4 :class="data.assignedTo ? 'text-blue-900 dark:text-blue-100' : 'text-gray-600 dark:text-gray-400'" 
                                class="text-sm font-medium">
                                Atanan Teknisyen
                            </h4>
                            <span v-if="data.assignedTo" 
                                  class="text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                                Atandı
                            </span>
                            <span v-else 
                                  class="text-xs bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                                Beklemede
                            </span>
                        </div>
                        <p v-if="data.assignedTo" 
                           class="text-sm font-semibold text-blue-800 dark:text-blue-200">
                            {{ data.assignedTo.name }}
                        </p>
                        <p v-else 
                           class="text-sm italic text-gray-500 dark:text-gray-400">
                            Henüz teknisyen atanmamış
                        </p>
                    </div>
                </div>
            </div>

            <!-- Tamamlayan Kişi -->
            <div :class="data.completedBy ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800' : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'" 
                 class="border rounded-lg p-4">
                <div class="flex items-start">
                    <div :class="data.completedBy ? 'bg-indigo-100 dark:bg-indigo-800' : 'bg-gray-200 dark:bg-gray-600'" 
                         class="flex items-center justify-center w-8 h-8 rounded-full mr-3 flex-shrink-0">
                        <svg :class="data.completedBy ? 'text-indigo-600 dark:text-indigo-300' : 'text-gray-500 dark:text-gray-400'" 
                             class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div class="flex-1">
                        <div class="flex items-center justify-between mb-1">
                            <h4 :class="data.completedBy ? 'text-indigo-900 dark:text-indigo-100' : 'text-gray-600 dark:text-gray-400'" 
                                class="text-sm font-medium">
                                Tamamlayan Teknisyen
                            </h4>
                            <span v-if="data.completedBy" 
                                  class="text-xs bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-200 px-2 py-1 rounded-full">
                                Tamamlandı
                            </span>
                            <span v-else 
                                  class="text-xs bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                                Beklemede
                            </span>
                        </div>
                        <p v-if="data.completedBy" 
                           class="text-sm font-semibold text-indigo-800 dark:text-indigo-200">
                            {{ data.completedBy.name }}
                        </p>
                        <p v-else 
                           class="text-sm italic text-gray-500 dark:text-gray-400">
                            Henüz işlem tamamlanmamış
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- İş Akışı Özeti -->
        <div class="mt-5 pt-4 border-t border-gray-200 dark:border-gray-600">
            <div class="flex items-center justify-between">
                <div class="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>İş Akışı:</span>
                </div>
                <div class="flex items-center space-x-2">
                    <!-- Bildirme -->
                    <div class="flex items-center">
                        <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span class="ml-1 text-xs text-gray-600 dark:text-gray-400">Bildirildi</span>
                    </div>
                    
                    <!-- Arrow -->
                    <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                    
                    <!-- Atama -->
                    <div class="flex items-center">
                        <div :class="data.assignedTo ? 'bg-blue-500' : 'bg-gray-300'" class="w-2 h-2 rounded-full"></div>
                        <span class="ml-1 text-xs text-gray-600 dark:text-gray-400">Atandı</span>
                    </div>
                    
                    <!-- Arrow -->
                    <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                    
                    <!-- Tamamlama -->
                    <div class="flex items-center">
                        <div :class="data.completedBy ? 'bg-indigo-500' : 'bg-gray-300'" class="w-2 h-2 rounded-full"></div>
                        <span class="ml-1 text-xs text-gray-600 dark:text-gray-400">Tamamlandı</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PersonnelCard } from '../api/fault'

interface Props {
    data: PersonnelCard
}

defineProps<Props>()
</script>
