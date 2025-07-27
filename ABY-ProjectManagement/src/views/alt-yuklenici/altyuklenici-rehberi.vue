<template>
    <div>
        <div class="panel">
            <!-- Modern Header -->
            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 mb-6 border border-blue-100 dark:border-gray-600">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                            </svg>
                        </div>
                        <div>
                            <h5 class="text-2xl font-bold text-gray-900 dark:text-white">Altyüklenici Rehberi</h5>
                            <div class="flex items-center space-x-4 mt-1">
                                <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                                    <span class="text-gray-500">Toplam Kayıt:</span>
                                    <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ filteredContractors.length }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <button @click="goToAddContractor" class="btn btn-success flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                            </svg>
                            <span>Yeni Altyüklenici</span>
                        </button>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <!-- Sol Taraf - Minimal Filtre Paneli -->
                <div class="lg:col-span-1">
                    <div class="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <!-- Ultra Minimal Filtre Header -->
                        <div class="bg-gray-50 dark:bg-gray-700 px-3 py-2 border-b border-gray-200 dark:border-gray-600">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center space-x-1.5">
                                    <svg class="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"/>
                                    </svg>
                                    <h6 class="text-xs font-semibold text-gray-700 dark:text-gray-200">Filtreler</h6>
                                </div>
                                <div class="flex gap-0.5">
                                    <button @click="clearAllFilters" class="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-all" :title="'Tüm filtreleri temizle'">
                                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                                        </svg>
                                    </button>
                                    <button @click="refreshExcelData" class="p-1 text-green-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded transition-all" :disabled="isLoading" :title="'Excel verilerini yenile'">
                                        <svg v-if="!isLoading" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                                        </svg>
                                        <svg v-else class="w-3 h-3 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Ultra Kompakt Filtre İçeriği -->
                        <div class="p-3 space-y-3">
                            <!-- Ad Soyad Arama -->
                            <div>
                                <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-0.5">Ad Soyad</label>
                                <input v-model="searchTerm" type="text" placeholder="Firma adında ara..." 
                                       class="w-full px-2 py-1.5 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 transition-colors"/>
                            </div>

                            <!-- Telefon Filtresi -->
                            <div>
                                <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-0.5">Cep Telefonu</label>
                                <input v-model="filterTelefon" type="text" placeholder="Telefon numarası" 
                                       class="w-full px-2 py-1.5 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 transition-colors"/>
                            </div>

                            <div>
                                <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-0.5">İlgili Müdürlük</label>
                                <select v-model="filterMudurluk" class="w-full px-2 py-1.5 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 transition-colors">
                                    <option value="">Tümü</option>
                                    <option v-for="mudurluk in ilgiliMudurluklerList" :key="mudurluk" :value="mudurluk">
                                        {{ mudurluk }}
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-0.5">Ekip</label>
                                <select v-model="filterEkip" class="w-full px-2 py-1.5 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 transition-colors">
                                    <option value="">Tümü</option>
                                    <option v-for="ekip in ekiplerList" :key="ekip" :value="ekip">
                                        {{ ekip }}
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-0.5">Projeler</label>
                                <select v-model="filterProje" class="w-full px-2 py-1.5 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 transition-colors">
                                    <option value="">Tümü</option>
                                    <option v-for="proje in projelerList" :key="proje" :value="proje">
                                        {{ proje }}
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-0.5">İlgili Müh.</label>
                                <select v-model="filterMuhendis" class="w-full px-2 py-1.5 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 transition-colors">
                                    <option value="">Tümü</option>
                                    <option v-for="muhendis in ilgiliMuhendislerList" :key="muhendis" :value="muhendis">
                                        {{ muhendis }}
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-0.5">Görev Bölgesi</label>
                                <select v-model="filterGorevBolgesi" class="w-full px-2 py-1.5 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 transition-colors">
                                    <option value="">Tümü</option>
                                    <option v-for="bolge in gorevBolgeleriList" :key="bolge" :value="bolge">
                                        {{ bolge }}
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-0.5">Firma Bilgisi</label>
                                <select v-model="filterFirma" class="w-full px-2 py-1.5 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 transition-colors">
                                    <option value="">Tümü</option>
                                    <option v-for="firma in firmaBilgileriList" :key="firma" :value="firma">
                                        {{ firma }}
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-0.5">Kan Grubu</label>
                                <select v-model="filterKanGrubu" class="w-full px-2 py-1.5 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 transition-colors">
                                    <option value="">Tümü</option>
                                    <option v-for="kanGrubu in kanGruplariList" :key="kanGrubu" :value="kanGrubu">
                                        {{ kanGrubu }}
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-0.5">İkametgah</label>
                                <select v-model="filterSehir" class="w-full px-2 py-1.5 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 transition-colors">
                                    <option value="">Tümü</option>
                                    <option v-for="sehir in ikametgahlarList" :key="sehir" :value="sehir">
                                        {{ sehir }}
                                    </option>
                                </select>
                            </div>

                            <div class="pt-2">
                                <button @click="performSearch" type="button" class="w-full px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors flex items-center justify-center">
                                    <svg class="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                    </svg>
                                    Ara
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Sağ Taraf - Başlangıç Mesajı veya Sonuçlar -->
                <div class="lg:col-span-3">
                    <!-- Başlangıç Mesajı - Arama yapılmadığında -->
                    <div v-if="!showResults" class="flex items-center justify-center h-96">
                        <div class="text-center text-gray-500 dark:text-gray-400">
                            <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                            </svg>
                            <h3 class="text-lg font-medium mb-2">Altyüklenici Rehberi</h3>
                            <p class="text-sm">Arama yapmak için sol taraftaki filtreleri kullanın ve "Ara" butonuna tıklayın veya filtrelerde değişiklik yapın.</p>
                        </div>
                    </div>

                    <!-- Sonuçlar -->
                    <div v-if="showResults" class="space-y-4">
                        <!-- Kayıt bulunamadı mesajı -->
                        <div v-if="paginatedContractors.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
                            <div class="flex flex-col items-center">
                                <svg class="w-12 h-12 mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                </svg>
                                <p class="font-medium">Filtrelere uygun altyüklenici bulunamadı</p>
                                <p class="text-sm">Lütfen filtre kriterlerinizi kontrol edin</p>
                            </div>
                        </div>

                        <!-- Modern Altyüklenici Kartları -->
                        <div v-for="(contractor, index) in paginatedContractors" :key="contractor.id" 
                             class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-600 transition-all duration-300 group">
                            <div class="flex items-start gap-6">
                                <!-- Modern Profil Resmi Alanı -->
                                <div class="flex-shrink-0">
                                    <img :src="getPersonImage(contractor.yetkiliKisi)" 
                                         @error="handleImageError"
                                         :alt="contractor.yetkiliKisi"
                                         class="w-32 h-40 rounded-2xl object-cover border-4 border-gray-100 dark:border-gray-600 group-hover:border-blue-200 dark:group-hover:border-blue-500 transition-all duration-300 shadow-lg"/>
                                </div>

                                <!-- Bilgiler -->
                                <div class="flex-1 min-w-0">
                                    <div class="flex items-start justify-between">
                                        <div class="flex-1">
                                            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                                {{ contractor.yetkiliKisi }}
                                                <span class="text-sm font-normal text-gray-500">| {{ contractor.firmaAdi }}</span>
                                            </h3>
                                            <p class="text-sm mb-2">
                                                <span class="font-medium text-blue-600">ASELSAN Sicil:</span>
                                                <span class="text-green-600 dark:text-green-400 ml-1 font-medium">{{ contractor.aselsanSicil || 'Belirtilmemiş' }}</span>
                                            </p>
                                            
                                            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                                <div>
                                                    <span class="font-medium text-blue-600">Cep Telefonu:</span>
                                                    <span class="text-gray-600 dark:text-gray-400 ml-1">{{ contractor.telefon || 'Belirtilmemiş' }}</span>
                                                </div>
                                                <div>
                                                    <span class="font-medium text-blue-600">Dahili Tel:</span>
                                                    <span class="text-gray-600 dark:text-gray-400 ml-1">{{ contractor.dahili || 'Belirtilmemiş' }}</span>
                                                </div>
                                                <div>
                                                    <span class="font-medium text-blue-600">Firma Sicil:</span>
                                                    <span class="text-yellow-600 dark:text-yellow-400 ml-1 font-medium">{{ contractor.firmaSicil || 'Belirtilmemiş' }}</span>
                                                </div>
                                                <div>
                                                    <span class="font-medium text-blue-600">Ekip:</span>
                                                    <span 
                                                        @click="filterByEkip(contractor.ekip || 'Kent Güvenliği Ürün Destegi Brm')" 
                                                        class="text-teal-600 dark:text-teal-400 ml-1 cursor-pointer hover:text-teal-800 dark:hover:text-teal-300 hover:underline transition-all duration-200 font-medium"
                                                        :title="`${contractor.ekip || 'Kent Güvenliği Ürün Destegi Brm'} ekibine göre filtrele`">
                                                        {{ contractor.ekip || 'Kent Güvenliği Ürün Destegi Brm' }}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span class="font-medium text-blue-600">Kan Grubu:</span>
                                                    <span class="text-red-600 dark:text-red-400 ml-1 font-medium">{{ contractor.kanGrubu || 'A Rh(+)' }}</span>
                                                </div>
                                                <div>
                                                    <span class="font-medium text-blue-600">Görev Bölgesi:</span>
                                                    <span 
                                                        @click="filterByGorevBolgesi(contractor.gorevBolgesi || 'Gaziantep, Kilis')" 
                                                        class="text-gray-600 dark:text-gray-400 ml-1 cursor-pointer hover:text-gray-800 dark:hover:text-gray-200 hover:underline transition-all duration-200"
                                                        :title="`${contractor.gorevBolgesi || 'Gaziantep, Kilis'} bölgesine göre filtrele`">
                                                        {{ contractor.gorevBolgesi || 'Gaziantep, Kilis' }}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span class="font-medium text-blue-600">Proje:</span>
                                                    <span 
                                                        @click="filterByProje(contractor.sonProje)" 
                                                        class="text-purple-600 dark:text-purple-400 ml-1 cursor-pointer hover:text-purple-800 dark:hover:text-purple-300 hover:underline transition-all duration-200 font-medium"
                                                        :title="`${contractor.sonProje} projesine göre filtrele`">
                                                        {{ contractor.sonProje }}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span class="font-medium text-blue-600">İlgili Mühendis:</span>
                                                    <span 
                                                        @click="filterByMuhendis(contractor.ilgiliMuhendis || 'Oğuzhan ÜNAL')" 
                                                        class="text-gray-600 dark:text-gray-400 ml-1 cursor-pointer hover:text-gray-800 dark:hover:text-gray-200 hover:underline transition-all duration-200"
                                                        :title="`${contractor.ilgiliMuhendis || 'Oğuzhan ÜNAL'} mühendisine göre filtrele`">
                                                        {{ contractor.ilgiliMuhendis || 'Oğuzhan ÜNAL' }}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span class="font-medium text-blue-600">İlgili Müdürlük:</span>
                                                    <span 
                                                        @click="filterByMudurluk(contractor.ilgiliMudurluk || 'Ürün Destegi Müdürlüğü')" 
                                                        class="text-orange-600 ml-1 cursor-pointer hover:text-orange-800 hover:underline transition-all duration-200 font-medium"
                                                        :title="`${contractor.ilgiliMudurluk || 'Ürün Destegi Müdürlüğü'} müdürlüğüne göre filtrele`">
                                                        {{ contractor.ilgiliMudurluk || 'Ürün Destegi Müdürlüğü' }}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span class="font-medium text-blue-600">İkametgah:</span>
                                                    <span 
                                                        @click="filterBySehir(contractor.sehir)" 
                                                        class="text-gray-600 dark:text-gray-400 ml-1 cursor-pointer hover:text-gray-800 dark:hover:text-gray-200 hover:underline transition-all duration-200"
                                                        :title="`${contractor.sehir} şehrine göre filtrele`">
                                                        {{ contractor.sehir }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- İşlem Butonları -->
                                        <div class="flex items-center gap-2 ml-4">
                                            <button @click="editContractor(contractor)" class="btn btn-sm btn-outline-primary">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                                </svg>
                                            </button>
                                            <button @click="deleteContractor(contractor.id)" class="btn btn-sm btn-outline-danger">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Pagination -->
                        <div class="flex items-center justify-between mt-6" v-if="filteredContractors.length > 0">
                            <div class="flex items-center gap-2">
                                <span class="text-sm text-gray-600 dark:text-gray-400">Sayfa başına:</span>
                                <select v-model="itemsPerPage" @change="changeItemsPerPage(itemsPerPage)" class="form-select w-20 h-8 text-sm">
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                </select>
                                <span class="text-sm text-gray-600 dark:text-gray-400">
                                    Toplam {{ filteredContractors.length }} kayıttan {{ startIndex + 1 }}-{{ endIndex }} arası gösteriliyor
                                </span>
                            </div>
                            
                            <div class="flex items-center gap-1">
                                <button 
                                    @click="goToPage(1)" 
                                    :disabled="currentPage === 1"
                                    class="btn btn-sm btn-outline-primary"
                                    :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
                                >
                                    İlk
                                </button>
                                <button 
                                    @click="goToPage(currentPage - 1)" 
                                    :disabled="currentPage === 1"
                                    class="btn btn-sm btn-outline-primary"
                                    :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
                                >
                                    Önceki
                                </button>
                                
                                <template v-for="page in visiblePages" :key="page">
                                    <button 
                                        @click="goToPage(page)"
                                        class="btn btn-sm"
                                        :class="page === currentPage ? 'btn-primary' : 'btn-outline-primary'"
                                    >
                                        {{ page }}
                                    </button>
                                </template>
                                
                                <button 
                                    @click="goToPage(currentPage + 1)" 
                                    :disabled="currentPage === totalPages"
                                    class="btn btn-sm btn-outline-primary"
                                    :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
                                >
                                    Sonraki
                                </button>
                                <button 
                                    @click="goToPage(totalPages)" 
                                    :disabled="currentPage === totalPages"
                                    class="btn btn-sm btn-outline-primary"
                                    :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
                                >
                                    Son
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add/Edit Modal -->
        <div v-if="showAddModal || showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold">
                        {{ showAddModal ? 'Yeni Altyüklenici Ekle' : 'Altyüklenici Düzenle' }}
                    </h3>
                    <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>

                <form @submit.prevent="saveContractor" class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium mb-1">Firma Adı *</label>
                            <input v-model="formData.firmaAdi" type="text" class="form-input" required />
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Vergi No *</label>
                            <input v-model="formData.vergiNo" type="text" class="form-input" required />
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Yetkili Kişi *</label>
                            <input v-model="formData.yetkiliKisi" type="text" class="form-input" required />
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Sicil No</label>
                            <input v-model="formData.sicilNo" type="text" class="form-input" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">ASELSAN Sicil</label>
                            <input v-model="formData.aselsanSicil" type="text" class="form-input" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Firma Sicil</label>
                            <input v-model="formData.firmaSicil" type="text" class="form-input" />
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium mb-1">Telefon</label>
                            <input v-model="formData.telefon" type="tel" class="form-input" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Dahili</label>
                            <input v-model="formData.dahili" type="text" class="form-input" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Email</label>
                            <input v-model="formData.email" type="email" class="form-input" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Ekip</label>
                            <input v-model="formData.ekip" type="text" class="form-input" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Şehir</label>
                            <input v-model="formData.sehir" type="text" class="form-input" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Görev Bölgesi</label>
                            <select v-model="formData.gorevBolgesi" class="form-select">
                                <option value="">Seçiniz</option>
                                <option value="Marmara">Marmara</option>
                                <option value="Ege">Ege</option>
                                <option value="İç Anadolu">İç Anadolu</option>
                                <option value="Akdeniz">Akdeniz</option>
                                <option value="Karadeniz">Karadeniz</option>
                                <option value="Doğu Anadolu">Doğu Anadolu</option>
                                <option value="Güneydoğu Anadolu">Güneydoğu Anadolu</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">İlgili Mühendis</label>
                            <input v-model="formData.ilgiliMuhendis" type="text" class="form-input" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">İlgili Müdürlük</label>
                            <input v-model="formData.ilgiliMudurluk" type="text" class="form-input" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Kan Grubu</label>
                            <select v-model="formData.kanGrubu" class="form-select">
                                <option value="">Seçiniz</option>
                                <option value="A Rh+">A Rh+</option>
                                <option value="A Rh-">A Rh-</option>
                                <option value="B Rh+">B Rh+</option>
                                <option value="B Rh-">B Rh-</option>
                                <option value="AB Rh+">AB Rh+</option>
                                <option value="AB Rh-">AB Rh-</option>
                                <option value="O Rh+">O Rh+</option>
                                <option value="O Rh-">O Rh-</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Durum</label>
                            <select v-model="formData.durum" class="form-select">
                                <option value="Aktif">Aktif</option>
                                <option value="Pasif">Pasif</option>
                                <option value="Askıda">Askıda</option>
                            </select>
                        </div>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium mb-1">Adres</label>
                        <textarea v-model="formData.adres" rows="3" class="form-textarea"></textarea>
                    </div>

                    <div class="flex justify-end gap-2 pt-4">
                        <button type="button" @click="closeModal" class="btn btn-outline-secondary">İptal</button>
                        <button type="submit" class="btn btn-primary">
                            {{ showAddModal ? 'Ekle' : 'Güncelle' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useMeta } from '@/composables/use-meta';
import * as XLSX from 'xlsx';

const router = useRouter();

useMeta({ title: 'Altyüklenici Rehberi' });

// Interfaces
interface Contractor {
    id: number;
    firmaAdi: string;
    vergiNo: string;
    yetkiliKisi: string;
    sektor: string;
    telefon: string;
    email: string;
    sehir: string;
    durum: string;
    adres: string;
    sonProje: string;
    kayitTarihi: string;
    sicilNo?: string;
    dahili?: string;
    ekip?: string;
    kanGrubu?: string;
    gorevBolgesi?: string;
    ilgiliMuhendis?: string;
    ilgiliMudurluk?: string;
    aselsanSicil?: string;
    firmaSicil?: string;
}

// Reactive data
const contractors = ref<Contractor[]>([]);
const searchTerm = ref('');
const filterSektor = ref('');
const filterDurum = ref('');
const filterSehir = ref('');
const filterTelefon = ref('');
const filterEkip = ref('');
const filterProje = ref('');
const filterMuhendis = ref('');
const filterGorevBolgesi = ref('');
const filterFirma = ref('');
const filterKanGrubu = ref('');
const filterMudurluk = ref('');

// Search state
const showResults = ref(false);

// Filtre listleri için computed properties
const firmaBilgileriList = computed(() => {
    const unique = [...new Set(contractors.value.map(c => c.firmaAdi).filter(Boolean))];
    return unique.sort();
});

const ekiplerList = computed(() => {
    const unique = [...new Set(contractors.value.map(c => c.ekip).filter(Boolean))];
    return unique.sort();
});

const gorevBolgeleriList = computed(() => {
    const unique = [...new Set(contractors.value.map(c => c.gorevBolgesi).filter(Boolean))];
    return unique.sort();
});

const projelerList = computed(() => {
    const unique = [...new Set(contractors.value.map(c => c.sonProje).filter(Boolean))];
    return unique.sort();
});

const ilgiliMuhendislerList = computed(() => {
    const unique = [...new Set(contractors.value.map(c => c.ilgiliMuhendis).filter(Boolean))];
    return unique.sort();
});

const ilgiliMudurluklerList = computed(() => {
    const unique = [...new Set(contractors.value.map(c => c.ilgiliMudurluk).filter(Boolean))];
    return unique.sort();
});

const kanGruplariList = computed(() => {
    const unique = [...new Set(contractors.value.map(c => c.kanGrubu).filter(Boolean))];
    return unique.sort();
});

const ikametgahlarList = computed(() => {
    const unique = [...new Set(contractors.value.map(c => c.sehir).filter(Boolean))];
    return unique.sort();
});

// Pagination
const currentPage = ref(1);
const itemsPerPage = ref(10);

// Modal states
const showAddModal = ref(false);
const showEditModal = ref(false);
const editingContractor = ref<Contractor | null>(null);
const isLoading = ref(false);

// Form data
const formData = ref<Partial<Contractor>>({
    firmaAdi: '',
    vergiNo: '',
    yetkiliKisi: '',
    sektor: '',
    telefon: '',
    email: '',
    sehir: '',
    durum: 'Aktif',
    adres: '',
    sonProje: '',
    sicilNo: '',
    dahili: '',
    ekip: '',
    kanGrubu: '',
    gorevBolgesi: '',
    ilgiliMuhendis: '',
    ilgiliMudurluk: '',
    aselsanSicil: '',
    firmaSicil: ''
});

// Computed properties
const filteredContractors = computed(() => {
    return contractors.value.filter(contractor => {
        const matchesSearch = !searchTerm.value || 
            contractor.firmaAdi.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
            contractor.yetkiliKisi.toLowerCase().includes(searchTerm.value.toLowerCase());
        
        const matchesTelefon = !filterTelefon.value || contractor.telefon.includes(filterTelefon.value);
        const matchesFirma = !filterFirma.value || contractor.firmaAdi === filterFirma.value;
        const matchesEkip = !filterEkip.value || contractor.ekip === filterEkip.value;
        const matchesGorevBolgesi = !filterGorevBolgesi.value || contractor.gorevBolgesi === filterGorevBolgesi.value;
        const matchesProje = !filterProje.value || contractor.sonProje === filterProje.value;
        const matchesMuhendis = !filterMuhendis.value || contractor.ilgiliMuhendis === filterMuhendis.value;
        const matchesMudurluk = !filterMudurluk.value || contractor.ilgiliMudurluk === filterMudurluk.value;
        const matchesKanGrubu = !filterKanGrubu.value || contractor.kanGrubu === filterKanGrubu.value;
        const matchesSehir = !filterSehir.value || contractor.sehir === filterSehir.value;
        
        return matchesSearch && matchesTelefon && matchesFirma && matchesEkip && 
               matchesGorevBolgesi && matchesProje && matchesMuhendis && 
               matchesMudurluk && matchesKanGrubu && matchesSehir;
    });
});

const totalPages = computed(() => Math.ceil(filteredContractors.value.length / itemsPerPage.value));

const paginatedContractors = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return filteredContractors.value.slice(start, end);
});

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value);
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage.value, filteredContractors.value.length));

