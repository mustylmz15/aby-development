
import { ref, watch } from 'vue';

// Varsayılan kategori listesi (tamamen frontend, localStorage yok)
const categoryOptions = ref<string[]>([
  'Hareketli Kamera',
  'Sabit Kamera',
  'Kayıt Cihazı',
  'Lazer Kamera',
  'Termal Kamera',
  'Switch',
  'Geko',
  'Yaka Kamerası',
  'Alt Parçalar',
]);

function addCategory(name: string) {
  if (name && !categoryOptions.value.includes(name)) {
    categoryOptions.value.push(name);
  }
}

function updateCategory(oldName: string, newName: string) {
  const idx = categoryOptions.value.findIndex(c => c === oldName);
  if (idx !== -1 && newName && !categoryOptions.value.includes(newName)) {
    categoryOptions.value[idx] = newName;
  }
}

function deleteCategory(name: string) {
  categoryOptions.value = categoryOptions.value.filter(c => c !== name);
}

// Her component aynı referansı kullanır
export function useCategoryOptions() {
  return {
    categoryOptions,
    addCategory,
    updateCategory,
    deleteCategory
  };
}
