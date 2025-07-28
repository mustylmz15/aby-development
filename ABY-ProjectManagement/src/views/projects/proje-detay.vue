<template>
    <div>        <!-- Header -->
        <div class="panel bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white border-0 shadow-xl">
            <div class="mb-5 flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div>
                        <h5 class="font-bold text-2xl">Proje Detay Yönetimi</h5>
                        <p class="text-white/80 text-sm mt-1">Proje bilgilerini görüntüleyin ve düzenleyin</p>
                    </div>
                </div>
                <div class="flex gap-3">
                    <button type="button" @click="goBack" class="btn bg-white/20 hover:bg-white/30 text-white border-white/30 hover:border-white/50 transition-all duration-300">
                        <svg class="w-5 h-5 ltr:mr-2 rtl:ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 6L5 12L11 18M5 12H19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Geri Dön
                    </button>                    <button v-if="selectedProjectId" type="button" @click="goToGorevGirisi" class="btn bg-green-500/80 hover:bg-green-600 text-white border-green-400/50 hover:border-green-500 transition-all duration-300">
                        <svg class="w-5 h-5 ltr:mr-2 rtl:ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 4.5V19.5M19.5 12H4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Görev Girişi
                    </button>
                    <button v-if="!isEditMode && selectedProjectId" type="button" @click="toggleEditMode" class="btn bg-orange-500/80 hover:bg-orange-600 text-white border-orange-400/50 hover:border-orange-500 transition-all duration-300 transform hover:scale-105">
                        <svg class="w-5 h-5 ltr:mr-2 rtl:ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.2869 3.15178L14.3601 4.07866L5.83882 12.5999L5.83881 12.5999C5.26166 13.1771 4.97308 13.4656 4.7249 13.7838C4.43213 14.1592 4.18114 14.5653 3.97634 14.995C3.80273 15.3593 3.67368 15.7465 3.41556 16.5208L2.32181 19.8021L2.05445 20.6042C1.92743 20.9852 2.0266 21.4053 2.31063 21.6894C2.59466 21.9734 3.01478 22.0726 3.39584 21.9456L4.19792 21.6782L7.47918 20.5844L7.47919 20.5844C8.25353 20.3263 8.6407 20.1972 9.00498 20.0236C9.43469 19.8188 9.84082 19.5678 10.2162 19.2751C10.5344 19.0269 10.8229 18.7383 11.4001 18.1612L11.4001 18.1612L19.9213 9.63993L20.8482 8.71306C22.3839 7.17735 22.3839 4.68748 20.8482 3.15178C19.3125 1.61607 16.8226 1.61607 15.2869 3.15178Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Düzenle
                    </button>
                </div>
            </div>
        </div>

        <!-- Proje Seçim Panel - Sadece direkt gelirse göster -->
        <div v-if="!isFromProjectList" class="panel mb-6 bg-white dark:bg-gray-800 shadow-xl rounded-2xl border-0">
            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div>
                        <h6 class="text-xl font-bold text-gray-800 dark:text-white">Proje Seçimi</h6>
                        <p class="text-gray-500 dark:text-gray-400 text-sm">Detaylarını görmek istediğiniz projeyi seçin</p>
                    </div>
                </div>
            </div>
            <div class="p-6">
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <select v-model="selectedProjectId" @change="loadSelectedProject" class="form-select pl-10 w-full bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 rounded-lg transition-all duration-300">
                        <option value="">Görüntülemek istediğiniz projeyi seçiniz...</option>
                        <option v-for="project in projectList" :key="project.id" :value="project.id">
                            {{ project.projeKodu }} - {{ project.projeAdi }}
                        </option>
                    </select>
                </div>
            </div>
        </div>        <!-- Form -->
        <div v-if="selectedProjectId || isFromProjectList" class="panel bg-white dark:bg-gray-800 shadow-xl rounded-2xl border-0">
            <form @submit.prevent="saveProject">
                <!-- Proje Genel Bilgisi Section -->
                <div class="mb-8">
                    <div class="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                        <div class="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                            <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div>
                            <h6 class="text-xl font-bold text-gray-800 dark:text-white">Proje Genel Bilgisi</h6>
                            <p class="text-gray-500 dark:text-gray-400 text-sm">Projenin temel bilgileri ve parametreleri</p>
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <!-- Sol Kolon -->
                        <div class="space-y-6">
                            <div class="space-y-2">
                                <label class="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <span>Proje Kodu/4 Haneli Kod</span>
                                </label>
                                <div class="flex gap-2">
                                    <input type="text" v-model="form.projeKodu" class="form-input flex-1 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 rounded-lg transition-all duration-300" :readonly="!isEditMode" />
                                    <input type="text" v-model="form.haneliKod" class="form-input w-20 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 rounded-lg transition-all duration-300" :readonly="!isEditMode" />
                                </div>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-1">Proje Adı</label>
                                <input type="text" v-model="form.projeAdi" class="form-input" :readonly="!isEditMode" />
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-1">Program Direktörlüğü</label>
                                <select v-model="form.programDirektorlugu" class="form-select" :disabled="!isEditMode">
                                    <option value="Güvenlik Sistemleri Program Direktörlüğü">Güvenlik Sistemleri Program Direktörlüğü</option>
                                    <option value="Entegre Lojistik Destek Direktörlüğü">Entegre Lojistik Destek Direktörlüğü</option>
                                    <option value="Tasarım Mühendisliği Direktörlüğü">Tasarım Mühendisliği Direktörlüğü</option>
                                </select>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-1">Proje Türü</label>
                                <select v-model="form.projeTuru" class="form-select" :disabled="!isEditMode">
                                    <option value="Sosleyemeli Proje">Sosleyemeli Proje</option>
                                    <option value="Ar-Ge">Ar-Ge</option>
                                    <option value="Ürün Geliştirme">Ürün Geliştirme</option>
                                </select>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-1">Proje Güncel Durumu</label>
                                <select v-model="form.projeGuncelDurumu" class="form-select" :disabled="!isEditMode">
                                    <option value="Proje Gecikmede">Proje Gecikmede</option>
                                    <option value="Proje Takvimine Uygun İlerliyor">Proje Takvimine Uygun İlerliyor</option>
                                    <option value="Proje Tamamlandı">Proje Tamamlandı</option>
                                </select>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-1">Yurtiçi/Yurtdışı</label>
                                <select v-model="form.yurticiYurtdisi" class="form-select" :disabled="!isEditMode">
                                    <option value="Yurtiçi Proje">Yurtiçi Proje</option>
                                    <option value="Yurtdışı Proje">Yurtdışı Proje</option>
                                </select>
                            </div>
                            
                            <div class="flex items-center">
                                <input type="checkbox" v-model="form.projeAktifPasif" class="form-checkbox" :disabled="!isEditMode" id="aktifPasif" />
                                <label for="aktifPasif" class="ltr:ml-2 rtl:mr-2 text-sm">Proje Tamamlandı?</label>
                            </div>
                            
                            <div class="grid grid-cols-2 gap-2">
                                <div>
                                    <label class="block text-sm font-medium mb-1">SLA Müdahale Süresi</label>
                                    <input type="number" v-model="form.slaMudahaleSuresi" class="form-input" :readonly="!isEditMode" />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-1">SLA Onarım Süresi</label>
                                    <input type="number" v-model="form.slaOnarimSuresi" class="form-input" :readonly="!isEditMode" />
                                </div>
                            </div>
                        </div>

                        <!-- Orta Kolon - Proje Açıklaması -->
                        <div>
                            <label class="block text-sm font-medium mb-1">Proje Açıklaması</label>
                            <textarea v-model="form.projeAciklamasi" rows="10" class="form-textarea" :readonly="!isEditMode"></textarea>
                        </div>

                        <!-- Sağ Kolon -->
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium mb-1">Eğitim Durumu</label>
                                <select v-model="form.egitimDurumu" class="form-select" :disabled="!isEditMode">
                                    <option value="Devam Ediyor">Devam Ediyor</option>
                                    <option value="Tamamlandı">Tamamlandı</option>
                                    <option value="Planlanmadı">Planlanmadı</option>
                                </select>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-1">E. Başlangıç Tarihi</label>
                                <input type="date" v-model="form.eBaslangicTarihi" class="form-input" :readonly="!isEditMode" />
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-1">E. Tamamlanma Tarihi</label>
                                <input type="date" v-model="form.eTamamlanmaTarihi" class="form-input" :readonly="!isEditMode" />
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-1">Eğitim Süresi (Gün)</label>
                                <input type="number" v-model="form.egitimSuresi" class="form-input" :readonly="!isEditMode" />
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-1">Kurulum Durumu</label>
                                <select v-model="form.kurulumDurumu" class="form-select" :disabled="!isEditMode">
                                    <option value="Tamamlandı">Tamamlandı</option>
                                    <option value="Devam Ediyor">Devam Ediyor</option>
                                    <option value="Başlanmadı">Başlanmadı</option>
                                </select>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-1">K. Başlangıç Tarihi</label>
                                <input type="date" v-model="form.kBaslangicTarihi" class="form-input" :readonly="!isEditMode" />
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-1">K. Tamamlanma Tarihi</label>
                                <input type="date" v-model="form.kTamamlanmaTarihi" class="form-input" :readonly="!isEditMode" />
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-1">Kurulum Süresi (Gün)</label>
                                <input type="number" v-model="form.kurulumSuresi" class="form-input" :readonly="!isEditMode" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Proje Ekipleri Section -->
                <div class="mb-8">
                    <div class="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                        <div class="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                            <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75M13 7a4 4 0 11-8 0 4 4 0 018 0z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div>
                            <h6 class="text-xl font-bold text-gray-800 dark:text-white">Proje Ekipleri</h6>
                            <p class="text-gray-500 dark:text-gray-400 text-sm">Proje ekip üyeleri ve sorumluları</p>
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                            <label class="block text-sm font-medium mb-1">Proje Yöneticisi</label>
                            <select v-model="form.projeYoneticisi" class="form-select" :disabled="!isEditMode">
                                <option value="ÖNDER TAŞKIN">ÖNDER TAŞKIN</option>
                                <option value="ALPER DEMİRCİOĞLU">ALPER DEMİRCİOĞLU</option>
                                <option value="ALİ CAN ERGÜR">ALİ CAN ERGÜR</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium mb-1">Proje UDM Yöneticisi 1</label>
                            <select v-model="form.projeUdmYoneticisi1" class="form-select" :disabled="!isEditMode">
                                <option value="MUSTAFA ÇAKIR">MUSTAFA ÇAKIR</option>
                                <option value="OĞUZHAN ÜNAL">OĞUZHAN ÜNAL</option>
                                <option value="DURSUN ÖZKAN ABDİK">DURSUN ÖZKAN ABDİK</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium mb-1">Proje PAM Yöneticisi 1</label>
                            <select v-model="form.projePamYoneticisi1" class="form-select" :disabled="!isEditMode">
                                <option value="GÜLŞAH KARAKÖSE">GÜLŞAH KARAKÖSE</option>
                                <option value="SUAT ÖZTÜRK">SUAT ÖZTÜRK</option>
                                <option value="İSMAİL ÇILMAN">İSMAİL ÇILMAN</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium mb-1">Proje Teknik Yöneticisi</label>
                            <select v-model="form.projeTeknikYoneticisi" class="form-select" :disabled="!isEditMode">
                                <option value="SERHAT OYAN">SERHAT OYAN</option>
                                <option value="Teknik Yönetici 2">Teknik Yönetici 2</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium mb-1">Proje UDM Yöneticisi 2</label>
                            <select v-model="form.projeUdmYoneticisi2" class="form-select" :disabled="!isEditMode">
                                <option value="">Seçiniz...</option>
                                <option value="OĞUZHAN ÜNAL">OĞUZHAN ÜNAL</option>
                                <option value="MUSTAFA ÇAKIR">MUSTAFA ÇAKIR</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium mb-1">Proje PAM Yöneticisi 2</label>
                            <select v-model="form.projePamYoneticisi2" class="form-select" :disabled="!isEditMode">
                                <option value="">Seçiniz...</option>
                                <option value="SUAT ÖZTÜRK">SUAT ÖZTÜRK</option>
                                <option value="İSMAİL ÇILMAN">İSMAİL ÇILMAN</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium mb-1">Proje Kalite Yöneticisi</label>
                            <select v-model="form.projeKaliteYoneticisi" class="form-select" :disabled="!isEditMode">
                                <option value="MUSTAFA SAIT YILDIZ">MUSTAFA SAIT YILDIZ</option>
                                <option value="Kalite Yöneticisi 2">Kalite Yöneticisi 2</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium mb-1">Proje UDM Teknisyen 1</label>
                            <select v-model="form.projeUdmTeknisyen1" class="form-select" :disabled="!isEditMode">
                                <option value="YASİN ÜNAL">YASİN ÜNAL</option>
                                <option value="Teknisyen 2">Teknisyen 2</option>
                            </select>
                        </div>
                          <div>
                            <label class="block text-sm font-medium mb-1">Çalışılan Firmalar</label>
                            <div class="relative firma-dropdown" v-if="isEditMode">
                                <div 
                                    @click="toggleFirmaDropdown" 
                                    class="form-input cursor-pointer flex items-center justify-between min-h-[38px]"
                                >
                                    <div class="flex flex-wrap gap-1">
                                        <span 
                                            v-for="firma in selectedFirmalar" 
                                            :key="firma"
                                            class="inline-flex items-center px-2 py-1 text-xs bg-primary text-white rounded-md"
                                        >
                                            {{ firma }}
                                            <button 
                                                type="button"
                                                @click.stop="removeFirma(firma)"
                                                class="ml-1 hover:bg-primary-dark rounded"
                                            >
                                                <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                            </button>
                                        </span>
                                        <span v-if="selectedFirmalar.length === 0" class="text-gray-500">
                                            Firma seçiniz...
                                        </span>
                                    </div>
                                    <svg class="w-5 h-5 text-gray-400" :class="{ 'rotate-180': showFirmaDropdown }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </div>
                                
                                <div 
                                    v-if="showFirmaDropdown" 
                                    class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-600"
                                >
                                    <div class="p-2">
                                        <input 
                                            v-model="firmaSearchTerm"
                                            type="text" 
                                            placeholder="Firma ara..." 
                                            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        />
                                    </div>
                                    <div class="max-h-48 overflow-y-auto">
                                        <div 
                                            v-for="firma in filteredFirmalar" 
                                            :key="firma"
                                            @click="toggleFirma(firma)"
                                            class="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between"
                                        >
                                            <span class="text-sm">{{ firma }}</span>
                                            <svg 
                                                v-if="selectedFirmalar.includes(firma)"
                                                class="w-4 h-4 text-primary" 
                                                fill="currentColor" 
                                                viewBox="0 0 20 20"
                                            >
                                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                            </svg>
                                        </div>
                                        <div 
                                            v-if="filteredFirmalar.length === 0"
                                            class="px-3 py-2 text-sm text-gray-500 dark:text-gray-400"
                                        >
                                            Firma bulunamadı
                                        </div>
                                    </div>
                                    <div class="p-2 border-t border-gray-200 dark:border-gray-600">
                                        <button 
                                            type="button"
                                            @click="clearAllFirmalar"
                                            class="w-full px-3 py-1 text-xs text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                                        >
                                            Tümünü Temizle
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <div class="form-input bg-gray-50 dark:bg-gray-700">
                                    <div class="flex flex-wrap gap-1">
                                        <span 
                                            v-for="firma in selectedFirmalar" 
                                            :key="firma"
                                            class="inline-flex items-center px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-md dark:bg-gray-600 dark:text-gray-300"
                                        >
                                            {{ firma }}
                                        </span>
                                        <span v-if="selectedFirmalar.length === 0" class="text-gray-500">
                                            Seçili firma yok
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium mb-1">Proje Teslimat Yöneticisi</label>
                            <select v-model="form.projeTeslimatYoneticisi" class="form-select" :disabled="!isEditMode">
                                <option value="CİHAN ÖNAL">CİHAN ÖNAL</option>
                                <option value="Teslimat Yöneticisi 2">Teslimat Yöneticisi 2</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium mb-1">Proje UDM Teknisyen 2</label>
                            <select v-model="form.projeUdmTeknisyen2" class="form-select" :disabled="!isEditMode">
                                <option value="">Seçiniz...</option>
                                <option value="Teknisyen 1">Teknisyen 1</option>
                                <option value="Teknisyen 2">Teknisyen 2</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Proje Tarihleri/Durumları Section -->
                <div class="mb-8">
                    <div class="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                        <div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center">
                            <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div>
                            <h6 class="text-xl font-bold text-gray-800 dark:text-white">Proje Tarihleri & Durumları</h6>
                            <p class="text-gray-500 dark:text-gray-400 text-sm">Proje zaman çizelgesi ve maliyet bilgileri</p>
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <!-- Sol grup -->
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium mb-1">Proje Başlangıç Tarihi</label>
                                <input type="date" v-model="form.projeBaslangicTarihi" class="form-input" :readonly="!isEditMode" />
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-1">Geçici Kabul Tarihi</label>
                                <input type="date" v-model="form.geciciKabulTarihi" class="form-input" :readonly="!isEditMode" />
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-1">Proje Süresi (Ay)</label>
                                <input type="number" v-model="form.projeSuresi" class="form-input" :readonly="!isEditMode" />
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-1">Garanti Başlangıç Tarihi</label>
                                <input type="date" v-model="form.garantiBaslangicTarihi" class="form-input" :readonly="!isEditMode" />
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-1">Garanti Süresi (Ay)</label>
                                <input type="number" v-model="form.garantiSuresi" class="form-input" :readonly="!isEditMode" />
                            </div>
                            
                            <div class="flex items-center space-x-4">
                                <div class="flex items-center">
                                    <input type="checkbox" v-model="form.garantiSuresiGecikme" class="form-checkbox" :disabled="!isEditMode" id="garantiGecikme" />
                                    <label for="garantiGecikme" class="ltr:ml-2 rtl:mr-2 text-sm">Garanti Süresi Gecikme Durum</label>
                                </div>
                            </div>
                            
                            <div class="flex items-center space-x-4">
                                <div class="flex items-center">
                                    <input type="checkbox" v-model="form.projeGecikmeleri" class="form-checkbox" :disabled="!isEditMode" id="projeGecikme" />
                                    <label for="projeGecikme" class="ltr:ml-2 rtl:mr-2 text-sm">Proje Gecikme Durumu</label>
                                </div>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-1">ELD Müdahalesi</label>
                                <select v-model="form.eldMudahalesi" class="form-select" :disabled="!isEditMode">
                                    <option value="Var">Var</option>
                                    <option value="Yok">Yok</option>
                                </select>
                            </div>
                        </div>

                        <!-- İkinci grup -->
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium mb-1">Proje Geçikme Süresi (Ay)</label>
                                <input type="number" v-model="form.projeGecikmeleriAy" class="form-input" :readonly="!isEditMode" />
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-1">Yedek Parça Durumu</label>
                                <select v-model="form.yedekParcaDurumu" class="form-select" :disabled="!isEditMode">
                                    <option value="Teslim Alındı">Teslim Alındı</option>
                                    <option value="Mevcut">Mevcut</option>
                                    <option value="Eksik">Eksik</option>
                                </select>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-1">Şarf Malzeme Durumu</label>
                                <select v-model="form.sarfMalzemeDurumu" class="form-select" :disabled="!isEditMode">
                                    <option value="Sipariş Veçildi">Sipariş Veçildi</option>
                                    <option value="Yeterli">Yeterli</option>
                                    <option value="Eksik">Eksik</option>
                                </select>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-1">DKÖT Malzeme Durumu</label>
                                <select v-model="form.dkotMalzemeDurumu" class="form-select" :disabled="!isEditMode">
                                    <option value="Teslim Alındı">Teslim Alındı</option>
                                    <option value="Tamamlandı">Tamamlandı</option>
                                    <option value="Devam Ediyor">Devam Ediyor</option>
                                </select>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-1">Proje ELD Bütçesi (TL)</label>
                                <input type="text" v-model="form.projeEldBütcesi" class="form-input" :readonly="!isEditMode" />
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-1">Proje ELD Bütçesi ($)</label>
                                <input type="text" v-model="form.projeEldBütcesiDolar" class="form-input" :readonly="!isEditMode" />
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-1">Gerçekleşen ELD Bütçesi</label>
                                <input type="text" v-model="form.gerceklesenEldButcesi" class="form-input" :readonly="!isEditMode" />
                            </div>
                        </div>

                        <!-- Üçüncü grup -->
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium mb-1">Teslimat Hedef Tutarı</label>
                                <input type="text" v-model="form.teslimatHedefTutari" class="form-input" :readonly="!isEditMode" />
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-1">Teslimat Gerçekleşme Durumu</label>
                                <input type="text" v-model="form.teslimatGerceklesmeDurumu" class="form-input" :readonly="!isEditMode" />
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-1">Teslimat Kabul (%)</label>
                                <input type="number" v-model="form.teslimatKabul" class="form-input" :readonly="!isEditMode" />
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-1">Toplam İşçilik Süresi (Gün)</label>
                                <input type="number" v-model="form.toplamIscalikSuresi" class="form-input" :readonly="!isEditMode" />
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-1">Gerçekleşen İşçilik Süresi (Gün)</label>
                                <input type="number" v-model="form.gerceklesenIscalikSuresi" class="form-input" :readonly="!isEditMode" />
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-1">Kalan İşçilik Süresi (Gün)</label>
                                <input type="number" v-model="form.kalanIscalikSuresi" class="form-input" readonly />
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-1">ELD İşçilik (%)</label>
                                <input type="number" v-model="form.eldIscilik" class="form-input" :readonly="!isEditMode" />
                            </div>
                        </div>

                        <!-- Dördüncü grup -->
                        <div class="space-y-4">
                            <div class="grid grid-cols-2 gap-2">
                                <div>
                                    <label class="block text-sm font-medium mb-1">SAT Sayısı</label>
                                    <input type="number" v-model="form.satSayisi" class="form-input" :readonly="!isEditMode" />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-1">SAS Sayısı</label>
                                    <input type="number" v-model="form.sasSayisi" class="form-input" :readonly="!isEditMode" />
                                </div>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-1">SAT-SAS Oranı (%)</label>
                                <input type="number" v-model="form.satSasOrani" class="form-input" readonly />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div v-if="isEditMode" class="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button type="button" @click="cancelEdit" class="btn bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                        <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        İptal
                    </button>
                    <button type="submit" class="btn bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg" :disabled="loading">
                        <svg v-if="loading" class="w-5 h-5 ltr:mr-2 rtl:ml-2 animate-spin" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <svg v-else class="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        {{ loading ? 'Güncelleniyor...' : 'Güncelle' }}
                    </button>
                </div>
            </form>
        </div>

        <!-- Proje Seçilmediğinde Gösterilecek Mesaj -->
        <div v-else class="panel bg-white dark:bg-gray-800 shadow-xl rounded-2xl border-0">
            <div class="text-center py-20">
                <div class="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full flex items-center justify-center">
                    <svg class="w-16 h-16 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                </div>
                <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-3">Proje Seçimi Yapınız</h3>
                <p class="text-gray-500 dark:text-gray-400 text-lg mb-8">Proje detaylarını görüntülemek için yukarıdan bir proje seçiniz.</p>
                <div class="flex justify-center space-x-4">
                    <button @click="router.push('/projeler')" class="btn bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                        <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8 5v4M16 5v4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Proje Listesi
                    </button>
                    <button @click="router.push('/yeni-proje')" class="btn bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                        <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Yeni Proje
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useMeta } from '@/composables/use-meta';

