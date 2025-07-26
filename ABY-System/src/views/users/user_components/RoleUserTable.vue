<template>
  <div class="bg-white rounded-b-lg shadow-lg overflow-hidden">
    <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900 flex items-center">
          <svg class="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          Kullanıcılar
        </h3>
        <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
          <slot name="userCount">0 kullanıcı</slot>
        </span>
      </div>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-100 border-b border-gray-200">
          <tr>
            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">KULLANICI</th>
            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">E-POSTA</th>
            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">ROLLER</th>
            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">PROJELER</th>
            <th class="px-6 py-4 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider">İŞLEMLER</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <slot />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
// Sadece tablo ve slot, logic yok
</script>
