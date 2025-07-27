<template>
    <div>
        <!-- Header -->
        <div class="panel bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white border-0 shadow-xl">
            <div class="mb-5 flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 17h6l3 3v-3h2V9h-2m0-4H4v10.1l3-3.1h5m7 0V5a2 2 0 00-2-2H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h7l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2z" fill="currentColor"/>
                        </svg>
                    </div>
                    <div>
                        <h5 class="font-bold text-2xl">Genel Takip</h5>
                        
                    </div>
                </div>
                <div class="flex gap-3">
                    <button type="button" @click="goBack" class="btn bg-white/20 hover:bg-white/30 text-white border-white/30 hover:border-white/50 transition-all duration-300">
                        <svg class="w-5 h-5 ltr:mr-2 rtl:ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 6L5 12L11 18M5 12H19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Geri Dön
                    </button>
                    <button type="button" @click="addNewTask" class="btn bg-green-500/80 hover:bg-green-600 text-white border-green-400/50 hover:border-green-500 transition-all duration-300 transform hover:scale-105">
                        <svg class="w-5 h-5 ltr:mr-2 rtl:ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 4.5V19.5M19.5 12H4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Yeni Görev
                    </button>
                    <button class="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-300">
                            <svg class="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            Rapor Al
                        </button>
                </div>
            </div>
        </div>

        <!-- Filters -->
        <div class="panel mb-5 bg-white dark:bg-gray-800 shadow-xl rounded-2xl border-0">
            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div>
                        <h6 class="text-xl font-bold text-gray-800 dark:text-white">Görev Filtreleri</h6>
                        <p class="text-gray-500 dark:text-gray-400 text-sm">Görevlerinizi filtreleyerek hızlıca bulun</p>
                    </div>
                </div>
            </div>
            <div class="p-6">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    <div class="space-y-2">
                        <label class="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span>İş Adımı</span>
                        </label>
                        <input type="text" v-model="filters.isAdimi" placeholder="İş adımı ara..." class="form-input bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 rounded-lg transition-all duration-300" />
                    </div>
                    <div class="space-y-2">
                        <label class="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span>Sorumlu</span>
                        </label>
                        <select v-model="filters.sorumlu" class="form-select bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 rounded-lg transition-all duration-300">
                            <option value="">Tümü</option>
                            <option value="Rabia GEVREK">Rabia GEVREK</option>
                            <option value="Özkan ABDİK">Özkan ABDİK</option>
                            <option value="Reşap BABAYİĞİT">Reşap BABAYİĞİT</option>
                            <option value="Mustafa ÇAKIR">Mustafa ÇAKIR</option>
                            <option value="Emel ÇANKAYA">Emel ÇANKAYA</option>
                            <option value="Gülşah KARAKÖSE">Gülşah KARAKÖSE</option>
                        </select>
                    </div>
                    <div class="space-y-2">
                        <label class="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span>İlgili Proje</span>
                        </label>
                        <select v-model="filters.ilgiliProje" class="form-select bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 rounded-lg transition-all duration-300">
                            <option value="">Tümü</option>
                            <option value="P5855924">P5855924 - Kent Güvenlik</option>
                            <option value="P5654941">P5654941 - Alaçatı GES</option>
                            <option value="P5836361">P5836361 - Aselsan YHÖAÖS</option>
                            <option value="P5971441">P5971441 - Gebze Metro</option>
                        </select>
                    </div>
                    <div class="space-y-2">
                        <label class="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span>Durum</span>
                        </label>
                        <select v-model="filters.durum" class="form-select bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 rounded-lg transition-all duration-300">
                            <option value="">Tümü</option>
                            <option value="Açık">Açık</option>
                            <option value="Kapalı">Kapalı</option>
                        </select>
                    </div>
                    <div class="flex items-end space-y-2">
                        <div class="w-full">
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">İşlemler</label>
                            <button type="button" @click="resetFilters" class="btn bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white w-full rounded-lg transition-all duration-300 transform hover:scale-105">
                                <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                Temizle
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tasks Table -->
        <div class="panel bg-white dark:bg-gray-800 shadow-xl rounded-2xl border-0 overflow-hidden">
            <div class="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border-b border-gray-200 dark:border-gray-600">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                            <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div>
                            <h6 class="text-lg font-bold text-gray-800 dark:text-white">Görev Listesi</h6>
                            <p class="text-sm text-gray-500 dark:text-gray-400">{{ filteredTasks.length }} görev bulundu</p>
                        </div>
                    </div>
                   
                </div>
            </div>
              <div class="table-responsive">
                <table class="table-hover custom-task-table min-w-full">
                    <thead class="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th class="w-16 px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">No</th>
                            <th class="w-80 px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">İş Adımı</th>
                            <th class="w-32 px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Sorumlu</th>
                            <th class="w-28 px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Proje</th>
                            <th class="w-32 px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Başlangıç</th>
                            <th class="w-32 px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Hedef</th>
                            <th class="w-24 px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Durum</th>
                            <th class="w-96 px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Açıklama</th>
                            <th class="w-32 px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Son Değişiklik</th>
                            <th class="w-32 px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Son Değiştiren</th>
                            <th class="w-32 px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        <tr v-for="(task, index) in filteredTasks" :key="task.id" class="align-top hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                            <td class="w-16 px-4 py-4 text-center">
                                <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                    {{ index + 1 }}
                                </div>
                            </td>                            <td class="w-80 px-4 py-4">
                                <div v-if="!task.isEditing" class="cursor-pointer word-wrap-cell p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200" @click="editTask(task)">
                                    {{ task.isAdimi }}
                                </div>
                                <textarea v-else v-model="task.isAdimi" class="form-textarea w-full bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 rounded-lg" rows="3" @blur="saveTask(task)" @keydown.ctrl.enter="saveTask(task)"></textarea>
                            </td><td class="w-32 px-4 py-4">
                                <div v-if="!task.isEditing" class="flex items-center">
                                    
                                    <div class="word-wrap-cell">{{ task.sorumlu }}</div>
                                </div>
                                <select v-else v-model="task.sorumlu" class="form-select bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 rounded-lg" @change="saveTask(task)" @blur="saveTask(task)">
                                    <option value="Rabia GEVREK">Rabia GEVREK</option>
                                    <option value="Özkan ABDİK">Özkan ABDİK</option>
                                    <option value="Reşap BABAYİĞİT">Reşap BABAYİĞİT</option>
                                    <option value="Mustafa ÇAKIR">Mustafa ÇAKIR</option>
                                    <option value="Emel ÇANKAYA">Emel ÇANKAYA</option>
                                    <option value="Gülşah KARAKÖSE">Gülşah KARAKÖSE</option>
                                </select>
                            </td>
                            <td class="w-28 px-4 py-4">
                                <div v-if="!task.isEditing" class="text-center">
                                    <div class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                        {{ task.ilgiliProje }}
                                    </div>
                                </div>
                                <select v-else v-model="task.ilgiliProje" class="form-select bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 rounded-lg" @change="saveTask(task)" @blur="saveTask(task)">
                                    <option value="P5855924">P5855924</option>
                                    <option value="P5654941">P5654941</option>
                                    <option value="P5836361">P5836361</option>
                                    <option value="P5971441">P5971441</option>
                                </select>
                            </td>
                            <td class="w-32 px-4 py-4">
                                <div v-if="!task.isEditing" class="text-center text-sm text-gray-600 dark:text-gray-400">{{ formatDate(task.baslangicTarihi) }}</div>
                                <input v-else type="date" v-model="task.baslangicTarihi" class="form-input bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 rounded-lg" @change="saveTask(task)" @blur="saveTask(task)" />
                            </td>
                            <td class="w-32 px-4 py-4">
                                <div v-if="!task.isEditing" class="text-center text-sm text-gray-600 dark:text-gray-400">{{ formatDate(task.hedefTarih) }}</div>
                                <input v-else type="date" v-model="task.hedefTarih" class="form-input bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 rounded-lg" @change="saveTask(task)" @blur="saveTask(task)" />
                            </td>                            <td class="w-24 px-4 py-4 text-center">
                                <div v-if="!task.isEditing" class="cursor-pointer" @click="editTask(task)">
                                    <div class="flex items-center justify-center">
                                        <div class="w-2 h-2 rounded-full mr-2" :class="task.durum === 'Açık' ? 'bg-green-500' : 'bg-red-500'"></div>
                                        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium" :class="getDurumBadgeClass(task.durum)">
                                            {{ task.durum }}
                                        </span>
                                    </div>
                                </div>
                                <select v-else v-model="task.durum" class="form-select bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 rounded-lg" @change="saveTask(task)" @blur="saveTask(task)">
                                    <option value="Açık">Açık</option>
                                    <option value="Kapalı">Kapalı</option>
                                </select>
                            </td>                            <td class="w-96 px-4 py-4">
                                <div v-if="!task.isEditing" class="cursor-pointer word-wrap-cell p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200" @click="editTask(task)">
                                    {{ task.aciklama }}
                                </div>
                                <textarea v-else v-model="task.aciklama" class="form-textarea w-full bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 rounded-lg" rows="3" @blur="saveTask(task)" @keydown.ctrl.enter="saveTask(task)" @keydown.enter.stop></textarea>
                            </td>
                            <td class="w-32 px-4 py-4">
                                <div class="text-center text-sm text-gray-600 dark:text-gray-400">
                                    <div class="font-medium">{{ formatDate(task.sonDegisiklikTarihi || task.baslangicTarihi) }}</div>
                                    <div class="text-xs text-gray-500 dark:text-gray-500">{{ formatTime(task.sonDegisiklikTarihi || task.baslangicTarihi) }}</div>
                                </div>
                            </td>
                            <td class="w-32 px-4 py-4">
                                <div class="flex items-center">
                                    
                                    <div class="text-sm">
                                        <div class="font-medium text-gray-800 dark:text-gray-200">{{ task.sonDegistiren || 'Admin' }}</div>
                                        <div class="text-xs text-gray-500 dark:text-gray-400">Sistem Kullanıcısı</div>
                                    </div>
                                </div>
                            </td>
                            <td class="w-32 px-4 py-4">
                                <div class="flex gap-2 justify-center">
                                    <button v-if="!task.isEditing" type="button" @click="editTask(task)" class="btn btn-sm bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105" title="Düzenle">
                                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.2869 3.15178L14.3601 4.07866L5.83882 12.5999L5.83881 12.5999C5.26166 13.1771 4.97308 13.4656 4.7249 13.7838C4.43213 14.1592 4.18114 14.5653 3.97634 14.995C3.80273 15.3593 3.67368 15.7465 3.41556 16.5208L2.32181 19.8021L2.05445 20.6042C1.92743 20.9852 2.0266 21.4053 2.31063 21.6894C2.59466 21.9734 3.01478 22.0726 3.39584 21.9456L4.19792 21.6782L7.47918 20.5844L7.47919 20.5844C8.25353 20.3263 8.6407 20.1972 9.00498 20.0236C9.43469 19.8188 9.84082 19.5678 10.2162 19.2751C10.5344 19.0269 10.8229 18.7383 11.4001 18.1612L11.4001 18.1612L19.9213 9.63993L20.8482 8.71306C22.3839 7.17735 22.3839 4.68748 20.8482 3.15178C19.3125 1.61607 16.8226 1.61607 15.2869 3.15178Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                    <button v-else type="button" @click="saveTask(task)" class="btn btn-sm bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105" title="Kaydet">
                                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                    <button type="button" @click="deleteTask(task.id)" class="btn btn-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105" title="Sil">
                                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="filteredTasks.length === 0">
                            <td colspan="11" class="text-center py-12">
                                <div class="flex flex-col items-center">
                                    <div class="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                                        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                                        </svg>
                                    </div>
                                    <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Görev Bulunamadı</h3>
                                    <p class="text-gray-500 dark:text-gray-400 mb-4">Filtrelere uygun görev bulunamadı. Yeni görev ekleyebilir veya filtreleri temizleyebilirsiniz.</p>
                                    <div class="flex space-x-3">
                                        <button @click="addNewTask" class="btn bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                                            <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                            Yeni Görev
                                        </button>
                                        <button @click="resetFilters" class="btn bg-gray-500 hover:bg-gray-600 text-white">
                                            <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                            Filtreleri Temizle
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Add New Task Modal -->
        <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
                <div class="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <div class="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div>
                        <h6 class="text-xl font-bold text-gray-800 dark:text-white">Yeni Görev Ekle</h6>
                        <p class="text-gray-500 dark:text-gray-400 text-sm">Yeni bir görev oluşturun ve sorumlu atayın</p>
                    </div>
                </div>
                
                <form @submit.prevent="saveNewTask">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div class="space-y-2">
                            <label class="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span >İş/Görev Adımı *</span>
                            </label>
                            <input type="text" v-model="newTask.isAdimi" placeholder="Yapılacak İş / Görev adımını  giriniz." class="form-input bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 rounded-lg transition-all duration-300" required  />
                        </div>
                        <div class="space-y-2">
                            <label class="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span>Sorumlu *</span>
                            </label>
                            <select v-model="newTask.sorumlu" class="form-select bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 rounded-lg transition-all duration-300" required>
                                <option value="">Seçiniz...</option>
                                <option value="Rabia GEVREK">Rabia GEVREK</option>
                                <option value="Özkan ABDİK">Özkan ABDİK</option>
                                <option value="Reşap BABAYİĞİT">Reşap BABAYİĞİT</option>
                                <option value="Mustafa ÇAKIR">Mustafa ÇAKIR</option>
                                <option value="Emel ÇANKAYA">Emel ÇANKAYA</option>
                                <option value="Gülşah KARAKÖSE">Gülşah KARAKÖSE</option>
                            </select>
                        </div>
                        <div class="space-y-2">
                            <label class="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span>İlgili Proje *</span>
                            </label>
                            <select v-model="newTask.ilgiliProje" class="form-select bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 rounded-lg transition-all duration-300" required>
                                <option value="">Seçiniz...</option>
                                <option value="P5855924">P5855924 - Kent Güvenlik</option>
                                <option value="P5654941">P5654941 - Alaçatı GES</option>
                                <option value="P5836361">P5836361 - Aselsan YHT Tren</option>
                                <option value="P5971441">P5971441 - Gebze Metro</option>
                            </select>
                        </div>
                        <div class="space-y-2">
                            <label class="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span>Durum</span>
                            </label>
                            <select v-model="newTask.durum" class="form-select bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 rounded-lg transition-all duration-300">
                                <option value="Açık">Açık</option>
                                <option value="Kapalı">Kapalı</option>
                            </select>
                        </div>
                        <div class="space-y-2">
                            <label class="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span>Başlangıç Tarihi</span>
                            </label>
                            <input type="date" v-model="newTask.baslangicTarihi" class="form-input bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 rounded-lg transition-all duration-300" />
                        </div>
                        <div class="space-y-2">
                            <label class="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span>Hedef Tarih</span>
                            </label>
                            <input type="date" v-model="newTask.hedefTarih" class="form-input bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 rounded-lg transition-all duration-300" />
                        </div>
                    </div>
                    <div class="mb-6 space-y-2">
                        <label class="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span>Açıklama</span>
                        </label>
                        <textarea v-model="newTask.aciklama" rows="4" placeholder="Yapılacak İş / Görev açıklamasını giriniz." class="form-textarea bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 rounded-lg transition-all duration-300"></textarea>
                    </div>
                    
                    <div class="flex items-center justify-end gap-4">
                        <button type="button" @click="cancelAddTask" class="btn bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg transition-all duration-300">
                            <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            İptal
                        </button>
                        <button type="submit" class="btn bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                            <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            Kaydet
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useMeta } from '@/composables/use-meta';

