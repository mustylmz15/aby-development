<template>
  <div>
    <h4 class="font-semibold mb-2">Atanmış Kullanıcılar</h4>
    <ul>
      <li v-for="assignment in assignments" :key="assignment.id">
        {{ assignment.user_id }} - {{ assignment.role }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Assignment } from './types';

const props = defineProps<{ assignments: Assignment[] }>();
</script>
