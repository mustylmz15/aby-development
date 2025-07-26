<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black bg-opacity-50" @click="$emit('close')"></div>
    
    <!-- Modal -->
    <div class="flex min-h-full items-center justify-center p-4">
      <div class="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col">
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-600">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            <i class="fa fa-tools mr-2 text-emerald-500"></i>
            Onarım Detayları
          </h3>
          <button 
            @click="$emit('close')"
            class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <i class="fa fa-times text-xl"></i>
          </button>
        </div>

        <!-- Content -->
        <div class="p-6 overflow-y-auto flex-1 min-h-0">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            <!-- Sol Kolon -->
            <div class="space-y-6">
              
              <!-- Temel Bilgiler -->
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-4">
                  <i class="fa fa-file-text mr-2"></i>
                  Temel Bilgiler
                </h4>
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Onarım No:</span>
                    <span class="text-sm font-mono font-semibold">{{ repairDetails.repairNumber }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Durum:</span>
                    <span class="text-sm">
                      <span :class="getStatusClass(repairDetails.status)">{{ getStatusText(repairDetails.status) }}</span>
                    </span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Öncelik:</span>
                    <span :class="getPriorityClass(repairDetails.priority)">{{ getPriorityText(repairDetails.priority) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Çağrı Ref:</span>
                    <span class="text-sm">{{ repairDetails.callReference || '-' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Tamamlanma:</span>
                    <span class="text-sm">{{ formatDate(repairDetails.completedAt) }}</span>
                  </div>
                </div>
              </div>

              <!-- Ürün Bilgileri -->
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-4">
                  <i class="fa fa-cube mr-2"></i>
                  Ürün Bilgileri
                </h4>
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Ürün Adı:</span>
                    <span class="text-sm font-semibold">{{ repairDetails.item?.product?.name || '-' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">SKU:</span>
                    <span class="text-sm">{{ repairDetails.item?.product?.sku || '-' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Seri No:</span>
                    <span class="text-sm font-mono">{{ repairDetails.item?.serialNumber || '-' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Proje:</span>
                    <span class="text-sm">{{ repairDetails.item?.currentProject?.name || '-' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Proje Kodu:</span>
                    <span class="text-sm">{{ repairDetails.item?.currentProject?.code || '-' }}</span>
                  </div>
                </div>
              </div>

              <!-- Arıza Bilgileri -->
              <div class="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-4">
                  <i class="fa fa-check-circle mr-2 text-emerald-500"></i>
                  Onarım Bilgileri
                </h4>
                <div class="space-y-3">
                  <div>
                    <span class="text-sm text-gray-600 dark:text-gray-400 block mb-1">Bildirilen Arıza:</span>
                    <p class="text-sm bg-white dark:bg-gray-800 p-3 rounded border">{{ repairDetails.reportedIssue || '-' }}</p>
                  </div>
                  <div>
                    <span class="text-sm text-gray-600 dark:text-gray-400 block mb-1">Teşhis:</span>
                    <p class="text-sm bg-white dark:bg-gray-800 p-3 rounded border">{{ repairDetails.diagnosis || '-' }}</p>
                  </div>
                  <div>
                    <span class="text-sm text-gray-600 dark:text-gray-400 block mb-1">Notlar:</span>
                    <p class="text-sm bg-white dark:bg-gray-800 p-3 rounded border">{{ repairDetails.notes || '-' }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sağ Kolon -->
            <div class="space-y-6">
              
              <!-- Kullanılan/Çıkarılan Parçalar -->
              <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-4">
                  <i class="fa fa-cogs mr-2 text-blue-500"></i>
                  Kullanılan Parçalar
                </h4>
                
                <!-- Çıkarılan Parçalar -->
                <div class="mb-4">
                  <h5 class="text-sm font-medium text-red-700 dark:text-red-400 mb-2">
                    <i class="fa fa-minus-circle mr-1"></i>
                    Çıkarılan Parçalar
                  </h5>
                  <div v-if="removedParts.length > 0" class="space-y-2">
                    <div v-for="part in removedParts" :key="part.id" 
                         class="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200">
                      <div class="flex justify-between items-start">
                        <div>
                          <p class="text-sm font-medium text-red-800 dark:text-red-300">{{ part.product.name }}</p>
                          <p class="text-xs text-red-600 dark:text-red-400">SKU: {{ part.product.sku }}</p>
                          <p class="text-xs text-red-600 dark:text-red-400">Seri: {{ part.serialNumber }}</p>
                        </div>
                        <span class="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">{{ part.quantity }}x</span>
                      </div>
                    </div>
                  </div>
                  <p v-else class="text-xs text-gray-500 italic">Çıkarılan parça yok</p>
                </div>

                <!-- Takılan Parçalar -->
                <div>
                  <h5 class="text-sm font-medium text-green-700 dark:text-green-400 mb-2">
                    <i class="fa fa-plus-circle mr-1"></i>
                    Takılan Parçalar
                  </h5>
                  <div v-if="installedParts.length > 0" class="space-y-2">
                    <div v-for="part in installedParts" :key="part.id" 
                         class="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200">
                      <div class="flex justify-between items-start">
                        <div>
                          <p class="text-sm font-medium text-green-800 dark:text-green-300">{{ part.product.name }}</p>
                          <p class="text-xs text-green-600 dark:text-green-400">SKU: {{ part.product.sku }}</p>
                          <p class="text-xs text-green-600 dark:text-green-400">Seri: {{ part.serialNumber }}</p>
                        </div>
                        <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">{{ part.quantity }}x</span>
                      </div>
                    </div>
                  </div>
                  <p v-else class="text-xs text-gray-500 italic">Takılan parça yok</p>
                </div>
              </div>

              <!-- Hasar Nedenleri -->
              <div class="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-4">
                  <i class="fa fa-exclamation-triangle mr-2 text-orange-500"></i>
                  Hasar Nedenleri
                </h4>
                <div v-if="repairDetails.repairDamageReasons?.length > 0" class="space-y-2">
                  <div v-for="reason in repairDetails.repairDamageReasons" :key="reason.id" 
                       class="bg-white dark:bg-gray-800 p-3 rounded border">
                    <div class="flex items-center justify-between">
                      <span class="text-sm font-medium">{{ reason.damageReason.name }}</span>
                      <span :class="getDamageTypeClass(reason.damageReason.type)">
                        {{ reason.damageReason.type }}
                      </span>
                    </div>
                  </div>
                </div>
                <p v-else class="text-xs text-gray-500 italic">Hasar nedeni belirtilmemiş</p>
              </div>

              <!-- Yapılan İşlemler -->
              <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-4">
                  <i class="fa fa-list-check mr-2 text-purple-500"></i>
                  Yapılan İşlemler
                </h4>
                <div v-if="repairDetails.repairActions?.length > 0" class="space-y-2">
                  <div v-for="action in repairDetails.repairActions" :key="action.id" 
                       class="bg-white dark:bg-gray-800 p-3 rounded border">
                    <p class="text-sm">{{ action.action }}</p>
                  </div>
                </div>
                <p v-else class="text-xs text-gray-500 italic">Yapılan işlem kaydı yok</p>
              </div>

              <!-- Depo ve Tarih Bilgileri -->
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-4">
                  <i class="fa fa-warehouse mr-2"></i>
                  Depo ve Tarih Bilgileri
                </h4>
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Onarım Deposu:</span>
                    <span class="text-sm">{{ repairDetails.warehouse?.name || '-' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Mevcut Depo:</span>
                    <span class="text-sm">{{ repairDetails.item?.currentWarehouse?.name || '-' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Alınma:</span>
                    <span class="text-sm">{{ formatDate(repairDetails.receivedAt) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Başlangıç:</span>
                    <span class="text-sm">{{ formatDate(repairDetails.startedAt) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Tamamlanma:</span>
                    <span class="text-sm">{{ formatDate(repairDetails.completedAt) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex-shrink-0 flex flex-col sm:flex-row justify-between items-center p-6 border-t border-gray-200 dark:border-gray-600 gap-3 bg-white dark:bg-gray-800">
          <!-- Sol taraf - PDF İndir -->
          <button 
            @click="exportToPDF"
            class="btn btn-outline-info w-full sm:w-auto order-2 sm:order-1 hover-lift"
            title="Onarım detaylarını PDF olarak indir"
          >
            <i class="fa fa-file-pdf mr-2"></i>
            PDF Olarak İndir
          </button>
          
          <!-- Sağ taraf - Ana aksiyonlar -->
          <div class="flex space-x-3 w-full sm:w-auto order-1 sm:order-2">
            <button 
              @click="$emit('close')"
              class="btn btn-outline-secondary flex-1 sm:flex-none"
              title="Modalı kapat"
            >
              <i class="fa fa-times mr-2"></i>
              Kapat
            </button>
            <button 
              @click="$emit('return-to-warehouse', repairDetails)"
              class="btn btn-success flex-1 sm:flex-none hover-lift"
              title="Bu ürünü depoya geri gönder"
            >
              <i class="fa fa-shipping-fast mr-2"></i>
              Depoya Geri Gönder
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { RepairDetails, RepairPriority } from '../../api/types';

// Props
interface Props {
  repairDetails: RepairDetails;
}

const props = defineProps<Props>();

// Emits
defineEmits<{
  close: [];
  'return-to-warehouse': [repairDetails: RepairDetails];
}>();

// Computed
const removedParts = computed(() => {
  return props.repairDetails.repairParts?.filter(part => part.partType === 'REMOVED') || [];
});

const installedParts = computed(() => {
  return props.repairDetails.repairParts?.filter(part => part.partType === 'INSTALLED') || [];
});

// Methods
const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

const getPriorityText = (priority: RepairPriority): string => {
  const labels = {
    LOW: 'Düşük',
    NORMAL: 'Normal',
    HIGH: 'Yüksek',
    URGENT: 'Acil'
  };
  return labels[priority] || priority;
};

const getPriorityClass = (priority: RepairPriority): string => {
  const classes = {
    LOW: 'badge badge-secondary',
    NORMAL: 'badge badge-primary',
    HIGH: 'badge badge-warning',
    URGENT: 'badge badge-danger'
  };
  return classes[priority] || 'badge badge-secondary';
};

const getStatusText = (status: string): string => {
  const labels = {
    DIAGNOSED: 'Teşhis Edildi',
    REPAIRED: 'Onarıldı',
    IN_PROGRESS: 'Onarımda',
    REPORTED: 'Bildirildi'
  };
  return labels[status as keyof typeof labels] || status;
};

const getStatusClass = (status: string): string => {
  const classes = {
    DIAGNOSED: 'badge badge-warning',
    REPAIRED: 'badge badge-success',
    IN_PROGRESS: 'badge badge-info',
    REPORTED: 'badge badge-secondary'
  };
  return classes[status as keyof typeof classes] || 'badge badge-secondary';
};

const getDamageTypeClass = (type: string): string => {
  const classes = {
    HASAR: 'badge badge-danger',
    NEDEN: 'badge badge-warning'
  };
  return classes[type as keyof typeof classes] || 'badge badge-secondary';
};

const exportToPDF = (): void => {
  try {
    // Create a printable HTML version of the repair details
    const printContent = generatePrintableHTML();
    
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      console.error('Popup blocked - unable to open print window');
      return;
    }

    // Write the content and trigger print
    printWindow.document.write(printContent);
    printWindow.document.close();
    
    // Wait for content to load, then print
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
    
  } catch (error) {
    console.error('PDF export error:', error);
  }
};

const generatePrintableHTML = (): string => {
  const repair = props.repairDetails;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Onarım Detayları - ${repair.repairNumber}</title>
      <style>
        @page { size: A4; margin: 15mm; }
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; color: #333; line-height: 1.3; font-size: 11px; }
        .container { max-width: 100%; }
        .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 8px; margin-bottom: 12px; }
        .header h1 { margin: 0 0 4px 0; color: #10b981; font-size: 18px; }
        .section { margin-bottom: 10px; page-break-inside: avoid; border: 1px solid #e5e7eb; border-radius: 4px; padding: 8px; }
        .section-title { font-weight: bold; font-size: 12px; color: #1f2937; border-bottom: 1px solid #e5e7eb; padding-bottom: 3px; margin-bottom: 6px; }
        .info-row { display: flex; justify-content: space-between; padding: 2px 0; border-bottom: 1px dotted #e5e7eb; font-size: 10px; }
        .info-label { font-weight: 600; color: #6b7280; }
        .info-value { color: #1f2937; }
        .footer { text-align: center; color: #6b7280; font-size: 8px; margin-top: 8px; border-top: 1px solid #e5e7eb; padding-top: 6px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔧 Onarım Detayları</h1>
          <p><strong>Onarım No: ${repair.repairNumber}</strong> | Tarih: ${formatDate(new Date().toISOString())}</p>
        </div>

        <div class="section">
          <div class="section-title">📋 Temel Bilgiler</div>
          <div class="info-row">
            <span class="info-label">Durum:</span>
            <span class="info-value">${getStatusText(repair.status)}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Öncelik:</span>
            <span class="info-value">${getPriorityText(repair.priority)}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Tamamlanma:</span>
            <span class="info-value">${formatDate(repair.completedAt)}</span>
          </div>
        </div>

        <div class="section">
          <div class="section-title">📦 Ürün Bilgileri</div>
          <div class="info-row">
            <span class="info-label">Ürün:</span>
            <span class="info-value">${repair.item?.product?.name || '-'}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Seri No:</span>
            <span class="info-value">${repair.item?.serialNumber || '-'}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Proje:</span>
            <span class="info-value">${repair.item?.currentProject?.code || '-'}</span>
          </div>
        </div>

        <div class="footer">
          <p>Bu rapor otomatik olarak oluşturulmuştur • Onarım Merkezi Yönetim Sistemi</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
</script>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.badge-secondary {
  background-color: #f3f4f6;
  color: #1f2937;
}

.badge-primary {
  background-color: #dbeafe;
  color: #1e40af;
}

.badge-warning {
  background-color: #fef3c7;
  color: #92400e;
}

.badge-danger {
  background-color: #fee2e2;
  color: #dc2626;
}

.badge-success {
  background-color: #dcfce7;
  color: #166534;
}

.badge-info {
  background-color: #e0f2fe;
  color: #0369a1;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  border: 1px solid transparent;
  min-height: 2.75rem;
  white-space: nowrap;
}

.btn-outline-secondary {
  color: #6b7280;
  border-color: #d1d5db;
  background-color: transparent;
}

.btn-outline-secondary:hover {
  color: #374151;
  border-color: #9ca3af;
  background-color: #f9fafb;
}

.btn-outline-info {
  color: #0ea5e9;
  border-color: #0ea5e9;
  background-color: transparent;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.btn-outline-info:hover {
  color: #ffffff;
  background-color: #0ea5e9;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
}

.btn-success {
  color: #ffffff;
  background-color: #10b981;
  border-color: #10b981;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.btn-success:hover {
  background-color: #059669;
  border-color: #059669;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.hover-lift {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}
</style>
