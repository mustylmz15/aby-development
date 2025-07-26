<template>
    <div class="panel h-full overflow-hidden">
        <div class="flex items-center justify-between mb-5">
            <h5 class="font-semibold text-lg dark:text-white-light">Personel Görev Bilgileri</h5>
            <button @click="goBack" class="btn btn-outline-secondary btn-sm">
                <icon-arrow-backward class="w-4 h-4 mr-2" />
                Geri Dön
            </button>
        </div>

        <!-- İstatistik Kartları -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div class="panel bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="text-2xl font-bold">{{ totalTasks }}</div>
                        <div class="text-sm opacity-80">Toplam Görev</div>
                    </div>
                    <icon-clipboard-text class="w-10 h-10 opacity-50" />
                </div>
            </div>

            <div class="panel bg-gradient-to-r from-green-500 to-green-600 text-white">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="text-2xl font-bold">{{ activeTasks }}</div>
                        <div class="text-sm opacity-80">Aktif Görevler</div>
                    </div>
                    <icon-circle-check class="w-10 h-10 opacity-50" />
                </div>
            </div>

            <div class="panel bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="text-2xl font-bold">{{ pendingTasks }}</div>
                        <div class="text-sm opacity-80">Bekleyen Görevler</div>
                    </div>
                    <icon-clock class="w-10 h-10 opacity-50" />
                </div>
            </div>

            <div class="panel bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="text-2xl font-bold">{{ completedTasks }}</div>
                        <div class="text-sm opacity-80">Tamamlanan Görevler</div>
                    </div>
                    <icon-checks class="w-10 h-10 opacity-50" />
                </div>
            </div>
        </div>

        <!-- Filtreleme Alanı -->
        <div class="panel mb-5">
            <div class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <!-- Global Arama -->
                    <div>
                        <label class="font-semibold text-sm mb-2 block">Genel Arama</label>
                        <input 
                            v-model="globalFilter" 
                            type="text" 
                            placeholder="Tüm alanlarda ara..." 
                            class="form-input"
                        />
                    </div>

                    <!-- Görev Tipi Filtresi -->
                    <div>
                        <label class="font-semibold text-sm mb-2 block">Görev Tipi</label>
                        <select v-model="taskTypeFilter" class="form-select">
                            <option value="">Tümü</option>
                            <option value="Yurt İçi">Yurt İçi</option>
                            <option value="Yurt Dışı">Yurt Dışı</option>
                        </select>
                    </div>

                    <!-- Durum Filtresi -->
                    <div>
                        <label class="font-semibold text-sm mb-2 block">Durum</label>
                        <select v-model="statusFilter" class="form-select">
                            <option value="">Tümü</option>
                            <option value="Aktif">Aktif</option>
                            <option value="Beklemede">Beklemede</option>
                            <option value="Tamamlandı">Tamamlandı</option>
                        </select>
                    </div>
                </div>

                <!-- Sütun Bazlı Filtreleme -->
                <div>
                    <label class="font-semibold text-sm mb-2 block">Sütun Bazlı Arama</label>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                        <div v-for="header in filteredSearchHeaders" :key="header" class="space-y-1">
                            <label class="text-xs text-gray-600 dark:text-gray-400">{{ header }}</label>
                            <input 
                                v-model="columnFilters[header]" 
                                type="text" 
                                :placeholder="`${header} ara...`" 
                                class="form-input text-sm"
                            />
                        </div>
                    </div>
                </div>

                <!-- Filtre Temizleme -->
                <div class="flex justify-end">
                    <button @click="clearFilters" class="btn btn-outline-danger btn-sm">
                        <icon-refresh class="w-4 h-4 mr-2" />
                        Filtreleri Temizle
                    </button>
                </div>
            </div>
        </div>

        <!-- Tablo ve Sayfalama Kontrolü -->
        <div class="panel">
            <!-- Sayfa Boyutu Seçimi -->
            <div class="flex justify-between items-center mb-4">
                <div class="flex items-center space-x-2">
                    <span class="text-sm font-medium">Sayfa başına:</span>
                    <select v-model="pageSize" @change="currentPage = 1" class="form-select w-20">
                        <option :value="10">10</option>
                        <option :value="25">25</option>
                        <option :value="50">50</option>
                        <option :value="100">100</option>
                        <option :value="500">500</option>
                    </select>
                    <span class="text-sm text-gray-600">
                        Toplam {{ filteredData.length }} kayıttan {{ startRecord }}-{{ endRecord }} arası gösteriliyor
                    </span>
                </div>
            </div>

            <!-- Tablo -->
            <div class="table-responsive" v-if="!isLoading">
                <table class="table-hover">
                    <thead class="sticky top-0 bg-white dark:bg-gray-800 z-10">
                        <tr>
                            <th v-for="header in filteredHeaders" :key="header" 
                                class="border-b border-gray-200 dark:border-gray-600 px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                                {{ header }}
                            </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 dark:divide-gray-600">
                        <tr v-for="row in paginatedData" :key="row.id" 
                            class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                            <td v-for="header in filteredHeaders" :key="`${row.id}-${header}`" 
                                class="px-4 py-3 text-sm border-b border-gray-200 dark:border-gray-600 whitespace-nowrap">
                                <span v-if="header === 'Durum'" 
                                      :class="{
                                        'badge bg-success': row[header] === 'Aktif',
                                        'badge bg-warning': row[header] === 'Beklemede',
                                        'badge bg-secondary': row[header] === 'Tamamlandı',
                                        'badge bg-primary': row[header] && !['Aktif', 'Beklemede', 'Tamamlandı'].includes(row[header])
                                      }">
                                    {{ row[header] || '-' }}
                                </span>
                                <span v-else-if="header === 'Görev Tipi'" 
                                      :class="{
                                        'badge bg-info': row[header] === 'Yurt İçi',
                                        'badge bg-purple': row[header] === 'Yurt Dışı'
                                      }">
                                    {{ row[header] || '-' }}
                                </span>
                                <span v-else>{{ row[header] || '-' }}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Yükleme Durumu -->
            <div v-if="isLoading" class="flex justify-center items-center py-20">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <span class="ml-3 text-lg">Veriler yükleniyor...</span>
            </div>

            <!-- Veri Yok Durumu -->
            <div v-if="!isLoading && filteredData.length === 0" class="text-center py-20">
                <div class="text-gray-500 dark:text-gray-400">
                    <icon-box class="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p class="text-lg font-medium">Gösterilecek veri bulunamadı</p>
                    <p class="text-sm">Filtrelerinizi kontrol edin veya farklı arama kriterleri deneyin</p>
                </div>
            </div>

            <!-- Sayfalama -->
            <div v-if="!isLoading && totalPages > 1" class="flex justify-between items-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
                <div class="text-sm text-gray-600 dark:text-gray-400">
                    Sayfa {{ currentPage }} / {{ totalPages }}
                </div>
                <div class="flex space-x-2">
                    <button 
                        @click="goToPage(1)" 
                        :disabled="currentPage === 1"
                        class="btn btn-outline-primary btn-sm"
                        :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }">
                        İlk
                    </button>
                    <button 
                        @click="goToPage(currentPage - 1)" 
                        :disabled="currentPage === 1"
                        class="btn btn-outline-primary btn-sm"
                        :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }">
                        Önceki
                    </button>
                    
                    <!-- Sayfa Numaraları -->
                    <button 
                        v-for="page in visiblePages" 
                        :key="page"
                        @click="typeof page === 'number' ? goToPage(page) : null"
                        :disabled="typeof page !== 'number'"
                        class="btn btn-sm"
                        :class="{ 
                            'btn-primary': page === currentPage, 
                            'btn-outline-primary': page !== currentPage && typeof page === 'number',
                            'btn-outline-secondary cursor-default': typeof page !== 'number'
                        }">
                        {{ page }}
                    </button>
                    
                    <button 
                        @click="goToPage(currentPage + 1)" 
                        :disabled="currentPage === totalPages"
                        class="btn btn-outline-primary btn-sm"
                        :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }">
                        Sonraki
                    </button>
                    <button 
                        @click="goToPage(totalPages)" 
                        :disabled="currentPage === totalPages"
                        class="btn btn-outline-primary btn-sm"
                        :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }">
                        Son
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useExcel } from '@/composables/use-excel';

