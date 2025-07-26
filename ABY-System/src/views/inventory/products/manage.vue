<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { fetchProjectProducts, updateProjectProductConsignment } from './product-components/project-product-api';
import { createProjectProduct } from './product-components/project-product-create-api';
import { fetchProjects, fetchProducts } from './product-components/project-product-list-api';
import ConsignmentMatrixTable from './product-components/ConsignmentMatrixTable.vue';
import ProjectProductAssignmentTable from './product-components/ProjectProductAssignmentTable.vue';
import ModernCombobox from './product-components/ModernCombobox.vue';
import BaseModal from './product-components/BaseModal.vue';
import { useMeta } from '@/composables/use-meta';

// Icon imports
import IconBox from '@/components/icon/icon-box.vue';
import IconUsers from '@/components/icon/icon-users.vue';
import IconSettings from '@/components/icon/icon-settings.vue';
import IconRefresh from '@/components/icon/icon-refresh.vue';
import IconX from '@/components/icon/icon-x.vue';
import IconArrowLeft from '@/components/icon/icon-arrow-left.vue';

// Meta title
useMeta({ title: 'Proje Ürün Yönetimi' });

// Router
const router = useRouter();


// Proje ve Ürünler için state
import type { Ref } from 'vue';

interface Project {
  id: string;
  code: string;
  name: string;
  [key: string]: any;
}
interface Product {
  id: string;
  sku: string;
  name: string;
  [key: string]: any;
}
interface ProjectProduct {
  id: string;
  projectId: string;
  productId: string;
  isConsignment: boolean;
  project: Project;
  product: Product;
}

const projects: Ref<Project[]> = ref([]);
const products: Ref<Product[]> = ref([]);
const projectProductMatrix: Ref<ProjectProduct[]> = ref([]);

// Yeni eklenen state'ler - listview için
const projectSearchTerm = ref('');
const productSearchTerm = ref('');
const filteredProjects = ref<Project[]>([]);
const filteredProducts = ref<Product[]>([]);
const selectedProject = ref<Project | null>(null);
const selectedProducts = ref<Product[]>([]);
const existingAssignments = ref<ProjectProduct[]>([]);
const assignmentLoading = ref(false);

const loading = ref(false);
// Modal state
const showAssignmentModal = ref(false);
const showConsignmentModal = ref(false);

// Token'ı localStorage'dan veya .env'den al
const token = localStorage.getItem('token') || '';

onMounted(async () => {
  loading.value = true;
  try {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
    // Proje ve ürünleri ayrı ayrı çek
    const [projectList, productList, assignmentList] = await Promise.all([
      fetchProjects(token, baseUrl),
      fetchProducts(token, baseUrl),
      fetchProjectProducts(token)
    ]);
    projects.value = projectList;
    products.value = productList;
    projectProductMatrix.value = assignmentList;
    
    // Filtreleri de başlat - Alt parçaları hariç tut
    filteredProjects.value = [...projectList];
    filteredProducts.value = productList.filter(product => 
      product.category !== 'Alt Parçalar' && 
      product.category !== 'Alt Parca' && 
      product.category !== 'alt-parca'
    );
  } catch (e) {
    // Hata yönetimi
    console.error('API Hatası:', e);
  } finally {
    loading.value = false;
  }
});



const setConsignmentValue = (projectId: string, productId: string, value: boolean) => {
  const found = projectProductMatrix.value.find(
    (item: ProjectProduct) => item.projectId === projectId && item.productId === productId
  );
  if (found) found.isConsignment = value;
};


const saveConsignment = async (item: ProjectProduct) => {
  try {
    const payload = {
      projectId: item.projectId,
      productId: item.productId,
      isConsignment: item.isConsignment
    };
    console.log('Konsinye güncelleme payload:', payload);
    await updateProjectProductConsignment(
      token,
      item.projectId,
      item.productId,
      item.isConsignment
    );
    alert('Konsinye durumu başarıyla güncellendi!');
  } catch (e) {
    alert('Konsinye güncelleme hatası!');
    console.error(e);
  }
};

const activeTab = ref<'assignment' | 'consignment'>('assignment');

const openAssignmentModal = () => {
  showAssignmentModal.value = true;
};
const openConsignmentModal = () => {
  showConsignmentModal.value = true;
};
const closeAssignmentModal = () => {
  showAssignmentModal.value = false;
};
const closeConsignmentModal = () => {
  showConsignmentModal.value = false;
};

