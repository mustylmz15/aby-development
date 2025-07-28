<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 relative overflow-hidden">
        <!-- Background Animated Elements -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
            <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <!-- Header -->
        <div class="panel shadow-2xl border-0 bg-white/90 backdrop-blur-xl mb-6 relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-indigo-50/50 to-purple-50/50"></div>
            <div class="relative z-10 mb-5 flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <div class="w-14 h-14 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all duration-300 hover:rotate-6">
                        <svg class="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                    <div>
                        <h5 class="font-bold text-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
                            Yeni Proje Ekle
                        </h5>
                        <p class="text-gray-600 dark:text-gray-400 text-sm mt-1 font-medium">✨ Yeni bir proje oluşturun ve detaylarını kaydedin</p>
                    </div>
                </div>
                <div class="flex gap-3">
                    <button type="button" @click="goBack" class="btn bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 border-0 shadow-lg transition-all duration-300 hover:shadow-xl transform hover:scale-105 hover:-translate-y-1">
                        <svg class="w-5 h-5 ltr:mr-2 rtl:ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 6L5 12L11 18M5 12H19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Geri Dön
                    </button>
                </div>
            </div>
        </div>

        <!-- Form -->
        <div class="space-y-8">
            <form @submit.prevent="saveProject">
                <!-- Proje Genel Bilgisi Card -->
                <div class="panel shadow-2xl border-0 bg-white/90 backdrop-blur-xl mb-8 hover:shadow-3xl transition-all duration-500 hover:scale-[1.01] group">
                    <div class="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-cyan-50/50 to-teal-50/50 rounded-xl"></div>
                    <div class="relative z-10 mb-8">
                        <div class="flex items-center gap-4 mb-8">
                            <div class="w-10 h-10 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-300 group-hover:rotate-6">
                                <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <h6 class="text-2xl font-bold bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
                                    Proje Genel Bilgisi
                                </h6>
                                <p class="text-gray-600 text-sm font-medium mt-1">Projenin temel bilgilerini giriniz</p>
                            </div>
                        </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <!-- Sol Kolon -->
                        <div class="space-y-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl border border-blue-100 shadow-md hover:shadow-lg transition-all duration-300">
                            <div class="mb-4">
                                <h6 class="font-semibold text-blue-700 dark:text-blue-300 mb-3 flex items-center gap-2">
                                    <div class="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                                        <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    Proje Tanımları
                                </h6>
                            </div>
                            
                            <div class="relative">
                                <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                    <span class="flex items-center gap-2">
                                        🏷️ Proje Kodu/4 Haneli Kod 
                                        <span class="text-red-500 text-lg">*</span>
                                    </span>
                                </label>
                                <div class="flex gap-2">
                                    <input type="text" v-model="form.projeKodu" class="form-input bg-white/80 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl flex-1 transition-all duration-300 shadow-sm hover:shadow-md" placeholder="🔤 Proje kodu" required />
                                    <input type="text" v-model="form.haneliKod" class="form-input bg-white/80 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl w-24 transition-all duration-300 shadow-sm hover:shadow-md" placeholder="1234" maxlength="4" />
                                </div>
                            </div>
                            
                            <div class="relative">
                                <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                    <span class="flex items-center gap-2">
                                        📝 Proje Adı 
                                        <span class="text-red-500 text-lg">*</span>
                                    </span>
                                </label>
                                <input type="text" v-model="form.projeAdi" class="form-input bg-white/80 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md" placeholder="✨ Proje adını giriniz" required />
                            </div>
                            
                            <div class="relative">
                                <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                    <span class="flex items-center gap-2">
                                        🏢 Program Direktörlüğü 
                                        <span class="text-red-500 text-lg">*</span>
                                    </span>
                                </label>
                                <select v-model="form.programDirektorlugu" class="form-select bg-white/80 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md" required>
                                    <option value="">🔽 Seçiniz...</option>
                                    <option value="Entegre Lojistik Destek Direktörlüğü">Entegre Lojistik Destek Direktörlüğü</option>
                                    <option value="Tasarım Mühendisliği Direktörlüğü">Tasarım Mühendisliği Direktörlüğü</option>
                                    <option value="Güvenlik Sistemleri Program Direktörlüğü">Güvenlik Sistemleri Program Direktörlüğü</option>
                                    <option value="Ulaşım ve Enerji Sistemleri Program Dir.">Ulaşım ve Enerji Sistemleri Program Dir.</option>
                                </select>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Proje Türü <span class="text-red-500">*</span></label>
                                <select v-model="form.projeTuru" class="form-select bg-white/70 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all duration-200" required>
                                    <option value="">Seçiniz...</option>
                                    <option value="Ar-Ge">Ar-Ge</option>
                                    <option value="Ürün Geliştirme">Ürün Geliştirme</option>
                                    <option value="Sistem Entegrasyon">Sistem Entegrasyon</option>
                                </select>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Proje Güncel Durumu <span class="text-red-500">*</span></label>
                                <select v-model="form.projeGuncelDurumu" class="form-select bg-white/70 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all duration-200" required>
                                    <option value="">Seçiniz...</option>
                                    <option value="Proje Gecikmede">Proje Gecikmede</option>
                                    <option value="Proje Takvimine Uygun İlerliyor">Proje Takvimine Uygun İlerliyor</option>
                                    <option value="Proje Tamamlandı">Proje Tamamlandı</option>
                                </select>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Yurtiçi/Yurtdışı <span class="text-red-500">*</span></label>
                                <select v-model="form.yurticiYurtdisi" class="form-select bg-white/70 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all duration-200" required>
                                    <option value="">Seçiniz...</option>
                                    <option value="Yurtiçi">Yurtiçi</option>
                                    <option value="Yurtdışı">Yurtdışı</option>
                                </select>
                            </div>
                            
                            <div class="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <input type="checkbox" v-model="form.projeAktifPasif" class="form-checkbox text-blue-600 focus:ring-blue-500 rounded" id="aktifPasif" />
                                <label for="aktifPasif" class="ltr:ml-3 rtl:mr-3 text-sm font-medium text-blue-700">Proje Tamamlandı?</label>
                            </div>
                            
                            <div class="grid grid-cols-2 gap-3">
                                <div>
                                    <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">SLA Müdahale Süresi</label>
                                    <input type="number" v-model="form.slaMudahaleSuresi" class="form-input bg-white/70 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all duration-200" placeholder="Gün" />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">SLA Onarım Süresi</label>
                                    <input type="number" v-model="form.slaOnarimSuresi" class="form-input bg-white/70 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all duration-200" placeholder="Gün" />
                                </div>
                            </div>
                        </div>

                        <!-- Orta Kolon - Proje Açıklaması -->
                        <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl border border-green-100 shadow-md">
                            <div class="mb-4">
                                <h6 class="font-semibold text-green-700 dark:text-green-300 mb-3 flex items-center gap-2">
                                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Proje Açıklaması
                                </h6>
                            </div>
                            <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Proje Açıklaması <span class="text-red-500">*</span></label>
                            <textarea v-model="form.projeAciklamasi" rows="15" class="form-textarea bg-white/70 border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg resize-none transition-all duration-200" placeholder="Proje açıklamasını giriniz... Burada Proje ile ilgili , kullanıcısı, müşterisi, sözleşme tarafları proje ile ilgili detaylı açıklama yazılır. bunlar sürekli güncellenen veriler olmamalıdır." required></textarea>
                        </div>

                        <!-- Sağ Kolon -->
                        <div class="space-y-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl border border-purple-100 shadow-md">
                            <div class="mb-4">
                                <h6 class="font-semibold text-purple-700 dark:text-purple-300 mb-3 flex items-center gap-2">
                                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                    Eğitim & Kurulum
                                </h6>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Eğitim Durumu <span class="text-red-500">*</span></label>
                                <select v-model="form.egitimDurumu" class="form-select bg-white/70 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg transition-all duration-200" required>
                                    <option value="">Seçiniz...</option>
                                    <option value="Tamamlandı">Tamamlandı</option>
                                    <option value="Devam Ediyor">Devam Ediyor</option>
                                    <option value="Planlanmadı">Planlanmadı</option>
                                </select>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">E. Başlangıç Tarihi</label>
                                <input type="date" v-model="form.eBaslangicTarihi" class="form-input bg-white/70 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg transition-all duration-200" />
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">E. Tamamlanma Tarihi</label>
                                <input type="date" v-model="form.eTamamlanmaTarihi" class="form-input bg-white/70 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg transition-all duration-200" />
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Eğitim Süresi (Gün)</label>
                                <input type="number" v-model="form.egitimSuresi" class="form-input bg-white/70 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg transition-all duration-200" placeholder="Gün sayısı" />
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Kurulum Durumu <span class="text-red-500">*</span></label>
                                <select v-model="form.kurulumDurumu" class="form-select bg-white/70 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg transition-all duration-200" required>
                                    <option value="">Seçiniz...</option>
                                    <option value="Tamamlandı">Tamamlandı</option>
                                    <option value="Devam Ediyor">Devam Ediyor</option>
                                    <option value="Başlanmadı">Başlanmadı</option>
                                </select>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">K. Başlangıç Tarihi</label>
                                <input type="date" v-model="form.kBaslangicTarihi" class="form-input bg-white/70 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg transition-all duration-200" />
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">K. Tamamlanma Tarihi</label>
                                <input type="date" v-model="form.kTamamlanmaTarihi" class="form-input bg-white/70 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg transition-all duration-200" />
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Kurulum Süresi (Gün)</label>
                                <input type="number" v-model="form.kurulumSuresi" class="form-input bg-white/70 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg transition-all duration-200" placeholder="Gün sayısı" />
                            </div>
                        </div>
                    </div>
                    </div>
                </div>

                <!-- Proje Ekipleri Card -->
                <div class="panel shadow-2xl border-0 bg-white/90 backdrop-blur-xl mb-8 hover:shadow-3xl transition-all duration-500 hover:scale-[1.01] group">
                    <div class="absolute inset-0 bg-gradient-to-r from-indigo-50/50 via-purple-50/50 to-blue-50/50 rounded-xl"></div>
                    <div class="relative z-10 mb-8">
                        <div class="flex items-center gap-4 mb-8">
                            <div class="w-10 h-10 bg-gradient-to-r from-indigo-400 via-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-300 group-hover:rotate-6">
                                <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                </svg>
                            </div>
                            <div>
                                <h6 class="text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                                    👥 Proje Ekipleri
                                </h6>
                                <p class="text-gray-600 text-sm font-medium mt-1">Proje yöneticilerini ve ekip üyelerini seçiniz</p>
                            </div>
                        </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div class="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-lg border border-indigo-100 shadow-md">
                            <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Proje Yöneticisi <span class="text-red-500">*</span></label>
                            <select v-model="form.projeYoneticisi" class="form-select bg-white/70 border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg transition-all duration-200" required>
                                <option value="">Seçiniz...</option>
                                <option value="ALPER DEMİRCİOĞLU">ALPER DEMİRCİOĞLU</option>
                                <option value="ALİ CAN ERGÜR">ALİ CAN ERGÜR</option>
                                <option value="ÖNDER TAŞKIN">ÖNDER TAŞKIN</option>
                                <option value="AHMET SANDAL">AHMET SANDAL</option>
                            </select>
                        </div>
                        
                        <div class="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-lg border border-indigo-100 shadow-md">
                            <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Proje UDM Yöneticisi 1 <span class="text-red-500">*</span></label>
                            <select v-model="form.projeUdmYoneticisi1" class="form-select bg-white/70 border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg transition-all duration-200" required>
                                <option value="">Seçiniz...</option>
                                <option value="OĞUZHAN ÜNAL">OĞUZHAN ÜNAL</option>
                                <option value="MUSTAFA ÇAKIR">MUSTAFA ÇAKIR</option>
                                <option value="DURSUN ÖZKAN ABDİK">DURSUN ÖZKAN ABDİK</option>
                            </select>
                        </div>
                        
                        <div class="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-lg border border-indigo-100 shadow-md">
                            <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Proje PAM Yöneticisi 1 <span class="text-red-500">*</span></label>
                            <select v-model="form.projePamYoneticisi1" class="form-select bg-white/70 border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg transition-all duration-200" required>
                                <option value="">Seçiniz...</option>
                                <option value="SUAT ÖZTÜRK">SUAT ÖZTÜRK</option>
                                <option value="İSMAİL ÇILMAN">İSMAİL ÇILMAN</option>
                                <option value="GÜLŞAH KARAKÖSE">GÜLŞAH KARAKÖSE</option>
                            </select>
                        </div>
                        
                        <div class="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-lg border border-indigo-100 shadow-md">
                            <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Proje Teknik Yöneticisi <span class="text-red-500">*</span></label>
                            <select v-model="form.projeTeknikYoneticisi" class="form-select bg-white/70 border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg transition-all duration-200" required>
                                <option value="">Seçiniz...</option>
                                <option value="Teknik Yönetici 1">Teknik Yönetici 1</option>
                                <option value="Teknik Yönetici 2">Teknik Yönetici 2</option>
                            </select>
                        </div>
                        
                        <div class="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-lg border border-indigo-100 shadow-md">
                            <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Proje UDM Yöneticisi 2</label>
                            <select v-model="form.projeUdmYoneticisi2" class="form-select bg-white/70 border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg transition-all duration-200">
                                <option value="">Seçiniz...</option>
                                <option value="OĞUZHAN ÜNAL">OĞUZHAN ÜNAL</option>
                                <option value="MUSTAFA ÇAKIR">MUSTAFA ÇAKIR</option>
                                <option value="DURSUN ÖZKAN ABDİK">DURSUN ÖZKAN ABDİK</option>
                            </select>
                        </div>
                        
                        <div class="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-lg border border-indigo-100 shadow-md">
                            <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Proje PAM Yöneticisi 2</label>
                            <select v-model="form.projePamYoneticisi2" class="form-select bg-white/70 border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg transition-all duration-200">
                                <option value="">Seçiniz...</option>
                                <option value="SUAT ÖZTÜRK">SUAT ÖZTÜRK</option>
                                <option value="İSMAİL ÇILMAN">İSMAİL ÇILMAN</option>
                                <option value="GÜLŞAH KARAKÖSE">GÜLŞAH KARAKÖSE</option>
                            </select>
                        </div>
                        
                        <div class="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-lg border border-indigo-100 shadow-md">
                            <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Proje Kalite Yöneticisi <span class="text-red-500">*</span></label>
                            <select v-model="form.projeKaliteYoneticisi" class="form-select bg-white/70 border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg transition-all duration-200" required>
                                <option value="">Seçiniz...</option>
                                <option value="Kalite Yöneticisi 1">Kalite Yöneticisi 1</option>
                                <option value="Kalite Yöneticisi 2">Kalite Yöneticisi 2</option>
                            </select>
                        </div>
                        
                        <div class="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-lg border border-indigo-100 shadow-md">
                            <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Proje UDM Teknisyen 1 <span class="text-red-500">*</span></label>
                            <select v-model="form.projeUdmTeknisyen1" class="form-select bg-white/70 border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg transition-all duration-200" required>
                                <option value="">Seçiniz...</option>
                                <option value="Teknisyen 1">Teknisyen 1</option>
                                <option value="Teknisyen 2">Teknisyen 2</option>
                            </select>
                        </div>
                        
                        <div class="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-lg border border-indigo-100 shadow-md">
                            <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Çalışılan Firmalar</label>
                            <div class="relative firma-dropdown">
                                <div 
                                    @click="toggleFirmaDropdown" 
                                    class="form-input bg-white/70 border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-between min-h-[38px]"
                                >
                                    <div class="flex flex-wrap gap-1">
                                        <span 
                                            v-for="firma in selectedFirmalar" 
                                            :key="firma"
                                            class="inline-flex items-center px-2 py-1 text-xs bg-indigo-600 text-white rounded-md"
                                        >
                                            {{ firma }}
                                            <button 
                                                type="button"
                                                @click.stop="removeFirma(firma)"
                                                class="ml-1 hover:bg-indigo-700 rounded"
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
                                    class="absolute z-10 w-full mt-1 bg-white border border-indigo-200 rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-600"
                                >
                                    <div class="p-2">
                                        <input 
                                            v-model="firmaSearchTerm"
                                            type="text" 
                                            placeholder="Firma ara..." 
                                            class="w-full px-3 py-2 text-sm border border-indigo-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-white/70"
                                        />
                                    </div>
                                    <div class="max-h-48 overflow-y-auto">
                                        <div 
                                            v-for="firma in filteredFirmalar" 
                                            :key="firma"
                                            @click="toggleFirma(firma)"
                                            class="px-3 py-2 cursor-pointer hover:bg-indigo-50 dark:hover:bg-gray-700 flex items-center justify-between"
                                        >
                                            <span class="text-sm">{{ firma }}</span>
                                            <svg 
                                                v-if="selectedFirmalar.includes(firma)"
                                                class="w-4 h-4 text-indigo-600" 
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
                                    <div class="p-2 border-t border-indigo-200 dark:border-gray-600">
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
                        </div>
                        
                        <div class="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-lg border border-indigo-100 shadow-md">
                            <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Proje Teslimat Yöneticisi <span class="text-red-500">*</span></label>
                            <select v-model="form.projeTeslimatYoneticisi" class="form-select bg-white/70 border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg transition-all duration-200" required>
                                <option value="">Seçiniz...</option>
                                <option value="Teslimat Yöneticisi 1">Teslimat Yöneticisi 1</option>
                                <option value="Teslimat Yöneticisi 2">Teslimat Yöneticisi 2</option>
                            </select>
                        </div>
                        
                        <div class="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-lg border border-indigo-100 shadow-md">
                            <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Proje UDM Teknisyen 2</label>
                            <select v-model="form.projeUdmTeknisyen2" class="form-select bg-white/70 border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg transition-all duration-200">
                                <option value="">Seçiniz...</option>
                                <option value="Teknisyen 1">Teknisyen 1</option>
                                <option value="Teknisyen 2">Teknisyen 2</option>
                            </select>
                        </div>
                    </div>
                    </div>
                </div>

                <!-- Proje Tarihleri & Durumları Card -->
                <div class="panel shadow-2xl border-0 bg-white/90 backdrop-blur-xl mb-8 hover:shadow-3xl transition-all duration-500 hover:scale-[1.01] group">
                    <div class="absolute inset-0 bg-gradient-to-r from-emerald-50/50 via-teal-50/50 to-cyan-50/50 rounded-xl"></div>
                    <div class="relative z-10 mb-8">
                        <div class="flex items-center gap-4 mb-8">
                            <div class="w-10 h-10 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-300 group-hover:rotate-6">
                                <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h6 class="text-2xl font-bold bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                                    Proje Tarihleri & Durumları
                                </h6>
                                <p class="text-gray-600 text-sm font-medium mt-1">Proje takvimi ve durum bilgilerini giriniz</p>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <!-- Sol grup -->
                        <div class="space-y-4 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-lg border border-emerald-100 shadow-md">
                            <div class="mb-3">
                                <h6 class="font-semibold text-emerald-700 dark:text-emerald-300 text-sm flex items-center gap-2">
                                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Temel Tarihler
                                </h6>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Proje Başlangıç Tarihi <span class="text-red-500">*</span></label>
                                <input type="date" v-model="form.projeBaslangicTarihi" class="form-input bg-white/70 border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 rounded-lg transition-all duration-200" required />
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Geçici Kabul Tarihi</label>
                                <input type="date" v-model="form.geciciKabulTarihi" class="form-input bg-white/70 border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 rounded-lg transition-all duration-200" />
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Proje Süresi (Ay) <span class="text-red-500">*</span></label>
                                <input type="number" v-model="form.projeSuresi" class="form-input bg-white/70 border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 rounded-lg transition-all duration-200" placeholder="Ay" required />
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Garanti Başlangıç Tarihi <span class="text-red-500">*</span></label>
                                <input type="date" v-model="form.garantiBaslangicTarihi" class="form-input bg-white/70 border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 rounded-lg transition-all duration-200" required />
                            </div>
                            
                            <div class="flex items-center p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                                <input type="checkbox" v-model="form.garantiSuresiGecikme" class="form-checkbox text-emerald-600 focus:ring-emerald-500 rounded" id="garantiGecikme" />
                                <label for="garantiGecikme" class="ltr:ml-3 rtl:mr-3 text-sm font-medium text-emerald-700">Garanti Süresi Gecikme Durum</label>
                            </div>
                            
                            <div class="flex items-center p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                                <input type="checkbox" v-model="form.projeGecikmeleri" class="form-checkbox text-emerald-600 focus:ring-emerald-500 rounded" id="projeGecikme" />
                                <label for="projeGecikme" class="ltr:ml-3 rtl:mr-3 text-sm font-medium text-emerald-700">Proje Gecikme Durumu</label>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">ELD Müdahalesi <span class="text-red-500">*</span></label>
                                <select v-model="form.eldMudahalesi" class="form-select bg-white/70 border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 rounded-lg transition-all duration-200" required>
                                    <option value="">Seçiniz...</option>
                                    <option value="Gerekli">Gerekli</option>
                                    <option value="Gerekli Değil">Gerekli Değil</option>
                                </select>
                            </div>
                        </div>

                        <!-- İkinci grup -->
                        <div class="space-y-4 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-lg border border-cyan-100 shadow-md">
                            <div class="mb-3">
                                <h6 class="font-semibold text-cyan-700 dark:text-cyan-300 text-sm flex items-center gap-2">
                                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                    Durum Bilgileri
                                </h6>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Proje Geçikme Süresi (Ay)</label>
                                <input type="number" v-model="form.projeGecikmeleriAy" class="form-input bg-white/70 border-cyan-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-lg transition-all duration-200" placeholder="Ay" />
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Yedek Parça Durumu</label>
                                <select v-model="form.yedekParcaDurumu" class="form-select bg-white/70 border-cyan-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-lg transition-all duration-200">
                                    <option value="">Seçiniz...</option>
                                    <option value="Mevcut">Mevcut</option>
                                    <option value="Eksik">Eksik</option>
                                </select>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Şarf Malzeme Durumu</label>
                                <select v-model="form.sarfMalzemeDurumu" class="form-select bg-white/70 border-cyan-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-lg transition-all duration-200">
                                    <option value="">Seçiniz...</option>
                                    <option value="Yeterli">Yeterli</option>
                                    <option value="Eksik">Eksik</option>
                                </select>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">DKÖT Malzeme Durumu</label>
                                <select v-model="form.dkotMalzemeDurumu" class="form-select bg-white/70 border-cyan-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-lg transition-all duration-200">
                                    <option value="">Seçiniz...</option>
                                    <option value="Tamamlandı">Tamamlandı</option>
                                    <option value="Devam Ediyor">Devam Ediyor</option>
                                </select>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-1">Proje ELD Bütçesi (TL)</label>
                                <input type="number" v-model="form.projeEldBütcesi" class="form-input bg-white/70 border-cyan-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-lg transition-all duration-200" placeholder="0.00" step="0.01" />
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-1">Proje ELD Bütçesi ($)</label>
                                <input type="number" v-model="form.projeEldBütcesiDolar" class="form-input bg-white/70 border-cyan-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-lg transition-all duration-200" placeholder="0.00" step="0.01" />
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-1">Gerçekleşen ELD Bütçesi</label>
                                <input type="number" v-model="form.gerceklesenEldButcesi" class="form-input bg-white/70 border-cyan-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-lg transition-all duration-200" placeholder="0.00" step="0.01" />
                            </div>
                        </div>

                        <!-- Üçüncü grup -->
                        <div class="space-y-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-lg border border-amber-100 shadow-md">
                            <div class="mb-3">
                                <h6 class="font-semibold text-amber-700 dark:text-amber-300 text-sm flex items-center gap-2">
                                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                    </svg>
                                    Teslimat & İşçilik
                                </h6>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Teslimat Hedef Tutarı <span class="text-red-500">*</span></label>
                                <input type="number" v-model="form.teslimatHedefTutari" class="form-input bg-white/70 border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 rounded-lg transition-all duration-200" placeholder="0.00" step="0.01" required />
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Teslimat Gerçekleşme Durumu <span class="text-red-500">*</span></label>
                                <input type="number" v-model="form.teslimatGerceklesmeDurumu" class="form-input bg-white/70 border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 rounded-lg transition-all duration-200" placeholder="0.00" step="0.01" required />
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Teslimat Kabul (%)</label>
                                <input type="number" v-model="form.teslimatKabul" class="form-input bg-white/70 border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 rounded-lg transition-all duration-200" placeholder="%" max="100" />
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Toplam İşçilik Süresi (Gün) <span class="text-red-500">*</span></label>
                                <input type="number" v-model="form.toplamIscalikSuresi" class="form-input bg-white/70 border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 rounded-lg transition-all duration-200" placeholder="Gün" required />
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Gerçekleşen İşçilik Süresi (Gün) <span class="text-red-500">*</span></label>
                                <input type="number" v-model="form.gerceklesenIscalikSuresi" class="form-input bg-white/70 border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 rounded-lg transition-all duration-200" placeholder="Gün" required />
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-1">Kalan İşçilik Süresi (Gün)</label>
                                <input type="number" v-model="form.kalanIscalikSuresi" class="form-input bg-white/70 border-cyan-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-lg transition-all duration-200" placeholder="Gün" readonly />
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">ELD İşçilik (%)</label>
                                <input type="number" v-model="form.eldIscilik" class="form-input bg-white/70 border-cyan-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-lg transition-all duration-200" placeholder="%" max="100" />
                            </div>
                        </div>

                        <!-- Dördüncü grup -->
                        <div class="space-y-4 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-lg border border-rose-100 shadow-md">
                            <div class="mb-3">
                                <h6 class="font-semibold text-rose-700 dark:text-rose-300 text-sm flex items-center gap-2">
                                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                    SAT-SAS Oranları
                                </h6>
                            </div>
                            
                            <div class="grid grid-cols-2 gap-2">
                                <div>
                                    <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">SAT Sayısı</label>
                                    <input type="number" v-model="form.satSayisi" class="form-input bg-white/70 border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 rounded-lg transition-all duration-200" placeholder="Sayı" />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">SAS Sayısı</label>
                                    <input type="number" v-model="form.sasSayisi" class="form-input bg-white/70 border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 rounded-lg transition-all duration-200" placeholder="Sayı" />
                                </div>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">SAT-SAS Oranı (%)</label>
                                <input type="number" v-model="form.satSasOrani" class="form-input bg-white/70 border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 rounded-lg transition-all duration-200" placeholder="%" max="100" readonly />
                            </div>
                        </div>
                    </div>
                    </div>
                </div>

                <!-- Action Buttons Card -->
                <div class="panel shadow-2xl border-0 bg-white/90 backdrop-blur-xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.01] group">
                    <div class="absolute inset-0 bg-gradient-to-r from-gray-50/50 via-slate-50/50 to-zinc-50/50 rounded-xl"></div>
                    <div class="relative z-10 flex items-center justify-end gap-6 py-8">
                        <button type="button" @click="goBack" class="btn bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800 border-0 shadow-xl transition-all duration-300 hover:shadow-2xl px-10 py-4 rounded-2xl font-semibold transform hover:scale-105 hover:-translate-y-1">
                            <svg class="w-5 h-5 ltr:mr-2 rtl:ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            İptal
                        </button>
                        <button type="submit" class="btn bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 hover:from-green-600 hover:via-emerald-600 hover:to-teal-700 text-white border-0 shadow-xl transition-all duration-300 hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 px-10 py-4 rounded-2xl font-semibold relative overflow-hidden" :disabled="loading">
                            <div class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                            <div class="relative z-10 flex items-center">
                                <svg v-if="loading" class="w-5 h-5 ltr:mr-2 rtl:ml-2 animate-spin" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <svg v-else class="w-5 h-5 ltr:mr-2 rtl:ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                </svg>
                                {{ loading ? 'Kaydediliyor...' : 'Kaydet' }}
                            </div>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useMeta } from '@/composables/use-meta';

