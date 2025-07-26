<template>
  <div>
    <div class="panel mb-6">
      <div class="flex items-center justify-between mb-4">
        <h5 class="text-lg font-semibold">Ana Merkez Stok Listesi</h5>
        <router-link to="/inventory/center-stock/add" class="btn btn-primary">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Stok Ekle
        </router-link>
      </div>
      <CenterStockTable />
    </div>
  </div>
</template>

<script setup lang="ts">
import CenterStockTable from './components/CenterStockTable.vue';
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
}
.btn-primary {
  background: #3b82f6;
  color: white;
  border: none;
}
.btn-primary:hover {
  background: #2563eb;
}
</style>