const assignProductToProject = async (projectId: string, productId: string) => {
  try {
    await createProjectProduct(token, {
      projectId,
      productId,
      isConsignment: false
    });
    // Atama sonrası tabloyu güncelle
    const assignmentList = await fetchProjectProducts(token);
    projectProductMatrix.value = assignmentList;
    alert(`Proje (${projectId}) için ürün (${productId}) başarıyla atandı!`);
  } catch (e) {
    alert('Atama işlemi başarısız!');
    console.error(e);
  }
};



// Refresh data function
const refreshData = async () => {
  loading.value = true;
  try {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
    const [projectList, productList, assignmentList] = await Promise.all([
      fetchProjects(token, baseUrl),
      fetchProducts(token, baseUrl),
      fetchProjectProducts(token)
    ]);
    projects.value = projectList;
    products.value = productList;
    projectProductMatrix.value = assignmentList;
    
    // Filtreleri de güncelle - Alt parçaları hariç tut
    filteredProjects.value = [...projectList];
    filteredProducts.value = productList.filter(product => 
      product.category !== 'Alt Parçalar' && 
      product.category !== 'Alt Parca' && 
      product.category !== 'alt-parca'
    );
  } catch (e) {
    console.error('Veri yenileme hatası:', e);
  } finally {
    loading.value = false;
  }
};

// Yeni eklenen fonksiyonlar - listview için
const filterProjects = () => {
  const searchTerm = projectSearchTerm.value.toLowerCase();
  filteredProjects.value = projects.value.filter(project =>
    project.name?.toLowerCase().includes(searchTerm) ||
    project.code?.toLowerCase().includes(searchTerm) ||
    project.description?.toLowerCase().includes(searchTerm)
  );
};

const filterProducts = () => {
  const searchTerm = productSearchTerm.value.toLowerCase();
  filteredProducts.value = products.value.filter(product => {
    // Alt Parçalar kategorisindeki ürünleri filtrele
    const isNotSubPart = product.category !== 'Alt Parçalar' && 
                         product.category !== 'Alt Parca' && 
                         product.category !== 'alt-parca';
    
    // Arama terimi kontrolü
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm) ||
      product.sku?.toLowerCase().includes(searchTerm) ||
      product.code?.toLowerCase().includes(searchTerm) ||
      product.category?.toLowerCase().includes(searchTerm);
    
    // Zaten seçili olanları ve mevcut atamaları çıkar
    const isNotSelected = !isProductSelected(product.id);
    const isNotInExistingAssignments = !existingAssignments.value.some(assignment => 
      assignment.product?.id === product.id || assignment.productId === product.id
    );
    
    return isNotSubPart && matchesSearch && isNotSelected && isNotInExistingAssignments;
  });
};

const selectProject = async (project: Project) => {
  selectedProject.value = project;
  selectedProducts.value = [];
  await fetchExistingAssignments(project.id);
  // Proje değiştiğinde ürün listesini yeniden filtrele
  filterProducts();
};

const fetchExistingAssignments = async (projectId: string) => {
  if (!projectId) {
    existingAssignments.value = [];
    return;
  }
  
  try {
    // Mevcut projectProductMatrix'ten bu projeye ait atamaları filtrele
    existingAssignments.value = projectProductMatrix.value.filter(
      item => item.projectId === projectId
    );
  } catch (error) {
    console.error('Mevcut atamalar yüklenirken hata:', error);
    existingAssignments.value = [];
  }
};

const toggleProduct = (product: Product) => {
  const index = selectedProducts.value.findIndex(p => p.id === product.id);
  if (index > -1) {
    selectedProducts.value.splice(index, 1);
  } else {
    selectedProducts.value.push(product);
  }
  // Seçimler değiştiğinde listeyi yeniden filtrele
  filterProducts();
};

const isProductSelected = (productId: string) => {
  return selectedProducts.value.some(p => p.id === productId);
};

const removeProduct = (productId: string) => {
  selectedProducts.value = selectedProducts.value.filter(p => p.id !== productId);
  // Seçimler değiştiğinde listeyi yeniden filtrele
  filterProducts();
};

