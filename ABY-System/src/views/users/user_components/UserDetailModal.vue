<template>
  <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden">
      <!-- Header -->
      <div class="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-white">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold flex items-center gap-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Kullanıcı Detayları
          </h2>
          <button @click="$emit('close')" class="text-white/80 hover:text-white transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Content -->
      <div class="p-6 max-h-[calc(90vh-120px)] overflow-y-auto" v-if="user">
        <!-- Kullanıcı Profil Kartı -->
        <div class="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-700 dark:to-blue-900/20 rounded-lg p-6 mb-6 border border-gray-200 dark:border-gray-600">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
              {{ (user.firstName?.[0] || '') + (user.lastName?.[0] || '') }}
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-1">{{ user.firstName }} {{ user.lastName }}</h3>
              <p class="text-gray-600 dark:text-gray-300 flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                {{ user.email }}
              </p>
            </div>
          </div>
        </div>
        <!-- Roller Kartı -->
        <div class="bg-white dark:bg-gray-700 rounded-lg p-6 mb-6 border border-gray-200 dark:border-gray-600 shadow-sm">
          <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            Roller
          </h4>
          <div class="space-y-3" v-if="user.assignments?.length">
            <div v-for="assignment in user.assignments" 
                 :key="assignment.id || assignment.role + assignment.resourceType + assignment.resourceId"
                 class="bg-gray-50 dark:bg-gray-600 rounded-lg p-3 border border-gray-200 dark:border-gray-500">
              <div class="flex items-center gap-3">
                <span class="px-3 py-1 rounded-lg text-xs font-semibold bg-blue-500 text-white">
                  {{ assignment.role }}
                </span>
                <div class="text-sm text-gray-600 dark:text-gray-300" v-if="assignment.resourceType">
                  <span class="font-medium">{{ assignment.resourceType }}</span>
                  <span v-if="assignment.resourceId" class="text-gray-500 dark:text-gray-400">: 
                    {{ assignment.resourceType === 'PROJECT' ? getProjectName(assignment.resourceId) : 
                       assignment.resourceType === 'WAREHOUSE' ? getWarehouseName(assignment.resourceId) : 
                       assignment.resourceId }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-6 text-gray-500 dark:text-gray-400">
            <svg class="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p>Henüz rol ataması bulunmuyor</p>
          </div>
        </div>
        <!-- Proje Atamaları -->
        <div v-if="projectAssignments.length" class="bg-white dark:bg-gray-700 rounded-lg p-6 mb-6 border border-gray-200 dark:border-gray-600 shadow-sm">
          <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Proje Atamaları
          </h4>
          <form @submit.prevent="deleteSelectedProjects">
            <div class="bg-gray-50 dark:bg-gray-600 rounded-lg p-4 mb-4 max-h-40 overflow-y-auto border border-gray-200 dark:border-gray-500">
              <div v-if="isLoadingNames" class="flex items-center justify-center py-4">
                <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-500"></div>
                <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">İsimler yükleniyor...</span>
              </div>
              <div v-else class="space-y-3">
                <label v-for="p in projectAssignments" :key="p.resourceId" 
                       class="flex items-center gap-3 p-3 rounded-lg hover:bg-white dark:hover:bg-gray-500 cursor-pointer transition-colors border border-transparent hover:border-purple-200 dark:hover:border-purple-600">
                  <input type="checkbox" v-model="selectedProjectIds" :value="p.resourceId" 
                         class="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ getProjectName(p.resourceId) }}</span>
                  </div>
                </label>
              </div>
            </div>
            <button type="submit" 
                    class="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2" 
                    :disabled="selectedProjectIds.length === 0">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Seçili Proje Atamalarını Sil ({{ selectedProjectIds.length }})
            </button>
          </form>
        </div>
        <!-- Depo Atamaları -->
        <div v-if="warehouseAssignments.length" class="bg-white dark:bg-gray-700 rounded-lg p-6 mb-6 border border-gray-200 dark:border-gray-600 shadow-sm">
          <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
            </svg>
            Depo Atamaları
          </h4>
          <form @submit.prevent="deleteSelectedWarehouses">
            <div class="bg-gray-50 dark:bg-gray-600 rounded-lg p-4 mb-4 max-h-40 overflow-y-auto border border-gray-200 dark:border-gray-500">
              <div v-if="isLoadingNames" class="flex items-center justify-center py-4">
                <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-500"></div>
                <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">İsimler yükleniyor...</span>
              </div>
              <div v-else class="space-y-3">
                <label v-for="w in warehouseAssignments" :key="w.resourceId" 
                       class="flex items-center gap-3 p-3 rounded-lg hover:bg-white dark:hover:bg-gray-500 cursor-pointer transition-colors border border-transparent hover:border-indigo-200 dark:hover:border-indigo-600">
                  <input type="checkbox" v-model="selectedWarehouseIds" :value="w.resourceId" 
                         class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ getWarehouseName(w.resourceId) }}</span>
                  </div>
                </label>
              </div>
            </div>
            <button type="submit" 
                    class="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2" 
                    :disabled="selectedWarehouseIds.length === 0">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Seçili Depo Atamalarını Sil ({{ selectedWarehouseIds.length }})
            </button>
          </form>
        </div>
      </div>

      <!-- Footer -->
      <div class="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-t border-gray-200 dark:border-gray-600">
        <div class="flex justify-end">
          <button @click="$emit('close')" 
                  class="px-6 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors font-medium">
            Kapat
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import Swal from 'sweetalert2';

