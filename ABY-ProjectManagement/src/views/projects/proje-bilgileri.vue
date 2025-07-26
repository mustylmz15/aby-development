<template>
    <div>
        <!-- Header -->
        <div class="panel">
            <div class="mb-5 flex items-center justify-between">
                <h5 class="font-semibold text-xl dark:text-white-light">{{ projectData.projeAdi }}</h5>
                <div class="flex gap-2">
                    <button type="button" @click="goBack" class="btn btn-outline-secondary">
                        <svg class="w-5 h-5 ltr:mr-2 rtl:ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 6L5 12L11 18M5 12H19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Proje Özetine Dön
                    </button>
                </div>
            </div>
        </div>

        <!-- Tabs -->
        <div class="panel mb-5">
            <div class="mb-4">
                <div class="flex gap-2">
                    <button 
                        type="button" 
                        @click="activeTab = 'detay'" 
                        :class="['btn', activeTab === 'detay' ? 'btn-primary' : 'btn-outline-primary']"
                    >
                        Proje Detay
                    </button>
                    <button 
                        type="button" 
                        @click="activeTab = 'bildirim'" 
                        :class="['btn', activeTab === 'bildirim' ? 'btn-primary' : 'btn-outline-primary']"
                    >
                        Ana Bildirim
                    </button>
                </div>
            </div>
        </div>

        <!-- Content based on active tab -->
        <!-- Proje Detay Tab - Görseldeki gibi 3 bloklu düzen -->
        <div v-if="activeTab === 'detay'" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <!-- Sol Blok - Temel Proje Bilgileri ve Yöneticiler -->
            <div class="panel">
                <div class="mb-5">
                    <h6 class="font-semibold text-primary mb-4">Proje Temel Bilgileri</h6>
                </div>
                
                <div class="space-y-4">
                    <!-- Temel bilgiler -->
                    <div class="border-b border-gray-200 dark:border-gray-700 pb-3">
                        <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Proje Kodu</label>
                        <div class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ projectData.projeKodu }}</div>
                    </div>
                    
                    <div class="border-b border-gray-200 dark:border-gray-700 pb-3">
                        <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Proje Başlangıç Tarihi</label>
                        <div class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ projectData.projeBaslangicTarihi }}</div>
                    </div>
                    
                    <div class="border-b border-gray-200 dark:border-gray-700 pb-3">
                        <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Garanti Bitiş Tarihi</label>
                        <div class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ projectData.garantiBitisTarihi }}</div>
                    </div>
                    
                    <div class="border-b border-gray-200 dark:border-gray-700 pb-3">
                        <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Garanti Başlangıç Tarihi</label>
                        <div class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ projectData.garantiBaslangicTarihi }}</div>
                    </div>
                    
                    <div class="border-b border-gray-200 dark:border-gray-700 pb-3">
                        <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Garanti Süresi (Ay)</label>
                        <div class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ projectData.garantiSuresi }}</div>
                    </div>
                    
                    <div class="border-b border-gray-200 dark:border-gray-700 pb-3">
                        <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Garanti Gecikme Durumu</label>
                        <div class="text-sm font-medium">
                            <span :class="getStatusBadge(projectData.garantiGecikme)" class="badge">
                                {{ projectData.garantiGecikme }}
                            </span>
                        </div>
                    </div>
                    
                    <div class="border-b border-gray-200 dark:border-gray-700 pb-3">
                        <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">ELD Müdahalesi</label>
                        <div class="text-sm font-medium">
                            <span :class="getStatusBadge(projectData.eldMudahalesi)" class="badge">
                                {{ projectData.eldMudahalesi }}
                            </span>
                        </div>
                    </div>
                    
                    <div class="border-b border-gray-200 dark:border-gray-700 pb-3">
                        <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Son Güncelleme Tarihi</label>
                        <div class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ projectData.sonGuncellemeTarihi }}</div>
                    </div>
                </div>
                
                <!-- Proje Yöneticileri -->
                <div class="mt-8">
                    <h6 class="font-semibold text-primary mb-4">Proje Yöneticileri</h6>
                    <div class="space-y-3">
                        <div class="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                            <label class="block text-xs font-medium text-blue-600 dark:text-blue-400 mb-1">Proje Yöneticisi</label>
                            <div class="text-sm font-semibold text-blue-800 dark:text-blue-200">{{ projectData.projeYoneticisi }}</div>
                        </div>
                        
                        <div class="bg-green-50 dark:bg-green-900/20 p-3 rounded">
                            <label class="block text-xs font-medium text-green-600 dark:text-green-400 mb-1">Proje Teknik Yöneticisi</label>
                            <div class="text-sm font-semibold text-green-800 dark:text-green-200">{{ projectData.projeTeknikYoneticisi }}</div>
                        </div>
                        
                        <div class="bg-purple-50 dark:bg-purple-900/20 p-3 rounded">
                            <label class="block text-xs font-medium text-purple-600 dark:text-purple-400 mb-1">Proje UDM Yöneticisi</label>
                            <div class="text-sm font-semibold text-purple-800 dark:text-purple-200">{{ projectData.projeUdmYoneticisi }}</div>
                        </div>
                        
                        <div class="bg-orange-50 dark:bg-orange-900/20 p-3 rounded">
                            <label class="block text-xs font-medium text-orange-600 dark:text-orange-400 mb-1">Proje PAM Yöneticisi</label>
                            <div class="text-sm font-semibold text-orange-800 dark:text-orange-200">{{ projectData.projePamYoneticisi }}</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Orta Blok - Proje Durumu ve SLA Bilgileri -->
            <div class="panel">
                <div class="mb-5">
                    <h6 class="font-semibold text-primary mb-4">Proje Durum Bilgileri</h6>
                </div>
                
                <div class="space-y-6">
                    <!-- Proje Genel Durumu -->
                    <div class="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-700">
                        <label class="block text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">Proje Genel Durumu</label>
                        <div class="text-lg font-bold text-yellow-900 dark:text-yellow-100">{{ projectData.projeGenelDurumu }}</div>
                    </div>
                    
                    <!-- Proje Genel Bilgisi -->
                    <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Proje Genel Bilgisi</label>
                        <div class="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">{{ projectData.projeGenelBilgisi }}</div>
                    </div>
                    
                    <!-- SLA Bilgileri -->
                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                            <label class="block text-xs font-medium text-blue-600 dark:text-blue-400 mb-1">SLA Müdahale Süresi</label>
                            <div class="text-2xl font-bold text-blue-800 dark:text-blue-200">{{ projectData.slaMudahaleSuresi }}</div>
                            <div class="text-xs text-blue-600 dark:text-blue-400">saat</div>
                        </div>
                        
                        <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                            <label class="block text-xs font-medium text-green-600 dark:text-green-400 mb-1">SLA Onarım Süresi</label>
                            <div class="text-2xl font-bold text-green-800 dark:text-green-200">{{ projectData.slaOnarimSuresi }}</div>
                            <div class="text-xs text-green-600 dark:text-green-400">saat</div>
                        </div>
                    </div>
                    
                    <!-- Proje Kalite ve Teslimat Yöneticileri -->
                    <div class="space-y-3">
                        <div class="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded">
                            <label class="block text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-1">Proje Kalite Yöneticisi</label>
                            <div class="text-sm font-semibold text-indigo-800 dark:text-indigo-200">{{ projectData.projeKaliteYoneticisi }}</div>
                        </div>
                        
                        <div class="bg-teal-50 dark:bg-teal-900/20 p-3 rounded">
                            <label class="block text-xs font-medium text-teal-600 dark:text-teal-400 mb-1">Proje Teslimat Yöneticisi</label>
                            <div class="text-sm font-semibold text-teal-800 dark:text-teal-200">{{ projectData.projeTeslimatYoneticisi }}</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Sağ Blok - Bütçe ve İşçilik Bilgileri -->
            <div class="panel">
                <div class="mb-5">
                    <h6 class="font-semibold text-primary mb-4">Bütçe ve İşçilik Bilgileri</h6>
                </div>
                
                <div class="space-y-4">
                    <!-- ELDD Bütçe Bilgileri -->
                    <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <h6 class="font-semibold text-green-800 dark:text-green-200 mb-3">ELDD Bütçe</h6>
                        <div class="space-y-2">
                            <div class="flex justify-between">
                                <span class="text-sm text-green-600 dark:text-green-400">Planlanan:</span>
                                <span class="text-sm font-semibold text-green-800 dark:text-green-200">{{ projectData.elddPlanlananButcesi }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-sm text-green-600 dark:text-green-400">Gerçekleşen:</span>
                                <span class="text-sm font-semibold text-green-800 dark:text-green-200">{{ projectData.gerceklesenElddPlanlananButcesi }}</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Teslimat Bütçe Bilgileri -->
                    <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <h6 class="font-semibold text-blue-800 dark:text-blue-200 mb-3">Teslimat Bütçe</h6>
                        <div class="space-y-2">
                            <div class="flex justify-between">
                                <span class="text-sm text-blue-600 dark:text-blue-400">Planlanan:</span>
                                <span class="text-sm font-semibold text-blue-800 dark:text-blue-200">{{ projectData.elddTeslimatButcesi }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-sm text-blue-600 dark:text-blue-400">Gerçekleşen:</span>
                                <span class="text-sm font-semibold text-blue-800 dark:text-blue-200">{{ projectData.gerceklesenElddTeslimatButcesi }}</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- İşçilik Bilgileri -->
                    <div class="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                        <h6 class="font-semibold text-purple-800 dark:text-purple-200 mb-3">İşçilik</h6>
                        <div class="space-y-2">
                            <div class="flex justify-between">
                                <span class="text-sm text-purple-600 dark:text-purple-400">Planlanan:</span>
                                <span class="text-sm font-semibold text-purple-800 dark:text-purple-200">{{ projectData.planlananIscilik }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-sm text-purple-600 dark:text-purple-400">Gerçekleşen:</span>
                                <span class="text-sm font-semibold text-purple-800 dark:text-purple-200">{{ projectData.gerceklesenIscilik }}</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Sat/Sas Bilgileri -->
                    <div class="grid grid-cols-3 gap-2">
                        <div class="bg-gray-50 dark:bg-gray-800 p-3 rounded text-center">
                            <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Sat Sayısı</div>
                            <div class="text-lg font-bold text-gray-800 dark:text-gray-200">{{ projectData.satSayisi }}</div>
                        </div>
                        
                        <div class="bg-gray-50 dark:bg-gray-800 p-3 rounded text-center">
                            <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Sas Sayısı</div>
                            <div class="text-lg font-bold text-gray-800 dark:text-gray-200">{{ projectData.sasSayisi }}</div>
                        </div>
                        
                        <div class="bg-orange-50 dark:bg-orange-900/20 p-3 rounded text-center">
                            <div class="text-xs text-orange-600 dark:text-orange-400 mb-1">Sat/Sas Oranı</div>
                            <div class="text-lg font-bold text-orange-800 dark:text-orange-200">{{ projectData.satSasOrani }}</div>
                        </div>
                    </div>
                    
                    <!-- Çalışan Firmalar -->
                    <div class="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                        <h6 class="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Çalışan Firmalar</h6>
                        <div class="text-xs text-yellow-700 dark:text-yellow-300 leading-relaxed">{{ projectData.calisanFirmalar }}</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Ana Bildirim Tab - Proje Detay Tablosu -->
        <div v-else-if="activeTab === 'bildirim'" class="panel">
            <div class="mb-5 flex items-center justify-between">
                <h6 class="font-semibold text-primary mb-3">Proje Detay Bilgileri</h6>
                <div class="flex items-center gap-4">
                    <div v-if="route.params.id === 'PSE5924'" class="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded-full">
                        Excel A Kolonu: Sadece 9972 Filtresi
                    </div>
                    <div class="text-sm text-gray-500">
                        Toplam Kayıt Sayısı: <span class="font-semibold text-orange-500">{{ projectDetails.length }}</span>
                    </div>
                </div>
            </div>
            
            <!-- Loading State -->
            <div v-if="isLoading" class="text-center py-20">
                <svg class="animate-spin w-12 h-12 mx-auto text-primary mb-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <h3 class="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">Excel Verileri Yükleniyor...</h3>
                <p class="text-gray-500 dark:text-gray-400">Lütfen bekleyin</p>
            </div>
            
            <!-- Content -->
            <div v-else>
                <!-- Filtreler -->
                <div class="mb-6 grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div>
                        <input 
                            v-model="searchTerm" 
                            type="text" 
                            placeholder="Proje tanımında ara..." 
                            class="form-input"
                        />
                    </div>
                    <div>
                        <select v-model="filterProjeNo" class="form-select">
                            <option value="">Tüm Proje Numaraları</option>
                            <option v-for="no in uniqueProjeNos" :key="no" :value="no">{{ no }}</option>
                        </select>
                    </div>
                    <div>
                        <select v-model="filterDurum" class="form-select">
                            <option value="">Tüm Durumlar</option>
                            <option value="Aktif">Aktif</option>
                            <option value="Kapalı">Kapalı</option>
                        </select>
                    </div>
                    <div>
                        <input 
                            v-model="filterStartDate" 
                            type="date" 
                            placeholder="Başlangıç tarihi" 
                            class="form-input"
                        />
                    </div>
                    <div>
                        <input 
                            v-model="filterEndDate" 
                            type="date" 
                            placeholder="Bitiş tarihi" 
                            class="form-input"
                        />
                    </div>
                </div>
                
                <div class="table-responsive">
                    <table class="table-hover project-detail-table">
                        <thead>
                            <tr>
                                <th class="w-16">Proje No</th>
                                <th class="w-48">Proje Tanımı</th>
                                <th class="w-48">Tanım</th>
                                <th class="w-24">Bildirim No</th>
                                <th class="w-32">Bildirim Tarihi</th>
                                <th class="w-32">Arıza Bitiş</th>
                                <th class="w-32">Konum</th>
                                <th class="w-24">Durum</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(detail, index) in paginatedProjectDetails" :key="index" class="text-sm">
                                <td class="text-center font-medium">
                                    <span class="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded text-xs font-semibold">
                                        {{ detail.projeNo }}
                                    </span>
                                </td>
                                <td>
                                    <div class="max-w-xs">
                                        <div class="font-medium text-gray-900 dark:text-gray-100 text-xs leading-relaxed">{{ detail.projeTanimi }}</div>
                                        <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            <span v-if="detail.bildiren">Bildiren: {{ detail.bildiren }}</span>
                                            <span v-if="detail.bildirimTuru" class="ml-2">Tür: {{ detail.bildirimTuru }}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div class="max-w-xs">
                                        <div class="text-xs text-gray-800 dark:text-gray-200 leading-relaxed">
                                            {{ detail.tanim || '-' }}
                                        </div>
                                    </div>
                                </td>
                                <td class="text-center">
                                    <span class="text-xs bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 px-2 py-1 rounded">
                                        {{ detail.bildirimNo }}
                                    </span>
                                </td>
                                <td class="text-center">
                                    <span class="text-sm">{{ formatDate(detail.bitirmeTarihi) }}</span>
                                </td>
                                <td class="text-center">
                                    <span class="text-sm">{{ formatDate(detail.arizaBitisTarihi) }}</span>
                                </td>
                                <td class="text-center">
                                    <span class="text-xs">{{ detail.konum || '-' }}</span>
                                </td>
                                <td class="text-center">
                                    <span :class="getDurumBadgeClass(detail.durum || 'Aktif')" class="px-2 py-1 rounded-full text-xs font-medium">
                                        {{ detail.durum || 'Aktif' }}
                                    </span>
                                </td>
                            </tr>
                            <tr v-if="paginatedProjectDetails.length === 0">
                                <td colspan="8" class="text-center py-8 text-gray-500 dark:text-gray-400">
                                    <div class="flex flex-col items-center">
                                        <svg class="w-12 h-12 mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                        </svg>
                                        <p class="font-medium">Filtrelere uygun kayıt bulunamadı</p>
                                        <p class="text-sm">Lütfen filtre kriterlerinizi kontrol edin</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <!-- Gelişmiş Sayfalama -->
                <div class="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <!-- Sol taraf - Sayfa boyutu seçici ve toplam kayıt -->
                    <div class="flex items-center gap-4">
                        <div class="flex items-center gap-2">
                            <label class="text-sm text-gray-600 dark:text-gray-400">Sayfa başına:</label>
                            <select v-model="itemsPerPage" @change="changeItemsPerPage(itemsPerPage)" class="form-select w-20 h-8 text-sm">
                                <option v-for="option in itemsPerPageOptions" :key="option" :value="option">
                                    {{ option }}
                                </option>
                            </select>
                        </div>
                        <div class="text-sm text-gray-600 dark:text-gray-400">
                            <span class="font-medium">{{ startIndex + 1 }}-{{ endIndex }}</span> 
                            / 
                            <span class="font-medium text-primary">{{ totalItems }}</span> kayıt
                        </div>
                    </div>
                    
                    <!-- Sağ taraf - Sayfa navigasyonu -->
                    <div class="flex items-center gap-2">
                        <!-- İlk sayfa -->
                        <button 
                            @click="goToFirstPage" 
                            :disabled="currentPage === 1"
                            class="btn btn-outline-primary btn-sm px-2"
                            :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
                        >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"/>
                            </svg>
                        </button>
                        
                        <!-- Önceki sayfa -->
                        <button 
                            @click="goToPreviousPage" 
                            :disabled="currentPage === 1"
                            class="btn btn-outline-primary btn-sm"
                            :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
                        >
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                            </svg>
                            Önceki
                        </button>
                        
                        <!-- Sayfa numaraları -->
                        <div class="flex gap-1">
                            <button 
                                v-for="page in pageNumbers" 
                                :key="page"
                                @click="goToPage(page)"
                                class="btn btn-sm w-8 h-8 text-sm"
                                :class="page === currentPage ? 'btn-primary' : 'btn-outline-primary'"
                            >
                                {{ page }}
                            </button>
                        </div>
                        
                        <!-- Sonraki sayfa -->
                        <button 
                            @click="goToNextPage" 
                            :disabled="currentPage === totalPages"
                            class="btn btn-outline-primary btn-sm"
                            :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
                        >
                            Sonraki
                            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                            </svg>
                        </button>
                        
                        <!-- Son sayfa -->
                        <button 
                            @click="goToLastPage" 
                            :disabled="currentPage === totalPages"
                            class="btn btn-outline-primary btn-sm px-2"
                            :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
                        >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"/>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <!-- Sayfa bilgisi (mobil için) -->
                <div class="mt-4 md:hidden text-center text-sm text-gray-600 dark:text-gray-400">
                    Sayfa {{ currentPage }} / {{ totalPages }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useMeta } from '@/composables/use-meta';
import { useExcel } from '@/composables/use-excel';

// Interface for project detail
interface ProjectDetail {
    projeNo: string;
    projeTanimi: string;
    tanim?: string; // Opsiyonel Tanım kolonu
    durum?: string; // R kolonu kontrolüne göre belirlenen durum (Aktif/Kapalı)
    bitirmeTarihi: string;
    arizaBitisTarihi: string;
    bildirimNo?: string;
    servisSiparisNo?: string;
    konum?: string;
    bildiren?: string;
    bildirimTuru?: string;
    excelRowIndex?: number;
    rawData?: any;
}

useMeta({ title: 'Proje Bilgileri' });

const router = useRouter();
const route = useRoute();
const { getTableData } = useExcel();

// Active tab
const activeTab = ref('detay');

// Filter states for Ana Bildirim tab
const searchTerm = ref('');
const filterProjeNo = ref('');
const filterDurum = ref('');
const filterStartDate = ref('');
const filterEndDate = ref('');

// Pagination states
const currentPage = ref(1);
const itemsPerPage = ref(10);
const itemsPerPageOptions = [10, 50, 100, 500];

// Loading state
const isLoading = ref(false);
const excelData = ref<any[]>([]);
const excelHeaders = ref<string[]>([]);

// Project data
const projectData = ref({
    projeAdi: 'Kent Güvenlik Yönetim Sistemi Projesi - Ek Talep-2',
    sonGuncellemeTarihi: '5.kır 2.07.2025 13:59:34',
    projeKodu: 'PSE5924',
    projeBaslangicTarihi: '17.12.2018',
    garantiBitisTarihi: '01.12.2025',
    garantiBaslangicTarihi: '01.12.2024',
    garantiSuresi: '12',
    garantiGecikme: 'Garanti Gecikmeesi Yok',
    eldMudahalesi: 'ELD Müdahalesi Var',
    projeYoneticisi: 'ÖNDER TAŞKIN',
    projeTeknikYoneticisi: 'SERHAT OYAN',
    projeUdmYoneticisi: 'MUSTAFA ÇAKIR',
    projePamYoneticisi: 'GÜLŞAH KARAKOYSE',
    
    // Orta blok
    projeGenelDurumu: 'Proje Gecikmede',
    projeGenelBilgisi: 'Kent Güvenlik Yönetim Sistemi Projesi - Ek Talep-2',
    slaMudahaleSuresi: '7',
    slaOnarimSuresi: '30',
    
    // Sağ blok - Bütçe bilgileri
    elddPlanlananButcesi: '₺150.000.000',
    gerceklesenElddPlanlananButcesi: '₺120.000.000',
    elddTeslimatButcesi: '₺150.000.000',
    gerceklesenElddTeslimatButcesi: '₺110.000.000',
    planlananIscilik: '365',
    gerceklesenIscilik: '128',
    satSayisi: '8',
    sasSayisi: '8',
    satSasOrani: '%80',
    
    // Çalışan firmalar
    calisanFirmalar: 'ALZ MÜHENDİSLİK; ANTE; ASELSAN NET; ASIGM; AST SAVUNMA; BAŞARAN TEKNOLOJİ',
    
    // Proje sorumlulari
    projeKaliteYoneticisi: 'MUSTAFA SAİT YILDIZ',
    projeTeslimatYoneticisi: 'CİHAN ÖNAL'
});

// Project details table data - Conditional loading
const projectDetails = ref<ProjectDetail[]>([
    {
        projeNo: '9972',
        projeTanimi: 'KGYS KENT GÜVENLİK YÖNETİM SİSTEMİ',
        tanim: 'Sistem güvenlik tanımı',
        bitirmeTarihi: '2025-12-01',
        arizaBitisTarihi: '2024-12-23'
    }
]);

// Load Excel data for project PSE5924
const loadExcelDataForProject = async () => {
    const projectId = route.params.id as string;
    
    // Sadece PSE5924 projesi (Kent Güvenlik Yönetim Sistemi) için Excel verilerini yükle
    if (projectId === 'PSE5924') {
        try {
            isLoading.value = true;
            console.log('🔄 Excel verilerini yükleniyor - Proje PSE5924 (Kent Güvenlik Yönetim Sistemi)...');
            
            const { headers, data, nonEmptyColumnIndexes } = await getTableData();
            console.log('📊 Excel dosyası yüklendi. Headers:', headers.slice(0, 10));
            console.log('📊 A kolonu header:', headers[0]);
            console.log('Excel verisi yükleniyor...');
            
            // Excel verilerini SADECE 9972 projesi için filtrele (A kolonunda)
            const project9972Data = data.filter((row: any) => {
                if (!row || typeof row !== 'object') {
                    return false;
                }
                
                // A kolonu kontrolü - Excel'in A kolonunda "Proje no" var
                const projeNo = row[0] || // A kolonu (index 0)
                              row['A'] || // A kolonu string olarak
                              row['Proje No'] || // Header name olarak
                              row['Proje no'] || // Alternatif
                              '';
                
                // SADECE 9972 değerini kontrol et
                const projeNoStr = String(projeNo).trim();
                const is9972 = projeNoStr === '9972';
                
                if (is9972) {
                    // 9972 kaydı bulundu
                }
                
                return is9972;
            });
            
            console.log(`📊 Excel'den toplam ${data.length} kayıt yüklendi`);
            
            // İlk satırdaki kolon başlıklarını kontrol edelim (sadece ilk kez)
            if (project9972Data.length > 0) {
                console.log(`📋 ${project9972Data.length} adet 9972 kaydı bulundu`);
            }
            
            // Tüm farklı A kolonu değerlerini göster
            const uniqueProjeNos = [...new Set(data.map((row: any) => String(row[0] || '').trim()))];
            console.log('📋 Excel\'deki tüm farklı Proje No değerleri:', uniqueProjeNos.slice(0, 20));
            
            // İlk 10 satırın A kolonu değerlerini debug için göster
            if (data.length > 0) {
                console.log('🔍 İlk 10 satırın A kolonu değerleri:');
                data.slice(0, 10).forEach((row: any, index: number) => {
                    const projeNo = row[0] || row['Proje No'] || row['A'] || '';
                    console.log(`Satır ${index + 1}: A kolonu = "${projeNo}" (Tip: ${typeof projeNo})`);
                });
            }
            
            // Excel verilerini proje detayı formatına çevir
            const excelProjectDetails: ProjectDetail[] = project9972Data.map((row: any, index: number) => {
                // Console'dan gelen header'lara göre doğru field mapping
                console.log(`📋 Satır ${index + 1} raw data:`, row);
                
                const projeTanimi = row['Proje Tanımı'] || 
                                  row['Bildirim Başlığı uzun metin 1'] ||
                                  row['Metin'] ||
                                  row['UzunMetinSatırı1'] ||
                                  `KGYS Bildirim ${index + 1}`;
                
                // Ayrı bir Tanım kolonu - Excel'deki "Tanım" alanından
                const tanim = row['Tanım'] || 
                             row['Açıklama'] ||
                             row['Detay'] ||
                             row['Description'] ||
                             '';
                
                // Tarih alanları - Excel'deki gerçek header'lara göre
                const bildirimTarihiRaw = row['Bildirim Yaratma Tarihi'] || 
                                         row['Bildirim Tamamlanma Tarihi'] ||
                                         new Date().toISOString().split('T')[0];
                
                const arizaBaslangicRaw = row['Arıza Başlangıcı'] || 
                                         row['İstenen Başlangıç'] ||
                                         row['Planlanan Başlangıç Tarihi'] ||
                                         bildirimTarihiRaw;
                
                const arizaBitisRaw = row['Arıza Bitiş'] || 
                                     row['İstenen Bitiş'] ||
                                     row['Planlanan Bitiş Tarihi'] ||
                                     bildirimTarihiRaw;
                
                // Excel serial number'larını tarihe çevir
                const bildirimTarihi = convertExcelDate(bildirimTarihiRaw);
                const arizaBaslangic = convertExcelDate(arizaBaslangicRaw);
                const arizaBitis = convertExcelDate(arizaBitisRaw);
                
                // R kolonu kontrolü - Excel'de R kolonu 18. kolon (index 17)
                // Önce gerçek R kolonu ismini bulalım
                const allKeys = Object.keys(row);
                
                // İlk 5 satır için R kolonu debug
                if (index < 5) {
                    console.log(`🔍 Satır ${index + 1} - R kolonu araştırması:`, {
                        kolon16: row[Object.keys(row)[16]], // 17. kolon
                        kolon17: row[Object.keys(row)[17]], // 18. kolon  
                        kolon18: row[Object.keys(row)[18]], // 19. kolon
                        kolonIsimleri: Object.keys(row).slice(15, 20),
                        rKolon: row['R'],
                        empty16: row['__EMPTY_16'],
                        empty17: row['__EMPTY_17']
                    });
                }
                
                // Muhtemel R kolonu isimleri - gerçek Excel kolonuna göre
                let rKolonuDegeri = '';
                let bulunanKolon = '';
                
                // R kolonu (18. harf) farklı şekillerde isimlendirilmiş olabilir
                const rKolonAdlari = [
                    'R', 
                    '__EMPTY_17',  // Excel boş kolonlar için kullanılan format
                    '__EMPTY_16',
                    Object.keys(row)[17], // 18. kolon direkt index
                    Object.keys(row)[16]  // 17. kolon direkt index
                ];
                
                for (const key of rKolonAdlari) {
                    if (key && row[key] !== undefined && row[key] !== null && String(row[key]).trim() !== '') {
                        rKolonuDegeri = String(row[key]);
                        bulunanKolon = key;
                        break;
                    }
                }
                
                // İlk 5 satır için sonucu göster
                if (index < 5) {
                    console.log(`✅ Satır ${index + 1} R kolonu sonucu:`, {
                        bulunanKolon: bulunanKolon,
                        rKolonuDegeri: rKolonuDegeri,
                        bosMu: !rKolonuDegeri || String(rKolonuDegeri).trim() === ''
                    });
                }
                
                // Durum belirleme: R kolonu dolu ise "Kapalı", boş ise "Aktif"
                const rBosMu = !rKolonuDegeri || String(rKolonuDegeri).trim() === '';
                const durum = rBosMu ? 'Aktif' : 'Kapalı';
                
                const result: ProjectDetail = {
                    projeNo: '9972',
                    projeTanimi: String(projeTanimi || `9972 Arıza Kaydı ${index + 1}`),
                    tanim: String(tanim || ''), // Yeni eklenen Tanım alanı
                    durum: String(durum), // R kolonu kontrolüne göre belirlenen durum
                    bitirmeTarihi: String(bildirimTarihi || '2025-12-01'),
                    arizaBitisTarihi: String(arizaBitis || '2024-12-23'),
                    bildirimNo: row['Bildirim No'] || `BLD-${index + 1}`,
                    servisSiparisNo: row['Servis Sipariş No'] || '',
                    konum: row['Konum'] || '',
                    bildiren: row['Bildiren'] || '',
                    bildirimTuru: row['Bildirim Türü'] || '',
                    excelRowIndex: index,
                    rawData: row // Ham Excel verisini de saklayalım debug için
                };
                
                return result;
            }).filter((item: ProjectDetail) => {
                // Sadece geçerli veriler
                return item.projeTanimi && 
                       item.projeTanimi.trim() !== '' && 
                       !item.projeTanimi.includes('undefined') &&
                       item.projeTanimi !== 'undefined';
            });

            // Excel verilerini project details'e ata
            if (project9972Data.length > 0) {
                projectDetails.value = excelProjectDetails;
                console.log(`✅ PSE5924 projesi için Excel'den ${excelProjectDetails.length} kayıt yüklendi`);
                console.log('Örnek kayıt:', excelProjectDetails[0]);
                console.log('Excel headers:', headers.slice(0, 10)); // İlk 10 header'ı göster
            } else {
                console.warn('❌ Excel\'de A kolonunda 9972 değeri bulunamadı');
                console.log('Mevcut Excel header\'ları:', headers.slice(0, 10));
                console.log('İlk satır örnek verisi:', data[0]);
                
                // Veri bulunamadığında default veri
                projectDetails.value = [
                    {
                        projeNo: '9972',
                        projeTanimi: 'KGYS KENT GÜVENLİK YÖNETİM SİSTEMİ - Excel A Kolonunda 9972 Eşleşmesi Bulunamadı',
                        bitirmeTarihi: '2025-12-01',
                        arizaBitisTarihi: '2024-12-23',
                        bildirimNo: 'N/A'
                    }
                ];
            }
            
            // Excel raw data'yı da sakla
            excelData.value = data;
            excelHeaders.value = headers;
            
        } catch (error) {
            console.error('Excel data loading failed:', error);
            // Hata durumunda mock data kullan
            projectDetails.value = [
                {
                    projeNo: '9972',
                    projeTanimi: 'KGYS KENT GÜVENLİK YÖNETİM SİSTEMİ - Excel Yüklenemedi',
                    bitirmeTarihi: '2025-12-01',
                    arizaBitisTarihi: '2024-12-23',
                    bildirimNo: 'ERROR'
                }
            ];
        } finally {
            isLoading.value = false;
        }
    } else {
        // Diğer projeler için mock data kullan
        console.log('❌ Project ID PSE5924 eşleşmedi, mock data kullanılıyor. Gelen ID:', projectId);
        const mockDataSets = [
            {
                projeNo: '9973',
                projeTanimi: 'Akıllı Şehir Altyapı Projesi',
                bitirmeTarihi: '2025-08-15',
                arizaBitisTarihi: '2024-11-20'
            },
            {
                projeNo: '9974',
                projeTanimi: 'Dijital Dönüşüm Platformu',
                bitirmeTarihi: '2025-10-30',
                arizaBitisTarihi: '2024-12-05'
            }
        ];
        
        // Proje ID'ye göre mock data seç
        const mockData = mockDataSets.find(data => data.projeNo === projectId) || {
            projeNo: projectId,
            projeTanimi: `${projectId} - Diğer Proje`,
            bitirmeTarihi: '2025-12-01',
            arizaBitisTarihi: '2024-12-23'
        };
        
        projectDetails.value = Array(8).fill(null).map((_, index) => ({
            ...mockData,
            projeTanimi: `${mockData.projeTanimi} - Kayıt ${index + 1}`
        }));
    }
};

// Computed properties for filtering
const uniqueProjeNos = computed(() => {
    const nos = projectDetails.value.map(detail => detail.projeNo);
    return [...new Set(nos)];
});

const filteredProjectDetails = computed(() => {
    return projectDetails.value.filter(detail => {
        const matchesSearch = !searchTerm.value || 
            detail.projeTanimi.toLowerCase().includes(searchTerm.value.toLowerCase());
        
        const matchesProjeNo = !filterProjeNo.value || 
            detail.projeNo === filterProjeNo.value;
        
        const matchesDurum = !filterDurum.value || 
            (detail.durum || 'Aktif') === filterDurum.value;
        
        const matchesStartDate = !filterStartDate.value || 
            new Date(detail.bitirmeTarihi) >= new Date(filterStartDate.value);
        
        const matchesEndDate = !filterEndDate.value || 
            new Date(detail.arizaBitisTarihi) <= new Date(filterEndDate.value);
        
        return matchesSearch && matchesProjeNo && matchesDurum && matchesStartDate && matchesEndDate;
    });
});

// Pagination computed properties
const totalItems = computed(() => filteredProjectDetails.value.length);
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value));
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value);
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage.value, totalItems.value));

