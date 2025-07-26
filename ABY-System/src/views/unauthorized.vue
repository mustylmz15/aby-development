<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div class="max-w-md w-full space-y-8 p-8">
      <div class="text-center">
        <!-- 403 Forbidden Icon -->
        <div class="mx-auto h-20 w-20 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-6">
          <svg class="h-10 w-10 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m0 0v2m0-2h2m-2 0H10m-7-7a9 9 0 1118 0 9 9 0 01-18 0z"/>
          </svg>
        </div>
        
        <!-- Error Message -->
        <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          403
        </h1>
        <h2 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Yetkisiz Erişim
        </h2>
        <p class="text-gray-500 dark:text-gray-400 mb-8">
          Bu sayfaya erişim yetkiniz bulunmuyor. Lütfen yöneticinizle iletişime geçin.
        </p>
        
        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            @click="goBack" 
            class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            Geri Dön
          </button>
          
          <button 
            @click="goHome" 
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            Ana Sayfa
          </button>
        </div>
        
        <!-- User Info -->
        <div v-if="currentUser" class="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Giriş yapmış kullanıcı: 
            <span class="font-medium text-gray-900 dark:text-gray-100">
              {{ currentUser.name || currentUser.email }}
            </span>
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">
            Farklı bir hesapla giriş yapmak için 
            <button @click="logout" class="text-blue-600 dark:text-blue-400 hover:underline">
              çıkış yapın
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth-store';

const router = useRouter();
const authStore = useAuthStore();

const currentUser = computed(() => authStore.currentUser);

const goBack = () => {
  router.back();
};

const goHome = () => {
  router.push('/');
};

const logout = async () => {
  try {
    await authStore.logout();
    router.push('/auth/boxed-signin');
  } catch (error) {
    console.error('Logout hatası:', error);
  }
};
</script>