const visiblePages = computed(() => {
    const pages: number[] = [];
    const maxVisible = 5;
    const half = Math.floor(maxVisible / 2);
    
    let start = Math.max(1, currentPage.value - half);
    let end = Math.min(totalPages.value, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }
    
    return pages;
});

// Methods
const loadExcelData = async () => {
    try {
        // Cache busting için timestamp ekle
        const timestamp = new Date().getTime();
        const response = await fetch(`/excel/Copy of rehber (002).xlsx?t=${timestamp}`, {
            cache: 'no-cache',
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        });
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        // Başlık satırını atla (index 0) ve verileri dönüştür
        const contractorData: Contractor[] = [];
        
        for (let i = 1; i < jsonData.length; i++) {
            const row = jsonData[i] as any[];
            if (row[0]) { // Ad soyad varsa
                const contractor: Contractor = {
                    id: i,
                    yetkiliKisi: normalizeName(row[0] || ''), // A: Ad soyad
                    firmaAdi: row[1] || '', // B: Firma Bilgisi
                    telefon: row[2] || '', // C: Cep Telefonu
                    sehir: row[3] || '', // D: İkametgah
                    dahili: row[4] || '', // E: Dahili tel
                    firmaSicil: row[5] ? row[5].toString() : '', // F: Firma Sicil
                    aselsanSicil: row[6] ? row[6].toString() : '', // G: ASELSAN Sicil
                    ekip: row[13] || '', // N: Ekip (H yerine N kullanılıyor)
                    kanGrubu: row[8] || '', // I: kan grubu
                    gorevBolgesi: row[9] || '', // J: Görev Bölgesi
                    sonProje: row[10] || '', // K: Projeler
                    ilgiliMuhendis: normalizeName(row[11] || ''), // L: İlgili Müh.
                    ilgiliMudurluk: row[12] || '', // M: İlgili Müdürlük
                    
                    // Excel'de olmayan alanlar - boş bırakıyoruz
                    vergiNo: '',
                    sektor: '',
                    email: '',
                    durum: 'Aktif',
                    adres: row[3] || '', // İkametgah ile aynı
                    kayitTarihi: new Date().toLocaleDateString('tr-TR'),
                    sicilNo: row[6] ? row[6].toString() : '' // ASELSAN Sicil
                };
                
                contractorData.push(contractor);
            }
        }
        
        contractors.value = contractorData;
        console.log(`${contractorData.length} adet altyüklenici verisi yüklendi.`);
        console.log('İlk 5 kayıttaki İlgili Mühendis verileri:', 
            contractorData.slice(0, 5).map(c => ({ 
                ad: c.yetkiliKisi, 
                muhendis: c.ilgiliMuhendis 
            }))
        );
        
    } catch (error) {
        console.error('Excel dosyası okunurken hata:', error);
        // Hata durumunda boş liste
        contractors.value = [];
    }
};

