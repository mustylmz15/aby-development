<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
    <div class="bg-white dark:bg-[#23272f] rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-100 dark:border-gray-700 animate-fadeIn">
      <h3 class="font-extrabold text-xl mb-6 text-danger flex items-center gap-2">
        <i class="fa fa-trash"></i>
        Kategori Silme
      </h3>
      <p class="mb-6 text-gray-700 dark:text-gray-200">
        <span v-if="category">"<b>{{ category.name }}</b>" kategorisini silmek istediğinizden emin misiniz? <br> <span class="text-xs text-danger font-bold">Bu işlem geri alınamaz.</span></span>
        <span v-else>Bu kategoriyi silmek istediğinizden emin misiniz? <br> <span class="text-xs text-danger font-bold">Bu işlem geri alınamaz.</span></span>
      </p>
      <div class="flex justify-end gap-3 mt-6">
        <button class="btn btn-default rounded-lg px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" @click="$emit('cancel')">
          <i class="fa fa-times mr-1"></i>İptal
        </button>
        <button class="btn btn-danger rounded-lg px-4 py-2 shadow-md hover:scale-105 transition-transform" @click="$emit('delete')">
          <i class="fa fa-trash mr-1"></i>Sil
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{ category?: { id: number; name: string; parent: string; createdAt: string } }>();
</script>