const handleAssignProducts = async () => {
  if (!selectedProject.value || selectedProducts.value.length === 0) {
    alert('Lütfen bir proje ve en az bir ürün seçin.');
    return;
  }

  assignmentLoading.value = true;
  try {
    // Her seçili ürün için atama yap
    for (const product of selectedProducts.value) {
      await assignProductToProject(selectedProject.value.id, product.id);
    }
    
    // Başarılı atama sonrası
    alert(`${selectedProducts.value.length} ürün başarıyla ${selectedProject.value.name} projesine atandı!`);
    
    // Seçimleri temizle
    selectedProducts.value = [];
    
    // Verileri yenile
    await refreshData();
    
    // Mevcut atamaları yenile
    if (selectedProject.value) {
      await fetchExistingAssignments(selectedProject.value.id);
      filterProducts();
    }
  } catch (error) {
    console.error('Toplu atama hatası:', error);
    alert('Ürün atama işleminde bir hata oluştu.');
  } finally {
    assignmentLoading.value = false;
  }
};

const removeAssignment = async (assignmentId: string) => {
  if (!confirm('Bu atamayı kaldırmak istediğinizden emin misiniz?')) {
    return;
  }

  try {
    // API çağrısı ile atamayı kaldır
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/project-products/${assignmentId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      alert('Atama başarıyla kaldırıldı!');
      
      // Verileri yenile
      await refreshData();
      
      // Mevcut atamaları yenile
      if (selectedProject.value) {
        await fetchExistingAssignments(selectedProject.value.id);
        filterProducts();
      }
    } else {
      throw new Error('Atama kaldırma işlemi başarısız');
    }
  } catch (error) {
    console.error('Atama kaldırma hatası:', error);
    alert('Atama kaldırılırken bir hata oluştu.');
  }
};

// Geri dönüş fonksiyonu
const goBackToProducts = () => {
  router.push('/inventory/products');
};

