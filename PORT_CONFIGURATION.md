# ABY Proje Port Konfigürasyon Rehberi

## 📋 Port Dağılım Planı

ABY proje koleksiyonu 4 ayrı Vue.js uygulamasından oluşmaktadır. Her uygulama farklı bir portta çalışacak şekilde yapılandırılmıştır.

### 🏗️ Sistem Mimarisi

```
ABY Portal (5173) [Ana Giriş]
    ├── ABY-System (5174) [Envanter]
    ├── ABY-ProjectManagement (5175) [Proje Takip]
    └── ABY-Harita (5176) [CBS/GIS]
```

## 🔧 Port Konfigürasyonları

### 1. ABY-Portal (Port: 5173)
- **Dosya**: `ABY-Portal/vite.config.ts`
- **Rol**: Ana giriş portalı ve yönlendirme merkezi
- **Özellikler**:
  - Kullanıcı kartları ile sistem seçimi
  - Diğer sistemlere otomatik yönlendirme
  - Responsive tasarım
  - Modern animasyonlar

```typescript
server: {
  port: 5173,
  host: true
}
```

### 2. ABY-System (Port: 5174)
- **Dosya**: `ABY-System/vite.config.ts`
- **Rol**: Envanter yönetimi ve ana sistem işlevleri
- **Özellikler**:
  - Kullanıcı authentication
  - Envanter takibi
  - Sistem yönetimi
  - Dashboard ve raporlama

```typescript
server: {
  port: 5174,
  host: true
}
```

### 3. ABY-ProjectManagement (Port: 5175)
- **Dosya**: `ABY-ProjectManagement/vite.config.ts`
- **Rol**: Proje yönetimi ve takip sistemi
- **Özellikler**:
  - Proje durumu takibi
  - Bütçe yönetimi
  - Excel entegrasyonu
  - Bildirim sistemi
  - Görev yönetimi

```typescript
server: {
  port: 5175,
  host: true
}
```

### 4. ABY-Harita (Port: 5176)
- **Dosya**: `ABY-Harita/harita-vue-app/vite.config.js`
- **Rol**: Coğrafi Bilgi Sistemi (CBS/GIS)
- **Özellikler**:
  - Harita görünümleri
  - Konumsal veri analizi
  - Geographical Information System
  - Vue 3 + Composition API

```javascript
server: {
  port: 5176,
  host: true
}
```

## 🔗 Sistem Entegrasyonu

### URL Yönlendirmeleri (ABY-Portal'dan)

```typescript
// ABY-Portal/src/views/AnaGiris.vue
const abySystemUrl = 'http://localhost:5174'
const abyProjectManagementUrl = 'http://localhost:5175'
const abyHaritaUrl = 'http://localhost:5176'
```

### Yönlendirme Mantığı

1. **Envanter Yönetimi Kartı** → `window.location.href = ${abySystemUrl}/auth/boxed-signin`
2. **Proje Takip Kartı** → `window.location.href = abyProjectManagementUrl`
3. **ELD Harita Kartı** → `window.location.href = abyHaritaUrl`

## 🛠️ Geliştirme Ortamı Kurulumu

### Sıralı Başlatma (Önerilen)

```bash
# 1. Ana Portal'ı başlat
cd ABY-Portal && npm run dev &

# 2. System'i başlat 
cd ABY-System && npm run dev &

# 3. ProjectManagement'ı başlat
cd ABY-ProjectManagement && npm run dev &

# 4. Harita'yı başlat
cd ABY-Harita/harita-vue-app && npm run dev &
```

### Paralel Başlatma (Script ile)

`start-all.bat` dosyası oluşturabilirsiniz:

```batch
@echo off
start "ABY-Portal" cmd /c "cd ABY-Portal && npm run dev"
start "ABY-System" cmd /c "cd ABY-System && npm run dev"  
start "ABY-ProjectManagement" cmd /c "cd ABY-ProjectManagement && npm run dev"
start "ABY-Harita" cmd /c "cd ABY-Harita/harita-vue-app && npm run dev"
```

## 🌍 Production Deployment

### Environment Variables

Production ortamında URL'ler environment variable'lar ile kontrol edilebilir:

```bash
# .env dosyası
VITE_ABY_SYSTEM_URL=https://system.aby.com
VITE_ABY_PROJECT_MANAGEMENT_URL=https://projects.aby.com
VITE_ABY_HARITA_URL=https://maps.aby.com
```

### Port Mapping (Docker/Kubernetes)

```yaml
# docker-compose.yml örneği
services:
  aby-portal:
    ports: ["80:5173"]
  aby-system:
    ports: ["8080:5174"]
  aby-projects:
    ports: ["8081:5175"]
  aby-maps:
    ports: ["8082:5176"]
```

## 🔍 Sorun Giderme

### Port Çakışması

```bash
# Port kullanımını kontrol et
netstat -ano | findstr :5173
netstat -ano | findstr :5174
netstat -ano | findstr :5175
netstat -ano | findstr :5176

# Process'i sonlandır
taskkill /PID <process_id> /F
```

### Vite Port Otomatik Değişimi

Vite, belirtilen port meşgulse otomatik olarak bir sonraki boş portu kullanır:

```bash
Port 5173 is in use, trying another one...
➜  Local:   http://localhost:5174/
```

Bu durumda vite.config dosyasında farklı bir port belirleyin.

### Network Erişimi

`host: true` ayarı sayesinde local network'ten erişim mümkün:

```bash
➜  Network: http://192.168.1.100:5173/
```

## 📊 Performans İzleme

### Development Tools

- Vue DevTools
- Network tab ile API çağrıları
- Lighthouse performans analizi
- Hot-reload izleme

### Memory Usage

Her proje ayrı Node.js process'i olarak çalıştığından:
- RAM kullanımı: ~200-300MB per proje
- CPU kullanımı: Development mode'da yüksek (hot-reload)

## 🔄 Git Workflow

Port değişiklikleri için:

```bash
git add vite.config.ts
git commit -m "Port configuration updated to 5xxx"
git push origin main
```

---

**Son Güncelleme**: 26 Temmuz 2025  
**Versiyon**: 1.0  
**Sorumlu**: ABY Development Team
