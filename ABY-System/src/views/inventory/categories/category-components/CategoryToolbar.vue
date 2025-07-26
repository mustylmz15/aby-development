<template>
  <div class="flex gap-2 mt-2 md:mt-0">
    <input v-model="search" type="text" class="input input-sm" placeholder="Kategori ara..." style="min-width: 200px;" />
    <button class="btn btn-primary btn-sm" @click="$emit('add')">Ekle</button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const search = ref('');
</script>
