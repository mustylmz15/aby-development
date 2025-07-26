import { computed } from 'vue'

/**
 * Layout Klasörü Özel Yetki Yönetimi
 * Bu dosya sadece layout klasöründeki componentler için kullanılır.
 * Klasör başka projeye kopyalandığında sorunsuz çalışır.
 * 
 * Güncellenmiş Rol Enumları (2025-06-23):
 *      -"ADMIN",
        "ONARIM_PERSONELI",
        "DEPO_PERSONELI",
        "SAHA_PERSONELI",
        "PROJE_ADMINI"
 */
export function useLayoutPermissions() {
  
  // =========================
  // TEMEL AUTH FONKSİYONLARI
  // =========================
  
  // Roller doğrudan user.roles dizisinden alınır
  const getUserRoles = (): string[] => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      if (user.roles && Array.isArray(user.roles)) {
        // Tüm rolleri string olarak döndür, tekilleştir
        return Array.from(new Set((user.roles as (string | number)[]).map(r => String(r)))).filter(Boolean) as string[]
      }
      return ['VIEWER']
    } catch {
      return ['VIEWER']
    }
  }

  const getUserRole = (): string => {
    const roles = getUserRoles()
    return roles.length > 0 ? roles[0] : 'VIEWER'
  }

  const hasRole = (role: string): boolean => {
    const userRoles = getUserRoles()
    return userRoles.includes(role)
  }
  
  const hasAnyRole = (roles: string[]): boolean => {
    const userRoles = getUserRoles()
    return roles.some(role => userRoles.includes(role))
  }
  
  const hasNoneOfRoles = (roles: string[]): boolean => {
    const userRoles = getUserRoles()
    return !roles.some(role => userRoles.includes(role))
  }

  // Admin override kontrolü (sadece YÖNETİCİ PANELİ için kullanılmaz)
  const hasRoleWithAdminOverride = (roles: string[]): boolean => {
    const userRoles = getUserRoles()
    return roles.some(role => userRoles.includes(role)) || userRoles.includes('ADMIN')
  }  // YÖNETİCİ PANELİ için özel kontrol (sadece ADMIN erişebilir)
  const canViewAdminPanel = (): boolean => {
    const userRoles = getUserRoles()
    return userRoles.includes('ADMIN')
  }

  // PROJE YÖNETİCİSİ alanı için özel kontrol (sadece ADMIN ve PROJE_ADMINI erişebilir)
  const canViewProjectAdminPanel = (): boolean => {
    const userRoles = getUserRoles()
    return userRoles.includes('ADMIN') || userRoles.includes('PROJE_ADMINI')
  }

  // =========================
  // SIDEBAR PERMISSIONS
  // =========================
  
  const sidebar = {
    // Ana Dashboard - Herkes görebilir
    canViewDashboard: computed(() => true),
    
    // Envanter Yönetimi
    canViewInventoryMenu: computed(() => 
      hasRoleWithAdminOverride([
        'MANAGER',
        'PROJECT_MANAGER', 
        'PROJE_ADMINI',
        'WAREHOUSE_MANAGER', 
        'INVENTORY_CLERK',
        'SUPERVISOR'
      ])
    ),
    
    // Depo Yönetimi
    canViewWarehouseMenu: computed(() => 
      hasRoleWithAdminOverride([
        'MANAGER',
        'WAREHOUSE_MANAGER',
        'PROJE_ADMINI', 
        'INVENTORY_CLERK',
        'DEPO_PERSONELI',
        'SUPERVISOR'
      ])
    ),
    
    // Onarım Merkezi
    canViewRepairMenu: computed(() => 
      hasRoleWithAdminOverride([
        'MANAGER',
        'REPAIR_TECHNICIAN',
        'PROJE_ADMINI',
        'SUPERVISOR'
      ])
    ),
    
    // Arıza Yönetimi
    canViewFaultManagementMenu: computed(() => 
      hasRoleWithAdminOverride([
        'MANAGER',
        'REPAIR_TECHNICIAN',
        'FIELD_ENGINEER',
        'PROJE_ADMINI',
        'SAHA_PERSONELI',
        'SUPERVISOR'
      ])
    ),
    
    // Onay Merkezi
    canViewApprovalMenu: computed(() => 
      hasRoleWithAdminOverride([
        'MANAGER',
        'PROJECT_MANAGER',
        'WAREHOUSE_MANAGER',
        'PROJE_ADMINI',
        'REPAIR_TECHNICIAN',
        'SUPERVISOR'
      ])
    ),    // Proje Yönetimi - Sadece ADMIN ve PROJE_ADMINI
    canViewProjectsMenu: computed(() => canViewProjectAdminPanel()),

    // PROJE YÖNETİCİSİ - Sadece ADMIN ve PROJE_ADMINI
    canViewProjectAdminMenu: computed(() => canViewProjectAdminPanel()),

    // YÖNETİCİ PANELİ - Sadece ADMIN ve MANAGER
    canViewAdminPanelMenu: computed(() => canViewAdminPanel()),
    
    // Kullanıcı Yönetimi (YÖNETİCİ PANELİ altında)
    canViewUserManagement: computed(() => canViewAdminPanel()),
    
    // Rol Yönetimi (YÖNETİCİ PANELİ altında)
    canViewRoleManagement: computed(() => canViewAdminPanel()),
    
    // İzin Yönetimi (YÖNETİCİ PANELİ altında)
    canViewPermissionManagement: computed(() => canViewAdminPanel()),

    // Alt Menü Yetkileri
    canViewProducts: computed(() => 
      hasRoleWithAdminOverride([
        'MANAGER',
        'PROJECT_MANAGER',
        'PROJE_ADMINI', 
        'WAREHOUSE_MANAGER',
        'INVENTORY_CLERK'
      ])
    ),
    
    canViewCategories: computed(() => 
      hasRoleWithAdminOverride([
        'MANAGER',
        'PROJECT_MANAGER',
        'PROJE_ADMINI',
        'WAREHOUSE_MANAGER'
      ])
    ),
    
    canViewStockReports: computed(() => 
      hasRoleWithAdminOverride([
        'MANAGER',
        'PROJECT_MANAGER',
        'PROJE_ADMINI',
        'WAREHOUSE_MANAGER',
        'SUPERVISOR'
      ])
    ),
    
    canViewStockMovements: computed(() => 
      hasRoleWithAdminOverride([
        'MANAGER',
        'WAREHOUSE_MANAGER',
        'PROJE_ADMINI',
        'INVENTORY_CLERK',
        'DEPO_PERSONELI'
      ])
    ),
    
    canViewStockTransfer: computed(() => 
      hasRoleWithAdminOverride([
        'MANAGER',
        'WAREHOUSE_MANAGER',
        'PROJE_ADMINI',
        'INVENTORY_CLERK'
      ])
    ),
    
    canViewCenterStock: computed(() => 
      hasRoleWithAdminOverride([
        'MANAGER',
        'PROJECT_MANAGER',
        'PROJE_ADMINI',
        'WAREHOUSE_MANAGER'
      ])
    )
  }

  // =========================
  // HEADER PERMISSIONS
  // =========================
  
  const header = {
    // Bildirimler - Herkes görebilir
    canViewNotifications: computed(() => true),
    
    // Admin Panel Butonu - Sadece ADMIN ve MANAGER
    canViewAdminPanelButton: computed(() => canViewAdminPanel()),
    
    // Hızlı Aksiyonlar Menüsü
    canViewQuickActions: computed(() => 
      hasRoleWithAdminOverride([
        'MANAGER',
        'PROJECT_MANAGER',
        'PROJE_ADMINI',
        'WAREHOUSE_MANAGER'
      ])
    ),
    
    // Yeni Öğe Ekleme Butonu
    canCreateNewItem: computed(() => 
      hasRoleWithAdminOverride([
        'MANAGER',
        'PROJECT_MANAGER',
        'PROJE_ADMINI',
        'WAREHOUSE_MANAGER',
        'INVENTORY_CLERK'
      ])
    ),
    
    // Kullanıcı Menüsü - Herkes görebilir
    canViewUserMenu: computed(() => true),
    
    // Sistem Ayarları
    canViewSettings: computed(() => 
      hasRoleWithAdminOverride([
        'MANAGER',
        'PROJECT_MANAGER',
        'PROJE_ADMINI',
        'WAREHOUSE_MANAGER'
      ])
    ),
    
    // Profil Düzenleme - Herkes
    canEditProfile: computed(() => true),
    
    // Çıkış Yapma - Herkes
    canLogout: computed(() => true)
  }

  // =========================
  // YARDIMCI FONKSİYONLAR
  // =========================
    const utils = {
    getUserRole,
    getUserRoles,
    hasRole,
    hasAnyRole,
    hasNoneOfRoles,
    hasRoleWithAdminOverride,
    canViewAdminPanel,
    canViewProjectAdminPanel,
    
    // Rol adını Türkçe gösterim için
    getRoleDisplayName: (role?: string): string => {
      const currentRole = role || getUserRole()
      const roleNames: Record<string, string> = {
        // Sistem Yönetimi Rolleri
        'ADMIN': 'Sistem Yöneticisi',
        'MANAGER': 'Genel Yönetici', 
        'SUPERVISOR': 'Süpervizör',
        'OPERATOR': 'Operatör',
        'VIEWER': 'Görüntüleyici',
        
        // İş Alanı Özel Rolleri
        'PROJECT_MANAGER': 'Proje Yöneticisi',
        'WAREHOUSE_MANAGER': 'Depo Yöneticisi',
        'REPAIR_TECHNICIAN': 'Onarım Teknisyeni',
        'INVENTORY_CLERK': 'Envanter Memuru',
        'FIELD_ENGINEER': 'Saha Mühendisi',
        'DEPO_PERSONELI': 'Depo Personeli',
        'SAHA_PERSONELI': 'Saha Personeli',
        'PROJE_ADMINI': 'Proje Yöneticisi (Yüksek Yetki)'
      }
      return roleNames[currentRole] || 'Bilinmeyen Rol'
    },
    
    // Rol tipini belirle
    getRoleType: (role?: string): 'system' | 'business' | 'unknown' => {
      const currentRole = role || getUserRole()
      const systemRoles = ['ADMIN', 'MANAGER', 'SUPERVISOR', 'OPERATOR', 'VIEWER']
      const businessRoles = [
        'PROJECT_MANAGER', 'WAREHOUSE_MANAGER', 'REPAIR_TECHNICIAN',
        'INVENTORY_CLERK', 'FIELD_ENGINEER', 'DEPO_PERSONELI', 
        'SAHA_PERSONELI', 'PROJE_ADMINI'
      ]
      
      if (systemRoles.includes(currentRole)) return 'system'
      if (businessRoles.includes(currentRole)) return 'business'
      return 'unknown'
    }
  }

  return {
    sidebar,
    header,
    utils
  }
}