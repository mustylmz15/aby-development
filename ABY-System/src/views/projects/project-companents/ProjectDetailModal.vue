<template>
  <div v-if="visible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
    <div class="bg-white dark:bg-gray-800 rounded shadow p-6 w-full max-w-md">
      <h3 class="font-semibold text-lg mb-4">Proje Detayları</h3>
      <div class="mb-2"><b>ID:</b> {{ project.id }}</div>
      <div class="mb-2"><b>Kod:</b> {{ project.code }}</div>
      <div class="mb-2"><b>Ad:</b> {{ project.name }}</div>
      <div class="mb-2"><b>Açıklama:</b> {{ project.description }}</div>
      <div class="mb-2"><b>Durum:</b> {{ project.status }}</div>
      <div class="mb-2"><b>Başlangıç:</b> {{ project.startDate || '-' }}</div>
      <div class="mb-2"><b>Bitiş:</b> {{ project.endDate || '-' }}</div>
      <div class="mb-2"><b>OrganizationId:</b> {{ project.organizationId }}</div>
      <div class="mb-2"><b>SLA Süresi (gün):</b> {{ project.sla ?? '-' }}</div>
      <div class="mb-2"><b>Oluşturulma:</b> {{ project.createdAt }}</div>
      <div class="mb-2"><b>Güncellenme:</b> {{ project.updatedAt || '-' }}</div>
      <div class="flex justify-end mt-4">
        <button class="btn btn-secondary" @click="$emit('close')">Kapat</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps<{ visible: boolean, project: any }>();
defineEmits(['close']);
</script>