useMeta({ title: 'Proje Raporu' });

const router = useRouter();

// State
const showAddModal = ref(false);

// Filters
const filters = ref({
    isAdimi: '',
    sorumlu: '',
    ilgiliProje: '',
    durum: ''
});

// New task form
const newTask = ref({
    isAdimi: '',
    sorumlu: '',
    ilgiliProje: '',
    baslangicTarihi: '',
    hedefTarih: '',
    durum: 'Açık',
    aciklama: ''
});

// Mock data - Excel'deki verilere benzer
const tasks = ref([
    {
        id: 1,
        isAdimi: 'AFGM ve 4 Ana Bakım ilgili işçilerin ASELSAN\'da uygulanması için 23 Temmuz haftası herkes için uygunsa satıcımlarda bilgi verilecek',
        sorumlu: 'Rabia GEVREK',
        ilgiliProje: 'P5855924',
        baslangicTarihi: '2025-07-01',
        hedefTarih: '2025-07-25',
        durum: 'Açık',
        aciklama: '2 Eyl\nKonu takipte.',
        sonDegisiklikTarihi: '2025-07-25T14:30:00',
        sonDegistiren: 'Admin',
        isEditing: false
    },
    {
        id: 2,
        isAdimi: 'Alaçatı doğalgaz GGS Şebat tarihli faturasını yer alıyor, hala ödeme alamadık. 4 Ana Bakım ve Yusuf Bey ile koordineli olarak konuyu takip ediyoruz',
        sorumlu: 'Rabia GEVREK',
        ilgiliProje: 'P5654941',
        baslangicTarihi: '2025-07-01',
        hedefTarih: '2025-07-15',
        durum: 'Kapalı',
        aciklama: 'Mali işlere konu aktarılacak.\nTamamlandı.',
        sonDegisiklikTarihi: '2025-07-24T16:15:00',
        sonDegistiren: 'Rabia GEVREK',
        isEditing: false
    },
    {
        id: 3,
        isAdimi: '5 GÜLASŞ projelerimiz aksatılmaması',
        sorumlu: 'Özkan ABDİK',
        ilgiliProje: 'P5836361',
        baslangicTarihi: '2025-07-08',
        hedefTarih: '2025-07-08',
        durum: 'Açık',
        aciklama: 'Tablet GÜLASŞ UMSG\'ye hediye edilmesi konusu proje ile konuşulacak.\nAraştırma devam ediyor.',
        sonDegisiklikTarihi: '2025-07-26T09:20:00',
        sonDegistiren: 'Özkan ABDİK',
        isEditing: false
    },
    {
        id: 4,
        isAdimi: 'Kapısam dış analızlerde fiyat bildirim geçmişine yazıldığı ancak yalnızca AB-SGS\'den bilgi gelebir',
        sorumlu: 'Reşap BABAYİĞİT, Enes KÖKSAL',
        ilgiliProje: 'P5971441',
        baslangicTarihi: '2025-07-08',
        hedefTarih: '2025-07-08',
        durum: 'Kapalı',
        aciklama: 'Diğer projeler için ilgili arkadaşlara öğretilecek.\nEğitim tamamlandı.',
        sonDegisiklikTarihi: '2025-07-23T11:45:00',
        sonDegistiren: 'Admin',
        isEditing: false
    },
    {
        id: 5,
        isAdimi: 'Yıldırım konusunda alternatif çözüm için firmalar toplanıp çağırılacak',
        sorumlu: 'Mustafa ÇAKIR',
        ilgiliProje: 'P5855924',
        baslangicTarihi: '2025-06-24',
        hedefTarih: '2025-06-24',
        durum: 'Açık',
        aciklama: '25 Mayıs\'ta Radsan toplantısı yapılacak.\nBölgeden örnek lokasyonlar belirlenecek, gönderilenecek.\nToplantı planlanıyor.',
        sonDegisiklikTarihi: '2025-07-25T13:10:00',
        sonDegistiren: 'Mustafa ÇAKIR',
        isEditing: false
    },
    {
        id: 6,
        isAdimi: 'SGTDE bekleyen ve ELD-5 ödemesi kalan birimlerle yönelik nasıl ilerleneceği konusunda karar alınması',
        sorumlu: 'UDM-Reşap BABAYİĞİT',
        ilgiliProje: 'P5654941',
        baslangicTarihi: '2025-06-13',
        hedefTarih: '2025-07-08',
        durum: 'Açık',
        aciklama: 'Hurda olarak belirtilen cihazların gönderilmesi takip edilecek.\nLojistik koordinasyonu yapılıyor.',
        sonDegisiklikTarihi: '2025-07-26T08:35:00',
        sonDegistiren: 'Admin',
        isEditing: false
    },
    {
        id: 7,
        isAdimi: 'MUB Projesi kapsamında Odak Çalışma Grubu\'na geçilmesi konusunda sipariş işçal edildierk yeni sipariş için öngörülmesinin gerekenek',
        sorumlu: 'Emel ÇANKAYA',
        ilgiliProje: 'P5971441',
        baslangicTarihi: '2025-01-08',
        hedefTarih: '2025-01-08',
        durum: 'Kapalı',
        aciklama: 'Yıl sonunu beklemeden geçiş çalışmaları başlatılacaktır.\nGeçiş tamamlandı.\nDokümantasyon hazırlandı.',
        sonDegisiklikTarihi: '2025-07-22T15:20:00',
        sonDegistiren: 'Emel ÇANKAYA',
        isEditing: false
    },
    {
        id: 8,
        isAdimi: 'Arıza kayıt sayıları artırılması',
        sorumlu: 'UDM Gülşah KARAKÖSE, Özkan ABDİK',
        ilgiliProje: 'P5836361',
        baslangicTarihi: '2025-06-18',
        hedefTarih: '2025-06-05',
        durum: 'Açık',
        aciklama: 'Proje Bütçesi/Arıza kayıt sayıları olarak tablo üzerinden değerlendirme yapılacaktır.\nAnaliz devam ediyor.',
        sonDegisiklikTarihi: '2025-07-26T10:15:00',
        sonDegistiren: 'Gülşah KARAKÖSE',
        isEditing: false
    }
]);

