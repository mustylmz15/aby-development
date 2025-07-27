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

// Rol kontrolü yapan helper (Inventory modülü için)
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
    console.error('Inventory modülü rol kontrol hatası:', error);
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
    console.log('Inventory modülü: Kullanıcı bilgileri güncellendi', userData);
    
    return userData;
  } catch (error) {
    console.error('Inventory modülü kullanıcı bilgileri yenileme hatası:', error);
    throw error;
  }
}

// Token yönetimi için helper fonksiyonlar (Global interceptor yerine)
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

// Fetch helper fonksiyonu (Axios yerine)
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
  
  console.log('🚀 Stock Transfer API isteği:', { url, method: options.method || 'GET' });
  
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
  
  console.log('📦 Stock Transfer API yanıtı:', { 
    status: response.status, 
    ok: response.ok,
    url: response.url 
  });
  
  return response;
}

// Transfer onayla (approvalToken ile)
export async function approveTransfer({ transferId, approvalToken }: { transferId: string; approvalToken: string }) {
  // Yeni endpoint: /api/v1/inventory/transfers/approve/<token>
  const API_URL_APPROVE = `${API_BASE_URL}/api/v1/inventory/transfers/approve/${approvalToken}`;
  const response = await secureApiCall(API_URL_APPROVE, {
    method: 'POST',
    body: JSON.stringify({})
  });
  
  if (!response.ok) {
    throw new Error('Transfer onaylanamadı');
  }
  
  return await response.json();
}

// Tüm transfer hareketlerini çek (list.vue için)
export async function fetchAllTransfers() {
  const API_URL_TRANSFER = `${API_BASE_URL}/api/v1/inventory/transfers`;
  const response = await secureApiCall(API_URL_TRANSFER);
  
  if (!response.ok) {
    throw new Error('Transfer hareketleri alınamadı');
  }
  
  const data = await response.json();
  // Hem eski hem yeni backend yapısı için esnek dönüş
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.data)) return data.data;
  return [];
}

// Stok item'ını güncelle (depo değişimi ve diğer alanlar için)
export async function updateStockWarehouse(stockItemId: string, data: { currentWarehouseId: string, isConsignment?: boolean, note?: string }) {
  const response = await secureApiCall(`${API_URL}/${stockItemId}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    throw new Error('Stok güncellenemedi');
  }
  
  return await response.json();
}

// Ürün listesini çek (sku, name, description, isSerialized vs.)
export async function fetchProducts() {
  const API_URL_PRODUCTS = `${API_BASE_URL}/api/v1/products`;
  const response = await secureApiCall(API_URL_PRODUCTS);
  
  if (!response.ok) {
    throw new Error('Ürünler alınamadı');
  }
  
  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

// Depo listesini çek (id ve name ile)
export async function fetchWarehouses() {
  const API_URL_WAREHOUSE = `${API_BASE_URL}/api/v1/warehouses`;
  const response = await secureApiCall(API_URL_WAREHOUSE);
  
  if (!response.ok) {
    throw new Error('Depolar alınamadı');
  }
  
  const data = await response.json();
  // Sadece id ve name döndür
  return Array.isArray(data)
    ? data.map((w: any) => ({ id: w.id, name: w.name }))
    : [];
}
const API_URL = `${API_BASE_URL}/api/v1/stock-items`;

// Tüm stok hareketlerini çek (status: DEPO olanlar için filtreleme componentte yapılabilir)
export async function fetchAllStocks() {
  const response = await secureApiCall(API_URL);
  
  if (!response.ok) {
    throw new Error('Stok hareketleri alınamadı');
  }
  
  return await response.json();
}

// Doğru transfer endpointi ve payload formatı ile stok transferi
export async function transferStock({
  sourceWarehouseId,
  targetWarehouseId,
  requestedBy,
  items
}: {
  sourceWarehouseId: string;
  targetWarehouseId: string;
  requestedBy: string;
  items: Array<{
    stockUnitId: string;
    quantity: number;
    notes?: string;
  }>;
}) {
  const API_URL_TRANSFER = `${API_BASE_URL}/api/v1/inventory/transfers`;
  const payload = {
    sourceWarehouseId,
    targetWarehouseId,
    requestedBy,
    items
  };
  
  const response = await secureApiCall(API_URL_TRANSFER, {
    method: 'POST',
    body: JSON.stringify(payload)
  });
  
  if (!response.ok) {
    throw new Error('Stok transferi yapılamadı');
  }
  
  return await response.json();
}

// Rol kontrolü fonksiyonları export et
export const inventoryHelpers = {
  hasRole,
  refreshCurrentUserInfo,
  
  // Belirli rollerin kontrolü için yardımcı fonksiyonlar
  isAdmin: () => hasRole('ADMIN'),
  isUser: () => hasRole('USER'),
  isManager: () => hasRole('MANAGER'),
  isInventoryManager: () => hasRole('INVENTORY_MANAGER'),
  isWarehouseKeeper: () => hasRole('WAREHOUSE_KEEPER')
};
