import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getWarehouses() {
  const token = localStorage.getItem('token');
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/warehouses`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (Array.isArray(res.data)) return res.data;
    return res.data?.data || [];
  } catch (e) {
    console.error('Depolar API hatası:', e);
    return [];
  }
}
