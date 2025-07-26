import { ref, computed, onMounted, onUnmounted } from 'vue'
import { faultApi } from '../api/faultApi'
import { repairApi } from '../api/repairApi'
import { transferApi } from '../api/transferApi'
import { userApi } from '../api/userApi'

// Notification interface
interface ApprovalNotification {
  id: string
  type: 'fault' | 'repair' | 'transfer'
  title: string
  message: string
  count: number
  priority: 'high' | 'medium' | 'low'
  createdAt: Date
  icon: string
  color: string
  route: string
}

// Global notification state
const notifications = ref<ApprovalNotification[]>([])
const isLoading = ref(false)
const lastUpdateTime = ref<Date | null>(null)
const userRoles = ref<string[]>([])

// Polling interval (5 minutes)
const POLLING_INTERVAL = 5 * 60 * 1000
let pollingTimer: number | null = null

export function useApprovalNotifications() {
  
  // Computed
  const totalNotifications = computed(() => {
    return notifications.value.reduce((total, notification) => total + notification.count, 0)
  })

  const hasNotifications = computed(() => {
    return notifications.value.length > 0
  })

  const highPriorityNotifications = computed(() => {
    return notifications.value.filter(n => n.priority === 'high')
  })

  // Kullanıcı rollerini yükle
  const loadUserRoles = async () => {
    try {
      const detailedInfo = await userApi.getDetailedInfo()
      userRoles.value = detailedInfo.roles || []
    } catch (error) {
      console.error('Kullanıcı rolleri yüklenirken hata:', error)
      userRoles.value = []
    }
  }

  // Kullanıcının DEPO_PERSONELI olup olmadığını kontrol et
  const isDepoPersoneli = computed(() => {
    return userRoles.value.includes('DEPO_PERSONELI')
  })

  // Arızalı ürün onaylarını kontrol et
  const checkFaultApprovals = async (): Promise<ApprovalNotification | null> => {
    try {
      if (isDepoPersoneli.value) return null // DEPO_PERSONELI bu onayları görmez
      
      const faultApprovals = await faultApi.getApprovals()
      const count = faultApprovals.length

      if (count > 0) {
        return {
          id: 'fault-approvals',
          type: 'fault',
          title: 'Arızalı Ürün Onayları',
          message: `${count} adet arızalı ürün onay bekliyor`,
          count,
          priority: count > 5 ? 'high' : 'medium',
          createdAt: new Date(),
          icon: 'fa-exclamation-triangle',
          color: 'text-red-500',
          route: '/approval?tab=fault'
        }
      }
    } catch (error) {
      console.error('Arızalı ürün onayları kontrol edilirken hata:', error)
    }
    return null
  }

  // Onarım dönüş onaylarını kontrol et
  const checkRepairApprovals = async (): Promise<ApprovalNotification | null> => {
    try {
      const repairApprovals = await repairApi.getApprovals()
      const count = repairApprovals.length

      if (count > 0) {
        return {
          id: 'repair-approvals',
          type: 'repair',
          title: 'Onarım Dönüş Onayları',
          message: `${count} adet onarım dönüşü onay bekliyor`,
          count,
          priority: count > 3 ? 'high' : 'medium',
          createdAt: new Date(),
          icon: 'fa-tools',
          color: 'text-blue-500',
          route: '/approval?tab=repair'
        }
      }
    } catch (error) {
      console.error('Onarım dönüş onayları kontrol edilirken hata:', error)
    }
    return null
  }

  // Transfer onaylarını kontrol et
  const checkTransferApprovals = async (): Promise<ApprovalNotification | null> => {
    try {
      if (isDepoPersoneli.value) return null // DEPO_PERSONELI bu onayları görmez
      
      const transferApprovals = await transferApi.getApprovals()
      const count = transferApprovals.length

      if (count > 0) {
        return {
          id: 'transfer-approvals',
          type: 'transfer',
          title: 'Transfer Onayları',
          message: `${count} adet depo transferi onay bekliyor`,
          count,
          priority: count > 10 ? 'high' : 'medium',
          createdAt: new Date(),
          icon: 'fa-exchange-alt',
          color: 'text-green-500',
          route: '/approval?tab=transfer'
        }
      }
    } catch (error) {
      console.error('Transfer onayları kontrol edilirken hata:', error)
    }
    return null
  }

  // Tüm onayları kontrol et ve bildirimleri güncelle
  const checkAllApprovals = async () => {
    if (isLoading.value) return

    isLoading.value = true
    try {
      // Kullanıcı rollerini yükle (ilk çalıştırmada)
      if (userRoles.value.length === 0) {
        await loadUserRoles()
      }

      const newNotifications: ApprovalNotification[] = []

      // Paralel olarak tüm onayları kontrol et
      const [faultNotification, repairNotification, transferNotification] = await Promise.all([
        checkFaultApprovals(),
        checkRepairApprovals(),
        checkTransferApprovals()
      ])

      // Null olmayan bildirimleri ekle
      if (faultNotification) newNotifications.push(faultNotification)
      if (repairNotification) newNotifications.push(repairNotification)
      if (transferNotification) newNotifications.push(transferNotification)

      // Bildirimleri güncelle
      notifications.value = newNotifications
      lastUpdateTime.value = new Date()

    } catch (error) {
      console.error('Onay bildirimleri kontrol edilirken hata:', error)
    } finally {
      isLoading.value = false
    }
  }

  // Belirli bir bildirim tipini temizle
  const clearNotification = (notificationId: string) => {
    notifications.value = notifications.value.filter(n => n.id !== notificationId)
  }

  // Tüm bildirimleri temizle
  const clearAllNotifications = () => {
    notifications.value = []
  }

  // Belirli bir tip için bildirim sayısını al
  const getNotificationCount = (type: 'fault' | 'repair' | 'transfer') => {
    const notification = notifications.value.find(n => n.type === type)
    return notification ? notification.count : 0
  }

  // Manuel yenileme
  const refreshNotifications = async () => {
    await checkAllApprovals()
  }

  // Polling başlat
  const startPolling = () => {
    // İlk kontrol
    checkAllApprovals()
    
    // Periyodik kontrol
    pollingTimer = setInterval(() => {
      checkAllApprovals()
    }, POLLING_INTERVAL)
  }

  // Polling durdur
  const stopPolling = () => {
    if (pollingTimer) {
      clearInterval(pollingTimer)
      pollingTimer = null
    }
  }

  // Lifecycle management
  onMounted(() => {
    startPolling()
  })

  onUnmounted(() => {
    stopPolling()
  })

  // Exported functions and state
  return {
    // State
    notifications,
    isLoading,
    lastUpdateTime,
    userRoles,
    
    // Computed
    totalNotifications,
    hasNotifications,
    highPriorityNotifications,
    isDepoPersoneli,
    
    // Methods
    checkAllApprovals,
    clearNotification,
    clearAllNotifications,
    getNotificationCount,
    refreshNotifications,
    startPolling,
    stopPolling,
    
    // Individual checkers (for manual use)
    checkFaultApprovals,
    checkRepairApprovals,
    checkTransferApprovals
  }
}

// Global singleton instance for app-wide use
let globalNotificationInstance: ReturnType<typeof useApprovalNotifications> | null = null

export function useGlobalApprovalNotifications() {
  if (!globalNotificationInstance) {
    globalNotificationInstance = useApprovalNotifications()
  }
  return globalNotificationInstance
}
