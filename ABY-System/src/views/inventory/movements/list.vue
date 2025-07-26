<template>
  <div>
    <!-- Modern Breadcrumb -->
    <nav class="mb-6">
      <ul class="flex items-center space-x-3 rtl:space-x-reverse">
        <li>
          <a href="javascript:;" class="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-medium hover:underline transition-colors duration-200">
            <i class="fa fa-cubes mr-2"></i>
            Envanter
          </a>
        </li>
        <li class="text-gray-500 dark:text-gray-400">
          <i class="fa fa-chevron-right text-xs"></i>
        </li>
        <li>
          <span class="text-gray-800 dark:text-gray-200 font-medium">Stok Hareketleri</span>
        </li>
      </ul>
    </nav>

    <div class="pt-2">
      <div class="panel shadow-lg rounded-2xl bg-white dark:bg-[#23272f] p-6">
        <!-- Modern Header -->
        <div class="mb-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="p-3 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl shadow-lg">
                <i class="fa fa-exchange-alt text-2xl text-white"></i>
              </div>
              <div>
                <h5 class="font-semibold text-xl text-gray-900 dark:text-white">Stok Hareketleri</h5>
                <p class="text-gray-600 dark:text-gray-300 mt-1 text-sm">Tüm stok hareketlerini görüntüleyin ve yönetin</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <button 
                type="button" 
                class="inline-flex items-center gap-2 rounded-lg bg-gray-200 text-gray-700 px-4 py-2 text-sm font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-200"
                @click="goBack"
              >
                <i class="fa fa-arrow-left"></i>
                <span>Geri</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Enhanced Loading state -->
        <div v-if="isLoading" class="flex flex-col justify-center items-center py-16">
          <div class="relative">
            <div class="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <i class="fa fa-exchange-alt text-primary-600 text-xl"></i>
            </div>
          </div>
          <div class="mt-6 text-center">
            <h3 class="text-lg font-medium text-gray-800 dark:text-gray-100">Veriler yükleniyor...</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">Lütfen bekleyiniz...</p>
          </div>
        </div>

        <!-- Enhanced Error state -->
        <div v-else-if="error" class="text-center py-16">
          <div class="mx-auto mb-6 w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
            <svg class="w-10 h-10 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <div class="max-w-md mx-auto">
            <h3 class="text-xl font-medium text-gray-900 dark:text-gray-100 mb-3">Bir hata oluştu</h3>
            <p class="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">{{ error }}</p>
            <button 
              @click="loadMovements" 
              class="inline-flex items-center gap-2 rounded-lg bg-blue-200 text-blue-700 px-4 py-2 text-sm font-medium hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"></path>
              </svg>
              <span>Tekrar Dene</span>
            </button>
          </div>
        </div>

        <!-- Main Content -->
        <div v-else>
          <MovementsFilter 
            @filter="onFilter" 
            @addMovement="onAddMovement"
            @print="printMovements"
          />
          
          <MovementsTable 
            :items="filteredMovements" 
            :loading="isLoading"
            :error="error"
            @show-detail="showDetail" 
          />
          
          <!-- Modern Pagination -->
          <div v-if="totalPages > 1" class="flex items-center justify-center gap-4 mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <button 
              :disabled="page === 1" 
              @click="prevPage" 
              class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <i class="fa fa-chevron-left"></i>
              <span>Önceki</span>
            </button>
            
            <div class="flex items-center gap-2">
              <span class="text-sm font-medium text-gray-600 dark:text-gray-300">Sayfa</span>
              <span class="font-medium text-gray-900 dark:text-gray-100">{{ page }}</span>
              <span class="text-sm font-medium text-gray-600 dark:text-gray-300">/ {{ totalPages }}</span>
            </div>
            
            <button 
              :disabled="page === totalPages" 
              @click="nextPage" 
              class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <span>Sonraki</span>
              <i class="fa fa-chevron-right"></i>
            </button>
          </div>
        </div>

        <MovementDetailModal 
          :visible="detailVisible" 
          :item="selectedMovement" 
          @close="detailVisible = false" 
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import MovementsFilter from './components/MovementsFilter.vue';
import MovementsTable from './components/MovementsTable.vue';
import MovementDetailModal from './components/MovementDetailModal.vue';
import { fetchAllTransfers, fetchProducts } from './api/stock-transfer-api';

