<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
          <i class="fa fa-exchange-alt text-green-600 dark:text-green-400"></i>
        </div>
        <div>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Depo Transfer Onayları</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Depolar arası transfer onayları
          </p>
        </div>
      </div>
      
      <div class="flex items-center gap-3">
        <button
          @click="loadApprovals"
          :disabled="loading"
          class="btn btn-outline-primary"
          title="Yenile"
        >
          <i :class="['fa fa-refresh', { 'animate-spin': loading }]"></i>
        </button>
        
        <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <span>{{ approvals.length }} onay</span>
          <span v-if="selectedApprovals.length > 0">
            • {{ selectedApprovals.length }} seçili
          </span>
        </div>
      </div>
    </div>

    <!-- Bulk Actions -->
    <div v-if="selectedApprovals.length > 0" class="panel bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <i class="fa fa-check-circle text-green-600 dark:text-green-400"></i>
          <span class="font-medium text-green-900 dark:text-green-100">
            {{ selectedApprovals.length }} öğe seçildi
          </span>
        </div>
        <div class="flex gap-2">
          <button
            @click="bulkApprove"
            :disabled="processingBulk"
            class="btn btn-success btn-sm"
          >
            <i class="fa fa-check mr-2"></i>
            Hepsini Onayla
          </button>
          <button
            @click="bulkReject"
            :disabled="processingBulk"
            class="btn btn-danger btn-sm"
          >
            <i class="fa fa-times mr-2"></i>
            Hepsini Reddet
          </button>
          <button
            @click="clearSelection"
            class="btn btn-outline-secondary btn-sm"
          >
            <i class="fa fa-times"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading && approvals.length === 0" class="flex items-center justify-center py-12">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
        <p class="text-gray-500 dark:text-gray-400">Onaylar yükleniyor...</p>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!loading && approvals.length === 0" class="text-center py-12">
      <div class="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
        <i class="fa fa-check-circle text-3xl text-gray-400 dark:text-gray-500"></i>
      </div>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Bekleyen onay bulunmuyor</h3>
      <p class="text-gray-500 dark:text-gray-400">Şu anda onay bekleyen transfer bulunmamaktadır.</p>
    </div>

    <!-- Approvals List -->
    <div v-else class="space-y-4">
      <TransitionGroup name="list" tag="div" class="space-y-4">
        <div
          v-for="approval in filteredApprovals"
          :key="approval.id"
          class="panel hover:shadow-md transition-all duration-200 border-l-4 border-green-500"
        >
          <div class="flex items-start gap-4">
            <!-- Selection Checkbox -->
            <div class="flex items-center pt-1">
              <input
                v-model="selectedApprovals"
                :value="approval.id"
                type="checkbox"
                class="form-checkbox h-5 w-5 text-green-600 border-2 border-gray-300 rounded focus:ring-green-500"
              />
            </div>

            <!-- Main Content -->
            <div class="flex-1">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <!-- Header Info -->
                  <div class="flex items-center gap-3 mb-3">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                      Transfer Talebi #{{ approval.transferId || approval.id }}
                    </h3>
                    <span class="badge bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      {{ getTransferTypeText(approval.transferType) }}
                    </span>
                    <span :class="getPriorityClass(approval.priority)" class="badge">
                      {{ getPriorityText(approval.priority) }}
                    </span>
                  </div>

                  <!-- Details Grid - Compact -->
                  <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-3 text-sm">
                    <div>
                      <label class="text-xs text-gray-500 dark:text-gray-400">Transfer ID</label>
                      <p class="font-mono text-gray-900 dark:text-white truncate">{{ approval.transferId || approval.id }}</p>
                    </div>
                    <div>
                      <label class="text-xs text-gray-500 dark:text-gray-400">Kaynak Depo</label>
                      <p class="text-gray-900 dark:text-white truncate">{{ approval.sourceWarehouse?.name || 'Bilinmiyor' }}</p>
                    </div>
                    <div>
                      <label class="text-xs text-gray-500 dark:text-gray-400">Hedef Depo</label>
                      <p class="text-gray-900 dark:text-white truncate">{{ approval.targetWarehouse?.name || 'Bilinmiyor' }}</p>
                    </div>
                    <div>
                      <label class="text-xs text-gray-500 dark:text-gray-400">Talep Tarihi</label>
                      <p class="text-gray-900 dark:text-white truncate">{{ formatDate(approval.createdAt) }}</p>
                    </div>
                    <div>
                      <label class="text-xs text-gray-500 dark:text-gray-400">Talep Eden</label>
                      <p class="text-gray-900 dark:text-white truncate">{{ approval.requestedBy?.name || approval.createdBy || 'Bilinmiyor' }}</p>
                    </div>
                    <div>
                      <label class="text-xs text-gray-500 dark:text-gray-400">Durum</label>
                      <span :class="getStatusClass(approval.status)" class="badge text-xs">
                        {{ getStatusText(approval.status) }}
                      </span>
                    </div>
                  </div>

                  <!-- Transfer Reason - Compact -->
                  <div v-if="approval.transferReason || approval.description" class="mb-2">
                    <div class="p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
                      <p class="text-sm text-green-900 dark:text-green-100 line-clamp-2">
                        {{ approval.transferReason || approval.description }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="ml-4">
                  <button
                    @click="viewDetails(approval)"
                    class="btn btn-primary btn-sm"
                    title="Detaylar ve İşlemler"
                  >
                    <i class="fa fa-eye mr-1"></i>
                    Detaylar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { transferApi } from '../api/transferApi'
import Swal from 'sweetalert2'

// Props
interface Props {
  dateFilter?: {
    start: string
    end: string
  }
}

const props = withDefaults(defineProps<Props>(), {
  dateFilter: () => ({ start: '', end: '' })
})

// Emits
const emit = defineEmits<{
  countUpdated: [count: number]
  approvalCompleted: []
}>()

// Reactive data
const loading = ref(false)
const processingBulk = ref(false)
const processingIds = ref<string[]>([])
const approvals = ref<any[]>([])
const selectedApprovals = ref<string[]>([])
const openDropdownId = ref<string | null>(null)

// Computed
const filteredApprovals = computed(() => {
  if (!props.dateFilter.start && !props.dateFilter.end) {
    return approvals.value
  }

  return approvals.value.filter(approval => {
    const approvalDate = new Date(approval.createdAt)
    const start = props.dateFilter.start ? new Date(props.dateFilter.start) : null
    const end = props.dateFilter.end ? new Date(props.dateFilter.end) : null

    if (start && approvalDate < start) return false
    if (end && approvalDate > end) return false

    return true
  })
})

// Methods
const checkAuth = () => {
  const token = localStorage.getItem('token')
  return !!token
}

const loadApprovals = async () => {
  if (!checkAuth()) {
    console.warn('No authentication token found')
    return
  }
  
  loading.value = true
  try {
    const data = await transferApi.getApprovals()
    approvals.value = data || []
    emit('countUpdated', approvals.value.length)
  } catch (error: any) {
    console.error('Transfer approvals loading error:', error)
    approvals.value = []
    
    // Check if it's an auth error
    if (error.response?.status === 401) {
      console.warn('Authentication failed, redirecting to login')
      // Don't show error modal for auth failures during logout
      return
    }
    
    Swal.fire({
      title: 'Hata!',
      text: 'Onaylar yüklenirken bir hata oluştu.',
      icon: 'error',
      confirmButtonText: 'Tamam'
    })
  } finally {
    loading.value = false
  }
}

const approve = async (approval: any) => {
  try {
    closeDropdown()
    processingIds.value.push(approval.id)
    
    const result = await Swal.fire({
      title: 'Onaylıyor musunuz?',
      text: `Transfer talebi onaylanacak.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Evet, Onayla',
      cancelButtonText: 'İptal',
      confirmButtonColor: '#10b981'
    })

    if (result.isConfirmed) {
      await transferApi.approve(approval.id, approval.approvalToken)
      
      // Remove from list
      approvals.value = approvals.value.filter(item => item.id !== approval.id)
      selectedApprovals.value = selectedApprovals.value.filter(id => id !== approval.id)
      
      emit('countUpdated', approvals.value.length)
      emit('approvalCompleted')

      Swal.fire({
        title: 'Başarılı!',
        text: 'Transfer talebi onaylandı.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      })
    }
  } catch (error) {
    console.error('Approval error:', error)
    Swal.fire({
      title: 'Hata!',
      text: 'Onay işlemi sırasında bir hata oluştu.',
      icon: 'error',
      confirmButtonText: 'Tamam'
    })
  } finally {
    processingIds.value = processingIds.value.filter(id => id !== approval.id)
  }
}

const reject = async (approval: any) => {
  try {
    closeDropdown()
    processingIds.value.push(approval.id)
    
    const result = await Swal.fire({
      title: 'Reddetmek istediğinize emin misiniz?',
      text: `Transfer talebi reddedilecek.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Evet, Reddet',
      cancelButtonText: 'İptal',
      confirmButtonColor: '#ef4444'
    })

    if (result.isConfirmed) {
      await transferApi.reject(approval.id)
      
      // Remove from list
      approvals.value = approvals.value.filter(item => item.id !== approval.id)
      selectedApprovals.value = selectedApprovals.value.filter(id => id !== approval.id)
      
      emit('countUpdated', approvals.value.length)

      Swal.fire({
        title: 'Reddedildi!',
        text: 'Transfer talebi başarıyla reddedildi.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      })
    }
  } catch (error) {
    console.error('Rejection error:', error)
    Swal.fire({
      title: 'Hata!',
      text: 'Reddetme işlemi sırasında bir hata oluştu.',
      icon: 'error',
      confirmButtonText: 'Tamam'
    })
  } finally {
    processingIds.value = processingIds.value.filter(id => id !== approval.id)
  }
}

const bulkApprove = async () => {
  if (selectedApprovals.value.length === 0) return

  try {
    processingBulk.value = true
    
    const result = await Swal.fire({
      title: 'Toplu Onay',
      text: `${selectedApprovals.value.length} öğe onaylanacak. Devam edilsin mi?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Evet, Onayla',
      cancelButtonText: 'İptal',
      confirmButtonColor: '#10b981'
    })

    if (result.isConfirmed) {
      for (const id of selectedApprovals.value) {
        const approval = approvals.value.find(item => item.id === id)
        if (approval) {
          await transferApi.approve(approval.id, approval.approvalToken)
        }
      }
      
      approvals.value = approvals.value.filter(item => !selectedApprovals.value.includes(item.id))
      selectedApprovals.value = []
      
      emit('countUpdated', approvals.value.length)
      emit('approvalCompleted')

      Swal.fire({
        title: 'Başarılı!',
        text: 'Tüm seçili öğeler onaylandı.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      })
    }
  } catch (error) {
    console.error('Bulk approval error:', error)
    Swal.fire({
      title: 'Hata!',
      text: 'Toplu onay işlemi sırasında bir hata oluştu.',
      icon: 'error',
      confirmButtonText: 'Tamam'
    })
  } finally {
    processingBulk.value = false
  }
}

const bulkReject = async () => {
  if (selectedApprovals.value.length === 0) return

  try {
    processingBulk.value = true
    
    const result = await Swal.fire({
      title: 'Toplu Reddetme',
      text: `${selectedApprovals.value.length} öğe reddedilecek. Devam edilsin mi?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Evet, Reddet',
      cancelButtonText: 'İptal',
      confirmButtonColor: '#ef4444'
    })

    if (result.isConfirmed) {
      for (const id of selectedApprovals.value) {
        const approval = approvals.value.find(item => item.id === id)
        if (approval) {
          await transferApi.reject(approval.id)
        }
      }
      
      approvals.value = approvals.value.filter(item => !selectedApprovals.value.includes(item.id))
      selectedApprovals.value = []
      
      emit('countUpdated', approvals.value.length)

      Swal.fire({
        title: 'Reddedildi!',
        text: 'Tüm seçili öğeler reddedildi.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      })
    }
  } catch (error) {
    console.error('Bulk rejection error:', error)
    Swal.fire({
      title: 'Hata!',
      text: 'Toplu reddetme işlemi sırasında bir hata oluştu.',
      icon: 'error',
      confirmButtonText: 'Tamam'
    })
  } finally {
    processingBulk.value = false
  }
}

const clearSelection = () => {
  selectedApprovals.value = []
}

const toggleDropdown = (id: string) => {
  openDropdownId.value = openDropdownId.value === id ? null : id
}

const closeDropdown = () => {
  openDropdownId.value = null
}

const viewDetails = (approval: any) => {
  closeDropdown()
  const itemsHtml = approval.items && approval.items.length > 0 
    ? approval.items.map(item => `
        <div class="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg">
          <span class="font-medium">${item.productName || item.name}</span>
          <div class="flex items-center gap-2">
            <span class="text-gray-600">${item.quantity || 1} adet</span>
            ${item.serialNumber ? `<span class="text-xs text-gray-500 font-mono">${item.serialNumber}</span>` : ''}
          </div>
        </div>
      `).join('')
    : '<div class="text-center py-4 text-gray-500">Transfer edilecek ürün bulunmuyor</div>'

  Swal.fire({
    title: '',
    html: `
      <div class="text-left">
        <!-- Header -->
        <div class="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <i class="fa fa-exchange-alt text-blue-600 text-xl"></i>
          </div>
          <div>
            <h2 class="text-xl font-bold text-gray-900">Depo Transfer Talebi</h2>
            <p class="text-sm text-gray-500">Transfer Onay Detayları</p>
          </div>
        </div>

        <!-- Status Badges -->
        <div class="flex gap-2 mb-6">
          <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            <i class="fa fa-clock mr-1"></i>
            ${getStatusText(approval.status)}
          </span>
          <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
            <i class="fa fa-boxes mr-1"></i>
            ${approval.items?.length || 0} Ürün
          </span>
        </div>

        <!-- Details Grid -->
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div class="space-y-3">
            <div>
              <label class="block text-sm font-medium text-gray-500 mb-1">Transfer ID</label>
              <p class="text-gray-900 font-mono bg-gray-50 px-3 py-2 rounded">${approval.transferId || approval.id}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-500 mb-1">Kaynak Depo</label>
              <p class="text-gray-900 bg-gray-50 px-3 py-2 rounded">${approval.sourceWarehouse?.name || 'Bilinmiyor'}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-500 mb-1">Talep Tarihi</label>
              <p class="text-gray-900 bg-gray-50 px-3 py-2 rounded">${formatDate(approval.createdAt)}</p>
            </div>
          </div>
          <div class="space-y-3">
            <div>
              <label class="block text-sm font-medium text-gray-500 mb-1">Hedef Depo</label>
              <p class="text-gray-900 bg-gray-50 px-3 py-2 rounded">${approval.targetWarehouse?.name || 'Bilinmiyor'}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-500 mb-1">Talep Eden</label>
              <p class="text-gray-900 bg-gray-50 px-3 py-2 rounded">${approval.requestedBy?.name || approval.createdBy || 'Bilinmiyor'}</p>
            </div>
          </div>
        </div>

        ${approval.transferReason ? `
        <!-- Transfer Reason -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-500 mb-2">Transfer Nedeni</label>
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p class="text-blue-900 leading-relaxed">${approval.transferReason}</p>
          </div>
        </div>
        ` : ''}

        ${approval.specialInstructions ? `
        <!-- Special Instructions -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-500 mb-2">Özel Notlar</label>
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p class="text-yellow-900 leading-relaxed">${approval.specialInstructions}</p>
          </div>
        </div>
        ` : ''}

        <!-- Transfer Items -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-500 mb-3">Transfer Edilecek Ürünler</label>
          <div class="space-y-2">
            ${itemsHtml}
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3 pt-4 border-t border-gray-200">
          <button id="approve-btn" class="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center">
            <i class="fa fa-check mr-2"></i>
            Transferi Onayla
          </button>
          <button id="reject-btn" class="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center">
            <i class="fa fa-times mr-2"></i>
            Reddet
          </button>
        </div>
      </div>
    `,
    showConfirmButton: false,
    showCancelButton: false,
    customClass: {
      popup: 'swal2-modern-popup',
      htmlContainer: 'swal2-modern-content'
    },
    width: '900px',
    padding: '2rem',
    background: '#ffffff',
    didOpen: () => {
      // Approve button handler
      const approveBtn = document.getElementById('approve-btn')
      const rejectBtn = document.getElementById('reject-btn')
      
      if (approveBtn) {
        approveBtn.addEventListener('click', async () => {
          Swal.close()
          await approve(approval)
        })
      }
      
      if (rejectBtn) {
        rejectBtn.addEventListener('click', async () => {
          Swal.close()
          await reject(approval)
        })
      }
    }
  })
}

const formatDate = (dateString: string) => {
  if (!dateString) return '-'
  
  try {
    return new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString))
  } catch {
    return dateString
  }
}

const getTransferTypeText = (type: string) => {
  const typeMap = {
    'WAREHOUSE_TO_WAREHOUSE': 'Depo Transfer',
    'PROJECT_TO_WAREHOUSE': 'Proje İadesi',
    'WAREHOUSE_TO_PROJECT': 'Proje Atama',
    'INTERNAL': 'İç Transfer',
    'EXTERNAL': 'Dış Transfer'
  }
  return typeMap[type as keyof typeof typeMap] || 'Depo Transfer'
}

const getPriorityClass = (priority: string) => {
  const classes = {
    'low': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    'normal': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'high': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'urgent': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  }
  return classes[priority as keyof typeof classes] || classes.normal
}

const getPriorityText = (priority: string) => {
  const texts = {
    'low': 'Düşük',
    'normal': 'Normal',
    'high': 'Yüksek',
    'urgent': 'Acil'
  }
  return texts[priority as keyof typeof texts] || 'Normal'
}

const getStatusClass = (status: string) => {
  const classes = {
    'PENDING': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'APPROVED': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'REJECTED': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    'IN_PROGRESS': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'COMPLETED': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
  }
  return classes[status as keyof typeof classes] || classes.PENDING
}

const getStatusText = (status: string) => {
  const texts = {
    'PENDING': 'Bekliyor',
    'APPROVED': 'Onaylandı',
    'REJECTED': 'Reddedildi',
    'IN_PROGRESS': 'İşlemde',
    'COMPLETED': 'Tamamlandı'
  }
  return texts[status as keyof typeof texts] || status || 'Bekliyor'
}

// Watchers
watch(() => props.dateFilter, () => {
  emit('countUpdated', filteredApprovals.value.length)
}, { deep: true })

// Lifecycle
onMounted(() => {
  loadApprovals()
})
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-move {
  transition: transform 0.3s ease;
}

/* Form checkbox styling */
.form-checkbox:checked {
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m13.854 3.646-7.5 7.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6 10.293l7.146-7.147a.5.5 0 0 1 .708.708z'/%3e%3c/svg%3e");
}

/* Badge styles */
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

/* Button hover effects */
.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.btn:active {
  transform: translateY(0);
}

/* Panel border animation */
.panel {
  border-left-width: 4px;
  transition: border-left-width 0.3s ease;
}

.panel:hover {
  border-left-width: 6px;
}

/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Dropdown positioning */
.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.z-10 {
  z-index: 10;
}

/* Modern SweetAlert2 Styles */
:global(.swal2-modern-popup) {
  border-radius: 16px !important;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
  border: 1px solid #e5e7eb !important;
}

:global(.swal2-modern-content) {
  margin: 0 !important;
  padding: 0 !important;
}

:global(.swal2-modern-popup .swal2-close) {
  position: absolute !important;
  top: 16px !important;
  right: 16px !important;
  width: 32px !important;
  height: 32px !important;
  background: #f3f4f6 !important;
  border-radius: 8px !important;
  color: #6b7280 !important;
  font-size: 16px !important;
  line-height: 32px !important;
  text-align: center !important;
  transition: all 0.2s !important;
}

:global(.swal2-modern-popup .swal2-close:hover) {
  background: #e5e7eb !important;
  color: #374151 !important;
}
</style>