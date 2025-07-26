# RAPOR SİSTEMİ BACKEND ENDPOINT SPESİFİKASYONU

## Ana Endpoint (TEK ENDPOINT YAKLAŞIMI)
```
BASE_URL: /api/v1/reports
```

## 1. Tek Ana Endpoint - Tüm Rapor İşlemleri
```http
GET /api/v1/reports
```

### Query Parametreleri:
- `action` (required): "list" | "stats" | "detail" | "dashboard"
- `id` (optional): rapor ID'si (detail için gerekli)
- `category` (optional): "transfer" | "repair" | "inventory" | "performance"
- `status` (optional): "aktif" | "tamamlandi" | "beklemede"
- `dateRange` (optional): "today" | "week" | "month" | "quarter" | "year"
- `search` (optional): string (rapor adı veya açıklamada arama)
- `page` (optional): number (sayfa numarası, default: 1)
- `limit` (optional): number (sayfa başına kayıt, default: 20)

### Kullanım Örnekleri:
```
GET /api/v1/reports?action=dashboard
GET /api/v1/reports?action=list&category=transfer&status=aktif
GET /api/v1/reports?action=stats
GET /api/v1/reports?action=detail&id=123
```

## Response Formatı (action bazlı):

### Dashboard Verileri (action=dashboard):
```json
{
  "action": "dashboard",
  "data": {
    "stats": {
      "transfers": {
        "total": 1547,
        "thisMonth": 234,
        "trend": 12.5
      },
      "repairs": {
        "total": 892,
        "completed": 756,
        "successRate": 84.7
      },
      "inventory": {
        "totalProducts": 15420,
        "lowStock": 67,
        "warehouses": 12
      }
    },
    "recentReports": [
      {
        "id": "string",
        "name": "string",
        "category": "transfer",
        "status": "aktif",
        "lastUpdated": "2024-12-15T10:30:00Z"
      }
    ]
  }
}
```

### Rapor Listesi (action=list):
```json
{
  "action": "list",
  "data": {
    "reports": [
      {
        "id": "string",
        "name": "string",
        "category": "transfer|repair|inventory|performance",
        "description": "string",
        "date": "2024-12-15",
        "status": "aktif|tamamlandi|beklemede",
        "recordCount": 1250,
        "lastUpdated": "2024-12-15T10:30:00Z",
        "createdBy": "string",
        "parameters": {}
      }
    ],
    "pagination": {
      "total": 150,
      "page": 1,
      "limit": 20,
      "totalPages": 8
    }
  }
}
```

### Sadece İstatistikler (action=stats):
```json
{
  "action": "stats",
  "data": {
    "transfers": {
      "total": 1547,
      "thisMonth": 234,
      "trend": 12.5
    },
    "repairs": {
      "total": 892,
      "completed": 756,
      "successRate": 84.7
    },
    "inventory": {
      "totalProducts": 15420,
      "lowStock": 67,
      "warehouses": 12
    }
  }
}
```

