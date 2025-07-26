import axios from 'axios';

// User API - Kullanıcı bilgileri ve rol yönetimi
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

function getAuthToken() {
  const token = localStorage.getItem('token');
  return token ? `Bearer ${token}` : '';
}

// JWT token'dan userId çıkar
function getUserIdFromToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    console.log('JWT Token payload:', decoded); // Debug için
    
    // Farklı olası field isimlerini dene
    const userId = decoded.userId || decoded.id || decoded.sub || decoded.user_id || decoded.ID;
    
    if (!userId) {
      console.warn('Token\'da userId bulunamadı. Token payload:', decoded);
    }
    
    return userId;
  } catch (error) {
    console.error('Token\'dan userId çıkarılırken hata:', error);
    return null;
  }
}

// Kullanıcı profil bilgilerini getir
export async function getUserProfile() {
  try {
    const userId = getUserIdFromToken();
    if (!userId) {
      throw new Error('User ID bulunamadı');
    }
    
    const API_URL = `${API_BASE_URL}/api/v1/users/${userId}`;
    const res = await axios.get(API_URL, {
      headers: { Authorization: getAuthToken() }
    });
    
    return res.data;
  } catch (error) {
    console.error('Kullanıcı profil bilgileri yüklenirken hata:', error);
    throw error;
  }
}

// Detaylı kullanıcı bilgilerini getir (sadece /users/{userId} endpoint'ini kullan)
export async function getDetailedUserInfo() {
  try {
    const userId = getUserIdFromToken();
    if (!userId) {
      throw new Error('User ID bulunamadı');
    }
    
    const API_URL = `${API_BASE_URL}/api/v1/users/${userId}`;
    const res = await axios.get(API_URL, {
      headers: { Authorization: getAuthToken() }
    });
    
    const userData = res.data;
    
    // API'den gelen assignments array'inden rolleri çıkar
    let roles: string[] = [];
    let permissions: string[] = [];
    let assignments: any[] = [];
    
    if (userData.assignments && Array.isArray(userData.assignments)) {
      assignments = userData.assignments.filter((assignment: any) => assignment.isActive);
      
      // Aktif assignment'lardan rolleri çıkar
      roles = assignments.map((assignment: any) => assignment.role).filter(Boolean);
      
      // Aktif assignment'lardan permissions'ları çıkar ve birleştir
      assignments.forEach((assignment: any) => {
        if (assignment.permissions && Array.isArray(assignment.permissions)) {
          permissions.push(...assignment.permissions);
        }
      });
      
      // Tekrar eden rolleri ve permissions'ları temizle
      roles = [...new Set(roles)];
      permissions = [...new Set(permissions)];
    }
    
    return {
      profile: userData,
      roles,
      permissions,
      assignments,
      primaryRole: roles && roles.length > 0 ? roles[0] : null,
      hasRole: (roleName: string) => {
        return roles && roles.includes(roleName);
      },
      hasPermission: (permissionName: string) => {
        return permissions && permissions.includes(permissionName);
      },
      getAssignmentsByResourceType: (resourceType: string) => {
        return assignments.filter((assignment: any) => assignment.resourceType === resourceType);
      },
      getWarehouseAssignments: () => {
        return assignments.filter((assignment: any) => assignment.resourceType === 'WAREHOUSE');
      },
      getProjectAssignments: () => {
        return assignments.filter((assignment: any) => assignment.resourceType === 'PROJECT');
      }
    };
  } catch (error) {
    console.error('Detaylı kullanıcı bilgileri yüklenirken hata:', error);
    throw error;
  }
}

// User API nesnesi
export const userApi = {
  getProfile: getUserProfile,
  getDetailedInfo: getDetailedUserInfo
};