useMeta({ title: 'Yeni Proje Ekle' });

const router = useRouter();
const loading = ref(false);

// Firma multi-select için state'ler
const showFirmaDropdown = ref(false);
const firmaSearchTerm = ref('');
const selectedFirmalar = ref<string[]>([]);

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

// Form data
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
    egitimDurumu: 'Planlanmadı',
    eBaslangicTarihi: '',
    eTamamlanmaTarihi: '',
    egitimSuresi: '',
    kurulumDurumu: '',
    kBaslangicTarihi: '',
    kTamamlanmaTarihi: '',
    kurulumSuresi: '',
    
    // Proje Ekipleri
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
    
    // Proje Tarihleri/Durumları
    projeBaslangicTarihi: '',
    geciciKabulTarihi: '',
    projeSuresi: '',
    garantiBaslangicTarihi: '',
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
        form.value.satSasOrani = ((sat / sas) * 100).toFixed(2);
    } else {
        form.value.satSasOrani = '0';
    }
});

// Methods
const goBack = () => {
    router.push('/projeler');
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

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});

const saveProject = async () => {
    loading.value = true;
    
    try {
        // Burada API çağrısı yapılacak
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simülasyon
        
        console.log('Proje kaydedildi:', form.value);
        
        // Başarılı mesajı göster ve projeler sayfasına dön
        alert('Proje başarıyla kaydedildi!');
        goBack();
        
    } catch (error) {
        console.error('Proje kaydedilemedi:', error);
        alert('Proje kaydedilirken bir hata oluştu!');
    } finally {
        loading.value = false;
    }
};
</script>

