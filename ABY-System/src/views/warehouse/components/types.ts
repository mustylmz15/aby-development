// Temel tipler ve enumlar

export type Warehouse = {
  id: string;
  name: string;
  code: string;
  warehouse_type?: string; // enum: MAIN, PROJECT, ...
  type: string; // enum label
  description?: string;
  address?: string;
  city?: string;
  country?: string;
  region?: string;
  is_active?: boolean; // Eski API için
  isActive?: boolean; // Yeni API için
  parent_id?: string | null;
  project_id?: string | null;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  status?: string; // Aktif/Pasif gibi
  projects?: Project[];
  assignments?: Assignment[];
  logs?: WarehouseLog[];
  capacity?: number | null;
  organizationId?: string;
};

export type Project = {
  id: string;
  name: string;
  description?: string;
  status?: string;
  start_date?: string;
  end_date?: string;
  created_at?: string;
  updated_at?: string;
};

export type Assignment = {
  id: string;
  user_id: string;
  warehouse_id: string;
  role: string;
  is_active: boolean;
  assigned_at?: string;
  warehouse?: Pick<Warehouse, 'id' | 'name'>;
};

export type WarehouseLog = {
  id: string;
  warehouse_id: string;
  message: string;
  created_at: string;
};

export type WarehouseTypeOption = {
  value: string;
  label: string;
};

export type StatusOption = {
  value: string;
  label: string;
};
