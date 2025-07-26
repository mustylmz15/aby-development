<template>
    <div class="panel h-full overflow-hidden">
        <div class="flex items-center justify-between mb-5">
            <h5 class="font-semibold text-lg dark:text-white-light">Proje Takip Sistemi</h5>
            <button @click="goBack" class="btn btn-outline-secondary btn-sm">
                <icon-arrow-backward class="w-4 h-4 mr-2" />
                Geri Dön
            </button>
        </div>

        <!-- Proje Görev Girişi -->
        <div class="panel mb-6">
            <div class="flex items-center mb-5">
                <icon-clipboard-text class="w-5 h-5 mr-2 text-primary" />
                <h6 class="text-lg font-semibold text-orange-600 dark:text-orange-400">Proje Görev Girişi</h6>
            </div>

            <form @submit.prevent="saveForm" class="space-y-6">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <!-- Sol Kolon -->
                    <div class="space-y-4">
                        <div>
                            <label class="font-semibold text-sm mb-2 block">
                                ID/Proje Kodu
                            </label>
                            <div class="flex space-x-2">
                                <input 
                                    v-model="form.projectId" 
                                    type="text" 
                                    class="form-input w-20"
                                    placeholder="26"
                                />
                                <input 
                                    v-model="form.projectCode" 
                                    type="text" 
                                    class="form-input flex-1"
                                    placeholder="P5855924"
                                />
                            </div>
                        </div>

                        <div>
                            <label class="font-semibold text-sm mb-2 block">
                                Başlangıç Tarih <span class="text-red-500">*</span>
                            </label>
                            <input 
                                v-model="form.startDate" 
                                type="date" 
                                class="form-input"
                                required
                            />
                        </div>

                        <div>
                            <label class="font-semibold text-sm mb-2 block">
                                Sorumlu Kişi <span class="text-red-500">*</span>
                            </label>
                            <select v-model="form.responsiblePerson" class="form-select" required>
                                <option value="">Seçiniz...</option>
                                <option value="İLKER AYDIN">İLKER AYDIN</option>
                                <option value="OĞUZHAN ÜNAL">OĞUZHAN ÜNAL</option>
                                <option value="EMEL ÇANKAYA BALBAY">EMEL ÇANKAYA BALBAY</option>
                                <option value="MUSTAFA ÇAKIR">MUSTAFA ÇAKIR</option>
                            </select>
                        </div>

                        <div>
                            <label class="font-semibold text-sm mb-2 block">
                                Sorumlu Müdürlük
                            </label>
                            <input 
                                v-model="form.responsibleDepartment" 
                                type="text" 
                                class="form-input"
                                placeholder="Müdürlük adı..."
                            />
                        </div>

                        <div>
                            <label class="font-semibold text-sm mb-2 block">
                                P. Tamamlanma Tarihi <span class="text-red-500">*</span>
                            </label>
                            <input 
                                v-model="form.plannedCompletionDate" 
                                type="date" 
                                class="form-input"
                                required
                            />
                        </div>

                        <div>
                            <label class="flex items-center space-x-2">
                                <input 
                                    v-model="form.isCompleted" 
                                    type="checkbox" 
                                    class="form-checkbox text-primary focus:ring-primary"
                                />
                                <span class="font-semibold text-sm">
                                    Tamamlanma Durumu
                                </span>
                            </label>
                        </div>
                    </div>

                    <!-- Sağ Kolon - İşin Tanımı -->
                    <div class="lg:col-span-2">
                        <label class="font-semibold text-sm mb-2 block">
                            İşin Tanımı <span class="text-red-500">*</span>
                        </label>
                        <textarea 
                            v-model="form.jobDescription" 
                            rows="12" 
                            class="form-textarea w-full resize-none"
                            placeholder="İşin detaylı tanımını buraya yazınız..."
                            required
                        ></textarea>
                    </div>
                </div>

                <!-- Form Butonları -->
                <div class="flex justify-end space-x-4 pt-4">
                    <button type="button" @click="cancelForm" class="btn btn-outline-danger">
                        <icon-x class="w-4 h-4 mr-2" />
                        İptal
                    </button>
                    <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
                        <div v-if="isSubmitting" class="animate-spin w-4 h-4 mr-2">
                            <icon-loading />
                        </div>
                        <icon-save v-else class="w-4 h-4 mr-2" />
                        {{ isSubmitting ? 'Kaydediliyor...' : 'Kaydet' }}
                    </button>
                </div>
            </form>
        </div>

        <!-- Veri Tablosu -->
        <div class="panel">
            <div class="flex items-center justify-between mb-5">
                <h6 class="text-lg font-semibold">Proje Görevleri</h6>
                <span class="text-sm text-gray-500">{{ tableData.length }} görev</span>
            </div>
            
            <div class="table-responsive">
                <table class="table-hover">
                    <thead class="sticky top-0 bg-white dark:bg-gray-800 z-10">
                        <tr>
                            <th class="!text-center">Sıra No</th>
                            <th>Sorumlu Kişi</th>
                            <th>Başlangıç Tarihi</th>
                            <th>Bitiş Tarihi</th>
                            <th class="!text-center">Süre</th>
                            <th class="!text-center">Gecikme Süresi</th>
                            <th>İşin Tanımı</th>
                            <th class="!text-center">Tamamlanma Dur.</th>
                            <th>Tamamlanma Zamanı</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in tableData" :key="index"
                            :class="{ 'bg-primary-light dark:bg-primary-dark-light': item.isHighlighted }"
                            class="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td class="text-center font-medium">
                                {{ item.serialNo }}
                            </td>
                            <td>
                                <div class="whitespace-nowrap font-medium">
                                    {{ item.responsiblePerson }}
                                </div>
                            </td>
                            <td class="whitespace-nowrap">
                                {{ item.startDate }}
                            </td>
                            <td class="whitespace-nowrap">
                                {{ item.endDate }}
                            </td>
                            <td class="text-center">
                                <span class="badge bg-info">{{ item.duration }} gün</span>
                            </td>
                            <td class="text-center">
                                <span v-if="item.delayDuration" class="badge bg-danger">
                                    {{ item.delayDuration }}
                                </span>
                                <span v-else class="text-gray-400">-</span>
                            </td>
                            <td class="max-w-xs">
                                <div class="truncate" :title="item.jobDescription">
                                    {{ item.jobDescription || '-' }}
                                </div>
                            </td>
                            <td class="text-center">
                                <label class="inline-flex items-center">
                                    <input 
                                        v-model="item.isCompleted" 
                                        type="checkbox" 
                                        class="form-checkbox text-primary focus:ring-primary"
                                        :disabled="item.isCompleted && !!item.completionTime"
                                    />
                                </label>
                            </td>
                            <td class="whitespace-nowrap">
                                <span v-if="item.completionTime" class="text-green-600 dark:text-green-400 text-sm font-medium">
                                    {{ item.completionTime }}
                                </span>
                                <span v-else class="text-gray-400">-</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Boş durum -->
            <div v-if="tableData.length === 0" class="text-center py-20">
                <div class="text-gray-500 dark:text-gray-400">
                    <icon-box class="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p class="text-lg font-medium">Henüz görev bulunmuyor</p>
                    <p class="text-sm">Yukarıdaki formu kullanarak yeni görev ekleyebilirsiniz</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useMeta } from '@/composables/use-meta';

