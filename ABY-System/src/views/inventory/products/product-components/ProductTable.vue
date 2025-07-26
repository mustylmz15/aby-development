<template>
  <div class="table-responsive">
    <table class="table-striped table-hover min-w-max w-full">
      <thead>
        <tr>
          <!-- parentId sütunu kaldırıldı -->
          <th>Stok Kodu</th>
          <th>Ürün Adı</th>
          <th>Açıklama</th>
          <th>Kategori</th>
          <th>Marka</th>
          <th>Model</th>
          <th>Detay</th>
          <!-- id sütunu kaldırıldı -->
        </tr>
      </thead>
      <tbody>
        <ProductTableRow 
          v-for="product in products" 
          :key="product.id" 
          :product="product" 
          @show-detail="onShowDetail"
        />
      </tbody>
    </table>

    <ProductDetailModal 
      v-if="showDetail" 
      :product="selectedProduct" 
      :show="showDetail" 
      @close="showDetail = false" 
      @delete="onDeleteProduct"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ProductTableRow from './ProductTableRow.vue';
import ProductDetailModal from './ProductDetailModal.vue';
const props = defineProps<{ products: any[] }>();

const showDetail = ref(false);
const selectedProduct = ref<any>(null);

function onShowDetail(product: any) {
  selectedProduct.value = product;
  showDetail.value = true;
}

async function onDeleteProduct(productId: string) {
  if (!productId) return;
  const confirmed = window.confirm('Bu ürünü silmek istediğinize emin misiniz?');
  if (!confirmed) return;
  const token = localStorage.getItem('token');
  const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
  const res = await fetch(`${baseUrl}/api/v1/products/${productId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    }
  });
  if (res.ok) {
    // Silindikten sonra listeden çıkar
    const idx = props.products.findIndex((p) => p.id === productId);
    if (idx !== -1) props.products.splice(idx, 1);
    showDetail.value = false;
    alert('Ürün başarıyla silindi!');
  } else {
    alert('Ürün silinemedi!');
  }
}
</script>
<style scoped>
.table-responsive {
  width: 100%;
  overflow-x: auto;
}
.min-w-max {
  min-width: 900px;
}
</style>
