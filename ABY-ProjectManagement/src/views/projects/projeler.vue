<template>
    <div>
        <!-- Header -->
        <div class="panel bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white border-0 shadow-lg">
            <div class="mb-5 flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div>
                        <h5 class="font-bold text-2xl">Proje Takip Sistemi</h5>
                        <p class="text-white/80 text-sm mt-1">Tüm projelerinizi tek yerden yönetin</p>
                    </div>
                </div>
                <div class="flex gap-3">
                    <button type="button" @click="exportData" class="btn bg-white/20 hover:bg-white/30 text-white border-white/30 hover:border-white/50 transition-all duration-300 transform hover:scale-105">
                        <svg class="w-5 h-5 ltr:mr-2 rtl:ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Dışa Aktar
                    </button>
                    <button type="button" @click="createNewProject" class="btn bg-white/20 hover:bg-white/30 text-white border-white/30 hover:border-white/50 transition-all duration-300 transform hover:scale-105">
                        <svg class="w-5 h-5 ltr:mr-2 rtl:ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Yeni Proje
                    </button>
                </div>
            </div>
        </div>

        <!-- Filters -->
        <div class="panel mb-5 bg-white dark:bg-gray-800 shadow-xl rounded-2xl border-0">
            <div class="mb-4">
                <div class="flex items-center space-x-3 mb-6">
                    <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div>
                        <h6 class="font-bold text-xl text-gray-800 dark:text-white">Proje Arama & Filtreleme</h6>
                        <p class="text-gray-500 dark:text-gray-400 text-sm">Projelerinizi hızlıca bulun</p>
                    </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    <div class="space-y-2">
                        <label class="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span>Proje</span>
                        </label>
                        <select v-model="filters.proje" class="form-select bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 rounded-lg transition-all duration-300">
                            <option value="">Tümü</option>
                            <option v-for="proje in uniqueProjects" :key="proje" :value="proje">{{ proje }}</option>
                        </select>
                    </div>
                    <div class="space-y-2">
                        <label class="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span>PYP Numarası</span>
                        </label>
                        <select v-model="filters.pypNumarasi" class="form-select bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 rounded-lg transition-all duration-300">
                            <option value="">Tümü</option>
                            <option v-for="pyp in uniquePypNumbers" :key="pyp" :value="pyp">{{ pyp }}</option>
                        </select>
                    </div>
                    <div class="space-y-2">
                        <label class="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span>İlgili PAM Birimi</span>
                        </label>
                        <select v-model="filters.ilgiliPamBirimi" class="form-select bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 rounded-lg transition-all duration-300">
                            <option value="">Tümü</option>
                            <option v-for="birim in uniquePamBirimi" :key="birim" :value="birim">{{ birim }}</option>
                        </select>
                    </div>
                    <div class="space-y-2">
                        <label class="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.07a6.5 6.5 0 0113 0v.07M4 19.235l2.25.315M19 19.235l-2.25.315m-12.75 0L16.5 21l2.25-.315m-12.75 0l12.75 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span>PAM Proje Sorumlusu</span>
                        </label>
                        <select v-model="filters.pamProjeSorumlusu" class="form-select bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 rounded-lg transition-all duration-300">
                            <option value="">Tümü</option>
                            <option v-for="personel in uniquePamPersoneli" :key="personel" :value="personel">{{ personel }}</option>
                        </select>
                    </div>
                    <div class="space-y-2">
                        <label class="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span>İlgili ÜDM Birimi</span>
                        </label>
                        <select v-model="filters.ilgiliUdmBirimi" class="form-select bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 rounded-lg transition-all duration-300">
                            <option value="">Tümü</option>
                            <option v-for="birim in uniqueUdmBirimi" :key="birim" :value="birim">{{ birim }}</option>
                        </select>
                    </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                    <div class="space-y-2">
                        <label class="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span>Sorumlu ÜDM Personeli</span>
                        </label>
                        <select v-model="filters.sorumluUdmPersoneli" class="form-select bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 rounded-lg transition-all duration-300">
                            <option value="">Tümü</option>
                            <option v-for="personel in uniqueUdmPersoneli" :key="personel" :value="personel">{{ personel }}</option>
                        </select>
                    </div>
                    <div class="space-y-2">
                        <label class="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span>ÜDM Proje Sorumlusu</span>
                        </label>
                        <select v-model="filters.udmProjeSorumlusu" class="form-select bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 rounded-lg transition-all duration-300">
                            <option value="">Tümü</option>
                            <option v-for="personel in uniqueUdmPersoneli" :key="personel" :value="personel">{{ personel }}</option>
                        </select>
                    </div>
                    <div class="flex items-end">
                        <div class="w-full">
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">İşlemler</label>
                            <div class="flex space-x-2">
                                <button type="button" @click="searchProjects" class="btn bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white flex-1 rounded-lg transition-all duration-300 transform hover:scale-105">
                                    <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    Ara
                                </button>
                                <button type="button" @click="clearFilters" class="btn bg-gray-500 hover:bg-gray-600 text-white px-4 rounded-lg transition-all duration-300">
                                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 7h16M10 11v6M14 11v6M5 7l1 12a2 2 0 002 2h8a2 2 0 002-2l1-12M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Projects Table -->
        <div class="panel bg-white dark:bg-gray-800 shadow-xl rounded-2xl border-0 overflow-hidden">
            <div class="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border-b border-gray-200 dark:border-gray-600">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                            <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M8 5v4M16 5v4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div>
                            <h3 class="font-bold text-lg text-gray-800 dark:text-white">Proje Listesi</h3>
                            <p class="text-sm text-gray-500 dark:text-gray-400">{{ filteredProjects.length }} proje bulundu</p>
                        </div>
                    </div>
                    <!-- Dışa Aktar butonu kaldırıldı -->
                </div>
            </div>
            <div class="table-responsive">
                <table class="table-hover min-w-full">
                    <thead class="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/3">Proje</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-24">PYP</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-24">Proje Bitiş Tarihi</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-32">Garanti Dönümine Giriş Tarihi</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Proje Teknisyeni</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">İlgili ÜDM Birimi</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Sorumlu ÜDM Personeli</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">İlgili PAM Birimi</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Sorumlu PAM Personeli</th>
                            <th class="px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        <tr v-for="(proje, index) in filteredProjects" :key="index" class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                            <td class="px-6 py-4">
                                <div class="font-semibold text-gray-900 dark:text-white">{{ proje.projeAdi }}</div>
                            </td>
                            <td class="px-6 py-4  w-24">
                                <div class="font-mono text-sm font-bold text-blue-600 dark:text-blue-400">{{ proje.pypNumarasi }}</div>
                            </td>
                            <td class="px-6 py-4  w-12">
                                <div class="text-sm text-gray-900 dark:text-white">{{ proje.projeBitisTarihi || '-' }}</div>
                            </td>
                            <td class="px-6 py-4  w-32">
                                <div class="text-sm text-gray-900 dark:text-white">{{ proje.garantiDonumGirisTarihi || '-' }}</div>
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex items-center">
                                    
                                    <div class="font-medium text-gray-900 dark:text-white">{{ proje.projeTeknisyeni || '-' }}</div>
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <div class="text-sm text-gray-900 dark:text-white">{{ proje.ilgiliUdmBirimi || '-' }}</div>
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex items-center">
                                    
                                    <div class="font-medium text-gray-900 dark:text-white">{{ proje.sorumluUdmPersoneli || '-' }}</div>
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <div class="text-sm text-gray-900 dark:text-white">{{ proje.ilgiliPamBirimi || '-' }}</div>
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex items-center">
                                    
                                    <div class="font-medium text-gray-900 dark:text-white">{{ proje.sorumluPamPersoneli || '-' }}</div>
                                </div>
                            </td>
                            <td class="px-6 py-4 text-center">
                                <div class="flex items-center justify-center space-x-2">
                                    <button type="button" @click="viewProject(proje)" class="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105">
                                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                    <button type="button" @click="editProject(proje)" class="btn btn-sm bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105">
                                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.2869 3.15178L14.3601 4.07866L5.83882 12.5999L5.83881 12.5999C5.26166 13.1771 4.97308 13.4656 4.7249 13.7838C4.43213 14.1592 4.18114 14.5653 3.97634 14.995C3.80273 15.3593 3.67368 15.7465 3.41556 16.5208L2.32181 19.8021L2.05445 20.6042C1.92743 20.9852 2.0266 21.4053 2.31063 21.6894C2.59466 21.9734 3.01478 22.0726 3.39584 21.9456L4.19792 21.6782L7.47918 20.5844L7.47919 20.5844C8.25353 20.3263 8.6407 20.1972 9.00498 20.0236C9.43469 19.8188 9.84082 19.5678 10.2162 19.2751C10.5344 19.0269 10.8229 18.7383 11.4001 18.1612L11.4001 18.1612L19.9213 9.63993L20.8482 8.71306C22.3839 7.17735 22.3839 4.68748 20.8482 3.15178C19.3125 1.61607 16.8226 1.61607 15.2869 3.15178Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M14.36 4.07812C14.36 4.07812 14.4759 6.04774 16.2138 7.78564C17.9517 9.52354 19.9213 9.6394 19.9213 9.6394M4.19789 21.6777L2.32178 19.8015" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <!-- Empty State -->
            <div v-if="filteredProjects.length === 0" class="text-center py-16 bg-gray-50 dark:bg-gray-700 rounded-2xl mx-6 mb-6">
                <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded-full flex items-center justify-center">
                    <svg class="w-12 h-12 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Henüz proje bulunmuyor</h3>
                <p class="text-gray-500 dark:text-gray-400 mb-6">Yeni bir proje ekleyin veya filtreleri temizleyin</p>
                <div class="flex justify-center space-x-4">
                    <button @click="createNewProject" class="btn bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                        <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Yeni Proje Ekle
                    </button>
                    <button @click="clearFilters" class="btn bg-gray-500 hover:bg-gray-600 text-white">
                        <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 7h16M10 11v6M14 11v6M5 7l1 12a2 2 0 002 2h8a2 2 0 002-2l1-12M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Filtreleri Temizle
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useMeta } from '@/composables/use-meta';
import * as XLSX from 'xlsx';

