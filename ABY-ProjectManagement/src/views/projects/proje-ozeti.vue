<template>
    <div>
        <!-- Toast Notification -->
        <div v-if="showToast" class="fixed top-4 right-4 z-50 animate-fade-in-down">
            <div :class="getToastClass()" class="flex items-center p-4 mb-4 text-sm rounded-lg shadow-lg min-w-[300px] max-w-md">
                <svg :class="getToastIconClass()" class="flex-shrink-0 w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path v-if="toastType === 'success'" d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                    <path v-else-if="toastType === 'warning'" d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
                    <path v-else-if="toastType === 'error'" d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
                    <path v-else d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <div class="flex-1">{{ toastMessage }}</div>
                <button @click="closeToast" class="ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:hover:bg-gray-700">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        </div>

        <!-- Header -->
        <div class="panel">
            <div class="mb-5 flex items-center justify-between">
                <h5 class="font-semibold text-xl dark:text-white-light">UGES ELDD Proje Takip Sistemi</h5>
                <div class="flex gap-2">
                    <button type="button" @click="goBack" class="btn btn-outline-secondary">
                        <svg class="w-5 h-5 ltr:mr-2 rtl:ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 6L5 12L11 18M5 12H19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Geri Dön
                    </button>
                    <button type="button" @click="loadProjectsFromExcel" :disabled="isLoadingExcel" class="btn btn-primary">
                        <svg v-if="!isLoadingExcel" class="w-5 h-5 ltr:mr-2 rtl:ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <svg v-else class="w-5 h-5 ltr:mr-2 rtl:ml-2 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"/>
                        </svg>
                        {{ isLoadingExcel ? 'Yükleniyor...' : 'Excel Verilerini Yenile' }}
                    </button>
                    <button type="button" @click="exportToExcel" class="btn btn-success">
                        <svg class="w-5 h-5 ltr:mr-2 rtl:ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Excel İndir
                    </button>
                </div>
            </div>
        </div>

        <!-- Filters -->
        <div class="panel mb-5">
            <div class="mb-4">
                <h6 class="font-semibold text-primary mb-3">Filtreler</h6>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <label class="block text-sm font-medium mb-1">Direktörlük</label>
                        <select v-model="filters.direktorluk" class="form-select">
                            <option value="">Tümü</option>
                            <option v-for="directorlik in availableDirectorships" :key="directorlik" :value="directorlik">
                                {{ directorlik }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Proje Kodu</label>
                        <input type="text" v-model="filters.projeKodu" class="form-input" placeholder="Proje kodu ara..." />
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Proje Durumu</label>
                        <select v-model="filters.projeDurumu" class="form-select">
                            <option value="">Tümü</option>
                            <option value="Proje Gecikmede">Proje Gecikmede</option>
                            <option value="Proje Takvimine Uygun İlerliyor">Proje Takvimine Uygun İlerliyor</option>
                            <option value="Proje Tamamlandı">Proje Tamamlandı</option>
                            <option value="Belirtilmemiş">Belirtilmemiş</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Garanti Durumu</label>
                        <select v-model="filters.garantiDurumu" class="form-select">
                            <option value="">Tümü</option>
                            <option value="normal">Normal</option>
                            <option value="gecikme">Gecikme Var</option>
                            <option value="belirtilmemis">Belirtilmemiş</option>
                        </select>
                    </div>
                </div>
                <div class="mt-4">
                    <button type="button" @click="resetFilters" class="btn btn-outline-secondary">
                        Filtreleri Temizle
                    </button>
                </div>
            </div>
        </div>        <!-- Projects Summary Table -->
        <div class="panel">
            <div class="mb-5">
                <h6 class="font-semibold text-primary mb-3">UGES ELDD Proje Takip Sistemi ({{ filteredProjects.length }} adet)</h6>
            </div>
            
            <div class="table-responsive">
                <table class="table-hover custom-summary-table">
                    <thead>
                        <tr>
                            <!-- Temel Proje Bilgileri -->
                            <th class="w-24 sortable" @click="sortBy('projeKodu')">
                                Proje Kodu
                                <i :class="getSortIcon('projeKodu')" class="ml-1"></i>
                            </th>
                            <th class="w-20 sortable" @click="sortBy('haneliKod')">
                                4 Haneli Kod
                                <i :class="getSortIcon('haneliKod')" class="ml-1"></i>
                            </th>
                            <th class="w-64 sortable" @click="sortBy('projeAdi')">
                                Proje Adı
                                <i :class="getSortIcon('projeAdi')" class="ml-1"></i>
                            </th>
                            <th class="w-32 sortable" @click="sortBy('projeBaslangicTarihi')">
                                Başlangıç Tarihi
                                <i :class="getSortIcon('projeBaslangicTarihi')" class="ml-1"></i>
                            </th>
                            <th class="w-24 sortable" @click="sortBy('projeSuresi')">
                                Proje Süresi (Ay)
                                <i :class="getSortIcon('projeSuresi')" class="ml-1"></i>
                            </th>
                            <th class="w-32 sortable" @click="sortBy('projeGecikmeDurumu')">
                                Proje Gecikme Durumu
                                <i :class="getSortIcon('projeGecikmeDurumu')" class="ml-1"></i>
                            </th>
                            <th class="w-24 sortable" @click="sortBy('projeGecikmeSuresi')">
                                Proje Gecikme Süresi (Ay)
                                <i :class="getSortIcon('projeGecikmeSuresi')" class="ml-1"></i>
                            </th>
                            <th class="w-32 sortable" @click="sortBy('garantiBaslangicTarihi')">
                                Garanti Başlangıç Tarihi
                                <i :class="getSortIcon('garantiBaslangicTarihi')" class="ml-1"></i>
                            </th>
                            <th class="w-32 sortable" @click="sortBy('garantiSuresi')">
                                Garanti Süresi (Ay)
                                <i :class="getSortIcon('garantiSuresi')" class="ml-1"></i>
                            </th>
                            <th class="w-24 sortable" @click="sortBy('garantiBitisTarihi')">
                                Garanti Bitiş Tarihi
                                <i :class="getSortIcon('garantiBitisTarihi')" class="ml-1"></i>
                            </th>
                            <th class="w-32 sortable" @click="sortBy('garantiDurumu')">
                                Garanti Durumu %
                                <i :class="getSortIcon('garantiDurumu')" class="ml-1"></i>
                            </th>
                            <th class="w-32 sortable" @click="sortBy('garantiGecikmeDurumu')">
                                Garanti Gecikme Durumu
                                <i :class="getSortIcon('garantiGecikmeDurumu')" class="ml-1"></i>
                            </th>
                            <!-- Kurulum ve Malzeme -->
                            <th class="w-32 sortable" @click="sortBy('kurulumSorumluBirimi')">
                                Kurulum Sorumlu Birimi
                                <i :class="getSortIcon('kurulumSorumluBirimi')" class="ml-1"></i>
                            </th>
                            <th class="w-32 sortable" @click="sortBy('kurulumTarihi')">
                                Kurulum Tarihi
                                <i :class="getSortIcon('kurulumTarihi')" class="ml-1"></i>
                            </th>
                            <th class="w-32 sortable" @click="sortBy('yedekParcaDurumu')">
                                Yedek Parça Durumu
                                <i :class="getSortIcon('yedekParcaDurumu')" class="ml-1"></i>
                            </th>
                            <th class="w-32 sortable" @click="sortBy('sarfMalzemeDurumu')">
                                Sarf Malzeme Durumu
                                <i :class="getSortIcon('sarfMalzemeDurumu')" class="ml-1"></i>
                            </th>
                            <!-- DKÖT OLMAYACAK                             
                            <th class="w-32 sortable" @click="sortBy('dkotMalzemeDurumu')">
                                DKÖT Malzeme Durumu
                                <i :class="getSortIcon('dkotMalzemeDurumu')" class="ml-1"></i>
                            </th>
                            -->

                            <!-- Bütçe ve Teslimat 
                            <th class="w-40 sortable" @click="sortBy('toplamEldButcesi')">
                                Toplam ELD Bütçesi
                                <i :class="getSortIcon('toplamEldButcesi')" class="ml-1"></i>
                            </th>
                            <th class="w-40 sortable" @click="sortBy('gerceklesenEldButcesi')">
                                Gerçekleşen ELD Bütçesi
                                <i :class="getSortIcon('gerceklesenEldButcesi')" class="ml-1"></i>
                            </th>
                            <th class="w-32 sortable" @click="sortBy('eldButcesiYuzde')">
                                ELD Bütçesi (%)
                                <i :class="getSortIcon('eldButcesiYuzde')" class="ml-1"></i>
                            </th>
                            <th class="w-40 sortable" @click="sortBy('teslimatHedefTutari')">
                                Teslimat Hedef Tutarı
                                <i :class="getSortIcon('teslimatHedefTutari')" class="ml-1"></i>
                            </th>
                            <th class="w-40 sortable" @click="sortBy('teslimatGerceklesme')">
                                Teslimat Gerçekleşme Tutarı
                                <i :class="getSortIcon('teslimatGerceklesme')" class="ml-1"></i>
                            </th>
                            <th class="w-32 sortable" @click="sortBy('teslimatYuzdesi')">
                                Teslimat Yüzdesi (%)
                                <i :class="getSortIcon('teslimatYuzdesi')" class="ml-1"></i>
                            </th>
                            -->
                            <!-- İşçilik -->
                            <th class="w-32 sortable" @click="sortBy('toplamIscilikSuresi')">
                                Toplam İşçilik Süresi
                                <i :class="getSortIcon('toplamIscilikSuresi')" class="ml-1"></i>
                            </th>
                            <th class="w-32 sortable" @click="sortBy('gerceklesenIscilikSuresi')">
                                Gerçekleşen İşçilik Süresi
                                <i :class="getSortIcon('gerceklesenIscilikSuresi')" class="ml-1"></i>
                            </th>                            
                            <th class="w-32 sortable" @click="sortBy('iscilikDurumu')">
                                İşçilik Durumu (%)
                                <i :class="getSortIcon('iscilikDurumu')" class="ml-1"></i>
                            </th>
                            
                            <!-- İşlemler -->
                            <th class="w-20">
                                İşlemler
                            </th>
                        </tr>
                    </thead><tbody>
                        <template v-for="project in paginatedProjects" :key="project.id">
                            <tr class="align-top">
                                <!-- Temel Proje Bilgileri -->
                                <td class="font-medium">{{ project.projeKodu }}</td>
                                <td class="text-center">{{ project.haneliKod }}</td>
                                <td class="word-wrap-cell">
                                    <div 
                                        v-if="project.projeAdi === 'Kent Güvenlik Yönetim Sistemi Projesi - Ek Talep-2'"
                                        @click="toggleRowExpansion(project.id)"
                                        class="cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 p-2 rounded"
                                        :class="{ 'bg-blue-50 text-blue-600': isRowExpanded(project.id) }"
                                    >
                                        <div class="flex items-center justify-between">
                                            <span>{{ project.projeAdi }}</span>
                                            <svg 
                                                class="w-4 h-4 transition-transform duration-200"
                                                :class="{ 'rotate-180': isRowExpanded(project.id) }"
                                                fill="none" 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <span v-else>{{ project.projeAdi }}</span>
                                </td>
                            <td class="text-center">{{ formatDate(project.projeBaslangicTarihi) }}</td>
                            <td class="text-center">{{ project.projeSuresi }}</td>
                            <td class="text-center">
                                <span :class="getDurumStatusBadge(project.projeGecikmeDurumu)" class="badge">
                                    {{ project.projeGecikmeDurumu }}
                                </span>
                            </td>
                            <td class="text-center">{{ calculateProjeGecikmeSuresi(project.garantiBaslangicTarihi, project.garantiSuresi) }} ay</td>
                            <td class="text-center">{{ formatDate(project.garantiBaslangicTarihi) }}</td>
                            <td class="text-center">{{ project.garantiSuresi && project.garantiSuresi !== 'Belirtilmemiş' && !project.garantiSuresi.includes('ay') ? project.garantiSuresi + ' ay' : project.garantiSuresi }}</td>
                            <td class="text-center">{{ (project as any).garantiBitisTarihi ? formatDate((project as any).garantiBitisTarihi) : formatDate(calculateGarantiBitisTarihi(project.garantiBaslangicTarihi, project.garantiSuresi)) }}</td>
                            <td class="text-center">
                                <div class="progress-container">
                                    <div class="progress-bar">
                                        <div class="progress-fill" 
                                             :class="getProgressBarClass(calculateGarantiDurumu(project.garantiBaslangicTarihi, project.garantiSuresi))" 
                                             :style="`width: ${Math.min(calculateGarantiDurumu(project.garantiBaslangicTarihi, project.garantiSuresi), 100)}%`">
                                        </div>
                                    </div>
                                    <span class="progress-text">{{ calculateGarantiDurumu(project.garantiBaslangicTarihi, project.garantiSuresi) }}%</span>
                                </div>
                            </td>
                            <td class="text-center">
                                <span :class="getDurumStatusBadge(project.garantiGecikmeDurumu)" class="badge">
                                    {{ project.garantiGecikmeDurumu }}
                                </span>
                            </td>
                            <!-- Kurulum ve Malzeme -->
                            <td class="text-center">
                                <span :class="getDurumStatusBadge(project.kurulumSorumluBirimi)" class="badge">
                                    {{ project.kurulumSorumluBirimi }}
                                </span>
                            </td>
                            <td class="text-center">{{ formatDate(project.kurulumTarihi) }}</td>
                            <td class="text-center">
                                <span :class="getDurumStatusBadge(project.yedekParcaDurumu)" class="badge">
                                    {{ project.yedekParcaDurumu }}
                                </span>
                            </td>
                            <td class="text-center">
                                <span :class="getDurumStatusBadge(project.sarfMalzemeDurumu)" class="badge">
                                    {{ project.sarfMalzemeDurumu }}
                                </span>
                            </td>
                            <!-- İşçilik -->
                            <td class="text-center">{{ project.toplamIscilikSuresi }}</td>
                            <td class="text-center">{{ project.gerceklesenIscilikSuresi }}</td>
                            <td class="text-center">
                                <div class="progress-container">
                                    <div class="progress-bar">
                                        <div class="progress-fill" 
                                             :class="getProgressBarClass(calculateIscilikDurumu(project.toplamIscilikSuresi, project.gerceklesenIscilikSuresi))" 
                                             :style="`width: ${Math.min(calculateIscilikDurumu(project.toplamIscilikSuresi, project.gerceklesenIscilikSuresi), 100)}%`">
                                        </div>
                                    </div>
                                    <span class="progress-text">{{ calculateIscilikDurumu(project.toplamIscilikSuresi, project.gerceklesenIscilikSuresi) }}%</span>
                                </div>
                            </td>
                            
                            <!-- İşlemler -->
                            <td class="text-center">
                                <button type="button" @click="goToProjectDetail(project.id)" class="btn btn-sm btn-primary">
                                    <svg class="w-4 h-4 ltr:mr-1 rtl:ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" stroke-width="1.5"/>
                                        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke="currentColor" stroke-width="1.5"/>
                                    </svg>
                                    Detay
                                </button>
                            </td>
                        </tr>
                        
                        <!-- Expanded rows for Kent Güvenlik Yönetim Sistemi Projesi -->
                        <tr v-if="project.projeAdi === 'Kent Güvenlik Yönetim Sistemi Projesi - Ek Talep-2' && isRowExpanded(project.id)" 
                            class="bg-blue-50 dark:bg-blue-900/20 transition-all duration-300">
                            <td colspan="19" class="p-4 border-l-4 border-blue-400">
                                <div class="space-y-3">
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center space-x-3">
                                            <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
                                            <span class="font-medium text-blue-800 dark:text-blue-200">1. Etap Kurulum:</span>
                                            <span class="text-gray-700 dark:text-gray-300">Başlangıç: {{ getEtapBaslangic(1) }} - Bitiş: {{ getEtapBitis(1) }}</span>
                                        </div>
                                        <div class="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full text-xs font-semibold">
                                            20 Ay
                                        </div>
                                    </div>
                                    <div class="ml-5 text-sm text-gray-600 dark:text-gray-400">
                                        <span class="font-medium">Kurulum Bölgeleri:</span> {{ getEtapBolgeleri(1) }}
                                    </div>
                                </div>
                            </td>
                        </tr>
                        
                        <!-- İkinci detay satırı -->
                        <tr v-if="project.projeAdi === 'Kent Güvenlik Yönetim Sistemi Projesi - Ek Talep-2' && isRowExpanded(project.id)" 
                            class="bg-green-50 dark:bg-green-900/20 transition-all duration-300">
                            <td colspan="19" class="p-4 border-l-4 border-green-400">
                                <div class="space-y-3">
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center space-x-3">
                                            <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                                            <span class="font-medium text-green-800 dark:text-green-200">2. Etap Kurulum:</span>
                                            <span class="text-gray-700 dark:text-gray-300">Başlangıç: {{ getEtapBaslangic(2) }} - Bitiş: {{ getEtapBitis(2) }}</span>
                                        </div>
                                        <div class="px-3 py-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-full text-xs font-semibold">
                                            20 Ay
                                        </div>
                                    </div>
                                    <div class="ml-5 text-sm text-gray-600 dark:text-gray-400">
                                        <span class="font-medium">Kurulum Bölgeleri:</span> {{ getEtapBolgeleri(2) }}
                                    </div>
                                </div>
                            </td>
                        </tr>
                        
                        <!-- Üçüncü detay satırı -->
                        <tr v-if="project.projeAdi === 'Kent Güvenlik Yönetim Sistemi Projesi - Ek Talep-2' && isRowExpanded(project.id)" 
                            class="bg-orange-50 dark:bg-orange-900/20 transition-all duration-300">
                            <td colspan="19" class="p-4 border-l-4 border-orange-400">
                                <div class="space-y-3">
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center space-x-3">
                                            <div class="w-2 h-2 bg-orange-400 rounded-full"></div>
                                            <span class="font-medium text-orange-800 dark:text-orange-200">3. Etap Kurulum:</span>
                                            <span class="text-gray-700 dark:text-gray-300">Başlangıç: {{ getEtapBaslangic(3) }} - Bitiş: {{ getEtapBitis(3) }}</span>
                                        </div>
                                        <div class="px-3 py-1 bg-orange-100 dark:bg-orange-800 text-orange-800 dark:text-orange-200 rounded-full text-xs font-semibold">
                                            20 Ay
                                        </div>
                                    </div>
                                    <div class="ml-5 text-sm text-gray-600 dark:text-gray-400">
                                        <span class="font-medium">Kurulum Bölgeleri:</span> {{ getEtapBolgeleri(3) }}
                                    </div>
                                </div>
                            </td>
                        </tr>
                        </template>
                        <tr v-if="filteredProjects.length === 0">
                            <td colspan="19" class="text-center py-8 text-gray-500">
                                Proje bulunamadı
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <!-- Pagination Controls -->
            <div class="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                <!-- Page Size Selector (Sol taraf) -->
                <div class="flex items-center gap-2">
                    <label class="text-sm font-medium">Sayfa başına:</label>
                    <select v-model="pageSize" @change="changePageSize(pageSize)" class="form-select w-20">
                        <option :value="10">10</option>
                        <option :value="50">50</option>
                        <option :value="100">100</option>
                    </select>
                    <span class="text-sm text-gray-600">
                        Toplam {{ filteredProjects.length }} kayıt
                    </span>
                </div>

                <!-- Page Navigation (Sağ taraf) -->
                <div class="flex flex-col sm:flex-row items-center gap-4">
                    <!-- Page Info -->
                    <div class="text-sm text-gray-600">
                        Sayfa {{ currentPage }} / {{ totalPages }}
                    </div>

                    <!-- Navigation Buttons -->
                    <div class="flex items-center gap-2" v-if="totalPages > 1">
                        <button 
                            @click="prevPage" 
                            :disabled="currentPage === 1"
                            class="btn btn-outline-secondary btn-sm"
                            :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
                        >
                            Önceki
                        </button>
                        
                        <!-- İlk sayfa -->
                        <button 
                            v-if="visiblePages[0] > 1"
                            @click="changePage(1)"
                            class="btn btn-sm btn-outline-secondary"
                        >
                            1
                        </button>
                        
                        <!-- İlk sayfadan sonra boşluk varsa ... göster -->
                        <span v-if="visiblePages[0] > 2" class="px-2">...</span>
                        
                        <!-- Dinamik sayfa numaraları -->
                        <button 
                            v-for="page in visiblePages" 
                            :key="page"
                            @click="changePage(page)"
                            class="btn btn-sm"
                            :class="currentPage === page ? 'btn-primary' : 'btn-outline-secondary'"
                        >
                            {{ page }}
                        </button>
                        
                        <!-- Son sayfadan önce boşluk varsa ... göster -->
                        <span v-if="visiblePages[visiblePages.length - 1] < totalPages - 1" class="px-2">...</span>
                        
                        <!-- Son sayfa -->
                        <button 
                            v-if="visiblePages[visiblePages.length - 1] < totalPages"
                            @click="changePage(totalPages)"
                            class="btn btn-sm btn-outline-secondary"
                        >
                            {{ totalPages }}
                        </button>
                        
                        <button 
                            @click="nextPage" 
                            :disabled="currentPage === totalPages"
                            class="btn btn-outline-secondary btn-sm"
                            :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
                        >
                            Sonraki
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useMeta } from '@/composables/use-meta';
import * as XLSX from 'xlsx';

