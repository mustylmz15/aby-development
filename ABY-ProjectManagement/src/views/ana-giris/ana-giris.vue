<template>
    <div class="min-h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        <!-- Animated Background Elements -->
        <div class="absolute inset-0">
            <div class="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div class="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div class="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <!-- Main Content -->
        <div class="relative z-10 flex flex-col min-h-screen">
            <!-- Header Section -->
            <div class="text-center py-16 px-4">
                <h1 class="text-6xl font-bold text-white mb-6 animate-fadeInDown">
                    <span class="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                        ABY
                    </span>
                    <span class="text-white ml-4">Yönetim Sistemi</span>
                </h1>
                <p class="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fadeInUp">
                    Sistem alanlarından birini seçerek devam edin. Geliştirilmekte olan alanlar yakında kullanıma açılacaktır.
                </p>
                
                <!-- System Status Indicators -->
                <div class="flex items-center justify-center space-x-8 mt-8">
                    <div class="flex items-center">
                        <div class="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                        <span class="text-green-400 font-medium">1 Aktif Modül</span>
                    </div>
                    <div class="flex items-center">
                        <div class="w-3 h-3 bg-yellow-400 rounded-full mr-2 animate-pulse"></div>
                        <span class="text-yellow-400 font-medium">7 Geliştiriliyor</span>
                    </div>
                </div>

                
            </div>

            <!-- Cards Grid -->
            <div class="flex-1 px-8 pb-16">
                <div class="max-w-7xl mx-auto">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        
                        <!-- Envanter Yönetimi Kartı (Active) -->
                        <div 
                            @click="navigateToInventory"
                            class="group relative h-80 bg-white/10 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 cursor-pointer transform hover:-translate-y-4 hover:scale-105 overflow-hidden"
                        >
                            <!-- Enhanced Background with SVG Pattern -->
                            <div class="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-700">
                                <!-- Gradient Layer -->
                                <div class="w-full h-full bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 animate-gradient-shift"></div>
                                <!-- SVG Pattern Layer - Warehouse/Inventory Theme -->
                                <div class="absolute inset-0 bg-pattern-warehouse animate-pattern-slide"></div>
                                <!-- Additional Gradient Overlay -->
                                <div class="absolute inset-0 bg-gradient-to-t from-transparent via-blue-500/20 to-transparent animate-sweep"></div>
                            </div>

                            <!-- Floating Elements -->
                            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div class="absolute top-6 left-6 w-3 h-3 bg-white rounded-full animate-ping"></div>
                                <div class="absolute top-16 right-12 w-2 h-2 bg-yellow-300 rounded-full animate-bounce delay-300"></div>
                                <div class="absolute bottom-20 left-12 w-2.5 h-2.5 bg-pink-300 rounded-full animate-pulse delay-500"></div>
                                <div class="absolute bottom-8 right-6 w-2 h-2 bg-green-300 rounded-full animate-ping delay-700"></div>
                            </div>

                            <!-- Content -->
                            <div class="relative z-20 p-8 h-full flex flex-col">
                                <!-- Icon -->
                                <div class="mb-6">
                                    <div class="w-20 h-20 bg-blue-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                                        <svg class="w-10 h-10 text-blue-400 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
                                        </svg>
                                    </div>
                                </div>

                                <!-- Title and Description -->
                                <div class="flex-1">
                                    <h3 class="text-2xl font-bold text-white group-hover:text-white transition-colors duration-300 mb-3">
                                        Proje Yönetimi
                                    </h3>
                                    <p class="text-gray-300 group-hover:text-gray-100 transition-colors duration-300 leading-relaxed">
                                        Proje takibi, personel yönetimi, görev dağılımı ve proje raporları
                                    </p>
                                </div>

                                <!-- Status Badge -->
                                <div class="mt-6">
                                    <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-500/20 text-green-300 group-hover:bg-white/20 group-hover:text-white transition-all duration-300">
                                        <span class="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                                        Aktif
                                    </span>
                                </div>

                                <!-- Hover Arrow -->
                                <div class="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                                    </svg>
                                </div>
                            </div>

                            <!-- Glowing Border Effect -->
                            <div class="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/30 transition-all duration-500"></div>
                        </div>

                        <!-- Personel Takip Kartı -->
                        <div class="group relative h-80 bg-white/10 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-orange-500/25 transition-all duration-500 cursor-pointer transform hover:-translate-y-2 overflow-hidden">
                            <!-- Background Image on Hover -->
                            <div class="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700">
                                <div class="w-full h-full bg-gradient-to-br from-orange-500 via-red-500 to-pink-600"></div>
                                <div class="absolute inset-0 bg-pattern-lines"></div>
                            </div>

                            <div class="relative z-20 p-8 h-full flex flex-col">
                                <div class="mb-6">
                                    <div class="w-20 h-20 bg-orange-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                        <svg class="w-10 h-10 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                                        </svg>
                                    </div>
                                </div>

                                <div class="flex-1">
                                    <h3 class="text-2xl font-bold text-white mb-3">Personel Takip</h3>
                                    <p class="text-gray-300 leading-relaxed">Kullanıcı yönetimi, roller, izinler ve personel takip sistemi</p>
                                </div>

                                <div class="mt-6">
                                    <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-yellow-500/20 text-yellow-300">
                                        <span class="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                                        Yapım Aşamasında
                                    </span>
                                </div>
                            </div>

                            <!-- Disabled Overlay -->
                            <div class="absolute inset-0 bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl flex items-center justify-center">
                                <div class="text-center">
                                    <svg class="w-16 h-16 text-white mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                    </svg>
                                    <p class="text-white font-medium">Yakında Gelecek</p>
                                </div>
                            </div>
                        </div>

                        <!-- Proje Takip Kartı -->
                        <div class="group relative h-80 bg-white/10 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-green-500/25 transition-all duration-500 cursor-pointer transform hover:-translate-y-2 overflow-hidden">
                            <!-- Background Image on Hover -->
                            <div class="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700">
                                <div class="w-full h-full bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600"></div>
                                <div class="absolute inset-0 bg-pattern-squares"></div>
                            </div>

                            <div class="relative z-20 p-8 h-full flex flex-col">
                                <div class="mb-6">
                                    <div class="w-20 h-20 bg-green-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                        <svg class="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
                                        </svg>
                                    </div>
                                </div>

                                <div class="flex-1">
                                    <h3 class="text-2xl font-bold text-white mb-3">Proje Takip</h3>
                                    <p class="text-gray-300 leading-relaxed">Proje yönetimi, görev dağılımı ve proje ilerlemesi takibi</p>
                                </div>

                                <div class="mt-6">
                                    <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-yellow-500/20 text-yellow-300">
                                        <span class="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                                        Yapım Aşamasında
                                    </span>
                                </div>
                            </div>

                            <!-- Disabled Overlay -->
                            <div class="absolute inset-0 bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl flex items-center justify-center">
                                <div class="text-center">
                                    <svg class="w-16 h-16 text-white mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                    </svg>
                                    <p class="text-white font-medium">Yakında Gelecek</p>
                                </div>
                            </div>
                        </div>

                        <!-- Arıza Yönetimi Kartı -->
                        <div class="group relative h-80 bg-white/10 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-red-500/25 transition-all duration-500 cursor-pointer transform hover:-translate-y-2 overflow-hidden">
                            <!-- Enhanced Background with SVG Pattern -->
                            <div class="absolute inset-0 opacity-0 group-hover:opacity-35 transition-opacity duration-700">
                                <!-- Gradient Layer -->
                                <div class="w-full h-full bg-gradient-to-br from-red-500 via-pink-500 to-rose-600 animate-gradient-shift"></div>
                                <!-- SVG Pattern Layer - Repair/Fault Theme -->
                                <div class="absolute inset-0 bg-pattern-repair animate-pattern-slide"></div>
                                <!-- Warning Effect -->
                                <div class="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-red-500/20 animate-pulse"></div>
                            </div>

                            <div class="relative z-20 p-8 h-full flex flex-col">
                                <div class="mb-6">
                                    <div class="w-20 h-20 bg-red-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                        <svg class="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.232 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                                        </svg>
                                    </div>
                                </div>

                                <div class="flex-1">
                                    <h3 class="text-2xl font-bold text-white mb-3">Arıza Yönetimi</h3>
                                    <p class="text-gray-300 leading-relaxed">Arıza kayıtları, onarım süreçleri ve teknik destek yönetimi</p>
                                </div>

                                <div class="mt-6">
                                    <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-yellow-500/20 text-yellow-300">
                                        <span class="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                                        Yapım Aşamasında
                                    </span>
                                </div>
                            </div>

                            <!-- Disabled Overlay -->
                            <div class="absolute inset-0 bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl flex items-center justify-center">
                                <div class="text-center">
                                    <svg class="w-16 h-16 text-white mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                    </svg>
                                    <p class="text-white font-medium">Yakında Gelecek</p>
                                </div>
                            </div>
                        </div>

                        <!-- Finansal Takip Kartı -->
                        <div class="group relative h-80 bg-white/10 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 cursor-pointer transform hover:-translate-y-2 overflow-hidden">
                            <!-- Background Image on Hover -->
                            <div class="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700">
                                <div class="w-full h-full bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-600"></div>
                                <div class="absolute inset-0 bg-pattern-circles"></div>
                            </div>

                            <div class="relative z-20 p-8 h-full flex flex-col">
                                <div class="mb-6">
                                    <div class="w-20 h-20 bg-purple-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                        <svg class="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                    </div>
                                </div>

                                <div class="flex-1">
                                    <h3 class="text-2xl font-bold text-white mb-3">Finansal Takip</h3>
                                    <p class="text-gray-300 leading-relaxed">Bütçe yönetimi, maliyet analizi ve finansal raporlama</p>
                                </div>

                                <div class="mt-6">
                                    <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-yellow-500/20 text-yellow-300">
                                        <span class="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                                        Yapım Aşamasında
                                    </span>
                                </div>
                            </div>

                            <!-- Disabled Overlay -->
                            <div class="absolute inset-0 bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl flex items-center justify-center">
                                <div class="text-center">
                                    <svg class="w-16 h-16 text-white mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                    </svg>
                                    <p class="text-white font-medium">Yakında Gelecek</p>
                                </div>
                            </div>
                        </div>

                        <!-- Raporlama Kartı -->
                        <div class="group relative h-80 bg-white/10 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-indigo-500/25 transition-all duration-500 cursor-pointer transform hover:-translate-y-2 overflow-hidden">
                            <!-- Background Image on Hover -->
                            <div class="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700">
                                <div class="w-full h-full bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-600"></div>
                                <div class="absolute inset-0 bg-pattern-stripes"></div>
                            </div>

                            <div class="relative z-20 p-8 h-full flex flex-col">
                                <div class="mb-6">
                                    <div class="w-20 h-20 bg-indigo-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                        <svg class="w-10 h-10 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                                        </svg>
                                    </div>
                                </div>

                                <div class="flex-1">
                                    <h3 class="text-2xl font-bold text-white mb-3">Raporlama</h3>
                                    <p class="text-gray-300 leading-relaxed">Sistem raporları, analitik veriler ve performans ölçümleri</p>
                                </div>

                                <div class="mt-6">
                                    <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-yellow-500/20 text-yellow-300">
                                        <span class="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                                        Yapım Aşamasında
                                    </span>
                                </div>
                            </div>

                            <!-- Disabled Overlay -->
                            <div class="absolute inset-0 bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl flex items-center justify-center">
                                <div class="text-center">
                                    <svg class="w-16 h-16 text-white mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                    </svg>
                                    <p class="text-white font-medium">Yakında Gelecek</p>
                                </div>
                            </div>
                        </div>

                        <!-- Kalite Kontrol Kartı -->
                        <div class="group relative h-80 bg-white/10 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-pink-500/25 transition-all duration-500 cursor-pointer transform hover:-translate-y-2 overflow-hidden">
                            <!-- Background Image on Hover -->
                            <div class="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700">
                                <div class="w-full h-full bg-gradient-to-br from-pink-500 via-rose-500 to-red-600"></div>
                                <div class="absolute inset-0 bg-pattern-diamonds"></div>
                            </div>

                            <div class="relative z-20 p-8 h-full flex flex-col">
                                <div class="mb-6">
                                    <div class="w-20 h-20 bg-pink-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                        <svg class="w-10 h-10 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                    </div>
                                </div>

                                <div class="flex-1">
                                    <h3 class="text-2xl font-bold text-white mb-3">Kalite Kontrol</h3>
                                    <p class="text-gray-300 leading-relaxed">Kalite standartları, test süreçleri ve uygunluk kontrolü</p>
                                </div>

                                <div class="mt-6">
                                    <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-yellow-500/20 text-yellow-300">
                                        <span class="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                                        Yapım Aşamasında
                                    </span>
                                </div>
                            </div>

                            <!-- Disabled Overlay -->
                            <div class="absolute inset-0 bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl flex items-center justify-center">
                                <div class="text-center">
                                    <svg class="w-16 h-16 text-white mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                    </svg>
                                    <p class="text-white font-medium">Yakında Gelecek</p>
                                </div>
                            </div>
                        </div>

                        <!-- Güvenlik Kartı -->
                        <div class="group relative h-80 bg-white/10 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-gray-500/25 transition-all duration-500 cursor-pointer transform hover:-translate-y-2 overflow-hidden">
                            <!-- Background Image on Hover -->
                            <div class="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700">
                                <div class="w-full h-full bg-gradient-to-br from-gray-600 via-slate-500 to-zinc-600"></div>
                                <div class="absolute inset-0 bg-pattern-hexagons"></div>
                            </div>

                            <div class="relative z-20 p-8 h-full flex flex-col">
                                <div class="mb-6">
                                    <div class="w-20 h-20 bg-gray-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                        <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                                        </svg>
                                    </div>
                                </div>

                                <div class="flex-1">
                                    <h3 class="text-2xl font-bold text-white mb-3">Güvenlik</h3>
                                    <p class="text-gray-300 leading-relaxed">Sistem güvenliği, yetkilendirme ve güvenlik raporları</p>
                                </div>

                                <div class="mt-6">
                                    <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-yellow-500/20 text-yellow-300">
                                        <span class="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                                        Yapım Aşamasında
                                    </span>
                                </div>
                            </div>

                            <!-- Disabled Overlay -->
                            <div class="absolute inset-0 bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl flex items-center justify-center">
                                <div class="text-center">
                                    <svg class="w-16 h-16 text-white mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                    </svg>
                                    <p class="text-white font-medium">Yakında Gelecek</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="text-center py-8 px-4">
                <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
                    <p class="text-gray-300 text-sm">
                        Şu anda <span class="text-green-400 font-semibold">Proje Yönetimi</span> modülü aktif olarak kullanılabilir. 
                        Diğer modüller geliştirme aşamasında olup yakında kullanıma açılacaktır.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useMeta } from '@/composables/use-meta'

