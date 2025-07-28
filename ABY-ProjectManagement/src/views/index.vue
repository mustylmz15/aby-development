<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
        <!-- Üst Başlık - Modernize -->
        <div class="flex items-center justify-between mb-8">
            <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                </div>
                <div>
                    <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                       Proje Takip Yönetim Sistemi
                    </h1>
                </div>
            </div>
            <div class="flex items-center space-x-4">
                <div class="bg-white dark:bg-gray-800 px-6 py-3 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <div class="flex items-center space-x-2">
                        <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                            {{ isLoadingExcel ? 'Yükleniyor...' : 'Verileri Yenile' }}
                        </span>
                    </div>
                </button>
            </div>
        </div>

        <!-- Üst Panel - Proje Durumu ve Dağılımları -->
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
            <!-- Sol Panel - Proje Durumu -->
            <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
                <div class="flex items-center justify-between mb-6">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold text-gray-800 dark:text-white">Proje Durumu</h3>
                    </div>
                    <div class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                        {{ currentYear }}
                    </div>
                </div>
                <div class="relative flex justify-center mb-8">
                    <div class="relative w-56 h-56">
                        <svg class="w-full h-full transform -rotate-90 drop-shadow-lg" viewBox="0 0 100 100">
                            <!-- Arka plan çemberi -->
                            <circle cx="50" cy="50" r="35" fill="none" stroke="#e5e7eb" stroke-width="8" opacity="0.3"/>
                            <!-- İlerleme çemberleri -->
                            <circle cx="50" cy="50" r="35" fill="none" stroke="url(#gradient1)" stroke-width="8" 
                                    stroke-dasharray="219.8" :stroke-dashoffset="219.8 - (219.8 * realProjectStats.delayed / 100)" 
                                    stroke-linecap="round" class="transition-all duration-1000 ease-out"/>
                            <circle cx="50" cy="50" r="35" fill="none" stroke="url(#gradient2)" stroke-width="8" 
                                    stroke-dasharray="219.8" :stroke-dashoffset="219.8 - (219.8 * realProjectStats.ontrack / 100)" 
                                    stroke-linecap="round" class="transition-all duration-1000 ease-out" 
                                    :style="{ transform: 'rotate(' + (realProjectStats.delayed * 3.6) + 'deg)', transformOrigin: '50% 50%' }"/>
                            <circle cx="50" cy="50" r="35" fill="none" stroke="url(#gradient3)" stroke-width="8" 
                                    stroke-dasharray="219.8" :stroke-dashoffset="219.8 - (219.8 * realProjectStats.completed / 100)" 
                                    stroke-linecap="round" class="transition-all duration-1000 ease-out" 
                                    :style="{ transform: 'rotate(' + ((realProjectStats.delayed + realProjectStats.ontrack) * 3.6) + 'deg)', transformOrigin: '50% 50%' }"/>
                            <!-- Gradients -->
                            <defs>
                                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style="stop-color:#ef4444;stop-opacity:1" />
                                    <stop offset="100%" style="stop-color:#dc2626;stop-opacity:1" />
                                </linearGradient>
                                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style="stop-color:#10b981;stop-opacity:1" />
                                    <stop offset="100%" style="stop-color:#059669;stop-opacity:1" />
                                </linearGradient>
                                <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:1" />
                                    <stop offset="100%" style="stop-color:#7c3aed;stop-opacity:1" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div class="absolute inset-0 flex items-center justify-center">
                            <div class="text-center">
                                <div class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{{ formatNumber(realTotalProjects) }}</div>
                                <div class="text-sm text-gray-500 dark:text-gray-400 font-medium">Toplam Proje</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="space-y-4">
                    <div @click="openProjectModal('delayed')" class="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl border border-red-200 dark:border-red-800 cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                        <div class="flex items-center space-x-3">
                            <div class="w-4 h-4 rounded-full bg-gradient-to-r from-red-500 to-pink-500 shadow-lg"></div>
                            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Proje Takvimi Gecikmede</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <span class="text-sm font-bold text-red-600 dark:text-red-400">{{ realProjectStats.delayed }}%</span>
                            <div class="w-12 h-2 bg-red-200 dark:bg-red-800 rounded-full">
                                <div class="h-full bg-gradient-to-r from-red-500 to-pink-500 rounded-full transition-all duration-1000" :style="{ width: realProjectStats.delayed + '%' }"></div>
                            </div>
                        </div>
                    </div>
                    <div @click="openProjectModal('ontrack')" class="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800 cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                        <div class="flex items-center space-x-3">
                            <div class="w-4 h-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg"></div>
                            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Proje Takvimine Uygun İlerliyor</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <span class="text-sm font-bold text-green-600 dark:text-green-400">{{ realProjectStats.ontrack }}%</span>
                            <div class="w-12 h-2 bg-green-200 dark:bg-green-800 rounded-full">
                                <div class="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-1000" :style="{ width: realProjectStats.ontrack + '%' }"></div>
                            </div>
                        </div>
                    </div>
                    <div @click="openProjectModal('completed')" class="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl border border-purple-200 dark:border-purple-800 cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                        <div class="flex items-center space-x-3">
                            <div class="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg"></div>
                            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Proje Tamamlandı</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <span class="text-sm font-bold text-purple-600 dark:text-purple-400">{{ realProjectStats.completed }}%</span>
                            <div class="w-12 h-2 bg-purple-200 dark:bg-purple-800 rounded-full">
                                <div class="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-1000" :style="{ width: realProjectStats.completed + '%' }"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sağ Panel - Proje Dağılımları -->
            <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
                <div class="flex items-center justify-between mb-6">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center">
                            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold text-gray-800 dark:text-white">Proje Dağılımları</h3>
                    </div>
                    <div class="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                        4 Direktörlük
                    </div>
                </div>
                <div class="relative flex justify-center mb-8">
                    <div class="relative w-56 h-56">
                        <svg class="w-full h-full transform -rotate-90 drop-shadow-lg" viewBox="0 0 100 100">
                            <!-- Arka plan çemberi -->
                            <circle cx="50" cy="50" r="35" fill="none" stroke="#e5e7eb" stroke-width="8" opacity="0.3"/>
                            <!-- Dağılım çemberleri -->
                            <circle cx="50" cy="50" r="35" fill="none" stroke="url(#gradient4)" stroke-width="8" 
                                    stroke-dasharray="219.8" :stroke-dashoffset="219.8 - (219.8 * realProjectDistribution.eld / 100)" 
                                    stroke-linecap="round" class="transition-all duration-1000 ease-out"/>
                            <circle cx="50" cy="50" r="35" fill="none" stroke="url(#gradient5)" stroke-width="8" 
                                    stroke-dasharray="219.8" :stroke-dashoffset="219.8 - (219.8 * realProjectDistribution.security / 100)" 
                                    stroke-linecap="round" class="transition-all duration-1000 ease-out" 
                                    :style="{ transform: 'rotate(' + (realProjectDistribution.eld * 3.6) + 'deg)', transformOrigin: '50% 50%' }"/>
                            <circle cx="50" cy="50" r="35" fill="none" stroke="url(#gradient6)" stroke-width="8" 
                                    stroke-dasharray="219.8" :stroke-dashoffset="219.8 - (219.8 * realProjectDistribution.health / 100)" 
                                    stroke-linecap="round" class="transition-all duration-1000 ease-out" 
                                    :style="{ transform: 'rotate(' + ((realProjectDistribution.eld + realProjectDistribution.security) * 3.6) + 'deg)', transformOrigin: '50% 50%' }"/>
                            <circle cx="50" cy="50" r="35" fill="none" stroke="url(#gradient7)" stroke-width="8" 
                                    stroke-dasharray="219.8" :stroke-dashoffset="219.8 - (219.8 * realProjectDistribution.transport / 100)" 
                                    stroke-linecap="round" class="transition-all duration-1000 ease-out" 
                                    :style="{ transform: 'rotate(' + ((realProjectDistribution.eld + realProjectDistribution.security + realProjectDistribution.health) * 3.6) + 'deg)', transformOrigin: '50% 50%' }"/>
                            <!-- Additional Gradients -->
                            <defs>
                                <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style="stop-color:#06b6d4;stop-opacity:1" />
                                    <stop offset="100%" style="stop-color:#0891b2;stop-opacity:1" />
                                </linearGradient>
                                <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style="stop-color:#0891b2;stop-opacity:1" />
                                    <stop offset="100%" style="stop-color:#0e7490;stop-opacity:1" />
                                </linearGradient>
                                <linearGradient id="gradient6" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style="stop-color:#7c3aed;stop-opacity:1" />
                                    <stop offset="100%" style="stop-color:#6d28d9;stop-opacity:1" />
                                </linearGradient>
                                <linearGradient id="gradient7" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style="stop-color:#a855f7;stop-opacity:1" />
                                    <stop offset="100%" style="stop-color:#9333ea;stop-opacity:1" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div class="absolute inset-0 flex items-center justify-center">
                            <div class="text-center">
                                <div class="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">100%</div>
                                <div class="text-sm text-gray-500 dark:text-gray-400 font-medium">Proje Dağılım</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="space-y-3">
                    <div class="flex items-center justify-between p-3 bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 rounded-xl border border-cyan-200 dark:border-cyan-800">
                        <div class="flex items-center space-x-3">
                            <div class="w-4 h-4 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 shadow-lg"></div>
                            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Entegre Lojistik Destek Direktörlüğü</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <span class="text-sm font-bold text-cyan-600 dark:text-cyan-400">{{ realProjectDistribution.eld }}%</span>
                            <div class="w-12 h-2 bg-cyan-200 dark:bg-cyan-800 rounded-full">
                                <div class="h-full bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full transition-all duration-1000" :style="{ width: realProjectDistribution.eld + '%' }"></div>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center justify-between p-3 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-xl border border-teal-200 dark:border-teal-800">
                        <div class="flex items-center space-x-3">
                            <div class="w-4 h-4 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 shadow-lg"></div>
                            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Güvenlik Sistemleri Program Direktörlüğü</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <span class="text-sm font-bold text-teal-600 dark:text-teal-400">{{ realProjectDistribution.security }}%</span>
                            <div class="w-12 h-2 bg-teal-200 dark:bg-teal-800 rounded-full">
                                <div class="h-full bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full transition-all duration-1000" :style="{ width: realProjectDistribution.security + '%' }"></div>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                        <div class="flex items-center space-x-3">
                            <div class="w-4 h-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg"></div>
                            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Tasarım Mühendisliği Direktörlüğü</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <span class="text-sm font-bold text-purple-600 dark:text-purple-400">{{ realProjectDistribution.health }}%</span>
                            <div class="w-12 h-2 bg-purple-200 dark:bg-purple-800 rounded-full">
                                <div class="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full transition-all duration-1000" :style="{ width: realProjectDistribution.health + '%' }"></div>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center justify-between p-3 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800">
                        <div class="flex items-center space-x-3">
                            <div class="w-4 h-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg"></div>
                            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Ulaşım ve Enerji Sistemleri Program Direktörlüğü</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <span class="text-sm font-bold text-indigo-600 dark:text-indigo-400">{{ realProjectDistribution.transport }}%</span>
                            <div class="w-12 h-2 bg-indigo-200 dark:bg-indigo-800 rounded-full">
                                <div class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000" :style="{ width: realProjectDistribution.transport + '%' }"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Alt Panel - Bütçe Dağılımı -->
        <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
            <div class="text-center mb-10">
                <div class="flex items-center justify-center space-x-3 mb-4">
                    <div class="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">2025 Bütçe Dağılımı</h3>
                </div>
                <div class="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white p-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300">
                    <div class="flex items-center justify-center space-x-2 mb-2">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                        <span class="text-sm font-medium opacity-90">Toplam Teslimat Bütçesi</span>
                    </div>
                    <div class="text-4xl font-bold tracking-tight">{{ formatMillion(budgetData.totalBudget) }}M TL</div>
                    <div class="text-sm opacity-75 mt-1">Entegre Lojistik Destek</div>
                </div>
            </div>

            <!-- Bütçe Progress Bar'ları -->
            <div class="space-y-8">
                <!-- Üst - 2025 Gerçekleşen Toplam Teslimat Bütçesi -->
                <div class="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-2xl border border-green-200 dark:border-green-800 shadow-lg">
                    <div class="flex justify-between items-center mb-4">
                        <div class="flex items-center space-x-3">
                            <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                                </svg>
                            </div>
                            <span class="text-lg font-medium text-gray-700 dark:text-gray-300">2025 Gerçekleşen Toplam Teslimat Bütçesi</span>
                        </div>
                        <span class="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{{ formatMillion(budgetData.realizedBudget) }}M TL</span>
                    </div>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6 shadow-inner">
                        <div class="bg-gradient-to-r from-green-500 to-emerald-600 h-6 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2" 
                             :style="{ width: progressPercentages.realizedTotal + '%' }">
                            <span class="text-white text-xs font-bold">{{ progressPercentages.realizedTotal }}%</span>
                        </div>
                    </div>
                    <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                        <span>Başlangıç</span>
                        <span class="font-medium">Toplam Bütçe Oranı</span>
                    </div>
                </div>

                <!-- Alt - Yurtdışı ve Yurtiçi Bütçeleri -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- Yurtdışı Bütçesi -->
                    <div class="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-5 rounded-xl border border-orange-200 dark:border-orange-800 shadow-md">
                        <div class="flex justify-between items-center mb-3">
                            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Yurtdışı Gerçekleşen Teslimat Bütçesi</span>
                            <span class="text-sm font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">{{ formatMillion(budgetData.internationalBudget) }}M TL</span>
                        </div>
                        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 shadow-inner">
                            <div class="bg-gradient-to-r from-orange-500 to-red-600 h-4 rounded-full transition-all duration-1000 ease-out" 
                                 :style="{ width: Math.max(progressPercentages.realizedInternational, 5) + '%' }"></div>
                        </div>
                        <div class="text-right text-xs text-gray-600 dark:text-gray-400 font-medium mt-1">{{ progressPercentages.realizedInternational }}% (Gerçekleşen İçinde)</div>
                    </div>

                    <!-- Yurtiçi Bütçesi -->
                    <div class="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-purple-900/20 p-5 rounded-xl border border-purple-200 dark:border-purple-800 shadow-md">
                        <div class="flex justify-between items-center mb-3">
                            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Yurtiçi Gerçekleşen Teslimat Bütçesi</span>
                            <span class="text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{{ formatMillion(budgetData.domesticBudget) }}M TL</span>
                        </div>
                        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 shadow-inner">
                            <div class="bg-gradient-to-r from-purple-500 to-pink-600 h-4 rounded-full transition-all duration-1000 ease-out" 
                                 :style="{ width: progressPercentages.realizedDomestic + '%' }"></div>
                        </div>
                        <div class="text-right text-xs text-gray-600 dark:text-gray-400 font-medium mt-1">{{ progressPercentages.realizedDomestic }}% (Gerçekleşen İçinde)</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bildirim İstatistikleri -->
        <div class="mt-8">
            <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
                <div class="text-center mb-8">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center justify-center space-x-3">
                            <div class="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM9 7l-5 5h5V7zM12 2a10 10 0 100 20 10 10 0 000-20z"></path>
                                </svg>
                            </div>
                            <h3 class="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Bildirim Durumu</h3>
                        </div>
                        <button @click="goToNotifications" 
                                class="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 text-sm font-medium">
                            <div class="flex items-center space-x-2">
                                <span>Tümünü Gör</span>
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </div>
                        </button>
                    </div>
                    <div class="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg inline-block">
                        5 Ana Kategori
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                <!-- Toplam Bildirim Sayısı -->
                <div class="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-white">
                    <div class="text-center">
                        <div class="w-16 h-16 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4 19l5-5V9l-5 5v5z"></path>
                            </svg>
                        </div>
                        <h4 class="text-lg font-bold text-white mb-2">Bildirim Sayısı</h4>
                        <div class="text-3xl font-bold text-white mb-3">{{ formatNumber(notificationStats.total) }}</div>
                        <div class="w-full bg-white bg-opacity-20 rounded-full h-2">
                            <div class="bg-white h-2 rounded-full transition-all duration-1000" style="width: 100%"></div>
                        </div>
                        <div class="text-xs text-blue-100 mt-2 font-medium">Toplam Bildirim</div>
                    </div>
                </div>

                <!-- Açık Bildirim Sayısı -->
                <div class="bg-gradient-to-br from-green-500 via-green-600 to-emerald-700 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-white">
                    <div class="text-center">
                        <div class="w-16 h-16 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h4 class="text-lg font-bold text-white mb-2">Açık Bildirim Sayısı</h4>
                        <div class="text-3xl font-bold text-white mb-3">{{ formatNumber(notificationStats.open) }}</div>
                        <div class="w-full bg-white bg-opacity-20 rounded-full h-2">
                            <div class="bg-white h-2 rounded-full transition-all duration-1000" :style="{ width: (notificationStats.open / notificationStats.total * 100) + '%' }"></div>
                        </div>
                        <div class="text-xs text-green-100 mt-2 font-medium">{{ Math.round(notificationStats.open / notificationStats.total * 100) }}% Açık</div>
                    </div>
                </div>

                <!-- Kapalı Bildirim Sayısı -->
                <div class="bg-gradient-to-br from-gray-500 via-gray-600 to-slate-700 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-white">
                    <div class="text-center">
                        <div class="w-16 h-16 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
                            </svg>
                        </div>
                        <h4 class="text-lg font-bold text-white mb-2">Kapalı Bildirim Sayısı</h4>
                        <div class="text-3xl font-bold text-white mb-3">{{ formatNumber(notificationStats.closed) }}</div>
                        <div class="w-full bg-white bg-opacity-20 rounded-full h-2">
                            <div class="bg-white h-2 rounded-full transition-all duration-1000" :style="{ width: (notificationStats.closed / notificationStats.total * 100) + '%' }"></div>
                        </div>
                        <div class="text-xs text-gray-100 mt-2 font-medium">{{ Math.round(notificationStats.closed / notificationStats.total * 100) }}% Kapalı</div>
                    </div>
                </div>

                <!-- Müdahale SLA Süresi Geçen
                <div class="bg-gradient-to-br from-yellow-500 via-yellow-600 to-amber-700 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-white">
                    <div class="text-center">
                        <div class="w-16 h-16 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h4 class="text-lg font-bold text-white mb-2">Müdahale SLA Süresi Geçen</h4>
                        <div class="text-3xl font-bold text-white mb-3">{{ formatNumber(notificationStats.interventionSLA) }}</div>
                        <div class="w-full bg-white bg-opacity-20 rounded-full h-2">
                            <div class="bg-white h-2 rounded-full transition-all duration-1000" :style="{ width: (notificationStats.interventionSLA / notificationStats.total * 100) + '%' }"></div>
                        </div>
                        <div class="text-xs text-yellow-100 mt-2 font-medium">{{ Math.round(notificationStats.interventionSLA / notificationStats.total * 100) }}% SLA Aşımı</div>
                    </div>        
                </div>
                 -->
                  <div class="bg-gradient-to-br from-yellow-500 via-yellow-600 to-amber-700 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-white">
                    <div class="text-center">
                        <div class="w-16 h-16 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h4 class="text-lg font-bold text-white mb-2">Müdahale SLA Süresi Geçen</h4>
                        <div class="text-3xl font-bold text-white mb-3">178</div>
                        <div class="w-full bg-white bg-opacity-20 rounded-full h-2">
                            <div class="bg-white h-2 rounded-full transition-all duration-1000" :style="{ width: (178 / notificationStats.total * 100) + '%' }"></div>
                        </div>
                        <div class="text-xs text-yellow-100 mt-2 font-medium">{{ Math.round(178 / notificationStats.total * 100) }}% SLA Aşımı</div>
                    </div>        
                </div>
                <!-- Onarım SLA Süresi Geçen -->
                <div class="bg-gradient-to-br from-red-500 via-red-600 to-rose-700 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-white">
                    <div class="text-center">
                        <div class="w-16 h-16 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h4 class="text-lg font-bold text-white mb-2">Onarım SLA Süresi Geçen</h4>
                        <!--
                        <div class="text-3xl font-bold text-white mb-3">{{ formatNumber(notificationStats.repairSLA) }}</div>
                        -->
                        <div class="text-3xl font-bold text-white mb-3">22</div>
                        <div class="w-full bg-white bg-opacity-20 rounded-full h-2">
                            <div class="bg-white h-2 rounded-full transition-all duration-1000" :style="{ width: (notificationStats.repairSLA / notificationStats.total * 100) + '%' }"></div>
                        </div>
                        <!--- Onarım SLA Aşımı Yüzdesi Excelden ceken
                        <div class="text-xs text-red-100 mt-2 font-medium">{{ Math.round(notificationStats.repairSLA / notificationStats.total * 100) }}% SLA Aşımı</div>
                        -->
                        <div class="text-xs text-red-100 mt-2 font-medium">{{ Math.round(22 / notificationStats.total * 100) }}% SLA Aşımı</div>  
                    </div>
                </div>
            </div>
            </div>
        </div>

        <!-- Görev Durumu -->
        <div class="mt-8">
            <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
                <div class="text-center mb-8">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center justify-center space-x-3">
                            <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            </div>
                            <h3 class="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Görev Durumu</h3>
                        </div>
                        <div class="flex items-center space-x-4">
                            <button @click="goToTasks" 
                                    class="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-4 py-2 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 text-sm font-medium">
                                <div class="flex items-center space-x-2">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                                    </svg>
                                    <span>Tablo Görünümü</span>
                                </div>
                            </button>
                            <button @click="goToTaskCalendar" 
                                    class="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-4 py-2 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 text-sm font-medium">
                                <div class="flex items-center space-x-2">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                    <span>Takvim Görünümü</span>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div class="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg inline-block">
                        3 Ana Kategori
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <!-- Yurt İçi Görev -->
                    <div class="bg-gradient-to-br from-teal-500 via-teal-600 to-cyan-700 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-white">
                        <div class="text-center">
                            <div class="w-16 h-16 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"></path>
                                </svg>
                            </div>
                            <h4 class="text-lg font-bold text-white mb-2">Yurt İçi Görev Gün Sayısı</h4>
                            <div class="text-3xl font-bold text-white mb-3">{{ formatNumber(taskStats.domestic) }} Gün</div>
                            <div class="w-full bg-white bg-opacity-20 rounded-full h-2">
                                <div class="bg-white h-2 rounded-full transition-all duration-1000" :style="{ width: (taskStats.domestic / (taskStats.domestic + taskStats.international) * 100) + '%' }"></div>
                            </div>
                            <div class="text-xs text-teal-100 mt-2 font-medium">{{ Math.round(taskStats.domestic / (taskStats.domestic + taskStats.international) * 100) }}% Yurt İçi</div>
                        </div>
                    </div>

                    <!-- Yurt Dışı Görev -->
                    <div class="bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-700 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-white">
                        <div class="text-center">
                            <div class="w-16 h-16 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h4 class="text-lg font-bold text-white mb-2">Yurt Dışı Görev Gün Sayısı</h4>
                            <div class="text-3xl font-bold text-white mb-3">{{ formatNumber(taskStats.international) }} Gün</div>
                            <div class="w-full bg-white bg-opacity-20 rounded-full h-2">
                                <div class="bg-white h-2 rounded-full transition-all duration-1000" :style="{ width: (taskStats.international / (taskStats.domestic + taskStats.international) * 100) + '%' }"></div>
                            </div>
                            <div class="text-xs text-indigo-100 mt-2 font-medium">{{ Math.round(taskStats.international / (taskStats.domestic + taskStats.international) * 100) }}% Yurt Dışı</div>
                        </div>
                    </div>

                    <!-- Şu Anda Görevde Olan Personel -->
                    <div class="bg-gradient-to-br from-emerald-500 via-emerald-600 to-green-700 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-white">
                        <div class="text-center">
                            <div class="w-16 h-16 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                                </svg>
                            </div>
                            <h4 class="text-lg font-bold text-white mb-2">Şu Anda Görevde Olan Personel</h4>
                            <div class="text-3xl font-bold text-white mb-3">{{ formatNumber(taskStats.currentPersonnel) }}</div>
                            <div class="w-full bg-white bg-opacity-20 rounded-full h-2">
                                <div class="bg-white h-2 rounded-full transition-all duration-1000" style="width: 100%"></div>
                            </div>
                            <div class="text-xs text-emerald-100 mt-2 font-medium">Aktif Görevli</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Proje Durumu Modal -->
    <div v-if="showProjectModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <!-- Modal Header -->
            <div :class="`bg-gradient-to-r p-6 text-white ${
                getModalColor(modalProjectType) === 'red' ? 'from-red-500 to-pink-500' :
                getModalColor(modalProjectType) === 'green' ? 'from-green-500 to-emerald-500' :
                'from-purple-500 to-indigo-500'
            }`">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold">{{ getModalTitle(modalProjectType) }}</h3>
                            <p class="text-white text-opacity-90 text-sm">{{ modalProjects.length }} proje listelendi</p>
                        </div>
                    </div>
                    <button @click="closeProjectModal" class="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center hover:bg-opacity-30 transition-all duration-200">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Modal Content -->
            <div class="p-6 overflow-y-auto max-h-[60vh]">
                <div v-if="modalProjects.length === 0" class="text-center py-8">
                    <div class="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                    </div>
                    <p class="text-gray-500 dark:text-gray-400">Bu kategoride henüz proje bulunmuyor.</p>
                </div>

                <div v-else class="space-y-4">
                    <div v-for="project in modalProjects" :key="project.projeKodu" 
                         class="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300">
                        <div class="flex items-center justify-between">
                            <div class="flex-1">
                                <div class="flex items-center space-x-3 mb-2">
                                    <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold rounded-full">
                                        {{ project.projeKodu }}
                                    </span>
                                    <h4 class="font-semibold text-gray-800 dark:text-white">{{ project.projeAdi || 'Proje Adı Belirtilmemiş' }}</h4>
                                </div>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
                                    <div class="flex items-center space-x-2">
                                        <span class="font-medium">Durum:</span>
                                        <span :class="`px-2 py-1 rounded-full text-xs font-medium ${
                                            project.projeGecikmeDurumu === 'Gecikmiş' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                                            project.projeGecikmeDurumu === 'Zamanında' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                            'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                        }`">
                                            {{ project.projeGecikmeDurumu }}
                                        </span>
                                    </div>
                                    <div class="flex items-center space-x-2">
                                        <span class="font-medium">Sorumlu Birim:</span>
                                        <span class="text-xs bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">{{ project.kurulumSorumluBirimi || 'Belirtilmemiş' }}</span>
                                    </div>
                                    <div class="flex items-center space-x-2">
                                        <span class="font-medium">Garanti Başlangıç:</span>
                                        <span>{{ project.garantiBaslangicTarihi || 'Belirtilmemiş' }}</span>
                                    </div>
                                    <div class="flex items-center space-x-2">
                                        <span class="font-medium">Garanti Bitiş:</span>
                                        <span>{{ project.garantiBitisTarihi || 'Belirtilmemiş' }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modal Footer -->
            <div class="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-t border-gray-200 dark:border-gray-600">
                <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600 dark:text-gray-400">
                        Toplam {{ modalProjects.length }} proje gösteriliyor
                    </span>
                    <div class="flex space-x-3">
                        <button @click="goToProjectDetails" class="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200">
                            Detay Gör
                        </button>
                        <button @click="closeProjectModal" class="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors duration-200">
                            Kapat
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useExcel } from '@/composables/use-excel';
import { useProjectStats } from '@/composables/use-project-stats';

const currentYear = new Date().getFullYear();
const totalProjects = ref(85);
const router = useRouter();

// Sayıları nokta ile ayıran formatlar
const formatNumber = (num: number): string => {
    return num.toLocaleString('tr-TR');
};

const formatMillion = (num: number): string => {
    return (num / 1000000).toFixed(0);
};

// Excel composable'ını kullan
const { loadDashboardData } = useExcel();

// Proje istatistikleri composable'ını kullan
const { 
    loadProjectsFromExcel, 
    projectStats: realProjectStats, 
    projectDistribution: realProjectDistribution,
    totalProjects: realTotalProjects,
    projects: allProjects  // Proje listesini de al
} = useProjectStats();

// Loading state
const isLoadingExcel = ref(false);

// Proje Durumu İstatistikleri
const projectStats = ref({
    delayed: 35,      // Proje takvimi gecikmede
    ontrack: 45,      // Proje takvimine uygun ilerliyor
    completed: 20     // Proje tamamlandı
});

// Proje Dağılımları (4 Direktörlük)
const projectDistribution = ref({
    eld: 40,          // Entegre Lojistik Destek Direktörlüğü
    security: 25,     // Güvenlik Sistemleri Program Direktörlüğü
    health: 20,       // Sağlık Sistemleri Program Direktörlüğü
    transport: 15     // Ulaşım ve Enerji Sistemleri Program Direktörlüğü
});

// 2025 Bütçe Dağılımı (TL)
const budgetData = ref({
    totalBudget: 48000000,      // 48M TL - Toplam tahmini bütçesi
    realizedBudget: 25000000,   // 25M TL - Gerçekleşen ELD bütçesi
    domesticBudget: 24000000,   // 24M TL - Yurtiçi bütçesi
    internationalBudget: 1000000 // 1M TL - Yurtdışı bütçesi
});

// Bildirim İstatistikleri
const notificationStats = ref({
    total: 248,           // Toplam bildirim sayısı
    open: 156,            // Açık bildirim sayısı
    closed: 92,           // Kapalı bildirim sayısı
    interventionSLA: 23,  // Müdahale SLA süresi geçen bildirim sayısı
    repairSLA: 12         // Onarım SLA süresi geçen bildirim sayısı
});

// Görev İstatistikleri
const taskStats = ref({
    domestic: 45,         // Yurt içi görev gün sayısı
    international: 12,    // Yurt dışı görev gün sayısı
    currentPersonnel: 23  // Şu anda görevde olan personel sayısı
});

// Excel'den veri yükleme
const loadExcelData = async () => {
    isLoadingExcel.value = true;
    try {
        // Proje verilerini yükle
        await loadProjectsFromExcel();
        
        // Diğer verileri yükle
        const data = await loadDashboardData();
        
        // Verileri güncelle
        notificationStats.value = data.notifications;
        taskStats.value = data.tasks;
        projectStats.value = data.projects;
        projectDistribution.value = data.distribution;
        budgetData.value = data.budget;
        
        console.log('Excel verileri başarıyla yüklendi:', data);
    } catch (error) {
        console.error('Excel verileri yüklenirken hata:', error);
    } finally {
        isLoadingExcel.value = false;
    }
};

// Sayfa yüklendiğinde Excel verilerini yükle
onMounted(() => {
    loadExcelData();
});

// Bildirim sayfasına yönlendir
const goToNotifications = () => {
    router.push('/s1-bildirim');
};

// Görev sayfasına yönlendir
const goToTasks = () => {
    router.push('/personel-gorev');
};

// Personel Görev Takvimi'ne yönlendir
const goToTaskCalendar = () => {
    router.push('/personel-gorev-takvimi');
};

// Yüzdesel hesaplamalar - Toplam bütçeye göre
const realizedPercentage = computed(() => {
    return Math.round((budgetData.value.realizedBudget / budgetData.value.totalBudget) * 100);
});

const domesticPercentage = computed(() => {
    return Math.round((budgetData.value.domesticBudget / budgetData.value.totalBudget) * 100);
});

const internationalPercentage = computed(() => {
    return Math.round((budgetData.value.internationalBudget / budgetData.value.totalBudget) * 100);
});

// Gerçekleşen bütçeye göre yurt içi/dışı dağılımı
const domesticOfRealizedPercentage = computed(() => {
    return Math.round((budgetData.value.domesticBudget / budgetData.value.realizedBudget) * 100);
});

const internationalOfRealizedPercentage = computed(() => {
    return Math.round((budgetData.value.internationalBudget / budgetData.value.realizedBudget) * 100);
});

// Progress Bar'lar için yüzde değerleri
const progressPercentages = computed(() => {
    return {
        totalBudget: 100,                           // 48M toplam bütçe - tam bar
        realizedTotal: realizedPercentage.value,    // 25M / 48M = %52 (toplam bütçeye göre)
        realizedGeneral: 100,                       // Kendi kategorisinde %100 olarak göster
        realizedInternational: internationalOfRealizedPercentage.value, // 1M / 25M = %4 (gerçekleşen bütçeye göre)
        realizedDomestic: domesticOfRealizedPercentage.value            // 24M / 25M = %96 (gerçekleşen bütçeye göre)
    };
});

// Modal için state
const showProjectModal = ref(false);
const modalProjectType = ref('');
const modalProjects = ref<any[]>([]);

// Modal'ı açma fonksiyonu
const openProjectModal = (projectType: string) => {
    modalProjectType.value = projectType;
    
    // allProjects composable'dan gelen gerçek veriler
    let filteredProjects: any[] = [];
    
    if (projectType === 'delayed') {
        filteredProjects = allProjects.value.filter(p => p.projeGecikmeDurumu === 'Gecikmiş');
    } else if (projectType === 'ontrack') {
        filteredProjects = allProjects.value.filter(p => p.projeGecikmeDurumu === 'Zamanında');
    } else if (projectType === 'completed') {
        filteredProjects = allProjects.value.filter(p => p.projeGecikmeDurumu === 'Tamamlandı');
    }
    
    modalProjects.value = filteredProjects;
    showProjectModal.value = true;
};

// Modal'ı kapatma fonksiyonu
const closeProjectModal = () => {
    showProjectModal.value = false;
    modalProjectType.value = '';
    modalProjects.value = [];
};

// Proje detaylarına gitme fonksiyonu
const goToProjectDetails = () => {
    const statusMap = {
        'delayed': 'Gecikmiş',
        'ontrack': 'Zamanında',
        'completed': 'Tamamlandı'
    };
    
    const projectStatus = statusMap[modalProjectType.value as keyof typeof statusMap];
    
    closeProjectModal();
    router.push({
        path: '/proje-ozeti',
        query: {
            projeDurumu: projectStatus
        }
    });
};

// Modal başlık ve renk ayarları
const getModalTitle = (type: string) => {
    switch(type) {
        case 'delayed': return 'Proje Takvimi Gecikmede';
        case 'ontrack': return 'Proje Takvimine Uygun İlerliyor';
        case 'completed': return 'Proje Tamamlandı';
        default: return '';
    }
};

const getModalColor = (type: string) => {
    switch(type) {
        case 'delayed': return 'red';
        case 'ontrack': return 'green';
        case 'completed': return 'purple';
        default: return 'gray';
    }
};
</script>
