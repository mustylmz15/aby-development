# ABY Project

Bu proje ABY (Araştırma Birimi Yönetimi) sistem koleksiyonunu içermektedir.

## Proje Yapısı

- **ABY-Harita**: Vue.js tabanlı harita uygulaması
- **ABY-Portal**: Ana giriş portalı (Vue.js + TypeScript)
- **ABY-ProjectManagement**: Proje yönetim sistemi (Vue.js + TypeScript)
- **ABY-System**: Ana sistem uygulaması (Vue.js + TypeScript)

## Kurulum

Her alt proje için ayrı ayrı bağımlılıklar kurulmalıdır:

```bash
# ABY-Harita
cd ABY-Harita/harita-vue-app
npm install

# ABY-Portal
cd ABY-Portal
npm install

# ABY-ProjectManagement
cd ABY-ProjectManagement
npm install

# ABY-System
cd ABY-System
npm install
```

## Çalıştırma

Her proje farklı portlarda çalışacak şekilde ayarlanmıştır. Tüm projeleri aynı anda çalıştırabilirsiniz.

### 📋 Port Dağılımı

| Proje | Port | URL | Açıklama |
|-------|------|-----|----------|
| **ABY-Portal** | 5173 | http://localhost:5173/ | Ana giriş portalı - Tüm sistemlere erişim noktası |
| **ABY-System** | 5174 | http://localhost:5174/ | Envanter yönetimi ve ana sistem işlevleri |  
| **ABY-ProjectManagement** | 5175 | http://localhost:5175/ | Proje takip, görev yönetimi ve raporlama |
| **ABY-Harita** | 5176 | http://localhost:5176/ | ELD Harita - Coğrafi bilgi sistemi |

### 🚀 Tüm Projeleri Başlatma

Her proje için ayrı terminal penceresi açın ve sırasıyla çalıştırın:

**Terminal 1 - ABY-Portal (Ana Portal):**
```bash
cd ABY-Portal
npm run dev
# http://localhost:5173/ adresinde çalışacak
```

**Terminal 2 - ABY-System (Envanter Sistemi):**
```bash
cd ABY-System
npm run dev
# http://localhost:5174/ adresinde çalışacak
```

**Terminal 3 - ABY-ProjectManagement (Proje Yönetimi):**
```bash
cd ABY-ProjectManagement
npm run dev
# http://localhost:5175/ adresinde çalışacak
```

**Terminal 4 - ABY-Harita (CBS Sistemi):**
```bash
cd ABY-Harita/harita-vue-app
npm run dev
# http://localhost:5176/ adresinde çalışacak
```

### 🔗 Sistem Yönlendirmeleri

ABY-Portal'dan diğer sistemlere otomatik yönlendirme:

- **Envanter Yönetimi** kartına tıklayınca → `http://localhost:5174/auth/boxed-signin`
- **Proje Takip** kartına tıklayınca → `http://localhost:5175/`
- **ELD Harita** kartına tıklayınca → `http://localhost:5176/`

### ⚠️ Önemli Notlar

- Tüm projeler aynı anda çalıştırılabilir (farklı portlar)
- Port çakışması durumunda Vite otomatik olarak bir sonraki boş portu kullanır
- Production ortamında environment variable'lar ile URL'ler yapılandırılabilir
- Development ortamında hot-reload aktif (değişiklikler otomatik yansır)

### 🛠️ Sorun Giderme

**Port zaten kullanımda hatası:**
```bash
# Belirli portu kullanan process'i bulma
netstat -ano | findstr :5173
# Process'i sonlandırma
taskkill /PID <process_id> /F
```

**Node_modules eksik hatası:**
```bash
# İlgili proje klasöründe
npm install
```

## Geliştirme

Bu proje Git ile version control altındadır. Değişiklik yapmadan önce:

1. Güncel kodu çekin: `git pull`
2. Yeni branch oluşturun: `git checkout -b feature/yeni-ozellik`
3. Değişikliklerinizi yapın
4. Commit edin: `git add . && git commit -m "Açıklama"`
5. Push edin: `git push origin feature/yeni-ozellik`
6. Pull request oluşturun

## Katkıda Bulunanlar

- [Adınız]
- [Arkadaşınızın Adı]
