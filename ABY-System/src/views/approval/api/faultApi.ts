import axios from 'axios';

// Fault API - Sadece arızalı ürün onayları için
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

function getAuthToken() {
  const token = localStorage.getItem('token');
  return token ? `Bearer ${token}` : '';
}

// Arızalı ürün onaylarını listele
export async function getFaultApprovals() {
  try {
    const API_URL = `${API_BASE_URL}/api/v1/inventory/transfers/approvals?status=pending`;
    const res = await axios.get(API_URL, {
      headers: { Authorization: getAuthToken() }
    });
    
    let allTransfers: any[] = [];
    if (Array.isArray(res.data)) {
      allTransfers = res.data;
    } else if (Array.isArray(res.data.data)) {
      allTransfers = res.data.data;
    }
    
    // Sadece targetWarehouse.type === 'REPAIR' olan transferleri filtrele
    const faultTransfers = allTransfers.filter(transfer => 
      transfer.targetWarehouse && transfer.targetWarehouse.type === 'REPAIR'
    );
    
    return faultTransfers;
  } catch (error) {
    console.error('Arızalı ürün onayları yüklenirken hata:', error);
    throw error;
  }
}

// Arızalı ürün onayla
export async function approveFault(repairId: string, approvalToken?: string) {
  try {
    const API_URL_APPROVE = `${API_BASE_URL}/api/v1/repairs/${repairId}/approve-repair?token=${approvalToken || ''}`;
    const res = await axios.patch(API_URL_APPROVE, {}, {
      headers: { Authorization: getAuthToken() }
    });
    return res.data;
  } catch (error) {
    console.error('Arızalı ürün onaylama hatası:', error);
    throw error;
  }
}

// Arızalı ürün reddet
export async function rejectFault(repairId: string) {
  try {
    const API_URL_REJECT = `${API_BASE_URL}/api/v1/repairs/${repairId}/reject`;
    const res = await axios.patch(API_URL_REJECT, {}, {
      headers: { Authorization: getAuthToken() }
    });
    return res.data;
  } catch (error) {
    console.error('Arızalı ürün reddetme hatası:', error);
    throw error;
  }
}

// Fault API nesnesi
export const faultApi = {
  getApprovals: getFaultApprovals,
  approve: approveFault,
  reject: rejectFault
};