useMeta({ title: 'Proje Detay' });

const router = useRouter();
const route = useRoute();
const loading = ref(false);
const isEditMode = ref(false);
const originalForm = ref<any>(null);

// Proje seçimi için yeni state'ler
const selectedProjectId = ref('');
const isFromProjectList = ref(false);

// Proje listesi - mock data
const projectList = ref([
    {
        id: 'P5855924',
        projeKodu: 'P5855924',
        projeAdi: 'Kent Güvenlik Yönetim Sistemi Projesi - Ek Talep-2'
    },
    {
        id: 'P4785123',
        projeKodu: 'P4785123',
        projeAdi: 'Akıllı Şehir Altyapı Projesi'
    },
    {
        id: 'P3692847',
        projeKodu: 'P3692847',
        projeAdi: 'E-Devlet Entegrasyon Sistemi'
    },
    {
        id: 'P2541963',
        projeKodu: 'P2541963',
        projeAdi: 'Siber Güvenlik Merkezi Projesi'
    },
    {
        id: 'P1987652',
        projeKodu: 'P1987652',
        projeAdi: 'Mobil Uygulama Geliştirme Platformu'
    }
]);

// Firma multi-select için state'ler
const showFirmaDropdown = ref(false);
const firmaSearchTerm = ref('');
const selectedFirmalar = ref<string[]>(['ACR']); // Varsayılan olarak ACR seçili

