<template>
    <div>
        <!-- Breadcrumb -->
        <ul class="flex space-x-2 rtl:space-x-reverse">
            <li>
                <a href="javascript:;" class="text-primary hover:underline" @click="$router.push('/ariza-yonetimi')">Arıza Yönetimi</a>
            </li>
            <li class="before:content-['/'] before:mr-2 rtl:before:ml-2">
                <a href="javascript:;" class="text-primary hover:underline" @click="$router.back()">Arıza Detayı</a>
            </li>
            <li class="before:content-['/'] before:mr-2 rtl:before:ml-2">
                <span>Onarıma Gönder</span>
            </li>
        </ul>

        <!-- Header -->
        <div class="pt-5 flex items-center justify-between">
            <h1 class="text-2xl font-bold text-primary">Onarıma Gönder</h1>
            <button type="button" class="btn btn-outline-secondary" @click="$router.back()">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Geri
            </button>
        </div>

        <!-- Main Content Panel -->
        <div class="panel mt-6">
            <div class="space-y-6">
                <!-- Seçilen Arızalı Ürün Bilgisi -->
                <div v-if="repairDetails && repairDetails.item" class="bg-blue-50 dark:bg-blue-900 rounded-lg p-4 mb-2 flex items-center gap-4">
                    <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2a4 4 0 014-4h3m4 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                        <div class="font-semibold text-blue-700 dark:text-blue-200">Seçilen Ürün: <span class="ml-2">{{ repairDetails.item.product?.name ?? '-' }}</span></div>
                        <div class="text-sm text-blue-600 dark:text-blue-300">Seri No: <span class="ml-1">{{ repairDetails.item.serialNumber ?? '-' }}</span></div>
                    </div>
                </div>
                <!-- Fault Info Summary (All Repair Fields) -->
                <div v-if="repairDetails" class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Arıza Detayları</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div><span class="font-medium text-gray-600 dark:text-gray-400">Arıza ID:</span> <span class="ml-2 text-gray-900 dark:text-white">{{ repairDetails.id }}</span></div>
                        <div><span class="font-medium text-gray-600 dark:text-gray-400">Onarım No:</span> <span class="ml-2 text-gray-900 dark:text-white">{{ repairDetails.repairNumber }}</span></div>
                        <div><span class="font-medium text-gray-600 dark:text-gray-400">Durum:</span> <span class="ml-2 text-gray-900 dark:text-white">{{ repairDetails.status }}</span></div>
                       
                        <div><span class="font-medium text-gray-600 dark:text-gray-400">Arıza Açıklaması:</span> <span class="ml-2 text-gray-900 dark:text-white">{{ repairDetails.reportedIssue }}</span></div>
                        <div><span class="font-medium text-gray-600 dark:text-gray-400">Çağrı Referansı:</span> <span class="ml-2 text-gray-900 dark:text-white">{{ repairDetails.callReference }}</span></div>
                       
                       <div><span class="font-medium text-gray-600 dark:text-gray-400">Bildiren:</span> <span class="ml-2 text-gray-900 dark:text-white">{{ repairDetails.reportedByUser ? (repairDetails.reportedByUser.firstName + ' ' + repairDetails.reportedByUser.lastName) : '-' }}</span></div>
                        <div><span class="font-medium text-gray-600 dark:text-gray-400">Alınma Tarihi:</span> <span class="ml-2 text-gray-900 dark:text-white">{{ repairDetails.receivedAt }}</span></div>
                        
                        <div><span class="font-medium text-gray-600 dark:text-gray-400">Oluşturulma:</span> <span class="ml-2 text-gray-900 dark:text-white">{{ repairDetails.createdAt }}</span></div>
                       <div><span class="font-medium text-gray-600 dark:text-gray-400">Depo:</span> <span class="ml-2 text-gray-900 dark:text-white">{{ repairDetails.warehouse?.name ?? '-' }}</span></div>
                        <div><span class="font-medium text-gray-600 dark:text-gray-400">Ürün:</span> <span class="ml-2 text-gray-900 dark:text-white">{{ repairDetails.item?.product?.name ?? '-' }}</span></div>
                        <div><span class="font-medium text-gray-600 dark:text-gray-400">Seri No:</span> <span class="ml-2 text-gray-900 dark:text-white">{{ repairDetails.item?.serialNumber ?? '-' }}</span></div>
                    </div>
                </div>
                <div v-else class="p-4 text-center text-gray-500">Arıza detayları yükleniyor...</div>

                <!-- Repair Send Form -->
                <div>
                    <h3 class="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Onarım Gönder</h3>
                    
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
                    </div>                    <!-- Dynamic Form Fields Based on Method -->
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
                                ></textarea>                            </div>

                            <!-- Repair Center -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Onarım Merkezi <span class="text-red-500">*</span>
                                </label>
                                <select v-model="sendData.repairCenter" class="form-select" required>
                                    <option value="">Onarım merkezi seçin</option>
                                    <option v-for="center in repairCenters" :key="center.id" :value="center.id">
                                        {{ center.name }}
                                    </option>
                                </select>
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
                            class="btn btn-warning" 
                            @click="sendToRepair" 
                            :disabled="!isFormValid || isSubmitting"
                        >
                            <svg v-if="isSubmitting" class="animate-spin w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <svg v-else class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                            </svg>
                            {{ isSubmitting ? 'Gönderiliyor...' : 'Onarıma Gönder' }}
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
// MOCK repairDetails kaldırıldı

