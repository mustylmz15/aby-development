import type { Repair, RepairListResponse, RepairStatus, UpdateRepairPartsRequest, RepairDetails } from './types';

// Base API URL - .env dosyasından al
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// Auth token'ı localStorage'dan al
function getAuthToken(): string {
  return localStorage.getItem('token') || '';
}

class RepairAPI {
  /**
   * Tek bir onarım detayını getirir
   */
  async getRepairById(repairId: string): Promise<RepairDetails> {
    try {
      const url = `${API_BASE}/api/v1/repairs/${repairId}`;
      const token = getAuthToken();
      
      console.log('🔧 Get Repair by ID Request:', {
        url,
        repairId,
        hasToken: !!token
      });

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
      });

      console.log('🔧 Get Repair by ID Response:', {
        status: response.status,
        ok: response.ok,
        statusText: response.statusText
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('🔧 Get Repair by ID Error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      console.log('🔧 Get Repair by ID Data:', data);
      
      return data;
    } catch (error) {
      console.error('Onarım detayı getirme hatası:', error);
      throw new Error('Onarım detayı getirilemedi');
    }
  }

  /**
   * Onarım listesini durum filtresine göre getirir
   */
  async getRepairsByStatus(status: RepairStatus): Promise<Repair[]> {
    try {
      const url = `${API_BASE}/api/v1/repairs?status=${status}`;
      const token = getAuthToken();
      
      console.log('🔧 Repair API Request:', {
        url,
        status,
        hasToken: !!token,
        tokenLength: token.length
      });

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
      });

      console.log('🔧 Repair API Response:', {
        status: response.status,
        ok: response.ok,
        statusText: response.statusText
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('🔧 Repair API Error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      console.log('🔧 Repair API Data:', {
        isArray: Array.isArray(data),
        length: Array.isArray(data) ? data.length : 'N/A',
        hasData: !!data.data,
        dataLength: data.data ? data.data.length : 'N/A'
      });
      
      // API response'un direkt array mi yoksa wrapped object mi olduğunu kontrol et
      const repairs = Array.isArray(data) ? data : data.data || [];
      console.log('🔧 Final Repairs:', repairs.length);
      
      return repairs;
    } catch (error) {
      console.error('🔧 Onarım listesi getirme hatası:', error);
      throw new Error('Onarım listesi getirilemedi');
    }
  }

