# Ürün API Modeli ve Muhtemel Endpointler

## Ürün Modeli (api/v1/products)
```json
{
  "id": "67e4bb61-2720-4569-bb85-166ad59760a8",
  "parentId": null,
  "sku": "PRD-001",
  "name": "Ana Ürün",
  "description": "Demo ana ürün",
  "category": "Elektronik",
  "brand": "DemoMarka",
  "model": "X100",
  "isSerialized": true,
  "isConsumable": false,
  "unitOfMeasure": "PIECE",
  "minimumStock": 1,
  "specifications": {},
  "isActive": true,
  "createdAt": "...",
  "updatedAt": "..."
}
```

### Alanlar
- **id**: Ürün UUID
- **parentId**: (varsa) üst ürün
- **sku**: Stok kodu
- **name**: Ürün adı
- **description**: Açıklama
- **category**: Kategori adı
- **brand**: Marka
- **model**: Model
- **isSerialized**: Seri numaralı mı (true/false)
- **isConsumable**: Tüketilebilir mi (true/false)
- **unitOfMeasure**: Birim (ör: PIECE)
- **minimumStock**: Minimum stok seviyesi
- **specifications**: Özellikler (object)
- **isActive**: Aktif mi
- **createdAt, updatedAt**: Tarihler

---

## Muhtemel Endpointler

### Listeleme
- `GET /api/v1/products` : Tüm ürünleri listeler

### Detay
- `GET /api/v1/products/{id}` : Tekil ürün detayı

### Ekleme
- `POST /api/v1/products`
  - Body: Yukarıdaki modeldeki alanlar (id hariç, backend üretir)

### Güncelleme
- `PUT /api/v1/products/{id}`
  - Body: Güncellenecek alanlar

### Silme
- `DELETE /api/v1/products/{id}`

### Aktif/Pasif Yapma
- `PATCH /api/v1/products/{id}/activate`
- `PATCH /api/v1/products/{id}/deactivate`

### Toplu Silme
- `DELETE /api/v1/products` (body: { ids: [...] })

### Arama/Filtreleme
- `GET /api/v1/products?category=Elektronik&isActive=true`

---

Bu dosya, ürün işlemleri için model ve endpoint referansı olarak kullanılabilir.