// Mevcut firmalar listesi
const firmalar = [
    'ACR',
    'ACS TEKNOLOJİ',
    'ALZ MÜHENDİSLİK',
    'ASELSAN',
    'HAVELSAN',
    'ROKETSAN',
    'TAI',
    'STM',
    'METEKSAN',
    'KAREL'
];

// Filtered firmalar
const filteredFirmalar = computed(() => {
    if (!firmaSearchTerm.value) {
        return firmalar;
    }
    return firmalar.filter(firma => 
        firma.toLowerCase().includes(firmaSearchTerm.value.toLowerCase())
    );
});

// Mock data - 3. sıradaki proje (Kent Güvenlik Yönetim Sistemi)
const mockProjectsData = {
    'P5855924': {
        projeKodu: 'P5855924',
        haneliKod: '9972',
        projeAdi: 'Kent Güvenlik Yönetim Sistemi Projesi - Ek Talep-2',
        programDirektorlugu: 'Güvenlik Sistemleri Program Direktörlüğü',
        projeTuru: 'Sosleyemeli Proje',
        projeGuncelDurumu: 'Proje Gecikmede',
        yurticiYurtdisi: 'Yurtiçi Proje',
        projeAktifPasif: true,
        slaMudahaleSuresi: '7',
        slaOnarimSuresi: '30',
        projeAciklamasi: 'Kent Güvenlik Yönetim Sistemi Projesi - Ek Talep-2',
        egitimDurumu: 'Devam Ediyor',
        eBaslangicTarihi: '2025-07-07',
        eTamamlanmaTarihi: '2025-12-12',
        egitimSuresi: '5',
        kurulumDurumu: 'Tamamlandı',
        kBaslangicTarihi: '2024-10-01',
        kTamamlanmaTarihi: '2024-11-30',
        kurulumSuresi: '44',
        projeYoneticisi: 'ÖNDER TAŞKIN',
        projeUdmYoneticisi1: 'MUSTAFA ÇAKIR',
        projePamYoneticisi1: 'GÜLŞAH KARAKÖSE',
        projeTeknikYoneticisi: 'SERHAT OYAN',
        projeUdmYoneticisi2: '',
        projePamYoneticisi2: '',
        projeKaliteYoneticisi: 'MUSTAFA SAIT YILDIZ',
        projeUdmTeknisyen1: 'YASİN ÜNAL',
        calisilananFirmalar: 'ACR',
        projeTeslimatYoneticisi: 'CİHAN ÖNAL',
        projeUdmTeknisyen2: '',
        projeBaslangicTarihi: '2018-12-17',
        geciciKabulTarihi: '2024-12-01',
        projeSuresi: '60',
        garantiBaslangicTarihi: '2024-12-01',
        garantiSuresi: '12',
        garantiSuresiGecikme: false,
        projeGecikmeleri: true,
        eldMudahalesi: 'Var',
        projeGecikmeleriAy: '19',
        yedekParcaDurumu: 'Teslim Alındı',
        sarfMalzemeDurumu: 'Sipariş Veçildi',
        dkotMalzemeDurumu: 'Teslim Alındı',
        projeEldBütcesi: '₺150.000.000,00',
        projeEldBütcesiDolar: '$29.927.760,19',
        gerceklesenEldButcesi: '₺120.000.000,00',
        teslimatHedefTutari: '₺150.000.000,00',
        teslimatGerceklesmeDurumu: '₺110.000.000,00',
        teslimatKabul: '73',
        toplamIscalikSuresi: '365',
        gerceklesenIscalikSuresi: '128',
        kalanIscalikSuresi: '237',
        eldIscilik: '35',
        satSayisi: '10',
        sasSayisi: '8',
        satSasOrani: '80'
    },
    'P4785123': {
        projeKodu: 'P4785123',
        haneliKod: '4785',
        projeAdi: 'Akıllı Şehir Altyapı Projesi',
        programDirektorlugu: 'Tasarım Mühendisliği Direktörlüğü',
        projeTuru: 'Ar-Ge',
        projeGuncelDurumu: 'Proje Takvimine Uygun İlerliyor',
        yurticiYurtdisi: 'Yurtiçi Proje',
        projeAktifPasif: true,
        slaMudahaleSuresi: '5',
        slaOnarimSuresi: '15',
        projeAciklamasi: 'Akıllı şehir altyapısı için IoT sensörleri ve veri analizi sistemleri geliştirme projesi',
        egitimDurumu: 'Tamamlandı',
        eBaslangicTarihi: '2024-01-15',
        eTamamlanmaTarihi: '2024-03-30',
        egitimSuresi: '10',
        kurulumDurumu: 'Devam Ediyor',
        kBaslangicTarihi: '2024-04-01',
        kTamamlanmaTarihi: '2024-08-30',
        kurulumSuresi: '120',
        projeYoneticisi: 'ALPER DEMİRCİOĞLU',
        projeUdmYoneticisi1: 'OĞUZHAN ÜNAL',
        projePamYoneticisi1: 'SUAT ÖZTÜRK',
        projeTeknikYoneticisi: 'Teknik Yönetici 2',
        projeUdmYoneticisi2: 'MUSTAFA ÇAKIR',
        projePamYoneticisi2: 'İSMAİL ÇILMAN',
        projeKaliteYoneticisi: 'Kalite Yöneticisi 2',
        projeUdmTeknisyen1: 'Teknisyen 2',
        calisilananFirmalar: 'ASELSAN, HAVELSAN',
        projeTeslimatYoneticisi: 'Teslimat Yöneticisi 2',
        projeUdmTeknisyen2: 'Teknisyen 1',
        projeBaslangicTarihi: '2023-06-01',
        geciciKabulTarihi: '2024-09-15',
        projeSuresi: '36',
        garantiBaslangicTarihi: '2024-09-15',
        garantiSuresi: '24',
        garantiSuresiGecikme: false,
        projeGecikmeleri: false,
        eldMudahalesi: 'Var',
        projeGecikmeleriAy: '0',
        yedekParcaDurumu: 'Mevcut',
        sarfMalzemeDurumu: 'Yeterli',
        dkotMalzemeDurumu: 'Devam Ediyor',
        projeEldBütcesi: '₺75.000.000,00',
        projeEldBütcesiDolar: '$15.000.000,00',
        gerceklesenEldButcesi: '₺60.000.000,00',
        teslimatHedefTutari: '₺75.000.000,00',
        teslimatGerceklesmeDurumu: '₺65.000.000,00',
        teslimatKabul: '87',
        toplamIscalikSuresi: '280',
        gerceklesenIscalikSuresi: '200',
        kalanIscalikSuresi: '80',
        eldIscilik: '71',
        satSayisi: '15',
        sasSayisi: '12',
        satSasOrani: '80'
    },
    'P3692847': {
        projeKodu: 'P3692847',
        haneliKod: '3692',
        projeAdi: 'E-Devlet Entegrasyon Sistemi',
        programDirektorlugu: 'Entegre Lojistik Destek Direktörlüğü',
        projeTuru: 'Sistem Entegrasyon',
        projeGuncelDurumu: 'Proje Tamamlandı',
        yurticiYurtdisi: 'Yurtiçi Proje',
        projeAktifPasif: false,
        slaMudahaleSuresi: '3',
        slaOnarimSuresi: '10',
        projeAciklamasi: 'Kamu kurumları arası veri paylaşımı ve entegrasyon sistemi geliştirme projesi',
        egitimDurumu: 'Tamamlandı',
        eBaslangicTarihi: '2023-01-01',
        eTamamlanmaTarihi: '2023-02-28',
        egitimSuresi: '15',
        kurulumDurumu: 'Tamamlandı',
        kBaslangicTarihi: '2023-03-01',
        kTamamlanmaTarihi: '2023-05-31',
        kurulumSuresi: '90',
        projeYoneticisi: 'ALİ CAN ERGÜR',
        projeUdmYoneticisi1: 'DURSUN ÖZKAN ABDİK',
        projePamYoneticisi1: 'İSMAİL ÇILMAN',
        projeTeknikYoneticisi: 'Teknik Yönetici 1',
        projeUdmYoneticisi2: '',
        projePamYoneticisi2: '',
        projeKaliteYoneticisi: 'Kalite Yöneticisi 1',
        projeUdmTeknisyen1: 'Teknisyen 1',
        calisilananFirmalar: 'STM, METEKSAN',
        projeTeslimatYoneticisi: 'Teslimat Yöneticisi 1',
        projeUdmTeknisyen2: '',
        projeBaslangicTarihi: '2022-09-01',
        geciciKabulTarihi: '2023-06-15',
        projeSuresi: '24',
        garantiBaslangicTarihi: '2023-06-15',
        garantiSuresi: '36',
        garantiSuresiGecikme: false,
        projeGecikmeleri: false,
        eldMudahalesi: 'Yok',
        projeGecikmeleriAy: '0',
        yedekParcaDurumu: 'Mevcut',
        sarfMalzemeDurumu: 'Yeterli',
        dkotMalzemeDurumu: 'Tamamlandı',
        projeEldBütcesi: '₺45.000.000,00',
        projeEldBütcesiDolar: '$9.000.000,00',
        gerceklesenEldButcesi: '₺43.500.000,00',
        teslimatHedefTutari: '₺45.000.000,00',
        teslimatGerceklesmeDurumu: '₺45.000.000,00',
        teslimatKabul: '100',
        toplamIscalikSuresi: '200',
        gerceklesenIscalikSuresi: '200',
        kalanIscalikSuresi: '0',
        eldIscilik: '0',
        satSayisi: '8',
        sasSayisi: '8',
        satSasOrani: '100'
    },
    'P5654941': {
        projeKodu: 'P5654941',
        haneliKod: '5654',
        projeAdi: 'Alaçatı RES',
        programDirektorlugu: 'Entegre Lojistik Destek Direktörlüğü',
        projeTuru: 'Ar-Ge',
        projeGuncelDurumu: 'Proje Gecikmede',
        yurticiYurtdisi: 'Yurtiçi Proje',
        projeAktifPasif: true,
        slaMudahaleSuresi: '8',
        slaOnarimSuresi: '25',
        projeAciklamasi: 'Burada kullanıcı ile ilgili detaylı bilgiler açıklanmalıdır. Projenin deneme',
        egitimDurumu: 'Planlanmadı',
        eBaslangicTarihi: '',
        eTamamlanmaTarihi: '',
        egitimSuresi: '0',
        kurulumDurumu: 'Başlanmadı',
        kBaslangicTarihi: '',
        kTamamlanmaTarihi: '',
        kurulumSuresi: '0',
        projeYoneticisi: 'ALPER DEMİRCİOĞLU',
        projeUdmYoneticisi1: 'OĞUZHAN ÜNAL',
        projePamYoneticisi1: 'SUAT ÖZTÜRK',
        projeTeknikYoneticisi: 'Teknik Yönetici 2',
        projeUdmYoneticisi2: '',
        projePamYoneticisi2: '',
        projeKaliteYoneticisi: 'Kalite Yöneticisi 2',
        projeUdmTeknisyen1: 'Teknisyen 2',
        calisilananFirmalar: 'ROKETSAN',
        projeTeslimatYoneticisi: 'Teslimat Yöneticisi 2',
        projeUdmTeknisyen2: '',
        projeBaslangicTarihi: '2024-01-15',
        geciciKabulTarihi: '',
        projeSuresi: '18',
        garantiBaslangicTarihi: '',
        garantiSuresi: '12',
        garantiSuresiGecikme: true,
        projeGecikmeleri: true,
        eldMudahalesi: 'Var',
        projeGecikmeleriAy: '3',
        yedekParcaDurumu: 'Eksik',
        sarfMalzemeDurumu: 'Eksik',
        dkotMalzemeDurumu: 'Devam Ediyor',
        projeEldBütcesi: '₺25.000.000,00',
        projeEldBütcesiDolar: '$5.000.000,00',
        gerceklesenEldButcesi: '₺15.000.000,00',
        teslimatHedefTutari: '₺25.000.000,00',
        teslimatGerceklesmeDurumu: '₺18.000.000,00',
        teslimatKabul: '72',
        toplamIscalikSuresi: '150',
        gerceklesenIscalikSuresi: '90',
        kalanIscalikSuresi: '60',
        eldIscilik: '60',
        satSayisi: '5',
        sasSayisi: '7',
        satSasOrani: '71'
    },
    'P5836361': {
        projeKodu: 'P5836361',
        haneliKod: '5836',
        projeAdi: 'Aselsan Yüksek Hızda Ağırlık Ölçüm Sistemi',
        programDirektorlugu: 'Tasarım Mühendisliği Direktörlüğü',
        projeTuru: 'Ürün Geliştirme',
        projeGuncelDurumu: 'Proje Takvimine Uygun İlerliyor',
        yurticiYurtdisi: 'Yurtiçi Proje',
        projeAktifPasif: true,
        slaMudahaleSuresi: '4',
        slaOnarimSuresi: '20',
        projeAciklamasi: 'deneme',
        egitimDurumu: 'Devam Ediyor',
        eBaslangicTarihi: '2024-03-01',
        eTamamlanmaTarihi: '2024-09-30',
        egitimSuresi: '7',
        kurulumDurumu: 'Devam Ediyor',
        kBaslangicTarihi: '2024-06-01',
        kTamamlanmaTarihi: '2024-12-30',
        kurulumSuresi: '180',
        projeYoneticisi: 'ALİ CAN ERGÜR',
        projeUdmYoneticisi1: 'OĞUZHAN ÜNAL',
        projePamYoneticisi1: 'İSMAİL ÇILMAN',
        projeTeknikYoneticisi: 'SERHAT OYAN',
        projeUdmYoneticisi2: 'MUSTAFA ÇAKIR',
        projePamYoneticisi2: 'SUAT ÖZTÜRK',
        projeKaliteYoneticisi: 'MUSTAFA SAIT YILDIZ',
        projeUdmTeknisyen1: 'YASİN ÜNAL',
        calisilananFirmalar: 'ASELSAN, TAI',
        projeTeslimatYoneticisi: 'CİHAN ÖNAL',
        projeUdmTeknisyen2: 'Teknisyen 1',
        projeBaslangicTarihi: '2024-01-01',
        geciciKabulTarihi: '2025-01-01',
        projeSuresi: '24',
        garantiBaslangicTarihi: '2025-01-01',
        garantiSuresi: '18',
        garantiSuresiGecikme: false,
        projeGecikmeleri: false,
        eldMudahalesi: 'Var',
        projeGecikmeleriAy: '0',
        yedekParcaDurumu: 'Mevcut',
        sarfMalzemeDurumu: 'Yeterli',
        dkotMalzemeDurumu: 'Devam Ediyor',
        projeEldBütcesi: '₺95.000.000,00',
        projeEldBütcesiDolar: '$19.000.000,00',
        gerceklesenEldButcesi: '₺75.000.000,00',
        teslimatHedefTutari: '₺95.000.000,00',
        teslimatGerceklesmeDurumu: '₺80.000.000,00',
        teslimatKabul: '84',
        toplamIscalikSuresi: '300',
        gerceklesenIscalikSuresi: '180',
        kalanIscalikSuresi: '120',
        eldIscilik: '60',
        satSayisi: '12',
        sasSayisi: '10',
        satSasOrani: '120'
    },
    'P5971441': {
        projeKodu: 'P5971441',
        haneliKod: '5971',
        projeAdi: 'Gebze-Darıca Metro Sinyalizasyon Sistemi',
        programDirektorlugu: 'Ulaşım ve Enerji Sistemleri Program Dir.',
        projeTuru: 'Sistem Entegrasyon',
        projeGuncelDurumu: 'Proje Gecikmede',
        yurticiYurtdisi: 'Yurtiçi Proje',
        projeAktifPasif: true,
        slaMudahaleSuresi: '6',
        slaOnarimSuresi: '35',
        projeAciklamasi: 'Gebze-Darıca Metro Sinyalizasyon Sistemi',
        egitimDurumu: 'Devam Ediyor',
        eBaslangicTarihi: '2024-06-01',
        eTamamlanmaTarihi: '2025-02-28',
        egitimSuresi: '12',
        kurulumDurumu: 'Tamamlandı',
        kBaslangicTarihi: '2024-08-01',
        kTamamlanmaTarihi: '2024-12-31',
        kurulumSuresi: '150',
        projeYoneticisi: 'AHMET SANDAL',
        projeUdmYoneticisi1: 'DURSUN ÖZKAN ABDİK',
        projePamYoneticisi1: 'SUAT ÖZTÜRK',
        projeTeknikYoneticisi: 'Teknik Yönetici 1',
        projeUdmYoneticisi2: '',
        projePamYoneticisi2: '',
        projeKaliteYoneticisi: 'Kalite Yöneticisi 1',
        projeUdmTeknisyen1: 'Teknisyen 1',
        calisilananFirmalar: 'STM, KAREL',
        projeTeslimatYoneticisi: 'Teslimat Yöneticisi 1',
        projeUdmTeknisyen2: '',
        projeBaslangicTarihi: '2023-12-01',
        geciciKabulTarihi: '2025-06-01',
        projeSuresi: '30',
        garantiBaslangicTarihi: '2025-06-01',
        garantiSuresi: '24',
        garantiSuresiGecikme: true,
        projeGecikmeleri: true,
        eldMudahalesi: 'Var',
        projeGecikmeleriAy: '4',
        yedekParcaDurumu: 'Eksik',
        sarfMalzemeDurumu: 'Sipariş Veçildi',
        dkotMalzemeDurumu: 'Teslim Alındı',
        projeEldBütcesi: '₺185.000.000,00',
        projeEldBütcesiDolar: '$37.000.000,00',
        gerceklesenEldButcesi: '₺140.000.000,00',
        teslimatHedefTutari: '₺185.000.000,00',
        teslimatGerceklesmeDurumu: '₺130.000.000,00',
        teslimatKabul: '70',
        toplamIscalikSuresi: '450',
        gerceklesenIscalikSuresi: '280',
        kalanIscalikSuresi: '170',
        eldIscilik: '62',
        satSayisi: '18',
        sasSayisi: '15',
        satSasOrani: '120'
    }
};