const props = defineProps<{ 
  visible: boolean; 
  user: any; 
}>();

const emit = defineEmits<{
  close: () => void;
  deleted: () => void;
  projectAssignmentsDeleted: (projectIds: string[]) => void;
}>();

// Proje ve depo isimlerini tutacak state'ler
const projectNames = ref<Record<string, string>>({});
const warehouseNames = ref<Record<string, string>>({});
const isLoadingNames = ref(false);

const projectAssignments = computed(() => props.user?.assignments?.filter((a:any) => a.resourceType === 'PROJECT') || []);
const warehouseAssignments = computed(() => props.user?.assignments?.filter((a:any) => a.resourceType === 'WAREHOUSE') || []);

const selectedProjectIds = ref<string[]>([]);
const selectedWarehouseIds = ref<string[]>([]);

// İsim getirme fonksiyonları
const getProjectName = (id: string) => {
  if (isLoadingNames.value) return `${id} (Yükleniyor...)`;
  return projectNames.value[id] || id;
};

const getWarehouseName = (id: string) => {
  if (isLoadingNames.value) return `${id} (Yükleniyor...)`;
  return warehouseNames.value[id] || id;
};

// Proje isimlerini API'den çek
async function fetchProjectNames() {
  const projectIds = projectAssignments.value.map(p => p.resourceId);
  if (projectIds.length === 0) return;

  isLoadingNames.value = true;
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/projects`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      const projects = await response.json();
      const projectsArray = Array.isArray(projects) ? projects : (projects.data || []);
      
      const nameMap: Record<string, string> = {};
      projectsArray.forEach((project: any) => {
        if (project.id && (project.name || project.title)) {
          nameMap[project.id] = project.name || project.title;
        }
      });
      projectNames.value = nameMap;
    }
  } catch (error) {
    console.warn('Proje isimleri getirilemedi:', error);
  } finally {
    isLoadingNames.value = false;
  }
}

// Depo isimlerini API'den çek
async function fetchWarehouseNames() {
  const warehouseIds = warehouseAssignments.value.map(w => w.resourceId);
  if (warehouseIds.length === 0) return;

  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/warehouses`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      const warehouses = await response.json();
      const warehousesArray = Array.isArray(warehouses) ? warehouses : (warehouses.data || []);
      
      const nameMap: Record<string, string> = {};
      warehousesArray.forEach((warehouse: any) => {
        if (warehouse.id && (warehouse.name || warehouse.title)) {
          nameMap[warehouse.id] = warehouse.name || warehouse.title;
        }
      });
      warehouseNames.value = nameMap;
    }
  } catch (error) {
    console.warn('Depo isimleri getirilemedi:', error);
  }
}

