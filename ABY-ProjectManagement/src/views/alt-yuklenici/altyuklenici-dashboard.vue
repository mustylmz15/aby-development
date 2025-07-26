<template>
    <div>
        <div class="panel">
            <!-- Modern Header -->
            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 mb-6 border border-blue-100 dark:border-gray-600">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 00-2 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14"/>
                            </svg>
                        </div>
                        <div>
                            <h5 class="text-2xl font-bold text-gray-900 dark:text-white">UGES Entegre Lojistik Destek Direktörlüğü</h5>
                            <p class="text-lg font-semibold text-blue-600 dark:text-blue-400">Alt Yüklenici Yönetimi Gösterge Paneli</p>
                            <div class="flex items-center space-x-4 mt-1">
                                <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                                    <span class="text-gray-500">Son Güncelleme:</span>
                                    <div class="text-sm font-medium text-green-600 dark:text-green-400">{{ lastUpdateTime }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <button type="button" class="btn btn-success flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200" @click="refreshDashboard">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                            </svg>
                            <span class="font-medium">Verileri Yenile</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Dashboard İçeriği -->
            <div class="space-y-6">
                <!-- Üst Satır - 3 Kart -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                    <!-- Sol - Birimlere Göre Alt Yüklenici Sayısı -->
                    <div class="lg:col-span-1 h-full">
                        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 h-full min-h-96">
                            <div class="bg-red-500 text-white px-4 py-2 rounded-t-lg -mx-6 -mt-6 mb-4">
                                <h6 class="font-semibold text-center">Birimlere Göre Alt Yüklenici Sayısı</h6>
                            </div>
                            <div class="h-96">
                                <div data-pie-chart class="w-full h-full flex items-center justify-center">
                                    <!-- Fallback content while chart loads -->
                                    <div class="text-center">
                                        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                                        <p class="text-gray-500 text-sm">Grafik yükleniyor...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Orta - Projelerde Alt Yüklenici Sayıları -->
                    <div class="lg:col-span-1 h-full">
                        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 h-full min-h-96">
                            <div class="flex items-center dark:text-white-light mb-5">
                                <h5 class="font-semibold text-lg">Projelerde Alt Yüklenici Sayıları</h5>
                                <div class="dropdown ltr:ml-auto rtl:mr-auto">
                                    <button type="button" class="text-black/70 dark:text-white/70 hover:!text-primary">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zM12 13a1 1 0 110-2 1 1 0 010 2zM12 20a1 1 0 110-2 1 1 0 010 2z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div class="flex-1 overflow-y-auto max-h-96 pr-2" v-if="topProjects.length > 0">
                                <div class="space-y-4">
                                    <div v-for="(project, index) in topProjects" :key="index" class="flex items-center">
                                        <div class="w-9 h-9 ltr:mr-3 rtl:ml-3 flex-shrink-0">
                                            <div :class="getProjectIconClass(index)" class="rounded-full w-9 h-9 grid place-content-center">
                                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                                                </svg>
                                            </div>
                                        </div>
                                        <div class="flex-1 min-w-0">
                                            <div class="flex font-semibold text-white-dark mb-2">
                                                <h6 :title="project.fullName" class="truncate">{{ project.name }}</h6>
                                                <p class="ltr:ml-auto rtl:mr-auto flex-shrink-0 ml-2">{{ project.count }}</p>
                                            </div>
                                            <div class="w-full rounded-full h-2 bg-dark-light dark:bg-[#1b2e4b] shadow">
                                                <div :class="getProjectGradientClass(index)" :style="`width: ${project.percentage}%`" class="h-full rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="flex-1">
                                <div class="flex items-center justify-center h-48">
                                    <div class="text-center">
                                        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                                        <p class="text-gray-500 text-sm">Proje verileri yükleniyor...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Sağ - Firma Bazında Altyüklenici Durumları -->
                    <div class="lg:col-span-1 h-full">
                        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 h-full min-h-96">
                            <div class="flex items-start justify-between mb-5">
                                <h5 class="font-semibold text-lg dark:text-white-light">Firma Bazında Altyüklenici Durumları</h5>
                                <div class="dropdown ltr:ml-auto rtl:mr-auto">
                                    <button type="button" class="text-black/70 dark:text-white/70 hover:!text-primary">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zM12 13a1 1 0 110-2 1 1 0 010 2zM12 20a1 1 0 110-2 1 1 0 010 2z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div class="flex-1 overflow-y-auto max-h-96 pr-2" v-if="topCompanies.length > 0">
                                <div class="space-y-4">
                                    <div v-for="(company, index) in topCompanies" :key="index" class="flex items-center">
                                        <div class="w-9 h-9 flex-shrink-0">
                                            <div :class="getCompanyIconClass(index)" class="rounded-xl w-9 h-9 flex justify-center items-center">
                                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                                                </svg>
                                            </div>
                                        </div>
                                        <div class="px-3 flex-initial w-full min-w-0">
                                            <div class="w-summary-info flex justify-between font-semibold text-white-dark mb-1">
                                                <h6 :title="company.fullName" class="truncate">{{ company.name }}</h6>
                                                <p class="ltr:ml-auto rtl:mr-auto text-xs flex-shrink-0 ml-2">{{ company.percentage }}% ({{ company.count }})</p>
                                            </div>
                                            <div>
                                                <div class="w-full rounded-full h-5 p-1 bg-dark-light overflow-hidden shadow-3xl dark:bg-dark-light/10 dark:shadow-none">
                                                    <div
                                                        :class="getCompanyGradientClass(index)"
                                                        class="w-full h-full rounded-full relative before:absolute before:inset-y-0 ltr:before:right-0.5 rtl:before:left-0.5 before:bg-white before:w-2 before:h-2 before:rounded-full before:m-auto"
                                                        :style="`width: ${company.percentage}%`"
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="flex-1">
                                <div class="flex items-center justify-center h-48">
                                    <div class="text-center">
                                        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                                        <p class="text-gray-500 text-sm">Firma verileri yükleniyor...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                </div>

                <!-- Alt Satır - 4 Kart -->
                <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <!-- Sol - Çalışma Yeri Dağılımı -->
                    <div class="lg:col-span-1">
                        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 ">
                            <div class="flex items-center dark:text-white-light mb-5">
                                <h5 class="font-semibold text-lg">Çalışma Yeri Dağılımı</h5>
                                <div class="dropdown ltr:ml-auto rtl:mr-auto">
                                    <button type="button" class="text-black/70 dark:text-white/70 hover:!text-primary">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zM12 13a1 1 0 110-2 1 1 0 010 2zM12 20a1 1 0 110-2 1 1 0 010 2z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div class="flex-1 overflow-y-auto max-h-80 pr-2" v-if="topCities.length > 0">
                                <div class="space-y-4">
                                    <div v-for="(city, index) in topCities" :key="index" class="flex items-center">
                                        <div class="w-9 h-9 ltr:mr-3 rtl:ml-3 flex-shrink-0">
                                            <div :class="getCityIconClass(index)" class="rounded-full w-9 h-9 grid place-content-center">
                                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                                </svg>
                                            </div>
                                        </div>
                                        <div class="flex-1 min-w-0">
                                            <div class="flex font-semibold text-white-dark mb-2">
                                                <h6 :title="city.fullName" class="truncate">{{ city.name }}</h6>
                                                <p class="ltr:ml-auto rtl:mr-auto flex-shrink-0 ml-2">{{ city.count }}</p>
                                            </div>
                                            <div class="rounded-full h-2 bg-dark-light dark:bg-[#1b2e4b] shadow">
                                                <div :class="getCityGradientClass(index)" :style="`width: ${city.percentage}%`" class="w-full h-full rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="flex-1">
                                <div class="flex items-center justify-center h-48">
                                    <div class="text-center">
                                        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500 mx-auto mb-2"></div>
                                        <p class="text-gray-500 text-sm">Şehir verileri yükleniyor...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Orta - Görev Dağılımı -->
                    <div class="lg:col-span-1">
                        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 ">
                            <div class="flex items-center dark:text-white-light mb-5">
                                <h5 class="font-semibold text-lg">Görev Dağılımı</h5>
                                <div class="dropdown ltr:ml-auto rtl:mr-auto">
                                    <button type="button" class="text-black/70 dark:text-white/70 hover:!text-primary">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zM12 13a1 1 0 110-2 1 1 0 010 2zM12 20a1 1 0 110-2 1 1 0 010 2z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div class="flex-1 overflow-y-auto max-h-96 pr-2" v-if="topTasks.length > 0">
                                <div class="space-y-4">
                                    <div v-for="(task, index) in topTasks" :key="index" class="flex items-center">
                                        <div class="w-9 h-9 ltr:mr-3 rtl:ml-3 flex-shrink-0">
                                            <div :class="getTaskIconClass(index)" class="rounded-full w-9 h-9 grid place-content-center">
                                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                                </svg>
                                            </div>
                                        </div>
                                        <div class="flex-1 min-w-0">
                                            <div class="flex font-semibold text-white-dark mb-2">
                                                <h6 :title="task.fullName" class="truncate">{{ task.name }}</h6>
                                                <p class="ltr:ml-auto rtl:mr-auto flex-shrink-0 ml-2">{{ task.count }}</p>
                                            </div>
                                            <div class="rounded-full h-2 bg-dark-light dark:bg-[#1b2e4b] shadow">
                                                <div :class="getTaskGradientClass(index)" :style="`width: ${task.percentage}%`" class="w-full h-full rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="flex-1">
                                <div class="flex items-center justify-center h-48">
                                    <div class="text-center">
                                        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500 mx-auto mb-2"></div>
                                        <p class="text-gray-500 text-sm">Görev verileri yükleniyor...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Sağ - Pasta Grafik -->
                    <div class="lg:col-span-1">
                        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 ">
                            <div class="bg-purple-500 text-white px-4 py-2 rounded-t-lg -mx-6 -mt-6 mb-4">
                                <h6 class="font-semibold text-center">Ünvan Dağılımı</h6>
                            </div>
                            <div class="h-96 flex items-center justify-center" v-if="topTitles.length > 0">
                                <div class="w-full max-w-xs">
                                    <div class="space-y-3">
                                        <div v-for="(title, index) in topTitles" :key="index" class="flex items-center justify-between p-3 rounded-lg" :class="getTitleIconClass(index).replace('w-9 h-9', '').replace('rounded-full', 'rounded-lg').replace('grid place-content-center', '')">
                                            <div class="flex items-center flex-1">
                                                <div class="w-3 h-3 rounded-full mr-3" :class="getTitleGradientClass(index)"></div>
                                                <span class="font-medium text-sm">{{ title.fullName }}</span>
                                            </div>
                                            <div class="text-right">
                                                <div class="font-bold text-lg">{{ title.count }}</div>
                                                <div class="text-xs opacity-75">%{{ title.percentage }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="h-96 flex items-center justify-center">
                                <div class="text-center">
                                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-2"></div>
                                    <p class="text-gray-500 text-sm">Ünvan verileri yükleniyor...</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- En Sağ - İki Ana Div Yan Yana -->
                    <div class="lg:col-span-1">
                        <div class="grid grid-cols-2 gap-4 h-96">
                            <!-- Sol - Alt Sayısı ve Sözleşme Türüne Göre Alt Alta -->
                            <div class="h-96 flex flex-col gap-4">
                                <!-- Üst - Alt Sayısı (Yarı Yükseklik) -->
                                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 h-32">
                                    <div class="bg-red-500 text-white px-3 py-1 rounded-t-lg -mx-3 -mt-3 mb-3">
                                        <h6 class="font-semibold text-center text-xs">Alt Yüklenici Sayısı</h6>
                                    </div>
                                    <div class="text-center bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900 dark:to-red-900 rounded-lg p-2 flex flex-col justify-center h-20">
                                        <div class="text-2xl font-bold text-red-600 dark:text-red-400">{{ udmTeamData.length }}</div>
                                        <div class="text-xs text-red-500 dark:text-red-300 font-medium">Toplam Personel</div>
                                    </div>
                                </div>
                                
                                <!-- Alt - Sözleşme Türüne Göre (Yarı Yükseklik) -->
                                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 ">
                                    <div class="bg-red-500 text-white px-4 py-2 rounded-t-lg -mx-4 -mt-4 mb-4">
                                        <h6 class="font-semibold text-center text-sm">Sözleşme Türüne Göre ({{ topContracts.length }} tür)</h6>
                                    </div>
                                    <div class="h-76 overflow-y-auto pr-2" v-if="topContracts.length > 0">
                                        <div class="space-y-3">
                                            <div v-for="(contract, index) in topContracts" :key="index" 
                                                 class="flex items-center justify-between p-2 rounded-lg" 
                                                 :class="getContractIconClass(index).replace('w-9 h-9', '').replace('rounded-full', 'rounded-lg').replace('grid place-content-center', '')">
                                                <div class="flex items-center flex-1">
                                                    <div class="w-3 h-3 rounded-full mr-2" :class="getContractGradientClass(index)"></div>
                                                    <span class="font-medium text-sm" :title="contract.fullName">{{ contract.name }}</span>
                                                </div>
                                                <div class="text-right">
                                                    <div class="font-bold text-lg">{{ contract.count }}</div>
                                                    <div class="text-xs opacity-75">%{{ contract.percentage }}</div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div v-else class="flex items-center justify-center">
                                        <div class="text-center">
                                            <div class="animate-spin rounded-full  w-8 border-b-2 border-red-500 mx-auto mb-2"></div>
                                            <p class="text-gray-500 text-sm">Sözleşme verileri yükleniyor...</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Sağ - Ad Soyad -->
                            <div class="h-96">
                                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 ">
                                    <div class="bg-indigo-500 text-white px-4 py-2 rounded-t-lg -mx-4 -mt-4 mb-4">
                                        <h6 class="font-semibold text-center text-sm">Ad Soyad</h6>
                                    </div>
                                    <div class="h-96 overflow-y-auto">
                                        <div class="space-y-1">
                                            <div v-for="contractor in contractors.slice(0, 25)" :key="contractor.id" 
                                                 class="py-1 px-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded text-xs border-b border-gray-100 dark:border-gray-600">
                                                <div class="font-medium text-gray-700 dark:text-gray-300 text-center">{{ formatName(contractor.yetkiliKisi) }}</div>
                                            </div>
                                            <div v-if="contractors.length === 0" class="space-y-1">
                                                <div class="py-1 px-2 text-xs border-b border-gray-100">
                                                    <div class="font-medium text-gray-700 text-center">Abdullah KULU</div>
                                                </div>
                                                <div class="py-1 px-2 text-xs border-b border-gray-100">
                                                    <div class="font-medium text-gray-700 text-center">Adnan ÇAKAR</div>
                                                </div>
                                                <div class="py-1 px-2 text-xs border-b border-gray-100">
                                                    <div class="font-medium text-gray-700 text-center">Ahmet DEMİR</div>
                                                </div>
                                                <div class="py-1 px-2 text-xs border-b border-gray-100">
                                                    <div class="font-medium text-gray-700 text-center">Ali Can YAVUZ</div>
                                                </div>
                                                <div class="py-1 px-2 text-xs border-b border-gray-100">
                                                    <div class="font-medium text-gray-700 text-center">Ali ÇOLAK</div>
                                                </div>
                                                <div class="py-1 px-2 text-xs border-b border-gray-100">
                                                    <div class="font-medium text-gray-700 text-center">Alperen GÜNEŞ</div>
                                                </div>
                                                <div class="py-1 px-2 text-xs border-b border-gray-100">
                                                    <div class="font-medium text-gray-700 text-center">Aytaç Ozan YAMAN</div>
                                                </div>
                                                <div class="py-1 px-2 text-xs border-b border-gray-100">
                                                    <div class="font-medium text-gray-700 text-center">Bahadır ÇİÇEKLİ</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useMeta } from '@/composables/use-meta';
import * as XLSX from 'xlsx';

useMeta({ title: 'Alt Yüklenici Dashboard' });

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
const udmTeamData = ref<any[]>([]);
const lastUpdateTime = ref(new Date().toLocaleString('tr-TR'));

// Excel dosyasını okuma fonksiyonu
const loadExcelData = async () => {
    try {
        const response = await fetch('/excel/Copy of rehber (002).xlsx');
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // JSON'a çevir ve header'ları kullan
        const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        if (rawData.length > 1) {
            const headers = rawData[0] as string[];
            const dataRows = rawData.slice(1) as any[][];
            
            const contractorData: Contractor[] = dataRows.map((row, index) => ({
                id: index + 1,
                firmaAdi: row[1] || '', // Firma Bilgisi
                vergiNo: '',
                yetkiliKisi: row[0] || '', // Ad soyad
                sektor: '',
                telefon: row[2] || '', // Cep Telefonu
                email: '',
                sehir: row[3] || '', // İkametgah
                durum: 'Aktif',
                adres: row[3] || '',
                sonProje: row[10] || '', // Projeler
                kayitTarihi: new Date().toLocaleDateString('tr-TR'),
                dahili: row[4] || '', // Dahili tel
                ekip: row[7] || '', // Ekip
                kanGrubu: row[8] || '', // kan grubu
                gorevBolgesi: row[9] || '', // Görev Bölgesi
                ilgiliMuhendis: row[11] || '', // İlgili Müh.
                ilgiliMudurluk: row[12] || '', // İlgili Müdürlük
                aselsanSicil: row[6] || '', // ASELSAN Sicil
                firmaSicil: row[5] || '' // Firma Sicil
            }));
            
            contractors.value = contractorData;
            lastUpdateTime.value = new Date().toLocaleString('tr-TR');
        }
    } catch (error) {
        console.error('Excel dosyası yüklenirken hata oluştu:', error);
    }
};

// UDM bilgilerini yükleme fonksiyonu
const loadUDMData = async () => {
    try {
        const response = await fetch('/excel/AY Bilgileri-UDM.xlsx');
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // JSON'a çevir
        const data = XLSX.utils.sheet_to_json(worksheet);
        udmTeamData.value = data;
        
        console.log('UDM verileri yüklendi:', data.length, 'kayıt');
    } catch (error) {
        console.error('UDM Excel dosyası yüklenirken hata:', error);
    }
};

// Computed properties
const ilSayisi = computed(() => {
    const uniqueCities = new Set(contractors.value.map(c => c.sehir).filter(Boolean));
    return uniqueCities.size;
});

const projeSayisi = computed(() => {
    const uniqueProjects = new Set(contractors.value.map(c => c.sonProje).filter(Boolean));
    return uniqueProjects.size;
});

// UDM ekip dağılımı için computed
const udmTeamDistribution = computed(() => {
    const distribution: { [key: string]: number } = {};
    
    udmTeamData.value.forEach(person => {
        const team = person['İlgili UDM Ekibi'];
        if (team) {
            distribution[team] = (distribution[team] || 0) + 1;
        }
    });
    
    return distribution;
});

// Proje dağılımı için computed
const projectDistribution = computed(() => {
    const distribution: { [key: string]: number } = {};
    
    udmTeamData.value.forEach(person => {
        const project = person['Proje'];
        if (project) {
            distribution[project] = (distribution[project] || 0) + 1;
        }
    });
    
    return distribution;
});

// Tüm projeleri al (scrollbar ile)
const topProjects = computed(() => {
    const distribution = projectDistribution.value;
    return Object.entries(distribution)
        .sort((a, b) => b[1] - a[1])
        .map(([name, count]) => ({
            name: name.length > 25 ? name.substring(0, 25) + '...' : name,
            fullName: name,
            count: count,
            percentage: Math.round((count / udmTeamData.value.length) * 100)
        }));
});

// Firma dağılımı için computed
const companyDistribution = computed(() => {
    const distribution: { [key: string]: number } = {};
    
    udmTeamData.value.forEach(person => {
        const company = person['AY Firma'];
        if (company) {
            distribution[company] = (distribution[company] || 0) + 1;
        }
    });
    
    return distribution;
});

// Tüm firmaları al (scrollbar ile)
const topCompanies = computed(() => {
    const distribution = companyDistribution.value;
    return Object.entries(distribution)
        .sort((a, b) => b[1] - a[1])
        .map(([name, count]) => ({
            name: name.length > 25 ? name.substring(0, 25) + '...' : name,
            fullName: name,
            count: count,
            percentage: Math.round((count / udmTeamData.value.length) * 100)
        }));
});

// Şehir dağılımı için computed
const cityDistribution = computed(() => {
    const distribution: { [key: string]: number } = {};
    
    udmTeamData.value.forEach(person => {
        const city = person['İkamet Edilen İl'];
        if (city) {
            // Şehir adını normalize et (büyük/küçük harf ve boşluk sorunları için)
            const normalizedCity = city.trim().toLowerCase();
            const displayCity = city.trim();
            
            distribution[displayCity] = (distribution[displayCity] || 0) + 1;
        }
    });
    
    return distribution;
});

// Tüm şehirleri al (scrollbar ile)
const topCities = computed(() => {
    const distribution = cityDistribution.value;
    return Object.entries(distribution)
        .sort((a, b) => b[1] - a[1])
        .map(([name, count]) => ({
            name: name.length > 20 ? name.substring(0, 20) + '...' : name,
            fullName: name,
            count: count,
            percentage: Math.round((count / udmTeamData.value.length) * 100)
        }));
});

// Görev dağılımı computed property
const taskDistribution = computed(() => {
    if (!udmTeamData.value.length) return {};
    
    const distribution = {};
    udmTeamData.value.forEach(person => {
        const task = person['Görev'];
        if (task) {
            distribution[task] = (distribution[task] || 0) + 1;
        }
    });
    
    return distribution;
});

const topTasks = computed(() => {
    const distribution = taskDistribution.value;
    return Object.entries(distribution)
        .sort(([,a], [,b]) => (b as number) - (a as number))
        .map(([name, count]) => ({
            name: name.length > 20 ? name.substring(0, 20) + '...' : name,
            fullName: name,
            count: count as number,
            percentage: Math.round(((count as number) / udmTeamData.value.length) * 100)
        }));
});

// Ünvan dağılımı computed property
const titleDistribution = computed(() => {
    if (!udmTeamData.value.length) return {};
    
    const distribution = {};
    udmTeamData.value.forEach(person => {
        const title = person['Unvan'];
        if (title) {
            distribution[title] = (distribution[title] || 0) + 1;
        }
    });
    
    return distribution;
});

const topTitles = computed(() => {
    const distribution = titleDistribution.value;
    return Object.entries(distribution)
        .sort(([,a], [,b]) => (b as number) - (a as number))
        .map(([name, count]) => ({
            name: name.length > 20 ? name.substring(0, 20) + '...' : name,
            fullName: name,
            count: count as number,
            percentage: Math.round(((count as number) / udmTeamData.value.length) * 100)
        }));
});

// Sözleşme türü dağılımı computed property
const contractDistribution = computed(() => {
    if (!udmTeamData.value.length) return {};
    
    const distribution = {};
    udmTeamData.value.forEach(person => {
        // E kolonu - Sözleşme Türü için tam alan adını kullan (Excel'de \r\n karakteri var)
        const contract = person['Sözleşme Türü \r\n(Odak-ELD/Personel Destek/Diğer)'];
        if (contract && contract.toString().trim()) {
            const cleanContract = contract.toString().trim();
            distribution[cleanContract] = (distribution[cleanContract] || 0) + 1;
        }
    });
    
    console.log('Contract Distribution:', distribution);
    return distribution;
});

const topContracts = computed(() => {
    const distribution = contractDistribution.value;
    const result = Object.entries(distribution)
        .sort(([,a], [,b]) => (b as number) - (a as number))
        .map(([name, count]) => ({
            name: name.length > 15 ? name.substring(0, 15) + '...' : name,
            fullName: name,
            count: count as number,
            percentage: Math.round(((count as number) / udmTeamData.value.length) * 100)
        }));
    
    console.log('Top Contracts:', result);
    return result;
});

// Helper functions for project styling
const getProjectIconClass = (index: number) => {
    const classes = [
        'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400',
        'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400',
        'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400',
        'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400',
        'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'
    ];
    return classes[index % classes.length];
};

const getProjectGradientClass = (index: number) => {
    const gradients = [
        'bg-gradient-to-r from-[#4361ee] to-[#805dca]',
        'bg-gradient-to-r from-[#3cba92] to-[#0ba360]',
        'bg-gradient-to-r from-[#f09819] to-[#ff5858]',
        'bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed]',
        'bg-gradient-to-r from-[#ef4444] to-[#dc2626]'
    ];
    return gradients[index % gradients.length];
};

// Helper functions for company styling
const getCompanyIconClass = (index: number) => {
    const classes = [
        'bg-blue-500/10 text-blue-600 dark:bg-blue-600 dark:text-white-light',
        'bg-success/10 text-success dark:bg-success dark:text-white-light',
        'bg-warning/10 text-warning dark:bg-warning dark:text-white-light',
        'bg-danger/10 text-danger dark:bg-danger dark:text-white-light',
        'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400',
        'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400',
        'bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-400',
        'bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-400'
    ];
    return classes[index % classes.length];
};

const getCompanyGradientClass = (index: number) => {
    const gradients = [
        'bg-gradient-to-r from-[#4361ee] to-[#805dca]',
        'bg-gradient-to-r from-[#3cba92] to-[#0ba360]',
        'bg-gradient-to-r from-[#f09819] to-[#ff5858]',
        'bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed]',
        'bg-gradient-to-r from-[#ef4444] to-[#dc2626]',
        'bg-gradient-to-r from-[#06b6d4] to-[#0891b2]',
        'bg-gradient-to-r from-[#ec4899] to-[#db2777]',
        'bg-gradient-to-r from-[#14b8a6] to-[#0d9488]'
    ];
    return gradients[index % gradients.length];
};

// Helper functions for city styling
const getCityIconClass = (index: number) => {
    const classes = [
        'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400',
        'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400',
        'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400',
        'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400',
        'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400',
        'bg-cyan-100 dark:bg-cyan-900 text-cyan-600 dark:text-cyan-400',
        'bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-400',
        'bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-400',
        'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400',
        'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400'
    ];
    return classes[index % classes.length];
};

const getCityGradientClass = (index: number) => {
    const gradients = [
        'bg-gradient-to-r from-[#4361ee] to-[#805dca]',
        'bg-gradient-to-r from-[#3cba92] to-[#0ba360]',
        'bg-gradient-to-r from-[#f09819] to-[#ff5858]',
        'bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed]',
        'bg-gradient-to-r from-[#ef4444] to-[#dc2626]',
        'bg-gradient-to-r from-[#06b6d4] to-[#0891b2]',
        'bg-gradient-to-r from-[#ec4899] to-[#db2777]',
        'bg-gradient-to-r from-[#14b8a6] to-[#0d9488]',
        'bg-gradient-to-r from-[#6366f1] to-[#4f46e5]',
        'bg-gradient-to-r from-[#eab308] to-[#ca8a04]'
    ];
    return gradients[index % gradients.length];
};

// Görev icon class
const getTaskIconClass = (index) => {
    const classes = [
        'bg-cyan-100 dark:bg-cyan-900 text-cyan-600 dark:text-cyan-400',
        'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400', 
        'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400',
        'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400',
        'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400',
        'bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-400',
        'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400',
        'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400',
        'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400',
        'bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-400'
    ];
    return classes[index % classes.length];
};

// Görev gradient class
const getTaskGradientClass = (index) => {
    const gradients = [
        'bg-gradient-to-r from-[#0891b2] to-[#0e7490]',
        'bg-gradient-to-r from-[#3b82f6] to-[#1d4ed8]',
        'bg-gradient-to-r from-[#10b981] to-[#059669]',
        'bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed]',
        'bg-gradient-to-r from-[#f97316] to-[#ea580c]',
        'bg-gradient-to-r from-[#ec4899] to-[#be185d]',
        'bg-gradient-to-r from-[#6366f1] to-[#4f46e5]',
        'bg-gradient-to-r from-[#ef4444] to-[#dc2626]',
        'bg-gradient-to-r from-[#eab308] to-[#ca8a04]',
        'bg-gradient-to-r from-[#14b8a6] to-[#0d9488]'
    ];
    return gradients[index % gradients.length];
};

// Ünvan icon class
const getTitleIconClass = (index) => {
    const classes = [
        'bg-cyan-100 dark:bg-cyan-900 text-cyan-600 dark:text-cyan-400',
        'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400', 
        'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400',
        'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400',
        'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400',
        'bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-400',
        'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400',
        'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400',
        'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400',
        'bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-400'
    ];
    return classes[index % classes.length];
};

// Ünvan gradient class
const getTitleGradientClass = (index) => {
    const gradients = [
        'bg-gradient-to-r from-[#0891b2] to-[#0e7490]',
        'bg-gradient-to-r from-[#3b82f6] to-[#1d4ed8]',
        'bg-gradient-to-r from-[#10b981] to-[#059669]',
        'bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed]',
        'bg-gradient-to-r from-[#f97316] to-[#ea580c]',
        'bg-gradient-to-r from-[#ec4899] to-[#be185d]',
        'bg-gradient-to-r from-[#6366f1] to-[#4f46e5]',
        'bg-gradient-to-r from-[#ef4444] to-[#dc2626]',
        'bg-gradient-to-r from-[#eab308] to-[#ca8a04]',
        'bg-gradient-to-r from-[#14b8a6] to-[#0d9488]'
    ];
    return gradients[index % gradients.length];
};

// Sözleşme türü icon class
const getContractIconClass = (index) => {
    const classes = [
        'bg-cyan-100 dark:bg-cyan-900 text-cyan-600 dark:text-cyan-400',
        'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400', 
        'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400',
        'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400',
        'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400'
    ];
    return classes[index % classes.length];
};

// Sözleşme türü gradient class
const getContractGradientClass = (index) => {
    const gradients = [
        'bg-gradient-to-r from-[#0891b2] to-[#0e7490]',
        'bg-gradient-to-r from-[#3b82f6] to-[#1d4ed8]',
        'bg-gradient-to-r from-[#10b981] to-[#059669]',
        'bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed]',
        'bg-gradient-to-r from-[#f97316] to-[#ea580c]'
    ];
    return gradients[index % gradients.length];
};

// Sözleşme türü dağılımı için computed
// Ad soyadları düzgün formatlama fonksiyonu
const formatName = (fullName: string) => {
    if (!fullName) return '';
    
    const words = fullName.toLowerCase().split(' ');
    const formattedWords = words.map(word => {
        if (word.length === 0) return '';
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    
    if (formattedWords.length >= 3) {
        const [firstName, middleName, lastName] = formattedWords;
        return `${firstName} ${middleName} ${lastName}`;
    } else if (formattedWords.length === 2) {
        const [firstName, lastName] = formattedWords;
        return `${firstName} ${lastName}`;
    } else {
        const [firstName, middleName, lastName] = formattedWords;
        return `${firstName} ${middleName} ${lastName}`;
    }
};

const refreshDashboard = async () => {
    await loadExcelData();
    // Burada chart verilerini de yenileyebiliriz
    initializeCharts();
};

const initializeCharts = () => {
    // Chart.js ile grafikleri initialize edecek kod buraya gelecek
    // Şimdilik placeholder olarak bırakıyoruz
    console.log('Charts initialized');
};

// Initialize
onMounted(() => {
    console.log('Component mounted');
    loadExcelData();
    loadUDMData();
    initializeCharts();
    
    // ApexCharts Pie Chart initialize with timeout - DOM'un hazır olması için bekle
    setTimeout(() => {
        console.log('Starting pie chart initialization...');
        initializePieChart();
    }, 1000);
    
    // Eğer ilk deneme başarısız olursa, yedek deneme
    setTimeout(() => {
        const pieChartElement = document.querySelector('[data-pie-chart]');
        if (pieChartElement && pieChartElement.innerHTML.includes('yükleniyor')) {
            console.log('Pie chart still loading, retrying...');
            initializePieChart();
        }
    }, 3000);
});

// Pie Chart initialization function
const initializePieChart = () => {
    console.log('initializePieChart called');
    
    // Element'in var olduğunu kontrol et
    const pieChartElement = document.querySelector('[data-pie-chart]');
    if (!pieChartElement) {
        console.error('Pie chart element not found! Retrying in 1 second...');
        setTimeout(() => initializePieChart(), 1000);
        return;
    }
    
    console.log('Pie chart element found:', pieChartElement);
    
    // ApexCharts kütüphanesini dinamik olarak yükle
    const loadApexCharts = () => {
        return new Promise((resolve, reject) => {
            // Eğer ApexCharts zaten yüklenmişse direkt kullan
            if (typeof window !== 'undefined' && (window as any).ApexCharts) {
                console.log('ApexCharts already loaded');
                resolve((window as any).ApexCharts);
                return;
            }
            
            console.log('Loading ApexCharts...');
            // ApexCharts script'ini dinamik olarak yükle
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/apexcharts';
            script.onload = () => {
                console.log('ApexCharts loaded successfully');
                resolve((window as any).ApexCharts);
            };
            script.onerror = (error) => {
                console.error('Error loading ApexCharts:', error);
                reject(error);
            };
            document.head.appendChild(script);
        });
    };
    
    loadApexCharts().then((ApexCharts) => {
        console.log('ApexCharts ready, creating chart...');
        
        // Fallback içeriği temizle
        if (pieChartElement) {
            pieChartElement.innerHTML = '';
        }
        
        const isDark = document.documentElement.classList.contains('dark');
        
        // UDM ekip verilerini hazırla
        const distribution = udmTeamDistribution.value;
        const teamNames = Object.keys(distribution);
        const teamCounts = Object.values(distribution);
        
        // Takım isimlerini kısalt
        const shortTeamNames = teamNames.map(name => {
            if (name.includes('Kent Güvenliği')) return 'Kent Güvenliği';
            if (name.includes('Tesis ve Saha')) return 'Tesis ve Saha';
            if (name.includes('IT Sis.')) return 'IT Sistem';
            if (name.includes('Ulaşım')) return 'Ulaşım/Akıllı';
            if (name.includes('Alt Yüklenici')) return 'Alt Yüklenici';
            return name;
        });
        
        const pieChartOptions = {
            series: teamCounts.length > 0 ? teamCounts : [45, 32, 28, 18, 15],
            chart: {
                height: 300,
                type: 'pie',
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                },
                background: 'transparent'
            },
            labels: teamNames.length > 0 ? shortTeamNames : ['ÜDM', 'UGES', 'Lojistik', 'Teknik', 'İdari'],
            colors: ['#4361ee', '#805dca', '#00ab55', '#e7515a', '#e2a03f'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom',
                        fontSize: '12px'
                    }
                }
            }],
            stroke: {
                show: false,
            },
            legend: {
                position: 'bottom',
                fontSize: '13px',
                labels: {
                    colors: isDark ? '#e5e7eb' : '#374151'
                }
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '0%'
                    }
                }
            },
            tooltip: {
                y: {
                    formatter: function(val: number) {
                        return val + " kişi"
                    }
                },
                theme: isDark ? 'dark' : 'light'
            }
        };
        
        try {
            const pieChart = new (ApexCharts as any)(pieChartElement, pieChartOptions);
            pieChart.render().then(() => {
                console.log('Pie chart rendered successfully');
            }).catch((error: any) => {
                console.error('Error rendering pie chart:', error);
                // Hata durumunda fallback content göster
                if (pieChartElement) {
                    pieChartElement.innerHTML = '<div class="text-center p-4"><p class="text-red-500">Grafik yüklenemedi</p></div>';
                }
            });
        } catch (error) {
            console.error('Error creating pie chart:', error);
            // Hata durumunda fallback content göster
            if (pieChartElement) {
                pieChartElement.innerHTML = '<div class="text-center p-4"><p class="text-red-500">Grafik yüklenemedi</p></div>';
            }
        }
    }).catch((error) => {
        console.error('ApexCharts yüklenirken hata oluştu:', error);
        // Hata durumunda fallback content göster
        if (pieChartElement) {
            pieChartElement.innerHTML = '<div class="text-center p-4"><p class="text-red-500">ApexCharts yüklenemedi</p></div>';
        }
    });
};
</script>

<style scoped>
/* Custom Scrollbar Styles */
.overflow-y-auto::-webkit-scrollbar {
    width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
}

/* Dark mode scrollbar */
.dark .overflow-y-auto::-webkit-scrollbar-track {
    background: #374151;
}

.dark .overflow-y-auto::-webkit-scrollbar-thumb {
    background: #6b7280;
}

.dark .overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
}
</style>
