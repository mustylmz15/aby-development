<template>
    <div>
        <!-- Header -->
        <div class="panel">
            <div class="mb-5 flex items-center justify-between">
                <h5 class="font-semibold text-xl dark:text-white-light">Proje Görev Girişi</h5>
                <div class="flex gap-2">
                    <button type="button" @click="goBack" class="btn btn-outline-secondary">
                        <svg class="w-5 h-5 ltr:mr-2 rtl:ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 6L5 12L11 18M5 12H19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Geri Dön
                    </button>
                </div>
            </div>
        </div>

        <!-- Content - Bu kısım daha sonra doldurulacak -->
        <div class="panel">
            <div class="text-center py-10">
                <h6 class="text-lg font-semibold mb-4">Görev Girişi Sayfası</h6>
                <p class="text-gray-600 dark:text-gray-400">
                    Bu sayfa yakında geliştirilecek...
                </p>
                
                <!-- Proje bilgilerini göster -->
                <div v-if="projeId || projeAdi" class="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h6 class="font-semibold text-orange-500 mb-2">Proje Bilgileri:</h6>
                    <div class="text-left">
                        <p v-if="projeId" class="mb-1"><strong>Proje ID:</strong> {{ projeId }}</p>
                        <p v-if="projeAdi" class="mb-1"><strong>Proje Adı:</strong> {{ projeAdi }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useMeta } from '@/composables/use-meta';

useMeta({ title: 'Proje Görev Girişi' });

const router = useRouter();
const route = useRoute();

// URL parametrelerinden proje bilgilerini al
const projeId = ref<string>('');
const projeAdi = ref<string>('');

onMounted(() => {
    projeId.value = route.query.projeId as string || '';
    projeAdi.value = route.query.projeAdi as string || '';
});

// Methods
const goBack = () => {
    // Eğer proje detayından geldiyse oraya geri dön, yoksa projeler listesine
    router.go(-1);
};
</script>

<style scoped>
.text-orange-500 {
    color: #f97316;
}
</style>
