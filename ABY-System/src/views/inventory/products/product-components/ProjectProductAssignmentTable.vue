
<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Project, Product, ProjectProduct } from './types';
import ModernCombobox from './ModernCombobox.vue';

const emit = defineEmits(['assign']);
const props = defineProps<{
  projects: Project[];
  products: Product[];
  assignments: ProjectProduct[];
}>();

const selectedProjectId = ref<string>(''); // Atama için proje seçimi
const selectedProductIds = ref<string[]>([]);
const filterProjectId = ref<string>(''); // Filtreleme için ayrı proje seçimi
const showAssignments = ref(false); // Varsayılan olarak gizli

// Computed properties for formatted options
const projectOptions = computed(() => 
  props.projects.map(project => ({
    id: project.id,
    name: project.name,
    code: project.code
  }))
);

const productOptions = computed(() => 
  props.products.map(product => ({
    id: product.id,
    name: product.name,
    sku: product.sku
  }))
);

// Filtered assignments based on filter project (independent from assignment project)
const filteredAssignments = computed(() => {
  if (!filterProjectId.value) {
    return props.assignments;
  }
  return props.assignments.filter(assignment => assignment.projectId === filterProjectId.value);
});

// Assign function - now handles multiple products to one project
const handleAssign = () => {
  if (selectedProjectId.value && selectedProductIds.value.length > 0) {
    selectedProductIds.value.forEach(productId => {
      emit('assign', selectedProjectId.value, productId);
    });
    // Clear selections after assignment
    selectedProjectId.value = '';
    selectedProductIds.value = [];
  }
};
</script>

<template>
  <div class="space-y-6">
    <!-- Modern Form Section -->
    <div class="panel">
      <div class="mb-6">
        <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Yeni Atama Yap
        </h4>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Projelere ürün atamak için aşağıdaki alanları doldurun
        </p>
      </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Project Selection -->
        <div class="space-y-3">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Proje Seçin (Tekli Seçim)
          </label>          <ModernCombobox
            v-model="selectedProjectId"
            :options="projectOptions"
            placeholder="Proje seçiniz..."
            search-placeholder="Projede ara..."
            label="Projeler"
            :clearable="true"
          />
        </div>

        <!-- Product Selection -->
        <div class="space-y-3">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Ürünler Seçin (Çoklu Seçim)
          </label>
          <ModernCombobox
            v-model="selectedProductIds"
            :options="productOptions"
            :multiple="true"
            placeholder="Ürün seçiniz..."
            search-placeholder="Üründe ara..."
            label="Ürünler"
          />
          <p class="text-xs text-gray-500" v-if="selectedProductIds.length > 0">
            {{ selectedProductIds.length }} ürün seçildi
          </p>
        </div>
      </div>

      <!-- Action Button -->
      <div class="flex justify-end mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          class="btn btn-primary px-6 py-2.5 font-medium transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!selectedProjectId || selectedProductIds.length === 0"
          @click="handleAssign"
        >
          <span class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Seçilen Ürünleri Projeye Ata
          </span>
        </button>
      </div>
    </div>    <!-- Assignment Table Section -->
    <div class="panel">
      <div class="mb-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Mevcut Atamalar
          </h4>
          <button
            @click="showAssignments = !showAssignments"
            class="btn btn-outline-secondary btn-sm gap-2"
          >
            <svg 
              class="w-4 h-4 transform transition-transform duration-200" 
              :class="{ 'rotate-180': showAssignments }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
            {{ showAssignments ? 'Gizle' : 'Göster' }}
          </button>
        </div>
        
        <div class="flex items-center gap-4">          <!-- Project Filter -->
          <div class="flex items-center gap-2">
            <label class="text-sm text-gray-600 dark:text-gray-400">Filtrele:</label>
            <div class="min-w-[200px]">
              <ModernCombobox
                v-model="filterProjectId"
                :options="projectOptions"
                placeholder="Tüm Projeler"
                search-placeholder="Projede ara..."
                :clearable="true"
              />
            </div>
          </div>
          
          <div class="text-sm text-gray-500">
            {{ filteredAssignments.length }} atama
          </div>
        </div>
      </div>
      
      <div v-show="showAssignments" class="overflow-hidden transition-all duration-300">
        <div v-if="filteredAssignments.length === 0" class="text-center py-8 text-gray-500">
          <svg class="mx-auto w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>          <p class="text-gray-500 dark:text-gray-400">
            {{ filterProjectId ? 'Bu proje için atama bulunamadı' : 'Henüz proje-ürün ataması yapılmamış' }}
          </p>
          <p class="text-sm text-gray-400 dark:text-gray-500 mt-1">Yukarıdan yeni atama yapabilirsiniz</p>
        </div>
        
        <!-- Assignment Table -->
        <div v-else class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-200 dark:border-gray-700">
                <th class="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Proje</th>
                <th class="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Ürün</th>
                <th class="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Durum</th>
                <th class="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Konsinye</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="assignment in filteredAssignments" :key="`${assignment.projectId}-${assignment.productId}`" 
                  class="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td class="py-3 px-4">
                  <div>
                    <div class="font-medium text-gray-900 dark:text-gray-100">{{ assignment.project?.name }}</div>
                    <div class="text-sm text-gray-500">{{ assignment.project?.code }}</div>
                  </div>
                </td>
                <td class="py-3 px-4">
                  <div>
                    <div class="font-medium text-gray-900 dark:text-gray-100">{{ assignment.product?.name }}</div>
                    <div class="text-sm text-gray-500">{{ assignment.product?.sku }}</div>
                  </div>
                </td>
                <td class="py-3 px-4">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                    Atanmış
                  </span>
                </td>
                <td class="py-3 px-4">
                  <span v-if="assignment.isConsignment" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400">
                    Konsinye
                  </span>
                  <span v-else class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400">
                    Normal
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

