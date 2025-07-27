<template>
  <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-hidden">
      <!-- Header -->
      <div class="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4 text-white">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold flex items-center gap-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Rol Düzenle
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
        <!-- Kullanıcı Bilgileri -->
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-lg font-bold">
              {{ (user.firstName?.[0] || '') + (user.lastName?.[0] || '') }}
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ user.firstName }} {{ user.lastName }}</h3>
              <p class="text-gray-600 dark:text-gray-300">{{ user.email }}</p>
            </div>
          </div>
        </div>
        <!-- Mevcut Roller -->
        <div class="mb-6">
          <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            Mevcut Roller
          </h4>
          <div class="space-y-3 max-h-48 overflow-y-auto">
            <div v-for="assignment in user.assignments" 
                 :key="assignment.id || (assignment.resourceType + '-' + assignment.resourceId + '-' + assignment.role)" 
                 class="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4 shadow-sm">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <span :class="getRoleBadgeClass(assignment.role)" class="px-3 py-1 rounded-lg text-xs font-semibold">
                    {{ assignment.role }}
                  </span>
                  <div class="text-sm text-gray-600 dark:text-gray-300">
                    <span class="font-medium">{{ assignment.resourceType }}</span>
                    <span v-if="assignment.resourceId" class="text-gray-500">: {{ assignment.resourceId }}</span>
                  </div>
                </div>
                <button @click="removeAssignment(assignment)" 
                        :disabled="deletingAssignmentId === assignment.id" 
                        class="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            <div v-if="!user.assignments?.length" class="text-center py-8 text-gray-500 dark:text-gray-400">
              <svg class="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p>Henüz rol ataması bulunmuyor</p>
            </div>
          </div>
        </div>
        <!-- Yeni Rol Atama -->
        <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
          <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Yeni Rol Ataması
          </h4>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rol</label>
              <select v-model="multiAssign.role" 
                      class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Rol Seçin</option>
                <option v-for="role in roleOptions" :key="role" :value="role">{{ role }}</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Kaynak Tipi</label>
              <select v-model="multiAssign.resourceType"
                      class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                      :disabled="multiAssign.role === 'ADMIN'">
                <option value="">Kaynak Tipi Seçin</option>
                <option v-for="type in resourceTypeOptions" :key="type" :value="type">{{ type }}</option>
              </select>
            </div>
          </div>

          <!-- Çoklu kaynak seçimi -->
          <div v-if="multiAssign.resourceType && resourceOptions.length" class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Kaynaklar</label>
            <div class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-3 max-h-40 overflow-y-auto">
              <div class="space-y-2">
                <label v-for="item in resourceOptions" :key="item.id" 
                       class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer transition-colors">
                  <input type="checkbox" v-model="multiAssign.selectedResourceIds" :value="item.id" 
                         class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span class="text-sm text-gray-700 dark:text-gray-300">{{ item.name || item.title || item.id }}</span>
                </label>
              </div>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">{{ multiAssign.selectedResourceIds.length }} kaynak seçildi</p>
          </div>
          
          <button @click="assignMultiple" 
                  class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2" 
                  :disabled="!multiAssign.role || !multiAssign.resourceType || multiAssign.selectedResourceIds.length === 0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Atama Yap
          </button>
        </div>
      </div>

      <!-- Footer -->
      <div class="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-t border-gray-200 dark:border-gray-600">
        <div class="flex justify-end gap-3">
          <button @click="$emit('close')" 
                  class="px-6 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors font-medium">
            İptal
          </button>
          <button @click="save" 
                  class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Kaydet
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, watch, reactive, computed } from 'vue';
import type { User, Assignment } from './roleTypes';
import { RESOURCE_API_MAP } from './resourceApiMap';
import Swal from 'sweetalert2';
import { usersApi } from '../api/users-api';

const props = defineProps<{
  visible: boolean;
  user: User | null;
}>();
const emit = defineEmits(['close', 'save']);

// Rol badge renkleri
const getRoleBadgeClass = (role: string) => {
  const colorMap: Record<string, string> = {
    'ADMIN': 'bg-gradient-to-r from-red-500 to-red-600 text-white',
    'DEPO_PERSONELI': 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white',
    'PROJE_ADMINI': 'bg-gradient-to-r from-purple-500 to-purple-600 text-white',
    'SAHA_PERSONELI': 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white',
  };
  return colorMap[role] || 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
};

// Dinamik resourceType listesi (kullanıcı assignment'larından unique olarak çıkarılır)
const resourceTypeOptions = computed(() => {
  if (!props.user) return [];
  const types = props.user.assignments.map(a => a.resourceType);
  // resourceApiMap'te tanımlı olanlar + mevcut assignment'lardan unique olanlar
  const apiTypes = Object.keys(RESOURCE_API_MAP);
  return Array.from(new Set([...types, ...apiTypes]));
});


const editedAssignments = ref<Assignment[]>([]);
// Çoklu atama için yeni state
const multiAssign = reactive({
  role: '',
  resourceType: '',
  selectedResourceIds: [] as string[],
});
const resourceOptions = ref<any[]>([]);
const isLoadingResources = ref(false);

// Silinen assignment'ın id'sini tutan state
const deletingAssignmentId = ref<string | number | null>(null);

// ADMIN rolü seçildiğinde resourceType otomatik PROJECT ve disabled olacak
watch(() => multiAssign.role, (role) => {
  if (role === 'ADMIN') {
    multiAssign.resourceType = 'PROJECT';
  } else {
    multiAssign.resourceType = '';
  }
  multiAssign.selectedResourceIds = [];
});

const isResourceIdRequired = computed(() => {
  // PROJE_ADMINI ve DEPO_PERSONELI için resourceId zorunlu
  return multiAssign.role === 'PROJE_ADMINI' || multiAssign.role === 'DEPO_PERSONELI';
});

