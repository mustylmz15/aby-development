export interface DashboardStats {
  totalStock: number
  criticalItems: number
  todayMovements: number
  activeWarehouses: number
}

export interface CategoryStock {
  name: string
  count: number
  color: string
}

export interface CriticalAlert {
  product: string
  warehouse: string
  current: number
  minimum: number
  level: string
}

export interface RecentMovement {
  id: string
  type: string
  product: string
  warehouse: string
  sourceWarehouse?: string
  targetWarehouse?: string
  time: string
  amount: number
}

export interface ProjectStockDistribution {
  name: string
  value: number
  color: string
}

export interface ProductCategoryDistribution {
  name: string
  value: number
  color: string
}

export interface WarehouseStatus {
  name: string
  value: number
  color: string
}

export interface MostMovedProduct {
  name: string
  count: number
  badge: string
}

export interface MostFaultyProduct {
  name: string
  count: number
  badge: string
}

export interface DashboardResponse {
  stats: DashboardStats
  categoryStocks: CategoryStock[]
  criticalAlerts: CriticalAlert[]
  recentMovements: RecentMovement[]
  projectStockDistribution: ProjectStockDistribution[]
  productCategoryDistribution: ProductCategoryDistribution[]
  warehouseStatus: WarehouseStatus[]
  mostMovedProducts: MostMovedProduct[]
  mostFaultyProducts: MostFaultyProduct[]
}

export const fetchDashboardData = async (params?: { role?: string, warehouseId?: string }): Promise<DashboardResponse> => {
  try {
    // Token kontrolü - token yoksa hata fırlat
    const authToken = getAuthToken();
    if (!authToken || authToken === 'Bearer ') {
      throw new Error('Authentication token not found. Please login again.');
    }

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
    let API_URL = `${API_BASE_URL}/api/v1/dashboard/summary`;
    // Parametreleri query string olarak ekle
    if (params && (params.role || params.warehouseId)) {
      const query = new URLSearchParams();
      if (params.role) query.append('role', params.role);
      if (params.warehouseId) query.append('warehouseId', params.warehouseId);
      API_URL += `?${query.toString()}`;
    }

    const response = await fetch(API_URL, {
      headers: {
        'Authorization': authToken,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const responseText = await response.text();
      throw new Error(`Invalid response format. Expected JSON, got: ${contentType}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}

// Authentication token'ı localStorage'dan al
function getAuthToken(): string {
  const token = localStorage.getItem('token');
  const authHeader = token ? `Bearer ${token}` : '';
  return authHeader;
}