// Meta ayarları
useMeta({ title: 'ABY Yönetim Sistemi - Karşılama' })

const router = useRouter()

// Login sayfasına direkt yönlendirme
const navigateToLogin = () => {
    router.push('/auth/boxed-signin')
}

// Envanter kartına tıklandığında - ana sayfaya yönlendir
const navigateToInventory = () => {
    // Token kontrol et
    const token = localStorage.getItem('token')
    
    if (token) {
        // Token varsa direkt ana sayfaya yönlendir
        router.push('/dashboard')
    } else {
        // Token yoksa login sayfasına yönlendir
        router.push('/auth/boxed-signin')
    }
}
</script>

<style scoped>
/* Custom animations */
@keyframes blob {
    0%, 100% {
        transform: translate(0px, 0px) scale(1);
    }
    33% {
        transform: translate(30px, -50px) scale(1.1);
    }
    66% {
        transform: translate(-20px, 20px) scale(0.9);
    }
}

@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translate3d(0, -100%, 0);
    }
    to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translate3d(0, 100%, 0);
    }
    to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
}

/* Enhanced Animations for SVG Patterns */
@keyframes gradient-shift {
    0%, 100% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
}

@keyframes pattern-slide {
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: 30px 30px;
    }
}

@keyframes sweep {
    0% {
        transform: translateX(-100%);
    }
    50% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(100%);
    }
}

