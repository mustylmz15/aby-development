<template>
    <div>
        <ul class="flex space-x-2 rtl:space-x-reverse">
            <li>
                <a href="javascript:;" class="text-primary hover:underline">Proje Yönetimi</a>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <span>Proje Ürün Yapılandırması</span>
            </li>
        </ul>

        <div class="pt-5">
            <div class="panel mb-5">
                <div class="flex items-center justify-between mb-5">
                    <h5 class="font-semibold text-lg dark:text-white-light">Proje Ürün Yapılandırması</h5>
                    <div>
                        <button type="button" class="btn btn-primary" @click="openAddProductSettingModal" :disabled="!selectedProject">
                            <icon-plus class="ltr:mr-2 rtl:ml-2" />
                            Yeni Ürün Ayarı Ekle
                        </button>
                    </div>
                </div>

                <!-- Proje Seçme Bölümü -->
                <div class="mb-5">
                    <label for="projectId" class="form-label">Proje Seçin</label>
                    <select id="projectId" class="form-select" v-model="selectedProjectId">
                        <option value="">Proje Seçin</option>
                        <option v-for="project in availableProjects" :key="project.id" :value="project.id">
                            {{ project.name }}
                        </option>
                    </select>
                </div>

                <div class="mb-5 flex flex-wrap items-center">
                    <div class="flex items-center flex-1">
                        <div class="flex-1">
                            <input type="text" placeholder="Ürün Ara..." class="form-input" v-model="search" />
                        </div>
                    </div>
                </div>

                <!-- Ürün Ayarları Tablosu -->
                <div v-if="selectedProject" class="datatables">
                    <div v-if="loading" class="flex justify-center items-center p-10">
                        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                    </div>
                    <div v-else-if="filteredSettings.length > 0" class="table-responsive">
                        <table class="table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Ürün</th>
                                    <th>Konsinye</th>
                                    <th>Seri No</th>
                                    <th>Onarım Süresi</th>
                                    <th>Min Stok</th>
                                    <th>Max Stok</th>
                                    <th>Durum</th>
                                    <th class="text-center">İşlemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(setting, index) in filteredSettings" :key="setting.id">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ getProductName(setting.productId) }}</td>
                                    <td>
                                        <span :class="{ 'badge bg-success': setting.isConsignment, 'badge bg-danger': !setting.isConsignment }">
                                            {{ setting.isConsignment ? 'Evet' : 'Hayır' }}
                                        </span>
                                    </td>
                                    <td>
                                        <span :class="{ 'badge bg-success': setting.trackSerialNumber, 'badge bg-danger': !setting.trackSerialNumber }">
                                            {{ setting.trackSerialNumber ? 'Evet' : 'Hayır' }}
                                        </span>
                                    </td>
                                    <td>{{ setting.repairTimeInDays }} gün</td>
                                    <td>{{ setting.minStock || '-' }}</td>
                                    <td>{{ setting.maxStock || '-' }}</td>
                                    <td>
                                        <span :class="{ 'badge bg-success': setting.isActive, 'badge bg-danger': !setting.isActive }">
                                            {{ setting.isActive ? 'Aktif' : 'Pasif' }}
                                        </span>
                                    </td>
                                    <td>
                                        <div class="flex items-center justify-center gap-2">
                                            <button type="button" class="btn btn-sm btn-outline-primary" @click="editProductSetting(setting)">
                                                <icon-pencil />
                                            </button>
                                            <button type="button" class="btn btn-sm btn-outline-danger" @click="confirmDeleteSetting(setting)">
                                                <icon-trash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-else class="flex justify-center p-10">
                        <p>Bu proje için henüz ürün ayarı bulunmuyor.</p>
                    </div>
                </div>
                <div v-else class="flex justify-center p-10">
                    <p>Lütfen bir proje seçin.</p>
                </div>
            </div>
        </div>

        <!-- Ürün Ayarı Ekle/Düzenle Modal -->
        <teleport to="#app">
            <transition name="fade">
                <div v-if="showModal" class="fixed inset-0 bg-[black]/60 z-[999] flex items-center justify-center px-4">
                    <div class="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg">
                        <div class="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                            <h5 class="font-bold text-lg">{{ isEditMode ? 'Ürün Ayarını Düzenle' : 'Yeni Ürün Ayarı Ekle' }}</h5>
                            <button type="button" class="text-white-dark hover:text-dark" @click="showModal = false">
                                <icon-x />
                            </button>
                        </div>
                        <div class="p-5">
                            <form @submit.prevent="saveProductSetting">
                                <div class="mb-5">
                                    <label for="productId" class="form-label">Ürün <span class="text-danger">*</span></label>
                                    <select id="productId" class="form-select" v-model="productSettingForm.productId" required :disabled="isEditMode">
                                        <option value="">Ürün Seçin</option>
                                        <option v-for="product in availableProducts" :key="product.id" :value="product.id">
                                            {{ product.name }}
                                        </option>
                                    </select>
                                    <span v-if="formErrors.productId" class="text-danger">{{ formErrors.productId }}</span>
                                </div>

                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div class="mb-5">
                                        <label class="inline-flex">
                                            <input type="checkbox" class="form-checkbox" v-model="productSettingForm.isConsignment" />
                                            <span>Konsinye Ürün</span>
                                        </label>
                                    </div>
                                    <div class="mb-5">
                                        <label class="inline-flex">
                                            <input type="checkbox" class="form-checkbox" v-model="productSettingForm.trackSerialNumber" />
                                            <span>Seri No Takibi</span>
                                        </label>
                                    </div>
                                </div>

                                <div class="mb-5">
                                    <label for="repairTimeInDays" class="form-label">Onarım Süresi (Gün) <span class="text-danger">*</span></label>
                                    <input id="repairTimeInDays" type="number" min="1" class="form-input" v-model="productSettingForm.repairTimeInDays" required />
                                    <span v-if="formErrors.repairTimeInDays" class="text-danger">{{ formErrors.repairTimeInDays }}</span>
                                </div>

                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div class="mb-5">
                                        <label for="minStock" class="form-label">Minimum Stok</label>
                                        <input id="minStock" type="number" min="0" class="form-input" v-model="productSettingForm.minStock" />
                                    </div>
                                    <div class="mb-5">
                                        <label for="maxStock" class="form-label">Maksimum Stok</label>
                                        <input id="maxStock" type="number" min="0" class="form-input" v-model="productSettingForm.maxStock" />
                                    </div>
                                </div>

                                <div class="mb-5">
                                    <label for="reorderLevel" class="form-label">Yeniden Sipariş Noktası</label>
                                    <input id="reorderLevel" type="number" min="0" class="form-input" v-model="productSettingForm.reorderLevel" />
                                </div>

                                <div class="mb-5">
                                    <label for="notes" class="form-label">Notlar</label>
                                    <textarea id="notes" class="form-textarea" v-model="productSettingForm.notes" rows="3" placeholder="Ürün ayarları hakkında notlar..."></textarea>
                                </div>

                                <div class="mb-5">
                                    <label class="inline-flex">
                                        <input type="checkbox" class="form-checkbox" v-model="productSettingForm.isActive" />
                                        <span>Aktif</span>
                                    </label>
                                </div>

                                <div class="flex justify-end items-center mt-8">
                                    <button type="button" class="btn btn-outline-danger ltr:mr-2 rtl:ml-2" @click="showModal = false">İptal</button>
                                    <button type="submit" class="btn btn-primary" :disabled="submitLoading">
                                        {{ submitLoading ? 'Kaydediliyor...' : 'Kaydet' }}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </transition>
        </teleport>

        <!-- Silme Onay Modal -->
        <teleport to="#app">
            <transition name="fade">
                <div v-if="showDeleteModal" class="fixed inset-0 bg-[black]/60 z-[999] flex items-center justify-center px-4">
                    <div class="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg">
                        <div class="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                            <h5 class="font-bold text-lg">Ürün Ayarını Sil</h5>
                            <button type="button" class="text-white-dark hover:text-dark" @click="showDeleteModal = false">
                                <icon-x />
                            </button>
                        </div>
                        <div class="p-5">
                            <div class="mb-5">
                                <p class="mb-4">{{ getProductName(settingToDelete?.productId || '') }} ürününün ayarlarını silmek istediğinize emin misiniz?</p>
                                <p class="text-danger">Bu işlem geri alınamaz!</p>
                            </div>
                            <div class="flex justify-end items-center mt-8">
                                <button type="button" class="btn btn-outline-dark ltr:mr-2 rtl:ml-2" @click="showDeleteModal = false">İptal</button>
                                <button type="button" class="btn btn-danger" @click="deleteProductSetting">Sil</button>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </teleport>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import IconPlus from '@/components/icon/icon-plus.vue';