useMeta({ title: 'Proje Özeti' });

const router = useRouter();
const route = useRoute();

// Toast notification state
const showToast = ref(false);
const toastMessage = ref('');
const toastType = ref('info'); // success, warning, error, info

// Loading state
const isLoadingExcel = ref(false);

// Pagination state
const currentPage = ref(1);
const pageSize = ref(10);

// Filters
const filters = ref({
    direktorluk: '',
    projeKodu: '',
    projeDurumu: '',
    garantiDurumu: ''
});

// Expandable rows state
const expandedRows = ref(new Set());

// Mock data - Resimlerdeki formata uygun
const projects = ref([
    {
        id: 'PSE5924',
        projeKodu: 'PSE5924',
        haneliKod: '9972',
        projeAdi: 'Kent Güvenlik Yönetim Sistemi Projesi - Ek Talep-2',
        projeBaslangicTarihi: '2018-12-17',
        projeSuresi: '60',
        projeGecikmeDurumu: 'Gecikmiş',
        projeGecikmeSuresi: '19',
        garantiBaslangicTarihi: '2024-12-01',
        garantiSuresi: '12',
        garantiDurumu: '556',
        garantiGecikmeDurumu: 'Zamanında',
        kurulumSorumluBirimi: 'Güvenlik Sistemleri Program Direktörlüğü',
        kurulumTarihi: '2024-11-30',
        yedekParcaDurumu: 'Sipariş Geçildi',
        sarfMalzemeDurumu: 'Sipariş Geçildi',
        toplamIscilikSuresi: '365',
        gerceklesenIscilikSuresi: '128',
        iscilikDurumu: '35'
    },
    {
        id: 'PSE8941',
        projeKodu: 'PSE8941',
        haneliKod: '7279',
        projeAdi: 'Alaçatı RES',
        projeBaslangicTarihi: '2025-06-23',
        projeSuresi: '40',
        projeGecikmeDurumu: 'Gecikmiş',
        projeGecikmeSuresi: 'Uygun Değil',
        garantiBaslangicTarihi: '2022-06-25',
        garantiSuresi: '36',
        garantiDurumu: '103',
        garantiGecikmeDurumu: 'Aşılmış',
        kurulumSorumluBirimi: 'Entegre Lojistik Destek Direktörlüğü',
        kurulumTarihi: '2025-01-27',
        yedekParcaDurumu: 'Sipariş Geçildi',
        sarfMalzemeDurumu: 'Sipariş Geçildi',
        toplamIscilikSuresi: '2142',
        gerceklesenIscilikSuresi: '125',
        iscilikDurumu: '6'
    },
    {
        id: 'PSE8361',
        projeKodu: 'PSE8361',
        haneliKod: '8478',
        projeAdi: 'Aselsan Yüksek Hızda Ağırlık Ölçüm Sistemi',
        projeBaslangicTarihi: '2023-06-07',
        projeSuresi: '40',
        projeGecikmeDurumu: 'Zamanında',
        projeGecikmeSuresi: '12',
        garantiBaslangicTarihi: '2024-08-26',
        garantiSuresi: '12',
        garantiDurumu: '217',
        garantiGecikmeDurumu: 'Zamanında',
        kurulumSorumluBirimi: 'Tasarım Mühendisliği Direktörlüğü',
        kurulumTarihi: '2024-07-11',
        yedekParcaDurumu: 'Teslim Alındı',
        sarfMalzemeDurumu: 'Teslim Alındı',
        toplamIscilikSuresi: '25',
        gerceklesenIscilikSuresi: '454',
        iscilikDurumu: '40'
    },
    {
        id: 'PSE7141',
        projeKodu: 'PSE7141',
        haneliKod: '5854',
        projeAdi: 'Gebze-Darıca Metro Sinyalizasyon Sistemi',
        projeBaslangicTarihi: '2023-06-10',
        projeSuresi: '12',
        projeGecikmeDurumu: 'Gecikmiş',
        projeGecikmeSuresi: '12',
        garantiBaslangicTarihi: '2023-12-10',
        garantiSuresi: '12',
        garantiDurumu: '217',
        garantiGecikmeDurumu: 'Zamanında',
        kurulumSorumluBirimi: 'Ulaşım ve Enerji Sistemleri Program Direktörlüğü',
        kurulumTarihi: '2024-11-30',
        yedekParcaDurumu: 'Planlandı',
        sarfMalzemeDurumu: 'Planlandı',
        toplamIscilikSuresi: '250',
        gerceklesenIscilikSuresi: '100',
        iscilikDurumu: '40'
    }
]);

