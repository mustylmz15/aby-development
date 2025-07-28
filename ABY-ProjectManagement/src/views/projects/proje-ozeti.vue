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
                <h5 class="font-semibold text-xl dark:text-white-light">UGES ELDD Proje Takip Sistemi</h5>
                <div class="flex gap-2">
                    <button type="button" @click="goBack" class="btn btn-outline-secondary">
                        <svg class="w-5 h-5 ltr:mr-2 rtl:ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 6L5 12L11 18M5 12H19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Geri Dön
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
                        <label class="block text-sm font-medium mb-1">Proje Kodu</label>
                        <input type="text" v-model="filters.projeKodu" class="form-input" placeholder="Proje kodu ara..." />
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Proje Durumu</label>
                        <select v-model="filters.projeDurumu" class="form-select">
                            <option value="">Tümü</option>
                            <option value="Proje Gecikmede">Proje Gecikmede</option>
                            <option value="Proje Takvimine Uygun İlerliyor">Proje Takvimine Uygun İlerliyor</option>
                            <option value="Proje Tamamlandı">Proje Tamamlandı</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Garanti Durumu</label>
                        <select v-model="filters.garantiDurumu" class="form-select">
                            <option value="">Tümü</option>
                            <option value="normal">Normal</option>
                            <option value="gecikme">Gecikme Var</option>
                        </select>
                    </div>
                    <div class="flex items-end">
                        <button type="button" @click="resetFilters" class="btn btn-outline-secondary w-full">
                            Filtreleri Temizle
                        </button>
                    </div>
                </div>
            </div>
        </div>        <!-- Projects Summary Table -->
        <div class="panel">
            <div class="mb-5">
                <h6 class="font-semibold text-primary mb-3">UGES ELDD Proje Takip Sistemi ({{ filteredProjects.length }} adet)</h6>
            </div>
            
            <div class="table-responsive">
                <table class="table-hover custom-summary-table">
                    <thead>
                        <tr>
                            <!-- Temel Proje Bilgileri -->
                            <th class="w-24 sortable" @click="sortBy('projeKodu')">
                                Proje Kodu
                                <i :class="getSortIcon('projeKodu')" class="ml-1"></i>
                            </th>
                            <th class="w-20 sortable" @click="sortBy('haneliKod')">
                                4 Haneli Kod
                                <i :class="getSortIcon('haneliKod')" class="ml-1"></i>
                            </th>
                            <th class="w-64 sortable" @click="sortBy('projeAdi')">
                                Proje Adı
                                <i :class="getSortIcon('projeAdi')" class="ml-1"></i>
                            </th>
                            <th class="w-32 sortable" @click="sortBy('projeBaslangicTarihi')">
                                Başlangıç Tarihi
                                <i :class="getSortIcon('projeBaslangicTarihi')" class="ml-1"></i>
                            </th>
                            <th class="w-24 sortable" @click="sortBy('projeSuresi')">
                                Proje Süresi
                                <i :class="getSortIcon('projeSuresi')" class="ml-1"></i>
                            </th>
                            <th class="w-32 sortable" @click="sortBy('projeGecSureDurumu')">
                                Proje Geç Süre Durumu
                                <i :class="getSortIcon('projeGecSureDurumu')" class="ml-1"></i>
                            </th>
                            <th class="w-24 sortable" @click="sortBy('projeGecSure')">
                                Proje Geç Süre
                                <i :class="getSortIcon('projeGecSure')" class="ml-1"></i>
                            </th>
                            <th class="w-32 sortable" @click="sortBy('garantiBitisTarihi')">
                                Garanti Bitiş Tarihi
                                <i :class="getSortIcon('garantiBitisTarihi')" class="ml-1"></i>
                            </th>
                            <th class="w-24 sortable" @click="sortBy('garantiSuresi')">
                                Garanti Süresi
                                <i :class="getSortIcon('garantiSuresi')" class="ml-1"></i>
                            </th>
                            <th class="w-32 sortable" @click="sortBy('garantiDurumu')">
                                Garanti Durumu (%)
                                <i :class="getSortIcon('garantiDurumu')" class="ml-1"></i>
                            </th>
                            <th class="w-32 sortable" @click="sortBy('garantiGecismeDurumu')">
                                Garanti Geçişme Durumu
                                <i :class="getSortIcon('garantiGecismeDurumu')" class="ml-1"></i>
                            </th>
                            <!-- Kurulum ve Malzeme -->
                            <th class="w-32 sortable" @click="sortBy('kurulumDurumu')">
                                Kuruluşu Durumu
                                <i :class="getSortIcon('kurulumDurumu')" class="ml-1"></i>
                            </th>
                            <th class="w-32 sortable" @click="sortBy('kurulumTarihi')">
                                Kuruluşu Tarihi
                                <i :class="getSortIcon('kurulumTarihi')" class="ml-1"></i>
                            </th>
                            <th class="w-32 sortable" @click="sortBy('yedekParcaDurumu')">
                                Yedek Parça Durumu
                                <i :class="getSortIcon('yedekParcaDurumu')" class="ml-1"></i>
                            </th>
                            <th class="w-32 sortable" @click="sortBy('sarfMalzemeDurumu')">
                                Şarf Malzeme Durumu
                                <i :class="getSortIcon('sarfMalzemeDurumu')" class="ml-1"></i>
                            </th>                            <th class="w-32 sortable" @click="sortBy('dkotMalzemeDurumu')">
                                DKÖT Malzeme Durumu
                                <i :class="getSortIcon('dkotMalzemeDurumu')" class="ml-1"></i>
                            </th>
                            <!-- Bütçe ve Teslimat -->
                            <th class="w-40 sortable" @click="sortBy('toplamEldButcesi')">
                                Toplam ELD Bütçesi
                                <i :class="getSortIcon('toplamEldButcesi')" class="ml-1"></i>
                            </th>
                            <th class="w-40 sortable" @click="sortBy('gerceklesenEldButcesi')">
                                Gerçekleşen ELD Bütçesi
                                <i :class="getSortIcon('gerceklesenEldButcesi')" class="ml-1"></i>
                            </th>
                            <th class="w-32 sortable" @click="sortBy('eldButcesiYuzde')">
                                ELD Bütçesi (%)
                                <i :class="getSortIcon('eldButcesiYuzde')" class="ml-1"></i>
                            </th>
                            <th class="w-40 sortable" @click="sortBy('teslimatHedefTutari')">
                                Teslimat Hedef Tutarı
                                <i :class="getSortIcon('teslimatHedefTutari')" class="ml-1"></i>
                            </th>
                            <th class="w-40 sortable" @click="sortBy('teslimatGerceklesme')">
                                Teslimat Gerçekleşme Tutarı
                                <i :class="getSortIcon('teslimatGerceklesme')" class="ml-1"></i>
                            </th>
                            <th class="w-32 sortable" @click="sortBy('teslimatYuzdesi')">
                                Teslimat Yüzdesi (%)
                                <i :class="getSortIcon('teslimatYuzdesi')" class="ml-1"></i>
                            </th>
                            <!-- İşçilik -->
                            <th class="w-32 sortable" @click="sortBy('toplamIscilikSuresi')">
                                Toplam İşçilik Süresi
                                <i :class="getSortIcon('toplamIscilikSuresi')" class="ml-1"></i>
                            </th>
                            <th class="w-32 sortable" @click="sortBy('gerceklesenIscilikSuresi')">
                                Gerçekleşen İşçilik Süresi
                                <i :class="getSortIcon('gerceklesenIscilikSuresi')" class="ml-1"></i>
                            </th>                            <th class="w-32 sortable" @click="sortBy('iscilikDurumu')">
                                İşçilik Durumu (%)
                                <i :class="getSortIcon('iscilikDurumu')" class="ml-1"></i>
                            </th>
                            <!-- İşlemler -->
                            <th class="w-20">
                                İşlemler
                            </th>
                        </tr>
                    </thead><tbody>
                        <tr v-for="project in filteredProjects" :key="project.id" class="align-top">
                            <!-- Temel Proje Bilgileri -->
                            <td class="font-medium">{{ project.projeKodu }}</td>
                            <td class="text-center">{{ project.haneliKod }}</td>
                            <td class="word-wrap-cell">{{ project.projeAdi }}</td>
                            <td class="text-center">{{ formatDate(project.projeBaslangicTarihi) }}</td>
                            <td class="text-center">{{ project.projeSuresi }}</td>
                            <td class="text-center">
                                <span :class="getDurumStatusBadge(project.projeGecSureDurumu)" class="badge">
                                    {{ project.projeGecSureDurumu }}
                                </span>
                            </td>
                            <td class="text-center">{{ project.projeGecSure || '0' }}</td>
                            <td class="text-center">{{ formatDate(project.garantiBitisTarihi) }}</td>
                            <td class="text-center">{{ project.garantiSuresi }}</td>
                            <td class="text-center">
                                <span :class="getPercentageBadge(project.garantiDurumu)" class="badge">
                                    {{ project.garantiDurumu }}
                                </span>
                            </td>
                            <td class="text-center">
                                <span :class="getDurumStatusBadge(project.garantiGecismeDurumu)" class="badge">
                                    {{ project.garantiGecismeDurumu }}
                                </span>
                            </td>
                            <!-- Kurulum ve Malzeme -->
                            <td class="text-center">
                                <span :class="getDurumStatusBadge(project.kurulumDurumu)" class="badge">
                                    {{ project.kurulumDurumu }}
                                </span>
                            </td>
                            <td class="text-center">{{ formatDate(project.kurulumTarihi) }}</td>
                            <td class="text-center">
                                <span :class="getDurumStatusBadge(project.yedekParcaDurumu)" class="badge">
                                    {{ project.yedekParcaDurumu }}
                                </span>
                            </td>
                            <td class="text-center">
                                <span :class="getDurumStatusBadge(project.sarfMalzemeDurumu)" class="badge">
                                    {{ project.sarfMalzemeDurumu }}
                                </span>
                            </td>                            <td class="text-center">
                                <span :class="getDurumStatusBadge(project.dkotMalzemeDurumu)" class="badge">
                                    {{ project.dkotMalzemeDurumu }}
                                </span>
                            </td>
                            <!-- Bütçe ve Teslimat -->
                            <td class="text-right">{{ formatCurrency(project.toplamEldButcesi) }}</td>
                            <td class="text-right">{{ formatCurrency(project.gerceklesenEldButcesi) }}</td>
                            <td class="text-center">
                                <span :class="getPercentageBadge(project.eldButcesiYuzde)" class="badge">
                                    {{ project.eldButcesiYuzde }}
                                </span>
                            </td>
                            <td class="text-right">{{ formatCurrency(project.teslimatHedefTutari) }}</td>
                            <td class="text-right">{{ formatCurrency(project.teslimatGerceklesme) }}</td>
                            <td class="text-center">
                                <span :class="getPercentageBadge(project.teslimatYuzdesi)" class="badge">
                                    {{ project.teslimatYuzdesi }}
                                </span>
                            </td>
                            <!-- İşçilik -->
                            <td class="text-center">{{ project.toplamIscilikSuresi }}</td>
                            <td class="text-center">{{ project.gerceklesenIscilikSuresi }}</td>                            <td class="text-center">
                                <span :class="getPercentageBadge(project.iscilikDurumu)" class="badge">
                                    {{ project.iscilikDurumu }}
                                </span>
                            </td>
                            <!-- İşlemler -->
                            <td class="text-center">
                                <button type="button" @click="goToProjectDetail(project.id)" class="btn btn-sm btn-primary">
                                    <svg class="w-4 h-4 ltr:mr-1 rtl:ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" stroke-width="1.5"/>
                                        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke="currentColor" stroke-width="1.5"/>
                                    </svg>
                                    Detay
                                </button>
                            </td>
                        </tr>
                        <tr v-if="filteredProjects.length === 0">
                            <td colspan="26" class="text-center py-8 text-gray-500">
                                Proje bulunamadı
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useMeta } from '@/composables/use-meta';

