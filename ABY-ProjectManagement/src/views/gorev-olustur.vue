<template>
    <div class="panel h-full overflow-hidden">
        <div class="flex items-center justify-between mb-5">
            <h5 class="font-semibold text-lg dark:text-white-light">Yeni Görev Oluştur</h5>
            <button @click="goBack" class="btn btn-outline-secondary btn-sm">
                <icon-arrow-backward class="w-4 h-4 mr-2" />
                Geri Dön
            </button>
        </div>

        <form @submit.prevent="submitForm" class="space-y-6">
            <!-- Görev Bilgileri Kartı -->
            <div class="panel">
                <div class="flex items-center mb-5">
                    <icon-clipboard-text class="w-5 h-5 mr-2 text-primary" />
                    <h6 class="text-lg font-semibold">Görev Bilgileri</h6>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="font-semibold text-sm mb-2 block">Görev Tipi <span class="text-red-500">*</span></label>
                        <select v-model="form.taskType" class="form-select" required>
                            <option value="">Seçiniz...</option>
                            <option value="Yurt İçi">Yurt İçi</option>
                            <option value="Yurt Dışı">Yurt Dışı</option>
                        </select>
                    </div>

                    <div>
                        <label class="font-semibold text-sm mb-2 block">Görev Emri <span class="text-red-500">*</span></label>
                        <input 
                            v-model="form.gorevEmri" 
                            type="text" 
                            placeholder="Görev emri numarası..." 
                            class="form-input"
                            required
                        />
                    </div>

                    <div>
                        <label class="font-semibold text-sm mb-2 block">Kalem No</label>
                        <input 
                            v-model="form.kalemNo" 
                            type="text" 
                            placeholder="Kalem numarası..." 
                            class="form-input"
                        />
                    </div>

                    <div>
                        <label class="font-semibold text-sm mb-2 block">Üretim Yeri</label>
                        <input 
                            v-model="form.uretimYeri" 
                            type="text" 
                            placeholder="Üretim yeri..." 
                            class="form-input"
                        />
                    </div>

                    <div>
                        <label class="font-semibold text-sm mb-2 block">Görev Başlangıç Tarihi <span class="text-red-500">*</span></label>
                        <input 
                            v-model="form.gorevBaslangicTarihi" 
                            type="date" 
                            class="form-input"
                            required
                        />
                    </div>

                    <div>
                        <label class="font-semibold text-sm mb-2 block">Görev Bitiş Tarihi <span class="text-red-500">*</span></label>
                        <input 
                            v-model="form.gorevBitisTarihi" 
                            type="date" 
                            class="form-input"
                            required
                        />
                    </div>
                </div>
            </div>

            <!-- Personel Bilgileri Kartı -->
            <div class="panel">
                <div class="flex items-center mb-5">
                    <icon-users class="w-5 h-5 mr-2 text-primary" />
                    <h6 class="text-lg font-semibold">Personel Bilgileri</h6>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="font-semibold text-sm mb-2 block">Bölüm</label>
                        <input 
                            v-model="form.bolum" 
                            type="text" 
                            placeholder="Bölüm adı..." 
                            class="form-input"
                        />
                    </div>

                    <div>
                        <label class="font-semibold text-sm mb-2 block">Sicil <span class="text-red-500">*</span></label>
                        <input 
                            v-model="form.sicil" 
                            type="text" 
                            placeholder="Sicil numarası..." 
                            class="form-input"
                            required
                        />
                    </div>

                    <div>
                        <label class="font-semibold text-sm mb-2 block">İsim <span class="text-red-500">*</span></label>
                        <input 
                            v-model="form.isim" 
                            type="text" 
                            placeholder="Personel adı soyadı..." 
                            class="form-input"
                            required
                        />
                    </div>

                    <div>
                        <label class="font-semibold text-sm mb-2 block">Ünvan</label>
                        <input 
                            v-model="form.unvan" 
                            type="text" 
                            placeholder="Personel ünvanı..." 
                            class="form-input"
                        />
                    </div>
                </div>
            </div>

            <!-- Görev Lokasyonu Kartı -->
            <div class="panel">
                <div class="flex items-center mb-5">
                    <icon-map-pin class="w-5 h-5 mr-2 text-primary" />
                    <h6 class="text-lg font-semibold">Görev Lokasyonu</h6>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="font-semibold text-sm mb-2 block">Gidilen İl <span class="text-red-500">*</span></label>
                        <input 
                            v-model="form.gidilenIl" 
                            type="text" 
                            placeholder="Görev ili..." 
                            class="form-input"
                            required
                        />
                    </div>

                    <div>
                        <label class="font-semibold text-sm mb-2 block">Gidilen Ülke</label>
                        <input 
                            v-model="form.gidilenUlke" 
                            type="text" 
                            placeholder="Görev ülkesi..." 
                            class="form-input"
                            :disabled="form.taskType === 'Yurt İçi'"
                        />
                    </div>
                </div>
            </div>

            <!-- Mali Bilgiler Kartı -->
            <div class="panel">
                <div class="flex items-center mb-5">
                    <icon-dollar-sign class="w-5 h-5 mr-2 text-primary" />
                    <h6 class="text-lg font-semibold">Mali Bilgiler</h6>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="font-semibold text-sm mb-2 block">Masraf Yeri</label>
                        <input 
                            v-model="form.masrafYeri" 
                            type="text" 
                            placeholder="Masraf yeri..." 
                            class="form-input"
                        />
                    </div>

                    <div>
                        <label class="font-semibold text-sm mb-2 block">PYP</label>
                        <input 
                            v-model="form.pyp" 
                            type="text" 
                            placeholder="PYP kodu..." 
                            class="form-input"
                        />
                    </div>

                    <div class="md:col-span-2">
                        <label class="font-semibold text-sm mb-2 block">PYP Tanımı</label>
                        <textarea 
                            v-model="form.pypTanimi" 
                            rows="3" 
                            placeholder="PYP tanımı..." 
                            class="form-textarea resize-none"
                        ></textarea>
                    </div>
                </div>
            </div>

            <!-- Seyahat Bilgileri Kartı -->
            <div class="panel">
                <div class="flex items-center mb-5">
                    <icon-notes class="w-5 h-5 mr-2 text-primary" />
                    <h6 class="text-lg font-semibold">Seyahat Bilgileri</h6>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="font-semibold text-sm mb-2 block">Seyahat Nedeni</label>
                        <input 
                            v-model="form.seyahatNedeni" 
                            type="text" 
                            placeholder="Seyahat nedeni kodu..." 
                            class="form-input"
                        />
                    </div>

                    <div>
                        <label class="font-semibold text-sm mb-2 block">Taşıt Türü</label>
                        <input 
                            v-model="form.tasitTuru" 
                            type="text" 
                            placeholder="Taşıt türü kodu..." 
                            class="form-input"
                        />
                    </div>

                    <div class="md:col-span-2">
                        <label class="font-semibold text-sm mb-2 block">Seyahat Nedeni Tanımı</label>
                        <textarea 
                            v-model="form.seyahatNedeniTanimi" 
                            rows="3" 
                            placeholder="Seyahat nedeni detayı..." 
                            class="form-textarea resize-none"
                        ></textarea>
                    </div>

                    <div class="md:col-span-2">
                        <label class="font-semibold text-sm mb-2 block">Taşıt Türü Tanımı</label>
                        <textarea 
                            v-model="form.tasitTuruTanimi" 
                            rows="3" 
                            placeholder="Taşıt türü detayı..." 
                            class="form-textarea resize-none"
                        ></textarea>
                    </div>
                </div>
            </div>

            <!-- Form Butonları -->
            <div class="flex justify-end space-x-4 pt-4">
                <button type="button" @click="resetForm" class="btn btn-outline-danger">
                    <icon-refresh class="w-4 h-4 mr-2" />
                    Formu Temizle
                </button>
                <button type="button" @click="saveAsDraft" class="btn btn-outline-warning">
                    <icon-save class="w-4 h-4 mr-2" />
                    Taslak Olarak Kaydet
                </button>
                <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
                    <div v-if="isSubmitting" class="animate-spin w-4 h-4 mr-2">
                        <icon-loading />
                    </div>
                    <icon-check v-else class="w-4 h-4 mr-2" />
                    {{ isSubmitting ? 'Kaydediliyor...' : 'Görevi Oluştur' }}
                </button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