// Computed
const filteredTasks = computed(() => {
    return tasks.value.filter(task => {
        return (
            (filters.value.isAdimi === '' || task.isAdimi.toLowerCase().includes(filters.value.isAdimi.toLowerCase())) &&
            (filters.value.sorumlu === '' || task.sorumlu === filters.value.sorumlu) &&
            (filters.value.ilgiliProje === '' || task.ilgiliProje === filters.value.ilgiliProje) &&
            (filters.value.durum === '' || task.durum === filters.value.durum)
        );
    });
});

// Methods
const goBack = () => {
    router.push('/');
};

const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR');
};

const formatTime = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
};

const getDurumBadgeClass = (durum: string) => {
    return durum === 'Açık' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
};

const resetFilters = () => {
    filters.value = {
        isAdimi: '',
        sorumlu: '',
        ilgiliProje: '',
        durum: ''
    };
};

const editTask = (task: any) => {
    // Önce diğer düzenleme modlarını kapat
    tasks.value.forEach(t => t.isEditing = false);
    task.isEditing = true;
};

const saveTask = (task: any) => {
    task.isEditing = false;
    task.sonDegisiklikTarihi = new Date().toISOString();
    task.sonDegistiren = 'Admin'; // Gerçek uygulamada current user
    // Burada API çağrısı yapılabilir
};

