<template>
    <div>
        <!-- Breadcrumb -->
        <ul class="flex space-x-2 rtl:space-x-reverse">
            <li>
                <a href="javascript:;" class="text-primary hover:underline" @click="$router.push('/onarim-merkezi')">Onarım Merkezi</a>
            </li>
            <li class="before:content-['/'] before:mr-2 rtl:before:ml-2">
                <a href="javascript:;" class="text-primary hover:underline" @click="$router.back()">Onarım Listesi</a>
            </li>
            <li class="before:content-['/'] before:mr-2 rtl:before:ml-2">
                <span>Depoya Geri Gönder</span>
            </li>
        </ul>

        <!-- Header -->
        <div class="pt-5 flex items-center justify-between">
            <h1 class="text-2xl font-bold text-primary">Depoya Geri Gönder</h1>
            <button type="button" class="btn btn-outline-secondary" @click="$router.back()">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Geri
            </button>
        </div>

        <!-- Main Content Panel -->
        <div class="panel mt-6">
            <!-- Loading State -->
            <div v-if="isLoading" class="text-center py-8">
                <i class="fa fa-spinner fa-spin text-3xl text-blue-500 mb-4"></i>
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Ürün Bilgileri Yükleniyor...</h3>
                <p class="text-gray-500">Onarım detayları ve depo bilgileri getiriliyor</p>
            </div>

            <!-- Content -->
            <div v-else class="space-y-6">
                <!-- Seçilen Onarılmış Ürün Bilgisi -->
                <div v-if="repairDetails && repairDetails.item" class="bg-green-50 dark:bg-green-900 rounded-lg p-4 mb-2 flex items-center gap-4">
                    <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                        <div class="font-semibold text-green-700 dark:text-green-200">Onarılmış Ürün: <span class="ml-2">{{ repairDetails.item.product?.name ?? '-' }}</span></div>
                        <div class="text-sm text-green-600 dark:text-green-300">Seri No: <span class="ml-1">{{ repairDetails.item.serialNumber ?? '-' }}</span></div>
                        <div class="text-sm text-green-600 dark:text-green-300">Durum: <span class="ml-1 font-medium">ONARILDI</span></div>
                    </div>
                </div>

                <!-- Repair Info Summary -->
                <div v-if="repairDetails" class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Onarım Detayları</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div><span class="font-medium text-gray-600 dark:text-gray-400">Onarım No:</span> <span class="ml-2 text-gray-900 dark:text-white">{{ repairDetails.repairNumber }}</span></div>
                        <div><span class="font-medium text-gray-600 dark:text-gray-400">Durum:</span> <span class="ml-2 text-gray-900 dark:text-white">{{ repairDetails.status }}</span></div>
                        <div><span class="font-medium text-gray-600 dark:text-gray-400">Tanı:</span> <span class="ml-2 text-gray-900 dark:text-white">{{ repairDetails.diagnosis || '-' }}</span></div>
                        <div><span class="font-medium text-gray-600 dark:text-gray-400">Tamamlayan:</span> <span class="ml-2 text-gray-900 dark:text-white">{{ repairDetails.completedBy || '-' }}</span></div>
                        <div><span class="font-medium text-gray-600 dark:text-gray-400">Tamamlanma Tarihi:</span> <span class="ml-2 text-gray-900 dark:text-white">{{ formatDate(repairDetails.completedAt) }}</span></div>
                        <div><span class="font-medium text-gray-600 dark:text-gray-400">Çağrı Referansı:</span> <span class="ml-2 text-gray-900 dark:text-white">{{ repairDetails.callReference }}</span></div>
                        <div><span class="font-medium text-gray-600 dark:text-gray-400">Ürün:</span> <span class="ml-2 text-gray-900 dark:text-white">{{ repairDetails.item?.product?.name || '-' }}</span></div>
                        <div><span class="font-medium text-gray-600 dark:text-gray-400">SKU:</span> <span class="ml-2 text-gray-900 dark:text-white">{{ repairDetails.item?.product?.sku || '-' }}</span></div>
                    </div>
                </div>

                <!-- Gönderilecek Depo Bilgisi -->
                <div v-if="targetWarehouse" class="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
                    <h3 class="text-lg font-semibold mb-2 text-blue-900 dark:text-blue-200 flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                        </svg>
                        Gönderilecek Depo
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div><span class="font-medium text-blue-600 dark:text-blue-300">Depo Adı:</span> <span class="ml-2 text-blue-900 dark:text-blue-200">{{ targetWarehouse.name }}</span></div>
                        <div><span class="font-medium text-blue-600 dark:text-blue-300">Depo Kodu:</span> <span class="ml-2 text-blue-900 dark:text-blue-200">{{ targetWarehouse.code || '-' }}</span></div>
                        <div v-if="targetWarehouse.address" class="md:col-span-2"><span class="font-medium text-blue-600 dark:text-blue-300">Adres:</span> <span class="ml-2 text-blue-900 dark:text-blue-200">{{ targetWarehouse.address }}</span></div>
                    </div>
                </div>

                <!-- Depo Bilgisi Yüklenemiyor Uyarısı -->
                <div v-else-if="!isLoading" class="bg-yellow-50 dark:bg-yellow-900 rounded-lg p-4">
                    <div class="flex items-center">
                        <svg class="w-5 h-5 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L5.082 15.5c-.77.833.192 2.5 1.732 2.5z"></path>
                        </svg>
                        <div>
                            <h3 class="text-sm font-medium text-yellow-800 dark:text-yellow-200">Hedef Depo Bilgisi Bulunamadı</h3>
                            <p class="text-xs text-yellow-600 dark:text-yellow-300 mt-1">
                                Bu ürün için <code>item.currentWarehouse</code> bilgisi backend tarafından henüz sağlanmamış.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Return Send Form -->
                <div>
                    <h3 class="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Geri Gönderim Bilgileri</h3>
                    
                    <!-- Gönderim Yöntemi Selection -->
                    <div class="mb-6">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                            Gönderim Yöntemi <span class="text-red-500">*</span>
                        </label>
                        
                        <div class="space-y-3">
                            <!-- Kargo Option -->
                            <label class="flex items-center space-x-3 cursor-pointer">
                                <input 
                                    type="radio" 
                                    v-model="sendData.method" 
                                    value="kargo" 
                                    class="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                                >
                                <div class="flex items-center">
                                    <svg class="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                                    </svg>
                                    <span class="text-sm font-medium text-gray-900 dark:text-white">Kargo</span>
                                </div>
                            </label>

                            <!-- RING (Araç) Option -->
                            <label class="flex items-center space-x-3 cursor-pointer">
                                <input 
                                    type="radio" 
                                    v-model="sendData.method" 
                                    value="ring" 
                                    class="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                                >
                                <div class="flex items-center">
                                    <svg class="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                    </svg>
                                    <span class="text-sm font-medium text-gray-900 dark:text-white">RING (Araç)</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    <!-- Dynamic Form Fields Based on Method -->
                    <div v-if="sendData.method">
                        <!-- Kargo Form -->
                        <div v-if="sendData.method === 'kargo'" class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Kargo Takip Numarası <span class="text-red-500">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    v-model="sendData.cargoTrackingNumber" 
                                    class="form-input" 
                                    placeholder="Örn: TK123456789"
                                    required
                                />
                            </div>
                        </div>

                        <!-- RING (Araç) Form -->
                        <div v-if="sendData.method === 'ring'" class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Araç Plakası <span class="text-red-500">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    v-model="sendData.vehiclePlate" 
                                    class="form-input" 
                                    placeholder="Örn: 34 ABC 123"
                                    required
                                />
                                <div class="text-xs text-gray-500 mt-1">
                                    Araç plakasını tam olarak girin
                                </div>
                            </div>
                        </div>

                        <!-- Common Fields for All Methods -->
                        <div class="space-y-4 mt-6">
                            <!-- Açıklama -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Açıklama (Opsiyonel)
                                </label>
                                <textarea 
                                    v-model="sendData.description" 
                                    class="form-textarea" 
                                    rows="4"
                                    placeholder="Ek notlar, özel talimatlar vb."
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <button type="button" class="btn btn-outline-secondary" @click="cancelSend">
                            İptal
                        </button>
                        <button 
                            type="button" 
                            class="btn btn-success" 
                            @click="returnToWarehouse" 
                            :disabled="!isFormValid || isSubmitting"
                        >
                            <svg v-if="isSubmitting" class="animate-spin w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <svg v-else class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                            </svg>
                            {{ isSubmitting ? 'Gönderiliyor...' : 'Depoya Geri Gönder' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="text-xs text-gray-500 mt-4">
            2025, ABY All rights reserved.
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMeta } from '@/composables/use-meta';
import { repairAPI } from './api/repair-api';
import Swal from 'sweetalert2';
import type { RepairDetails, Warehouse, ReturnToWarehouseRequest } from './api/types';

// Meta
useMeta({ title: 'Depoya Geri Gönder' });

// Router
const route = useRoute();
const router = useRouter();

// Reactive data
const isSubmitting = ref(false);
const isLoading = ref(true);
const repairId = ref(route.params.id as string);

// Repair Details
const repairDetails = ref<RepairDetails | null>(null);
const targetWarehouse = ref<Warehouse | null>(null);

// Send data
const sendData = ref({
    method: '', // 'kargo' or 'ring'
    cargoTrackingNumber: '',
    vehiclePlate: '',
    description: ''
});

// Computed
const isFormValid = computed(() => {
    // Önce hedef depo bilgisi olmalı
    if (!targetWarehouse.value) {
        return false;
    }
    
    // Kargo takip no verilmişse geçerli
    return true;
});

// Methods
const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('tr-TR');
};

