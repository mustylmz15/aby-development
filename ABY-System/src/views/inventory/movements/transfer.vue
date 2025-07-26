<template>
  <div>
    <!-- Modern Breadcrumb -->
    <nav class="mb-6">
      <ul class="flex items-center space-x-3 rtl:space-x-reverse">
        <li>
          <a href="javascript:;" class="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-semibold hover:underline transition-colors duration-200">
            <i class="fa fa-cubes mr-2"></i>
            Envanter
          </a>
        </li>
        <li class="text-gray-500 dark:text-gray-400">
          <i class="fa fa-chevron-right text-xs"></i>
        </li>
        <li>
          <a href="javascript:;" class="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-semibold hover:underline transition-colors duration-200">
            Stok Hareketleri
          </a>
        </li>
        <li class="text-gray-500 dark:text-gray-400">
          <i class="fa fa-chevron-right text-xs"></i>
        </li>
        <li>
          <span class="text-gray-800 dark:text-gray-200 font-semibold">Yeni Transfer</span>
        </li>
      </ul>
    </nav>

    <div class="pt-2">
      <div class="panel shadow-lg rounded-2xl bg-white dark:bg-[#23272f] p-6">
        <!-- Modern Header -->
        <div class="mb-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="p-3 bg-gradient-to-br from-emerald-500 to-green-700 rounded-2xl shadow-lg">
                <i class="fa fa-exchange-alt text-2xl text-white"></i>
              </div>
              <div>
                <h5 class="font-bold text-2xl text-gray-900 dark:text-white tracking-tight">Stok Transferi</h5>
                <p class="text-gray-600 dark:text-gray-300 mt-1 text-lg font-medium">Yeni stok transfer işlemi oluşturun</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <button 
                type="button" 
                class="inline-flex items-center gap-2 rounded-lg bg-gray-200 text-gray-700 px-4 py-2 text-sm font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-200"
                @click="goBack"
              >
                <i class="fa fa-arrow-left"></i>
                <span>Geri</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Transfer Form -->
        <TransferForm />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import TransferForm from './components/TransferForm.vue';

const router = useRouter();

function goBack() {
  // Stok hareketleri listesine geri dönüş
  router.push('/inventory/movements');
}
</script>

<style scoped>
.panel {
  background-color: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(229, 231, 235, 0.8);
}

:global(.dark) .panel {
  background-color: #1b2e4b;
  border-color: rgba(75, 85, 99, 0.3);
}
</style>