const paginatedProjectDetails = computed(() => {
    return filteredProjectDetails.value.slice(startIndex.value, startIndex.value + itemsPerPage.value);
});

const pageNumbers = computed(() => {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    let start = Math.max(1, currentPage.value - Math.floor(maxVisiblePages / 2));
    let end = Math.min(totalPages.value, start + maxVisiblePages - 1);
    
    // Adjust start if we're near the end
    if (end - start + 1 < maxVisiblePages) {
        start = Math.max(1, end - maxVisiblePages + 1);
    }
    
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }
    return pages;
});

// Methods
const goBack = () => {
    router.push('/proje-ozeti');
};

// Excel tarih serial number'ını normal tarihe çevir
const convertExcelDate = (excelDate: any): string => {
    if (!excelDate) return '-';
    
    // Eğer zaten string tarih formatındaysa (YYYY-MM-DD gibi)
    if (typeof excelDate === 'string' && excelDate.includes('-')) {
        return excelDate;
    }
    
    // Excel serial number formatı (45846 gibi)
    if (typeof excelDate === 'number' || !isNaN(Number(excelDate))) {
        const serialNumber = Number(excelDate);
        
        // Excel'in epoch'u 1900-01-01 (ancak 1900'ü leap year olarak kabul eder, bu yüzden 2 gün çıkarıyoruz)
        const excelEpoch = new Date(1900, 0, 1); // 1900-01-01
        const date = new Date(excelEpoch.getTime() + (serialNumber - 2) * 24 * 60 * 60 * 1000);
        
        // Geçerli tarih kontrolü
        if (date instanceof Date && !isNaN(date.getTime())) {
            return date.toISOString().split('T')[0]; // YYYY-MM-DD formatı
        }
    }
    
    // Fallback - eğer dönüştürülemezse string olarak döndür
    return String(excelDate);
};

