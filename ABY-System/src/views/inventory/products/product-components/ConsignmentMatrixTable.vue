<script setup lang="ts">
import { ref, computed } from 'vue';
import ToggleSwitch from '@/components/ui/ToggleSwitch.vue';
import ModernCombobox from './ModernCombobox.vue';
import type { ProjectProduct } from './types';

const props = defineProps<{
  items: ProjectProduct[];
  loading: boolean;
  onSave: (item: ProjectProduct) => void;
  onToggle: (projectId: string, productId: string, value: boolean) => void;
}>();

// Filter state
const selectedProjectId = ref<string>('');
const isTableExpanded = ref<boolean>(false);

// Get unique projects from items
const projects = computed(() => {
  const uniqueProjects = new Map();
  props.items.forEach(item => {
    if (item.project && !uniqueProjects.has(item.project.id)) {
      uniqueProjects.set(item.project.id, {
        id: item.project.id,
        name: item.project.name,
        code: item.project.code
      });
    }
  });
  return Array.from(uniqueProjects.values());
});

// Filtered items
const filteredItems = computed(() => {
  if (!selectedProjectId.value) {
    return props.items;
  }
  return props.items.filter(item => item.projectId === selectedProjectId.value);
});
</script>

<template>
  <div>    <!-- Project Filter -->
    <div class="mb-6 bg-gray-50 p-4 rounded-lg relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="relative z-20">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Proje Filtresi
          </label>
          <ModernCombobox
            v-model="selectedProjectId"
            :options="projects"
            placeholder="Proje seçin (tümü için boş bırakın)"
            searchPlaceholder="Proje ara..."
            :clearable="true"
          />
        </div><div class="flex items-end justify-between">
          <div class="text-sm text-gray-600">
            <div>Toplam kayıt: {{ items.length }}</div>
            <div>Proje sayısı: {{ projects.length }}</div>
            <div v-if="selectedProjectId">Filtrelenmiş: {{ filteredItems.length }}</div>
          </div>
          <button
            @click="isTableExpanded = !isTableExpanded"
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2"
          >
            <i :class="isTableExpanded ? 'las la-eye-slash' : 'las la-eye'"></i>
            {{ isTableExpanded ? 'Tabloyu Gizle' : 'Tabloyu Göster' }}
          </button>
        </div>
      </div>
    </div>    <!-- Collapsible Table Section -->
    <div v-if="isTableExpanded" class="mt-4 transition-all duration-300">
      <div v-if="loading" class="text-center py-10">Yükleniyor...</div>
      <div v-else class="overflow-x-auto bg-white rounded-lg shadow-sm border">
        <table class="table-hover min-w-full">
        <thead>
          <tr>
            <th class="min-w-[120px]">Ürün</th>
            <th class="min-w-[120px]">Proje</th>
            <th class="min-w-[120px]">isConsignment</th>
            <th class="min-w-[200px]">Ürün Detayı</th>
            <th class="min-w-[200px]">Proje Detayı</th>
            <th class="min-w-[120px]">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredItems" :key="item.id" class="hover:bg-gray-50">
            <td>
              <span class="font-medium">{{ item.product?.name }}</span>
              <div class="text-xs text-gray-500">{{ item.productId }}</div>
            </td>
            <td>
              <span class="font-medium">{{ item.project?.name }}</span>
              <div class="text-xs text-gray-500">{{ item.projectId }}</div>
            </td>
            <td class="text-center">
              <ToggleSwitch
                :modelValue="item.isConsignment"
                @update:modelValue="onToggle(item.projectId, item.productId, $event)"
                size="small"
              />
            </td>
            <td>
              <div><b>SKU:</b> {{ item.product?.sku }}</div>
              <div><b>Kategori:</b> {{ item.product?.category }}</div>
              <div><b>Marka:</b> {{ item.product?.brand }}</div>
              <div><b>Model:</b> {{ item.product?.model }}</div>
              <div><b>Min Stok:</b> {{ item.product?.minimumStock }}</div>
            </td>
            <td>
              <div><b>Kod:</b> {{ item.project?.code }}</div>
              <div><b>Açıklama:</b> {{ item.project?.description }}</div>
              <div><b>Durum:</b> {{ item.project?.status }}</div>
              <div><b>Oluşturulma:</b> {{ item.project?.createdAt }}</div>
            </td>
            <td>
              <button class="btn btn-success btn-sm" @click="onSave(item)"><i class="las la-save mr-1"></i>Kaydet</button>
            </td>
          </tr>        </tbody>
      </table>
    </div>
  </div>
  <!-- Empty State -->
  <div v-if="!isTableExpanded" class="text-center py-8 text-gray-500">
    <i class="las la-table text-4xl mb-2"></i>
    <p>Konsinyasyon tablosunu görmek için "Tabloyu Göster" butonuna tıklayın</p>
  </div>
</div>
</template>