// Icons
import IconArrowBackward from '@/components/icon/icon-arrow-backward.vue';
import IconClipboardText from '@/components/icon/icon-clipboard-text.vue';
import IconUsers from '@/components/icon/icon-users.vue';
import IconMapPin from '@/components/icon/icon-map-pin.vue';
import IconDollarSign from '@/components/icon/icon-dollar-sign.vue';
import IconNotes from '@/components/icon/icon-notes.vue';
import IconRefresh from '@/components/icon/icon-refresh.vue';
import IconSave from '@/components/icon/icon-save.vue';
import IconCheck from '@/components/icon/icon-check.vue';
import IconLoading from '@/components/icon/icon-loading.vue';

const router = useRouter();

// State
const isSubmitting = ref(false);

// Form Data
const form = reactive({
    taskType: '',
    gorevEmri: '',
    kalemNo: '',
    uretimYeri: '',
    bolum: '',
    sicil: '',
    isim: '',
    unvan: '',
    gorevBaslangicTarihi: '',
    gorevBitisTarihi: '',
    gidilenIl: '',
    gidilenUlke: '',
    masrafYeri: '',
    pyp: '',
    pypTanimi: '',
    seyahatNedeni: '',
    seyahatNedeniTanimi: '',
    tasitTuru: '',
    tasitTuruTanimi: ''
});