### Rapor Detayı (action=detail&id=123):
```json
{
  "action": "detail",
  "data": {
    "report": {
      "id": "123",
      "name": "Aylık Transfer Raporu",
      "category": "transfer",
      "description": "Depolar arası ürün transfer hareketleri",
      "status": "aktif",
      "lastUpdated": "2024-12-15T10:30:00Z"
    },
    "content": {
      // Transfer Raporu için:
      "transfer": {
        "totalTransfers": 234,
        "completedTransfers": 189,
        "pendingTransfers": 45,
        "recentTransfers": [
          {
            "id": "string",
            "product": "Laptop Dell XPS 13",
            "fromWarehouse": "Merkez Depo",
            "toWarehouse": "Şube A",
            "quantity": 5,
            "status": "completed|pending",
            "date": "2024-12-14"
          }
        ]
      },
      // Onarım Raporu için:
      "repair": {
        "totalRepairs": 156,
        "inProgress": 23,
        "completed": 98,
        "returned": 87,
        "lifecycles": [
          {
            "id": "string",
            "product": "MacBook Pro 14\"",
            "serialNumber": "MBP-2024-001",
            "faultType": "Ekran Arızası",
            "currentStage": "Test Aşaması",
            "progress": 75,
            "stages": [
              {
                "name": "Arıza Bildirimi",
                "completed": true,
                "active": false,
                "date": "2024-12-10"
              }
            ]
          }
        ]
      },
      // Envanter Raporu için:
      "inventory": {
        "totalProducts": 15420,
        "criticalStock": 67,
        "inStock": 14893,
        "criticalItems": [
          {
            "id": "string",
            "name": "USB-C Kablo",
            "category": "Aksesuar",
            "currentStock": 5,
            "minStock": 50,
            "warehouse": "Merkez Depo"
          }
        ]
      },
      // Performans Raporu için:
      "performance": {
        "efficiency": 87.5,
        "avgProcessTime": 2.3,
        "throughput": 1250,
        "errorRate": 3.2,
        "warehouses": [
          {
            "id": "string",
            "name": "Merkez Depo",
            "efficiency": 92,
            "processed": 1850,
            "pending": 45
          }
        ]
      }
    }
  }
}
```
**Not:** content içinde sadece rapor kategorisine ait bölüm dolu gelir, diğerleri null veya gelmez.

## 2. CRUD İşlemleri (POST/PUT/DELETE)

### Yeni Rapor Oluşturma
```http
POST /api/v1/reports
```
**Request Body:**
```json
{
  "name": "string",
  "category": "transfer|repair|inventory|performance",
  "description": "string",
  "parameters": {
    "dateRange": "string",
    "warehouseIds": ["string"],
    "categoryFilters": ["string"]
  }
}
```

### Rapor Güncelleme
```http
PUT /api/v1/reports/{id}
```
**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "parameters": {}
}
```

### Rapor Silme
```http
DELETE /api/v1/reports/{id}
```

## 3. Özel İşlemler

### Rapor Dışa Aktarma
```http
GET /api/v1/reports/{id}/export?format=excel|pdf|csv
```
**Response:** File download

### Çoklu Dışa Aktarma
```http
POST /api/v1/reports/export
```
**Request Body:**
```json
{
  "reportIds": ["string"],
  "format": "excel|pdf|csv"
}
```

### Rapor Yenileme
```http
POST /api/v1/reports/{id}/refresh
```

### Tüm Raporları Yenileme
```http
POST /api/v1/reports/refresh-all
```

## Frontend Kullanım Örnekleri:

```javascript
// 1. Dashboard verileri
GET /api/v1/reports?action=dashboard

// 2. Rapor listesi (filtresiz)
GET /api/v1/reports?action=list

// 3. Transfer raporları listesi
GET /api/v1/reports?action=list&category=transfer&status=aktif

// 4. Sadece istatistikler
GET /api/v1/reports?action=stats

// 5. Belirli rapor detayı
GET /api/v1/reports?action=detail&id=123

// 6. Sayfalama ile liste
GET /api/v1/reports?action=list&page=2&limit=10

// 7. Arama ile liste
GET /api/v1/reports?action=list&search=transfer&category=repair
```

## Avantajları:
✅ Tek endpoint - kolay yönetim  
✅ Tek response formatı  
✅ Frontend'de tek API function  
✅ Cache'leme kolaylığı  
✅ Performans optimizasyonu  

## Authentication:
Tüm istekler için:
```
Authorization: Bearer {token}
```

## Error Response Formatı:
```json
{
  "success": false,
  "error": {
    "code": "REPORT_NOT_FOUND",
    "message": "Rapor bulunamadı",
    "action": "detail"
  }
}
```

## Veritabanı İlişkileri:
- **reports** tablosu (ana tablo)
- **users** tablosu (createdBy)  
- **warehouses** tablosu (filtreler)
- **products**, **transfers**, **repairs**, **inventory** tabloları (içerik)
