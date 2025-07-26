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
          <span class="text-gray-800 dark:text-gray-200 font-semibold">Depo Envanter Listesi</span>
        </li>
      </ul>
    </nav>

    <div class="pt-2">
      <div class="panel shadow-lg rounded-2xl bg-white dark:bg-[#23272f] p-6">
        <!-- Modern Header -->
        <div class="mb-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="p-3 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl shadow-lg">
                <i class="fa fa-boxes text-2xl text-white"></i>
              </div>
              <div>
                <h5 class="font-bold text-2xl text-gray-900 dark:text-white tracking-tight">Depo Envanter Listesi</h5>
                <p class="text-gray-600 dark:text-gray-300 mt-1 text-lg font-medium">Depo seçerek envanter görüntüleyebilirsiniz</p>
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

       
        <!-- Envanter Filtreleme Component -->
        <InventoryFilter 
          :selected-warehouse="selectedWarehouse"
          :selected-status="selectedStatus"
          :search-term="searchTerm"
          :warehouses="filteredWarehouses"
          :is-warehouse-user="isWarehouseUser"
          :assigned-warehouse-name="getWarehouseName(userAssignedWarehouseId)"
          :selected-warehouse-data="selectedWarehouseData"
          :total-items="filteredInventory.length"
          :available-items="availableCount"
          :reserved-items="reservedCount"
          @warehouse-change="handleWarehouseChange"
          @status-change="selectedStatus = $event"
          @search-change="searchTerm = $event"
          @clear-filters="clearAllFilters"
        />

        <!-- Loading state -->
        <div v-if="isLoading" class="bg-white dark:bg-gray-800 rounded-b-2xl shadow-lg border border-gray-100 dark:border-gray-700 border-t-0 flex flex-col justify-center items-center py-16">
          <div class="relative">
            <div class="animate-spin rounded-full h-16 w-16 border-4 border-emerald-200 border-t-emerald-600"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <i class="fa fa-boxes text-emerald-600 text-xl"></i>
            </div>
          </div>
          <div class="mt-6 text-center">
            <h3 class="text-lg font-bold text-gray-800 dark:text-gray-100">Envanter yükleniyor...</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 mt-1 font-medium">Lütfen bekleyiniz...</p>
          </div>
        </div>

        <!-- No warehouse selected -->
        <div v-else-if="!selectedWarehouse && !isWarehouseUser" class="bg-white dark:bg-gray-800 rounded-b-2xl shadow-lg border border-gray-100 dark:border-gray-700 border-t-0 text-center py-16">
          <div class="mx-auto mb-6 w-20 h-20 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center">
            <i class="fa fa-warehouse text-3xl text-emerald-500"></i>
          </div>
          <div class="max-w-md mx-auto">
            <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Depo Seçiniz</h3>
            <p class="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed font-medium">
              Envanter listesini görüntülemek için yukarıdaki filtreden bir depo seçiniz.
            </p>
          </div>
        </div>

        <!-- Empty inventory -->
        <div v-else-if="filteredInventory.length === 0" class="bg-white dark:bg-gray-800 rounded-b-2xl shadow-lg border border-gray-100 dark:border-gray-700 border-t-0 text-center py-16">
          <div class="mx-auto mb-6 w-20 h-20 bg-gray-100 dark:bg-gray-900/20 rounded-full flex items-center justify-center">
            <i class="fa fa-box-open text-3xl text-gray-400"></i>
          </div>
          <div class="max-w-md mx-auto">
            <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Envanter Bulunamadı</h3>
            <p class="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed font-medium">
              Seçili depoda {{ searchTerm || selectedStatus ? 'filtrelere uygun' : '' }} envanter bulunamadı.
            </p>
          </div>
        </div>

        <!-- Inventory Table - Filtreleme ile bitişik -->
        <div v-else class="bg-white dark:bg-gray-800 rounded-b-2xl shadow-lg border border-gray-100 dark:border-gray-700 border-t-0 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead>
                <tr class="bg-gradient-to-r from-gray-800 to-gray-700 dark:from-gray-700 dark:to-gray-600">
                  <th class="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                    <div class="flex items-center gap-2">
                      <i class="fa fa-hashtag"></i>
                      <span>Ürün Kodu</span>
                    </div>
                  </th>
                  <th class="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                    <div class="flex items-center gap-2">
                      <i class="fa fa-cube"></i>
                      <span>Ürün</span>
                    </div>
                  </th>
                  <th class="px-6 py-4 text-center text-sm font-bold text-white uppercase tracking-wider">
                    <div class="flex items-center justify-center gap-2">
                      <i class="fa fa-cubes"></i>
                      <span>Toplam Miktar</span>
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
                  :key="`${item.productCode}`"
                  class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  :class="{ 'bg-gray-50 dark:bg-gray-750': index % 2 === 1 }"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="text-sm font-mono text-gray-900 dark:text-gray-100 font-bold">{{ item.productCode }}</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center gap-3">
                      <div class="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <i class="fa fa-cube text-white text-sm"></i>
                      </div>
                      <div>
                        <div class="text-sm font-bold text-gray-900 dark:text-gray-100">{{ item.productName }}</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">{{ item.category }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-center">
                    <div class="text-lg font-bold text-gray-900 dark:text-gray-100">{{ item.totalQuantity || item.quantity }}</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">{{ item.unit || 'adet' }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-center">
                    <button 
                      @click="openItemDetail(item)"
                      class="inline-flex items-center px-4 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200 text-sm font-medium"
                    >
                      <i class="fa fa-eye mr-2"></i>
                      Detay Görüntüle
                    </button>
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
                <p class="text-green-100 text-sm font-medium">Depoda Ürün</p>
                <p class="text-2xl font-bold">{{ availableCount }}</p>
              </div>
              <i class="fa fa-warehouse text-2xl text-green-200"></i>
            </div>
          </div>
          
          <div class="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-4 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-yellow-100 text-sm font-medium">Rezerve</p>
                <p class="text-2xl font-bold">{{ reservedCount }}</p>
              </div>
              <i class="fa fa-lock text-2xl text-yellow-200"></i>
            </div>
          </div>
          
          <div class="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-4 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-red-100 text-sm font-medium">Hasarlı</p>
                <p class="text-2xl font-bold">{{ damagedCount }}</p>
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
              <div class="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <i class="fa fa-cube text-xl text-white"></i>
              </div>
              <div>
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Ürün Detayı</h3>
                <p class="text-gray-600 dark:text-gray-300">Ürün bilgileri ve stok durumu</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              
              <!-- Print Button -->
              <button 
                @click="printItemDetail"
                class="inline-flex items-center px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg font-medium transition-colors duration-200 gap-2"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                    <span class="text-gray-600 dark:text-gray-300 font-medium">Seri No Sayısı:</span>
                    <span class="text-gray-900 dark:text-gray-100 font-bold">{{ selectedItem.serialNumbers ? selectedItem.serialNumbers.length : (selectedItem.serialNumber && selectedItem.serialNumber !== '-' ? 1 : 0) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-300 font-medium">Birim:</span>
                    <span class="text-gray-900 dark:text-gray-100">{{ selectedItem.unit || 'adet' }}</span>
                  </div>
                </div>
              </div>

              <!-- Sağ Panel - Stok Bilgileri -->
              <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-700">
                <h4 class="text-lg font-bold text-green-900 dark:text-green-100 mb-4 flex items-center gap-2">
                  <i class="fa fa-cubes"></i>
                  Stok Bilgileri
                </h4>
                <div class="space-y-3">
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600 dark:text-gray-300 font-medium">Toplam Miktar:</span>
                    <div class="text-right">
                      <span class="text-2xl font-bold text-gray-900 dark:text-gray-100">{{ selectedItem.totalQuantity || selectedItem.quantity }}</span>
                      <span class="text-gray-600 dark:text-gray-300 ml-2">{{ selectedItem.unit || 'adet' }}</span>
                    </div>
                  </div>
                  
                  
                </div>
              </div>
            </div>

            <!-- Depo ve Tarih Bilgileri -->
            <div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600 mb-6">
              <h4 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <i class="fa fa-warehouse"></i>
                Konum ve Tarih Bilgileri
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-300 font-medium">Depo:</span>
                    <span class="text-gray-900 dark:text-gray-100 font-semibold">{{ getWarehouseName(selectedItem.warehouseId) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-300 font-medium">Depo Tipi:</span>
                    <span class="text-gray-900 dark:text-gray-100">{{ getWarehouseTypeLabel(selectedWarehouseData?.type || '') }}</span>
                  </div>
                </div>
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-300 font-medium">Son Güncelleme:</span>
                    <span class="text-gray-900 dark:text-gray-100">{{ formatDetailedDate(selectedItem.lastUpdated) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-300 font-medium">Kayıt Tarihi:</span>
                    <span class="text-gray-900 dark:text-gray-100">{{ formatDetailedDate(selectedItem.lastUpdated) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Seri Numaraları ve Detay Bilgileri Tablosu -->
            <div v-if="selectedItem.serialNumbers && selectedItem.serialNumbers.length > 0" class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-700 mb-6">
              <h4 class="text-lg font-bold text-purple-900 dark:text-purple-100 mb-4 flex items-center gap-2">
                <i class="fa fa-tags"></i>
                Seri Numaraları ve Detay Bilgileri ({{ selectedItem.serialNumbers.length }} adet)
              </h4>
              <div class="overflow-x-auto">
                <table class="min-w-full">
                  <thead>
                    <tr class="bg-purple-100 dark:bg-purple-900/30">
                      <th class="px-4 py-2 text-left text-sm font-bold text-purple-900 dark:text-purple-100">ID</th>
                      <th class="px-4 py-2 text-left text-sm font-bold text-purple-900 dark:text-purple-100">Seri Numarası</th>
                      <th class="px-4 py-2 text-center text-sm font-bold text-purple-900 dark:text-purple-100">Miktar</th>
                      <th class="px-4 py-2 text-left text-sm font-bold text-purple-900 dark:text-purple-100">Depo</th>
                      <th class="px-4 py-2 text-center text-sm font-bold text-purple-900 dark:text-purple-100">Durum</th>
                      <th class="px-4 py-2 text-left text-sm font-bold text-purple-900 dark:text-purple-100">Son Güncelleme</th>
                      <th class="px-4 py-2 text-center text-sm font-bold text-purple-900 dark:text-purple-100">Koşul</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-purple-200 dark:divide-purple-700">
                    <tr v-for="serial in selectedItem.serialNumbers" :key="serial.id" class="hover:bg-purple-50 dark:hover:bg-purple-900/20">
                      <td class="px-4 py-2">
                        <span class="text-sm font-mono text-gray-900 dark:text-gray-100">{{ serial.id }}</span>
                      </td>
                      <td class="px-4 py-2">
                        <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200">
                          <i class="fa fa-tag text-xs"></i>
                          {{ serial.serialNumber }}
                        </span>
                      </td>
                      <td class="px-4 py-2 text-center">
                        <span class="font-bold text-gray-900 dark:text-gray-100">{{ serial.quantity }}</span>
                      </td>
                      <td class="px-4 py-2">
                        <div class="flex items-center gap-2">
                          <div class="w-3 h-3 bg-emerald-500 rounded-full"></div>
                          <span class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ getWarehouseName(serial.warehouseId) }}</span>
                        </div>
                      </td>
                      <td class="px-4 py-2 text-center">
                        <span :class="getStatusBadgeClass(serial.status)" class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold">
                          <i :class="getStatusIcon(serial.status)" class="text-xs"></i>
                          {{ getStatusLabel(serial.status) }}
                        </span>
                      </td>
                      <td class="px-4 py-2">
                        <span class="text-sm text-gray-600 dark:text-gray-400">{{ formatDetailedDate(serial.lastUpdated) }}</span>
                      </td>
                      <td class="px-4 py-2 text-center">
                        <span v-if="serial.condition" class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200">
                          <i class="fa fa-exclamation-triangle text-xs"></i>
                          {{ serial.condition }}
                        </span>
                        <span v-else class="text-green-600 dark:text-green-400 text-sm">Normal</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Eğer seri numarası yoksa, genel item bilgilerini göster -->
            <div v-else-if="selectedItem.items && selectedItem.items.length > 0" class="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-700 mb-6">
              <h4 class="text-lg font-bold text-indigo-900 dark:text-indigo-100 mb-4 flex items-center gap-2">
                <i class="fa fa-list"></i>
                Stok Detay Bilgileri ({{ selectedItem.items.length }} kayıt)
              </h4>
              <div class="overflow-x-auto">
                <table class="min-w-full">
                  <thead>
                    <tr class="bg-indigo-100 dark:bg-indigo-900/30">
                      <th class="px-4 py-2 text-left text-sm font-bold text-indigo-900 dark:text-indigo-100">ID</th>
                      <th class="px-4 py-2 text-center text-sm font-bold text-indigo-900 dark:text-indigo-100">Miktar</th>
                      <th class="px-4 py-2 text-left text-sm font-bold text-indigo-900 dark:text-indigo-100">Depo</th>
                      <th class="px-4 py-2 text-center text-sm font-bold text-indigo-900 dark:text-indigo-100">Durum</th>
                      <th class="px-4 py-2 text-left text-sm font-bold text-indigo-900 dark:text-indigo-100">Son Güncelleme</th>
                      <th class="px-4 py-2 text-center text-sm font-bold text-indigo-900 dark:text-indigo-100">Koşul</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-indigo-200 dark:divide-indigo-700">
                    <tr v-for="item in selectedItem.items" :key="item.id" class="hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
                      <td class="px-4 py-2">
                        <span class="text-sm font-mono text-gray-900 dark:text-gray-100">{{ item.id }}</span>
                      </td>
                      <td class="px-4 py-2 text-center">
                        <span class="font-bold text-gray-900 dark:text-gray-100">{{ item.quantity }}</span>
                      </td>
                      <td class="px-4 py-2">
                        <div class="flex items-center gap-2">
                          <div class="w-3 h-3 bg-emerald-500 rounded-full"></div>
                          <span class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ getWarehouseName(item.warehouseId) }}</span>
                        </div>
                      </td>
                      <td class="px-4 py-2 text-center">
                        <span :class="getStatusBadgeClass(item.status)" class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold">
                          <i :class="getStatusIcon(item.status)" class="text-xs"></i>
                          {{ getStatusLabel(item.status) }}
                        </span>
                      </td>
                      <td class="px-4 py-2">
                        <span class="text-sm text-gray-600 dark:text-gray-400">{{ formatDetailedDate(item.lastUpdated) }}</span>
                      </td>
                      <td class="px-4 py-2 text-center">
                        <span v-if="item.condition" class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200">
                          <i class="fa fa-exclamation-triangle text-xs"></i>
                          {{ item.condition }}
                        </span>
                        <span v-else class="text-green-600 dark:text-green-400 text-sm">Normal</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
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

          <!-- Modal footer
          <div class="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
            <button 
              @click="closeDetailModal"
              class="px-6 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg font-medium transition-colors duration-200"
            >
              Kapat
            </button>
          </div>
           -->
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
import InventoryFilter from './components/InventoryFilter.vue'

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

// Aynı ürünleri gruplayıp toplu göster (stok numarası bazında)
const filteredInventory = computed(() => {
  let items = warehouseInventory.value
  
  // ANA FİLTRE: Sadece DEPO durumundaki ürünleri göster
  items = items.filter(item => item.status === 'DEPO')
  
  // EK FİLTRE: Kullanıcı başka bir durum seçmişse (DEPO dışında)
  if (selectedStatus.value && selectedStatus.value !== 'DEPO') {
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
  
  // Gruplama: aynı ürün koduna sahip ürünleri birleştir (depo ve durum fark etmeksizin)
  const grouped: Record<string, any> = {}
  
  for (const item of items) {
    // Gruplama anahtarı: sadece ürün kodu
    const key = item.productCode
    
    if (!grouped[key]) {
      grouped[key] = { 
        ...item,
        serialNumbers: [],     // Seri numaralarını topla
        totalQuantity: 0,      // Toplam miktar
        items: [],             // Tüm item'ları sakla
        allStatuses: new Set(), // Tüm durumları topla
        lastUpdated: item.lastUpdated // İlk item'ın tarihini al
      }
    }
    
    // Miktar ekle
    grouped[key].totalQuantity += item.quantity
    
    // Durum ekle
    grouped[key].allStatuses.add(item.status)
    
    // Seri numarası varsa ve boş değilse ekle
    if (item.serialNumber && item.serialNumber !== '-' && item.serialNumber !== '') {
      grouped[key].serialNumbers.push({
        serialNumber: item.serialNumber,
        quantity: item.quantity,
        id: item.id,
        lastUpdated: item.lastUpdated,
        condition: item.condition,
        status: item.status,
        warehouseId: item.warehouseId
      })
    }
    
    // Tüm item'ı sakla (detay için)
    grouped[key].items.push(item)
    
    // En son güncellenen tarihi al
    if (item.lastUpdated > grouped[key].lastUpdated) {
      grouped[key].lastUpdated = item.lastUpdated
    }
  }
  
  // Gruplananları döndür ve ana durum belirle
  const result = Object.values(grouped).map((group: any) => {
    const statusArray = Array.from(group.allStatuses)
    // Öncelik sırası: AVAILABLE > RESERVED > IN_USE > IN_REPAIR > DAMAGED > diğerleri
    const statusPriority = ['AVAILABLE', 'RESERVED', 'IN_USE', 'IN_REPAIR', 'DAMAGED']
    const primaryStatus = statusPriority.find(s => statusArray.includes(s)) || statusArray[0]
    
    return {
      ...group,
      status: primaryStatus,
      quantity: group.totalQuantity,
      statusCount: statusArray.length > 1 ? statusArray.length : 1
    }
  })
  
  // Tarihe göre azalan sırala
  result.sort((a, b) => (b.lastUpdated > a.lastUpdated ? 1 : -1))
  return result
})

const totalPages = computed(() => Math.ceil(filteredInventory.value.length / itemsPerPage))
const paginatedInventory = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredInventory.value.slice(start, end)
})
const totalInventoryValue = computed(() => {
  return filteredInventory.value.reduce((total, item) => total + (item.quantity * (item.unitPrice || 0)), 0)
})
const availableCount = computed(() => {
  return filteredInventory.value.filter(item => item.status === 'DEPO').length
})
const reservedCount = computed(() => {
  return filteredInventory.value.filter(item => item.status === 'RESERVED').length
})
const damagedCount = computed(() => {
  return filteredInventory.value.filter(item => item.status === 'DAMAGED' || item.condition === 'DAMAGED').length
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
    // Diğer alanlar gerekiyorsa eklenebilir
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
    'ARIZALI': 'DAMAGED',
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

// Yeni event handler'lar
const handleWarehouseChange = async (warehouseId: string) => {
  selectedWarehouse.value = warehouseId
  await onWarehouseChange()
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

const openItemDetail = (item: StockItem) => {
  selectedItem.value = item
  showDetailModal.value = true
}

const closeDetailModal = () => {
  showDetailModal.value = false
  selectedItem.value = null
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

const getWarehouseTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    'CENTRAL': 'Merkez Depo',
    'STANDARD': 'Standart Depo',
    'REPAIR': 'Onarım Merkezi',
    'FIELD': 'Saha Depo',
    'TRANSIT': 'Transfer Deposu'
  }
  return labels[type] || type
}

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    'DEPO': 'Depoda',
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
    'DEPO': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200',
    'AVAILABLE': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200',
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
    'DEPO': 'fa fa-warehouse',
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

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY'
  }).format(amount)
}

const exportInventory = () => {
  console.log('Excel export başlatılıyor...')
  // TODO: Excel export işlemi
}

const printInventory = () => {
  // Yazdırma için özel HTML oluştur
  const printContent = generatePrintContent()
  
  // Yeni pencere aç ve yazdır
  const printWindow = window.open('', '_blank')
  if (printWindow) {
    printWindow.document.write(printContent)
    printWindow.document.close()
    printWindow.focus()
    printWindow.print()
    printWindow.close()
  }
}

const printItemDetail = () => {
  if (!selectedItem.value) return
  
  // Ürün detayı yazdırma için özel HTML oluştur
  const printContent = generateItemDetailPrintContent()
  
  // Yeni pencere aç ve yazdır
  const printWindow = window.open('', '_blank')
  if (printWindow) {
    printWindow.document.write(printContent)
    printWindow.document.close()
    printWindow.focus()
    printWindow.print()
    printWindow.close()
  }
}

const generatePrintContent = () => {
  const warehouseName = selectedWarehouseData.value?.name || 'Seçili Depo'
  const currentDate = new Date().toLocaleDateString('tr-TR')
  
  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Depo Envanter Listesi - ${warehouseName}</title>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
        .header h1 { margin: 0; color: #333; }
        .header p { margin: 5px 0; color: #666; }
        .info { margin-bottom: 20px; }
        .info-item { display: inline-block; margin-right: 30px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f5f5f5; font-weight: bold; }
        .status-available { color: #16a34a; }
        .status-reserved { color: #eab308; }
        .status-damaged { color: #dc2626; }
        .status-in-repair { color: #ea580c; }
        .footer { margin-top: 30px; text-align: center; color: #666; font-size: 12px; }
        @media print {
          body { margin: 0; }
          .header { break-after: avoid; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Depo Envanter Listesi</h1>
        <p><strong>${warehouseName}</strong></p>
        <p>Rapor Tarihi: ${currentDate}</p>
      </div>
      
      <div class="info">
        <div class="info-item"><strong>Toplam Ürün:</strong> ${filteredInventory.value.length}</div>
        <div class="info-item"><strong>Mevcut:</strong> ${availableCount.value}</div>
        <div class="info-item"><strong>Rezerve:</strong> ${reservedCount.value}</div>
        <div class="info-item"><strong>Hasarlı:</strong> ${damagedCount.value}</div>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Ürün Adı</th>
            <th>Ürün Kodu</th>
            <th>Seri No</th>
            <th>Miktar</th>
            <th>Durum</th>
            <th>Son Güncelleme</th>
          </tr>
        </thead>
        <tbody>
  `
  
  filteredInventory.value.forEach(item => {
    const statusClass = item.status === 'AVAILABLE' ? 'status-available' : 
                       item.status === 'RESERVED' ? 'status-reserved' :
                       item.status === 'DAMAGED' ? 'status-damaged' :
                       item.status === 'IN_REPAIR' ? 'status-in-repair' : ''
    
    html += `
          <tr>
            <td>${item.id}</td>
            <td>${item.productName}</td>
            <td>${item.productCode}</td>
            <td>${item.serialNumber || '-'}</td>
            <td>${item.quantity} ${item.unit || 'adet'}</td>
            <td class="${statusClass}">${getStatusLabel(item.status)}</td>
            <td>${formatDate(item.lastUpdated)}</td>
          </tr>
    `
  })
  
  html += `
        </tbody>
      </table>
      
      <div class="footer">
        <p>Bu rapor ${currentDate} tarihinde otomatik olarak oluşturulmuştur.</p>
      </div>
    </body>
    </html>
  `
  
  return html
}

const generateItemDetailPrintContent = () => {
  if (!selectedItem.value) return ''
  
  const item = selectedItem.value
  const warehouseName = getWarehouseName(item.warehouseId)
  const currentDate = new Date().toLocaleDateString('tr-TR')
  const currentTime = new Date().toLocaleTimeString('tr-TR')
  
  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Ürün Detay Raporu - ${item.productCode}</title>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #2563eb; padding-bottom: 20px; }
        .header h1 { margin: 0; color: #2563eb; font-size: 28px; }
        .header p { margin: 5px 0; color: #666; font-size: 14px; }
        .section { margin-bottom: 25px; padding: 15px; border: 1px solid #e5e7eb; border-radius: 8px; }
        .section h3 { margin: 0 0 15px 0; color: #374151; font-size: 18px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .info-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f3f4f6; }
        .info-label { font-weight: bold; color: #6b7280; }
        .info-value { color: #111827; }
        .status-badge { padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }
        .status-available { background: #dcfce7; color: #166534; }
        .status-reserved { background: #fef3c7; color: #92400e; }
        .status-damaged { background: #fee2e2; color: #991b1b; }
        .status-in-repair { background: #fed7aa; color: #9a3412; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        th, td { border: 1px solid #d1d5db; padding: 10px; text-align: left; font-size: 13px; }
        th { background-color: #f9fafb; font-weight: bold; color: #374151; }
        .footer { margin-top: 40px; text-align: center; color: #6b7280; font-size: 12px; border-top: 1px solid #e5e7eb; padding-top: 20px; }
        @media print {
          body { margin: 0; }
          .header { break-after: avoid; }
          .section { break-inside: avoid; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Ürün Detay Raporu</h1>
        <p><strong>${item.productName}</strong> (${item.productCode})</p>
        <p>Yazdırma Tarihi: ${currentDate} ${currentTime}</p>
      </div>
      
      <div class="section">
        <h3>📦 Temel Bilgiler</h3>
        <div class="info-grid">
          <div>
            <div class="info-item">
              <span class="info-label">Ürün Kodu:</span>
              <span class="info-value">${item.productCode}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Ürün Adı:</span>
              <span class="info-value">${item.productName}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Kategori:</span>
              <span class="info-value">${item.category}</span>
            </div>
          </div>
          <div>
            <div class="info-item">
              <span class="info-label">Toplam Miktar:</span>
              <span class="info-value">${item.totalQuantity || item.quantity} ${item.unit || 'adet'}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Durum:</span>
              <span class="info-value">
                <span class="status-badge status-${item.status.toLowerCase().replace('_', '-')}">${getStatusLabel(item.status)}</span>
              </span>
            </div>
            <div class="info-item">
              <span class="info-label">Birim Fiyat:</span>
              <span class="info-value">${formatCurrency(item.unitPrice || 0)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="section">
        <h3>🏪 Depo Bilgileri</h3>
        <div class="info-item">
          <span class="info-label">Depo Adı:</span>
          <span class="info-value">${warehouseName}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Depo Tipi:</span>
          <span class="info-value">${getWarehouseTypeLabel(selectedWarehouseData.value?.type || '')}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Son Güncelleme:</span>
          <span class="info-value">${formatDetailedDate(item.lastUpdated)}</span>
        </div>
      </div>
  `
  
  // Seri numaraları varsa ekle
  if (item.serialNumbers && item.serialNumbers.length > 0) {
    html += `
      <div class="section">
        <h3>🏷️ Seri Numaraları (${item.serialNumbers.length} adet)</h3>
        <table>
          <thead>
            <tr>
              <th>Seri Numarası</th>
              <th>Miktar</th>
              <th>Durum</th>
              <th>Son Güncelleme</th>
              <th>Koşul</th>
            </tr>
          </thead>
          <tbody>
    `
    
    item.serialNumbers.forEach(serial => {
      html += `
            <tr>
              <td>${serial.serialNumber}</td>
              <td>${serial.quantity}</td>
              <td><span class="status-badge status-${serial.status.toLowerCase().replace('_', '-')}">${getStatusLabel(serial.status)}</span></td>
              <td>${formatDetailedDate(serial.lastUpdated)}</td>
              <td>${serial.condition || 'Normal'}</td>
            </tr>
      `
    })
    
    html += `
          </tbody>
        </table>
      </div>
    `
  }
  
  // Genel item'lar varsa ekle
  if (item.items && item.items.length > 0) {
    html += `
      <div class="section">
        <h3>📋 Stok Detayları (${item.items.length} kayıt)</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Miktar</th>
              <th>Durum</th>
              <th>Son Güncelleme</th>
              <th>Koşul</th>
            </tr>
          </thead>
          <tbody>
    `
    
    item.items.forEach(subItem => {
      html += `
            <tr>
              <td>${subItem.id}</td>
              <td>${subItem.quantity}</td>
              <td><span class="status-badge status-${subItem.status.toLowerCase().replace('_', '-')}">${getStatusLabel(subItem.status)}</span></td>
              <td>${formatDetailedDate(subItem.lastUpdated)}</td>
              <td>${subItem.condition || 'Normal'}</td>
            </tr>
      `
    })
    
    html += `
          </tbody>
        </table>
      </div>
    `
  }
  
  // Koşul bilgisi varsa ekle
  if (item.condition) {
    html += `
      <div class="section">
        <h3>⚠️ Ürün Durumu</h3>
        <div class="info-item">
          <span class="info-label">Koşul:</span>
          <span class="info-value">${item.condition}</span>
        </div>
      </div>
    `
  }
  
  html += `
      <div class="footer">
        <p>Bu rapor ${currentDate} ${currentTime} tarihinde <strong>${warehouseName}</strong> deposu için otomatik olarak oluşturulmuştur.</p>
        <p>Toplam değer: <strong>${formatCurrency((item.unitPrice || 0) * (item.totalQuantity || item.quantity))}</strong></p>
      </div>
    </body>
    </html>
  `
  
  return html
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

/* Smooth scrollbar for modal */
.fixed.inset-0.z-50.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.fixed.inset-0.z-50.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}

.fixed.inset-0.z-50.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}
</style>