// Icons
import IconArrowBackward from '@/components/icon/icon-arrow-backward.vue';
import IconClipboardText from '@/components/icon/icon-clipboard-text.vue';
import IconCircleCheck from '@/components/icon/icon-circle-check.vue';
import IconClock from '@/components/icon/icon-clock.vue';
import IconChecks from '@/components/icon/icon-checks.vue';
import IconBox from '@/components/icon/icon-box.vue';
import IconRefresh from '@/components/icon/icon-refresh.vue';

const router = useRouter();
const { getTaskTableData } = useExcel();

// State
const isLoading = ref(true);
const allData = ref<any[]>([]);
const allHeaders = ref<string[]>([]);

// Filtreleme
const globalFilter = ref('');
const taskTypeFilter = ref('');
const statusFilter = ref('');
const columnFilters = ref<Record<string, string>>({});

// Sayfalama
const currentPage = ref(1);
const pageSize = ref(25);

// Computed Properties
const filteredHeaders = computed(() => {
    return allHeaders.value.filter(header => 
        header !== 'id' && 
        header !== 'originalRowIndex'
    );
});

// Arama için sadeleştirilmiş başlıklar (belirtilen alanlar hariç)
const filteredSearchHeaders = computed(() => {
    const excludedHeaders = [
        'Görev Tipi',
        'Kalem No',
        'Üretim Yeri',
        'Bölüm Ünvan',
        'Masraf Yeri',
        'PYP Tanımı',
        'Başlangıç Tarihi',
        'Bitiş Tarihi'
    ];
    
    return filteredHeaders.value.filter(header => 
        !excludedHeaders.some(excluded => 
            header.toLowerCase().includes(excluded.toLowerCase()) ||
            excluded.toLowerCase().includes(header.toLowerCase())
        )
    );
});