const router = useRouter();

// Kullanıcı depo kontrolü için state
const isWarehouseUser = ref(false);
const userWarehouseId = ref<string | null>(null);

const movements = ref<any[]>([]);
const filter = ref({ search: '', type: '', date: '' });
const detailVisible = ref(false);
const selectedMovement = ref<any>(null);
const page = ref(1);
const pageSize = 10;
const isLoading = ref(false);
const error = ref<string | null>(null);


// Ürün id -> ad map'i
const productMap = ref<Record<string, string>>({});

// Transfer API'den gelen veriyi gruplayarak tek satırda göster
const flatMovements = computed(() => {
  let allTransfers = movements.value;
  
  // Depo kullanıcısı ise sadece kendi deposuna ait transferleri göster
  if (isWarehouseUser.value && userWarehouseId.value) {
    const filteredTransfers = movements.value.filter(transfer => {
      const isSourceMatch = transfer.sourceWarehouseId === userWarehouseId.value;
      const isTargetMatch = transfer.targetWarehouseId === userWarehouseId.value;
      return isSourceMatch || isTargetMatch;
    });
    allTransfers = filteredTransfers;
  }
  
  const groupedTransfers = allTransfers.map((transfer, idx) => {
    const items = transfer.transferStockItems || [];
    
    // Aynı ürün tipindeki itemları grupla
    const productGroups = items.reduce((groups: any, item: any) => {
      const productId = item.productId || item.stockItem?.productId || '';
      const productName = productMap.value[productId] || productId || '-';
      
      if (!groups[productId]) {
        groups[productId] = {
          productId: productName,
          originalProductId: productId,
          items: [],
          totalQuantity: 0
        };
      }
      
      groups[productId].items.push({
        id: item.id,
        serialNumber: item.serialNumber || item.stockItem?.serialNumber || '',
        quantity: parseInt(item.quantity) || 1, // String'i number'a çevir
        notes: item.notes || ''
      });
      
      groups[productId].totalQuantity += (parseInt(item.quantity) || 1); // String'i number'a çevir
      
      return groups;
    }, {});
    
    // Her ürün grubu için ayrı satır oluştur
    return Object.values(productGroups).map((group: any) => ({
      id: `${transfer.id || idx + 1}-${group.originalProductId}`,
      transferId: transfer.id,
      transferNumber: transfer.transferNumber,
      sourceWarehouse: transfer.sourceWarehouse?.name || transfer.sourceWarehouseId || '',
      targetWarehouse: transfer.targetWarehouse?.name || transfer.targetWarehouseId || '',
      requestedBy: transfer.requestedBy || '',
      productId: group.productId,
      originalProductId: group.originalProductId,
      quantity: group.totalQuantity,
      items: group.items, // Detay için seri numaraları
      notes: transfer.notes || '',
      status: transfer.status || '',
      approvalToken: transfer.approvalToken,
      approvalExpiresAt: transfer.approvalExpiresAt,
      approvedBy: transfer.approvedBy,
      approvedAt: transfer.approvedAt,
      completedBy: transfer.completedBy,
      completedAt: transfer.completedAt,
      type: transfer.type,
      priority: transfer.priority,
      sourceWarehouseId: transfer.sourceWarehouseId,
      targetWarehouseId: transfer.targetWarehouseId,
      description: transfer.description,
      transferStockItems: transfer.transferStockItems,
      createdAt: transfer.createdAt || '',
    }));
  }).flat();
  
  return groupedTransfers;
});