// Form data - Başlangıçta boş form
const form = ref({
    projeKodu: '',
    haneliKod: '',
    projeAdi: '',
    programDirektorlugu: '',
    projeTuru: '',
    projeGuncelDurumu: '',
    yurticiYurtdisi: '',
    projeAktifPasif: false,
    slaMudahaleSuresi: '',
    slaOnarimSuresi: '',
    projeAciklamasi: '',
    egitimDurumu: '',
    eBaslangicTarihi: '',
    eTamamlanmaTarihi: '',
    egitimSuresi: '',
    kurulumDurumu: '',
    kBaslangicTarihi: '',
    kTamamlanmaTarihi: '',
    kurulumSuresi: '',
    projeYoneticisi: '',
    projeUdmYoneticisi1: '',
    projePamYoneticisi1: '',
    projeTeknikYoneticisi: '',
    projeUdmYoneticisi2: '',
    projePamYoneticisi2: '',
    projeKaliteYoneticisi: '',
    projeUdmTeknisyen1: '',
    calisilananFirmalar: '',
    projeTeslimatYoneticisi: '',
    projeUdmTeknisyen2: '',
    projeBaslangicTarihi: '',
    geciciKabulTarihi: '',
    projeSuresi: '',
    garantiBaslangicTarihi: '',
    garantiSuresi: '',
    garantiSuresiGecikme: false,
    projeGecikmeleri: false,
    eldMudahalesi: '',
    projeGecikmeleriAy: '',
    yedekParcaDurumu: '',
    sarfMalzemeDurumu: '',
    dkotMalzemeDurumu: '',
    projeEldBütcesi: '',
    projeEldBütcesiDolar: '',
    gerceklesenEldButcesi: '',
    teslimatHedefTutari: '',
    teslimatGerceklesmeDurumu: '',
    teslimatKabul: '',
    toplamIscalikSuresi: '',
    gerceklesenIscalikSuresi: '',
    kalanIscalikSuresi: '',
    eldIscilik: '',
    satSayisi: '',
    sasSayisi: '',
    satSasOrani: ''
});

