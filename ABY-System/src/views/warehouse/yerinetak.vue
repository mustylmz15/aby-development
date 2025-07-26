<template>
  <div>
    <!-- Modern Breadcrumb -->
    <nav class="mb-6">
      <ul class="flex items-center space-x-3 rtl:space-x-reverse">
        <li>
          <a href="javascript:;" class="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-semibold hover:underline transition-colors duration-200">
            <i class="fa fa-warehouse mr-2"></i>
            Depo Yönetimi
          </a>
        </li>
        <li class="text-gray-500 dark:text-gray-400">
          <i class="fa fa-chevron-right text-xs"></i>
        </li>
        <li>
          <span class="text-gray-800 dark:text-gray-200 font-semibold">Yerine Takılacak Ürünler</span>
        </li>
      </ul>
    </nav>

    <div class="pt-2">
      <div class="panel shadow-lg rounded-2xl bg-white dark:bg-[#23272f] p-6">
        <!-- Modern Header -->
        <div class="mb-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="p-3 bg-gradient-to-br from-orange-500 to-red-700 rounded-2xl shadow-lg">
                <i class="fa fa-tools text-2xl text-white"></i>
              </div>
              <div>
                <h5 class="font-bold text-2xl text-gray-900 dark:text-white tracking-tight">Yerine Takılacak Ürünler</h5>
                <p class="text-gray-600 dark:text-gray-300 mt-1 text-lg font-medium">Onarılan ve sahaya takılmaya hazır ürünler</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <!-- Refresh Button -->
              <button 
                type="button"
                class="btn btn-secondary gap-2"
                @click="refreshInventory"
                :disabled="!selectedWarehouse"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"></path>
                </svg>
                Yenile
              </button>
              
              <!-- Print Button -->
              <button 
                type="button"
                class="btn btn-primary gap-2"
                @click="printInventory"
                :disabled="!selectedWarehouse || filteredInventory.length === 0"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 17.9827C4.44655 17.9359 3.51998 17.7626 2.87868 17.1213C2 16.2426 2 14.8284 2 12C2 9.17157 2 7.75736 2.87868 6.87868C3.75736 6 5.17157 6 8 6H16C18.8284 6 20.2426 6 21.1213 6.87868C22 7.75736 22 9.17157 22 12C22 14.8284 22 16.2426 21.1213 17.1213C20.48 17.7626 19.5535 17.9359 18 17.9827" stroke="currentColor" stroke-width="1.5"></path>
                  <path opacity="0.5" d="M9 10H6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                  <path d="M19 14L5 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                  <path d="M18 14V16C18 18.8284 18 20.2426 17.1213 21.1213C16.2426 22 14.8284 22 12 22C9.17157 22 7.75736 22 6.87868 21.1213C6 20.2426 6 18.8284 6 16V14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                  <path opacity="0.5" d="M17.9827 6C17.9359 4.44655 17.7626 3.51998 17.1213 2.87868C16.2427 2 14.8284 2 12 2C9.17158 2 7.75737 2 6.87869 2.87868C6.23739 3.51998 6.06414 4.44655 6.01733 6" stroke="currentColor" stroke-width="1.5"></path>
                  <circle opacity="0.5" cx="17" cy="10" r="1" fill="currentColor"></circle>
                  <path opacity="0.5" d="M15 16.5H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                  <path opacity="0.5" d="M13 19H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                </svg>
                Yazdır
              </button>
            </div>
          </div>
        </div>

        <!-- Filtreleme Alanı (Inline - Component kullanmadan) -->
        <div class="bg-white dark:bg-gray-800 rounded-t-2xl shadow-lg border border-gray-100 dark:border-gray-700 border-b-0 p-6 mb-0">
          <div class="grid grid-cols-1 gap-4" :class="isWarehouseUser ? 'md:grid-cols-4' : 'md:grid-cols-5'">
            
            <!-- Depo Seçimi - Sadece admin/yönetici için göster -->
            <div v-if="!isWarehouseUser">
              <label class="block text-sm font-bold text-gray-800 dark:text-gray-100 mb-2">
                <i class="fa fa-warehouse mr-2 text-emerald-600"></i>
                Depo Seçin
              </label>
              <select 
                v-model="selectedWarehouse" 
                @change="onWarehouseChange"
                class="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
              >
                <option value="">Depo seçiniz...</option>
                <option v-for="warehouse in filteredWarehouses" :key="warehouse.id" :value="warehouse.id">
                  {{ warehouse.name }} - {{ warehouse.city }}
                </option>
              </select>
            </div>

            <!-- Depo personeli için bilgi kartı -->
            <div v-else class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
              <div class="flex items-center gap-3">
                <div class="p-2 bg-blue-500 rounded-lg">
                  <i class="fa fa-user-tag text-white text-sm"></i>
                </div>
                <div>
                  <h4 class="font-semibold text-blue-900 dark:text-blue-100 text-sm">Atanmış Deponuz</h4>
                  <p class="text-blue-700 dark:text-blue-300 text-xs font-medium">
                    {{ getWarehouseName(userAssignedWarehouseId) }}
                  </p>
                </div>
              </div>
            </div>
            
            <!-- Durum Filtresi -->
            <div>
              <label class="block text-sm font-bold text-gray-800 dark:text-gray-100 mb-2">
                <i class="fa fa-info-circle mr-2 text-blue-600"></i>
                Stok Durumu
              </label>
              <select 
                v-model="selectedStatus"
                class="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
              >
                <option value="">Tüm Durumlar</option>
                <option value="ONARILDI">Onarıldı</option>
                <option value="ARIZALI">Arızalı</option>
                <option value="ONARIMDA">Onarımda</option>
                <option value="AVAILABLE">Mevcut</option>
                <option value="RESERVED">Rezerve</option>
                <option value="IN_TRANSIT">Transfer Halinde</option>
                <option value="IN_REPAIR">Onarımda</option>
                <option value="DAMAGED">Hasarlı</option>
              </select>
            </div>
            
            <!-- Arama -->
            <div>
              <label class="block text-sm font-bold text-gray-800 dark:text-gray-100 mb-2">
                <i class="fa fa-search mr-2 text-purple-600"></i>
                Ürün Ara
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i class="fa fa-search text-gray-400"></i>
                </div>
                <input 
                  v-model="searchTerm"
                  type="text"
                  placeholder="Ürün adı, kodu veya seri no..."
                  class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 transition-all duration-200"
                />
              </div>
            </div>
            
            <!-- Temizle Butonu -->
            <div class="flex items-end">
              <button 
                @click="clearAllFilters"
                class="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-4 py-3 text-sm font-bold hover:bg-orange-200 dark:hover:bg-orange-900/50 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200"
              >
                <i class="fa fa-broom"></i>
                <span>Temizle</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Loading state -->
        <div v-if="isLoading" class="bg-white dark:bg-gray-800 rounded-b-2xl shadow-lg border border-gray-100 dark:border-gray-700 border-t-0 flex flex-col justify-center items-center py-16">
          <div class="relative">
            <div class="animate-spin rounded-full h-16 w-16 border-4 border-orange-200 border-t-orange-600"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <i class="fa fa-tools text-orange-600 text-xl"></i>
            </div>
          </div>
          <div class="mt-6 text-center">
            <h3 class="text-lg font-bold text-gray-800 dark:text-gray-100">Ürünler yükleniyor...</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 mt-1 font-medium">Lütfen bekleyiniz...</p>
          </div>
        </div>

        <!-- No warehouse selected -->
        <div v-else-if="!selectedWarehouse && !isWarehouseUser" class="bg-white dark:bg-gray-800 rounded-b-2xl shadow-lg border border-gray-100 dark:border-gray-700 border-t-0 text-center py-16">
          <div class="mx-auto mb-6 w-20 h-20 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
            <i class="fa fa-warehouse text-3xl text-orange-500"></i>
          </div>
          <div class="max-w-md mx-auto">
            <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Depo Seçiniz</h3>
            <p class="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed font-medium">
              Yerine takılacak ürünleri görüntülemek için yukarıdaki filtreden bir depo seçiniz.
            </p>
          </div>
        </div>

        <!-- Empty inventory -->
        <div v-else-if="filteredInventory.length === 0" class="bg-white dark:bg-gray-800 rounded-b-2xl shadow-lg border border-gray-100 dark:border-gray-700 border-t-0 text-center py-16">
          <div class="mx-auto mb-6 w-20 h-20 bg-gray-100 dark:bg-gray-900/20 rounded-full flex items-center justify-center">
            <i class="fa fa-box-open text-3xl text-gray-400"></i>
          </div>
          <div class="max-w-md mx-auto">
            <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Ürün Bulunamadı</h3>
            <p class="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed font-medium">
              Seçili depoda {{ searchTerm || selectedStatus ? 'filtrelere uygun' : '' }} yerine takılacak ürün bulunamadı.
            </p>
          </div>
        </div>

        <!-- Inventory Table - Her satır 1 ürün -->
        <div v-else class="bg-white dark:bg-gray-800 rounded-b-2xl shadow-lg border border-gray-100 dark:border-gray-700 border-t-0 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead>
                <tr class="bg-gradient-to-r from-gray-800 to-gray-700 dark:from-gray-700 dark:to-gray-600">
                  <th class="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                    <div class="flex items-center gap-2">
                      <i class="fa fa-hashtag"></i>
                      <span>ID</span>
                    </div>
                  </th>
                  <th class="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                    <div class="flex items-center gap-2">
                      <i class="fa fa-cube"></i>
                      <span>Ürün</span>
                    </div>
                  </th>
                  <th class="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                    <div class="flex items-center gap-2">
                      <i class="fa fa-barcode"></i>
                      <span>Seri No</span>
                    </div>
                  </th>
                  <th class="px-6 py-4 text-center text-sm font-bold text-white uppercase tracking-wider">
                    <div class="flex items-center justify-center gap-2">
                      <i class="fa fa-cubes"></i>
                      <span>Miktar</span>
                    </div>
                  </th>
                  <th class="px-6 py-4 text-center text-sm font-bold text-white uppercase tracking-wider">
                    <div class="flex items-center justify-center gap-2">
                      <i class="fa fa-info-circle"></i>
                      <span>Durum</span>
                    </div>
                  </th>
                  <th class="px-6 py-4 text-center text-sm font-bold text-white uppercase tracking-wider">
                    <div class="flex items-center justify-center gap-2">
                      <i class="fa fa-clock"></i>
                      <span>Son Güncelleme</span>
                    </div>
                  </th>
                  <th class="px-6 py-4 text-center text-sm font-bold text-white uppercase tracking-wider">
                    <div class="flex items-center justify-center gap-2">
                      <i class="fa fa-cogs"></i>
                      <span>İşlemler</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr 
                  v-for="(item, index) in paginatedInventory" 
                  :key="item.id"
                  class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  :class="{ 'bg-gray-50 dark:bg-gray-750': index % 2 === 1 }"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="text-sm font-mono text-gray-900 dark:text-gray-100 font-bold">{{ item.id }}</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center gap-3">
                      <div class="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <i class="fa fa-cube text-white text-sm"></i>
                      </div>
                      <div>
                        <div class="text-sm font-bold text-gray-900 dark:text-gray-100">{{ item.productName }}</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">{{ item.productCode }} - {{ item.category }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200">
                      <i class="fa fa-tag text-xs"></i>
                      {{ item.serialNumber || '-' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-center">
                    <div class="text-lg font-bold text-gray-900 dark:text-gray-100">{{ item.quantity }}</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">{{ item.unit || 'adet' }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-center">
                    <span :class="getStatusBadgeClass(item.status)" class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold">
                      <i :class="getStatusIcon(item.status)" class="text-xs"></i>
                      {{ getStatusLabel(item.status) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-center">
                    <div class="text-sm text-gray-600 dark:text-gray-400">{{ formatDate(item.lastUpdated) }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-center">
                    <div class="flex items-center justify-center gap-2">
                      <button 
                        @click="openItemDetail(item)"
                        class="inline-flex items-center px-3 py-1 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200 text-xs font-medium"
                      >
                        <i class="fa fa-eye mr-1"></i>
                        Detay
                      </button>
                      
                      <!-- Onarıldı ise Sahaya Takma Butonu -->
                      <button 
                        v-if="item.status === 'ONARILDI'"
                        @click="markAsInstalled(item)"
                        class="inline-flex items-center px-3 py-1 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors duration-200 text-xs font-medium"
                      >
                        <i class="fa fa-check mr-1"></i>
                        Sahaya Tak
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="bg-gray-50 dark:bg-gray-800 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <div class="flex items-center justify-between">
              <div class="text-sm text-gray-700 dark:text-gray-300">
                Toplam <span class="font-bold">{{ filteredInventory.length }}</span> ürün,
                <span class="font-bold">{{ (currentPage - 1) * itemsPerPage + 1 }}</span> - 
                <span class="font-bold">{{ Math.min(currentPage * itemsPerPage, filteredInventory.length) }}</span> arası gösteriliyor
              </div>
              <div class="flex items-center gap-2">
                <button 
                  @click="currentPage = currentPage - 1" 
                  :disabled="currentPage === 1"
                  class="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <i class="fa fa-chevron-left"></i>
                </button>
                
                <span class="px-4 py-2 text-sm font-bold text-gray-900 dark:text-gray-100">
                  {{ currentPage }} / {{ totalPages }}
                </span>
                
                <button 
                  @click="currentPage = currentPage + 1" 
                  :disabled="currentPage === totalPages"
                  class="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <i class="fa fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Summary Statistics -->
        <div v-if="selectedWarehouse && filteredInventory.length > 0" class="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-blue-100 text-sm font-medium">Toplam Ürün</p>
                <p class="text-2xl font-bold">{{ filteredInventory.length }}</p>
              </div>
              <i class="fa fa-cubes text-2xl text-blue-200"></i>
            </div>
          </div>
          
          <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-green-100 text-sm font-medium">Onarıldı</p>
                <p class="text-2xl font-bold">{{ repairedCount }}</p>
              </div>
              <i class="fa fa-check-circle text-2xl text-green-200"></i>
            </div>
          </div>
          
          <div class="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-orange-100 text-sm font-medium">Onarımda</p>
                <p class="text-2xl font-bold">{{ inRepairCount }}</p>
              </div>
              <i class="fa fa-wrench text-2xl text-orange-200"></i>
            </div>
          </div>
          
          <div class="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-4 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-red-100 text-sm font-medium">Arızalı</p>
                <p class="text-2xl font-bold">{{ faultyCount }}</p>
              </div>
              <i class="fa fa-exclamation-triangle text-2xl text-red-200"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Ürün Detay Modal -->
    <div v-if="showDetailModal" class="fixed inset-0 z-50 overflow-y-auto" @click.self="closeDetailModal">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <!-- Background overlay -->
        <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" @click="closeDetailModal"></div>

        <!-- Modal panel -->
        <div class="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
          <!-- Modal header -->
          <div class="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
            <div class="flex items-center gap-3">
              <div class="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg">
                <i class="fa fa-cube text-xl text-white"></i>
              </div>
              <div>
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Ürün Detayı</h3>
                <p class="text-gray-600 dark:text-gray-300">Ürün bilgileri ve durum detayları</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <!-- Close Button -->
              <button 
                @click="closeDetailModal"
                class="px-6 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg font-medium transition-colors duration-200"
               >
                 Kapat
              </button>
              <button 
                @click="closeDetailModal"
                class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <i class="fa fa-times text-xl"></i>
              </button>
            </div>
          </div>

          <!-- Modal content -->
          <div v-if="selectedItem" class="mt-6">
            <!-- Ürün Genel Bilgileri -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <!-- Sol Panel - Temel Bilgiler -->
              <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
                <h4 class="text-lg font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                  <i class="fa fa-info-circle"></i>
                  Temel Bilgiler
                </h4>
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-300 font-medium">ID:</span>
                    <span class="text-gray-900 dark:text-gray-100 font-mono font-bold">{{ selectedItem.id }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-300 font-medium">Ürün Kodu:</span>
                    <span class="text-gray-900 dark:text-gray-100 font-mono font-bold">{{ selectedItem.productCode }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-300 font-medium">Ürün Adı:</span>
                    <span class="text-gray-900 dark:text-gray-100 font-semibold">{{ selectedItem.productName }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-300 font-medium">Kategori:</span>
                    <span class="text-gray-900 dark:text-gray-100">{{ selectedItem.category }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-300 font-medium">Seri No:</span>
                    <span class="text-gray-900 dark:text-gray-100 font-mono">{{ selectedItem.serialNumber || '-' }}</span>
                  </div>
                </div>
              </div>

              <!-- Sağ Panel - Durum Bilgileri -->
              <div class="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-700">
                <h4 class="text-lg font-bold text-orange-900 dark:text-orange-100 mb-4 flex items-center gap-2">
                  <i class="fa fa-info-circle"></i>
                  Durum Bilgileri
                </h4>
                <div class="space-y-3">
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600 dark:text-gray-300 font-medium">Mevcut Durum:</span>
                    <span :class="getStatusBadgeClass(selectedItem.status)" class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold">
                      <i :class="getStatusIcon(selectedItem.status)" class="text-xs"></i>
                      {{ getStatusLabel(selectedItem.status) }}
                    </span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-300 font-medium">Miktar:</span>
                    <span class="text-gray-900 dark:text-gray-100 font-bold">{{ selectedItem.quantity }} {{ selectedItem.unit || 'adet' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-300 font-medium">Depo:</span>
                    <span class="text-gray-900 dark:text-gray-100 font-semibold">{{ getWarehouseName(selectedItem.warehouseId) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-300 font-medium">Son Güncelleme:</span>
                    <span class="text-gray-900 dark:text-gray-100">{{ formatDetailedDate(selectedItem.lastUpdated) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Koşul Bilgisi (varsa) -->
            <div v-if="selectedItem.condition" class="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-700 mb-6">
              <h4 class="text-lg font-bold text-yellow-900 dark:text-yellow-100 mb-3 flex items-center gap-2">
                <i class="fa fa-exclamation-triangle"></i>
                Ürün Durumu
              </h4>
              <p class="text-yellow-800 dark:text-yellow-200">{{ selectedItem.condition }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getStockItemsByWarehouse, type StockItem } from './api/stock-items-api'
import { getWarehouses } from './api/warehouse-api'

const route = useRoute()

// Kullanıcı bilgilerini al
const getUserInfo = () => {
  try {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  } catch (error) {
    console.error('Kullanıcı bilgisi alınamadı:', error)
    return null
  }
}

interface Warehouse {
  id: string
  name: string
  city: string
  type: string
  address?: string
}

const isLoading = ref(false)
const selectedWarehouse = ref('')
const selectedStatus = ref('')
const searchTerm = ref('')
const currentPage = ref(1)
const itemsPerPage = 20

const warehouses = ref<Warehouse[]>([])
const inventoryItems = ref<StockItem[]>([])

// Kullanıcı bilgileri
const userInfo = getUserInfo()
const userAssignedWarehouseId = ref<string>('')

// Depo personeli kontrolü ve atanmış depo ID'si
const checkUserWarehouseAssignment = () => {
  if (!userInfo) return null
  
  // Kullanıcının rollerini kontrol et
  const userRoles = userInfo.roles || []
  const assignments = userInfo.assignments || []
  
  // DEPO_PERSONELI rolü var mı kontrol et
  const isDepoPersoneli = userRoles.includes('DEPO_PERSONELI') || 
                         assignments.some((a: any) => a.role === 'DEPO_PERSONELI')
  
  if (isDepoPersoneli) {
    // WAREHOUSE tipindeki assignment'ı bul
    const warehouseAssignment = assignments.find((a: any) => 
      a.role === 'DEPO_PERSONELI' && a.resourceType === 'WAREHOUSE'
    )
    
    if (warehouseAssignment && warehouseAssignment.resourceId) {
      return warehouseAssignment.resourceId
    }
  }
  
  return null
}

// Depo personeli kontrolü
const isWarehouseUser = computed(() => {
  return !!userAssignedWarehouseId.value
})

// Filtrelenmiş depolar - depo personeli ise sadece atanmış depo
const filteredWarehouses = computed(() => {
  if (isWarehouseUser.value && userAssignedWarehouseId.value) {
    return warehouses.value.filter(w => w.id === userAssignedWarehouseId.value)
  }
  return warehouses.value
})

// Modal state
const showDetailModal = ref(false)
const selectedItem = ref<StockItem | null>(null)

const selectedWarehouseData = computed(() => {
  return warehouses.value.find(w => w.id === selectedWarehouse.value)
})

const warehouseInventory = computed(() => {
  if (!selectedWarehouse.value) return []
  return inventoryItems.value.filter(item => item.warehouseId === selectedWarehouse.value)
})

// DEPO OLMAYAN ürünleri filtrele - Her satır 1 ürün (gruplama yok)
const filteredInventory = computed(() => {
  let items = warehouseInventory.value
  
  // ANA FİLTRE: DEPO olmayan ürünleri göster
  items = items.filter(item => item.status !== 'DEPO')
  
  // EK FİLTRE: Kullanıcı belirli bir durum seçmişse
  if (selectedStatus.value) {
    items = items.filter(item => item.status === selectedStatus.value)
  }
  
  if (searchTerm.value) {
    const search = searchTerm.value.toLowerCase()
    items = items.filter(item => 
      item.productName.toLowerCase().includes(search) ||
      item.productCode.toLowerCase().includes(search) ||
      item.category.toLowerCase().includes(search) ||
      (item.serialNumber && item.serialNumber.toLowerCase().includes(search))
    )
  }
  
  // Gruplama YOK - Her ürün ayrı satır
  // Tarihe göre azalan sırala
  items.sort((a, b) => (b.lastUpdated > a.lastUpdated ? 1 : -1))
  return items
})

const totalPages = computed(() => Math.ceil(filteredInventory.value.length / itemsPerPage))
const paginatedInventory = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredInventory.value.slice(start, end)
})

// İstatistik hesaplamaları
const repairedCount = computed(() => {
  return filteredInventory.value.filter(item => item.status === 'ONARILDI').length
})
const inRepairCount = computed(() => {
  return filteredInventory.value.filter(item => item.status === 'ONARIMDA' || item.status === 'IN_REPAIR').length
})
const faultyCount = computed(() => {
  return filteredInventory.value.filter(item => item.status === 'ARIZALI' || item.status === 'DAMAGED').length
})

// API'den gelen stok ürünlerini UI'ın beklediği yapıya dönüştür
const mapApiStockItemToUi = (item: any): StockItem => {
  return {
    id: item.id,
    productId: item.productId,
    productName: item.product?.name || '-',
    productCode: item.product?.sku || '-',
    category: item.product?.category?.name || '-',
    serialNumber: item.serialNumber || '-',
    quantity: Number(item.quantity) || 0,
    unit: item.product?.unit || 'adet',
    unitPrice: item.unitPrice || item.product?.unitPrice || item.product?.price || 0,
    status: mapStatusToEn(item.status),
    warehouseId: item.currentWarehouseId || item.warehouseId || selectedWarehouse.value,
    lastUpdated: item.updatedAt || item.createdAt,
    condition: item.condition || undefined,
  }
}

// API'den gelen Türkçe statüleri İngilizce'ye çevir
const mapStatusToEn = (status: string) => {
  const map: Record<string, string> = {
    'MEVCUT': 'AVAILABLE',
    'REZERVE': 'RESERVED',
    'TRANSFER HALİNDE': 'IN_TRANSIT',
    'KULLANIMDA': 'IN_USE',
    'ONARIMDA': 'IN_REPAIR',
    'HASARLI': 'DAMAGED',
    'HURDA': 'SCRAPPED',
    'KAYIP': 'LOST',
    'ARIZALI': 'ARIZALI',
    'ONARILDI': 'ONARILDI',
    // İngilizce ise aynen döndür
    'AVAILABLE': 'AVAILABLE',
    'RESERVED': 'RESERVED',
    'IN_TRANSIT': 'IN_TRANSIT',
    'IN_USE': 'IN_USE',
    'IN_REPAIR': 'IN_REPAIR',
    'DAMAGED': 'DAMAGED',
    'SCRAPPED': 'SCRAPPED',
    'LOST': 'LOST',
  }
  return map[status] || status
}

const onWarehouseChange = async () => {
  currentPage.value = 1
  selectedStatus.value = ''
  searchTerm.value = ''
  if (!selectedWarehouse.value) return;
  isLoading.value = true;
  try {
    const items = await getStockItemsByWarehouse(selectedWarehouse.value)
    console.log('API ile gelen stok ürünleri:', items)
    // API'den gelen ürünleri UI'ın beklediği yapıya dönüştür
    inventoryItems.value = Array.isArray(items) ? items.map(mapApiStockItemToUi) : []
  } catch (e) {
    console.error('Stok ürünleri alınamadı:', e)
    inventoryItems.value = []
  } finally {
    isLoading.value = false
  }
}

const clearAllFilters = () => {
  selectedStatus.value = ''
  searchTerm.value = ''
  currentPage.value = 1
}

const refreshInventory = async () => {
  if (selectedWarehouse.value) {
    await onWarehouseChange()
  }
}

const getWarehouseName = (warehouseId: string) => {
  const warehouse = warehouses.value.find(w => w.id === warehouseId)
  return warehouse?.name || 'Bilinmeyen Depo'
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('tr-TR')
}

const formatDetailedDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const openItemDetail = (item: StockItem) => {
  selectedItem.value = item
  showDetailModal.value = true
}

const closeDetailModal = () => {
  showDetailModal.value = false
  selectedItem.value = null
}

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    'ONARILDI': 'Onarıldı',
    'ARIZALI': 'Arızalı',
    'ONARIMDA': 'Onarımda',
    'AVAILABLE': 'Mevcut',
    'RESERVED': 'Rezerve',
    'IN_TRANSIT': 'Transfer Halinde',
    'IN_USE': 'Kullanımda',
    'IN_REPAIR': 'Onarımda',
    'DAMAGED': 'Hasarlı',
    'SCRAPPED': 'Hurda',
    'LOST': 'Kayıp'
  }
  return labels[status] || status
}

const getStatusBadgeClass = (status: string) => {
  const classes: Record<string, string> = {
    'ONARILDI': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200',
    'ARIZALI': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200',
    'ONARIMDA': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200',
    'AVAILABLE': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200',
    'RESERVED': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200',
    'IN_TRANSIT': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200',
    'IN_USE': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200',
    'IN_REPAIR': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200',
    'DAMAGED': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200',
    'SCRAPPED': 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200',
    'LOST': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'
  }
  return classes[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200'
}

const getStatusIcon = (status: string) => {
  const icons: Record<string, string> = {
    'ONARILDI': 'fa fa-check-circle',
    'ARIZALI': 'fa fa-exclamation-triangle',
    'ONARIMDA': 'fa fa-wrench',
    'AVAILABLE': 'fa fa-check-circle',
    'RESERVED': 'fa fa-lock',
    'IN_TRANSIT': 'fa fa-truck',
    'IN_USE': 'fa fa-play-circle',
    'IN_REPAIR': 'fa fa-wrench',
    'DAMAGED': 'fa fa-exclamation-triangle',
    'SCRAPPED': 'fa fa-trash',
    'LOST': 'fa fa-question-circle'
  }
  return icons[status] || 'fa fa-info-circle'
}

// Sahaya takma işlemi
const markAsInstalled = async (item: StockItem) => {
  try {
    // TODO: API çağrısı yapılacak - ürünün durumunu sahaya takıldı olarak güncelle
    console.log('Sahaya takılıyor:', item)
    
    // Şimdilik basit bir onay
    if (confirm(`${item.productName} (${item.serialNumber}) sahaya takılacak. Onaylıyor musunuz?`)) {
      // TODO: API call
      alert('Ürün sahaya takıldı!')
      // Sayfayı yenile
      await refreshInventory()
    }
  } catch (error) {
    console.error('Sahaya takma hatası:', error)
    alert('Bir hata oluştu!')
  }
}

const printInventory = () => {
  // Basit yazdırma işlemi
  window.print()
}

watch([selectedStatus, searchTerm], () => {
  currentPage.value = 1
})

onMounted(async () => {
  try {
    const list = await getWarehouses()
    // city alanı eksikse boş string olarak set et
    warehouses.value = list.map(w => ({
      ...w,
      city: w.city || ''
    }))
    
    // Kullanıcının atanmış deposunu kontrol et
    const assignedWarehouseId = checkUserWarehouseAssignment()
    if (assignedWarehouseId) {
      userAssignedWarehouseId.value = assignedWarehouseId
      // Depo personeli ise otomatik olarak atanmış deposunu seç
      selectedWarehouse.value = assignedWarehouseId
      await onWarehouseChange()
    } else {
      // Query parametresinde warehouseId varsa otomatik seç ve envanter yükle
      const warehouseId = route.query.warehouseId as string
      if (warehouseId && list.some(w => w.id === warehouseId)) {
        selectedWarehouse.value = warehouseId
        await onWarehouseChange()
      }
    }
  } catch (e) {
    console.error('Depo listesi alınamadı:', e)
    warehouses.value = []
  }
})
</script>

<style scoped>
/* Additional custom styles if needed */
.btn {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
  gap: 0.5rem;
}

.btn-primary {
  background-color: #2563eb;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #1d4ed8;
}

.btn-primary:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

.btn-secondary {
  background-color: #059669;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #047857;
}

.btn-secondary:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(5, 150, 105, 0.5);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Modal backdrop blur effect */
.fixed.inset-0.bg-gray-500.bg-opacity-75 {
  backdrop-filter: blur(4px);
}

/* Modal animation */
.inline-block.w-full.max-w-4xl {
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
