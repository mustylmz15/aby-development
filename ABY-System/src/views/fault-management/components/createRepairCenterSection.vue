<template>
  <div>
    <!--
    <h3 class="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Onarım Merkezi Bilgileri</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Onarım Merkezi Ata
        </label>
        <select v-model="modelValue" class="form-select">
          <option value="">Onarım Merkezi Seçin</option>
          <option v-for="center in repairCenters" :key="center.id" :value="center.id">
            {{ center.name }} - {{ center.location }}
          </option>
        </select>
      </div>
    </div>
    -->
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, toRefs, watch } from 'vue';

interface RepairCenter {
  id: string;
  name: string;
  location: string;
}

const props = defineProps<{
  modelValue: string;
  repairCenters: RepairCenter[];
}>();
const emit = defineEmits(['update:modelValue']);
const { modelValue, repairCenters } = toRefs(props);

watch(modelValue, (val) => {
  emit('update:modelValue', val);
});
</script>