// Excel verilerini yenileme fonksiyonu
const refreshExcelData = async () => {
    isLoading.value = true;
    try {
        // Cache'i tamamen temizle
        if ('caches' in window) {
            const cacheNames = await caches.keys();
            await Promise.all(cacheNames.map(name => caches.delete(name)));
        }
        
        await loadExcelData();
        // Filtreleri sıfırla
        resetFilters();
        console.log('Excel verileri başarıyla yenilendi.');
        console.log('İlgili Mühendisler:', [...new Set(contractors.value.map(c => c.ilgiliMuhendis).filter(Boolean))]);
    } catch (error) {
        console.error('Excel verileri yenilenirken hata:', error);
    } finally {
        isLoading.value = false;
    }
};

// Filtreleri sıfırlama fonksiyonu
const resetFilters = () => {
    searchTerm.value = '';
    filterSektor.value = '';
    filterDurum.value = '';
    filterSehir.value = '';
    filterTelefon.value = '';
    filterEkip.value = '';
    filterProje.value = '';
    filterMuhendis.value = '';
    filterGorevBolgesi.value = '';
    filterFirma.value = '';
    filterKanGrubu.value = '';
    filterMudurluk.value = '';
};

// Resim dosyası adını oluşturma fonksiyonu
const getImageFileName = (fullName: string) => {
    if (!fullName) return '';
    
    // Türkçe karakterleri İngilizce karşılıklarına çevir
    const turkishToEnglish: { [key: string]: string } = {
        'Ç': 'c', 'ç': 'c',
        'Ğ': 'g', 'ğ': 'g', 
        'İ': 'i', 'ı': 'i',
        'Ö': 'o', 'ö': 'o',
        'Ş': 's', 'ş': 's',
        'Ü': 'u', 'ü': 'u'
    };
    
    let normalized = fullName.toLowerCase();
    
    // Türkçe karakterleri değiştir
    Object.keys(turkishToEnglish).forEach(turkishChar => {
        normalized = normalized.replace(new RegExp(turkishChar, 'g'), turkishToEnglish[turkishChar]);
    });
    
    // Sadece harf ve boşluk bırak, diğer karakterleri temizle
    normalized = normalized.replace(/[^a-z\s]/g, '');
    
    // Birden fazla boşluğu tek boşluk yap ve trim et
    normalized = normalized.replace(/\s+/g, ' ').trim();
    
    return `${normalized}.jpg`;
};