<style scoped>
.form-input:focus,
.form-select:focus,
.form-textarea:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    transform: translateY(-2px);
    transition: all 0.3s ease;
}

.form-input,
.form-select,
.form-textarea {
    transition: all 0.3s ease;
}

.form-input:hover,
.form-select:hover,
.form-textarea:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.text-red-500 {
    color: #ef4444;
}

.border-orange-200 {
    border-color: #fed7aa;
}

/* Enhanced animations */
@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
}

@keyframes glow {
    0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
    50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.5); }
}

.animate-float {
    animation: float 3s ease-in-out infinite;
}

.animate-glow {
    animation: glow 2s ease-in-out infinite;
}

/* Enhanced card styles */
.panel {
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.panel:hover {
    transform: translateY(-5px) scale(1.01);
}

.group:hover .group-hover\:scale-110 {
    transform: scale(1.1);
}

.group:hover .group-hover\:rotate-6 {
    transform: rotate(6deg) scale(1.1);
}

/* Enhanced shadow effects */
.shadow-2xl {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.shadow-3xl {
    box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.3);
}

.hover\:shadow-3xl:hover {
    box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.3);
}

/* Background animated elements */
.animate-pulse {
    animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
    0%, 100% {
        opacity: 0.4;
        transform: scale(1);
    }
    50% {
        opacity: 0.8;
        transform: scale(1.05);
    }
}