// Proje seçim fonksiyonu
const loadSelectedProject = () => {
    console.log('loadSelectedProject called with selectedProjectId:', selectedProjectId.value);
    console.log('Available keys in mockProjectsData:', Object.keys(mockProjectsData));
    
    if (selectedProjectId.value && mockProjectsData[selectedProjectId.value]) {
        const projectData = mockProjectsData[selectedProjectId.value];
        console.log('Found project data:', projectData);
        form.value = { ...projectData };
        
        // Seçili firmaları güncelle
        if (projectData.calisilananFirmalar) {
            selectedFirmalar.value = projectData.calisilananFirmalar.split(', ').filter(f => f.trim());
        } else {
            selectedFirmalar.value = [];
        }
        
        originalForm.value = { ...form.value };
    } else {
        console.log('No project data found for ID:', selectedProjectId.value);
    }
};

// Check if opened from edit button
onMounted(() => {
    // URL parametresinden proje ID'sini al
    const projectIdFromQuery = route.query.id as string;
    
    if (projectIdFromQuery) {
        // Projeler listesinden geldi
        isFromProjectList.value = true;
        selectedProjectId.value = projectIdFromQuery;
        loadSelectedProject();
        
        // URL parametresinden edit mode'u kontrol et
        if (route.query.edit === 'true') {
            isEditMode.value = true;
        }
    } else {
        // Direkt sidebar'dan geldi
        isFromProjectList.value = false;
        selectedProjectId.value = '';
    }
    
    // Original form data'yı sakla
    originalForm.value = { ...form.value };
    
    // Dropdown click outside event'i ekle
    document.addEventListener('click', handleClickOutside);
});