// Excel'den proje verilerini yükleme fonksiyonu
const loadProjectsFromExcel = async () => {
    if (isLoadingExcel.value) return; // Zaten yükleniyor
    
    isLoadingExcel.value = true;
    try {
        showNotification('Excel dosyası yükleniyor...', 'info');
        
        console.log('Excel yükleme başlıyor...');
        
        // Excel dosyasını yükle
        const response = await fetch('/excel/PROJE_LİSTESİ_UGES_ÜDM_2025_v3.xlsx');
        if (!response.ok) {
            console.error('Excel dosyası bulunamadı:', response.status);
            throw new Error('Excel dosyası bulunamadı');
        }
        
        console.log('Excel dosyası başarıyla yüklendi');
        
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        
        console.log('Excel workbook oluşturuldu, sheet\'ler:', Object.keys(workbook.Sheets));
        
        // ÖZET TABLO sheet'ini al
        const sheetName = 'ÖZET TABLO';
        const worksheet = workbook.Sheets[sheetName];
        
        if (!worksheet) {
            console.error('ÖZET TABLO sheet\'i bulunamadı');
            throw new Error('ÖZET TABLO sheet\'i bulunamadı');
        }
        
        console.log('ÖZET TABLO sheet\'i bulundu');
        
        // Ham hücre verileri ile okuma (C sütunu için)
        const range = XLSX.utils.decode_range(worksheet['!ref']!);
        const excelData: any[] = [];
        
        // Excel tarih dönüştürme fonksiyonu
        const convertExcelDate = (value: any): string => {
            if (!value) return '';
            
            // Eğer string ise direkt döndür
            if (typeof value === 'string') return value;
            
            // Eğer sayı ise Excel tarihinden normal tarihe çevir
            if (typeof value === 'number') {
                // Excel tarihi: 1900-01-01'den itibaren gün sayısı
                // JavaScript Date: 1970-01-01'den itibaren milisaniye
                const excelEpoch = new Date(1900, 0, 1); // 1 Ocak 1900
                const jsDate = new Date(excelEpoch.getTime() + (value - 2) * 24 * 60 * 60 * 1000); // -2 Excel bug fix
                
                // DD.MM.YYYY formatında döndür
                const day = jsDate.getDate().toString().padStart(2, '0');
                const month = (jsDate.getMonth() + 1).toString().padStart(2, '0');
                const year = jsDate.getFullYear();
                return `${day}.${month}.${year}`;
            }
            
            return value.toString();
        };
        
        // Garanti süresi hesaplama fonksiyonu (ay farkı)
        const calculateGarantiSuresi = (baslangicTarihi: string, bitisTarihi: string): string => {
            if (!baslangicTarihi || !bitisTarihi) return '';
            
            // DD.MM.YYYY formatını Date objesine çevir
            const parseDate = (dateStr: string) => {
                const parts = dateStr.split('.');
                if (parts.length !== 3) return null;
                // new Date(year, month-1, day) - month 0-11 arası
                return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
            };
            
            const baslangic = parseDate(baslangicTarihi);
            const bitis = parseDate(bitisTarihi);
            
            if (!baslangic || !bitis) return '';
            
            // Ay farkını hesapla
            const yilFarki = bitis.getFullYear() - baslangic.getFullYear();
            const ayFarki = bitis.getMonth() - baslangic.getMonth();
            const toplamAy = yilFarki * 12 + ayFarki;
            
            return toplamAy.toString();
        };
        
        // Proje başlangıç tarihi hesaplama fonksiyonu (garanti başlangıcından 12 ay öncesi)
        const calculateProjeBaslangicTarihi = (garantiBaslangicTarihi: string): string => {
            if (!garantiBaslangicTarihi) return '';
            
            // DD.MM.YYYY formatını Date objesine çevir
            const parseDate = (dateStr: string) => {
                const parts = dateStr.split('.');
                if (parts.length !== 3) return null;
                return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
            };
            
            const garantiBaslangic = parseDate(garantiBaslangicTarihi);
            if (!garantiBaslangic) return '';
            
            // 12 ay öncesini hesapla
            const projeBaslangic = new Date(garantiBaslangic);
            projeBaslangic.setMonth(projeBaslangic.getMonth() - 12);
            
            // DD.MM.YYYY formatında döndür
            const day = projeBaslangic.getDate().toString().padStart(2, '0');
            const month = (projeBaslangic.getMonth() + 1).toString().padStart(2, '0');
            const year = projeBaslangic.getFullYear();
            return `${day}.${month}.${year}`;
        };
        
        // Proje gecikme durumu hesaplama fonksiyonu
        const calculateProjeGecikmeDurumu = (garantiBaslangicTarihi: string, garantiSuresi: string): string => {
            if (!garantiBaslangicTarihi || !garantiSuresi) return 'Belirtilmemiş';
            
            // calculateProjeGecikmeSuresi fonksiyonunu kullan
            const gecikmeSuresi = calculateProjeGecikmeSuresi(garantiBaslangicTarihi, garantiSuresi);
            
            if (gecikmeSuresi === 0) {
                return 'Zamanında';
            } else if (gecikmeSuresi > 0) {
                return 'Gecikmiş';
            } else {
                return 'Henüz Başlamadı';
            }
        };
        
        // Garanti gecikme durumu hesaplama fonksiyonu
        const calculateGarantiGecikmeDurumu = (garantiBitisTarihi: string): string => {
            if (!garantiBitisTarihi || garantiBitisTarihi === 'Belirtilmemiş') return 'Belirtilmemiş';
            
            // DD.MM.YYYY formatını Date objesine çevir
            const parseDate = (dateStr: string) => {
                const parts = dateStr.split('.');
                if (parts.length !== 3) {
                    const date = new Date(dateStr);
                    return isNaN(date.getTime()) ? null : date;
                }
                return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
            };
            
            const bitisTarihi = parseDate(garantiBitisTarihi);
            if (!bitisTarihi) return 'Belirtilmemiş';
            
            const bugun = new Date();
            bugun.setHours(0, 0, 0, 0); // Sadece tarih karşılaştırması için
            bitisTarihi.setHours(0, 0, 0, 0);
            
            if (bitisTarihi > bugun) {
                return 'Zamanında';
            } else if (bitisTarihi < bugun) {
                return 'Aşılmış';
            } else {
                return 'Zamanında'; // Bugün bitiyor
            }
        };
        
        for (let row = 1; row <= range.e.r; row++) { // Başlık satırını atla
            const aCell = worksheet[`A${row + 1}`];
            const bCell = worksheet[`B${row + 1}`];
            const cCell = worksheet[`C${row + 1}`];
            const dCell = worksheet[`D${row + 1}`];
            
            if (aCell && bCell) {
                const rowData: any = {
                    PYP: aCell.v,
                    Proje: bCell.v,
                    'Garanti Dönemine Giriş Tarihi': convertExcelDate(cCell ? cCell.v : ''),
                    'Proje Bitiş Tarihi': convertExcelDate(dCell ? dCell.v : '')
                };
                excelData.push(rowData);
            }
        }
        
        console.log('Excel\'den yüklenen veri:', excelData);
        
        // Excel verilerini mevcut projelere ekle (ilk 4 mock data hariç)
        let addedCount = 0;
        excelData.forEach((row: any) => {
            if (row.PYP && row.Proje) {
                const projectExists = projects.value.some(p => p.projeKodu === row.PYP);
                
                if (!projectExists) {
                    const garantiBaslangic = row['Garanti Dönemine Giriş Tarihi'] || '';
                    const garantiBitis = row['Proje Bitiş Tarihi'] || '';
                    const hesaplananGarantiSuresi = calculateGarantiSuresi(garantiBaslangic, garantiBitis);
                    const hesaplananProjeBaslangic = calculateProjeBaslangicTarihi(garantiBaslangic);
                    const hesaplananProjeGecikmeDurumu = calculateProjeGecikmeDurumu(garantiBaslangic, hesaplananGarantiSuresi);
                    const hesaplananGarantiGecikmeDurumu = calculateGarantiGecikmeDurumu(garantiBitis);
                    
                    const newProject: any = {
                        id: row.PYP,
                        projeKodu: row.PYP,
                        haneliKod: 'Belirtilmemiş',
                        projeAdi: row.Proje,
                        projeBaslangicTarihi: hesaplananProjeBaslangic || 'Belirtilmemiş',
                        projeSuresi: hesaplananGarantiSuresi ? `${hesaplananGarantiSuresi} ay` : 'Belirtilmemiş',
                        projeGecikmeDurumu: hesaplananProjeGecikmeDurumu,
                        projeGecikmeSuresi: garantiBaslangic && hesaplananGarantiSuresi ? 
                            `${calculateProjeGecikmeSuresi(garantiBaslangic, hesaplananGarantiSuresi)} ay` : 'Belirtilmemiş',
                        garantiBaslangicTarihi: garantiBaslangic || 'Belirtilmemiş',
                        garantiBitisTarihi: garantiBitis || 'Belirtilmemiş',
                        garantiSuresi: hesaplananGarantiSuresi || 'Belirtilmemiş',
                        garantiDurumu: 'Belirtilmemiş',
                        garantiGecikmeDurumu: hesaplananGarantiGecikmeDurumu,
                        kurulumSorumluBirimi: 'Belirtilmemiş',
                        kurulumTarihi: 'Belirtilmemiş',
                        yedekParcaDurumu: 'Belirtilmemiş',
                        sarfMalzemeDurumu: 'Belirtilmemiş',
                        toplamIscilikSuresi: 'Belirtilmemiş',
                        gerceklesenIscilikSuresi: 'Belirtilmemiş',
                        iscilikDurumu: 'Belirtilmemiş'
                    };
                    projects.value.push(newProject);
                    addedCount++;
                }
            }
        });
        
        showNotification(`Excel'den ${addedCount} proje başarıyla yüklendi!`, 'success');
        
    } catch (error) {
        console.error('Excel yükleme hatası:', error);
        const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata';
        showNotification('Excel dosyası yüklenirken hata oluştu: ' + errorMessage, 'error');
    } finally {
        isLoadingExcel.value = false;
    }
};

