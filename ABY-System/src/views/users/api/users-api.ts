// users-api.ts - Users modülü için modüler API
// Global interceptor'dan bağımsız çalışır

// Token yönetimi için helper fonksiyonlar
const authHelpers = {
  getToken: (): string | null => {
    return localStorage.getItem('token');
  },
  
  removeToken: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  isTokenExpired: (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }
};

// API base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// Fetch helper fonksiyonu
async function secureApiCall(
  url: string, 
  options: RequestInit = {}
): Promise<Response> {
  const token = authHelpers.getToken();
  
  if (!token) {
    console.error('Token bulunamadı, login sayfasına yönlendiriliyor');
    window.location.href = '/login';
    throw new Error('Authentication required');
  }
  
  if (authHelpers.isTokenExpired(token)) {
    console.error('Token süresi dolmuş, login sayfasına yönlendiriliyor');
    authHelpers.removeToken();
    window.location.href = '/login';
    throw new Error('Token expired');
  }
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers,
  };
  
  console.log('🚀 Users API isteği:', { url, method: options.method || 'GET' });
  
  const response = await fetch(url, {
    ...options,
    headers,
  });
  
  // 401 hatası durumunda otomatik logout
  if (response.status === 401) {
    console.error('401 Unauthorized - Token geçersiz, logout yapılıyor');
    authHelpers.removeToken();
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }
  
  console.log('📦 Users API yanıtı:', { 
    status: response.status, 
    ok: response.ok,
    url: response.url 
  });
  
  return response;
}

// User interface'leri
export interface User {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  phone?: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt?: string;
  updatedAt?: string;
  roles: string[];
  assignments?: Assignment[];
  avatar?: string;
}

export interface Assignment {
  id: string;
  role: string;
  resourceType: string;
  resourceId: string;
  assignedAt: string;
  expiresAt?: string;
}

export interface PasswordChangeData {
  oldPassword: string;
  newPassword: string;
}

// Users API fonksiyonları
// Rol kontrolü yapan helper (Users modülü için)
function hasRole(requiredRole: string): boolean {
  try {
    const userStr = localStorage.getItem('user');
    if (!userStr) return false;
    
    const user = JSON.parse(userStr);
    const userRoles = user.roles || [];
    
    // Admin her şeyi görebilir
    if (userRoles.includes('ADMIN')) return true;
    
    // Gerekli rol kontrolü
    return userRoles.includes(requiredRole);
  } catch (error) {
    console.error('Users modülü rol kontrol hatası:', error);
    return false;
  }
}

// Kullanıcı bilgilerini güncellemek için API çağrısı
async function refreshCurrentUserInfo(): Promise<any> {
  const token = authHelpers.getToken();
  if (!token) {
    throw new Error('Token bulunamadı');
  }

  try {
    const response = await secureApiCall(`${API_BASE_URL}/auth/me`);
    const userData = await response.json();
    
    // Kullanıcı bilgilerini localStorage'a güncelle
    localStorage.setItem('user', JSON.stringify(userData));
    console.log('Users modülü: Kullanıcı bilgileri güncellendi', userData);
    
    return userData;
  } catch (error) {
    console.error('Users modülü kullanıcı bilgileri yenileme hatası:', error);
    throw error;
  }
}