const filteredData = computed(() => {
    let data = allData.value;

    // Global filtre
    if (globalFilter.value) {
        const searchTerm = globalFilter.value.toLowerCase();
        data = data.filter(row => {
            return filteredHeaders.value.some(header => {
                const value = row[header];
                return value && value.toString().toLowerCase().includes(searchTerm);
            });
        });
    }

    // Görev tipi filtresi
    if (taskTypeFilter.value) {
        data = data.filter(row => row['Görev Tipi'] === taskTypeFilter.value);
    }

    // Durum filtresi
    if (statusFilter.value) {
        data = data.filter(row => row['Durum'] === statusFilter.value);
    }

    // Sütun bazlı filtreler
    Object.entries(columnFilters.value).forEach(([column, filterValue]) => {
        if (filterValue) {
            const searchTerm = filterValue.toLowerCase();
            data = data.filter(row => {
                const value = row[column];
                return value && value.toString().toLowerCase().includes(searchTerm);
            });
        }
    });

    return data;
});

const totalPages = computed(() => Math.ceil(filteredData.value.length / pageSize.value));

const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return filteredData.value.slice(start, end);
});

const startRecord = computed(() => {
    return filteredData.value.length === 0 ? 0 : (currentPage.value - 1) * pageSize.value + 1;
});

const endRecord = computed(() => {
    const end = currentPage.value * pageSize.value;
    return Math.min(end, filteredData.value.length);
});

const visiblePages = computed(() => {
    const delta = 2;
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];

    for (let i = Math.max(2, currentPage.value - delta); 
         i <= Math.min(totalPages.value - 1, currentPage.value + delta); 
         i++) {
        range.push(i);
    }

    if (currentPage.value - delta > 2) {
        rangeWithDots.push(1, '...');
    } else {
        rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage.value + delta < totalPages.value - 1) {
        rangeWithDots.push('...', totalPages.value);
    } else if (totalPages.value > 1) {
        rangeWithDots.push(totalPages.value);
    }

    return rangeWithDots.filter((item, index, arr) => arr.indexOf(item) === index);
});

// İstatistikler
const totalTasks = computed(() => allData.value.length);
const activeTasks = computed(() => allData.value.filter(row => row['Durum'] === 'Aktif').length);
const pendingTasks = computed(() => allData.value.filter(row => row['Durum'] === 'Beklemede').length);
const completedTasks = computed(() => allData.value.filter(row => row['Durum'] === 'Tamamlandı').length);

// Methods
const loadData = async () => {
    try {
        isLoading.value = true;
        console.log('Görev verileri yükleniyor...');
        
        const result = await getTaskTableData();
        allData.value = result.data;
        allHeaders.value = result.headers;
        
        console.log('Yüklenen görev sayısı:', allData.value.length);
        console.log('Başlıklar:', allHeaders.value);
        
    } catch (error) {
        console.error('Veriler yüklenirken hata oluştu:', error);
    } finally {
        isLoading.value = false;
    }
};

const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
};

const clearFilters = () => {
    globalFilter.value = '';
    taskTypeFilter.value = '';
    statusFilter.value = '';
    columnFilters.value = {};
    currentPage.value = 1;
};

const goBack = () => {
    router.push('/');
};

// Watch for filter changes to reset page
watch([globalFilter, taskTypeFilter, statusFilter, columnFilters], () => {
    currentPage.value = 1;
}, { deep: true });

// Lifecycle
onMounted(() => {
    loadData();
});
</script>

<style scoped>
.table-responsive {
    max-height: 70vh;
    overflow-y: auto;
}

.badge {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    font-weight: 500;
    border-radius: 9999px;
}

.bg-success {
    background-color: rgb(220 252 231);
    color: rgb(22 101 52);
}

.dark .bg-success {
    background-color: rgb(22 101 52);
    color: rgb(220 252 231);
}

.bg-warning {
    background-color: rgb(254 249 195);
    color: rgb(133 77 14);
}

.dark .bg-warning {
    background-color: rgb(133 77 14);
    color: rgb(254 249 195);
}

.bg-secondary {
    background-color: rgb(243 244 246);
    color: rgb(55 65 81);
}

.dark .bg-secondary {
    background-color: rgb(55 65 81);
    color: rgb(243 244 246);
}

.bg-primary {
    background-color: rgb(219 234 254);
    color: rgb(30 64 175);
}

.dark .bg-primary {
    background-color: rgb(30 64 175);
    color: rgb(219 234 254);
}

.bg-info {
    background-color: rgb(207 250 254);
    color: rgb(21 94 117);
}

.dark .bg-info {
    background-color: rgb(21 94 117);
    color: rgb(207 250 254);
}

.bg-purple {
    background-color: rgb(243 232 255);
    color: rgb(107 33 168);
}

.dark .bg-purple {
    background-color: rgb(107 33 168);
    color: rgb(243 232 255);
}
</style>
