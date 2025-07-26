<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
    <div class="bg-white dark:bg-[#23272f] rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-100 dark:border-gray-700 animate-fadeIn">
      <h3 class="font-extrabold text-xl mb-6 text-primary flex items-center gap-2">
        <i class="fa fa-folder-plus"></i>
        Kategori Ekle/Düzenle
      </h3>
      <form @submit.prevent="$emit('submit', form)">
        <div class="mb-5">
          <label class="block mb-2 font-semibold text-gray-700 dark:text-gray-200">Kategori Adı</label>
          <input v-model="form.name" type="text" class="input input-bordered w-full rounded-lg border-2 border-primary/30 focus:border-primary shadow-sm transition-all duration-200" required placeholder="Kategori adı girin..." />
        </div>
        <!--
        <div class="mb-5">
          <label class="block mb-2 font-semibold text-gray-700 dark:text-gray-200">Üst Kategori</label>
          <select v-model="form.parent" class="input input-bordered w-full rounded-lg border-2 border-primary/30 focus:border-primary shadow-sm transition-all duration-200">
            <option value="">Ana Kategori</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
          </select>
        </div>
        -->
        <div class="flex justify-end gap-3 mt-6">
          <button type="button" class="btn btn-default rounded-lg px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" @click="$emit('cancel')">
            <i class="fa fa-times mr-1"></i>İptal
          </button>
          <button type="submit" class="btn btn-primary rounded-lg px-4 py-2 shadow-md hover:scale-105 transition-transform">
            <i class="fa fa-save mr-1"></i>Kaydet
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps<{ categories: any[], form: any }>();
</script>