const deleteTask = (taskId: number) => {
    if (confirm('Bu görevi silmek istediğinizden emin misiniz?')) {
        const index = tasks.value.findIndex(t => t.id === taskId);
        if (index > -1) {
            tasks.value.splice(index, 1);
        }
    }
};

const addNewTask = () => {
    newTask.value = {
        isAdimi: '',
        sorumlu: '',
        ilgiliProje: '',
        baslangicTarihi: '',
        hedefTarih: '',
        durum: 'Açık',
        aciklama: ''
    };
    showAddModal.value = true;
};

const saveNewTask = () => {
    const nextId = Math.max(...tasks.value.map(t => t.id)) + 1;
    const now = new Date().toISOString();
    tasks.value.push({
        id: nextId,
        ...newTask.value,
        sonDegisiklikTarihi: now,
        sonDegistiren: 'Admin',
        isEditing: false
    });
    showAddModal.value = false;
};

const cancelAddTask = () => {
    showAddModal.value = false;
};
</script>

<style scoped>
/* Tablo özel stilleri */
.custom-task-table {
    table-layout: fixed;
    width: 100%;
}

.custom-task-table th,
.custom-task-table td {
    vertical-align: top;
    padding: 12px 8px;
    border-bottom: 1px solid #e5e7eb;
}

