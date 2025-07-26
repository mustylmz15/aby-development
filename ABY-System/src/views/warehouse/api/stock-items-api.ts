import axios from 'axios';

export interface StockItem {
  id: string;
  warehouseId: string;
  productId: string;
  productName: string;
  productCode: string;
  category: string;
  brand?: string;
  quantity: number;
  unit: string;
  unitPrice?: number;
  status: string;
  condition?: string;
  serialNumber?: string;
  location?: string;
  lastUpdated: string;
}

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/stock-items`;

export async function getStockItemsByWarehouse(warehouseId: string): Promise<StockItem[]> {
  const token = localStorage.getItem('token');
  const res = await axios.get(API_URL + `?warehouseId=${warehouseId}` , {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  // API'dan dönen veri doğrudan uygun ise, gerekirse burada map/transform yapılabilir
  return Array.isArray(res.data) ? res.data : [];
}
