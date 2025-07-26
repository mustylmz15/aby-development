<template>
  <tr>
    <!-- id sütunu kaldırıldı -->
    <!-- parentId sütunu kaldırıldı -->
    <td>{{ product.sku }}</td>
    <td>{{ product.name }}</td>
    <td>{{ product.description }}</td>
    <td>{{ product.category }}</td>
    <td>{{ product.brand }}</td>
    <td>{{ product.model }}</td>
    <td>
      <button
        class="inline-flex items-center gap-1 rounded-full bg-blue-100 text-blue-700 border border-blue-200 px-3 py-1 text-xs font-semibold shadow-sm hover:bg-blue-200 hover:text-blue-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        @click="$emit('show-detail', product)"
      >
        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H9m12 0A9 9 0 11 3 12a9 9 0 0118 0z" /></svg>
        Detay
      </button>
    </td>
  </tr>
</template>

<script setup lang="ts">
const props = defineProps<{ product: any }>();
</script>
