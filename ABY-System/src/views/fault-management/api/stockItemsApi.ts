import axios from 'axios';
import type { RawFaultDetail, FaultDetailCards } from './fault';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

function getAuthHeaders() {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
}

// Mapping fonksiyonu - Raw veriyi kart formatına çevirir
function mapFaultDetailToCards(rawData: RawFaultDetail): FaultDetailCards {
    return {
        generalInfo: {
            id: rawData.id,
            repairNumber: rawData.repairNumber,
            status: rawData.status,
            priority: rawData.priority,
            callReference: rawData.callReference,
            createdAt: rawData.createdAt,
            receivedAt: rawData.receivedAt,
            reportedBy: rawData.reportedBy,
            assignedTo: rawData.assignedTo || undefined,
            startedAt: rawData.startedAt || undefined,
            completedAt: rawData.completedAt || undefined,
        },
        productInfo: {
            itemId: rawData.item.id,
            productName: rawData.item.product.name,
            productSku: rawData.item.product.sku,
            serialNumber: rawData.item.serialNumber,
            projectName: rawData.item.currentProject.name,
            projectCode: rawData.item.currentProject.code,
            warehouseName: rawData.warehouse.name,
        },
        issue: {
            reportedIssue: rawData.reportedIssue,
            diagnosis: rawData.diagnosis || undefined,
            actionsTaken: rawData.actionsTaken || undefined,
            callReference: rawData.callReference,
        },
        personnel: {
            reportedBy: {
                name: `${rawData.reportedByUser.firstName} ${rawData.reportedByUser.lastName}`,
                email: rawData.reportedByUser.email,
            },
            assignedTo: rawData.assignedTo ? {
                name: rawData.assignedTo,
                email: '', // API'de email bilgisi yok, boş string
            } : undefined,
            completedBy: rawData.completedBy ? {
                name: rawData.completedBy,
                email: '', // API'de email bilgisi yok, boş string
            } : undefined,
        },
        timeline: {
            receivedAt: rawData.receivedAt,
            startedAt: rawData.startedAt || undefined,
            completedAt: rawData.completedAt || undefined,
            returnedAt: rawData.returnedAt || undefined,
        },
        cost: {
            partsUsed: rawData.partsUsed || [],
            laborHours: rawData.laborHours || undefined,
            cost: rawData.cost || undefined,
        },
    };
}

// Repairs tablosundan repairId ile veri çeker ve mapping yapar
export async function fetchRepairById(repairId: string): Promise<FaultDetailCards> {
    const response = await axios.get(`${API_BASE_URL}/api/v1/repairs/${repairId}`, {
        headers: getAuthHeaders(),
    });
    return mapFaultDetailToCards(response.data);
}

export async function fetchStockItems(params = {}) {
    const response = await axios.get(`${API_BASE_URL}/api/v1/stock-items`, {
        headers: getAuthHeaders(),
        params,
    });
    return response.data;
}

export async function fetchStockItemById(id: string) {
    const response = await axios.get(`${API_BASE_URL}/api/v1/stock-items/${id}`, {
        headers: getAuthHeaders(),
    });
    return response.data;
}


// Projeleri çek
export async function fetchProjects(params = {}) {
    const response = await axios.get(`${API_BASE_URL}/api/v1/projects`, {
        headers: getAuthHeaders(),
        params,
    });
    return response.data;
}

// Ürünleri çek
export async function fetchProducts(params = {}) {
    const response = await axios.get(`${API_BASE_URL}/api/v1/products`, {
        headers: getAuthHeaders(),
        params,
    });
    return response.data;
}

// Depoları çek
export async function fetchWarehouses(params = {}) {
    const response = await axios.get(`${API_BASE_URL}/api/v1/warehouses`, {
        headers: getAuthHeaders(),
        params,
    });
    return response.data;
}
