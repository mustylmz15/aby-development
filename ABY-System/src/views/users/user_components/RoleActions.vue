<template>
  <div class="flex items-center justify-end space-x-2">
    <button class="group relative bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg text-xs font-medium flex items-center shadow-md" :disabled="!canView" @click="$emit('view')">
      <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
      </svg>
      <span>Detay</span>
    </button>
    <button class="group relative bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg text-xs font-medium flex items-center shadow-md disabled:opacity-50" :disabled="!canEdit" @click="$emit('edit')">
      <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
      </svg>
      <span>Düzenle</span>
    </button>
    <button v-if="canDelete" class="group relative bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg text-xs font-medium flex items-center shadow-md disabled:opacity-50" :disabled="!canDelete" @click="$emit('delete')">
      <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
      </svg>
      <span>Rol Sil</span>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ canView?: boolean; canEdit?: boolean; canDelete?: boolean }>();
</script>