// Icons
import IconArrowBackward from '@/components/icon/icon-arrow-backward.vue';
import IconClipboardText from '@/components/icon/icon-clipboard-text.vue';
import IconX from '@/components/icon/icon-x.vue';
import IconSave from '@/components/icon/icon-save.vue';
import IconLoading from '@/components/icon/icon-loading.vue';
import IconBox from '@/components/icon/icon-box.vue';

useMeta({ title: 'Proje Takip Sistemi' });

const router = useRouter();

interface FormData {
    projectId: string;
    projectCode: string;
    startDate: string;
    responsiblePerson: string;
    responsibleDepartment: string;
    plannedCompletionDate: string;
    isCompleted: boolean;
    jobDescription: string;
}

interface TaskItem {
    serialNo: number;
    responsiblePerson: string;
    startDate: string;
    endDate: string;
    duration: number;
    delayDuration: string;
    jobDescription: string;
    isCompleted: boolean;
    completionTime: string;
    isHighlighted?: boolean;
}

// State
const isSubmitting = ref(false);

// Form Data
const form = reactive<FormData>({
    projectId: '26',
    projectCode: 'P5855924',
    startDate: '',
    responsiblePerson: '',
    responsibleDepartment: '',
    plannedCompletionDate: '',
    isCompleted: false,
    jobDescription: ''
});

