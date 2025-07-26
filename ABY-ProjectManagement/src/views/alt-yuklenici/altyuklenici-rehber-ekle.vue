<template>
    <div>
        <div class="panel">
            <!-- Modern Header -->
            <div class="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 mb-6 border border-green-100 dark:border-gray-600">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                            </svg>
                        </div>
                        <div>
                            <h5 class="text-2xl font-bold text-gray-900 dark:text-white">Yeni Altyüklenici Ekle</h5>
                            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                Altyüklenici rehberine yeni kayıt ekleyin
                            </p>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <button type="button" @click="goBack" class="btn btn-outline-secondary flex items-center space-x-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12"/>
                            </svg>
                            <span>Geri Dön</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Form -->
            <div class="panel">
                <div class="mb-6">
                    <h6 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Altyüklenici Bilgileri</h6>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        Lütfen tüm zorunlu alanları (*) doldurunuz.
                    </p>
                </div>

                <form @submit.prevent="saveContractor" class="space-y-6">
                    <!-- Temel Bilgiler -->
                    <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
                        <h6 class="font-semibold text-blue-800 dark:text-blue-200 mb-4 flex items-center">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                            </svg>
                            Temel Bilgiler
                        </h6>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Ad Soyad *
                                </label>
                                <input 
                                    v-model="formData.adSoyad" 
                                    type="text" 
                                    class="form-input" 
                                    placeholder="Ad ve soyadı giriniz"
                                    required 
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Firma Bilgisi *
                                </label>
                                <input 
                                    v-model="formData.firmaBilgisi" 
                                    type="text" 
                                    class="form-input" 
                                    placeholder="Firma bilgisini giriniz"
                                    required 
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Firma Sicil
                                </label>
                                <input 
                                    v-model="formData.firmaSicil" 
                                    type="text" 
                                    class="form-input" 
                                    placeholder="Firma sicil numarasını giriniz"
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    ASELSAN Sicil
                                </label>
                                <input 
                                    v-model="formData.aselsanSicil" 
                                    type="text" 
                                    class="form-input" 
                                    placeholder="ASELSAN sicil numarasını giriniz"
                                />
                            </div>
                        </div>
                    </div>

                    <!-- İletişim Bilgileri -->
                    <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-700">
                        <h6 class="font-semibold text-green-800 dark:text-green-200 mb-4 flex items-center">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                            </svg>
                            İletişim Bilgileri
                        </h6>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Cep Telefonu
                                </label>
                                <input 
                                    v-model="formData.cepTelefonu" 
                                    type="tel" 
                                    class="form-input" 
                                    placeholder="0555 123 45 67"
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Dahili Tel
                                </label>
                                <input 
                                    v-model="formData.dahiliTel" 
                                    type="text" 
                                    class="form-input" 
                                    placeholder="Dahili telefon"
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    İkametgah
                                </label>
                                <input 
                                    v-model="formData.ikametgah" 
                                    type="text" 
                                    class="form-input" 
                                    placeholder="İkametgah bilgisini giriniz"
                                />
                            </div>
                        </div>
                    </div>

                    <!-- Proje ve Görev Bilgileri -->
                    <div class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-700">
                        <h6 class="font-semibold text-purple-800 dark:text-purple-200 mb-4 flex items-center">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                            </svg>
                            Proje ve Görev Bilgileri
                        </h6>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Ekip
                                </label>
                                <input 
                                    v-model="formData.ekip" 
                                    type="text" 
                                    class="form-input" 
                                    placeholder="Ekip adını giriniz"
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Görev Bölgesi
                                </label>
                                <input 
                                    v-model="formData.gorevBolgesi" 
                                    type="text" 
                                    class="form-input" 
                                    placeholder="Görev bölgesi giriniz"
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Projeler
                                </label>
                                <input 
                                    v-model="formData.projeler" 
                                    type="text" 
                                    class="form-input" 
                                    placeholder="Proje adları giriniz"
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    İlgili Müh.
                                </label>
                                <input 
                                    v-model="formData.ilgiliMuhendis" 
                                    type="text" 
                                    class="form-input" 
                                    placeholder="İlgili mühendis adını giriniz"
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    İlgili Müdürlük
                                </label>
                                <input 
                                    v-model="formData.ilgiliMudurluk" 
                                    type="text" 
                                    class="form-input" 
                                    placeholder="İlgili müdürlük adını giriniz"
                                />
                            </div>
                        </div>
                    </div>

                    <!-- Ek Bilgiler -->
                    <div class="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-700">
                        <h6 class="font-semibold text-orange-800 dark:text-orange-200 mb-4 flex items-center">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            Ek Bilgiler
                        </h6>
                        <div class="grid grid-cols-1 md:grid-cols-1 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Kan Grubu
                                </label>
                                <select v-model="formData.kanGrubu" class="form-select">
                                    <option value="">Seçiniz</option>
                                    <option value="A Rh(+)">A Rh(+)</option>
                                    <option value="A Rh(-)">A Rh(-)</option>
                                    <option value="B Rh(+)">B Rh(+)</option>
                                    <option value="B Rh(-)">B Rh(-)</option>
                                    <option value="AB Rh(+)">AB Rh(+)</option>
                                    <option value="AB Rh(-)">AB Rh(-)</option>
                                    <option value="O Rh(+)">O Rh(+)</option>
                                    <option value="O Rh(-)">O Rh(-)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- Form Buttons -->
                    <div class="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <button type="button" @click="resetForm" class="btn btn-outline-secondary">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                            </svg>
                            Temizle
                        </button>
                        <button type="button" @click="goBack" class="btn btn-outline-secondary">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                            İptal
                        </button>
                        <button type="submit" class="btn btn-success" :disabled="!isFormValid">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                            </svg>
                            Kaydet
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Success Modal -->
        <div v-if="showSuccessModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
                <div class="text-center">
                    <div class="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                        </svg>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        Başarılı!
                    </h3>
                    <p class="text-gray-600 dark:text-gray-400 mb-6">
                        Altyüklenici başarıyla rehbere eklendi.
                    </p>
                    <div class="flex justify-center gap-3">
                        <button @click="addAnother" class="btn btn-outline-primary">
                            Yeni Kayıt Ekle
                        </button>
                        <button @click="goToList" class="btn btn-primary">
                            Rehbere Dön
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useMeta } from '@/composables/use-meta';