const formatDate = (dateString: string) => {
    if (!dateString || dateString === '-') return '-';
    
    // Önce Excel serial number'ı kontrol et
    if (!isNaN(Number(dateString))) {
        dateString = convertExcelDate(dateString);
    }
    
    const date = new Date(dateString);
    if (date instanceof Date && !isNaN(date.getTime())) {
        return date.toLocaleDateString('tr-TR');
    }
    return dateString;
};

const getStatusBadge = (status: string) => {
    if (!status) return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300 px-2 py-1 rounded-full text-xs';
    
    const lowerStatus = status.toLowerCase();
    
    if (lowerStatus.includes('var') || lowerStatus.includes('evet') || lowerStatus.includes('aktif')) {
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 px-2 py-1 rounded-full text-xs';
    }
    
    if (lowerStatus.includes('yok') || lowerStatus.includes('hayır') || lowerStatus.includes('pasif')) {
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 px-2 py-1 rounded-full text-xs';
    }
    
    if (lowerStatus.includes('kısmen') || lowerStatus.includes('beklemede')) {
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300 px-2 py-1 rounded-full text-xs';
    }
    
    return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300 px-2 py-1 rounded-full text-xs';
};

const getDurumBadgeClass = (durum: string) => {
    if (!durum) return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    
    if (durum.toLowerCase() === 'aktif') {
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
    }
    
    if (durum.toLowerCase() === 'kapalı') {
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
    }
    
    return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
};

