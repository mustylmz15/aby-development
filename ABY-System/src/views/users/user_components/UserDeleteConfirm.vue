<template>
  <div>
    <div class="mb-5 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-12 h-12 text-danger mx-auto mb-4"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
      <h5 class="text-lg font-bold mb-2">Emin misiniz?</h5>
      <p class="text-base">
        <b v-if="user">{{ user.first_name }} {{ user.last_name }}</b> adlı kullanıcıyı silmek istediğinizden emin misiniz?
      </p>
      <p class="text-danger mt-4 font-semibold">Bu işlem geri alınamaz!</p>
    </div>
    <div class="flex justify-center items-center mt-8">
      <button type="button" class="btn btn-outline-dark" @click="$emit('cancel')">İptal</button>
      <button type="button" class="btn btn-danger ltr:ml-4 rtl:mr-4" @click="$emit('confirm')">Kullanıcıyı Sil</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface UserProfile {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password?: string;
}

defineProps<{ user?: UserProfile }>();
defineEmits(['confirm', 'cancel']);
</script>