export const usersApi = {
  // Kullanıcı profili getir
  async getUserProfile(userId: string): Promise<User> {
    try {
      const response = await secureApiCall(`${API_BASE_URL}/api/v1/users/${userId}`);
      
      if (!response.ok) {
        throw new Error(`Kullanıcı profili alınamadı: ${response.status}`);
      }
      
      const userData = await response.json();
      console.log('✅ Kullanıcı profili başarıyla alındı:', userData);
      
      return userData;
    } catch (error) {
      console.error('❌ Kullanıcı profili alınırken hata:', error);
      throw error;
    }
  },

  // Şifre değiştir
  async changePassword(passwordData: PasswordChangeData): Promise<void> {
    try {
      const response = await secureApiCall(`${API_BASE_URL}/api/v1/users/change-password`, {
        method: 'PATCH',
        body: JSON.stringify(passwordData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        
        // Özel hata mesajları
        if (response.status === 400) {
          throw new Error(errorData.message || 'Mevcut şifre yanlış veya yeni şifre geçersiz');
        } else if (response.status === 401) {
          throw new Error('Mevcut şifre yanlış');
        } else if (response.status === 403) {
          throw new Error('Bu işlem için yetkiniz bulunmuyor');
        } else {
          throw new Error(errorData.message || 'Şifre güncelleme başarısız oldu');
        }
      }
      
      console.log('✅ Şifre başarıyla güncellendi');
    } catch (error) {
      console.error('❌ Şifre güncellenirken hata:', error);
      throw error;
    }
  },

  // Tüm kullanıcıları getir (kullanici-yonetimi.vue için)
  async getAllUsers(): Promise<User[]> {
    try {
      const response = await secureApiCall(`${API_BASE_URL}/api/v1/users`);
      
      if (!response.ok) {
        throw new Error('Kullanıcılar alınamadı');
      }
      
      const data = await response.json();
      console.log('✅ Kullanıcılar başarıyla alındı:', data.length || 0, 'kullanıcı');
      
      return Array.isArray(data) ? data : (data.data || []);
    } catch (error) {
      console.error('❌ Kullanıcılar alınırken hata:', error);
      throw error;
    }
  },

  // Kullanıcı oluştur
  async createUser(userData: Partial<User>): Promise<User> {
    try {
      const response = await secureApiCall(`${API_BASE_URL}/api/v1/users`, {
        method: 'POST',
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        throw new Error('Kullanıcı oluşturulamadı');
      }
      
      const createdUser = await response.json();
      console.log('✅ Kullanıcı başarıyla oluşturuldu:', createdUser);
      
      return createdUser;
    } catch (error) {
      console.error('❌ Kullanıcı oluşturulurken hata:', error);
      throw error;
    }
  },

  // Kullanıcı güncelle
  async updateUser(userId: string, userData: Partial<User>): Promise<User> {
    try {
      const response = await secureApiCall(`${API_BASE_URL}/api/v1/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        throw new Error('Kullanıcı güncellenemedi');
      }
      
      const updatedUser = await response.json();
      console.log('✅ Kullanıcı başarıyla güncellendi:', updatedUser);
      
      return updatedUser;
    } catch (error) {
      console.error('❌ Kullanıcı güncellenirken hata:', error);
      throw error;
    }
  },

  // Kullanıcı sil
  async deleteUser(userId: string): Promise<void> {
    try {
      const response = await secureApiCall(`${API_BASE_URL}/api/v1/users/${userId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Kullanıcı silinemedi');
      }
      
      console.log('✅ Kullanıcı başarıyla silindi:', userId);
    } catch (error) {
      console.error('❌ Kullanıcı silinirken hata:', error);
      throw error;
    }
  },

  // Assignment sil
  async deleteAssignment(assignmentId: string): Promise<void> {
    try {
      const response = await secureApiCall(`${API_BASE_URL}/api/v1/users/assignments/${assignmentId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Assignment silinemedi');
      }
      
      console.log('✅ Assignment başarıyla silindi:', assignmentId);
    } catch (error) {
      console.error('❌ Assignment silinirken hata:', error);
      throw error;
    }
  },

  // Kullanıcıya rol ata
  async assignRoles(userId: string, roles: string[]): Promise<void> {
    try {
      const response = await secureApiCall(`${API_BASE_URL}/api/v1/users/assign-roles`, {
        method: 'POST',
        body: JSON.stringify({ userId, roles }),
      });
      
      if (!response.ok) {
        throw new Error('Roller atanamadı');
      }
      
      console.log('✅ Roller başarıyla atandı:', { userId, roles });
    } catch (error) {
      console.error('❌ Rol atanırken hata:', error);
      throw error;
    }
  },

  // Projeleri getir (dropdown için)
  async getProjects(): Promise<any[]> {
    try {
      const response = await secureApiCall(`${API_BASE_URL}/api/v1/projects`);
      
      if (!response.ok) {
        throw new Error('Projeler alınamadı');
      }
      
      const data = await response.json();
      console.log('✅ Projeler başarıyla alındı:', data.length || 0, 'proje');
      
      return Array.isArray(data) ? data : (data.data || []);
    } catch (error) {
      console.error('❌ Projeler alınırken hata:', error);
      return [];
    }
  },

  // Depoları getir (dropdown için)
  async getWarehouses(): Promise<any[]> {
    try {
      const response = await secureApiCall(`${API_BASE_URL}/api/v1/warehouses`);
      
      if (!response.ok) {
        throw new Error('Depolar alınamadı');
      }
      
      const data = await response.json();
      console.log('✅ Depolar başarıyla alındı:', data.length || 0, 'depo');
      
      return Array.isArray(data) ? data : (data.data || []);
    } catch (error) {
      console.error('❌ Depolar alınırken hata:', error);
      return [];
    }
  },

  // Proje atamalarını kaldır
  async removeProjectAssignments(userId: string, projectIds: string[]): Promise<void> {
    try {
      console.log('🗑️ Proje atamaları kaldırılıyor...', { userId, projectIds });
      
      const response = await secureApiCall(`${API_BASE_URL}/api/v1/users/remove-project-assignments`, {
        method: 'DELETE',
        body: JSON.stringify({ userId, warehouseIds: projectIds })
      });
      
      if (!response.ok) {
        throw new Error('Proje atamaları kaldırılamadı');
      }
      
      console.log('✅ Proje atamaları başarıyla kaldırıldı');
    } catch (error) {
      console.error('❌ Proje atamaları kaldırılırken hata:', error);
      throw error;
    }
  },

  // Depo atamalarını kaldır
  async removeWarehouseAssignments(userId: string, warehouseIds: string[]): Promise<void> {
    try {
      console.log('🗑️ Depo atamaları kaldırılıyor...', { userId, warehouseIds });
      
      const response = await secureApiCall(`${API_BASE_URL}/api/v1/users/remove-warehouse-assignments`, {
        method: 'DELETE',
        body: JSON.stringify({ userId, warehouseIds })
      });
      
      if (!response.ok) {
        throw new Error('Depo atamaları kaldırılamadı');
      }
      
      console.log('✅ Depo atamaları başarıyla kaldırıldı');
    } catch (error) {
      console.error('❌ Depo atamaları kaldırılırken hata:', error);
      throw error;
    }
  },

  // Proje atama
  async assignProjects(userId: string, projectIds: string[], role: string): Promise<void> {
    try {
      console.log('🔗 Proje ataması yapılıyor...', { userId, projectIds, role });
      
      const response = await secureApiCall(`${API_BASE_URL}/api/v1/users/assign-projects`, {
        method: 'POST',
        body: JSON.stringify({ userId, projectIds, role })
      });
      
      if (!response.ok) {
        throw new Error('Proje ataması yapılamadı');
      }
      
      console.log('✅ Proje ataması başarıyla tamamlandı');
    } catch (error) {
      console.error('❌ Proje ataması yapılırken hata:', error);
      throw error;
    }
  },

  // Depo atama
  async assignWarehouses(userId: string, warehouseIds: string[], role: string): Promise<void> {
    try {
      console.log('🔗 Depo ataması yapılıyor...', { userId, warehouseIds, role });
      
      const response = await secureApiCall(`${API_BASE_URL}/api/v1/users/assign-warehouses`, {
        method: 'POST',
        body: JSON.stringify({ userId, warehouseIds, role })
      });
      
      if (!response.ok) {
        throw new Error('Depo ataması yapılamadı');
      }
      
      console.log('✅ Depo ataması başarıyla tamamlandı');
    } catch (error) {
      console.error('❌ Depo ataması yapılırken hata:', error);
      throw error;
    }
  },

  // Çoklu assignment silme
  async removeAssignments(assignmentIds: string[]): Promise<void> {
    try {
      console.log('🗑️ Çoklu atamalar kaldırılıyor...', { assignmentIds });
      
      const response = await secureApiCall(`${API_BASE_URL}/api/v1/users/remove-assignment`, {
        method: 'DELETE',
        body: JSON.stringify({ assignmentIds })
      });
      
      if (!response.ok) {
        throw new Error('Atamalar kaldırılamadı');
      }
      
      console.log('✅ Çoklu atamalar başarıyla kaldırıldı');
    } catch (error) {
      console.error('❌ Çoklu atamalar kaldırılırken hata:', error);
      throw error;
    }
  },

  // Enum değerlerini getir
  async getEnums(): Promise<any> {
    try {
      console.log('📋 Enum değerleri getiriliyor...');
      
      const response = await secureApiCall(`${API_BASE_URL}/api/v1/types/enums`);
      
      if (!response.ok) {
        throw new Error('Enum değerleri alınamadı');
      }
      
      const data = await response.json();
      console.log('✅ Enum değerleri başarıyla alındı', data);
      
      return data;
    } catch (error) {
      console.error('❌ Enum değerleri alınırken hata:', error);
      throw error;
    }
  },

  // Rol kontrolü fonksiyonları
  hasRole,
  refreshCurrentUserInfo,
  
  // Belirli rollerin kontrolü için yardımcı fonksiyonlar
  isAdmin: () => hasRole('ADMIN'),
  isUser: () => hasRole('USER'),
  isManager: () => hasRole('MANAGER')
};

// Auth helpers'ı da export et (diğer modüller için)
export { authHelpers };