// İsim normalizasyon fonksiyonu (veri tutarlılığı için)
const normalizeName = (name: string) => {
    if (!name) return '';
    
    // Önce trim ve çoklu boşlukları düzelt
    let normalized = name.trim().replace(/\s+/g, ' ');
    
    // Excel'deki format analizi sonucu:
    // - Tek kelimeli soyadlar: tamamen BÜYÜK (ÜNAL, ÇAKIR, AKSOY)
    // - Çift isimli: "Ad SOYAD" formatı (Asım Bilal YILMAZ, Murat Kerem ÖZDİL)
    // - Bazıları: "Ad Soyad" formatı (Aziz Sanır, Mehmet Tuncar)
    
    const words = normalized.split(' ');
    
    if (words.length === 1) {
        // Tek kelimeyse tamamını büyük yap (soyad)
        return words[0].toUpperCase();
    } else if (words.length === 2) {
        // İki kelimeyse: "Ad SOYAD" formatı
        const firstName = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
        const lastName = words[1].toUpperCase();
        return `${firstName} ${lastName}`;
    } else {
        // Üç kelimeyse: "Ad Orta SOYAD" formatı
        const firstName = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
        const middleName = words[1].charAt(0).toUpperCase() + words[1].slice(1).toLowerCase();
        const lastName = words[2].toUpperCase();
        return `${firstName} ${middleName} ${lastName}`;
    }
};