// Methods
const goBack = () => {
    router.push('/personel-gorev');
};

const resetForm = () => {
    if (confirm('Emin misiniz? Form verileri temizlenecek, bu işlem geri alınamaz!')) {
        Object.assign(form, {
            taskType: '',
            gorevEmri: '',
            kalemNo: '',
            uretimYeri: '',
            bolum: '',
            sicil: '',
            isim: '',
            unvan: '',
            gorevBaslangicTarihi: '',
            gorevBitisTarihi: '',
            gidilenIl: '',
            gidilenUlke: '',
            masrafYeri: '',
            pyp: '',
            pypTanimi: '',
            seyahatNedeni: '',
            seyahatNedeniTanimi: '',
            tasitTuru: '',
            tasitTuruTanimi: ''
        });
        
        alert('Form başarıyla temizlendi.');
    }
};

const saveAsDraft = () => {
    // Taslak kaydetme logic'i burada olacak
    alert('Görev taslak olarak başarıyla kaydedildi.');
    console.log('Taslak kaydedildi:', form);
};

const submitForm = async () => {
    try {
        isSubmitting.value = true;
        
        // Form validasyonu
        if (!form.taskType || !form.gorevEmri || !form.gorevBaslangicTarihi || !form.gorevBitisTarihi || !form.isim || !form.gidilenIl) {
            throw new Error('Zorunlu alanları doldurunuz!');
        }
        
        // Tarih kontrolü
        if (new Date(form.gorevBaslangicTarihi) >= new Date(form.gorevBitisTarihi)) {
            throw new Error('Bitiş tarihi başlangıç tarihinden sonra olmalıdır!');
        }
        
        // Yurt içi görevde ülke alanı kontrolü
        if (form.taskType === 'Yurt İçi') {
            form.gidilenUlke = 'Türkiye';
        }
        
        // Simülasyon - API çağrısı burada olacak
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Başarı mesajı
        alert('Görev başarıyla oluşturuldu.');
        
        // Görev listesine yönlendir
        router.push('/personel-gorev');
        
    } catch (error: any) {
        alert(error.message || 'Görev oluşturulurken bir hata oluştu.');
    } finally {
        isSubmitting.value = false;
    }
};
</script>

<style scoped>
.form-input, .form-select, .form-textarea {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid rgb(209 213 219);
    border-radius: 0.5rem;
    background-color: white;
    color: rgb(17 24 39);
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

.panel {
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    border: 1px solid rgb(229 231 235);
    padding: 1.5rem;
}

.dark .panel {
    background-color: rgb(31 41 55);
    border-color: rgb(75 85 99);
}

.btn {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-weight: 500;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    cursor: pointer;
}

.btn-primary {
    background-color: rgb(59 130 246);
    color: white;
    border: none;
}

.btn-primary:hover:not(:disabled) {
    background-color: rgb(37 99 235);
}

.btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.btn-outline-secondary {
    border: 1px solid rgb(209 213 219);
    color: rgb(55 65 81);
    background-color: transparent;
}

.btn-outline-secondary:hover {
    background-color: rgb(249 250 251);
}

.dark .btn-outline-secondary {
    border-color: rgb(75 85 99);
    color: rgb(209 213 219);
}

.dark .btn-outline-secondary:hover {
    background-color: rgb(55 65 81);
}

.btn-outline-danger {
    border: 1px solid rgb(252 165 165);
    color: rgb(185 28 28);
    background-color: transparent;
}

.btn-outline-danger:hover {
    background-color: rgb(254 242 242);
}

.dark .btn-outline-danger {
    border-color: rgb(220 38 38);
    color: rgb(252 165 165);
}

.dark .btn-outline-danger:hover {
    background-color: rgba(185, 28, 28, 0.2);
}

.btn-outline-warning {
    border: 1px solid rgb(253 224 71);
    color: rgb(161 98 7);
    background-color: transparent;
}

.btn-outline-warning:hover {
    background-color: rgb(254 249 195);
}

.dark .btn-outline-warning {
    border-color: rgb(217 119 6);
    color: rgb(253 224 71);
}

.dark .btn-outline-warning:hover {
    background-color: rgba(161, 98, 7, 0.2);
}
</style>