// Route değişikliklerini izle - sidebar'dan gelince reset yap
watch(() => route.path, (newPath) => {
    if (newPath === '/proje-detay' && !route.query.id) {
        // Sidebar'dan geldi, state'i resetle
        isFromProjectList.value = false;
        selectedProjectId.value = '';
        isEditMode.value = false;
        // Form'u resetle
        form.value = {
            projeKodu: '',
            haneliKod: '',
            projeAdi: '',
            programDirektorlugu: '',
            projeTuru: '',
            projeGuncelDurumu: '',
            yurticiYurtdisi: '',
            projeAktifPasif: false,
            slaMudahaleSuresi: '',
            slaOnarimSuresi: '',
            projeAciklamasi: '',
            egitimDurumu: '',
            eBaslangicTarihi: '',
            eTamamlanmaTarihi: '',
            egitimSuresi: '',
            kurulumDurumu: '',
            kBaslangicTarihi: '',
            kTamamlanmaTarihi: '',
            kurulumSuresi: '',
            projeYoneticisi: '',
            projeUdmYoneticisi1: '',
            projePamYoneticisi1: '',
            projeTeknikYoneticisi: '',
            projeUdmYoneticisi2: '',
            projePamYoneticisi2: '',
            projeKaliteYoneticisi: '',
            projeUdmTeknisyen1: '',
            calisilananFirmalar: '',
            projeTeslimatYoneticisi: '',
            projeUdmTeknisyen2: '',
            projeBaslangicTarihi: '',
            geciciKabulTarihi: '',
            projeSuresi: '',
            garantiBaslangicTarihi: '',
            garantiSuresi: '',
            garantiSuresiGecikme: false,
            projeGecikmeleri: false,
            eldMudahalesi: '',
            projeGecikmeleriAy: '',
            yedekParcaDurumu: '',
            sarfMalzemeDurumu: '',
            dkotMalzemeDurumu: '',
            projeEldBütcesi: '',
            projeEldBütcesiDolar: '',
            gerceklesenEldButcesi: '',
            teslimatHedefTutari: '',
            teslimatGerceklesmeDurumu: '',
            teslimatKabul: '',
            toplamIscalikSuresi: '',
            gerceklesenIscalikSuresi: '',
            kalanIscalikSuresi: '',
            eldIscilik: '',
            satSayisi: '',
            sasSayisi: '',
            satSasOrani: ''
        };
        selectedFirmalar.value = [];
    }
});

