// Projeleri listele (dropdown için)
export async function getProjects() {
  const token = localStorage.getItem('token');
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/projects`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // API doğrudan array dönerse
    if (Array.isArray(res.data)) return res.data;
    // API { data: [...] } dönerse
    return res.data?.data || [];
  } catch (e) {
    console.error('Projeler API hatası:', e);
    return [];
  }
}
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ADD_STOCK_URL = `${BASE_URL}/api/v1/inventory/warehouses/add-stock`;
const STOCK_ITEMS_URL = `${BASE_URL}/api/v1/stock-items`;

// Ürünleri listele (dropdown için)
export async function getProducts() {
  const token = localStorage.getItem('token');
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/products`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('API ÜRÜNLER:', res.data);
    // API doğrudan array dönerse
    if (Array.isArray(res.data)) return res.data;
    // API { data: [...] } dönerse
    return res.data?.data || [];
  } catch (e) {
    console.error('Ürünler API hatası:', e);
    return [];
  }
}


// CENTRAL depo ürünlerini listele
export async function getCentralStockItems() {
  const token = localStorage.getItem('token');
  const res = await axios.get(STOCK_ITEMS_URL, {
    headers: { Authorization: `Bearer ${token}` },
    params: { warehouseType: 'CENTRAL' },
  });
  return res.data || [];
}


// CENTRAL depo için ürün ekle
export async function addCentralStockItem(payload: any) {
  const token = localStorage.getItem('token');
  const res = await axios.post(ADD_STOCK_URL, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}
