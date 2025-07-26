<template>
  <div>
    <h4 class="font-semibold mb-2">Depo Logları</h4>
    <ul>
      <li v-for="log in logs" :key="log.id">
        {{ log.message }} <span class="text-xs text-gray-400">({{ log.created_at }})</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { WarehouseLog } from './types';

const props = defineProps<{ logs: WarehouseLog[] }>();
</script>