.animate-blob {
    animation: blob 7s infinite;
}

.animation-delay-2000 {
    animation-delay: 2s;
}

.animation-delay-4000 {
    animation-delay: 4s;
}

.animate-fadeInDown {
    animation: fadeInDown 1s ease-out;
}

.animate-fadeInUp {
    animation: fadeInUp 1s ease-out 0.5s both;
}

/* Animation Classes for Enhanced Effects */
.animate-gradient-shift {
    background-size: 200% 200%;
    animation: gradient-shift 3s ease-in-out infinite;
}

.animate-pattern-slide {
    animation: pattern-slide 6s linear infinite;
}

.animate-sweep {
    animation: sweep 2s ease-in-out infinite;
}

/* Glass morphism effect */
.backdrop-blur-sm {
    backdrop-filter: blur(8px);
}

/* Pattern backgrounds */
.bg-pattern-dots {
    background-image: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 20px 20px;
}

/* Warehouse/Inventory SVG Pattern */
.bg-pattern-warehouse {
    background-image: 
        /* Depo rafları - yatay çizgiler */
        linear-gradient(90deg, rgba(255, 255, 255, 0.15) 2px, transparent 2px),
        linear-gradient(0deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
        /* Stok kutuları */
        linear-gradient(90deg, rgba(255, 255, 255, 0.08) 8px, transparent 8px),
        linear-gradient(0deg, rgba(255, 255, 255, 0.08) 8px, transparent 8px),
        /* Palet deseni */
        repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.05) 0px, rgba(255, 255, 255, 0.05) 4px, transparent 4px, transparent 12px);
    background-size: 40px 25px, 40px 25px, 16px 16px, 16px 16px, 32px 32px;
    background-position: 0 0, 0 12px, 0 0, 8px 8px, 0 0;
}