// Filtreler değiştiğinde sayfa sıfırlansın
watch(filters, () => {
    currentPage.value = 1;
}, { deep: true });

// Component mount edildiğinde Excel verilerini yükle
onMounted(() => {
    loadProjectsFromExcel();
    
    // Query parametresinden proje durumu filtresi uygula
    if (route.query.projeDurumu) {
        // Index.vue'den gelen değerleri filtreye map et
        const statusMapping: { [key: string]: string } = {
            'Gecikmiş': 'Proje Gecikmede',
            'Zamanında': 'Proje Takvimine Uygun İlerliyor', 
            'Tamamlandı': 'Proje Tamamlandı'
        };
        
        const queryStatus = route.query.projeDurumu as string;
        const filterStatus = statusMapping[queryStatus] || queryStatus;
        
        filters.value.projeDurumu = filterStatus;
    }
});

// Computed
const filteredProjects = computed(() => {
    let filtered = projects.value.filter(project => {
        return (
            (filters.value.direktorluk === '' || project.kurulumSorumluBirimi === filters.value.direktorluk) &&
            (filters.value.projeKodu === '' || project.projeKodu.toLowerCase().includes(filters.value.projeKodu.toLowerCase())) &&
            (filters.value.projeDurumu === '' || getProjectStatus(project) === filters.value.projeDurumu) &&
            (filters.value.garantiDurumu === '' || 
                (filters.value.garantiDurumu === 'gecikme' && project.garantiGecikmeDurumu === 'Aşılmış') ||
                (filters.value.garantiDurumu === 'normal' && (project.garantiGecikmeDurumu === 'Zamanında' || project.garantiGecikmeDurumu === 'Normal')) ||
                (filters.value.garantiDurumu === 'belirtilmemis' && (project.garantiGecikmeDurumu === 'Belirtilmemiş' || !project.garantiGecikmeDurumu))
            )
        );
    });

    // Apply sorting
    if (sortConfig.value.key) {
        filtered.sort((a: any, b: any) => {
            let aValue = a[sortConfig.value.key];
            let bValue = b[sortConfig.value.key];

            // Handle different data types
            if (sortConfig.value.key.includes('Tarihi')) {
                // Date sorting
                aValue = aValue ? new Date(aValue).getTime() : 0;
                bValue = bValue ? new Date(bValue).getTime() : 0;
            } else if (sortConfig.value.key.includes('Suresi') || sortConfig.value.key.includes('Yuzde')) {
                // Numeric sorting
                aValue = parseInt(aValue) || 0;
                bValue = parseInt(bValue) || 0;
            } else if (typeof aValue === 'string') {
                // String sorting (case insensitive)
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }

            if (aValue < bValue) {
                return sortConfig.value.direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.value.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }

    return filtered;
});

// Dinamik direktörlük listesi
const availableDirectorships = computed(() => {
    const directorships = [...new Set(projects.value.map(p => p.kurulumSorumluBirimi))];
    return directorships.filter(d => d && d !== '').sort();
});

// Pagination computed properties
const totalPages = computed(() => {
    return Math.ceil(filteredProjects.value.length / pageSize.value);
});

const paginatedProjects = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return filteredProjects.value.slice(start, end);
});

// Dinamik sayfa numaraları hesaplama
const visiblePages = computed(() => {
    const total = totalPages.value;
    const current = currentPage.value;
    const delta = 2; // Mevcut sayfanın sağ ve solunda kaç sayfa gösterilsin
    
    if (total <= 7) {
        // Toplam sayfa 7 veya daha azsa hepsini göster
        return Array.from({ length: total }, (_, i) => i + 1);
    }
    
    let start = Math.max(1, current - delta);
    let end = Math.min(total, current + delta);
    
    // Baştan veya sondan uzaklaşırken daha fazla sayfa göster
    if (current <= delta + 1) {
        end = Math.min(total, 5);
    } else if (current >= total - delta) {
        start = Math.max(1, total - 4);
    }
    
    const pages: number[] = [];
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }
    
    return pages;
});

