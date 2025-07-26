import axios from 'axios';

// Transfer API - Sadece normal depo transferleri için
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

function getAuthToken() {
  const token = localStorage.getItem('token');
  return token ? `Bearer ${token}` : '';
}

// Transfer onaylarını listele
export async function getTransferApprovals() {
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
    
    // Sadece normal transferleri filtrele (REPAIR olmayan)
    const normalTransfers = allTransfers.filter(item => 
      !item.transferType?.includes('REPAIR') &&
      !(item.sourceWarehouse && item.sourceWarehouse.type === 'REPAIR') &&
      !(item.targetWarehouse && item.targetWarehouse.type === 'REPAIR') &&
      item.type !== 'REPAIR' && item.type !== 'REPAIR_RETURN'
    );
    
    return normalTransfers;
  } catch (error) {
    console.error('Transfer onayları yüklenirken hata:', error);
    throw error;
  }
}

// Transfer onayla
export async function approveTransfer(transferId: string, approvalToken?: string) {
  try {
    const API_URL_APPROVE = `${API_BASE_URL}/api/v1/inventory/transfers/approve/${approvalToken || transferId}`;
    const res = await axios.post(API_URL_APPROVE, {}, {
      headers: { Authorization: getAuthToken() }
    });
    return res.data;
  } catch (error) {
    console.error('Transfer onaylama hatası:', error);
    throw error;
  }
}

// Transfer reddet
export async function rejectTransfer(transferId: string) {
  try {
    const API_URL_REJECT = `${API_BASE_URL}/api/v1/transfers/${transferId}/reject`;
    const res = await axios.get(API_URL_REJECT, {
      headers: { Authorization: getAuthToken() }
    });
    return res.data;
  } catch (error) {
    console.error('Transfer reddetme hatası:', error);
    throw error;
  }
}

// Transfer API nesnesi
export const transferApi = {
  getApprovals: getTransferApprovals,
  approve: approveTransfer,
  reject: rejectTransfer
};