const filteredMovements = computed(() => {
  let result = flatMovements.value;
  if (filter.value.search) {
    const search = filter.value.search.toLowerCase();
    result = result.filter(m => {
      // Seri numaralarını items içinden ara
      const serialNumbers = (m.items || []).map((item: any) => item.serialNumber || '').join(' ');
      return (
        (m.productId || '').toLowerCase().includes(search) ||
        serialNumbers.toLowerCase().includes(search) ||
        (m.notes || '').toLowerCase().includes(search) ||
        (m.transferNumber || '').toLowerCase().includes(search)
      );
    });
  }
  if (filter.value.type) {
    result = result.filter(m => m.status === filter.value.type);
  }
  if (filter.value.date) {
    result = result.filter(m => m.createdAt && m.createdAt.startsWith(filter.value.date));
  }
  // Sayfalama
  return result.slice((page.value - 1) * pageSize, page.value * pageSize);
});

const totalPages = computed(() => {
  let count = movements.value.length;
  if (filter.value.search || filter.value.type || filter.value.date) {
    count = filteredMovements.value.length;
  }
  return Math.max(1, Math.ceil(count / pageSize));
});

function onFilter(val: any) {
  filter.value = val;
  page.value = 1;
}

function onAddMovement() {
  // Transfer sayfasına yönlendir
  router.push('/inventory/transfer');
}

function showDetail(item: any) {
  selectedMovement.value = item;
  detailVisible.value = true;
}

function prevPage() {
  if (page.value > 1) page.value--;
}

function nextPage() {
  if (page.value < totalPages.value) page.value++;
}

function goBack() {
  // Ana sayfaya geri dönüş işlemi
  router.push('/');
}

// Yazdır fonksiyonu
function printMovements() {
  const printContent = generatePrintContent();
  
  // Yeni pencere aç ve yazdır
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }
}