// Pagination methods
const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
};

const goToFirstPage = () => {
    currentPage.value = 1;
};

const goToLastPage = () => {
    currentPage.value = totalPages.value;
};

const goToPreviousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

const goToNextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};

const changeItemsPerPage = (newSize: number) => {
    itemsPerPage.value = newSize;
    currentPage.value = 1; // Reset to first page when changing page size
};

// Load project data based on route parameter
onMounted(async () => {
    const projectId = route.params.id as string;
    console.log('🚀 Loading project data for ID:', projectId);
    // Excel verilerini yükle
    await loadExcelDataForProject();
});

// Watch for filter changes to reset pagination
watch([searchTerm, filterProjeNo, filterStartDate, filterEndDate], () => {
    currentPage.value = 1;
});
</script>

<style scoped>
/* Project detail table styles */
.project-detail-table {
    table-layout: fixed;
    width: 100%;
    min-width: 800px;
}

.project-detail-table th,
.project-detail-table td {
    vertical-align: middle;
    padding: 8px 12px;
    border-bottom: 1px solid #e5e7eb;
    font-size: 13px;
}

.project-detail-table th {
    background-color: #f8fafc;
    font-weight: 600;
    position: sticky;
    top: 0;
    z-index: 10;
}

.dark .project-detail-table th {
    background-color: #1f2937;
    border-color: #374151;
}

