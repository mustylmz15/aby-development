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
import axios from 'axios';
// Transfer onayla (approvalToken ile)
export async function approveTransfer({ transferId, approvalToken }: { transferId: string; approvalToken: string }) {
  // Yeni endpoint: /api/v1/inventory/transfers/approve/<token>
  const API_URL_APPROVE = `${API_BASE_URL}/api/v1/inventory/transfers/approve/${approvalToken}`;
  const res = await axios.post(API_URL_APPROVE, {}, {
    headers: { Authorization: getAuthToken() }
  });
  return res.data;
}

// Tüm transfer hareketlerini çek (list.vue için)
export async function fetchAllTransfers() {
  const API_URL_TRANSFER = `${API_BASE_URL}/api/v1/inventory/transfers`;
  const res = await axios.get(API_URL_TRANSFER, {
    headers: { Authorization: getAuthToken() }
  });
  // Hem eski hem yeni backend yapısı için esnek dönüş
  if (Array.isArray(res.data)) return res.data;
  if (Array.isArray(res.data.data)) return res.data.data;
  return [];
}

// Stok item'ını güncelle (depo değişimi için)
// Stok item'ını güncelle (depo değişimi ve diğer alanlar için)
export async function updateStockWarehouse(stockItemId: string, data: { currentWarehouseId: string, isConsignment?: boolean, note?: string }) {
  const res = await axios.put(`${API_URL}/${stockItemId}`, data, {
    headers: { Authorization: getAuthToken() }
  });
  return res.data;
}
// Ürün listesini çek (sku, name, description, isSerialized vs.)
export async function fetchProducts() {
  const API_URL_PRODUCTS = `${API_BASE_URL}/api/v1/products`;
  const res = await axios.get(API_URL_PRODUCTS, {
    headers: { Authorization: getAuthToken() }
  });
  return Array.isArray(res.data) ? res.data : [];
}
// Depo listesini çek (id ve name ile)
export async function fetchWarehouses() {
  const API_URL_WAREHOUSE = `${API_BASE_URL}/api/v1/warehouses`;
  const res = await axios.get(API_URL_WAREHOUSE, {
    headers: { Authorization: getAuthToken() }
  });
  // Sadece id ve name döndür
  return Array.isArray(res.data)
    ? res.data.map((w: any) => ({ id: w.id, name: w.name }))
    : [];
}

// .env'den API base url'i al
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// localStorage'dan token'ı al
function getAuthToken() {
  const token = localStorage.getItem('token');
  return token ? `Bearer ${token}` : '';
}

const API_URL = `${API_BASE_URL}/api/v1/stock-items`;

// Tüm stok hareketlerini çek (status: DEPO olanlar için filtreleme componentte yapılabilir)
export async function fetchAllStocks() {
  const res = await axios.get(API_URL, {
    headers: { Authorization: getAuthToken() }
  });
  return res.data;
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
  const res = await axios.post(API_URL_TRANSFER, payload, {
    headers: { Authorization: getAuthToken() }
  });
  return res.data;
}
