// Her resourceType için API endpoint eşlemesi
export const RESOURCE_API_MAP: Record<string, string> = {
  PROJECT: `${import.meta.env.VITE_API_BASE_URL}/api/v1/projects`,
  WAREHOUSE: `${import.meta.env.VITE_API_BASE_URL}/api/v1/warehouses`,
  // Diğer resourceType'lar eklenebilir
};
