<template>
  <div class="table-responsive">
    <table class="table-striped w-full">
      <thead>
        <tr>
          <th class="p-2">Proje Adı</th>
          <th class="p-2">Açıklama</th>
          <th class="p-2">Oluşturulma Tarihi</th>
          <th class="p-2">Durum</th>
          <th class="p-2">İşlemler</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td class="p-2 font-semibold">{{ project.name }}</td>
          <td class="p-2">{{ project.description }}</td>
          <td class="p-2">{{ project.createdAt }}</td>
          <td class="p-2">
            <span :class="project.status === 'Aktif' ? 'badge badge-outline-success' : 'badge badge-outline-danger'">
              {{ project.status }}
            </span>
          </td>
          <td class="p-2 flex gap-2">
            <button class="btn btn-sm btn-info" @click="$emit('detail', project)">Detay</button>
            <button class="btn btn-sm btn-warning" @click="$emit('edit', project)">Düzenle</button>
            <button class="btn btn-sm btn-danger" @click="$emit('delete', project)">Sil</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{ projects: Array<any> }>();
</script>