/* Repair/Fault Management SVG Pattern */
.bg-pattern-repair {
    background-image: 
        /* Onarım araçları - çapraz çizgiler */
        repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.12) 0px, rgba(255, 255, 255, 0.12) 2px, transparent 2px, transparent 8px),
        repeating-linear-gradient(-45deg, rgba(255, 255, 255, 0.08) 0px, rgba(255, 255, 255, 0.08) 1px, transparent 1px, transparent 6px),
        /* Uyarı deseni */
        linear-gradient(60deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%),
        linear-gradient(-60deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%),
        /* Arıza nokta pattern'i */
        radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.15) 1px, transparent 1px);
    background-size: 24px 24px, 18px 18px, 16px 16px, 16px 16px, 12px 12px;
    background-position: 0 0, 12px 12px, 0 0, 8px 8px, 6px 6px;
}

.bg-pattern-lines {
    background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%);
    background-size: 30px 30px;
}

.bg-pattern-squares {
    background-image: 
        linear-gradient(90deg, rgba(255, 255, 255, 0.1) 50%, transparent 50%),
        linear-gradient(rgba(255, 255, 255, 0.1) 50%, transparent 50%);
    background-size: 25px 25px;
}

.bg-pattern-triangles {
    background-image: 
        linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%),
        linear-gradient(-45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%);
    background-size: 20px 20px;
}