import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMeta } from '@/composables/use-meta';
import axios from 'axios';
import Swal from 'sweetalert2';


// Meta
useMeta({ title: 'Onarıma Gönder' });

// Router
const route = useRoute();
const router = useRouter();

// Reactive data
const isSubmitting = ref(false);
const faultId = ref(route.params.id as string);

// Dinamik repairDetails
const repairDetails = ref<any>(null);



// Send data
const sendData = ref({
    method: '', // 'kargo' or 'ring'
    cargoTrackingNumber: '',
    vehiclePlate: '',
    description: '',
    repairCenter: ''
});

// Types
interface RepairCenter {
    id: string;
    name: string;
    location?: string;
}

// Onarım merkezleri (warehouses, type: REPAIR)
const repairCenters = ref<RepairCenter[]>([]);

// Computed
const isFormValid = computed(() => {
    if (!sendData.value.method || !sendData.value.repairCenter) {
        return false;
    }
    if (sendData.value.method === 'kargo' && !sendData.value.cargoTrackingNumber) {
        return false;
    }
    if (sendData.value.method === 'ring' && !sendData.value.vehiclePlate) {
        return false;
    }
    return true;
});

// Methods
const loadFaultData = async () => {
    try {
        // repairs tablosundan ilgili arıza kaydını çek
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/repairs/${faultId.value}`,
            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
        repairDetails.value = response.data;
    } catch (error) {
        console.error('Error loading fault data:', error);
        await Swal.fire({
            icon: 'error',
            title: 'Hata!',
            text: 'Arıza detayları alınamadı!',
            confirmButtonText: 'Tamam',
            confirmButtonColor: '#ef4444'
        });
    }
};

const cancelSend = () => {
    router.back();
};

const sendToRepair = async () => {
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
        title: 'Onarıma Gönderilsin mi?',
        html: `
            <div class="text-left">
                <p class="mb-2"><strong>Arıza:</strong> ${repairDetails.value?.repairNumber || ''}</p>
                <p class="mb-2"><strong>Ürün:</strong> ${repairDetails.value?.item?.product?.name || ''}</p>
                <p class="mb-2"><strong>Gönderim Yöntemi:</strong> ${sendData.value.method === 'kargo' ? 'Kargo' : 'RING (Araç)'}</p>
                ${sendData.value.method === 'kargo' ? 
                    `<p class="mb-2"><strong>Takip No:</strong> ${sendData.value.cargoTrackingNumber}</p>` : 
                    `<p class="mb-2"><strong>Araç Plakası:</strong> ${sendData.value.vehiclePlate}</p>`
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
        const payload: any = {
            repairId: repairDetails.value.id,
            kargoTakipNo: sendData.value.cargoTrackingNumber || undefined,
            aciklama: sendData.value.description,
            onarimDeposuId: sendData.value.repairCenter,
            transportType: sendData.value.method ? sendData.value.method.toUpperCase() : undefined,
        };
        // Eğer gönderim yöntemi ring ise kargoTakipNo yerine araç plakası ekle
        if (sendData.value.method === 'ring') {
            payload.kargoTakipNo = undefined;
            payload.aracPlaka = sendData.value.vehiclePlate;
        }

        // POST isteği
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/repairs/send-to-repair`, payload, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        await Swal.fire({
            icon: 'success',
            title: 'Başarılı!',
            text: 'Arıza başarıyla onarıma gönderildi!',
            confirmButtonText: 'Tamam',
            confirmButtonColor: '#10b981'
        });

        router.push(`/ariza-yonetimi/detay/${faultId.value}`);
    } catch (error) {
        console.error('Error sending to repair:', error);
        await Swal.fire({
            icon: 'error',
            title: 'Hata!',
            text: 'Gönderim sırasında bir hata oluştu!',
            confirmButtonText: 'Tamam',
            confirmButtonColor: '#ef4444'
        });
    } finally {
        isSubmitting.value = false;
    }
};

// Lifecycle
onMounted(() => {
    loadFaultData();
    // Fetch repair warehouses using the specific endpoint
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/warehouses/repair`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => {
        repairCenters.value = res.data;
    })
    .catch(err => {
        console.error('Onarım merkezleri alınamadı:', err);
        // Hata durumunda kullanıcıya bilgi verin
        Swal.fire({
            icon: 'warning',
            title: 'Uyarı!',
            text: 'Onarım merkezleri yüklenemedi. Lütfen sayfayı yenileyin.',
            confirmButtonText: 'Tamam',
            confirmButtonColor: '#f59e0b'
        });
    });
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

.btn-warning {
    color: white;
    background-color: #f59e0b;
    border-color: #f59e0b;
}

.btn-warning:hover:not(:disabled) {
    background-color: #d97706;
    border-color: #d97706;
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