useMeta({ title: 'Projeler' });

const router = useRouter();

// Proje veri tipi
interface ProjeType {
    id: number;
    projeAdi: string;
    pypNumarasi: string;
    projeBitisTarihi: string;
    garantiDonumGirisTarihi: string;
    projeTeknisyeni: string;
    ilgiliUdmBirimi: string;
    sorumluUdmPersoneli: string;
    ilgiliPamBirimi: string;
    sorumluPamPersoneli: string;
}

// Filter state
const filters = ref({
    proje: '',
    pypNumarasi: '',
    ilgiliPamBirimi: '',
    pamProjeSorumlusu: '',
    ilgiliUdmBirimi: '',
    sorumluUdmPersoneli: '',
    udmProjeSorumlusu: '',
    projeTeknisyeni: ''
});

// Sample project data (will be replaced with Excel data)
const projects = ref<ProjeType[]>([
    // Excel verisi buraya yüklenecek
]);

// Excel dosyasından veri yükleme fonksiyonu
const loadExcelData = async () => {
    try {
        // Cache busting için timestamp ekle
        const timestamp = new Date().getTime();
        const response = await fetch(`/excel/PROJE_LİSTESİ_UGES_ÜDM_2025_v3.xlsx?t=${timestamp}`, {
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
        const projectData: ProjeType[] = [];
        
        for (let i = 1; i < jsonData.length; i++) {
            const row = jsonData[i] as any[];
            if (row[0] || row[1]) { // PYP veya Proje adı varsa
                const proje: ProjeType = {
                    id: i,
                    projeAdi: row[1] || '', // B: Proje
                    pypNumarasi: row[0] || '', // A: PYP
                    projeBitisTarihi: row[3] || '', // D: Proje Bitiş Tarihi
                    garantiDonumGirisTarihi: row[2] || '', // C: Garanti Dönemine Giriş Tarihi
                    projeTeknisyeni: row[5] || '', // F: Proje Teknisyeni
                    ilgiliUdmBirimi: row[6] || '', // G: İlgili ÜDM Birimi
                    sorumluUdmPersoneli: row[7] || '', // H: Sorumlu ÜDM Personeli
                    ilgiliPamBirimi: row[8] || '', // I: İlgili PAM Birimi
                    sorumluPamPersoneli: row[9] || '' // J: Sorumlu PAM Personeli
                };
                projectData.push(proje);
            }
        }
        
        projects.value = projectData;
        console.log('Excel verileri yüklendi:', projects.value.length, 'proje');
    } catch (error) {
        console.error('Excel dosyası yüklenirken hata:', error);
    }
};

// Bileşen yüklendiğinde Excel verilerini yükle
onMounted(() => {
    loadExcelData();
});

// Excel verilerinden benzersiz değerleri çıkarma
const uniqueProjects = computed(() => {
    const projectNames = [...new Set(projects.value.map(p => p.projeAdi).filter(p => p))];
    return projectNames.sort();
});

const uniquePypNumbers = computed(() => {
    const pypNumbers = [...new Set(projects.value.map(p => p.pypNumarasi).filter(p => p))];
    return pypNumbers.sort();
});

const uniquePamBirimi = computed(() => {
    const pamBirimi = [...new Set(projects.value.map(p => p.ilgiliPamBirimi).filter(p => p))];
    return pamBirimi.sort();
});

const uniquePamPersoneli = computed(() => {
    const pamPersoneli = [...new Set(projects.value.map(p => p.sorumluPamPersoneli).filter(p => p))];
    return pamPersoneli.sort();
});

const uniqueUdmBirimi = computed(() => {
    const udmBirimi = [...new Set(projects.value.map(p => p.ilgiliUdmBirimi).filter(p => p))];
    return udmBirimi.sort();
});

const uniqueUdmPersoneli = computed(() => {
    const udmPersoneli = [...new Set(projects.value.map(p => p.sorumluUdmPersoneli).filter(p => p))];
    return udmPersoneli.sort();
});

const uniqueProjeTeknisyeni = computed(() => {
    const teknisyenler = [...new Set(projects.value.map(p => p.projeTeknisyeni).filter(p => p))];
    return teknisyenler.sort();
});

// Computed filtered projects
const filteredProjects = computed(() => {
    return projects.value.filter(proje => {
        return (
            (!filters.value.proje || proje.projeAdi === filters.value.proje) &&
            (!filters.value.pypNumarasi || proje.pypNumarasi === filters.value.pypNumarasi) &&
            (!filters.value.ilgiliPamBirimi || proje.ilgiliPamBirimi === filters.value.ilgiliPamBirimi) &&
            (!filters.value.pamProjeSorumlusu || proje.sorumluPamPersoneli === filters.value.pamProjeSorumlusu) &&
            (!filters.value.ilgiliUdmBirimi || proje.ilgiliUdmBirimi === filters.value.ilgiliUdmBirimi) &&
            (!filters.value.sorumluUdmPersoneli || proje.sorumluUdmPersoneli === filters.value.sorumluUdmPersoneli) &&
            (!filters.value.udmProjeSorumlusu || proje.sorumluUdmPersoneli === filters.value.udmProjeSorumlusu) &&
            (!filters.value.projeTeknisyeni || proje.projeTeknisyeni === filters.value.projeTeknisyeni)
        );
    });
});

// Methods
const searchProjects = () => {
    // Arama işlemi - burada API çağrısı yapılabilir
    console.log('Projeler aranıyor...', filters.value);
};

const clearFilters = () => {
    filters.value = {
        proje: '',
        pypNumarasi: '',
        ilgiliPamBirimi: '',
        pamProjeSorumlusu: '',
        ilgiliUdmBirimi: '',
        sorumluUdmPersoneli: '',
        udmProjeSorumlusu: '',
        projeTeknisyeni: ''
    };
};

const createNewProject = () => {
    router.push('/yeni-proje');
};

const exportData = () => {
    // Excel formatında dışa aktarma fonksiyonu
    const worksheet = XLSX.utils.json_to_sheet(filteredProjects.value);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Proje Listesi');
    
    // Dosya adını tarih ile oluştur
    const date = new Date().toISOString().split('T')[0];
    const filename = `Proje_Listesi_${date}.xlsx`;
    
    // Dosyayı indir
    XLSX.writeFile(workbook, filename);
};

const viewProject = (proje: any) => {
    router.push(`/proje-detay?id=${proje.pypNumarasi}`);
};

const editProject = (proje: any) => {
    router.push(`/proje-detay?id=${proje.pypNumarasi}&edit=true`);
};
</script>