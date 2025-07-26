<template>
  <div class="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white p-6 rounded-t-lg">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <div class="bg-white bg-opacity-20 p-3 rounded-lg">
          <slot name="icon">
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
            </svg>
          </slot>
        </div>
        <div>
          <h1 class="text-2xl font-bold">
            <slot name="title">Rol Yönetimi</slot>
          </h1>
          <p class="text-blue-100 mt-1">
            <slot name="subtitle">Kullanıcıların rollerini ve yetkilerini yönetin</slot>
          </p>
        </div>
      </div>
      <slot name="actions">
        <button class="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2" disabled>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          <span>Yenile</span>
        </button>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
// Sadece slot tabanlı header, logic yok
</script>
