<template>
  <div class="flex items-center justify-end space-x-4 pt-6 border-t">
    <a href="#" class="btn btn-outline-secondary" @click.prevent="onCancel">İptal</a>
    <button type="submit" class="btn btn-primary">Ürün Ekle</button>
  </div>
</template>
<script setup lang="ts">
import { defineEmits } from 'vue';
const emit = defineEmits(['cancel']);
const onCancel = () => emit('cancel');
</script>
