import axios from 'axios';

// Repair API - Sadece onarımdan depoya gönderme onayları için
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

function getAuthToken() {
  const token = localStorage.getItem('token');
  return token ? `Bearer ${token}` : '';
}

// Onarımdan depoya gönderme onaylarını listele
export async function getRepairApprovals() {
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
    
    // Sadece REPAIR_RETURN transferlerini filtrele
    const repairReturns = allTransfers.filter(transfer => 
      transfer.transferType === 'REPAIR_RETURN' || 
      transfer.type === 'REPAIR_RETURN' ||
      (transfer.sourceWarehouse && transfer.sourceWarehouse.type === 'REPAIR')
    );
    
    return repairReturns;
  } catch (error) {
    console.error('Onarımdan depoya gönderme onayları yüklenirken hata:', error);
    throw error;
  }
}

// Onarımdan depoya gönderme onayla
export async function approveRepair(repairId: string, approvalToken?: string) {
  try {
    const API_URL_APPROVE = `${API_BASE_URL}/api/v1/repairs/${repairId}/approve-return?token=${approvalToken || ''}`;
    const res = await axios.patch(API_URL_APPROVE, {}, {
      headers: { Authorization: getAuthToken() }
    });
    return res.data;
  } catch (error) {
    console.error('Onarım onaylama hatası:', error);
    throw error;
  }
}

// Onarımdan depoya gönderme reddet
export async function rejectRepair(repairId: string) {
  try {
    const API_URL_REJECT = `${API_BASE_URL}/api/v1/repairs/${repairId}/reject`;
    const res = await axios.post(API_URL_REJECT, {}, {
      headers: { Authorization: getAuthToken() }
    });
    return res.data;
  } catch (error) {
    console.error('Onarım reddetme hatası:', error);
    throw error;
  }
}

// Repair API nesnesi
export const repairApi = {
  getApprovals: getRepairApprovals,
  approve: approveRepair,
  reject: rejectRepair
};
