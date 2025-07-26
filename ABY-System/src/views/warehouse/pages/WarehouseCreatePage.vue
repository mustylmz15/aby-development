<template>
  <div>
    <WarehouseForm
      :warehouseTypes="warehouseTypes"
      :statusOptions="statusOptions"
      @save="onSaveWarehouse"
      @cancel="onCancelForm"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import WarehouseForm from '../components/WarehouseForm.vue';
import type { WarehouseTypeOption, StatusOption, Warehouse } from '../components/types';

const warehouseTypes = ref<WarehouseTypeOption[]>([]);
const statusOptions = ref<StatusOption[]>([]);

function onSaveWarehouse(warehouse: Warehouse) {
  // Kayıt işlemi burada yapılacak
}
function onCancelForm() {
  // Geri dönüş işlemi burada yapılacak
}
</script>
