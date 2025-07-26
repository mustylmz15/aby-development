<template>
  <ProductTable :products="products" />
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import ProductTable from './ProductTable.vue';

const props = defineProps<{ products: any[] }>();
</script>
