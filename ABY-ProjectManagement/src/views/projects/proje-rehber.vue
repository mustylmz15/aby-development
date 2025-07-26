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
                <h5 class="font-semibold text-xl dark:text-white-light">Proje Rehberi</h5>
                <div class="flex gap-2">
                    <button type="button" @click="goBack" class="btn btn-outline-secondary">
                        <svg class="w-5 h-5 ltr:mr-2 rtl:ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 6L5 12L11 18M5 12H19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Geri Dön
                    </button>
                    <button type="button" @click="addNewContact" class="btn btn-primary">
                        <svg class="w-5 h-5 ltr:mr-2 rtl:ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Yeni Kişi Ekle
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
                        <label class="block text-sm font-medium mb-1">Ad Soyad</label>
                        <input type="text" v-model="filters.adSoyad" class="form-input" placeholder="Ad soyad ara..." />
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Departman</label>
                        <select v-model="filters.departman" class="form-select">
                            <option value="">Tümü</option>
                            <option value="Yazılım">Yazılım</option>
                            <option value="Donanım">Donanım</option>
                            <option value="Proje Yönetimi">Proje Yönetimi</option>
                            <option value="Test">Test</option>
                            <option value="Tasarım">Tasarım</option>
                            <option value="Satış">Satış</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Pozisyon</label>
                        <select v-model="filters.pozisyon" class="form-select">
                            <option value="">Tümü</option>
                            <option value="Yönetici">Yönetici</option>
                            <option value="Uzman">Uzman</option>
                            <option value="Kıdemli">Kıdemli</option>
                            <option value="Junior">Junior</option>
                        </select>
                    </div>
                    <div class="flex items-end">
                        <button type="button" @click="resetFilters" class="btn btn-outline-secondary w-full">
                            Filtreleri Temizle
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            <div class="panel p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                <div class="flex items-center justify-between">
                    <div>
                        <h6 class="text-sm font-medium text-blue-600 dark:text-blue-400">Toplam Kişi</h6>
                        <p class="text-2xl font-bold text-blue-700 dark:text-blue-300">{{ totalContacts }}</p>
                    </div>
                    <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="panel p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                <div class="flex items-center justify-between">
                    <div>
                        <h6 class="text-sm font-medium text-green-600 dark:text-green-400">Departman Sayısı</h6>
                        <p class="text-2xl font-bold text-green-700 dark:text-green-300">{{ departmentCount }}</p>
                    </div>
                    <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="panel p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
                <div class="flex items-center justify-between">
                    <div>
                        <h6 class="text-sm font-medium text-purple-600 dark:text-purple-400">Yönetici Sayısı</h6>
                        <p class="text-2xl font-bold text-purple-700 dark:text-purple-300">{{ managerCount }}</p>
                    </div>
                    <div class="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="panel p-4 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
                <div class="flex items-center justify-between">
                    <div>
                        <h6 class="text-sm font-medium text-orange-600 dark:text-orange-400">Proje Sayısı</h6>
                        <p class="text-2xl font-bold text-orange-700 dark:text-orange-300">{{ activeProjectCount }}</p>
                    </div>
                    <div class="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>

        <!-- Directory Cards -->
        <div class="panel">
            <div class="mb-5">
                <h6 class="font-semibold text-primary mb-3">Proje Ekibi Rehberi ({{ filteredContacts.length }} kişi)</h6>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <div 
                    v-for="contact in filteredContacts" 
                    :key="contact.id"
                    class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300"
                >
                    <!-- Profile Header -->
                    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                        <div class="flex items-center space-x-3">
                            <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                                {{ getInitials(contact.adSoyad) }}
                            </div>
                            <div class="flex-1">
                                <h3 class="font-semibold text-gray-900 dark:text-white">{{ contact.adSoyad }}</h3>
                                <p class="text-sm text-gray-500 dark:text-gray-400">{{ contact.pozisyon }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Contact Info -->
                    <div class="p-4 space-y-3">
                        <div class="flex items-center space-x-2">
                            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                            </svg>
                            <span class="text-sm text-gray-600 dark:text-gray-300">{{ contact.departman }}</span>
                        </div>
                        
                        <div class="flex items-center space-x-2">
                            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                            </svg>
                            <a :href="`tel:${contact.telefon}`" class="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                                {{ contact.telefon }}
                            </a>
                        </div>
                        
                        <div class="flex items-center space-x-2">
                            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                            </svg>
                            <a :href="`mailto:${contact.email}`" class="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                                {{ contact.email }}
                            </a>
                        </div>
                        
                        <div class="flex items-center space-x-2">
                            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
                            </svg>
                            <span class="text-sm text-gray-600 dark:text-gray-300">{{ contact.aktifProjeler?.join(', ') || 'Proje atanmamış' }}</span>
                        </div>
                        
                        <div class="flex items-center space-x-2">
                            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                            <span class="text-sm text-gray-600 dark:text-gray-300">{{ contact.lokasyon }}</span>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="p-4 border-t border-gray-200 dark:border-gray-700">
                        <div class="flex space-x-2">
                            <button 
                                @click="editContact(contact)"
                                class="flex-1 btn btn-sm btn-outline-primary"
                            >
                                <svg class="w-4 h-4 ltr:mr-1 rtl:ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                </svg>
                                Düzenle
                            </button>
                            <button 
                                @click="deleteContact(contact)"
                                class="btn btn-sm btn-outline-danger"
                            >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-if="filteredContacts.length === 0" class="text-center py-12">
                <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Kişi bulunamadı</h3>
                <p class="text-gray-500 dark:text-gray-400">Filtreleri değiştirin veya yeni kişi ekleyin.</p>
            </div>
        </div>

        <!-- Add/Edit Modal -->
        <div v-if="showAddModal || showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="closeModal">
            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4" @click.stop>
                <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                    {{ showAddModal ? 'Yeni Kişi Ekle' : 'Kişi Düzenle' }}
                </h3>
                
                <form @submit.prevent="showAddModal ? addContact() : updateContact()">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Ad Soyad</label>
                            <input 
                                type="text" 
                                v-model="formData.adSoyad" 
                                class="form-input w-full" 
                                placeholder="Ad soyad giriniz"
                                required 
                            />
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Departman</label>
                            <select v-model="formData.departman" class="form-select w-full" required>
                                <option value="">Departman seçiniz</option>
                                <option value="Yazılım">Yazılım</option>
                                <option value="Donanım">Donanım</option>
                                <option value="Proje Yönetimi">Proje Yönetimi</option>
                                <option value="Test">Test</option>
                                <option value="Tasarım">Tasarım</option>
                                <option value="Satış">Satış</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Pozisyon</label>
                            <select v-model="formData.pozisyon" class="form-select w-full" required>
                                <option value="">Pozisyon seçiniz</option>
                                <option value="Yönetici">Yönetici</option>
                                <option value="Uzman">Uzman</option>
                                <option value="Kıdemli">Kıdemli</option>
                                <option value="Junior">Junior</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Telefon</label>
                            <input 
                                type="tel" 
                                v-model="formData.telefon" 
                                class="form-input w-full" 
                                placeholder="+90 5XX XXX XX XX"
                                required 
                            />
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Email</label>
                            <input 
                                type="email" 
                                v-model="formData.email" 
                                class="form-input w-full" 
                                placeholder="email@company.com"
                                required 
                            />
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Lokasyon</label>
                            <input 
                                type="text" 
                                v-model="formData.lokasyon" 
                                class="form-input w-full" 
                                placeholder="Şehir"
                                required 
                            />
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Aktif Projeler</label>
                            <input 
                                type="text" 
                                v-model="activeProjectsString" 
                                class="form-input w-full" 
                                placeholder="PSE5924, PSE8941 (virgülle ayırın)"
                            />
                        </div>
                    </div>
                    
                    <div class="flex justify-end space-x-2 mt-6">
                        <button 
                            type="button" 
                            @click="closeModal()" 
                            class="btn btn-outline-secondary"
                        >
                            İptal
                        </button>
                        <button 
                            type="submit" 
                            class="btn btn-primary"
                        >
                            {{ showAddModal ? 'Ekle' : 'Güncelle' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Delete Confirmation Modal -->
        <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="closeModal">
            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4" @click.stop>
                <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Kişi Sil</h3>
                <p class="text-gray-600 dark:text-gray-400 mb-6">
                    <strong>{{ selectedContact?.adSoyad || 'Seçilen kişi' }}</strong> adlı kişiyi silmek istediğinizden emin misiniz? 
                    Bu işlem geri alınamaz.
                </p>
                
                <div class="flex justify-end space-x-2">
                    <button 
                        type="button" 
                        @click="closeModal()" 
                        class="btn btn-outline-secondary"
                    >
                        İptal
                    </button>
                    <button 
                        type="button" 
                        @click="confirmDelete()" 
                        class="btn btn-danger"
                    >
                        Sil
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useMeta } from '@/composables/use-meta';

useMeta({ title: 'Proje Rehberi' });

const router = useRouter();

// Toast notification state
const showToast = ref(false);
const toastMessage = ref('');
const toastType = ref('info');

// Modal states
const showAddModal = ref(false);
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const selectedContact = ref<any>(null);

// Form data
const formData = ref({
    adSoyad: '',
    departman: '',
    pozisyon: '',
    telefon: '',
    email: '',
    lokasyon: '',
    aktifProjeler: [] as string[]
});

// Filters
const filters = ref({
    adSoyad: '',
    departman: '',
    pozisyon: ''
});

// Mock data - Proje ekibi rehberi
const contacts = ref([
    {
        id: 1,
        adSoyad: 'Ahmet Yılmaz',
        departman: 'Yazılım',
        pozisyon: 'Yönetici',
        telefon: '+90 532 123 45 67',
        email: 'ahmet.yilmaz@company.com',
        lokasyon: 'İstanbul',
        aktifProjeler: ['PSE5924', 'PSE8941']
    },
    {
        id: 2,
        adSoyad: 'Fatma Demir',
        departman: 'Proje Yönetimi',
        pozisyon: 'Uzman',
        telefon: '+90 533 234 56 78',
        email: 'fatma.demir@company.com',
        lokasyon: 'Ankara',
        aktifProjeler: ['PSE8361', 'PSE7141']
    },
    {
        id: 3,
        adSoyad: 'Mehmet Kaya',
        departman: 'Donanım',
        pozisyon: 'Kıdemli',
        telefon: '+90 534 345 67 89',
        email: 'mehmet.kaya@company.com',
        lokasyon: 'İzmir',
        aktifProjeler: ['PSE5924']
    },
    {
        id: 4,
        adSoyad: 'Ayşe Çelik',
        departman: 'Test',
        pozisyon: 'Uzman',
        telefon: '+90 535 456 78 90',
        email: 'ayse.celik@company.com',
        lokasyon: 'Bursa',
        aktifProjeler: ['PSE8941', 'PSE7141']
    },
    {
        id: 5,
        adSoyad: 'Mustafa Öz',
        departman: 'Yazılım',
        pozisyon: 'Junior',
        telefon: '+90 536 567 89 01',
        email: 'mustafa.oz@company.com',
        lokasyon: 'İstanbul',
        aktifProjeler: ['PSE8361']
    },
    {
        id: 6,
        adSoyad: 'Zeynep Arslan',
        departman: 'Tasarım',
        pozisyon: 'Uzman',
        telefon: '+90 537 678 90 12',
        email: 'zeynep.arslan@company.com',
        lokasyon: 'İstanbul',
        aktifProjeler: ['PSE5924', 'PSE8941']
    },
    {
        id: 7,
        adSoyad: 'Okan Turan',
        departman: 'Satış',
        pozisyon: 'Yönetici',
        telefon: '+90 538 789 01 23',
        email: 'okan.turan@company.com',
        lokasyon: 'Ankara',
        aktifProjeler: ['PSE7141']
    },
    {
        id: 8,
        adSoyad: 'Elif Şahin',
        departman: 'Proje Yönetimi',
        pozisyon: 'Yönetici',
        telefon: '+90 539 890 12 34',
        email: 'elif.sahin@company.com',
        lokasyon: 'İzmir',
        aktifProjeler: ['PSE8361', 'PSE5924']
    }
]);

// Computed properties
const filteredContacts = computed(() => {
    return contacts.value.filter(contact => {
        return (
            (filters.value.adSoyad === '' || contact.adSoyad.toLowerCase().includes(filters.value.adSoyad.toLowerCase())) &&
            (filters.value.departman === '' || contact.departman === filters.value.departman) &&
            (filters.value.pozisyon === '' || contact.pozisyon === filters.value.pozisyon)
        );
    });
});

const totalContacts = computed(() => contacts.value.length);

const departmentCount = computed(() => {
    const departments = new Set(contacts.value.map(c => c.departman));
    return departments.size;
});

const managerCount = computed(() => {
    return contacts.value.filter(c => c.pozisyon === 'Yönetici').length;
});

const activeProjectCount = computed(() => {
    const projects = new Set();
    contacts.value.forEach(c => {
        c.aktifProjeler?.forEach(p => projects.add(p));
    });
    return projects.size;
});

// Computed property for active projects string
const activeProjectsString = computed({
    get: () => formData.value.aktifProjeler?.join(', ') || '',
    set: (value: string) => {
        formData.value.aktifProjeler = value.split(',').map(p => p.trim()).filter(p => p);
    }
});

// Methods
const showNotification = (message: string, type: 'success' | 'warning' | 'error' | 'info' = 'info') => {
    toastMessage.value = message;
    toastType.value = type;
    showToast.value = true;
    
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

const addNewContact = () => {
    resetForm();
    showAddModal.value = true;
};

const editContact = (contact: any) => {
    selectedContact.value = contact;
    formData.value = {
        adSoyad: contact.adSoyad,
        departman: contact.departman,
        pozisyon: contact.pozisyon,
        telefon: contact.telefon,
        email: contact.email,
        lokasyon: contact.lokasyon,
        aktifProjeler: [...(contact.aktifProjeler || [])]
    };
    showEditModal.value = true;
};

const deleteContact = (contact: any) => {
    selectedContact.value = contact;
    showDeleteModal.value = true;
};

const addContact = () => {
    const newContact = {
        id: Date.now(),
        ...formData.value
    };
    contacts.value.push(newContact);
    closeModal();
    showNotification(`${newContact.adSoyad} başarıyla eklendi! ✅`, 'success');
};

const updateContact = () => {
    if (selectedContact.value && selectedContact.value.id) {
        const index = contacts.value.findIndex(c => c.id === selectedContact.value.id);
        if (index !== -1) {
            contacts.value[index] = {
                ...selectedContact.value,
                ...formData.value
            };
            closeModal();
            showNotification(`${formData.value.adSoyad} başarıyla güncellendi! ✅`, 'success');
        }
    }
};

const confirmDelete = () => {
    if (selectedContact.value && selectedContact.value.id) {
        const index = contacts.value.findIndex(c => c.id === selectedContact.value.id);
        if (index !== -1) {
            const deletedName = contacts.value[index].adSoyad;
            contacts.value.splice(index, 1);
            closeModal();
            showNotification(`${deletedName} başarıyla silindi! 🗑️`, 'success');
        }
    }
};

const closeModal = () => {
    showAddModal.value = false;
    showEditModal.value = false;
    showDeleteModal.value = false;
    selectedContact.value = null;
    resetForm();
};

const resetForm = () => {
    formData.value = {
        adSoyad: '',
        departman: '',
        pozisyon: '',
        telefon: '',
        email: '',
        lokasyon: '',
        aktifProjeler: []
    };
};

const exportToExcel = () => {
    showNotification('Rehber Excel export özelliği yakında eklenecek! 📊✨', 'info');
};

const resetFilters = () => {
    filters.value = {
        adSoyad: '',
        departman: '',
        pozisyon: ''
    };
};

const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

// ESC tuşu ile modal kapatma
const handleEscKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
        closeModal();
    }
};

onMounted(() => {
    document.addEventListener('keydown', handleEscKey);
});

onUnmounted(() => {
    document.removeEventListener('keydown', handleEscKey);
});
</script>

<style scoped>
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

/* Custom hover effects */
.hover\:shadow-md:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Responsive grid improvements */
@media (max-width: 640px) {
    .grid-cols-1 {
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }
}

/* Profile card improvements */
.profile-card {
    transition: transform 0.2s ease-in-out;
}

.profile-card:hover {
    transform: translateY(-2px);
}

/* Button improvements */
.btn-sm {
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
}

/* Dark mode improvements */
.dark .bg-white {
    background-color: #1f2937;
}

.dark .border-gray-200 {
    border-color: #374151;
}

.dark .text-gray-900 {
    color: #f9fafb;
}

.dark .text-gray-600 {
    color: #d1d5db;
}
</style>