useMeta({ title: 'Proje Özeti' });

const router = useRouter();

// Toast notification state
const showToast = ref(false);
const toastMessage = ref('');
const toastType = ref('info'); // success, warning, error, info

// Filters
const filters = ref({
    projeKodu: '',
    projeDurumu: '',
    garantiDurumu: ''
});

// Mock data - Resimlerdeki formata uygun
const projects = ref([
    {
        id: 'PSE5924',
        projeKodu: 'PSE5924',
        haneliKod: '9972',
        projeAdi: 'Kent Güvenlik Yönetim Sistemi Projesi - Ek Talep-2',
        projeBaslangicTarihi: '2018-12-17',
        projeSuresi: '60',
        projeGecSureDurumu: 'Uygun Değil',
        projeGecSure: '19',
        garantiBitisTarihi: '2025-12-01',
        garantiSuresi: '12',
        garantiDurumu: '556',
        garantiGecismeDurumu: 'Tamamlandı',
        kurulumDurumu: 'Tamamlandı',
        kurulumTarihi: '2024-11-30',
        yedekParcaDurumu: 'Sipariş Geçildi',
        sarfMalzemeDurumu: 'Sipariş Geçildi',
        dkotMalzemeDurumu: 'Sipariş Geçildi',
        toplamEldButcesi: '€150.000.000',
        gerceklesenEldButcesi: '€120.000.000',
        eldButcesiYuzde: '80',
        teslimatHedefTutari: '€150.000.000',
        teslimatGerceklesme: '€110.000.000',
        teslimatYuzdesi: '73',
        toplamIscilikSuresi: '365',
        gerceklesenIscilikSuresi: '128',
        iscilikDurumu: '35'
    },
    {
        id: 'PSE8941',
        projeKodu: 'PSE8941',
        haneliKod: '7279',
        projeAdi: 'Alaçatı RES',
        projeBaslangicTarihi: '2025-06-23',
        projeSuresi: '40',
        projeGecSureDurumu: 'Uygun Değil',
        projeGecSure: '0',
        garantiBitisTarihi: '2025-05-25',
        garantiSuresi: '36',
        garantiDurumu: '103',
        garantiGecismeDurumu: 'Uygun Değil',
        kurulumDurumu: 'Devam Ediyor',
        kurulumTarihi: '2024-01-27',
        yedekParcaDurumu: 'Uygun Değil',
        sarfMalzemeDurumu: 'Uygun Değil',
        dkotMalzemeDurumu: 'Uygun Değil',
        toplamEldButcesi: '€260.000',
        gerceklesenEldButcesi: '€12.544',
        eldButcesiYuzde: '5',
        teslimatHedefTutari: '€1.400.000.000',
        teslimatGerceklesme: '€1.200.000',
        teslimatYuzdesi: '2',
        toplamIscilikSuresi: '2142',
        gerceklesenIscilikSuresi: '125',
        iscilikDurumu: '6'
    },
    {
        id: 'PSE8361',
        projeKodu: 'PSE8361',
        haneliKod: '8478',
        projeAdi: 'Aselsan Yüksek Hızda Ağırlık Ölçüm Sistemi',
        projeBaslangicTarihi: '2023-06-07',
        projeSuresi: '40',
        projeGecSureDurumu: 'Devam Ediyor',
        projeGecSure: '12',
        garantiBitisTarihi: '2025-08-26',
        garantiSuresi: '2',
        garantiDurumu: '217',
        garantiGecismeDurumu: 'Devam Ediyor',
        kurulumDurumu: 'Devam Ediyor',
        kurulumTarihi: '2024-07-11',
        yedekParcaDurumu: 'Teslim Alındı',
        sarfMalzemeDurumu: 'Teslim Alındı',
        dkotMalzemeDurumu: 'Teslim Alındı',
        toplamEldButcesi: '€245.545.245',
        gerceklesenEldButcesi: '€1.212.122',
        eldButcesiYuzde: '50',
        teslimatHedefTutari: '€545.456.456',
        teslimatGerceklesme: '€400.000',
        teslimatYuzdesi: '25',
        toplamIscilikSuresi: '25',
        gerceklesenIscilikSuresi: '454',
        iscilikDurumu: '40'
    },
    {
        id: 'PSE7141',
        projeKodu: 'PSE7141',
        haneliKod: '5854',
        projeAdi: 'Gebze-Darıca Metro Sinyalizasyon Sistemi',
        projeBaslangicTarihi: '2023-06-10',
        projeSuresi: '12',
        projeGecSureDurumu: 'Uygun Değil',
        projeGecSure: '12',
        garantiBitisTarihi: '2024-12-10',
        garantiSuresi: '6',
        garantiDurumu: '217',
        garantiGecismeDurumu: 'Planlandı',
        kurulumDurumu: 'Uygun Değil',
        kurulumTarihi: '2024-11-30',
        yedekParcaDurumu: 'Planlandı',
        sarfMalzemeDurumu: 'Planlandı',
        dkotMalzemeDurumu: 'Planlandı',
        toplamEldButcesi: '€46.540.655',
        gerceklesenEldButcesi: '€12.000.000',
        eldButcesiYuzde: '26',
        teslimatHedefTutari: '€120.000.000',
        teslimatGerceklesme: '€100.000.000',
        teslimatYuzdesi: '83',
        toplamIscilikSuresi: '250',        gerceklesenIscilikSuresi: '100',
        iscilikDurumu: '40'
    }
]);

