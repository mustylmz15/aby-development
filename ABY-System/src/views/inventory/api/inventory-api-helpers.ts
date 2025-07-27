// inventory-api-helpers.ts - Inventory modülü için merkezi API yardımcıları
// Global interceptor'dan bağımsız çalışır

// Token yönetimi için helper fonksiyonlar (auth-api.ts'den import edebilir)
export const authHelpers = {
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
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5174';

// Inventory modülü için secure fetch helper
export async function secureInventoryApiCall(
  url: string, 
  options: RequestInit = {}
): Promise<Response> {
  const token = authHelpers.getToken();
  
  if (!token) {
    console.error('Inventory: Token bulunamadı, login sayfasına yönlendiriliyor');
    window.location.href = '/login';
    throw new Error('Authentication required');
  }
  
  if (authHelpers.isTokenExpired(token)) {
    console.error('Inventory: Token süresi dolmuş, login sayfasına yönlendiriliyor');
    authHelpers.removeToken();
    window.location.href = '/login';
    throw new Error('Token expired');
  }
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers,
  };
  
  console.log('🏭 Inventory API isteği gönderiliyor:', { url, method: options.method || 'GET' });
  
  const response = await fetch(url, {
    ...options,
    headers,
  });
  
  // 401 hatası durumunda otomatik logout
  if (response.status === 401) {
    console.error('Inventory: 401 Unauthorized - Token geçersiz, logout yapılıyor');
    authHelpers.removeToken();
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }
  
  console.log('📦 Inventory API yanıtı:', { 
    status: response.status, 
    ok: response.ok,
    url: response.url 
  });
  
  return response;
}

// Hareket ve transfer türü için kullanıcı dostu Türkçe etiket döndüren yardımcı
export function movementTypeLabel(type: string): string {
  const map: Record<string, string> = {
    'in': 'Giriş',
    'out': 'Çıkış',
    'transfer': 'Transfer',
    'WAREHOUSE_TO_WAREHOUSE': 'Depolar Arası',
    'WAREHOUSE_TO_PROJECT': 'Depodan Projeye',
    'PROJECT_TO_WAREHOUSE': 'Projeden Depoya',
    'PROJECT_TO_PROJECT': 'Projeler Arası',
    'REPAIR_TRANSFER': 'Onarım Transferi',
    'EMERGENCY_TRANSFER': 'Acil Transfer',
    'RECEIPT': 'Malzeme Girişi',
    'ISSUE': 'Malzeme Çıkışı',
    'ADJUSTMENT': 'Stok Düzeltme',
    'SCRAP': 'Hurda',
    'RETURN': 'İade',
    'REPAIR_IN': 'Onarıma Giriş',
    'REPAIR_OUT': 'Onarımdan Çıkış',
    'LOST': 'Kayıp',
    'FOUND': 'Bulunan',
  };
  return map[type] || type;
}