.bg-pattern-circles {
    background-image: radial-gradient(circle, rgba(255, 255, 255, 0.1) 2px, transparent 2px);
    background-size: 30px 30px;
}

.bg-pattern-stripes {
    background-image: repeating-linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.1),
        rgba(255, 255, 255, 0.1) 10px,
        transparent 10px,
        transparent 20px
    );
}

.bg-pattern-diamonds {
    background-image: 
        linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%),
        linear-gradient(-45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, rgba(255, 255, 255, 0.1) 75%),
        linear-gradient(-45deg, transparent 75%, rgba(255, 255, 255, 0.1) 75%);
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
}

.bg-pattern-hexagons {
    background-image: 
        linear-gradient(30deg, rgba(255, 255, 255, 0.1) 12%, transparent 12.5%, transparent 87%, rgba(255, 255, 255, 0.1) 87.5%, rgba(255, 255, 255, 0.1)),
        linear-gradient(150deg, rgba(255, 255, 255, 0.1) 12%, transparent 12.5%, transparent 87%, rgba(255, 255, 255, 0.1) 87.5%, rgba(255, 255, 255, 0.1)),
        linear-gradient(90deg, rgba(255, 255, 255, 0.1) 25%, transparent 25.5%, transparent 75%, rgba(255, 255, 255, 0.1) 75.5%, rgba(255, 255, 255, 0.1));
    background-size: 20px 35px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .grid {
        grid-template-columns: repeat(1, minmax(0, 1fr));
        gap: 1.5rem;
    }
    
    .h-80 {
        height: 300px;
    }
}

@media (min-width: 768px) and (max-width: 1024px) {
    .grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (min-width: 1024px) and (max-width: 1280px) {
    .grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}
</style>
