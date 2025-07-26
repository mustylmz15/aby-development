<template>
    <div>
        <ul class="flex space-x-2 rtl:space-x-reverse">
            <li>
                <a href="javascript:;" class="text-primary hover:underline">Proje Yönetimi</a>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <span>Malzeme Talep Onayları</span>
            </li>
        </ul>

        <div class="pt-5">
            <div class="panel mb-5">
                <div class="flex items-center justify-between mb-5">
                    <h5 class="font-semibold text-lg dark:text-white-light">Malzeme Talep Onayları</h5>
                    <div class="flex items-center gap-2">
                        <button type="button" class="btn btn-outline-primary" @click="loadPendingRequests">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 ltr:mr-2 rtl:ml-2"><polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path></svg>
                            Yenile
                        </button>
                    </div>
                </div>

                <!-- Proje Seçme Bölümü -->
                <div class="mb-5">
                    <label for="projectId" class="form-label">Proje Seçin</label>
                    <select id="projectId" class="form-select" v-model="selectedProjectId" @change="loadPendingRequests">
                        <option value="">Proje Seçin</option>
                        <option v-for="project in availableProjects" :key="project.id" :value="project.id">
                            {{ project.name }}
                        </option>
                    </select>
                </div>

                <div class="mb-5 flex flex-wrap items-center">
                    <div class="flex items-center flex-1">
                        <div class="flex-1">
                            <input type="text" placeholder="Talep Ara..." class="form-input" v-model="search" />
                        </div>
                    </div>
                </div>

                <!-- Talepler Tablosu -->
                <div v-if="selectedProjectId" class="datatables">
                    <div v-if="loading" class="flex justify-center items-center p-10">
                        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                    </div>
                    <div v-else-if="filteredRequests.length > 0" class="table-responsive">
                        <table class="table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Talep Eden</th>
                                    <th>Kaynak Proje</th>
                                    <th>Talep Tarihi</th>
                                    <th>Öncelik</th>
                                    <th>Durum</th>
                                    <th class="text-center">İşlemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(request, index) in filteredRequests" :key="request.id">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ request.requesterName }}</td>
                                    <td>{{ getProjectName(request.sourceProjectId) }}</td>
                                    <td>{{ formatDate(request.requestDate) }}</td>
                                    <td>
                                        <span :class="{
                                            'badge bg-success': request.priority === 'low',
                                            'badge bg-warning': request.priority === 'medium',
                                            'badge bg-danger': request.priority === 'high'
                                        }">
                                            {{ translatePriority(request.priority) }}
                                        </span>
                                    </td>
                                    <td>
                                        <span :class="{
                                            'badge bg-info': request.status === 'requested',
                                            'badge bg-success': request.status === 'approved',
                                            'badge bg-danger': request.status === 'rejected',
                                            'badge bg-warning': request.status === 'processing',
                                            'badge bg-primary': request.status === 'completed'
                                        }">
                                            {{ translateStatus(request.status) }}
                                        </span>
                                    </td>
                                    <td>
                                        <div class="flex items-center justify-center gap-2">
                                            <button 
                                                type="button" 
                                                class="btn btn-sm btn-outline-primary" 
                                                @click="viewRequestDetails(request)"
                                            >
                                                Detaylar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-else class="flex justify-center p-10">
                        <p>Onay bekleyen malzeme talebi bulunmuyor.</p>
                    </div>
                </div>
                <div v-else class="flex justify-center p-10">
                    <p>Lütfen bir proje seçin.</p>
                </div>
            </div>
        </div>

        <!-- Talep Detay Modal -->
        <teleport to="#app">
            <transition name="fade">
                <div v-if="showDetailsModal" class="fixed inset-0 bg-[black]/60 z-[999] flex items-center justify-center px-4">
                    <div class="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-4xl">
                        <div class="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                            <h5 class="font-bold text-lg">Malzeme Talep Detayı</h5>
                            <button type="button" class="text-white-dark hover:text-dark" @click="closeDetailsModal">
                                <icon-x />
                            </button>
                        </div>
                        <div class="p-5 max-h-[80vh] overflow-y-auto">
                            <div v-if="selectedRequest">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                                    <div>
                                        <p><strong>Talep Eden:</strong> {{ selectedRequest.requesterName }}</p>
                                        <p><strong>Talep Tarihi:</strong> {{ formatDate(selectedRequest.requestDate) }}</p>
                                        <p><strong>Kaynak Proje:</strong> {{ getProjectName(selectedRequest.sourceProjectId) }}</p>
                                        <p v-if="selectedRequest.requesterDepartment"><strong>Departman:</strong> {{ selectedRequest.requesterDepartment }}</p>
                                    </div>
                                    <div>
                                        <p><strong>Öncelik:</strong> {{ translatePriority(selectedRequest.priority) }}</p>
                                        <p><strong>Durum:</strong> {{ translateStatus(selectedRequest.status) }}</p>
                                        <p v-if="selectedRequest.requiredDate"><strong>İhtiyaç Tarihi:</strong> {{ formatDate(selectedRequest.requiredDate) }}</p>
                                    </div>
                                </div>

                                <div class="mb-5" v-if="selectedRequest.notes">
                                    <p><strong>Notlar:</strong> {{ selectedRequest.notes }}</p>
                                </div>

                                <h6 class="font-semibold mb-3">Talep Edilen Malzemeler</h6>
                                <div class="table-responsive mb-5" v-if="selectedRequest && Array.isArray(selectedRequest.requestItems)">
                                    <table class="table-striped">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Ürün</th>
                                                <th>Talep Miktarı</th>
                                                <th>Onay Miktarı</th>
                                                <th v-if="selectedRequest.status === 'requested'">İşlem</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in selectedRequest.requestItems" :key="index">
                                                <td>{{ index + 1 }}</td>
                                                <td>{{ item.productName }}</td>
                                                <td>{{ item.requestedQuantity }}</td>
                                                <td>
                                                    <input 
                                                        v-if="selectedRequest.status === 'requested'" 
                                                        type="number" 
                                                        class="form-input w-24" 
                                                        :min="0" 
                                                        :max="item.requestedQuantity"
                                                        v-model="item.approvedQuantity" 
                                                    />
                                                    <span v-else>{{ item.approvedQuantity || 0 }}</span>
                                                </td>
                                                <td v-if="selectedRequest.status === 'requested'">
                                                    <button 
                                                        type="button" 
                                                        class="btn btn-sm" 
                                                        :class="item.approvedQuantity === item.requestedQuantity ? 'btn-outline-success' : 'btn-outline-warning'"
                                                        @click="setApprovedQuantity(index, item.requestedQuantity)"
                                                    >
                                                        {{ item.approvedQuantity === item.requestedQuantity ? 'Tam Onay' : 'Tam Onayla' }}
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div class="mb-5" v-if="selectedRequest.status === 'requested'">
                                    <label for="approvalNotes" class="form-label">Onay/Red Notu</label>
                                    <textarea id="approvalNotes" class="form-textarea" v-model="approvalNotes" rows="3" placeholder="Onay veya red için notlarınızı buraya yazabilirsiniz..."></textarea>
                                </div>

                                <div class="flex justify-end items-center gap-3">
                                    <button 
                                        v-if="selectedRequest.status === 'requested'" 
                                        type="button" 
                                        class="btn btn-danger" 
                                        @click="rejectRequest">
                                        Talebi Reddet
                                    </button>
                                    <button 
                                        v-if="selectedRequest.status === 'requested'" 
                                        type="button" 
                                        class="btn btn-success" 
                                        @click="approveRequest">
                                        Talebi Onayla
                                    </button>
                                    <button type="button" class="btn btn-outline-dark" @click="closeDetailsModal">Kapat</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </teleport>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