// Computed values
watch([() => form.value.toplamIscalikSuresi, () => form.value.gerceklesenIscalikSuresi], () => {
    const toplam = Number(form.value.toplamIscalikSuresi) || 0;
    const gerceklesen = Number(form.value.gerceklesenIscalikSuresi) || 0;
    form.value.kalanIscalikSuresi = Math.max(0, toplam - gerceklesen).toString();
});

watch([() => form.value.satSayisi, () => form.value.sasSayisi], () => {
    const sat = Number(form.value.satSayisi) || 0;
    const sas = Number(form.value.sasSayisi) || 0;
    if (sas > 0) {
        form.value.satSasOrani = ((sat / sas) * 100).toFixed(0);
    } else {
        form.value.satSasOrani = '0';
    }
});

// Methods
const goBack = () => {
    router.push('/projeler');
};

const goToGorevGirisi = () => {
    router.push({
        path: '/proje-gorev',
        query: {
            projeId: form.value.projeKodu,
            projeAdi: form.value.projeAdi
        }
    });
};

const toggleEditMode = () => {
    isEditMode.value = true;
    originalForm.value = { ...form.value };
};

const cancelEdit = () => {
    form.value = { ...originalForm.value };
    isEditMode.value = false;
};

const saveProject = async () => {
    loading.value = true;
    
    try {
        // Burada API çağrısı yapılacak
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simülasyon
        
        console.log('Proje güncellendi:', form.value);
        
        // Başarılı mesajı göster ve view mode'a geç
        alert('Proje başarıyla güncellendi!');
        isEditMode.value = false;
        originalForm.value = { ...form.value };
        
    } catch (error) {
        console.error('Proje güncellenemedi:', error);
        alert('Proje güncellenirken bir hata oluştu!');
    } finally {
        loading.value = false;
    }
};