// Methods
const showNotification = (message: string, type: 'success' | 'warning' | 'error' | 'info' = 'info') => {
    toastMessage.value = message;
    toastType.value = type;
    showToast.value = true;
    
    // Auto hide after 4 seconds
    setTimeout(() => {
        showToast.value = false;
    }, 4000);
};

const closeToast = () => {
    showToast.value = false;
};

const getToastClass = () => {
    const baseClasses = 'flex items-center p-4 mb-4 text-sm rounded-lg shadow-lg min-w-[300px] max-w-md';
    switch (toastType.value) {
        case 'success':
            return `${baseClasses} text-green-800 bg-green-50 border border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-700`;
        case 'warning':
            return `${baseClasses} text-yellow-800 bg-yellow-50 border border-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-700`;
        case 'error':
            return `${baseClasses} text-red-800 bg-red-50 border border-red-200 dark:bg-red-900 dark:text-red-300 dark:border-red-700`;
        default:
            return `${baseClasses} text-blue-800 bg-blue-50 border border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700`;
    }
};

const getToastIconClass = () => {
    switch (toastType.value) {
        case 'success':
            return 'text-green-500 dark:text-green-400';
        case 'warning':
            return 'text-yellow-500 dark:text-yellow-400';
        case 'error':
            return 'text-red-500 dark:text-red-400';
        default:
            return 'text-blue-500 dark:text-blue-400';
    }
};