// Personel resmi URL'ini getir
const getPersonImage = (fullName: string) => {
    const fileName = getImageFileName(fullName);
    if (!fileName) return '/assets/images/user-profile.jpeg'; // Varsayılan resim
    
    return `/excel/resimler/${fileName}`;
};

// Resim yükleme hatası durumunda varsayılan resmi göster
const handleImageError = (event: Event) => {
    const img = event.target as HTMLImageElement;
    img.src = '/assets/images/user-profile.jpeg';
};

// Watch fonksiyonları - filtrelere veri girişi yapıldığında otomatik filtreleme

// Metin alanları için debounced watch (300ms gecikme ile)
let searchTimeout: NodeJS.Timeout;
watch([searchTerm, filterTelefon], () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        // Sadece filtrede değer varsa sonuçları göster
        if (searchTerm.value.trim() || filterTelefon.value.trim()) {
            showResults.value = true;
        }
        currentPage.value = 1;
    }, 300);
});

// Select alanları için anında watch (gecikme olmadan)
watch([filterMudurluk, filterEkip, filterProje, filterMuhendis, filterGorevBolgesi, filterFirma, filterKanGrubu, filterSehir], () => {
    // Herhangi bir select'te değer varsa sonuçları göster
    if (filterMudurluk.value || filterEkip.value || filterProje.value || filterMuhendis.value || 
        filterGorevBolgesi.value || filterFirma.value || filterKanGrubu.value || filterSehir.value) {
        showResults.value = true;
    }
    currentPage.value = 1;
});

