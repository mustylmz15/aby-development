// warehouses-api.ts - Depo modülü için modüler API
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

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
  
  console.log('🚀 Warehouses API isteği:', { url, method: options.method || 'GET' });
  
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
  
  console.log('📦 Warehouses API yanıtı:', { 
    status: response.status, 
    ok: response.ok,
    url: response.url 
  });
  
  return response;
}

export async function getWarehouses() {
  try {
    const response = await secureApiCall(`${BASE_URL}/api/v1/warehouses`);
    
    if (!response.ok) {
      throw new Error('Depolar alınamadı');
    }
    
    const data = await response.json();
    console.log('✅ Depolar başarıyla alındı:', data.length || 0, 'depo');
    
    if (Array.isArray(data)) return data;
    return data?.data || [];
  } catch (e) {
    console.error('❌ Depolar API hatası:', e);
    return [];
  }
}
