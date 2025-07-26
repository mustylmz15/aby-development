<template>
    <div>
        <div class="panel mb-5">
            <div class="flex items-center justify-between mb-5">
                <h5 class="font-semibold text-lg dark:text-white-light">Sistem Raporları</h5>
                <div class="flex items-center gap-2">
                    <button type="button" class="btn btn-info gap-2" @click="refreshReports">
                        <icon-refresh class="w-4 h-4" />
                        Yenile
                    </button>
                    <button type="button" class="btn btn-success gap-2" @click="exportAllReports">
                        <icon-download class="w-4 h-4" />
                        Tümünü Dışa Aktar
                    </button>
                </div>
            </div>

            <!-- Filtre ve Arama -->
            <div class="mb-5 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label class="block text-sm font-medium mb-2">Rapor Kategorisi</label>
                    <select v-model="selectedCategory" class="form-select">
                        <option value="">Tüm Kategoriler</option>
                        <option value="transfer">Transfer Raporları</option>
                        <option value="repair">Onarım Raporları</option>
                        <option value="inventory">Envanter Raporları</option>
                        <option value="performance">Performans Raporları</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Tarih Aralığı</label>
                    <select v-model="selectedDateRange" class="form-select">
                        <option value="today">Bugün</option>
                        <option value="week">Bu Hafta</option>
                        <option value="month">Bu Ay</option>
                        <option value="quarter">Son 3 Ay</option>
                        <option value="year">Bu Yıl</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Durum</label>
                    <select v-model="selectedStatus" class="form-select">
                        <option value="">Tüm Durumlar</option>
                        <option value="aktif">Aktif</option>
                        <option value="tamamlandi">Tamamlandı</option>
                        <option value="beklemede">Beklemede</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Arama</label>
                    <input v-model="searchTerm" type="text" class="form-input" placeholder="Rapor ara..." />
                </div>
            </div>
        </div>

        <!-- Rapor Kartları Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
            <!-- Transfer Raporları Özet Kartı -->
            <div class="panel bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <div class="flex items-center justify-between mb-5">
                    <h5 class="font-semibold text-lg">Transfer Raporları</h5>
                    <div class="bg-white/20 rounded-full p-2">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                        </svg>
                    </div>
                </div>
                <div class="text-3xl font-bold mb-2">{{ reportStats.transfers.total }}</div>
                <div class="text-white/80 text-sm">Toplam Transfer</div>
                <div class="mt-4 flex items-center justify-between text-sm">
                    <span>Bu Ay: {{ reportStats.transfers.thisMonth }}</span>
                    <span :class="reportStats.transfers.trend >= 0 ? 'text-green-200' : 'text-red-200'">
                        {{ reportStats.transfers.trend >= 0 ? '+' : '' }}{{ reportStats.transfers.trend }}%
                    </span>
                </div>
            </div>

            <!-- Onarım Raporları Özet Kartı -->
            <div class="panel bg-gradient-to-r from-green-500 to-green-600 text-white">
                <div class="flex items-center justify-between mb-5">
                    <h5 class="font-semibold text-lg">Onarım Raporları</h5>
                    <div class="bg-white/20 rounded-full p-2">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                    </div>
                </div>
                <div class="text-3xl font-bold mb-2">{{ reportStats.repairs.total }}</div>
                <div class="text-white/80 text-sm">Toplam Onarım</div>
                <div class="mt-4 flex items-center justify-between text-sm">
                    <span>Tamamlanan: {{ reportStats.repairs.completed }}</span>
                    <span class="text-green-200">%{{ reportStats.repairs.successRate }} başarı</span>
                </div>
            </div>

            <!-- Envanter Raporları Özet Kartı -->
            <div class="panel bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <div class="flex items-center justify-between mb-5">
                    <h5 class="font-semibold text-lg">Envanter Raporları</h5>
                    <div class="bg-white/20 rounded-full p-2">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 10l3-3 3 3"></path>
                        </svg>
                    </div>
                </div>
                <div class="text-3xl font-bold mb-2">{{ reportStats.inventory.totalProducts }}</div>
                <div class="text-white/80 text-sm">Toplam Ürün</div>
                <div class="mt-4 flex items-center justify-between text-sm">
                    <span>Düşük Stok: {{ reportStats.inventory.lowStock }}</span>
                    <span class="text-yellow-200">{{ reportStats.inventory.warehouses }} depo</span>
                </div>
            </div>
        </div>

        <!-- Detaylı Rapor Tablosu -->
        <div class="panel">
            <div class="flex items-center justify-between mb-5">
                <h5 class="font-semibold text-lg dark:text-white-light">Detaylı Rapor Listesi</h5>
                <div class="flex items-center gap-2">
                    <button type="button" class="btn btn-outline-primary btn-sm" @click="showCreateReportModal = true">
                        <icon-plus class="w-4 h-4 mr-1" />
                        Yeni Rapor
                    </button>
                </div>
            </div>

            <div class="datatables">
                <table class="table-hover">
                    <thead>
                        <tr>
                            <th>Rapor Adı</th>
                            <th>Kategori</th>
                            <th>Tarih</th>
                            <th>Durum</th>
                            <th>Kayıt Sayısı</th>
                            <th>Son Güncelleme</th>
                            <th class="text-center">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="report in filteredReports" :key="report.id">
                            <td>
                                <div class="flex items-center gap-2">
                                    <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                                         :class="getCategoryBadgeClass(report.category)">
                                        {{ getCategoryIcon(report.category) }}
                                    </div>
                                    <div>
                                        <div class="font-medium">{{ report.name }}</div>
                                        <div class="text-xs text-gray-500">{{ report.description }}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span class="badge" :class="getCategoryBadgeClass(report.category)">
                                    {{ getCategoryName(report.category) }}
                                </span>
                            </td>
                            <td>{{ formatDate(report.date) }}</td>
                            <td>
                                <span class="badge" :class="getStatusBadgeClass(report.status)">
                                    {{ getStatusName(report.status) }}
                                </span>
                            </td>
                            <td>{{ report.recordCount.toLocaleString() }}</td>
                            <td>{{ formatDateTime(report.lastUpdated) }}</td>
                            <td class="text-center">
                                <div class="flex items-center justify-center gap-2">
                                    <button type="button" class="btn btn-outline-info btn-sm" @click="viewReport(report)">
                                        <icon-eye class="w-4 h-4" />
                                    </button>
                                    <button type="button" class="btn btn-outline-success btn-sm" @click="exportReport(report)">
                                        <icon-download class="w-4 h-4" />
                                    </button>
                                    <button type="button" class="btn btn-outline-warning btn-sm" @click="editReport(report)">
                                        <icon-edit class="w-4 h-4" />
                                    </button>
                                    <button type="button" class="btn btn-outline-danger btn-sm" @click="deleteReport(report)">
                                        <icon-trash class="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Yeni Rapor Modal -->
        <div class="fixed inset-0 bg-[black]/60 z-[999] hidden overflow-y-auto" :class="{ '!block': showCreateReportModal }">
            <div class="flex items-start justify-center min-h-screen px-4 pt-20">
                <div class="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8">
                    <div class="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                        <h5 class="font-bold text-lg">Yeni Rapor Oluştur</h5>
                        <button type="button" @click="showCreateReportModal = false" class="text-white-dark hover:text-dark">
                            <icon-x />
                        </button>
                    </div>
                    <div class="p-5">
                        <form @submit.prevent="createReport">
                            <div class="mb-4">
                                <label class="block text-sm font-medium mb-2">Rapor Adı</label>
                                <input v-model="newReport.name" type="text" class="form-input" placeholder="Rapor adı girin" required />
                            </div>
                            <div class="mb-4">
                                <label class="block text-sm font-medium mb-2">Kategori</label>
                                <select v-model="newReport.category" class="form-select" required>
                                    <option value="">Kategori seçin</option>
                                    <option value="transfer">Transfer Raporları</option>
                                    <option value="repair">Onarım Raporları</option>
                                    <option value="inventory">Envanter Raporları</option>
                                    <option value="performance">Performans Raporları</option>
                                </select>
                            </div>
                            <div class="mb-4">
                                <label class="block text-sm font-medium mb-2">Açıklama</label>
                                <textarea v-model="newReport.description" class="form-textarea" rows="3" placeholder="Rapor açıklaması"></textarea>
                            </div>
                            <div class="flex justify-end gap-3">
                                <button type="button" @click="showCreateReportModal = false" class="btn btn-outline-dark">İptal</button>
                                <button type="submit" class="btn btn-primary">Oluştur</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Rapor Detay Modal -->
        <div class="fixed inset-0 bg-[black]/60 z-[999] hidden overflow-y-auto" :class="{ '!block': showReportDetailModal }">
            <div class="flex items-start justify-center min-h-screen px-4 pt-10">
                <div class="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-4xl my-8">
                    <div class="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                                 :class="getCategoryBadgeClass(selectedReportDetail?.category)">
                                {{ getCategoryIcon(selectedReportDetail?.category) }}
                            </div>
                            <h5 class="font-bold text-lg">{{ selectedReportDetail?.name }}</h5>
                        </div>
                        <button type="button" @click="showReportDetailModal = false" class="text-white-dark hover:text-dark">
                            <icon-x />
                        </button>
                    </div>
                    <div class="p-5 max-h-96 overflow-y-auto">
                        <!-- Transfer Raporu Detayı -->
                        <div v-if="selectedReportDetail?.category === 'transfer'" class="space-y-4">
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                                    <div class="text-2xl font-bold text-blue-600">{{ transferDetails.totalTransfers }}</div>
                                    <div class="text-sm text-gray-600 dark:text-gray-400">Toplam Transfer</div>
                                </div>
                                <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                                    <div class="text-2xl font-bold text-green-600">{{ transferDetails.completedTransfers }}</div>
                                    <div class="text-sm text-gray-600 dark:text-gray-400">Tamamlanan</div>
                                </div>
                                <div class="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                                    <div class="text-2xl font-bold text-orange-600">{{ transferDetails.pendingTransfers }}</div>
                                    <div class="text-sm text-gray-600 dark:text-gray-400">Bekleyen</div>
                                </div>
                            </div>
                            <h6 class="font-semibold mb-3">Son Transfer Hareketleri</h6>
                            <div class="space-y-2">
                                <div v-for="transfer in transferDetails.recentTransfers" :key="transfer.id" 
                                     class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <div class="flex items-center gap-3">
                                        <div class="w-2 h-2 rounded-full" :class="transfer.status === 'completed' ? 'bg-green-500' : 'bg-orange-500'"></div>
                                        <div>
                                            <div class="font-medium">{{ transfer.product }}</div>
                                            <div class="text-sm text-gray-500">{{ transfer.fromWarehouse }} → {{ transfer.toWarehouse }}</div>
                                        </div>
                                    </div>
                                    <div class="text-right">
                                        <div class="font-medium">{{ transfer.quantity }} adet</div>
                                        <div class="text-sm text-gray-500">{{ formatDate(transfer.date) }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Onarım Raporu Detayı -->
                        <div v-else-if="selectedReportDetail?.category === 'repair'" class="space-y-4">
                            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                                <div class="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                                    <div class="text-2xl font-bold text-red-600">{{ repairDetails.totalRepairs }}</div>
                                    <div class="text-sm text-gray-600 dark:text-gray-400">Toplam Arıza</div>
                                </div>
                                <div class="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                                    <div class="text-2xl font-bold text-yellow-600">{{ repairDetails.inProgress }}</div>
                                    <div class="text-sm text-gray-600 dark:text-gray-400">Onarımda</div>
                                </div>
                                <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                                    <div class="text-2xl font-bold text-green-600">{{ repairDetails.completed }}</div>
                                    <div class="text-sm text-gray-600 dark:text-gray-400">Tamamlanan</div>
                                </div>
                                <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                                    <div class="text-2xl font-bold text-blue-600">{{ repairDetails.returned }}</div>
                                    <div class="text-sm text-gray-600 dark:text-gray-400">Geri Gönderilen</div>
                                </div>
                            </div>
                            <h6 class="font-semibold mb-3">Ürün Yaşam Döngüleri</h6>
                            <div class="space-y-4">
                                <div v-for="lifecycle in repairDetails.lifecycles" :key="lifecycle.id" 
                                     class="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                                    <div class="flex items-center justify-between mb-3">
                                        <div class="font-medium text-lg">{{ lifecycle.product }}</div>
                                        <span class="badge" :class="getLifecycleBadgeClass(lifecycle.currentStage)">
                                            {{ lifecycle.currentStage }}
                                        </span>
                                    </div>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                        <div>
                                            <span class="text-sm text-gray-500">Seri No:</span>
                                            <span class="font-medium ml-2">{{ lifecycle.serialNumber }}</span>
                                        </div>
                                        <div>
                                            <span class="text-sm text-gray-500">Arıza Türü:</span>
                                            <span class="font-medium ml-2">{{ lifecycle.faultType }}</span>
                                        </div>
                                    </div>
                                    <div class="relative">
                                        <div class="flex items-center justify-between text-xs text-gray-500 mb-2">
                                            <span>Arıza Bildirimi</span>
                                            <span>Onarım</span>
                                            <span>Test</span>
                                            <span>Geri Gönderim</span>
                                        </div>
                                        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                                            <div class="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                                                 :style="{ width: lifecycle.progress + '%' }"></div>
                                        </div>
                                        <div class="text-right text-xs text-gray-500">{{ lifecycle.progress }}% tamamlandı</div>
                                    </div>
                                    <div class="mt-3 space-y-2">
                                        <div v-for="stage in lifecycle.stages" :key="stage.name" 
                                             class="flex items-center justify-between text-sm">
                                            <div class="flex items-center gap-2">
                                                <div class="w-2 h-2 rounded-full" 
                                                     :class="stage.completed ? 'bg-green-500' : stage.active ? 'bg-blue-500' : 'bg-gray-300'"></div>
                                                <span :class="stage.completed ? 'text-green-600' : stage.active ? 'text-blue-600' : 'text-gray-500'">
                                                    {{ stage.name }}
                                                </span>
                                            </div>
                                            <span class="text-gray-500">{{ stage.date || '-' }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Envanter Raporu Detayı -->
                        <div v-else-if="selectedReportDetail?.category === 'inventory'" class="space-y-4">
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                                    <div class="text-2xl font-bold text-blue-600">{{ inventoryDetails.totalProducts }}</div>
                                    <div class="text-sm text-gray-600 dark:text-gray-400">Toplam Ürün</div>
                                </div>
                                <div class="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                                    <div class="text-2xl font-bold text-red-600">{{ inventoryDetails.criticalStock }}</div>
                                    <div class="text-sm text-gray-600 dark:text-gray-400">Kritik Stok</div>
                                </div>
                                <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                                    <div class="text-2xl font-bold text-green-600">{{ inventoryDetails.inStock }}</div>
                                    <div class="text-sm text-gray-600 dark:text-gray-400">Stokta</div>
                                </div>
                            </div>
                            <h6 class="font-semibold mb-3">Kritik Stok Ürünleri</h6>
                            <div class="space-y-2">
                                <div v-for="item in inventoryDetails.criticalItems" :key="item.id" 
                                     class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <div class="flex items-center gap-3">
                                        <div class="w-3 h-3 rounded-full bg-red-500"></div>
                                        <div>
                                            <div class="font-medium">{{ item.name }}</div>
                                            <div class="text-sm text-gray-500">Kategori: {{ item.category }}</div>
                                        </div>
                                    </div>
                                    <div class="text-right">
                                        <div class="font-medium text-red-600">{{ item.currentStock }} / {{ item.minStock }}</div>
                                        <div class="text-sm text-gray-500">{{ item.warehouse }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Performans Raporu Detayı -->
                        <div v-else-if="selectedReportDetail?.category === 'performance'" class="space-y-4">
                            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                                <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                                    <div class="text-2xl font-bold text-green-600">{{ performanceDetails.efficiency }}%</div>
                                    <div class="text-sm text-gray-600 dark:text-gray-400">Genel Verimlilik</div>
                                </div>
                                <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                                    <div class="text-2xl font-bold text-blue-600">{{ performanceDetails.avgProcessTime }}h</div>
                                    <div class="text-sm text-gray-600 dark:text-gray-400">Ort. İşlem Süresi</div>
                                </div>
                                <div class="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                                    <div class="text-2xl font-bold text-purple-600">{{ performanceDetails.throughput }}</div>
                                    <div class="text-sm text-gray-600 dark:text-gray-400">Günlük Kapasite</div>
                                </div>
                                <div class="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                                    <div class="text-2xl font-bold text-orange-600">{{ performanceDetails.errorRate }}%</div>
                                    <div class="text-sm text-gray-600 dark:text-gray-400">Hata Oranı</div>
                                </div>
                            </div>
                            <h6 class="font-semibold mb-3">Depo Performansları</h6>
                            <div class="space-y-3">
                                <div v-for="warehouse in performanceDetails.warehouses" :key="warehouse.id" 
                                     class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <div class="flex items-center justify-between mb-2">
                                        <div class="font-medium">{{ warehouse.name }}</div>
                                        <div class="text-sm text-gray-500">Verimlilik: {{ warehouse.efficiency }}%</div>
                                    </div>
                                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                        <div class="bg-green-600 h-2 rounded-full transition-all duration-300" 
                                             :style="{ width: warehouse.efficiency + '%' }"></div>
                                    </div>
                                    <div class="flex justify-between text-xs text-gray-500 mt-2">
                                        <span>İşlem: {{ warehouse.processed }}</span>
                                        <span>Bekleme: {{ warehouse.pending }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="px-5 py-3 bg-gray-50 dark:bg-gray-800 flex justify-end gap-3">
                        <button type="button" @click="exportReport(selectedReportDetail)" class="btn btn-success btn-sm">
                            <icon-download class="w-4 h-4 mr-1" />
                            Dışa Aktar
                        </button>
                        <button type="button" @click="closeReportDetail" class="btn btn-outline-dark btn-sm">Kapat</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useMeta } from '@/composables/use-meta';

// Meta bilgileri
useMeta({ title: 'Sistem Raporları' });

// Icons
import IconRefresh from '@/components/icon/icon-refresh.vue';
import IconDownload from '@/components/icon/icon-download.vue';
import IconPlus from '@/components/icon/icon-plus.vue';
import IconEye from '@/components/icon/icon-eye.vue';
import IconEdit from '@/components/icon/icon-edit.vue';
import IconTrash from '@/components/icon/icon-trash.vue';
import IconX from '@/components/icon/icon-x.vue';

// Reactive data
const selectedCategory = ref('');
const selectedDateRange = ref('month');
const selectedStatus = ref('');
const searchTerm = ref('');
const showCreateReportModal = ref(false);
const showReportDetailModal = ref(false);
const selectedReportDetail = ref<any>(null);

// Yeni rapor formu
const newReport = ref({
    name: '',
    category: '',
    description: ''
});

// Detay verileri
const transferDetails = ref({
    totalTransfers: 234,
    completedTransfers: 189,
    pendingTransfers: 45,
    recentTransfers: [
        {
            id: 1,
            product: 'Laptop Dell XPS 13',
            fromWarehouse: 'Merkez Depo',
            toWarehouse: 'Şube A',
            quantity: 5,
            status: 'completed',
            date: '2024-12-14'
        },
        {
            id: 2,
            product: 'iPhone 15 Pro',
            fromWarehouse: 'Şube B',
            toWarehouse: 'Merkez Depo',
            quantity: 12,
            status: 'pending',
            date: '2024-12-15'
        },
        {
            id: 3,
            product: 'Samsung Galaxy S24',
            fromWarehouse: 'Depo C',
            toWarehouse: 'Şube A',
            quantity: 8,
            status: 'completed',
            date: '2024-12-13'
        }
    ]
});

const repairDetails = ref({
    totalRepairs: 156,
    inProgress: 23,
    completed: 98,
    returned: 87,
    lifecycles: [
        {
            id: 1,
            product: 'MacBook Pro 14"',
            serialNumber: 'MBP-2024-001',
            faultType: 'Ekran Arızası',
            currentStage: 'Test Aşaması',
            progress: 75,
            stages: [
                { name: 'Arıza Bildirimi', completed: true, active: false, date: '10.12.2024' },
                { name: 'Ön İnceleme', completed: true, active: false, date: '11.12.2024' },
                { name: 'Onarım Süreci', completed: true, active: false, date: '12.12.2024' },
                { name: 'Test Aşaması', completed: false, active: true, date: '15.12.2024' },
                { name: 'Geri Gönderim', completed: false, active: false, date: null }
            ]
        },
        {
            id: 2,
            product: 'HP Pavilion 15',
            serialNumber: 'HP-2024-045',
            faultType: 'Klavye Arızası',
            currentStage: 'Onarım Süreci',
            progress: 50,
            stages: [
                { name: 'Arıza Bildirimi', completed: true, active: false, date: '12.12.2024' },
                { name: 'Ön İnceleme', completed: true, active: false, date: '13.12.2024' },
                { name: 'Onarım Süreci', completed: false, active: true, date: '14.12.2024' },
                { name: 'Test Aşaması', completed: false, active: false, date: null },
                { name: 'Geri Gönderim', completed: false, active: false, date: null }
            ]
        },
        {
            id: 3,
            product: 'Lenovo ThinkPad X1',
            serialNumber: 'TP-2024-089',
            faultType: 'Güç Kaynağı',
            currentStage: 'Geri Gönderim',
            progress: 100,
            stages: [
                { name: 'Arıza Bildirimi', completed: true, active: false, date: '08.12.2024' },
                { name: 'Ön İnceleme', completed: true, active: false, date: '09.12.2024' },
                { name: 'Onarım Süreci', completed: true, active: false, date: '10.12.2024' },
                { name: 'Test Aşaması', completed: true, active: false, date: '11.12.2024' },
                { name: 'Geri Gönderim', completed: true, active: false, date: '12.12.2024' }
            ]
        }
    ]
});

const inventoryDetails = ref({
    totalProducts: 15420,
    criticalStock: 67,
    inStock: 14893,
    criticalItems: [
        {
            id: 1,
            name: 'USB-C Kablo',
            category: 'Aksesuar',
            currentStock: 5,
            minStock: 50,
            warehouse: 'Merkez Depo'
        },
        {
            id: 2,
            name: 'iPhone 15 Kılıfı',
            category: 'Koruyucu',
            currentStock: 12,
            minStock: 100,
            warehouse: 'Şube A'
        },
        {
            id: 3,
            name: 'Laptop Adaptörü',
            category: 'Güç Kaynağı',
            currentStock: 8,
            minStock: 25,
            warehouse: 'Depo B'
        },
        {
            id: 4,
            name: 'Wireless Mouse',
            category: 'Aksesuar',
            currentStock: 3,
            minStock: 30,
            warehouse: 'Merkez Depo'
        }
    ]
});

const performanceDetails = ref({
    efficiency: 87.5,
    avgProcessTime: 2.3,
    throughput: 1250,
    errorRate: 3.2,
    warehouses: [
        {
            id: 1,
            name: 'Merkez Depo',
            efficiency: 92,
            processed: 1850,
            pending: 45
        },
        {
            id: 2,
            name: 'Şube A Depo',
            efficiency: 85,
            processed: 1240,
            pending: 32
        },
        {
            id: 3,
            name: 'Şube B Depo',
            efficiency: 78,
            processed: 890,
            pending: 67
        },
        {
            id: 4,
            name: 'Depo C',
            efficiency: 90,
            processed: 1560,
            pending: 23
        }
    ]
});

// Rapor istatistikleri
const reportStats = ref({
    transfers: {
        total: 1547,
        thisMonth: 234,
        trend: 12.5
    },
    repairs: {
        total: 892,
        completed: 756,
        successRate: 84.7
    },
    inventory: {
        totalProducts: 15420,
        lowStock: 67,
        warehouses: 12
    }
});

// Mock rapor verisi
const reports = ref([
    {
        id: 1,
        name: 'Aylık Depo Transfer Raporu',
        category: 'transfer',
        description: 'Depolar arası ürün transfer hareketleri',
        date: '2024-12-01',
        status: 'tamamlandi',
        recordCount: 2340,
        lastUpdated: '2024-12-15T10:30:00'
    },
    {
        id: 2,
        name: 'Arızalı Ürün Yaşam Döngüsü',
        category: 'repair',
        description: 'Ürünün arızalanma-onarım-geri gönderim süreci',
        date: '2024-12-05',
        status: 'aktif',
        recordCount: 456,
        lastUpdated: '2024-12-15T14:45:00'
    },
    {
        id: 3,
        name: 'Kritik Stok Seviyeleri',
        category: 'inventory',
        description: 'Minimum stok seviyesinin altındaki ürünler',
        date: '2024-12-10',
        status: 'beklemede',
        recordCount: 89,
        lastUpdated: '2024-12-14T16:20:00'
    },
    {
        id: 4,
        name: 'Depo Performans Analizi',
        category: 'performance',
        description: 'Depoların operasyonel verimliliği',
        date: '2024-12-12',
        status: 'tamamlandi',
        recordCount: 1250,
        lastUpdated: '2024-12-15T09:15:00'
    },
    {
        id: 5,
        name: 'Onarım Süre Analizi',
        category: 'repair',
        description: 'Onarım işlemlerinin ortalama tamamlanma süreleri',
        date: '2024-12-08',
        status: 'aktif',
        recordCount: 678,
        lastUpdated: '2024-12-15T12:30:00'
    },
    {
        id: 6,
        name: 'Proje Malzeme Tüketimi',
        category: 'inventory',
        description: 'Projelerde kullanılan malzeme analizi',
        date: '2024-12-03',
        status: 'tamamlandi',
        recordCount: 3420,
        lastUpdated: '2024-12-14T11:45:00'
    },
    {
        id: 7,
        name: 'Tedarikçi Transfer Raporları',
        category: 'transfer',
        description: 'Tedarikçilerden gelen ürün hareketleri',
        date: '2024-12-07',
        status: 'aktif',
        recordCount: 567,
        lastUpdated: '2024-12-15T15:10:00'
    },
    {
        id: 8,
        name: 'Kalite Kontrol Sonuçları',
        category: 'repair',
        description: 'Onarım sonrası kalite kontrol test sonuçları',
        date: '2024-12-11',
        status: 'beklemede',
        recordCount: 234,
        lastUpdated: '2024-12-14T17:00:00'
    }
]);

// Computed properties
const filteredReports = computed(() => {
    let filtered = [...reports.value];

    if (selectedCategory.value) {
        filtered = filtered.filter(r => r.category === selectedCategory.value);
    }

    if (selectedStatus.value) {
        filtered = filtered.filter(r => r.status === selectedStatus.value);
    }

    if (searchTerm.value) {
        const term = searchTerm.value.toLowerCase();
        filtered = filtered.filter(r => 
            r.name.toLowerCase().includes(term) ||
            r.description.toLowerCase().includes(term)
        );
    }

    return filtered;
});

// Methods
const getCategoryBadgeClass = (category: string) => {
    const classes = {
        transfer: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        repair: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        inventory: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
        performance: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
    };
    return classes[category] || 'bg-gray-100 text-gray-800';
};

const getCategoryIcon = (category: string) => {
    const icons = {
        transfer: '↔️',
        repair: '🔧',
        inventory: '📦',
        performance: '📊'
    };
    return icons[category] || '📋';
};

const getCategoryName = (category: string) => {
    const names = {
        transfer: 'Transfer',
        repair: 'Onarım',
        inventory: 'Envanter',
        performance: 'Performans'
    };
    return names[category] || category;
};

const getStatusBadgeClass = (status: string) => {
    const classes = {
        aktif: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        tamamlandi: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        beklemede: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
    };
    return classes[status] || 'bg-gray-100 text-gray-800';
};

const getStatusName = (status: string) => {
    const names = {
        aktif: 'Aktif',
        tamamlandi: 'Tamamlandı',
        beklemede: 'Beklemede'
    };
    return names[status] || status;
};

const getLifecycleBadgeClass = (stage: string) => {
    const classes = {
        'Arıza Bildirimi': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        'Ön İnceleme': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
        'Onarım Süreci': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        'Test Aşaması': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        'Geri Gönderim': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    };
    return classes[stage] || 'bg-gray-100 text-gray-800';
};

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('tr-TR');
};

const formatDateTime = (date: string) => {
    return new Date(date).toLocaleString('tr-TR');
};

const refreshReports = () => {
    // API çağrısı simülasyonu
    console.log('Raporlar yenileniyor...');
};

const exportAllReports = () => {
    console.log('Tüm raporlar dışa aktarılıyor...');
};

const viewReport = (report: any) => {
    selectedReportDetail.value = report;
    showReportDetailModal.value = true;
    console.log('Rapor detayı gösteriliyor:', report.name);
};

const closeReportDetail = () => {
    showReportDetailModal.value = false;
    selectedReportDetail.value = null;
};

const exportReport = (report: any) => {
    console.log('Rapor dışa aktarılıyor:', report.name);
};

const editReport = (report: any) => {
    console.log('Rapor düzenleniyor:', report.name);
};

const deleteReport = (report: any) => {
    console.log('Rapor siliniyor:', report.name);
    const index = reports.value.findIndex(r => r.id === report.id);
    if (index > -1) {
        reports.value.splice(index, 1);
    }
};

const createReport = () => {
    const report = {
        id: reports.value.length + 1,
        name: newReport.value.name,
        category: newReport.value.category,
        description: newReport.value.description,
        date: new Date().toISOString().split('T')[0],
        status: 'aktif',
        recordCount: Math.floor(Math.random() * 1000) + 100,
        lastUpdated: new Date().toISOString()
    };

    reports.value.unshift(report);
    
    // Formu temizle
    newReport.value = {
        name: '',
        category: '',
        description: ''
    };
    
    showCreateReportModal.value = false;
    console.log('Yeni rapor oluşturuldu:', report.name);
};

onMounted(() => {
    // Sayfa yüklendiğinde yapılacak işlemler
});
</script>

<style scoped>
.badge {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    font-weight: 500;
    border-radius: 9999px;
}

.table-hover tbody tr:hover {
    background-color: rgb(249 250 251);
}

:global(.dark) .table-hover tbody tr:hover {
    background-color: rgba(31, 41, 55, 0.2);
}
</style>
