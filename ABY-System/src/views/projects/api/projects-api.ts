// projects-api.ts - Proje modülü için modüler API
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
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5174';
const PROJECTS_API_URL = `${API_BASE_URL}/api/v1/projects`;

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
  
  console.log('🚀 Projects API isteği gönderiliyor:', { url, method: options.method || 'GET' });
  
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
  
  console.log('📦 Projects API yanıtı:', { 
    status: response.status, 
    ok: response.ok,
    url: response.url 
  });
  
  return response;
}

// Project interface'i
export interface Project {
  id?: string;
  code: string;
  name: string;
  description: string;
  status: 'ACTIVE' | 'PASSIVE' | 'PLANNING';
  organizationId?: string;
  startDate?: string | null;
  endDate?: string | null;
  sla: number;
  createdAt?: string;
  updatedAt?: string;
}

// Rol kontrolü yapan helper (Projects modülü için)
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
    console.error('Projects modülü rol kontrol hatası:', error);
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
    console.log('Projects modülü: Kullanıcı bilgileri güncellendi', userData);
    
    return userData;
  } catch (error) {
    console.error('Projects modülü kullanıcı bilgileri yenileme hatası:', error);
    throw error;
  }
}

// Projects API fonksiyonları
export const projectsApi = {
  // Projeleri getir
  async getProjects(): Promise<Project[]> {
    try {
      const response = await secureApiCall(PROJECTS_API_URL);
      
      if (!response.ok) {
        throw new Error('Projeler alınamadı');
      }
      
      const projects = await response.json();
      console.log('✅ Projeler başarıyla alındı:', projects.length + ' proje');
      
      return projects;
    } catch (error) {
      console.error('❌ Projeler alınırken hata:', error);
      throw error;
    }
  },

  // Proje oluştur
  async createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    try {
      const response = await secureApiCall(PROJECTS_API_URL, {
        method: 'POST',
        body: JSON.stringify(project),
      });
      
      if (!response.ok) {
        throw new Error('Proje oluşturulamadı');
      }
      
      const createdProject = await response.json();
      console.log('✅ Proje başarıyla oluşturuldu:', createdProject);
      
      return createdProject;
    } catch (error) {
      console.error('❌ Proje oluşturulurken hata:', error);
      throw error;
    }
  },

  // Proje güncelle
  async updateProject(id: string, project: Partial<Project>): Promise<Project> {
    try {
      const response = await secureApiCall(`${PROJECTS_API_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(project),
      });
      
      if (!response.ok) {
        throw new Error('Proje güncellenemedi');
      }
      
      const updatedProject = await response.json();
      console.log('✅ Proje başarıyla güncellendi:', updatedProject);
      
      return updatedProject;
    } catch (error) {
      console.error('❌ Proje güncellenirken hata:', error);
      throw error;
    }
  },

  // Proje sil
  async deleteProject(id: string): Promise<void> {
    try {
      const response = await secureApiCall(`${PROJECTS_API_URL}/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Proje silinemedi');
      }
      
      console.log('✅ Proje başarıyla silindi:', id);
    } catch (error) {
      console.error('❌ Proje silinirken hata:', error);
      throw error;
    }
  },

  // Rol kontrolü fonksiyonları
  hasRole,
  refreshCurrentUserInfo,
  
  // Belirli rollerin kontrolü için yardımcı fonksiyonlar
  isAdmin: () => hasRole('ADMIN'),
  isUser: () => hasRole('USER'),
  isManager: () => hasRole('MANAGER'),
  isProjectManager: () => hasRole('PROJECT_MANAGER')
};

// Auth helpers'ı da export et (diğer modüller için)
export { authHelpers };