const goBack = () => {
    router.push('/');
};

// Toggle row expansion
const toggleRowExpansion = (projectId: string) => {
    if (expandedRows.value.has(projectId)) {
        expandedRows.value.delete(projectId);
    } else {
        expandedRows.value.add(projectId);
    }
};

// Check if row is expanded
const isRowExpanded = (projectId: string) => {
    return expandedRows.value.has(projectId);
};

// Etap tarihleri hesaplama fonksiyonları
const getEtapBaslangic = (etapNo: number): string => {
    const baslangicTarihi = '17.12.2018'; // Kent Güvenlik projesi başlangıç tarihi
    
    // DD.MM.YYYY formatını Date objesine çevir
    const parseDate = (dateStr: string) => {
        const parts = dateStr.split('.');
        if (parts.length !== 3) return null;
        return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
    };
    
    const proje_baslangic = parseDate(baslangicTarihi);
    if (!proje_baslangic) return '';
    
    // Her etap 20 ay, etap numarasına göre hesapla
    const etap_baslangic = new Date(proje_baslangic);
    etap_baslangic.setMonth(etap_baslangic.getMonth() + ((etapNo - 1) * 20));
    
    // DD.MM.YYYY formatında döndür
    const day = etap_baslangic.getDate().toString().padStart(2, '0');
    const month = (etap_baslangic.getMonth() + 1).toString().padStart(2, '0');
    const year = etap_baslangic.getFullYear();
    return `${day}.${month}.${year}`;
};