type MaterialRequestItem = {
  productId: string;
  productName: string;
  requestedQuantity: number;
  approvedQuantity?: number;
  serialNumbers?: any[];
};

type MaterialRequest = {
  id: string;
  requesterName: string;
  sourceProjectId: string;
  requestDate: string;
  priority: string;
  status: string;
  notes?: string;
  requesterDepartment?: string;
  requiredDate?: string;
  requestItems: MaterialRequestItem[];
};
import IconX from '@/components/icon/icon-x.vue';

// MOCK DATA
const availableProjects = ref([
  { id: '1', name: 'Ana Proje' },
  { id: '2', name: 'Yan Proje' }
]);

const materialRequests = ref([
  {
    id: 'req1',
    requesterName: 'Ahmet Yılmaz',
    sourceProjectId: '1',
    requestDate: '2025-06-20T14:32:00Z',
    priority: 'high',
    status: 'requested',
    notes: 'Acil ihtiyaç',
    requesterDepartment: 'Bakım',
    requiredDate: '2025-06-25T00:00:00Z',
    requestItems: [
      { productId: 'p1', productName: 'Kamera', requestedQuantity: 5, approvedQuantity: 5, serialNumbers: [] },
      { productId: 'p2', productName: 'Switch', requestedQuantity: 2, approvedQuantity: 2, serialNumbers: [] }
    ]
  }
]);

