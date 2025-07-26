// Depo silme (DELETE)
export async function deleteWarehouse(id: string): Promise<void> {
  const token = localStorage.getItem('token');
  await axios.delete(`${API_URL}/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
}
// Depo güncelleme (PUT)
export async function updateWarehouse(id: string, data: any): Promise<Warehouse> {
  const token = localStorage.getItem('token');
  const payload = {
    id: id, // hem url'de hem body'de id gönder
    code: data.code,
    name: data.name,
    type: data.type,
    address: data.address,
    capacity: data.capacity,
    organizationId: data.organizationId,
    isActive: data.isActive,
    // Diğer gerekli alanlar eklenebilir
  };
  const res = await axios.put(`${API_URL}/${id}`, payload, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  return adaptWarehouse(res.data);
}
import axios from 'axios';
import type { Warehouse } from '../components/types';

// .env dosyasından API URL'si alınır
const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/warehouses`;

// API'dan gelen depo verisini frontend'e uygun hale getirir
function adaptWarehouse(apiWarehouse: any): Warehouse {
  return {
    id: apiWarehouse.id,
    code: apiWarehouse.code,
    name: apiWarehouse.name,
    warehouse_type: apiWarehouse.type, // enum
    type: apiWarehouse.type, // enum
    description: apiWarehouse.description ?? '',
    address: apiWarehouse.address ?? '',
    city: apiWarehouse.city ?? '',
    country: apiWarehouse.country ?? '',
    region: apiWarehouse.region ?? '',
    is_active: apiWarehouse.isActive ?? true,
    parent_id: apiWarehouse.parent_id ?? null,
    project_id: apiWarehouse.project_id ?? null,
    created_at: apiWarehouse.createdAt ?? '',
    updated_at: apiWarehouse.updatedAt ?? '',
    created_by: apiWarehouse.created_by ?? '',
    status: apiWarehouse.status ?? (apiWarehouse.isActive ? 'active' : 'inactive'),
    projects: apiWarehouse.projects ?? [],
    assignments: apiWarehouse.assignments ?? [],
    logs: apiWarehouse.logs ?? [],
  };
}

export async function getWarehouses(): Promise<Warehouse[]> {
  // Token localStorage'dan veya başka bir global state'den alınabilir
  const token = localStorage.getItem('token');
  const res = await axios.get(API_URL, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  return Array.isArray(res.data)
    ? res.data.map(adaptWarehouse)
    : [];
}

// Yeni depo ekleme fonksiyonu
export async function createWarehouse(data: any): Promise<Warehouse> {
  const token = localStorage.getItem('token');
  // Backend'in beklediği alanlara map et
  const payload = {
    code: data.code,
    name: data.name,
    type: data.type, // enum
    address: data.address,
    capacity: data.capacity,
    organizationId: data.organizationId,
    isActive: data.isActive,
    // Diğer gerekli alanlar eklenebilir
  };
  const res = await axios.post(API_URL, payload, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  return adaptWarehouse(res.data);
}