// Watch ile modal açılıp kapandığında state'i temizle ve isimleri çek
watch(() => props.visible, (isVisible) => { 
  if (isVisible) { 
    selectedProjectIds.value = []; 
    selectedWarehouseIds.value = [];
    // Modal açıldığında isimleri çek
    fetchProjectNames();
    fetchWarehouseNames();
  } 
});

// User değiştiğinde de state'i temizle ve isimleri çek
watch(() => props.user, (newUser) => {
  selectedProjectIds.value = [];
  selectedWarehouseIds.value = [];
  if (newUser) {
    fetchProjectNames();
    fetchWarehouseNames();
  }
});

async function deleteSelectedProjects() {
  if (!props.user?.id || selectedProjectIds.value.length === 0) return;
  
  try {
    const result = await Swal.fire({
      title: 'Proje Atamalarını Sil',
      text: 'Seçili projeleri silmek istediğinize emin misiniz?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Evet, Sil!',
      cancelButtonText: 'İptal',
      padding: '2em',
      customClass: { popup: 'sweet-alerts' }
    });
    
    if (!result.isConfirmed) return;
    
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/remove-project-assignments`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ userId: props.user.id, warehouseIds: selectedProjectIds.value })
    });
    
    if (!response.ok) throw new Error('Projeler silinemedi!');
    
    // Emit'i try-catch içinde koruyalım
    try {
      emit('projectAssignmentsDeleted', selectedProjectIds.value);
    } catch (emitError) {
      console.warn('Emit error:', emitError);
    }
    
    selectedProjectIds.value = [];
    
    await Swal.fire({
      icon: 'success',
      title: 'Başarılı!',
      text: 'Seçili projeler silindi!',
      padding: '2em',
      customClass: { popup: 'sweet-alerts' },
      confirmButtonText: 'Tamam'
    });
  } catch (e) {
    console.error('Delete projects error:', e);
    await Swal.fire({
      icon: 'error',
      title: 'Hata!',
      text: 'Projeler silinirken hata oluştu!',
      padding: '2em',
      customClass: { popup: 'sweet-alerts' },
      confirmButtonText: 'Tamam'
    });
  }
}

async function deleteSelectedWarehouses() {
  if (!props.user?.id || selectedWarehouseIds.value.length === 0) return;
  
  try {
    const result = await Swal.fire({
      title: 'Depo Atamalarını Sil',
      text: 'Seçili depoları silmek istediğinize emin misiniz?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Evet, Sil!',
      cancelButtonText: 'İptal',
      padding: '2em',
      customClass: { popup: 'sweet-alerts' }
    });
    
    if (!result.isConfirmed) return;
    
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/remove-warehouse-assignments`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ userId: props.user.id, warehouseIds: selectedWarehouseIds.value })
    });
    
    if (!response.ok) throw new Error('Depolar silinemedi!');
    
    selectedWarehouseIds.value = [];
    
    await Swal.fire({
      icon: 'success',
      title: 'Başarılı!',
      text: 'Seçili depolar silindi!',
      padding: '2em',
      customClass: { popup: 'sweet-alerts' },
      confirmButtonText: 'Tamam'
    });
  } catch (e) {
    console.error('Delete warehouses error:', e);
    await Swal.fire({
      icon: 'error',
      title: 'Hata!',
      text: 'Depolar silinirken hata oluştu!',
      padding: '2em',
      customClass: { popup: 'sweet-alerts' },
      confirmButtonText: 'Tamam'
    });
  }
}
</script>