</script>
<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="panel">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl">
            <IconBox class="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Proje Ürün Yönetimi</h1>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Projeler ile ürünlerin atama ve konsinye işlemlerini yönetin
            </p>
          </div>
        </div>
        
        <!-- Header Actions -->
        <div class="flex items-center gap-3">
          <button 
            type="button" 
            class="btn btn-outline-primary gap-2"
            @click="goBackToProducts"
          >
            <IconArrowLeft class="w-4 h-4" />
            <span class="hidden sm:inline">Geri</span>
          </button>
          
          <button 
            type="button" 
            class="btn btn-outline-primary gap-2"
            @click="refreshData"
            :disabled="loading"
          >
            <IconRefresh class="w-4 h-4" :class="{ 'animate-spin': loading }" />
            <span class="hidden sm:inline">Yenile</span>
          </button>
          <!-- Ayarlar Butonu 
          <button 
            type="button" 
            class="btn btn-primary gap-2"
          >
            <IconSettings class="w-4 h-4" />
            <span class="hidden sm:inline">Ayarlar</span>
          </button>
          -->
        </div>
      </div>
    </div>

    <!-- Modern Tab Navigation -->
    <div class="panel p-0">
      <!-- Tab Headers -->
      <div class="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <button
          class="flex items-center gap-3 px-6 py-4 font-medium text-sm transition-all duration-200 relative group"
          :class="{ 
            'text-primary bg-white dark:bg-gray-900 border-b-2 border-primary': activeTab === 'assignment',
            'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-900/50': activeTab !== 'assignment'
          }"
          @click="activeTab = 'assignment'"
        >
          <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <IconUsers class="w-4 h-4" :class="activeTab === 'assignment' ? 'text-primary' : 'text-gray-500'" />
          </div>
          <span>Proje Ürün Ataması</span>
        </button>
        
        <button
          class="flex items-center gap-3 px-6 py-4 font-medium text-sm transition-all duration-200 relative group"
          :class="{ 
            'text-primary bg-white dark:bg-gray-900 border-b-2 border-primary': activeTab === 'consignment',
            'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-900/50': activeTab !== 'consignment'
          }"
          @click="activeTab = 'consignment'"
        >
          <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <IconBox class="w-4 h-4" :class="activeTab === 'consignment' ? 'text-primary' : 'text-gray-500'" />
          </div>
          <span>Proje Ürün Konsinye Ataması</span>
        </button>
      </div>

      <!-- Tab Content -->
      <div class="p-6">
        <!-- Loading State -->
        <div v-if="loading" class="flex items-center justify-center py-12">
          <div class="flex flex-col items-center gap-4">
            <div class="animate-spin rounded-full w-8 h-8 border-2 border-primary border-t-transparent"></div>
            <p class="text-gray-500 dark:text-gray-400">Veriler yükleniyor...</p>
          </div>
        </div>

        <!-- Assignment Tab -->
        <div v-else-if="activeTab === 'assignment'" class="space-y-6">
          <!-- İlişkilendirme Formu -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Proje Seçimi -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div class="flex items-center gap-3 mb-4">
                <div class="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <IconUsers class="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Proje Seçimi</h3>
              </div>

              <!-- Proje Arama -->
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Proje Ara
                  </label>
                  <div class="relative">
                    <input
                      v-model="projectSearchTerm"
                      type="text"
                      placeholder="Proje adı veya kodu ile ara..."
                      class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      @input="filterProjects"
                    />
                    <IconSettings class="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <!-- Proje Listesi -->
                <div class="border border-gray-300 dark:border-gray-600 rounded-lg max-h-80 overflow-y-auto">
                  <div v-if="filteredProjects.length === 0" class="p-4 text-center text-gray-500 dark:text-gray-400">
                    {{ projectSearchTerm ? 'Arama kriterlerine uygun proje bulunamadı' : 'Proje bulunamadı' }}
                  </div>
                  <div
                    v-for="project in filteredProjects"
                    :key="project.id"
                    @click="selectProject(project)"
                    class="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-200 dark:border-gray-600 last:border-b-0"
                    :class="{
                      'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800': selectedProject?.id === project.id
                    }"
                  >
                    <div class="flex items-center justify-between">
                      <div>
                        <h4 class="font-medium text-gray-900 dark:text-white">{{ project.name }}</h4>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Kod: {{ project.code }}</p>
                        <p class="text-sm text-gray-500 dark:text-gray-500">{{ project.description || 'Açıklama yok' }}</p>
                      </div>
                      <div v-if="selectedProject?.id === project.id" class="text-blue-600 dark:text-blue-400">
                        <IconSettings class="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Seçili Proje Bilgisi -->
              <div v-if="selectedProject" class="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 class="font-medium text-blue-900 dark:text-blue-100 mb-2">Seçili Proje</h4>
                <div class="space-y-1 text-sm">
                  <p><span class="font-medium">Ad:</span> {{ selectedProject.name }}</p>
                  <p><span class="font-medium">Kod:</span> {{ selectedProject.code }}</p>
                  <p><span class="font-medium">Açıklama:</span> {{ selectedProject.description || 'Yok' }}</p>
                </div>
              </div>
            </div>

            <!-- Ürün Seçimi -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div class="flex items-center gap-3 mb-4">
                <div class="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <IconBox class="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Ürün Seçimi</h3>
              </div>

              <!-- Ürün Arama -->
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Ürün Ara
                  </label>
                  <div class="relative">
                    <input
                      v-model="productSearchTerm"
                      type="text"
                      placeholder="Ürün adı, SKU veya kodu ile ara..."
                      class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      @input="filterProducts"
                    />
                    <IconBox class="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <!-- Ürün Listesi -->
                <div class="border border-gray-300 dark:border-gray-600 rounded-lg max-h-80 overflow-y-auto">
                  <div v-if="filteredProducts.length === 0" class="p-4 text-center text-gray-500 dark:text-gray-400">
                    {{ productSearchTerm ? 'Arama kriterlerine uygun ürün bulunamadı' : 'Ürün bulunamadı' }}
                  </div>
                  <div
                    v-for="product in filteredProducts"
                    :key="product.id"
                    @click="toggleProduct(product)"
                    class="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-200 dark:border-gray-600 last:border-b-0"
                    :class="{
                      'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800': isProductSelected(product.id)
                    }"
                  >
                    <div class="flex items-center justify-between">
                      <div>
                        <h4 class="font-medium text-gray-900 dark:text-white">{{ product.name }}</h4>
                        <p class="text-sm text-gray-600 dark:text-gray-400">SKU: {{ product.sku }}</p>
                        <p class="text-sm text-gray-500 dark:text-gray-500">{{ product.category || 'Kategori yok' }}</p>
                      </div>
                      <div class="flex items-center">
                        <input
                          type="checkbox"
                          :checked="isProductSelected(product.id)"
                          @click.stop="toggleProduct(product)"
                          class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Seçili Ürünler -->
              <div v-if="selectedProducts.length > 0" class="mt-4">
                <h4 class="font-medium text-gray-900 dark:text-white mb-3">
                  Seçili Ürünler ({{ selectedProducts.length }})
                </h4>
                <div class="space-y-2">
                  <div
                    v-for="product in selectedProducts"
                    :key="product.id"
                    class="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800"
                  >
                    <div class="flex-1">
                      <p class="text-sm font-medium text-green-900 dark:text-green-100">{{ product.name }}</p>
                      <p class="text-xs text-green-700 dark:text-green-300">{{ product.sku }}</p>
                    </div>
                    <button
                      @click="removeProduct(product.id)"
                      class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      title="Kaldır"
                    >
                      <IconX class="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Atama Butonu -->
          <div v-if="selectedProject && selectedProducts.length > 0" class="flex justify-center">
            <button
              @click="handleAssignProducts"
              :disabled="assignmentLoading"
              class="btn btn-success px-8 py-3 text-lg"
            >
              <IconBox class="w-5 h-5 mr-2" />
              {{ assignmentLoading ? 'Atanıyor...' : `${selectedProducts.length} Ürünü Projeye Ata` }}
            </button>
          </div>

          <!-- Mevcut Atamalar -->
          <div v-if="selectedProject && existingAssignments.length > 0" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Mevcut Proje Ürün Atamaları
              </h3>
              <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                {{ existingAssignments.length }} Ürün
              </span>
            </div>
            
            <!-- Tablo -->
            <div class="overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" class="px-6 py-3 font-medium">Ürün Adı</th>
                    <th scope="col" class="px-6 py-3 font-medium">SKU</th>
                    <th scope="col" class="px-6 py-3 font-medium">Kategori</th>
                    <th scope="col" class="px-6 py-3 font-medium">Durum</th>
                    <th scope="col" class="px-6 py-3 font-medium text-center">İşlem</th>
                  </tr>
                </thead>
                <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr
                    v-for="assignment in existingAssignments"
                    :key="assignment.id"
                    class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td class="px-6 py-4">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <div>
                          <p class="font-medium text-gray-900 dark:text-white">
                            {{ assignment.product?.name || 'Bilinmeyen Ürün' }}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-gray-600 dark:text-gray-400">
                      {{ assignment.product?.sku || '-' }}
                    </td>
                    <td class="px-6 py-4 text-gray-600 dark:text-gray-400">
                      {{ assignment.product?.category || '-' }}
                    </td>
                    <td class="px-6 py-4">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200">
                        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                        </svg>
                        Atanmış
                      </span>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <button
                        @click="removeAssignment(assignment.id)"
                        class="inline-flex items-center px-3 py-1.5 border border-red-300 dark:border-red-600 text-red-700 dark:text-red-400 bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md text-xs font-medium transition-colors"
                        title="Atamayı Kaldır"
                      >
                        <IconX class="w-3 h-3 mr-1" />
                        Kaldır
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Mevcut Atama Yoksa Bilgi Mesajı -->
          <div v-else-if="selectedProject && existingAssignments.length === 0" class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Henüz Ürün Ataması Bulunmuyor
                </h3>
                <p class="text-sm text-blue-700 dark:text-blue-300 mt-1">
                  Bu proje için henüz atanmış ürün bulunmamaktadır. Yukarıdan ürün seçerek atama yapabilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Consignment Tab -->
        <div v-else-if="activeTab === 'consignment'" class="space-y-6">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Proje Ürün Konsinye Ataması</h3>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              {{ projectProductMatrix.length }} Atama bulundu
            </div>
          </div>
          
          <ConsignmentMatrixTable
            :items="projectProductMatrix"
            :loading="loading"
            :onSave="saveConsignment"
            :onToggle="setConsignmentValue"
          />
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
/* Enhanced Form Styles */
.form-input:focus,
.form-select:focus,
.form-textarea:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

/* Enhanced Table Styles */
table th {
    background-color: #f9fafb;
    font-weight: 600;
    color: #1f2937;
}

.dark table th {
    background-color: #374151;
    color: #f9fafb;
}

/* Modern Button Animations */
.btn {
    transition: all 0.2s ease-in-out;
    transform: translateZ(0);
}

.btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-primary:hover {
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
}

.btn-outline-primary:hover {
    background-color: #3b82f6;
    color: white;
    border-color: #3b82f6;
}

/* Loading Animation Enhancement */
@keyframes pulse-soft {
    0%, 100% {
        opacity: 0.4;
    }
    50% {
        opacity: 0.8;
    }
}

.animate-pulse-soft {
    animation: pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Tab Animation */
.group:hover .transition-colors {
    transition-duration: 150ms;
}

/* Icon Animations */
.icon-animate {
    transition: transform 0.2s ease;
}

.icon-animate:hover {
    transform: scale(1.1);
}

/* Enhanced Card Shadows */
.panel {
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    transition: box-shadow 0.2s ease;
}

.panel:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Responsive Improvements */
@media (max-width: 640px) {
  .tab-headers {
    flex-direction: column;
  }
  
  .tab-button {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>