// Yazdırma için HTML içeriği oluştur
function generatePrintContent() {
  const currentDate = new Date().toLocaleDateString('tr-TR');
  const currentTime = new Date().toLocaleTimeString('tr-TR');
  const warehouseName = isWarehouseUser.value ? 'Atanmış Depo' : 'Tüm Depolar';
  
  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Stok Hareketleri Raporu</title>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #2563eb; padding-bottom: 20px; }
        .header h1 { margin: 0; color: #2563eb; font-size: 28px; }
        .header p { margin: 5px 0; color: #666; font-size: 14px; }
        .info { margin-bottom: 20px; background: #f8f9fa; padding: 15px; border-radius: 8px; }
        .info-item { display: inline-block; margin-right: 30px; font-weight: bold; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; font-size: 13px; }
        th { background-color: #2563eb; color: white; font-weight: bold; }
        tr:nth-child(even) { background-color: #f8f9fa; }
        .status-badge { padding: 4px 8px; border-radius: 12px; font-size: 11px; font-weight: bold; }
        .status-pending { background: #fef3c7; color: #92400e; }
        .status-approved { background: #dcfce7; color: #166534; }
        .status-completed { background: #dbeafe; color: #1e40af; }
        .status-rejected { background: #fee2e2; color: #991b1b; }
        .footer { margin-top: 40px; text-align: center; color: #6b7280; font-size: 12px; border-top: 1px solid #e5e7eb; padding-top: 20px; }
        @media print {
          body { margin: 0; }
          .header { break-after: avoid; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Stok Hareketleri Raporu</h1>
        <p><strong>${warehouseName}</strong></p>
        <p>Yazdırma Tarihi: ${currentDate} ${currentTime}</p>
      </div>
      
      <div class="info">
        <div class="info-item">Toplam Hareket: ${filteredMovements.value.length}</div>
        <div class="info-item">Filtre: ${filter.value.search || filter.value.type || filter.value.date ? 'Aktif' : 'Yok'}</div>
        <div class="info-item">Sayfa: ${page.value} / ${totalPages.value}</div>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Transfer No</th>
            <th>Ürün</th>
            <th>Miktar</th>
            <th>Kaynak Depo</th>
            <th>Hedef Depo</th>
            <th>Durum</th>
            <th>Tarih</th>
            <th>Talep Eden</th>
          </tr>
        </thead>
        <tbody>
  `;
  
  filteredMovements.value.forEach(movement => {
    const statusClass = 
      movement.status === 'PENDING' ? 'status-pending' :
      movement.status === 'APPROVED' ? 'status-approved' :
      movement.status === 'COMPLETED' ? 'status-completed' :
      movement.status === 'REJECTED' ? 'status-rejected' : '';
    
    const statusLabel = 
      movement.status === 'PENDING' ? 'Beklemede' :
      movement.status === 'APPROVED' ? 'Onaylandı' :
      movement.status === 'COMPLETED' ? 'Tamamlandı' :
      movement.status === 'REJECTED' ? 'Reddedildi' : movement.status || '-';
    
    html += `
          <tr>
            <td>${movement.transferNumber || movement.transferId || '-'}</td>
            <td>${movement.productId || '-'}</td>
            <td>${movement.quantity || 0}</td>
            <td>${movement.sourceWarehouse || '-'}</td>
            <td>${movement.targetWarehouse || '-'}</td>
            <td><span class="status-badge ${statusClass}">${statusLabel}</span></td>
            <td>${movement.createdAt ? new Date(movement.createdAt).toLocaleDateString('tr-TR') : '-'}</td>
            <td>${movement.requestedBy || '-'}</td>
          </tr>
    `;
  });
  
  html += `
        </tbody>
      </table>
      
      <div class="footer">
        <p>Bu rapor ${currentDate} ${currentTime} tarihinde otomatik olarak oluşturulmuştur.</p>
        <p>Toplam ${filteredMovements.value.length} hareket listelendi.</p>
      </div>
    </body>
    </html>
  `;
  
  return html;
}

async function loadMovements() {
  isLoading.value = true;
  error.value = null;
  try {
    // Kullanıcı depo kontrolü
    userWarehouseId.value = getUserWarehouseId();
    isWarehouseUser.value = !!userWarehouseId.value;
    
    // Ürünleri çek ve map oluştur
    const products = await fetchProducts();
    productMap.value = {};
    products.forEach((p: any) => {
      productMap.value[p.id] = p.name || p.productName || p.title || p.id;
    });
    // Transferleri çek
    const data = await fetchAllTransfers();
    movements.value = data;
  } catch (e: unknown) {
    if (typeof e === 'object' && e !== null && 'message' in e) {
      error.value = (e as { message: string }).message;
    } else if (typeof e === 'string') {
      error.value = e;
    } else {
      error.value = 'Stok hareketleri alınamadı.';
    }
  } finally {
    isLoading.value = false;
  }
}

// Kullanıcının atandığı depo ID'sini al
function getUserWarehouseId(): string | null {
  try {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    const user = JSON.parse(userStr);
    
    // Assignment tipinden kontrol et - DEPO_PERSONELI rolü olan assignment'ı bul
    if (user.assignments && user.assignments.length > 0) {
      const warehouseAssignment = user.assignments.find((assignment: any) => {
        const assignmentType = assignment.type || assignment.assignmentType || assignment.role;
        return assignmentType === 'DEPO_PERSONELI' && assignment.resourceType === 'WAREHOUSE';
      });
      
      if (warehouseAssignment) {
        console.log('🏪 Depo assignment bulundu:', warehouseAssignment);
        const warehouseId = warehouseAssignment.resourceId || warehouseAssignment.warehouseId || null;
        console.log('� Kullanıcının depo ID\'si:', warehouseId);
        return warehouseId;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Kullanıcı depo bilgisi alınamadı:', error);
    return null;
  }
}

onMounted(() => {
  loadMovements();
});
</script>

<style scoped>
.panel {
  background-color: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(229, 231, 235, 0.8);
}

:global(.dark) .panel {
  background-color: #1b2e4b;
  border-color: rgba(75, 85, 99, 0.3);
}

/* Enhanced button styles */
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

/* Loading animation enhancement */
@keyframes spin-smooth {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin-smooth 1s linear infinite;
}

/* Custom scrollbar for better UX */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #3b82f6, #1d4ed8);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #2563eb, #1e40af);
}
</style>