import IconPencil from '@/components/icon/icon-pencil.vue';
import IconTrash from '@/components/icon/icon-trash.vue';
import IconX from '@/components/icon/icon-x.vue';

// Demo veri tipleri
interface Project {
  id: string;
  name: string;
}
interface Product {
  id: string;
  name: string;
  isActive: boolean;
}
interface ProductSetting {
  id: string;
  projectId: string;
  productId: string;
  isConsignment: boolean;
  trackSerialNumber: boolean;
  repairTimeInDays: number;
  isActive: boolean;
  minStock?: number;
  maxStock?: number;
  reorderLevel?: number;
  notes?: string;
}

// Demo veriler
const availableProjects = ref<Project[]>([
  { id: '1', name: 'Ana Proje' },
  { id: '2', name: 'Yan Proje' },
  { id: '3', name: 'Test Proje' }
]);
const availableProducts = ref<Product[]>([
  { id: 'p1', name: 'Kamera', isActive: true },
  { id: 'p2', name: 'Switch', isActive: true },
  { id: 'p3', name: 'Kayıt Cihazı', isActive: true },
  { id: 'p4', name: 'Demo Sensör', isActive: false }
]);
const projectProductSettings = ref<ProductSetting[]>([
  {
    id: 's1',
    projectId: '1',
    productId: 'p1',
    isConsignment: false,
    trackSerialNumber: true,
    repairTimeInDays: 5,
    isActive: true,
    minStock: 2,
    maxStock: 10,
    reorderLevel: 3,
    notes: 'Ana kamera'
  },
  {
    id: 's2',
    projectId: '2',
    productId: 'p2',
    isConsignment: true,
    trackSerialNumber: false,
    repairTimeInDays: 10,
    isActive: false,
    minStock: 1,
    maxStock: 5,
    reorderLevel: 2,
    notes: 'Switch demo'
  },
  {
    id: 's3',
    projectId: '3',
    productId: 'p4',
    isConsignment: false,
    trackSerialNumber: false,
    repairTimeInDays: 3,
    isActive: true,
    minStock: 0,
    maxStock: 2,
    reorderLevel: 1,
    notes: 'Demo sensör ayarı'
  }
]);