// Computed
const filteredProjects = computed(() => {
    let filtered = projects.value.filter(project => {
        return (
            (filters.value.projeKodu === '' || project.projeKodu.toLowerCase().includes(filters.value.projeKodu.toLowerCase())) &&
            (filters.value.projeDurumu === '' || getProjectStatus(project) === filters.value.projeDurumu) &&            (filters.value.garantiDurumu === '' || 
                (filters.value.garantiDurumu === 'gecikme' && project.garantiGecismeDurumu === 'Gecikme Var') ||
                (filters.value.garantiDurumu === 'normal' && project.garantiGecismeDurumu !== 'Gecikme Var')
            )
        );
    });

    // Apply sorting
    if (sortConfig.value.key) {
        filtered.sort((a: any, b: any) => {
            let aValue = a[sortConfig.value.key];
            let bValue = b[sortConfig.value.key];

            // Handle different data types
            if (sortConfig.value.key.includes('Tarihi')) {
                // Date sorting
                aValue = aValue ? new Date(aValue).getTime() : 0;
                bValue = bValue ? new Date(bValue).getTime() : 0;
            } else if (sortConfig.value.key.includes('Suresi') || sortConfig.value.key.includes('Yuzde')) {
                // Numeric sorting
                aValue = parseInt(aValue) || 0;
                bValue = parseInt(bValue) || 0;
            } else if (typeof aValue === 'string') {
                // String sorting (case insensitive)
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }

            if (aValue < bValue) {
                return sortConfig.value.direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.value.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }

    return filtered;
});

// Methods
const showNotification = (message: string, type: 'success' | 'warning' | 'error' | 'info' = 'info') => {
    toastMessage.value = message;
    toastType.value = type;
    showToast.value = true;
    
    // Auto hide after 4 seconds
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

const exportToExcel = () => {
    // Excel export functionality
    showNotification('Excel export özelliği yakında eklenecek! 📊✨', 'info');
};

const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR');
};

const formatDateRange = (startDate: string, endDate: string) => {
    if (!startDate && !endDate) return '-';
    if (!startDate) return formatDate(endDate);
    if (!endDate) return formatDate(startDate);
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};

const getProjectStatus = (project: any) => {
    if (project.projeGecSureDurumu === 'Uygun Değil') return 'Proje Gecikmede';
    return 'Proje Takvimine Uygun İlerliyor';
};

const getProgressBarClass = (percentage: number) => {
    if (percentage >= 80) return 'bg-success';
    if (percentage >= 60) return 'bg-warning';
    if (percentage >= 40) return 'bg-info';
    return 'bg-danger';
};

const getDurumStatusBadge = (durum: string | undefined) => {
    if (!durum) return 'badge-outline-secondary';
    switch (durum) {
        case 'Tamamlandı':
        case 'Teslim Alındı':
        case 'Mevcut':
        case 'Yeterli':
            return 'badge-outline-success';
        case 'Devam Ediyor':
        case 'Sipariş Geçildi':
        case 'Sipariş Veçildi':
            return 'badge-outline-warning';
        case 'Uygun Değil':
        case 'Başlanmadı':
        case 'Eksik':
            return 'badge-outline-danger';
        case 'Planlandı':
            return 'badge-outline-info';
        default:
            return 'badge-outline-secondary';
    }
};

const resetFilters = () => {
    filters.value = {
        projeKodu: '',
        projeDurumu: '',
        garantiDurumu: ''
    };
};

// Sorting functionality
const sortConfig = ref({
    key: '',
    direction: 'asc' as 'asc' | 'desc'
});

const sortBy = (key: string) => {
    if (sortConfig.value.key === key) {
        // Same column clicked, toggle direction
        sortConfig.value.direction = sortConfig.value.direction === 'asc' ? 'desc' : 'asc';
    } else {
        // New column clicked, default to ascending
        sortConfig.value.key = key;
        sortConfig.value.direction = 'asc';
    }
};

const getSortIcon = (key: string) => {
    if (sortConfig.value.key !== key) {
        return 'fas fa-sort text-gray-400';
    }
    return sortConfig.value.direction === 'asc' 
        ? 'fas fa-sort-up text-primary' 
        : 'fas fa-sort-down text-primary';
};

const formatCurrency = (value: string) => {
    return value || '€0';
};

const getPercentageBadge = (percentage: string | number) => {
    const num = parseInt(percentage.toString());
    if (num >= 80) return 'badge-outline-success';
    if (num >= 60) return 'badge-outline-warning';
    if (num >= 40) return 'badge-outline-info';
    return 'badge-outline-danger';
};

const goToProjectDetail = (projectId: string) => {
    router.push(`/proje-bilgileri/${projectId}`);
};
</script>

<style scoped>
/* Tablo özel stilleri */
.custom-summary-table {
    table-layout: fixed;
    width: 100%;
    min-width: 2000px;
}

.custom-summary-table th,
.custom-summary-table td {
    vertical-align: middle;
    padding: 8px 6px;
    border-bottom: 1px solid #e5e7eb;
    font-size: 12px;
}

.custom-summary-table th {
    background-color: #f8fafc;
    font-weight: 600;
    position: sticky;
    top: 0;
    z-index: 10;
}

.dark .custom-summary-table th {
    background-color: #1f2937;
    border-color: #374151;
}

.dark .custom-summary-table th,
.dark .custom-summary-table td {
    border-color: #374151;
}

/* Word wrap için özel sınıf */
.word-wrap-cell {
    word-wrap: break-word;
    word-break: break-word;
    white-space: normal;
    line-height: 1.4;
    max-width: 300px;
}

/* Progress bar stilleri */
.progress-container {
    display: flex;
    align-items: center;
    gap: 8px;
}

.progress-bar {
    flex: 1;
    height: 16px;
    background-color: #e5e7eb;
    border-radius: 8px;
    overflow: hidden;
    min-width: 60px;
}

.progress-fill {
    height: 100%;
    transition: width 0.3s ease;
    border-radius: 8px;
}

.progress-text {
    font-size: 11px;
    font-weight: 500;
    min-width: 35px;
    text-align: right;
}

.bg-success {
    background-color: #10b981;
}

.bg-warning {
    background-color: #f59e0b;
}

.bg-info {
    background-color: #3b82f6;
}

.bg-danger {
    background-color: #ef4444;
}

/* Sortable column styles */
.sortable {
    cursor: pointer;
    user-select: none;
    position: relative;
    transition: background-color 0.2s ease;
}

.sortable:hover {
    background-color: #e5e7eb !important;
}

.dark .sortable:hover {
    background-color: #374151 !important;
}

.sortable i {
    font-size: 12px;
    opacity: 0.6;
    transition: opacity 0.2s ease;
}

.sortable:hover i {
    opacity: 1;
}

.text-primary {
    color: #3b82f6 !important;
}

/* Badge düzenlemeleri */
.badge {
    display: inline-block;
    padding: 2px 6px;
    font-size: 10px;
    font-weight: 500;
    border-radius: 4px;
    text-align: center;
    min-width: 50px;
}

/* Kolon genişlikleri */
.w-20 { width: 5rem; }
.w-24 { width: 6rem; }
.w-32 { width: 8rem; }
.w-40 { width: 10rem; }
.w-64 { width: 16rem; }

/* Tablo scroll düzenlemeleri */
.table-responsive {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
}

.dark .table-responsive {
    border-color: #374151;
}

/* Satır hover efekti */
.custom-summary-table tbody tr:hover {
    background-color: #f9fafb;
}

.dark .custom-summary-table tbody tr:hover {
    background-color: #374151;
}

/* Font weight für values */
.font-medium {
    font-weight: 500;
}

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

/* Toast specific styles */
.toast-container {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 9999;
}

.toast {
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.toast button:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.dark .toast button:hover {
    background-color: rgba(0, 0, 0, 0.1);
}
</style>