// Mock Table Data
const tableData = ref<TaskItem[]>([
    {
        serialNo: 10,
        responsiblePerson: 'İLKER AYDIN',
        startDate: '23.07.2025',
        endDate: '26.07.2025',
        duration: 3,
        delayDuration: '',
        jobDescription: 'fdfsfsdsds',
        isCompleted: false,
        completionTime: '',
        isHighlighted: true
    },
    {
        serialNo: 11,
        responsiblePerson: 'İLKER AYDIN',
        startDate: '7.07.2025',
        endDate: '26.07.2025',
        duration: 15,
        delayDuration: '',
        jobDescription: 'rewtewerf',
        isCompleted: false,
        completionTime: ''
    },
    {
        serialNo: 16,
        responsiblePerson: 'OĞUZHAN ÜNAL',
        startDate: '9.07.2025',
        endDate: '17.07.2025',
        duration: 7,
        delayDuration: '',
        jobDescription: 'esdrtfgh',
        isCompleted: false,
        completionTime: ''
    },
    {
        serialNo: 24,
        responsiblePerson: 'EMEL ÇANKAYA BALBAY',
        startDate: '4.07.2025',
        endDate: '17.07.2025',
        duration: 10,
        delayDuration: '',
        jobDescription: '',
        isCompleted: false,
        completionTime: ''
    },
    {
        serialNo: 4,
        responsiblePerson: 'MUSTAFA ÇAKIR',
        startDate: '18.07.2025',
        endDate: '16.08.2025',
        duration: 21,
        delayDuration: '',
        jobDescription: 'tryrtyryt',
        isCompleted: true,
        completionTime: '2.07.2025 14:15:30'
    },
    {
        serialNo: 5,
        responsiblePerson: 'MUSTAFA ÇAKIR',
        startDate: '1.07.2025',
        endDate: '4.07.2025',
        duration: 4,
        delayDuration: '',
        jobDescription: 'lklşçşş',
        isCompleted: false,
        completionTime: ''
    }
]);

// Methods
const goBack = () => {
    router.push('/personel-gorev');
};

const saveForm = async () => {
    try {
        isSubmitting.value = true;
        
        if (!form.startDate || !form.responsiblePerson || !form.plannedCompletionDate || !form.jobDescription) {
            throw new Error('Lütfen zorunlu alanları doldurunuz!');
        }
        
        // Tarih kontrolü
        if (new Date(form.startDate) >= new Date(form.plannedCompletionDate)) {
            throw new Error('Tamamlanma tarihi başlangıç tarihinden sonra olmalıdır!');
        }
        
        // Simülasyon - API çağrısı burada olacak
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Yeni görev ekle
        const newTask: TaskItem = {
            serialNo: Math.max(...tableData.value.map(t => t.serialNo)) + 1,
            responsiblePerson: form.responsiblePerson,
            startDate: new Date(form.startDate).toLocaleDateString('tr-TR'),
            endDate: new Date(form.plannedCompletionDate).toLocaleDateString('tr-TR'),
            duration: Math.ceil((new Date(form.plannedCompletionDate).getTime() - new Date(form.startDate).getTime()) / (1000 * 60 * 60 * 24)),
            delayDuration: '',
            jobDescription: form.jobDescription,
            isCompleted: form.isCompleted,
            completionTime: form.isCompleted ? new Date().toLocaleString('tr-TR') : '',
            isHighlighted: false
        };
        
        tableData.value.unshift(newTask);
        
        alert('Proje görevi başarıyla kaydedildi!');
        
        // Form'u temizle
        Object.assign(form, {
            projectId: '26',
            projectCode: 'P5855924',
            startDate: '',
            responsiblePerson: '',
            responsibleDepartment: '',
            plannedCompletionDate: '',
            isCompleted: false,
            jobDescription: ''
        });
        
    } catch (error: any) {
        alert(error.message || 'Görev kaydedilirken bir hata oluştu.');
    } finally {
        isSubmitting.value = false;
    }
};

const cancelForm = () => {
    if (confirm('Değişiklikleri iptal etmek istediğinizden emin misiniz?')) {
        Object.assign(form, {
            projectId: '26',
            projectCode: 'P5855924',
            startDate: '',
            responsiblePerson: '',
            responsibleDepartment: '',
            plannedCompletionDate: '',
            isCompleted: false,
            jobDescription: ''
        });
    }
};
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

.bg-info {
    background-color: rgb(59 130 246);
    color: white;
}

.bg-danger {
    background-color: rgb(239 68 68);
    color: white;
}

.bg-primary-light {
    background-color: rgba(59, 130, 246, 0.1);
}

.dark .bg-primary-dark-light {
    background-color: rgba(59, 130, 246, 0.2);
}

.form-input, .form-select, .form-textarea {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid rgb(209 213 219);
    border-radius: 0.375rem;
    background-color: white;
    color: rgb(17 24 39);
    font-size: 0.875rem;
}

.form-input:focus, .form-select:focus, .form-textarea:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
    border-color: rgb(59 130 246);
}

.dark .form-input, .dark .form-select, .dark .form-textarea {
    background-color: rgb(31 41 55);
    border-color: rgb(75 85 99);
    color: white;
}

.form-checkbox {
    width: 1rem;
    height: 1rem;
    border: 1px solid rgb(209 213 219);
    border-radius: 0.25rem;
}

.dark .form-checkbox {
    background-color: rgb(31 41 55);
    border-color: rgb(75 85 99);
}

.truncate {
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