const getEtapBitis = (etapNo: number): string => {
    const baslangicTarihi = getEtapBaslangic(etapNo);
    
    // DD.MM.YYYY formatını Date objesine çevir
    const parseDate = (dateStr: string) => {
        const parts = dateStr.split('.');
        if (parts.length !== 3) return null;
        return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
    };
    
    const etap_baslangic = parseDate(baslangicTarihi);
    if (!etap_baslangic) return '';
    
    // 20 ay ekle
    const etap_bitis = new Date(etap_baslangic);
    etap_bitis.setMonth(etap_bitis.getMonth() + 20);
    
    // DD.MM.YYYY formatında döndür
    const day = etap_bitis.getDate().toString().padStart(2, '0');
    const month = (etap_bitis.getMonth() + 1).toString().padStart(2, '0');
    const year = etap_bitis.getFullYear();
    return `${day}.${month}.${year}`;
};

// Etaplara rastgele dağıtılmış bölgeler
const getEtapBolgeleri = (etapNo: number): string => {
    const etapBolgeleri = {
        1: [2, 5, 8, 11, 14, 17, 20, 23, 26], // 9 bölge
        2: [1, 4, 7, 10, 13, 16, 19, 22, 25], // 9 bölge  
        3: [3, 6, 9, 12, 15, 18, 21, 24, 27]  // 9 bölge
    };
    
    const bolgeler = etapBolgeleri[etapNo as keyof typeof etapBolgeleri] || [];
    return bolgeler.join(', ') + '. Bölgelere kurulum yapıldı';
};

const exportToExcel = () => {
    // Excel export functionality
    showNotification('Excel export özelliği yakında eklenecek! 📊✨', 'info');
};

const formatDate = (dateString: string) => {
    if (!dateString) return 'Belirtilmemiş';
    
    // Eğer zaten DD.MM.YYYY formatında ise direkt döndür
    if (/^\d{2}\.\d{2}\.\d{4}$/.test(dateString)) {
        return dateString;
    }
    
    // Diğer formatları parse etmeye çalış
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return 'Belirtilmemiş';
    }
    return date.toLocaleDateString('tr-TR');
};

const calculateGarantiBitisTarihi = (baslangicTarihi: string, garantiSuresi: string | number) => {
    if (!baslangicTarihi || !garantiSuresi) return '';
    
    // DD.MM.YYYY formatını Date objesine çevir
    const parseDate = (dateStr: string) => {
        if (!dateStr) return null;
        const parts = dateStr.split('.');
        if (parts.length !== 3) {
            // Başka format deneme
            const date = new Date(dateStr);
            return isNaN(date.getTime()) ? null : date;
        }
        // new Date(year, month-1, day) - month 0-11 arası
        return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
    };
    
    const baslangic = parseDate(baslangicTarihi);
    if (!baslangic) return '';
    
    const suresi = parseInt(garantiSuresi.toString());
    
    // Ay ekleme
    const bitisTarihi = new Date(baslangic);
    bitisTarihi.setMonth(bitisTarihi.getMonth() + suresi);
    
    // DD.MM.YYYY formatında döndür
    const day = bitisTarihi.getDate().toString().padStart(2, '0');
    const month = (bitisTarihi.getMonth() + 1).toString().padStart(2, '0');
    const year = bitisTarihi.getFullYear();
    return `${day}.${month}.${year}`;
};

const calculateGarantiDurumu = (garantiBaslangicTarihi: string, garantiSuresi: string | number) => {
    if (!garantiBaslangicTarihi || !garantiSuresi) return 0;
    
    // DD.MM.YYYY formatını Date objesine çevir
    const parseDate = (dateStr: string) => {
        if (!dateStr) return null;
        const parts = dateStr.split('.');
        if (parts.length !== 3) {
            const date = new Date(dateStr);
            return isNaN(date.getTime()) ? null : date;
        }
        return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
    };
    
    const baslangic = parseDate(garantiBaslangicTarihi);
    if (!baslangic) return 0;
    
    const suresi = parseInt(garantiSuresi.toString());
    const bitisTarihi = new Date(baslangic);
    bitisTarihi.setMonth(bitisTarihi.getMonth() + suresi);
    
    const bugun = new Date();
    const toplamGun = bitisTarihi.getTime() - baslangic.getTime();
    const gecenGun = bugun.getTime() - baslangic.getTime();
    
    if (gecenGun < 0) return 0; // Henüz başlamamış
    
    const yuzde = Math.round((gecenGun / toplamGun) * 100);
    return Math.max(0, yuzde); // %100'ü geçebilir
};

const calculateIscilikDurumu = (toplamIscilikSuresi: string | number, gerceklesenIscilikSuresi: string | number) => {
    const toplam = parseInt(toplamIscilikSuresi.toString()) || 0;
    const gerceklesen = parseInt(gerceklesenIscilikSuresi.toString()) || 0;
    
    if (toplam === 0) return 0;
    
    const yuzde = Math.round((gerceklesen / toplam) * 100);
    return Math.max(0, yuzde); // %100'ü geçebilir
};

const calculateProjeGecikmeSuresi = (garantiBaslangicTarihi: string, garantiSuresi: string | number) => {
    if (!garantiBaslangicTarihi || !garantiSuresi) return 0;
    
    // Garanti bitiş tarihini hesapla
    const garantiBitisTarihi = calculateGarantiBitisTarihi(garantiBaslangicTarihi, garantiSuresi);
    if (!garantiBitisTarihi) return 0;
    
    // DD.MM.YYYY formatını Date objesine çevir
    const parseDate = (dateStr: string) => {
        if (!dateStr) return null;
        const parts = dateStr.split('.');
        if (parts.length !== 3) {
            const date = new Date(dateStr);
            return isNaN(date.getTime()) ? null : date;
        }
        return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
    };
    
    const bitisTarihi = parseDate(garantiBitisTarihi);
    if (!bitisTarihi) return 0;
    
    const bugun = new Date();
    
    // Eğer garanti bitiş tarihi geçmişse gecikme var
    if (bugun > bitisTarihi) {
        // Bugün - Garanti bitiş tarihi = Gecikme (ay cinsinden)
        const farkMs = bugun.getTime() - bitisTarihi.getTime();
        const gecikmeSuresi = Math.round(farkMs / (1000 * 60 * 60 * 24 * 30.44)); // Ay cinsinden
        return gecikmeSuresi;
    }
    
    return 0; // Henüz bitmedi, gecikme yok
};

const formatDateRange = (startDate: string, endDate: string) => {
    if (!startDate && !endDate) return '-';
    if (!startDate) return formatDate(endDate);
    if (!endDate) return formatDate(startDate);
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};