useMeta({ title: 'Yeni Altyüklenici Ekle' });

const router = useRouter();

// Form data
const formData = ref({
    adSoyad: '',           // Excel: Ad soyad
    firmaBilgisi: '',      // Excel: Firma Bilgisi  
    cepTelefonu: '',       // Excel: Cep Telefonu
    ikametgah: '',         // Excel: İkametgah
    dahiliTel: '',         // Excel: Dahili tel
    firmaSicil: '',        // Excel: Firma Sicil
    aselsanSicil: '',      // Excel: ASELSAN Sicil
    ekip: '',              // Excel: Ekip
    kanGrubu: '',          // Excel: kan grubu
    gorevBolgesi: '',      // Excel: Görev Bölgesi
    projeler: '',          // Excel: Projeler
    ilgiliMuhendis: '',    // Excel: İlgili Müh.
    ilgiliMudurluk: ''     // Excel: İlgili Müdürlük
});

// Modal state
const showSuccessModal = ref(false);

// Computed properties
const isFormValid = computed(() => {
    return formData.value.adSoyad.trim() !== '' &&
           formData.value.firmaBilgisi.trim() !== '';
});

// Methods
const goBack = () => {
    router.push('/altyuklenici-rehberi');
};

const resetForm = () => {
    formData.value = {
        adSoyad: '',
        firmaBilgisi: '',
        cepTelefonu: '',
        ikametgah: '',
        dahiliTel: '',
        firmaSicil: '',
        aselsanSicil: '',
        ekip: '',
        kanGrubu: '',
        gorevBolgesi: '',
        projeler: '',
        ilgiliMuhendis: '',
        ilgiliMudurluk: ''
    };
};

const saveContractor = () => {
    // Form validasyonu
    if (!isFormValid.value) {
        alert('Lütfen zorunlu alanları doldurunuz.');
        return;
    }

    // Burada normal olarak API'ye kaydetme işlemi yapılacak
    // Şimdilik mock işlem olarak modal gösteriyoruz
    console.log('Altyüklenici kaydediliyor:', formData.value);
    
    // Success modal'ı göster
    showSuccessModal.value = true;
};

const addAnother = () => {
    showSuccessModal.value = false;
    resetForm();
    
    // Sayfayı en üste scroll et
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const goToList = () => {
    showSuccessModal.value = false;
    router.push('/altyuklenici-rehberi');
};
</script>

<style scoped>
/* Success animation */
@keyframes bounce-in {
    0% {
        transform: scale(0.3);
        opacity: 0;
    }
    50% {
        transform: scale(1.05);
    }
    70% {
        transform: scale(0.9);
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

.success-modal {
    animation: bounce-in 0.6s ease-out;
}
</style>