.dark .project-detail-table th,
.dark .project-detail-table td {
    border-color: #374151;
}

/* Row hover effect */
.project-detail-table tbody tr:hover {
    background-color: #f9fafb;
}

.dark .project-detail-table tbody tr:hover {
    background-color: #374151;
}

/* Badge styles */
.badge {
    display: inline-block;
    padding: 4px 8px;
    font-size: 11px;
    font-weight: 500;
    border-radius: 4px;
    text-align: center;
    min-width: 80px;
}

.badge-outline-success {
    color: #059669;
    background-color: #ecfdf5;
    border: 1px solid #059669;
}

.badge-outline-warning {
    color: #d97706;
    background-color: #fffbeb;
    border: 1px solid #d97706;
}

.badge-outline-secondary {
    color: #6b7280;
    background-color: #f9fafb;
    border: 1px solid #6b7280;
}

.dark .badge-outline-success {
    color: #10b981;
    background-color: rgba(16, 185, 129, 0.1);
    border-color: #10b981;
}

.dark .badge-outline-warning {
    color: #f59e0b;
    background-color: rgba(245, 158, 11, 0.1);
    border-color: #f59e0b;
}

.dark .badge-outline-secondary {
    color: #9ca3af;
    background-color: rgba(156, 163, 175, 0.1);
    border-color: #9ca3af;
}

/* Table responsive wrapper */
.table-responsive {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    max-height: 500px;
    overflow-y: auto;
}

.dark .table-responsive {
    border-color: #374151;
}

/* Column widths */
.w-16 { width: 4rem; }
.w-32 { width: 8rem; }
.w-64 { width: 16rem; }

/* Custom spacing for info sections */
.space-y-4 > * + * {
    margin-top: 1rem;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
    .grid.grid-cols-1.lg\\:grid-cols-3 {
        grid-template-columns: 1fr;
    }
    
    .lg\\:col-span-1,
    .lg\\:col-span-2 {
        grid-column: span 1;
    }
}
</style>