  /**
   * Onarıma başlatma - statüyü DIAGNOSED'dan IN_PROGRESS'e çevirir
   */
  async startRepairs(repairIds: string[]): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE}/api/v1/repairs/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + getAuthToken(),
        },
        body: JSON.stringify({ repairIds }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return true;
    } catch (error) {
      console.error('Onarım başlatma hatası:', error);
      throw new Error('Onarım başlatılamadı');
    }
  }

  /**
   * Onarım detayını getirir (repairParts, actions, damageReasons dahil)
   * Yeni endpoint: /api/v1/repairs/{id}/details
   */
  async getRepairDetails(repairId: string): Promise<RepairDetails> {
    try {
      const response = await fetch(`${API_BASE}/api/v1/repairs/${repairId}/details`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + getAuthToken(),
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('🔧 Repair Details Error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      console.log('🔧 Repair Details Data:', data);
      return data;
    } catch (error) {
      console.error('Onarım detayı getirme hatası:', error);
      throw new Error('Onarım detayı getirilemedi');
    }
  }

  /**
   * Onarım parça bilgilerini günceller ve durumu REPAIRED yapar
   */
  async updateRepairParts(repairData: {
    repairId: string;
    removedParts: Array<{ componentProductId: string; serialNumber: string; }>;
    installedParts: Array<{ componentProductId: string; serialNumber: string; }>;
    damageReasonIds: string[];
    actions: string[];
    notes: string;
  }): Promise<boolean> {
    try {
      console.log('🔄 Sending repair parts update:', repairData);
      
      const response = await fetch(`${API_BASE}/api/v1/repairs/update-repair-parts`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + getAuthToken(),
        },
        body: JSON.stringify(repairData),
      });

      console.log('🔧 Update Repair Parts Response:', {
        status: response.status,
        ok: response.ok,
        statusText: response.statusText
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('🔧 Update Repair Parts Error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      console.log('✅ Repair parts updated successfully');
      return true;
    } catch (error) {
      console.error('Onarım parça güncelleme hatası:', error);
      throw new Error('Onarım parça bilgileri güncellenemedi');
    }
  }

  /**
   * Onarım notunu günceller
   */
  async updateRepairNotes(id: string, notes: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE}/api/v1/repairs/${id}/notes`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + getAuthToken(),
        },
        body: JSON.stringify({ notes }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return true;
    } catch (error) {
      console.error('Onarım notu güncelleme hatası:', error);
      throw new Error('Onarım notu güncellenemedi');
    }
  }

  /**
   * Hasar nedenlerini tipe göre getirir
   */
  async getDamageReasonsByType(type: 'HASAR' | 'NEDEN'): Promise<Array<{id: string, name: string}>> {
    try {
      const url = `${API_BASE}/api/v1/damage-reasons/by-type?type=${type}`;
      const token = getAuthToken();
      
      console.log('🔧 Damage Reasons API Request:', {
        url,
        type,
        hasToken: !!token
      });

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
      });

      console.log('🔧 Damage Reasons API Response:', {
        status: response.status,
        ok: response.ok,
        statusText: response.statusText
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('🔧 Damage Reasons API Error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      console.log('🔧 Damage Reasons API Data:', {
        isArray: Array.isArray(data),
        length: Array.isArray(data) ? data.length : 'N/A',
        hasData: !!data.data,
        dataLength: data.data ? data.data.length : 'N/A'
      });
      
      // API response'un direkt array mi yoksa wrapped object mi olduğunu kontrol et
      const damageReasons = Array.isArray(data) ? data : data.data || [];
      console.log('🔧 Final Damage Reasons:', damageReasons.length);
      
      return damageReasons;
    } catch (error) {
      console.error('🔧 Hasar nedenleri getirme hatası:', error);
      // Fallback data
      if (type === 'HASAR') {
        return [
          { id: 'HASAR001', name: 'Fiziksel Hasar' },
          { id: 'HASAR002', name: 'Su Hasarı' },
          { id: 'HASAR003', name: 'Elektriksel Arıza' }
        ];
      } else {
        return [
          { id: 'NEDEN001', name: 'Kullanıcı Hatası' },
          { id: 'NEDEN002', name: 'Üretim Hatası' },
          { id: 'NEDEN003', name: 'Normal Aşınma' }
        ];
      }
    }
  }

  /**
   * Onarımı günceller (genel güncelleme fonksiyonu)
   */
  async updateRepair(repairId: string, repairData: any): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE}/api/v1/repairs/${repairId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + getAuthToken(),
        },
        body: JSON.stringify(repairData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('🔧 Update Repair Error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      return true;
    } catch (error) {
      console.error('Onarım güncelleme hatası:', error);
      throw new Error('Onarım güncellenemedi');
    }
  }

  /**
   * Depo bilgisini ID ile getirir
   */
  async getWarehouseById(warehouseId: string): Promise<any> {
    try {
      const url = `${API_BASE}/api/v1/warehouses/${warehouseId}`;
      const token = getAuthToken();
      
      console.log('🏢 Get Warehouse by ID Request:', {
        url,
        warehouseId,
        hasToken: !!token
      });

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
      });

      console.log('🏢 Get Warehouse by ID Response:', {
        status: response.status,
        ok: response.ok,
        statusText: response.statusText
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('🏢 Get Warehouse by ID Error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      console.log('🏢 Get Warehouse by ID Data:', data);
      
      return data;
    } catch (error) {
      console.error('Depo bilgisi getirme hatası:', error);
      throw new Error('Depo bilgisi getirilemedi');
    }
  }

  /**
   * Onarılmış ürünü depoya geri gönderir
   */
  async returnToWarehouse(returnData: any): Promise<boolean> {
    try {
      console.log('🚚 Return to Warehouse Request:', returnData);
      
      // Endpoint: /api/v1/repairs/return-to-warehouse
      const response = await fetch(`${API_BASE}/api/v1/repairs/return-to-warehouse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + getAuthToken(),
        },
        body: JSON.stringify({
          repairId: returnData.repairId,
          kargoTakipNo: returnData.kargoTakipNo,
          aciklama: returnData.aciklama,
          onarimDeposuId: returnData.targetWarehouseId // currentWarehouseId
        }),
      });

      console.log('🚚 Return to Warehouse Response:', {
        status: response.status,
        ok: response.ok,
        statusText: response.statusText
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('🚚 Return to Warehouse Error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      return true;
    } catch (error) {
      console.error('Depoya geri gönderme hatası:', error);
      throw new Error('Ürün depoya geri gönderilemedi');
    }
  }
}

export const repairAPI = new RepairAPI();