const loading = ref(false);
const submitLoading = ref(false);
const search = ref('');
const selectedProjectId = ref('');
const showModal = ref(false);
const showDeleteModal = ref(false);
const isEditMode = ref(false);
const settingToDelete = ref<ProductSetting | null>(null);

const productSettingForm = reactive<ProductSetting>({
  id: '',
  projectId: '',
  productId: '',
  isConsignment: false,
  trackSerialNumber: true,
  repairTimeInDays: 5,
  isActive: true,
  minStock: 0,
  maxStock: 0,
  reorderLevel: 0,
  notes: ''
});
const formErrors = reactive<{ productId: string; repairTimeInDays: string }>({ productId: '', repairTimeInDays: '' });

const selectedProject = computed(() => {
  if (!selectedProjectId.value) return null;
  return availableProjects.value.find(p => p.id === selectedProjectId.value) || null;
});

const filteredSettings = computed(() => {
  if (!projectProductSettings.value) return [];
  let list = projectProductSettings.value.filter(s => s.projectId === selectedProjectId.value);
  if (!search.value.trim()) return list;
  const searchTerm = search.value.toLowerCase().trim();
  return list.filter(setting => {
    const productName = getProductName(setting.productId).toLowerCase();
    return productName.includes(searchTerm);
  });
});

const getProductName = (productId) => {
  const product = availableProducts.value.find(p => p.id === productId);
  return product ? product.name : productId;
};

const openAddProductSettingModal = () => {
  if (!selectedProjectId.value) {
    alert('Lütfen önce bir proje seçin.');
    return;
  }
  isEditMode.value = false;
  Object.assign(productSettingForm, {
    id: '',
    projectId: selectedProjectId.value,
    productId: '',
    isConsignment: false,
    trackSerialNumber: true,
    repairTimeInDays: 5,
    isActive: true,
    minStock: 0,
    maxStock: 0,
    reorderLevel: 0,
    notes: ''
  });
  formErrors.productId = '';
  formErrors.repairTimeInDays = '';
  showModal.value = true;
};

const editProductSetting = (setting: ProductSetting) => {
  if (!setting) return;
  isEditMode.value = true;
  Object.assign(productSettingForm, setting);
  formErrors.productId = '';
  formErrors.repairTimeInDays = '';
  showModal.value = true;
};

const validateForm = () => {
  formErrors.productId = '';
  formErrors.repairTimeInDays = '';
  let isValid = true;
  if (!productSettingForm.productId) {
    formErrors.productId = 'Lütfen bir ürün seçin.';
    isValid = false;
  }
  if (!productSettingForm.repairTimeInDays || productSettingForm.repairTimeInDays <= 0) {
    formErrors.repairTimeInDays = 'Lütfen geçerli bir onarım süresi girin.';
    isValid = false;
  }
  return isValid;
};

const saveProductSetting = () => {
  if (!validateForm()) return;
  submitLoading.value = true;
  setTimeout(() => {
    if (isEditMode.value && productSettingForm.id) {
      // Güncelle
      const idx = projectProductSettings.value.findIndex(s => s.id === productSettingForm.id);
      if (idx !== -1) projectProductSettings.value[idx] = { ...productSettingForm };
      alert('Ürün ayarları başarıyla güncellendi.');
    } else {
      // Yeni ekle
      const newId = 's' + (projectProductSettings.value.length + 1);
      projectProductSettings.value.push({ ...productSettingForm, id: newId });
      alert('Ürün ayarları başarıyla eklendi.');
    }
    submitLoading.value = false;
    showModal.value = false;
  }, 500);
};

const confirmDeleteSetting = (setting: ProductSetting) => {
  if (!setting) return;
  settingToDelete.value = setting;
  showDeleteModal.value = true;
};

const deleteProductSetting = () => {
  if (!settingToDelete.value || !('id' in settingToDelete.value) || !settingToDelete.value.id) return;
  const idToDelete = (settingToDelete.value as ProductSetting).id;
  projectProductSettings.value = projectProductSettings.value.filter(s => s.id !== idToDelete);
  showDeleteModal.value = false;
  alert('Ürün ayarı başarıyla silindi.');
};
</script>