const loading = ref(false);
const search = ref('');
const selectedProjectId = ref('');
const showDetailsModal = ref(false);
const selectedRequest = ref<MaterialRequest | null>(null);
const approvalNotes = ref('');

const filteredRequests = computed(() => {
  if (!Array.isArray(materialRequests.value)) return [];
  if (!selectedProjectId.value) return [];
  let list = materialRequests.value.filter(r => r.sourceProjectId === selectedProjectId.value);
  if (!search.value.trim()) return list;
  const searchTerm = search.value.toLowerCase().trim();
  return list.filter(request =>
    (request.requesterName?.toLowerCase().includes(searchTerm) ||
      getProjectName(request.sourceProjectId).toLowerCase().includes(searchTerm) ||
      (request.notes && request.notes.toLowerCase().includes(searchTerm)))
  );
});

const loadPendingRequests = () => {
  // Mock veri olduğu için gerek yok, loading animasyonu için kullanılabilir
  loading.value = true;
  setTimeout(() => { loading.value = false; }, 500);
};

const getProjectName = (projectId) => {
  const project = availableProjects.value.find(p => p.id === projectId);
  return project ? project.name : projectId;
};

const viewRequestDetails = (request: MaterialRequest) => {
  selectedRequest.value = JSON.parse(JSON.stringify(request));
  if (selectedRequest.value && Array.isArray(selectedRequest.value.requestItems)) {
    selectedRequest.value.requestItems.forEach(item => {
      if (item.approvedQuantity === undefined) {
        item.approvedQuantity = item.requestedQuantity;
      }
    });
  }
  approvalNotes.value = '';
  showDetailsModal.value = true;
};

const closeDetailsModal = () => {
  showDetailsModal.value = false;
  selectedRequest.value = null;
  approvalNotes.value = '';
};

const setApprovedQuantity = (index: number, requestedQuantity: number) => {
  if (selectedRequest.value && Array.isArray(selectedRequest.value.requestItems)) {
    selectedRequest.value.requestItems[index].approvedQuantity = requestedQuantity;
  }
};

const approveRequest = () => {
  if (!selectedRequest.value || !selectedRequest.value.id) return;
  loading.value = true;
  setTimeout(() => {
    if (selectedRequest.value) selectedRequest.value.status = 'approved';
    loading.value = false;
    closeDetailsModal();
    // Mock: listedeki statüyü de güncelle
    const idx = materialRequests.value.findIndex(r => r.id === selectedRequest.value?.id);
    if (idx !== -1) materialRequests.value[idx].status = 'approved';
    alert('Malzeme talebi başarıyla onaylandı.');
  }, 700);
};

const rejectRequest = () => {
  if (!selectedRequest.value || !selectedRequest.value.id) return;
  if (!confirm('Bu talebi reddetmek istediğinizden emin misiniz?')) return;
  loading.value = true;
  setTimeout(() => {
    if (selectedRequest.value) selectedRequest.value.status = 'rejected';
    loading.value = false;
    closeDetailsModal();
    // Mock: listedeki statüyü de güncelle
    const idx = materialRequests.value.findIndex(r => r.id === selectedRequest.value?.id);
    if (idx !== -1) materialRequests.value[idx].status = 'rejected';
    alert('Malzeme talebi reddedildi.');
  }, 700);
};

const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
  }).format(date);
};

const translatePriority = (priority) => {
  switch (priority) {
    case 'low': return 'Düşük';
    case 'medium': return 'Orta';
    case 'high': return 'Yüksek';
    default: return priority;
  }
};

const translateStatus = (status) => {
  switch (status) {
    case 'draft': return 'Taslak';
    case 'requested': return 'Talep Edildi';
    case 'approved': return 'Onaylandı';
    case 'rejected': return 'Reddedildi';
    case 'processing': return 'İşlemde';
    case 'completed': return 'Tamamlandı';
    case 'cancelled': return 'İptal Edildi';
    default: return status;
  }
};
</script>
