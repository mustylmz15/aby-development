// Onarım Merkezi Types
export type RepairStatus = 'RECEIVED' | 'IN_PROGRESS' | 'DIAGNOSED' | 'REPAIRED' | 'REJECTED';

export type RepairPriority = 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';

export type PartType = 'REMOVED' | 'INSTALLED';

export interface Warehouse {
  id: string;
  name: string;
  code?: string;
  address?: string;
  type?: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  description?: string;
  category?: string;
  brand?: string;
  model?: string;
  isSerialized?: boolean;
  isSparePart?: boolean;
}

export interface Project {
  id: string;
  name: string;
  code: string;
}

export interface Item {
  id: string;
  serialNumber: string;
  productId: string;
  status: string;
  isConsignment: boolean;
  quantity: string;
  consignmentSerialNumber?: string;
  product?: Product;
  currentProject?: Project;
  currentProjectId?: string;
  currentWarehouse?: Warehouse;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

// Onarım Detayları için yeni Types
export interface RepairPart {
  id: string;
  repairId: string;
  productId: string;
  serialNumber: string;
  quantity: number;
  unit: string | null | undefined;
  notes: string | null | undefined;
  partType: PartType;
  createdAt: string;
  updatedAt: string;
  product: Product;
}

export interface DamageReason {
  id: string;
  type: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RepairDamageReason {
  id: string;
  repairId: string;
  damageReasonId: string;
  damageReason: DamageReason;
}

export interface RepairAction {
  id: string;
  repairId: string;
  action: string;
}

export interface DetailedWarehouse extends Warehouse {
  organizationId: string;
  capacity?: number | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DetailedUser extends User {
  email: string;
  password: string;
  avatar?: string | null;
  isActive: boolean;
  lastLogin?: string | null;
  createdAt: string;
  updatedAt: string;
  phone?: string;
}

export interface DetailedItem extends Item {
  currentWarehouse: Warehouse;
}

// Ana Repair Details Response Interface
export interface RepairDetails {
  id: string;
  repairNumber: string;
  itemId: string;
  warehouseId: string;
  status: RepairStatus;
  priority: RepairPriority;
  reportedIssue: string;
  diagnosis: string | null;
  notes: string | null;
  laborHours: number | null;
  cost: number | null;
  reportedBy: string;
  assignedTo: string | null;
  completedBy: string | null;
  receivedAt: string;
  startedAt: string | null;
  completedAt: string | null;
  returnedAt: string | null;
  createdAt: string;
  updatedAt: string;
  callReference: string | null;
  warehouse: DetailedWarehouse;
  reportedByUser: DetailedUser;
  item: DetailedItem;
  repairParts: RepairPart[];
  repairDamageReasons: RepairDamageReason[];
  repairActions: RepairAction[];
}

// Mevcut Onarım Bilgisi
export interface Repair {
  id: string;
  repairNumber: string;
  itemId: string;
  warehouseId: string;
  currentWarehouseId?: string; // Orijinal depo ID'si (geri gönderilecek)
  status: RepairStatus;
  priority: RepairPriority;
  reportedIssue: string;
  diagnosis: string;
  notes: string | null;
  laborHours: number | null;
  cost: number | null;
  reportedBy: string;
  assignedTo: string | null;
  completedBy: string | null;
  receivedAt: string;
  startedAt: string | null;
  completedAt: string | null;
  returnedAt: string | null;
  createdAt: string;
  updatedAt: string;
  callReference: string;
  transportType: string | null;
  warehouse: Warehouse;
  item: Item;
  reportedByUser: User;
  currentWarehouse: Warehouse;
  repairWarehouse: Warehouse;
}

// Onarım İşlem Verisi (Frontend State)
export interface ComponentPart {
  componentProductId: string;
  serialNumber: string;
}

export type DamageReasonEntry = { damageId: string; reasonId: string };
export interface RepairWorkData {
  repairId: string;
  removedParts: ComponentPart[];
  installedParts: ComponentPart[];
  damageReasonIds?: string[]; // eski uyumluluk için
  damageReasons?: DamageReasonEntry[];
  actions: string[];
  notes: string;
}

// API Request/Response Types
export interface RepairListResponse {
  data: Repair[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface UpdateRepairPartsRequest {
  repairId: string;
  removedParts: ComponentPart[];
  installedParts: ComponentPart[];
  damageReasonIds: string[];
  actions: string[];
  notes: string;
}

// Component Props & Emits
export interface TabChangeEvent {
  tabKey: string;
  status: RepairStatus;
}

export interface RepairSelectionEvent {
  selectedRepairs: Repair[];
  action: 'start' | 'complete' | 'view';
}

// Filter Types
export interface RepairFilters {
  search: string;
  warehouse: string;
  priority: RepairPriority | '';
  project: string;
  dateRange: {
    start: string;
    end: string;
  };
}

// Pagination
export interface PaginationOptions {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

// Raw API Response Types (moved from fault.ts)
export interface RawFaultDetail {
    id: string;
    repairNumber: string;
    itemId: string;
    warehouseId: string;
    status: string;
    priority: string;
    reportedIssue: string;
    callReference: string;
    diagnosis: string | null;
    actionsTaken: string | null;
    partsUsed: any[];
    laborHours: number | null;
    cost: number | null;
    reportedBy: string;
    assignedTo: string | null;
    completedBy: string | null;
    receivedAt: string;
    startedAt: string | null;
    completedAt: string | null;
    returnedAt: string | null;
    createdAt: string;
    updatedAt: string;
    transportType: string | null;
    approveToken: string | null;
    approveExpiresAt: string | null;
    warehouse: {
        id: string;
        name: string;
    };
    item: {
        id: string;
        serialNumber: string;
        product: {
            id: string;
            name: string;
            sku: string;
        };
        currentProject: {
            id: string;
            name: string;
            code: string;
        };
    };
    reportedByUser: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
    };
}

// Mapped Card Data Types (moved from fault.ts)
export interface GeneralInfoCard {
    repairNumber: string;
    status: string;
    priority: string;
    callReference: string;
    createdAt: string;
    receivedAt: string;
}

export interface ProductInfoCard {
    productName: string;
    sku: string;
    serialNumber: string;
    projectName: string;
    projectCode: string;
    warehouseName: string;
}

export interface IssueCard {
    reportedIssue: string;
    diagnosis: string | null;
    actionsTaken: string | null;
}

export interface PersonnelCard {
    reportedBy: {
        fullName: string;
        email: string;
    };
    assignedTo: string | null;
    completedBy: string | null;
}

export interface TimelineCard {
    receivedAt: string;
    startedAt: string | null;
    completedAt: string | null;
    returnedAt: string | null;
}

export interface CostCard {
    partsUsed: any[];
    laborHours: number | null;
    cost: number | null;
}

export interface FaultDetailCards {
    generalInfo: GeneralInfoCard;
    productInfo: ProductInfoCard;
    issue: IssueCard;
    personnel: PersonnelCard;
    timeline: TimelineCard;
    cost: CostCard;
}

// Geri Gönderme İşlemi Types
export interface ReturnToWarehouseRequest {
  repairId: string;
  kargoTakipNo?: string;
  aciklama?: string;
  targetWarehouseId?: string; // currentWarehouseId (API'de onarimDeposuId olarak gönderilir)
}

export interface ReturnToWarehouseResponse {
  success: boolean;
  repairId: string;
  newStatus: RepairStatus;
  message: string;
}