.dark .custom-task-table th,
.dark .custom-task-table td {
    border-color: #374151;
}

/* Word wrap için özel sınıf */
.word-wrap-cell {
    word-wrap: break-word;
    word-break: break-word;
    white-space: pre-wrap;
    line-height: 1.5;
    min-height: auto;
    hyphens: auto;
}

/* Satır top hizalama */
.align-top {
    vertical-align: top;
}

/* Kolon genişlikleri */
.w-16 { width: 4rem; }
.w-24 { width: 6rem; }
.w-28 { width: 7rem; }
.w-32 { width: 8rem; }
.w-80 { width: 20rem; }
.w-96 { width: 24rem; }

/* Responsive ayarları */
@media (max-width: 1024px) {
    .w-80 { width: 15rem; }
    .w-96 { width: 18rem; }
}

@media (max-width: 768px) {
    .w-80 { width: 12rem; }
    .w-96 { width: 15rem; }
    .w-32 { width: 6rem; }
}

/* Form elemanları için stil düzenlemeleri */
.custom-task-table .form-textarea {
    min-height: 60px;
    resize: vertical;
}

.custom-task-table .form-input,
.custom-task-table .form-select {
    font-size: 14px;
}

/* Düzenlenebilir alan hover efekti */
.word-wrap-cell:hover {
    background-color: #f9fafb;
    border-radius: 4px;
    transition: background-color 0.2s ease;
}

.dark .word-wrap-cell:hover {
    background-color: #374151;
}

/* Badge düzenlemeleri */
.badge {
    display: inline-block;
    padding: 2px 8px;
    font-size: 12px;
    font-weight: 500;
    border-radius: 4px;
    transition: all 0.2s ease;
}

.badge:hover {
    transform: scale(1.05);
    cursor: pointer;
}

/* Tablo scroll düzenlemeleri */
.table-responsive {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
}

/* İş adımı ve açıklama için özel stil */
.custom-task-table td:nth-child(2),
.custom-task-table td:nth-child(8) {
    max-width: none;
    overflow: visible;
}
</style>