
<template>
  <div>
    <div class="panel">
      <div class="mb-5 flex items-center justify-between">
        <h5 class="text-lg font-semibold dark:text-white-light">Ana Merkez Stok Ekleme</h5>
        <div class="flex items-center space-x-2">
          <button type="button" class="btn btn-outline-primary" @click="goBack">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Geri Dön
          </button>
        </div>
      </div>

      <div class="mb-5">
        <div class="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Bu sayfada Ana Merkez deposuna ürün stoğu ekleyebilirsiniz. Proje bazlı seri numarası sistemi kullanılarak stok takibi yapılır.
        </div>
        
      </div>

      <!-- Dinamik Form Componenti -->
      <CenterStockForm @success="onSuccess" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CenterStockForm from './components/CenterStockForm.vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const router = useRouter();

function goBack() {
  // Ana merkez stok listesine geri dön
  router.push({ name: 'center-stock-list-home' });
}

async function onSuccess() {
  // Başarılı ekleme sonrası SweetAlert göster ve yönlendirme yap
  await Swal.fire({
    icon: 'success',
    title: 'Başarılı!',
    text: 'Stok Başarıyla Eklendi',
    padding: '2em',
    customClass: { popup: 'sweet-alerts' },
    confirmButtonText: 'Tamam'
  });
  
  // Ana merkez stok listesine yönlendir
  router.push({ name: 'center-stock-list-home' });
}
</script>

<style scoped>
/* Basit stiller - hiç @apply kullanmadan */
.panel {
    background: white;
    border-radius: 8px;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.btn {
    display: inline-flex;
    align-items: center;
    padding: 8px 16px;
    border-radius: 6px;
    font-weight: 500;
    transition: all 0.2s;
    cursor: pointer;
}

.btn-outline-primary {
    border: 1px solid #3b82f6;
    color: #3b82f6;
    background: transparent;
}

.btn-outline-primary:hover {
    background: #3b82f6;
    color: white;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
    .panel {
        background: #1f2937;
        color: white;
    }
}
</style>