const performSearch = () => {
    showResults.value = true;
    currentPage.value = 1; // Reset to first page when searching
};

// Şehire göre filtreleme fonksiyonu
const filterBySehir = (sehir: string) => {
    clearAllFilters();
    filterSehir.value = sehir;
    showResults.value = true;
    currentPage.value = 1;
};

// Ekibe göre filtreleme fonksiyonu
const filterByEkip = (ekip: string) => {
    clearAllFilters();
    filterEkip.value = ekip;
    showResults.value = true;
    currentPage.value = 1;
};

// Müdürlüğe göre filtreleme fonksiyonu
const filterByMudurluk = (mudurluk: string) => {
    clearAllFilters();
    filterMudurluk.value = mudurluk;
    showResults.value = true;
    currentPage.value = 1;
};

// Görev bölgesine göre filtreleme fonksiyonu
const filterByGorevBolgesi = (bölge: string) => {
    clearAllFilters();
    filterGorevBolgesi.value = bölge;
    showResults.value = true;
    currentPage.value = 1;
};

// Projeye göre filtreleme fonksiyonu
const filterByProje = (proje: string) => {
    clearAllFilters();
    filterProje.value = proje;
    showResults.value = true;
    currentPage.value = 1;
};

// Mühendise göre filtreleme fonksiyonu
const filterByMuhendis = (muhendis: string) => {
    clearAllFilters();
    filterMuhendis.value = muhendis;
    showResults.value = true;
    currentPage.value = 1;
};

