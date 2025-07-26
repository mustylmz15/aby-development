// Raw API Response Types
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

// Part interface for CostCard
export interface Part {
    name?: string;
    code?: string;
    quantity?: number;
    cost?: number;
}

// CostCard interface for components
export interface CostCard {
    laborHours?: number;
    cost?: number;
    partsUsed: Part[];
}

// General Info Card interface
export interface GeneralInfoCard {
    id: string;
    repairNumber: string;
    status: string;
    priority: string;
    receivedAt: string;
    startedAt?: string;
    completedAt?: string;
    reportedBy: string;
    assignedTo?: string;
    callReference?: string;
    createdAt: string;
}

// Product Info Card interface
export interface ProductInfoCard {
    itemId: string;
    serialNumber: string;
    productName: string;
    productSku: string;
    projectName: string;
    projectCode: string;
    warehouseName: string;
}

// Issue Card interface
export interface IssueCard {
    reportedIssue: string;
    diagnosis?: string;
    actionsTaken?: string;
    callReference?: string;
}

// Personnel Card interface
export interface PersonnelCard {
    reportedBy: {
        name: string;
        email: string;
    };
    assignedTo?: {
        name: string;
        email: string;
    };
    completedBy?: {
        name: string;
        email: string;
    };
}

// Timeline Card interface
export interface TimelineCard {
    receivedAt: string;
    startedAt?: string;
    completedAt?: string;
    returnedAt?: string;
}

// Fault Detail Cards interface (combines all card data)
export interface FaultDetailCards {
    generalInfo: GeneralInfoCard;
    productInfo: ProductInfoCard;
    issue: IssueCard;
    personnel: PersonnelCard;
    timeline: TimelineCard;
    cost: CostCard;
}