const getProjectStatus = (project: any) => {
    // projeGecikmeDurumu field'ını kullanarak durum belirle
    if (project.projeGecikmeDurumu === 'Gecikmiş') {
        return 'Proje Gecikmede';
    } else if (project.projeGecikmeDurumu === 'Zamanında') {
        return 'Proje Takvimine Uygun İlerliyor';
    } else if (project.projeGecikmeDurumu === 'Tamamlandı') {
        return 'Proje Tamamlandı';
    } else if (project.projeGecikmeDurumu === 'Belirtilmemiş' || !project.projeGecikmeDurumu) {
        return 'Belirtilmemiş';
    }
    return 'Belirtilmemiş'; // Varsayılan
};

const getProgressBarClass = (percentage: number) => {
    if (percentage >= 100) return 'bg-danger'; // 100+ kırmızı
    if (percentage >= 80) return 'bg-orange'; // 80-99 turuncu
    if (percentage >= 60) return 'bg-warning'; // 60-79 sarı
    if (percentage >= 40) return 'bg-info'; // 40-59 mavi
    return 'bg-success'; // 0-39 yeşil
};

const getDurumStatusBadge = (durum: string | undefined) => {
    if (!durum) return 'badge-outline-secondary';
    switch (durum) {
        case 'Tamamlandı':
        case 'Teslim Alındı':
        case 'Mevcut':
        case 'Yeterli':
        case 'Zamanında':
            return 'badge-outline-success';
        case 'Devam Ediyor':
        case 'Sipariş Geçildi':
        case 'Sipariş Veçildi':
        case 'Henüz Başlamadı':
            return 'badge-outline-warning';
        case 'Uygun Değil':
        case 'Başlanmadı':
        case 'Eksik':
        case 'Gecikmiş':
        case 'Aşılmış':
            return 'badge-outline-danger';
        case 'Planlandı':
            return 'badge-outline-info';
        case 'Belirtilmemiş':
            return 'badge-outline-secondary';
        default:
            return 'badge-outline-secondary';
    }
};

const resetFilters = () => {
    filters.value = {
        direktorluk: '',
        projeKodu: '',
        projeDurumu: '',
        garantiDurumu: ''
    };
    currentPage.value = 1; // Filtre sıfırlandığında sayfa da sıfırlansın
};

// Pagination functions
const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
};

const changePageSize = (newSize: number) => {
    pageSize.value = newSize;
    currentPage.value = 1; // Sayfa boyutu değiştiğinde ilk sayfaya dön
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

// Sorting functionality
const sortConfig = ref({
    key: '',
    direction: 'asc' as 'asc' | 'desc'
});

const sortBy = (key: string) => {
    if (sortConfig.value.key === key) {
        // Same column clicked, toggle direction
        sortConfig.value.direction = sortConfig.value.direction === 'asc' ? 'desc' : 'asc';
    } else {
        // New column clicked, default to ascending
        sortConfig.value.key = key;
        sortConfig.value.direction = 'asc';
    }
};

const getSortIcon = (key: string) => {
    if (sortConfig.value.key !== key) {
        return 'fas fa-sort text-gray-400';
    }
    return sortConfig.value.direction === 'asc' 
        ? 'fas fa-sort-up text-primary' 
        : 'fas fa-sort-down text-primary';
};

const formatCurrency = (value: string) => {
    return value || '€0';
};

const getPercentageBadge = (percentage: string | number) => {
    const num = parseInt(percentage.toString());
    if (num >= 80) return 'badge-outline-success';
    if (num >= 60) return 'badge-outline-warning';
    if (num >= 40) return 'badge-outline-info';
    return 'badge-outline-danger';
};

const goToProjectDetail = (projectId: string) => {
    router.push(`/proje-bilgileri/${projectId}`);
};
</script>

<style scoped>
/* Tablo özel stilleri */
.custom-summary-table {
    table-layout: fixed;
    width: 100%;
    min-width: 2000px;
}

.custom-summary-table th,
.custom-summary-table td {
    vertical-align: middle;
    padding: 8px 6px;
    border-bottom: 1px solid #e5e7eb;
    font-size: 12px;
}

.custom-summary-table th {
    background-color: #f8fafc;
    font-weight: 600;
    position: sticky;
    top: 0;
    z-index: 10;
}

.dark .custom-summary-table th {
    background-color: #1f2937;
    border-color: #374151;
}

.dark .custom-summary-table th,
.dark .custom-summary-table td {
    border-color: #374151;
}

/* Word wrap için özel sınıf */
.word-wrap-cell {
    word-wrap: break-word;
    word-break: break-word;
    white-space: normal;
    line-height: 1.4;
    max-width: 300px;
}

/* Progress bar stilleri */
.progress-container {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 120px;
}

.progress-bar {
    flex: 1;
    height: 20px;
    background-color: #e5e7eb;
    border-radius: 10px;
    overflow: hidden;
    min-width: 80px;
    position: relative;
}

.progress-fill {
    height: 100%;
    transition: width 0.3s ease;
    border-radius: 10px;
    position: relative;
}

.progress-text {
    font-size: 11px;
    font-weight: 600;
    min-width: 35px;
    text-align: right;
    color: #374151;
}

/* Dark mode support for progress bars */
.dark .progress-bar {
    background-color: #374151;
}

.dark .progress-text {
    color: #d1d5db;
}

.bg-success {
    background: linear-gradient(90deg, #10b981, #059669);
}

.bg-info {
    background: linear-gradient(90deg, #3b82f6, #2563eb);
}

.bg-warning {
    background: linear-gradient(90deg, #f59e0b, #d97706);
}

.bg-orange {
    background: linear-gradient(90deg, #f97316, #ea580c);
}

.bg-danger {
    background: linear-gradient(90deg, #ef4444, #dc2626);
}

/* Sortable column styles */
.sortable {
    cursor: pointer;
    user-select: none;
    position: relative;
    transition: background-color 0.2s ease;
}

.sortable:hover {
    background-color: #e5e7eb !important;
}

.dark .sortable:hover {
    background-color: #374151 !important;
}

.sortable i {
    font-size: 12px;
    opacity: 0.6;
    transition: opacity 0.2s ease;
}

.sortable:hover i {
    opacity: 1;
}

.text-primary {
    color: #3b82f6 !important;
}

/* Badge düzenlemeleri */
.badge {
    display: inline-block;
    padding: 2px 6px;
    font-size: 10px;
    font-weight: 500;
    border-radius: 4px;
    text-align: center;
    min-width: 50px;
}

/* Kolon genişlikleri */
.w-20 { width: 5rem; }
.w-24 { width: 6rem; }
.w-32 { width: 8rem; }
.w-40 { width: 10rem; }
.w-64 { width: 16rem; }

/* Tablo scroll düzenlemeleri */
.table-responsive {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
}

.dark .table-responsive {
    border-color: #374151;
}

/* Satır hover efekti */
.custom-summary-table tbody tr:hover {
    background-color: #f9fafb;
}

.dark .custom-summary-table tbody tr:hover {
    background-color: #374151;
}

/* Font weight für values */
.font-medium {
    font-weight: 500;
}

/* Toast Animation */
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

.animate-fade-in-down {
    animation: fadeInDown 0.3s ease-out;
}

/* Toast specific styles */
.toast-container {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 9999;
}

.toast {
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.toast button:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.dark .toast button:hover {
    background-color: rgba(0, 0, 0, 0.1);
}
</style>