const loadRepairData = async () => {
    try {
        isLoading.value = true;
        // Repair detaylarını çek
        repairDetails.value = await repairAPI.getRepairById(repairId.value);
        
        // Hedef depo bilgisini item.currentWarehouse'den al
        if (repairDetails.value?.item?.currentWarehouse) {
            targetWarehouse.value = repairDetails.value.item.currentWarehouse;
        }
    } catch (error) {
        console.error('Error loading repair data:', error);
        await Swal.fire({
            icon: 'error',
            title: 'Hata!',
            text: 'Onarım detayları alınamadı!',
            confirmButtonText: 'Tamam',
            confirmButtonColor: '#ef4444'
        });
    } finally {
        isLoading.value = false;
    }
};

const cancelSend = () => {
    router.back();
};

const returnToWarehouse = async () => {
    if (!isFormValid.value) {
        await Swal.fire({
            icon: 'warning',
            title: 'Eksik Bilgiler',
            text: 'Lütfen tüm gerekli alanları doldurun!',
            confirmButtonText: 'Tamam',
            confirmButtonColor: '#f59e0b'
        });
        return;
    }

    // Onay dialogu
    const result = await Swal.fire({
        icon: 'question',
        title: 'Depoya Geri Gönderilsin mi?',
        html: `
            <div class="text-left">
                <p class="mb-2"><strong>Onarım No:</strong> ${repairDetails.value?.repairNumber || ''}</p>
                <p class="mb-2"><strong>Ürün:</strong> ${repairDetails.value?.item?.product?.name || ''}</p>
                <p class="mb-2"><strong>Hedef Depo:</strong> ${targetWarehouse.value?.name || ''}</p>
                ${sendData.value.cargoTrackingNumber ? 
                    `<p class="mb-2"><strong>Kargo Takip No:</strong> ${sendData.value.cargoTrackingNumber}</p>` : ''
                }
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Evet, Gönder',
        cancelButtonText: 'İptal',
        confirmButtonColor: '#10b981',
        cancelButtonColor: '#6b7280'
    });

    if (!result.isConfirmed) return;

    isSubmitting.value = true;

    try {
        // API'ye gönderilecek payload
        const payload: ReturnToWarehouseRequest = {
            repairId: repairDetails.value!.id,
            kargoTakipNo: sendData.value.cargoTrackingNumber || undefined,
            aciklama: sendData.value.description,
            targetWarehouseId: targetWarehouse.value!.id, // currentWarehouseId
        };

        // POST isteği
        await repairAPI.returnToWarehouse(payload);

        await Swal.fire({
            icon: 'success',
            title: 'Başarılı!',
            text: 'Ürün başarıyla depoya geri gönderildi!',
            confirmButtonText: 'Tamam',
            confirmButtonColor: '#10b981',
            timer: 3000, // 3 saniye sonra otomatik kapanır
            timerProgressBar: true, // Progress bar göster
            allowOutsideClick: false, // Dışarı tıklayarak kapatmayı engelle
            showConfirmButton: true
        });

        // Başarılı işlem sonrası onarım merkezi sayfasına yönlendir
        router.push('/onarim-merkezi');
    } catch (error) {
        console.error('Error returning to warehouse:', error);
        await Swal.fire({
            icon: 'error',
            title: 'Hata!',
            text: 'Geri gönderim sırasında bir hata oluştu!',
            confirmButtonText: 'Tamam',
            confirmButtonColor: '#ef4444'
        });
    } finally {
        isSubmitting.value = false;
    }
};

// Lifecycle
onMounted(() => {
    loadRepairData();
});
</script>

<style scoped>
.panel {
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    padding: 2rem;
}

.dark .panel {
    background-color: #1b2e4b;
}

.btn {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 1rem;
    border: 1px solid transparent;
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: 0.375rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    cursor: pointer;
    transition: all 0.2s;
}

.btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.btn-success {
    color: white;
    background-color: #10b981;
    border-color: #10b981;
}

.btn-success:hover:not(:disabled) {
    background-color: #059669;
    border-color: #059669;
}

.btn-outline-secondary {
    color: #374151;
    background-color: transparent;
    border-color: #6b7280;
}

.btn-outline-secondary:hover {
    background-color: #f9fafb;
}

.dark .btn-outline-secondary {
    color: #9ca3af;
    border-color: #9ca3af;
}

.dark .btn-outline-secondary:hover {
    background-color: rgba(31, 41, 55, 0.5);
}

.form-input,
.form-select,
.form-textarea {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    background-color: white;
    transition: all 0.2s;
}

.dark .form-input,
.dark .form-select,
.dark .form-textarea {
    background-color: #374151;
    border-color: #4b5563;
    color: white;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
    border-color: #3b82f6;
}

.form-textarea {
    resize: vertical;
    min-height: 100px;
}

.text-primary {
    color: #3b82f6;
}

.animate-spin {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

/* Radio button styling */
input[type="radio"] {
    appearance: none;
    background-color: #fff;
    margin: 0;
    font: inherit;
    color: currentColor;
    width: 1rem;
    height: 1rem;
    border: 2px solid #d1d5db;
    border-radius: 50%;
    display: grid;
    place-content: center;
}

input[type="radio"]:checked {
    border-color: #3b82f6;
    background-color: #3b82f6;
}

input[type="radio"]:checked::before {
    content: "";
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: white;
}

.dark input[type="radio"] {
    border-color: #4b5563;
    background-color: #374151;
}

.dark input[type="radio"]:checked {
    border-color: #3b82f6;
    background-color: #3b82f6;
}
</style>