watch(() => props.user, (val) => {
  if (val) {
    editedAssignments.value = JSON.parse(JSON.stringify(val.assignments));
  }
});

watch(() => multiAssign.resourceType, async (type) => {
  multiAssign.selectedResourceIds = [];
  resourceOptions.value = [];
  if (!type || !RESOURCE_API_MAP[type]) return;
  isLoadingResources.value = true;
  try {
    if (type === 'PROJECT') {
      const data = await usersApi.getProjects();
      resourceOptions.value = Array.isArray(data) ? data : [];
    } else if (type === 'WAREHOUSE') {
      const data = await usersApi.getWarehouses();
      resourceOptions.value = Array.isArray(data) ? data : [];
    } else {
      resourceOptions.value = [];
    }
  } catch (e) {
    resourceOptions.value = [];
  }
  isLoadingResources.value = false;
});
// Çoklu atama fonksiyonu
async function assignMultiple() {
  if (!props.user || !multiAssign.role || !multiAssign.resourceType || multiAssign.selectedResourceIds.length === 0) return;
  // Sadece PROJECT_USER veya PROJE_ADMINI gibi roller için çoklu atama örneği
  if (multiAssign.resourceType === 'PROJECT') {
    try {
      await usersApi.assignProjects(props.user.id, multiAssign.selectedResourceIds, multiAssign.role);
      await Swal.fire({
        icon: 'success',
        title: 'Başarılı!',
        text: 'Projeler başarıyla atandı!',
        padding: '2em',
        customClass: { popup: 'sweet-alerts' },
        confirmButtonText: 'Tamam'
      });
      // Yeni atanan assignment'ları local state'e ekle
      multiAssign.selectedResourceIds.forEach(pid => {
        editedAssignments.value.push({
          role: multiAssign.role,
          resourceType: multiAssign.resourceType,
          resourceId: pid
        });
      });
      multiAssign.role = '';
      multiAssign.resourceType = '';
      multiAssign.selectedResourceIds = [];
      // Sadece local state'i güncelle, emit('save') YAPMA!
      // Kaydet butonuna basınca toplu olarak gönderilecek
    } catch (e) {
      await Swal.fire({
        icon: 'error',
        title: 'Hata!',
        text: 'Proje atama sırasında hata oluştu!',
        padding: '2em',
        customClass: { popup: 'sweet-alerts' },
        confirmButtonText: 'Tamam'
      });
    }
  } else if (multiAssign.resourceType === 'WAREHOUSE') {
    try {
      await usersApi.assignWarehouses(props.user!.id, multiAssign.selectedResourceIds, multiAssign.role);
      await Swal.fire({
        icon: 'success',
        title: 'Başarılı!',
        text: 'Depolar başarıyla atandı!',
        padding: '2em',
        customClass: { popup: 'sweet-alerts' },
        confirmButtonText: 'Tamam'
      });
      // Yeni atanan assignment'ları local state'e ekle
      multiAssign.selectedResourceIds.forEach(wid => {
        editedAssignments.value.push({
          role: multiAssign.role,
          resourceType: multiAssign.resourceType,
          resourceId: wid
        });
      });
      multiAssign.role = '';
      multiAssign.resourceType = '';
      multiAssign.selectedResourceIds = [];
      // Sadece local state'i güncelle, emit('save') YAPMA!
      // Kaydet butonuna basınca toplu olarak gönderilecek
    } catch (e) {
      await Swal.fire({
        icon: 'error',
        title: 'Hata!',
        text: 'Depo atama sırasında hata oluştu!',
        padding: '2em',
        customClass: { popup: 'sweet-alerts' },
        confirmButtonText: 'Tamam'
      });
    }
  }
}

// addAssignment fonksiyonu artık kullanılmıyor, çoklu atama ile değiştirildi


async function removeAssignment(assignment: Assignment) {
  if (assignment.id) {
    deletingAssignmentId.value = assignment.id;
    try {
      await usersApi.deleteAssignment(assignment.id);
    } catch (e) {
      await Swal.fire({
        icon: 'error',
        title: 'Hata!',
        text: 'Rol silme sırasında hata oluştu!',
        padding: '2em',
        customClass: { popup: 'sweet-alerts' },
        confirmButtonText: 'Tamam'
      });
      deletingAssignmentId.value = null;
      return;
    }
    deletingAssignmentId.value = null;
  }
  // Local state'den çıkar
  editedAssignments.value = editedAssignments.value.filter(a => {
    if (a.id && assignment.id) {
      return a.id !== assignment.id;
    }
    // id yoksa resourceType, resourceId ve role ile eşleşeni sil
    return !(
      a.role === assignment.role &&
      a.resourceType === assignment.resourceType &&
      a.resourceId === assignment.resourceId
    );
  });
}

function save() {
  // Hem assignments hem de roles dizisini birlikte gönder
  const roles = editedAssignments.value.map(a => a.role);
  emit('save', editedAssignments.value, roles);
}

// Dinamik rol seçenekleri (AssignmentRole enumu)
const roleOptions = ref<string[]>([]);

// Enum rolleri API'den çek
async function fetchRoles() {
  try {
    const data = await usersApi.getEnums();
    // AssignmentRole alanı array ise ata
    if (data && Array.isArray(data.AssignmentRole)) {
      roleOptions.value = data.AssignmentRole;
    } else if (data && data.data && Array.isArray(data.data.AssignmentRole)) {
      roleOptions.value = data.data.AssignmentRole;
    } else {
      roleOptions.value = [];
    }
  } catch (e) {
    roleOptions.value = [];
  }
}

// Modal açıldığında rolleri çek
watch(() => props.visible, (val) => {
  if (val) fetchRoles();
});
</script>
