
table tr:last-child td {
  border-bottom: none;
}
table tr:last-child td {
  border-bottom: none;
}

<template>
  <div>
    <div class="panel shadow-lg rounded-2xl bg-white dark:bg-[#23272f] p-6">
      <div class="mb-4">
        <h5 class="font-bold text-2xl text-gray-800 dark:text-white-light tracking-tight flex items-center gap-2 mb-2">
          <span class="inline-block w-2 h-6 bg-primary rounded-full"></span>
          Kategoriler
        </h5>
        <div class="flex flex-col md:flex-row md:items-center gap-2 w-full">
          <div class="flex flex-1 gap-2">
            <input v-model="search" type="text" class="input input-sm border-2 border-primary/30 focus:border-primary rounded-lg shadow-sm transition-all duration-200" placeholder="Kategori ara..." style="min-width: 220px;" />
            <button 
              class="inline-flex items-center gap-2 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 px-5 py-2 text-sm font-semibold shadow-sm hover:bg-emerald-200 hover:text-emerald-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-300" 
              @click="showForm = true"
            >
              <i class="fa fa-plus"></i> Yeni Kategori Ekle
            </button>
          </div>
          <div class="flex gap-2">
            <button 
              class="inline-flex items-center gap-2 rounded-full bg-blue-100 text-blue-800 border border-blue-200 px-5 py-2 text-sm font-semibold shadow-sm hover:bg-blue-200 hover:text-blue-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 whitespace-nowrap" 
              @click="goToProducts"
            >
              <i class="fa fa-box"></i>Ürünler Sayfasına Git
            </button>
            <button 
              class="inline-flex items-center gap-2 rounded-full bg-gray-100 text-gray-700 border border-gray-200 px-5 py-2 text-sm font-semibold shadow-sm hover:bg-gray-200 hover:text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300" 
              @click="goBack"
            >
              <i class="fa fa-arrow-left"></i>Geri
            </button>
          </div>
        </div>
      </div>
      <div class="overflow-x-auto rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#23272f] mt-2">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-primary/10 dark:bg-primary/20">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-bold text-primary uppercase tracking-wider rounded-tl-2xl">#</th>
              <th class="px-4 py-3 text-left text-xs font-bold text-primary uppercase tracking-wider">Kategori Adı</th>
              
              <th class="px-4 py-3 text-left text-xs font-bold text-primary uppercase tracking-wider rounded-tr-2xl">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cat, i) in filteredCategories" :key="cat.name" :class="[i % 2 === 0 ? 'bg-white dark:bg-[#23272f]' : 'bg-gray-50 dark:bg-[#23272f]/80', 'hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors']">
              <td class="py-3 px-4 font-semibold text-gray-700 dark:text-gray-200">{{ i + 1 }}</td>
              <td class="py-3 px-4">{{ cat.name }}</td>
              
              <td class="py-3 px-4 flex gap-2">
                <button 
                  class="inline-flex items-center gap-1 rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200 px-3 py-1 text-xs font-semibold shadow-sm hover:bg-yellow-200 hover:text-yellow-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-300" 
                  @click="editCategory(cat)"
                >
                  <i class="fa fa-edit"></i>Düzenle
                </button>
                <button 
                  class="inline-flex items-center gap-1 rounded-full bg-red-100 text-red-700 border border-red-200 px-3 py-1 text-xs font-semibold shadow-sm hover:bg-red-200 hover:text-red-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-300" 
                  @click="deleteCategoryHandler(cat)"
                >
                  <i class="fa fa-trash"></i>Sil
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="filteredCategories.length === 0" class="text-center text-gray-400 py-8">
          <i class="fa fa-folder-open text-4xl mb-2"></i>
          <div>Kategori bulunamadı.</div>
        </div>
      </div>
      <!-- Sayfalama (Statik) -->
      <div class="flex justify-end mt-6">
        <nav class="inline-flex gap-1">
          <button class="flex justify-center font-semibold  p-2 rounded-full transition bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary" title="Önceki">&lt;</button>
          <button class="flex justify-center font-semibold px-3.5 py-2 rounded-full transition bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary">1</button>
          <button class="flex justify-center font-semibold px-3.5 py-2 rounded-full transition bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary">2</button>
          <button class="flex justify-center font-semibold px-3.5 py-2 rounded-full transition bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary">3</button>
          <button class="flex justify-center font-semibold  p-2 rounded-full transition bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary" title="Sonraki">&gt;</button>
        </nav>
      </div>
    </div>

    <CategoryForm v-if="showForm" :categories="categoryOptions" :form="form" @submit="onSubmit" @cancel="onCancel" />

    <CategoryDeleteModal v-if="showDelete" :category="form" @cancel="showDelete = false" @delete="onDelete" />

    <CategoryToast :show="showToast" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import CategoryForm from './category-components/CategoryForm.vue';
import CategoryDeleteModal from './category-components/CategoryDeleteModal.vue';
import CategoryToast from './category-components/CategoryToast.vue';
import { useCategoryOptions } from './category-components/useCategoryOptions';

const router = useRouter();

const search = ref('');
const showForm = ref(false);
const showDelete = ref(false);
const showToast = ref(false);
const editing = ref(false);
const form = ref({ name: '' });

function goBack() {
  router.back();
}

// Frontend kategori CRUD
const { categoryOptions, addCategory, updateCategory, deleteCategory } = useCategoryOptions();

const filteredCategories = computed(() => {
  const arr = Array.isArray(categoryOptions.value) ? categoryOptions.value : [];
  if (!search.value) return arr.map(name => ({ name }));
  return arr
    .filter(cat => typeof cat === 'string' && cat.toLowerCase().includes(search.value.toLowerCase()))
    .map(name => ({ name }));
});

function goToProducts() {
  router.push('/inventory/products');
}

function onSubmit(newCat) {
  if (editing.value && form.value.name) {
    updateCategory(form.value.name, newCat.name);
    editing.value = false;
  } else {
    addCategory(newCat.name);
  }
  showForm.value = false;
  showToast.value = true;
  setTimeout(() => (showToast.value = false), 2000);
  form.value = { name: '' };
}

function onCancel() {
  showForm.value = false;
  editing.value = false;
  form.value = { name: '' };
}

function editCategory(cat) {
  form.value = { ...cat };
  showForm.value = true;
  editing.value = true;
}

function deleteCategoryHandler(cat) {
  form.value = { ...cat };
  showDelete.value = true;
}

function onDelete() {
  if (!form.value.name) return;
  deleteCategory(form.value.name);
  showDelete.value = false;
  showToast.value = true;
  setTimeout(() => (showToast.value = false), 2000);
  form.value = { name: '' };
}
</script>

<style scoped>
table tr th, table tr td {
  border-bottom: 1px solid #f1f5f9;
}
table tr:last-child td {
  border-bottom: none;
}
</style>