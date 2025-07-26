<template>
  <div v-if="visible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
    <div class="bg-white dark:bg-gray-800 rounded shadow p-6 w-full max-w-md">
      <h3 class="font-semibold text-lg mb-4">Proje Ekle / Düzenle</h3>
      <form @submit.prevent="onSave">
        <div class="mb-3">
          <label class="block mb-1">PYP Kodu</label>
          <input v-model="form.code" class="form-input w-full" required />
        </div>
        <div class="mb-3">
          <label class="block mb-1">Proje Adı</label>
          <input v-model="form.name" class="form-input w-full" required />
        </div>
        <div class="mb-3">
          <label class="block mb-1">Açıklama</label>
          <input v-model="form.description" class="form-input w-full" required />
        </div>
        <div class="mb-3 flex items-center gap-2">
          <label class="block mb-1">Durum</label>
          <input type="checkbox" v-model="form.status" true-value="Aktif" false-value="Pasif" id="statusCheck" />
          <label for="statusCheck">Aktif mi?</label>
        </div>
        <div class="mb-3">
          <label class="block mb-1">Proje Başlangıç Tarihi</label>
          <input type="date" v-model="form.startDate" class="form-input w-full" />
        </div>
        <div class="mb-3">
          <label class="block mb-1">Proje Bitiş Tarihi</label>
          <input type="date" v-model="form.endDate" class="form-input w-full" />
        </div>
        <div class="mb-3">
          <label class="block mb-1">SLA Süresi (gün)</label>
          <input v-model.number="form.sla" type="number" min="0" class="form-input w-full" placeholder="SLA süresi giriniz" />
        </div>
        <div class="mb-3">
          <label class="block mb-1">Organizasyon</label>
          <input class="form-input w-full" :value="form.organizationId" disabled />
          <small class="text-gray-500">* Organizasyon şu an değiştirilemez.</small>
        </div>
        <div class="flex justify-end gap-2">
          <button type="button" class="btn btn-secondary" @click="$emit('close')">İptal</button>
          <button type="submit" class="btn btn-primary">Kaydet</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps<{ visible: boolean, project?: any }>();
const emit = defineEmits(['save', 'close']);

const ORGANIZATION_ID = 'e5f759a4-21ce-477c-8369-b9f359a7bb8e';

const form = ref({ id: '', code: '', name: '', description: '', status: 'Aktif', organizationId: ORGANIZATION_ID, startDate: '', endDate: '', sla: 0 });

watch(() => props.project, (val) => {
  if (val) {
    form.value = {
      id: val.id || '',
      code: val.code || '',
      name: val.name || '',
      description: val.description || '',
      status: val.status || 'Aktif',
      organizationId: ORGANIZATION_ID,
      startDate: val.startDate ? val.startDate.substring(0, 10) : '',
      endDate: val.endDate ? val.endDate.substring(0, 10) : '',
      sla: typeof val.sla === 'number' ? val.sla : 0
    };
  }
}, { immediate: true });

function onSave() {
  emit('save', { ...form.value });
}
</script>