/* Enhanced button styles */
.btn {
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
}

.btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
}

.btn:hover::before {
    left: 100%;
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
    transform: translateX(5px);
    transition: all 0.2s ease;
}

.dark .firma-dropdown .cursor-pointer:hover {
    background-color: #374151;
}

/* Tag styling */
.firma-dropdown .inline-flex {
    transition: all 0.2s ease;
}

.firma-dropdown .inline-flex:hover {
    background-color: #2563eb;
    transform: scale(1.05);
}

/* Gradient backgrounds */
.bg-gradient-to-br {
    background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}

/* Enhanced focus states */
.focus\:ring-2:focus {
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}

/* Enhanced card hover effects */
.shadow-md:hover {
    box-shadow: 0 15px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    transform: translateY(-3px);
}

/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
    width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
    background: linear-gradient(to bottom, #f1f5f9, #e2e8f0);
    border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #94a3b8, #64748b);
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, #64748b, #475569);
}

/* Loading spinner enhancement */
.animate-spin {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

/* Enhanced backdrop blur */
.backdrop-blur-xl {
    backdrop-filter: blur(24px);
}

/* Enhanced text gradient */
.bg-clip-text {
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

/* Responsive improvements */
@media (max-width: 768px) {
    .panel {
        margin-bottom: 1rem;
    }
    
    .btn {
        padding: 0.75rem 1rem;
        font-size: 0.875rem;
    }
    
    .shadow-2xl {
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
    }
}

/* Dark mode enhancements */
.dark .panel {
    background-color: rgba(31, 41, 55, 0.9);
}

.dark .form-input,
.dark .form-select,
.dark .form-textarea {
    background-color: rgba(55, 65, 81, 0.8);
    border-color: rgba(75, 85, 99, 0.5);
}

.dark .form-input:focus,
.dark .form-select:focus,
.dark .form-textarea:focus {
    border-color: #3b82f6;
    background-color: rgba(55, 65, 81, 0.9);
}
</style>
