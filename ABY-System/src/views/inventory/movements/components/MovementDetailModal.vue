<template>
  <div v-if="visible" class="movement-detail-modal">
    <div class="modal-content bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <div class="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Transfer Detayı</h2>
          <button 
            @click="$emit('close')"
            class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <i class="fa fa-times text-gray-500"></i>
          </button>
        </div>
      </div>

      <div class="p-6 space-y-6">
        <!-- Temel Bilgiler -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="font-medium text-gray-600 dark:text-gray-300">Transfer No:</span>
              <span class="text-gray-900 dark:text-white">{{ item?.transferNumber || '-' }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium text-gray-600 dark:text-gray-300">Durum:</span>
              <MovementStatusBadge :status="item?.status" />
            </div>
            <div class="flex justify-between">
              <span class="font-medium text-gray-600 dark:text-gray-300">Ürün:</span>
              <span class="text-gray-900 dark:text-white">{{ item?.productId || '-' }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium text-gray-600 dark:text-gray-300">Toplam Miktar:</span>
              <span class="text-gray-900 dark:text-white font-medium">{{ item?.quantity || '-' }} adet</span>
            </div>
          </div>
          
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="font-medium text-gray-600 dark:text-gray-300">Kaynak Depo:</span>
              <span class="text-gray-900 dark:text-white">{{ item?.sourceWarehouse || '-' }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium text-gray-600 dark:text-gray-300">Hedef Depo:</span>
              <span class="text-gray-900 dark:text-white">{{ item?.targetWarehouse || '-' }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium text-gray-600 dark:text-gray-300">Talep Eden:</span>
              <span class="text-gray-900 dark:text-white">{{ userMap[item?.requestedBy] || item?.requestedBy || '-' }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium text-gray-600 dark:text-gray-300">Transfer Tarihi:</span>
              <span class="text-gray-900 dark:text-white">{{ item?.createdAt ? new Date(item.createdAt).toLocaleString('tr-TR') : '-' }}</span>
            </div>
          </div>
        </div>

        <!-- Gönderilen Ürünlerin Seri Numaraları -->
        <div v-if="item?.items && item.items.length" class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
            Gönderilen Ürünler ({{ item.items.length }} adet)
          </h3>
          
          <div class="bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden">
            <div class="overflow-x-auto">
              <table class="min-w-full">
                <thead class="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Sıra
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Seri Numarası
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Miktar
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Not
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr v-for="(itemDetail, index) in item.items" :key="itemDetail.id || index" 
                      class="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td class="px-4 py-3 text-sm text-gray-900 dark:text-white">
                      {{ index + 1 }}
                    </td>
                    <td class="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                      {{ itemDetail.serialNumber || 'Belirtilmemiş' }}
                    </td>
                    <td class="px-4 py-3 text-sm text-gray-900 dark:text-white">
                      {{ itemDetail.quantity || 1 }}
                    </td>
                    <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                      {{ itemDetail.notes || '-' }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Açıklama -->
        <div v-if="item?.notes" class="space-y-2">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">Açıklama</h3>
          <p class="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            {{ item.notes }}
          </p>
        </div>
      </div>

      <!-- Alt Butonlar -->
      <div class="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-6">
        <div class="flex justify-end gap-3">
          <button 
            @click="$emit('close')"
            class="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
          >
            Kapat
          </button>
          <button
            v-if="item?.status === 'PENDING' && item?.approvalToken"
            class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            @click="onApprove"
          >
            Onayla
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, ref, onMounted } from 'vue';
import { approveTransfer, fetchProducts, fetchWarehouses } from '../api/stock-transfer-api';
import MovementStatusBadge from './MovementStatusBadge.vue';

const props = defineProps<{ visible: boolean; item: any }>();
const emit = defineEmits(['close']);

// Ürün, depo ve kullanıcı map'leri
const productMap = ref<Record<string, string>>({});
const warehouseMap = ref<Record<string, string>>({});
const userMap = ref<Record<string, string>>({});

async function loadMaps() {
  try {
    // Ürün adlarını çek
    const products = await fetchProducts();
    productMap.value = {};
    products.forEach((p: any) => {
      productMap.value[p.id] = p.name || p.productName || p.title || p.id;
    });
    
    // Depo adlarını çek
    const warehouses = await fetchWarehouses();
    warehouseMap.value = {};
    warehouses.forEach((w: any) => {
      warehouseMap.value[w.id] = w.name || w.id;
    });
    
    // Kullanıcı adlarını çek
    const token = localStorage.getItem('token');
    const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/api/v1/users', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      const data = await response.json();
      const users = Array.isArray(data) ? data : data.data || [];
      userMap.value = {};
      users.forEach((u: any) => {
        userMap.value[u.id] = (u.first_name && u.last_name) ? `${u.first_name} ${u.last_name}` : (u.first_name || u.last_name || u.email || u.id);
      });
    }
  } catch (e) {
    console.error('Error loading maps:', e);
  }
}

onMounted(() => {
  loadMaps();
});

async function onApprove() {
  try {
    await approveTransfer({
      transferId: props.item.transferId || props.item.id,
      approvalToken: props.item.approvalToken
    });
    alert('Transfer başarıyla onaylandı!');
    emit('close');
  } catch (e) {
    alert('Onay işlemi başarısız!');
    console.error(e);
  }
}
</script>
<style scoped>
.movement-detail-modal {
  position: fixed;
  top: 0; 
  left: 0; 
  right: 0; 
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  backdrop-filter: blur(4px);
}

.modal-content {
  position: relative;
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Dark mode için ekstra stiller */
@media (prefers-color-scheme: dark) {
  .modal-content {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
  }
}
</style>
