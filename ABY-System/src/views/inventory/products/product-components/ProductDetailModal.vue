<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-2xl relative">
      <h3 class="text-lg font-semibold mb-4">Ürün Detayları</h3>
      <table class="table-auto w-full text-sm mb-4">
        <tbody>
          <tr><td class="font-bold">Stok Numarası</td><td>{{ product.sku }}</td></tr>
          <tr><td class="font-bold">Ürün Adı</td><td>{{ product.name }}</td></tr>
          <tr><td class="font-bold">Açıklama</td><td>{{ product.description }}</td></tr>
          <tr><td class="font-bold">Ürün Kategorisi</td><td>{{ product.category }}</td></tr>
          <tr><td class="font-bold">Marka</td><td>{{ product.brand }}</td></tr>
          <tr><td class="font-bold">Model</td><td>{{ product.model }}</td></tr>
          <!--<tr><td class="font-bold">Tüketilebilir</td><td>{{ product.isConsumable ? 'Evet' : 'Hayır' }}</td></tr>-->
          <tr><td class="font-bold">Seri Numaralı</td><td>{{ product.isSerialized ? 'Evet' : 'Hayır' }}</td></tr>
          <tr><td class="font-bold">Birim</td><td>{{ product.unitOfMeasure }}</td></tr>
          <tr><td class="font-bold">Minimum Stok</td><td>{{ product.minimumStock }}</td></tr>
          <tr><td class="font-bold">Aktif</td><td>{{ product.isActive ? 'Evet' : 'Hayır' }}</td></tr>
          <tr><td class="font-bold">Oluşturulma</td><td>{{ formatDate(product.createdAt) }}</td></tr>
          <tr><td class="font-bold">Güncellenme</td><td>{{ formatDate(product.updatedAt) }}</td></tr>
          <tr>
            <td class="font-bold align-top">Özellikler</td>
            <td><pre style="white-space:pre-wrap;max-width:400px;">{{ product.specifications && typeof product.specifications === 'object' ? JSON.stringify(product.specifications, null, 2) : product.specifications }}</pre></td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-end gap-2 mt-4">
        <button
          class="inline-flex items-center gap-1 rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200 px-4 py-2 text-sm font-semibold shadow-sm hover:bg-yellow-200 hover:text-yellow-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          @click="onEdit"
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536M9 13h3l8-8a2.828 2.828 0 10-4-4l-8 8v3z" /></svg>
          Düzenle
        </button>
        <button
          class="inline-flex items-center gap-1 rounded-full bg-red-100 text-red-700 border border-red-200 px-4 py-2 text-sm font-semibold shadow-sm hover:bg-red-200 hover:text-red-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
          @click="onDelete"
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          Ürünü Sil
        </button>
        <button 
          class="inline-flex items-center gap-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200 px-4 py-2 text-sm font-semibold shadow-sm hover:bg-gray-200 hover:text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
          @click="$emit('close')"
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          Kapat
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const props = defineProps<{ product: any, show: boolean }>();
const emit = defineEmits(['close', 'delete']);
const router = useRouter();

// Tarih formatlama fonksiyonu
function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return '-';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '-';
    
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    return '-';
  }
}

function onEdit() {
  // Ürün ekleme/düzenleme sayfasına yönlendir, ürünü query ile gönder
  router.push({
    path: '/inventory/products/new',
    query: { edit: '1', id: props.product.id }
  });
  emit('close');
}

async function onDelete() {
  // Silme işlemini parent'a bildir
  emit('delete', props.product.id);
}
</script>
