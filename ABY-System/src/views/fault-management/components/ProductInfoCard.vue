<template>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <!-- Kart Başlığı -->
        <div class="flex items-center mb-4">
            <div class="flex items-center justify-center w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg mr-3">
                <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Ürün ve Envanter Bilgileri
            </h3>
        </div>

        <!-- Bilgi Listesi -->
        <div class="space-y-4">
            <!-- Ürün Adı -->
            <div class="border-b border-gray-100 dark:border-gray-700 pb-3">
                <span class="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">
                    Ürün Adı
                </span>
                <span class="text-sm font-semibold text-gray-900 dark:text-white">
                    {{ data.productName }}
                </span>
            </div>

            <!-- SKU ve Seri Numarası - Yan yana -->
            <div class="grid grid-cols-2 gap-4 border-b border-gray-100 dark:border-gray-700 pb-3">
                <div>
                    <span class="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">
                        SKU
                    </span>
                    <span class="text-sm font-mono text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded">
                        {{ data.productSku }}
                    </span>
                </div>
                <div>
                    <span class="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">
                        Seri Numarası
                    </span>
                    <span class="text-sm font-mono text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded">
                        {{ data.serialNumber }}
                    </span>
                </div>
            </div>

            <!-- Proje Bilgisi -->
            <div class="border-b border-gray-100 dark:border-gray-700 pb-3">
                <span class="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-2">
                    Mevcut Proje
                </span>
                <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-semibold text-blue-900 dark:text-blue-100">
                                {{ data.projectName }}
                            </p>
                            <p class="text-xs font-mono text-blue-700 dark:text-blue-300 mt-1">
                                {{ data.projectCode }}
                            </p>
                        </div>
                        <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </div>
                </div>
            </div>

            <!-- Depo Bilgisi -->
            <div>
                <span class="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-2">
                    Depo
                </span>
                <div class="flex items-center">
                    <div class="flex items-center justify-center w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg mr-3">
                        <svg class="w-4 h-4 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <span class="text-sm font-semibold text-gray-900 dark:text-white">
                        {{ data.warehouseName }}
                    </span>
                </div>
            </div>
        </div>

        <!-- Özet Bilgi -->
        <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
            <div class="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Bu ürün şu anda {{ data.projectName }} projesinde kullanılmaktadır
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ProductInfoCard } from '../api/fault'

interface Props {
    data: ProductInfoCard
}

defineProps<Props>()
</script>
