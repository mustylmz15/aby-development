<template>
  <div>
    <h4 class="font-semibold mb-2">Bağlı Projeler</h4>
    <ul>
      <li v-for="project in projects" :key="project.id">
        {{ project.name }} <span class="text-xs text-gray-500">({{ project.status }})</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Project } from './types';

const props = defineProps<{ projects: Project[] }>();
</script>