// Firma multi-select metodları
const toggleFirmaDropdown = () => {
    showFirmaDropdown.value = !showFirmaDropdown.value;
    if (showFirmaDropdown.value) {
        firmaSearchTerm.value = '';
    }
};

const toggleFirma = (firma: string) => {
    const index = selectedFirmalar.value.indexOf(firma);
    if (index > -1) {
        selectedFirmalar.value.splice(index, 1);
    } else {
        selectedFirmalar.value.push(firma);
    }
    // Form'u güncelle
    form.value.calisilananFirmalar = selectedFirmalar.value.join(', ');
};

const removeFirma = (firma: string) => {
    const index = selectedFirmalar.value.indexOf(firma);
    if (index > -1) {
        selectedFirmalar.value.splice(index, 1);
        form.value.calisilananFirmalar = selectedFirmalar.value.join(', ');
    }
};

const clearAllFirmalar = () => {
    selectedFirmalar.value = [];
    form.value.calisilananFirmalar = '';
    showFirmaDropdown.value = false;
};

// Dropdown dışına tıklanınca kapat
const handleClickOutside = (event: Event) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.firma-dropdown')) {
        showFirmaDropdown.value = false;
    }
};

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.form-input:read-only,
.form-select:disabled,
.form-textarea:read-only {
    background-color: #f9fafb;
    border-color: #e5e7eb;
    color: #6b7280;
}

.dark .form-input:read-only,
.dark .form-select:disabled,
.dark .form-textarea:read-only {
    background-color: #374151;
    border-color: #4b5563;
    color: #9ca3af;
}

.text-orange-500 {
    color: #f97316;
}

.border-orange-200 {
    border-color: #fed7aa;
}

/* Multi-select dropdown styles */
.firma-dropdown .bg-primary {
    background-color: #3b82f6;
}

.firma-dropdown .bg-primary:hover {
    background-color: #2563eb;
}

.firma-dropdown .rotate-180 {
    transform: rotate(180deg);
}

.firma-dropdown .z-10 {
    z-index: 10;
}

.firma-dropdown .shadow-lg {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.firma-dropdown .max-h-48 {
    max-height: 12rem;
}

.firma-dropdown .overflow-y-auto {
    overflow-y: auto;
}

.firma-dropdown .border-t {
    border-top-width: 1px;
}

/* Smooth transitions */
.firma-dropdown svg {
    transition: transform 0.2s ease;
}

.firma-dropdown .cursor-pointer:hover {
    background-color: #f3f4f6;
}

.dark .firma-dropdown .cursor-pointer:hover {
    background-color: #374151;
}

/* Tag styling */
.firma-dropdown .inline-flex {
    transition: background-color 0.2s ease;
}

.firma-dropdown .inline-flex:hover {
    background-color: #2563eb;
}
</style>