// Tüm filtreleri temizleme fonksiyonu
const clearAllFilters = () => {
    searchTerm.value = '';
    filterTelefon.value = '';
    filterMudurluk.value = '';
    filterEkip.value = '';
    filterProje.value = '';
    filterMuhendis.value = '';
    filterGorevBolgesi.value = '';
    filterFirma.value = '';
    filterKanGrubu.value = '';
    filterSehir.value = '';
    // Sonuçları gizle
    showResults.value = false;
};

const getSektorBadge = (sektor: string) => {
    switch (sektor) {
        case 'İnşaat': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
        case 'Elektrik': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
        case 'Mekanik': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
        case 'IT': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
        case 'Temizlik': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
        case 'Güvenlik': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
        default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
};

const getDurumBadge = (durum: string) => {
    switch (durum) {
        case 'Aktif': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
        case 'Pasif': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
        case 'Askıda': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
        default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
};

const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
};

const changeItemsPerPage = (newSize: number) => {
    itemsPerPage.value = newSize;
    currentPage.value = 1;
};

const editContractor = (contractor: Contractor) => {
    editingContractor.value = contractor;
    formData.value = { ...contractor };
    showEditModal.value = true;
};

const deleteContractor = (id: number) => {
    if (confirm('Bu altyükleniciyi silmek istediğinizden emin misiniz?')) {
        contractors.value = contractors.value.filter(c => c.id !== id);
    }
};

const closeModal = () => {
    showAddModal.value = false;
    showEditModal.value = false;
    editingContractor.value = null;
    formData.value = {
        firmaAdi: '',
        vergiNo: '',
        yetkiliKisi: '',
        sektor: '',
        telefon: '',
        email: '',
        sehir: '',
        durum: 'Aktif',
        adres: '',
        sonProje: '',
        sicilNo: '',
        dahili: '',
        ekip: '',
        kanGrubu: '',
        gorevBolgesi: '',
        ilgiliMuhendis: '',
        ilgiliMudurluk: '',
        aselsanSicil: '',
        firmaSicil: ''
    };
};

const saveContractor = () => {
    if (showAddModal.value) {
        const newContractor: Contractor = {
            ...formData.value as Omit<Contractor, 'id' | 'kayitTarihi'>,
            id: Date.now(),
            kayitTarihi: new Date().toLocaleDateString('tr-TR')
        };
        contractors.value.push(newContractor);
    } else if (showEditModal.value && editingContractor.value) {
        const index = contractors.value.findIndex(c => c.id === editingContractor.value!.id);
        if (index !== -1) {
            contractors.value[index] = { ...editingContractor.value, ...formData.value };
        }
    }
    closeModal();
};

// Yeni altyüklenici ekleme sayfasına yönlendirme
const goToAddContractor = () => {
    router.push('/altyuklenici-rehber-ekle');
};

// Initialize with Excel data
onMounted(() => {
    loadExcelData();
});
</script>

<style scoped>
.table-responsive {
    overflow-x: auto;
}

.table-hover tbody tr:hover {
    background-color: rgba(243, 244, 246, 0.5);
}

.dark .table-hover tbody tr:hover {
    background-color: rgba(55, 65, 81, 0.5);
}
</style>
