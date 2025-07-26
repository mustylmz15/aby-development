<template>
  <div v-if="warehouse" class="space-y-4">
    <h2 class="text-xl font-semibold text-gray-800 dark:text-white-light mb-4">Depo Detayları</h2>
    
    <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
      <div class="flex flex-col space-y-2">
        <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
          <span class="font-medium text-gray-600 dark:text-gray-300">Depo Adı:</span>
          <span class="text-gray-900 dark:text-white">{{ warehouse.name }}</span>
        </div>
        
        <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
          <span class="font-medium text-gray-600 dark:text-gray-300">Adres:</span>
          <span class="text-gray-900 dark:text-white text-right">{{ warehouse.address || 'Belirtilmemiş' }}</span>
        </div>
        
        <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
          <span class="font-medium text-gray-600 dark:text-gray-300">Durum:</span>
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="warehouse.isActive 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : 'bg-red-100 text-red-800 border border-red-200'">
            {{ warehouse.isActive ? 'Aktif' : 'Pasif' }}
          </span>
        </div>
        
        <div class="flex justify-between items-center py-2">
          <span class="font-medium text-gray-600 dark:text-gray-300">Oluşturma Tarihi:</span>
          <span class="text-gray-900 dark:text-white">{{ formatDate(warehouse.created_at) }}</span>
        </div>
      </div>
    </div>
    
    <div class="flex justify-between gap-3 pt-4">
      <button 
        class="btn btn-primary flex items-center gap-2"
        @click="viewInventory"
      >
        <i class="las la-box"></i>
        Envanter Görüntüle
      </button>
      
      <button class="btn btn-outline-secondary" @click="$emit('close')">
        Kapat
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { Warehouse } from './types';

const props = defineProps<{ warehouse: Warehouse }>();
const emit = defineEmits(['edit', 'delete', 'close']);
const router = useRouter();

// Tarih formatlama fonksiyonu
const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return 'Belirtilmemiş';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    return 'Geçersiz tarih';
  }
};

// Envanter sayfasına yönlendirme fonksiyonu
const viewInventory = () => {
  // Modal'ı kapat
  emit('close');
  
  // Envanter sayfasına warehouse ID'si ile yönlendir
  // Query parameter olarak warehouse ID'sini gönder ki filtreleme yapılabilsin
  router.push({
    name: 'warehouse-envanter',
    query: {
      warehouseId: props.warehouse.id
    }
  });
};
</script>
