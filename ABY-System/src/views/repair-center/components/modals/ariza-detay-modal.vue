<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black bg-opacity-50" @click="$emit('close')"></div>
    
    <!-- Modal -->
    <div class="flex min-h-full items-center justify-center p-4">
      <div class="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[95vh] overflow-hidden flex flex-col">
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-600">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            <i class="fa fa-info-circle mr-2 text-blue-500"></i>
            Arıza Detayları
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
                    <span id="id" class="text-sm text-gray-600 dark:text-gray-400">ID:</span>
                    <span class="text-sm font-mono">{{ repair.id }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span id="repairNumber" class="text-sm text-gray-600 dark:text-gray-400">Onarım No:</span>
                    <span class="text-sm font-mono font-semibold">{{ repair.repairNumber }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span id="status" class="text-sm text-gray-600 dark:text-gray-400">Durum:</span>
                    <span class="text-sm">
                      <span :class="getStatusClass(repair.status)">{{ getStatusText(repair.status) }}</span>
                    </span>
                  </div>
                  <div class="flex justify-between">
                    <span id="priority" class="text-sm text-gray-600 dark:text-gray-400">Öncelik:</span>
                    <span :class="getPriorityClass(repair.priority)">{{ getPriorityText(repair.priority) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span id="callReference" class="text-sm text-gray-600 dark:text-gray-400">Çağrı Ref:</span>
                    <span class="text-sm">{{ repair.callReference || '-' }}</span>
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
                    <span id="itemId" class="text-sm text-gray-600 dark:text-gray-400">Ürün ID:</span>
                    <span class="text-sm font-mono">{{ repair.item?.id || '-' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span id="productName" class="text-sm text-gray-600 dark:text-gray-400">Ürün Adı:</span>
                    <span class="text-sm font-semibold">{{ repair.item?.product?.name || '-' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span id="productSku" class="text-sm text-gray-600 dark:text-gray-400">SKU:</span>
                    <span class="text-sm">{{ repair.item?.product?.sku || '-' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span id="serialNumber" class="text-sm text-gray-600 dark:text-gray-400">Seri No:</span>
                    <span class="text-sm font-mono">{{ repair.item?.serialNumber || '-' }}</span>
                  </div>
                </div>
              </div>

              <!-- Proje Bilgileri -->
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-4">
                  <i class="fa fa-folder mr-2"></i>
                  Proje Bilgileri
                </h4>
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span id="currentProjectId" class="text-sm text-gray-600 dark:text-gray-400">Proje ID:</span>
                    <span class="text-sm font-mono">{{ repair.item?.currentProject?.id || '-' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span id="projectName" class="text-sm text-gray-600 dark:text-gray-400">Proje Adı:</span>
                    <span class="text-sm font-semibold">{{ repair.item?.currentProject?.name || '-' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span id="projectCode" class="text-sm text-gray-600 dark:text-gray-400">Proje Kodu:</span>
                    <span class="text-sm">{{ repair.item?.currentProject?.code || '-' }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sağ Kolon -->
            <div class="space-y-6">
              
              <!-- Arıza Bilgileri -->
              <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-4">
                  <i class="fa fa-exclamation-triangle mr-2 text-red-500"></i>
                  Arıza Bilgileri
                </h4>
                <div class="space-y-3">
                  <div>
                    <span id="reportedIssue" class="text-sm text-gray-600 dark:text-gray-400 block mb-1">Bildirilen Arıza:</span>
                    <p class="text-sm bg-white dark:bg-gray-800 p-3 rounded border">{{ repair.reportedIssue || '-' }}</p>
                  </div>
                  <div>
                    <span id="diagnosis" class="text-sm text-gray-600 dark:text-gray-400 block mb-1">Teşhis:</span>
                    <p class="text-sm bg-white dark:bg-gray-800 p-3 rounded border">{{ repair.diagnosis || '-' }}</p>
                  </div>
                  <div>
                    <span id="notes" class="text-sm text-gray-600 dark:text-gray-400 block mb-1">Notlar:</span>
                    <p class="text-sm bg-white dark:bg-gray-800 p-3 rounded border">{{ repair.notes || '-' }}</p>
                  </div>
                </div>
              </div>

              <!-- Depo Bilgileri -->
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-4">
                  <i class="fa fa-warehouse mr-2"></i>
                  Depo Bilgileri
                </h4>
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span id="warehouseId" class="text-sm text-gray-600 dark:text-gray-400">Depo ID:</span>
                    <span class="text-sm font-mono">{{ repair.warehouse?.id || '-' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span id="warehouseName" class="text-sm text-gray-600 dark:text-gray-400">Depo Adı:</span>
                    <span class="text-sm">{{ repair.warehouse?.name || '-' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span id="repairWarehouseName" class="text-sm text-gray-600 dark:text-gray-400">Onarım Deposu:</span>
                    <span class="text-sm">{{ repair.repairWarehouse?.name || '-' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span id="currentWarehouseName" class="text-sm text-gray-600 dark:text-gray-400">Mevcut Depo:</span>
                    <span class="text-sm">{{ repair.currentWarehouse?.name || '-' }}</span>
                  </div>
                </div>
              </div>

              <!-- Kullanıcı ve Tarih Bilgileri -->
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-4">
                  <i class="fa fa-clock mr-2"></i>
                  Tarih ve Kullanıcı Bilgileri
                </h4>
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span id="reportedBy" class="text-sm text-gray-600 dark:text-gray-400">Bildiren:</span>
                    <span class="text-sm">{{ getReportedByName(repair) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span id="reportedByEmail" class="text-sm text-gray-600 dark:text-gray-400">E-posta:</span>
                    <span class="text-sm">{{ repair.reportedByUser?.email || '-' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span id="receivedAt" class="text-sm text-gray-600 dark:text-gray-400">Alınma Tarihi:</span>
                    <span class="text-sm">{{ formatDate(repair.receivedAt) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span id="createdAt" class="text-sm text-gray-600 dark:text-gray-400">Oluşturma:</span>
                    <span class="text-sm">{{ formatDate(repair.createdAt) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span id="updatedAt" class="text-sm text-gray-600 dark:text-gray-400">Güncelleme:</span>
                    <span class="text-sm">{{ formatDate(repair.updatedAt) }}</span>
                  </div>
                </div>
              </div>

              <!-- Maliyet ve İş Gücü 
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-4">
                  <i class="fa fa-dollar-sign mr-2"></i>
                  Maliyet Bilgileri
                </h4>
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span id="laborHours" class="text-sm text-gray-600 dark:text-gray-400">İşçilik Saati:</span>
                    <span class="text-sm">{{ repair.laborHours || '-' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span id="cost" class="text-sm text-gray-600 dark:text-gray-400">Maliyet:</span>
                    <span class="text-sm">{{ repair.cost || '-' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span id="transportType" class="text-sm text-gray-600 dark:text-gray-400">Nakliye Türü:</span>
                    <span class="text-sm">{{ repair.transportType || '-' }}</span>
                  </div>
                </div>
              </div>
              -->
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex-shrink-0 flex flex-col sm:flex-row justify-between items-center p-6 border-t border-gray-200 dark:border-gray-600 gap-3 bg-white dark:bg-gray-800">
          <!-- Sol taraf - PDF İndir -->
          <button 
            @click="exportToPDF"
            class="btn btn-outline-info w-full sm:w-auto order-2 sm:order-1 hover-lift"
            title="Arıza detaylarını PDF olarak indir"
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
              @click="$emit('start-repair', repair)"
              class="btn btn-success flex-1 sm:flex-none hover-lift"
              title="Bu ürünün onarımına başla"
            >
              <i class="fa fa-play mr-2"></i>
              Onarıma Başla
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Repair, RepairPriority } from '../../api/types';

// Props
interface Props {
  repair: Repair;
}

const props = defineProps<Props>();

// Emits
defineEmits<{
  close: [];
  'start-repair': [repair: Repair];
}>();

// Methods
const formatDate = (dateString: string): string => {
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

const getReportedByName = (repair: Repair): string => {
  const user = repair.reportedByUser;
  if (!user) return '-';
  return `${user.firstName} ${user.lastName}`;
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
  const repair = props.repair;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Arıza Detayları - ${repair.repairNumber}</title>
      <style>
        @page {
          size: A4;
          margin: 15mm;
        }
        
        body { 
          font-family: Arial, sans-serif; 
          margin: 0; 
          padding: 0;
          color: #333; 
          line-height: 1.3;
          font-size: 11px;
        }
        
        .container {
          max-width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
        }
        
        .header { 
          text-align: center; 
          border-bottom: 2px solid #333; 
          padding-bottom: 8px; 
          margin-bottom: 12px; 
        }
        
        .header h1 { 
          margin: 0 0 4px 0; 
          color: #2563eb; 
          font-size: 18px;
        }
        
        .header p {
          margin: 2px 0;
          font-size: 10px;
        }
        
        .content {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        
        .section { 
          margin-bottom: 10px; 
          page-break-inside: avoid;
          border: 1px solid #e5e7eb;
          border-radius: 4px;
          padding: 8px;
        }
        
        .section-title { 
          font-weight: bold; 
          font-size: 12px; 
          color: #1f2937; 
          border-bottom: 1px solid #e5e7eb; 
          padding-bottom: 3px; 
          margin-bottom: 6px; 
        }
        
        .info-row { 
          display: flex; 
          justify-content: space-between; 
          padding: 2px 0; 
          border-bottom: 1px dotted #e5e7eb; 
          font-size: 10px;
        }
        
        .info-label { 
          font-weight: 600; 
          color: #6b7280; 
          flex: 1;
        }
        
        .info-value { 
          color: #1f2937; 
          flex: 1;
          text-align: right;
        }
        
        .status-badge { 
          display: inline-block; 
          padding: 2px 6px; 
          border-radius: 3px; 
          font-size: 9px; 
          font-weight: 600; 
        }
        
        .status-diagnosed { 
          background-color: #fef3c7; 
          color: #92400e; 
        }
        
        .status-repaired { 
          background-color: #dcfce7; 
          color: #166534; 
        }
        
        .priority-low { 
          background-color: #f3f4f6; 
          color: #1f2937; 
        }
        
        .priority-normal { 
          background-color: #dbeafe; 
          color: #1e40af; 
        }
        
        .priority-high { 
          background-color: #fef3c7; 
          color: #92400e; 
        }
        
        .priority-urgent { 
          background-color: #fee2e2; 
          color: #dc2626; 
        }
        
        .text-area { 
          background-color: #f9fafb; 
          padding: 6px; 
          border-radius: 3px; 
          border: 1px solid #e5e7eb; 
          margin-top: 3px; 
          font-size: 9px;
          line-height: 1.2;
          max-height: 40px;
          overflow: hidden;
        }
        
        .full-width {
          grid-column: 1 / -1;
        }
        
        .footer { 
          text-align: center; 
          color: #6b7280; 
          font-size: 8px; 
          margin-top: 8px; 
          border-top: 1px solid #e5e7eb; 
          padding-top: 6px; 
        }
        
        @media print {
          body { 
            margin: 0; 
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
          }
          .container {
            height: auto;
          }
          .section { 
            page-break-inside: avoid; 
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Arıza Detay Raporu</h1>
          <p><strong>Onarım No: ${repair.repairNumber}</strong> | Tarih: ${formatDate(new Date().toISOString())}</p>
        </div>

        <div class="content">
          <!-- Sol Kolon -->
          <div>
            <div class="section">
              <div class="section-title">🔧 Temel Bilgiler</div>
              <div class="info-row">
                <span class="info-label">ID:</span>
                <span class="info-value">${repair.id.substring(0, 8)}...</span>
              </div>
              <div class="info-row">
                <span class="info-label">Durum:</span>
                <span class="info-value">
                  <span class="status-badge status-${repair.status.toLowerCase()}">${getStatusText(repair.status)}</span>
                </span>
              </div>
              <div class="info-row">
                <span class="info-label">Öncelik:</span>
                <span class="info-value">
                  <span class="status-badge priority-${repair.priority.toLowerCase()}">${getPriorityText(repair.priority)}</span>
                </span>
              </div>
              <div class="info-row">
                <span class="info-label">Çağrı Ref:</span>
                <span class="info-value">${repair.callReference || '-'}</span>
              </div>
            </div>

            <div class="section">
              <div class="section-title">📦 Ürün Bilgileri</div>
              <div class="info-row">
                <span class="info-label">Ürün:</span>
                <span class="info-value">${(repair.item?.product?.name || '-').substring(0, 20)}${(repair.item?.product?.name || '').length > 20 ? '...' : ''}</span>
              </div>
              <div class="info-row">
                <span class="info-label">SKU:</span>
                <span class="info-value">${repair.item?.product?.sku || '-'}</span>
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

            <div class="section">
              <div class="section-title">🏢 Depo Bilgileri</div>
              <div class="info-row">
                <span class="info-label">Ana Depo:</span>
                <span class="info-value">${repair.warehouse?.name || '-'}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Onarım Deposu:</span>
                <span class="info-value">${repair.repairWarehouse?.name || '-'}</span>
              </div>
            </div>
          </div>

          <!-- Sağ Kolon -->
          <div>
            <div class="section">
              <div class="section-title">⚠️ Arıza Bilgileri</div>
              <div>
                <strong>Bildirilen Arıza:</strong>
                <div class="text-area">${(repair.reportedIssue || '-').substring(0, 150)}${(repair.reportedIssue || '').length > 150 ? '...' : ''}</div>
              </div>
              <br>
              <div>
                <strong>Teşhis:</strong>
                <div class="text-area">${(repair.diagnosis || '-').substring(0, 150)}${(repair.diagnosis || '').length > 150 ? '...' : ''}</div>
              </div>
              <br>
              <div>
                <strong>Notlar:</strong>
                <div class="text-area">${(repair.notes || '-').substring(0, 100)}${(repair.notes || '').length > 100 ? '...' : ''}</div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">👤 Kullanıcı ve Tarihler</div>
              <div class="info-row">
                <span class="info-label">Bildiren:</span>
                <span class="info-value">${getReportedByName(repair)}</span>
              </div>
              <div class="info-row">
                <span class="info-label">E-posta:</span>
                <span class="info-value">${(repair.reportedByUser?.email || '-').substring(0, 25)}${(repair.reportedByUser?.email || '').length > 25 ? '...' : ''}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Alınma:</span>
                <span class="info-value">${formatDate(repair.receivedAt).substring(0, 16)}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Oluşturma:</span>
                <span class="info-value">${formatDate(repair.createdAt).substring(0, 16)}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Güncelleme:</span>
                <span class="info-value">${formatDate(repair.updatedAt).substring(0, 16)}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="footer">
          <p>Bu rapor otomatik olarak oluşturulmuştur • Onarım Merkezi Yönetim Sistemi • ${formatDate(new Date().toISOString()).substring(0, 16)}</p>
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

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
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

/* Responsive button layout */
@media (max-width: 640px) {
  .btn {
    min-height: 3rem;
    font-size: 0.875rem;
    padding: 0.875rem 1.25rem;
  }
  
  .flex-1 {
    flex: 1;
  }
}

/* Hover lift effect */
.hover-lift {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.hover-lift:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
