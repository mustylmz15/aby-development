<template>
  <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
      <h2 class="text-lg font-bold mb-4">Rol Atamalarını Sil</h2>
      <form @submit.prevent="deleteSelectedAssignments">
        <ul>
          <li v-for="assignment in assignments" :key="assignment.id" class="flex items-center justify-between mb-2">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" v-model="selectedIds" :value="assignment.id" />
              <span>
                <b>{{ assignment.role }}</b>
                <span class="text-xs text-gray-500 ml-2">{{ assignment.resourceType }}<span v-if="assignment.resourceId">: {{ assignment.resourceId }}</span></span>
              </span>
            </label>
          </li>
        </ul>
        <div class="flex gap-2 mt-4">
          <button type="submit" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" :disabled="selectedIds.length === 0">Seçili Olanları Sil</button>
          <button type="button" class="px-4 py-2 bg-gray-200 rounded" @click="$emit('close')">Kapat</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  visible: boolean,
  assignments: any[],
  userId: string
}>();
const emit = defineEmits(['close', 'deleted']);

import { ref, watch } from 'vue';
import Swal from 'sweetalert2';
import { usersApi } from '../api/users-api';

const selectedIds = ref<string[]>([]);

watch(() => props.visible, (val) => {
  if (val) selectedIds.value = [];
});

async function deleteSelectedAssignments() {
  if (selectedIds.value.length === 0) return;
  
  const result = await Swal.fire({
    title: 'Rol Atamalarını Sil',
    text: 'Seçili rol atamalarını silmek istediğinize emin misiniz?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Evet, Sil!',
    cancelButtonText: 'İptal',
    padding: '2em',
    customClass: { popup: 'sweet-alerts' }
  });
  
  if (!result.isConfirmed) return;
  try {
    await usersApi.removeAssignments(selectedIds.value);
    emit('deleted', selectedIds.value);
    await Swal.fire({
      icon: 'success',
      title: 'Başarılı!',
      text: 'Seçili rol atamaları silindi!',
      padding: '2em',
      customClass: { popup: 'sweet-alerts' },
      confirmButtonText: 'Tamam'
    });
  } catch (e) {
    await Swal.fire({
      icon: 'error',
      title: 'Hata!',
      text: 'Silme sırasında hata oluştu!',
      padding: '2em',
      customClass: { popup: 'sweet-alerts' },
      confirmButtonText: 'Tamam'
    });
  }
}
</script>
