// center-stock-api.ts - Merkezi stok modülü için modüler API
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
const ADD_STOCK_URL = `${BASE_URL}/api/v1/inventory/warehouses/add-stock`;
const STOCK_ITEMS_URL = `${BASE_URL}/api/v1/stock-items`;

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
  
  console.log('🚀 Center Stock API isteği:', { url, method: options.method || 'GET' });
  
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
  
  console.log('📦 Center Stock API yanıtı:', { 
    status: response.status, 
    ok: response.ok,
    url: response.url 
  });
  
  return response;
}

// Ürünleri listele (dropdown için)
export async function getProducts() {
  try {
    const response = await secureApiCall(`${BASE_URL}/api/v1/products`);
    
    if (!response.ok) {
      throw new Error('Ürünler alınamadı');
    }
    
    const data = await response.json();
    console.log('✅ Ürünler başarıyla alındı:', data.length || 0, 'ürün');
    
    // API doğrudan array dönerse
    if (Array.isArray(data)) return data;
    // API { data: [...] } dönerse
    return data?.data || [];
  } catch (e) {
    console.error('❌ Ürünler API hatası:', e);
    return [];
  }
}

// Projeleri listele (dropdown için)
export async function getProjects() {
  try {
    const response = await secureApiCall(`${BASE_URL}/api/v1/projects`);
    
    if (!response.ok) {
      throw new Error('Projeler alınamadı');
    }
    
    const data = await response.json();
    console.log('✅ Projeler başarıyla alındı:', data.length || 0, 'proje');
    
    // API doğrudan array dönerse
    if (Array.isArray(data)) return data;
    // API { data: [...] } dönerse
    return data?.data || [];
  } catch (e) {
    console.error('❌ Projeler API hatası:', e);
    return [];
  }
}

// CENTRAL depo ürünlerini listele
export async function getCentralStockItems() {
  try {
    const url = new URL(STOCK_ITEMS_URL);
    url.searchParams.append('warehouseType', 'CENTRAL');
    
    const response = await secureApiCall(url.toString());
    
    if (!response.ok) {
      throw new Error('Merkezi stok ürünleri alınamadı');
    }
    
    const data = await response.json();
    console.log('✅ Merkezi stok ürünleri başarıyla alındı:', data.length || 0, 'ürün');
    
    return data || [];
  } catch (e) {
    console.error('❌ Merkezi stok API hatası:', e);
    return [];
  }
}

// CENTRAL depo için ürün ekle
export async function addCentralStockItem(payload: any) {
  try {
    const response = await secureApiCall(ADD_STOCK_URL, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      throw new Error('Merkezi stoğa ürün eklenemedi');
    }
    
    const data = await response.json();
    console.log('✅ Merkezi stoğa ürün başarıyla eklendi:', data);
    
    return data;
  } catch (e) {
    console.error('❌ Merkezi stok ekleme hatası:', e);
    throw e;
  }
}
