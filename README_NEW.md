<div align="center">

# 🏢 ABY Development Project
### Araştırma Birimi Yönetimi - Entegre Sistem Koleksiyonu

[![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/Node.js-v20.2.0-green?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![GitHub contributors](https://img.shields.io/github/contributors/mustylmz15/aby-development?style=for-the-badge)](https://github.com/mustylmz15/aby-development/graphs/contributors)

</div>

---

## 📋 İçindekiler

- [📖 Proje Hakkında](#-proje-hakkında)
- [🏗️ Proje Yapısı](#️-proje-yapısı)
- [🚀 Kurulum](#-kurulum)
- [💻 Çalıştırma](#-çalıştırma)
- [🌐 Port Konfigürasyonu](#-port-konfigürasyonu)
- [🛠️ Teknolojiler](#️-teknolojiler)
- [📱 Özellikler](#-özellikler)
- [🔧 Geliştirme](#-geliştirme)
- [📚 Dokümantasyon](#-dokümantasyon)
- [🐛 Sorun Giderme](#-sorun-giderme)
- [🤝 Katkıda Bulunma](#-katkıda-bulunma)
- [📄 Lisans](#-lisans)

---

## 📖 Proje Hakkında

**ABY Development Project**, modern Vue.js 3 ve TypeScript teknolojileri kullanılarak geliştirilmiş entegre bir araştırma birimi yönetim sistemi koleksiyonudur. Mikroservis mimarisi yaklaşımıyla tasarlanmış 4 ayrı uygulamadan oluşmaktadır.

### 🎯 Proje Amacı

Bu sistem, araştırma birimlerinin:
- 📊 **Proje yönetimi** ve takip süreçlerini
- 🗃️ **Envanter yönetimi** operasyonlarını  
- 🗺️ **Coğrafi bilgi sistemi** ihtiyaçlarını
- 🌐 **Merkezi portal** erişimini

Tek bir entegre platform altında birleştirmeyi hedeflemektedir.

---

## 🏗️ Proje Yapısı

```
📁 ABY_Proje/
├── 🌐 ABY-Portal/              # Ana Giriş Portalı
│   ├── src/views/AnaGiris.vue  # Dashboard ve navigation
│   ├── router/index.ts         # Routing yapılandırması
│   └── vite.config.ts          # Port: 5173
├── 
├── 🗃️ ABY-System/              # Envanter Yönetim Sistemi  
│   ├── src/views/              # Sistem görünümleri
│   ├── stores/                 # Pinia state management
│   └── vite.config.ts          # Port: 5174
├── 
├── 📊 ABY-ProjectManagement/   # Proje Yönetim Sistemi
│   ├── src/views/index.vue     # Dashboard ve raporlar
│   ├── excel/                  # Excel dosya işlemleri
│   └── vite.config.ts          # Port: 5175
├── 
├── 🗺️ ABY-Harita/             # Coğrafi Bilgi Sistemi
│   └── harita-vue-app/         # GIS uygulaması
│       └── vite.config.js      # Port: 5176
├── 
├── 📚 Dokümantasyon/
│   ├── README.md               # Bu dosya
│   ├── GIT_TEAMWORK_GUIDE.md   # Git işbirliği rehberi
│   ├── PORT_CONFIGURATION.md  # Port yapılandırma kılavuzu
│   └── DEVELOPMENT.md          # Geliştirme kuralları
└── 
```

---

## 🚀 Kurulum

### ⚙️ Sistem Gereksinimleri

| Teknoloji | Minimum Versiyon | Önerilen Versiyon |
|-----------|------------------|-------------------|
| **Node.js** | v18.0.0 | v20.2.0 ✅ |
| **npm** | v8.0.0 | v9.6.6 ✅ |
| **Git** | v2.30.0 | Latest |

### 📥 Repository Klonlama

```bash
# HTTPS ile klonlama
git clone https://github.com/mustylmz15/aby-development.git

# SSH ile klonlama (önerilen)
git clone git@github.com:mustylmz15/aby-development.git

# Proje klasörüne giriş
cd aby-development
```

### 📦 Bağımlılık Kurulumu

Her alt proje için ayrı ayrı bağımlılıklar kurulmalıdır:

```bash
# 🌐 ABY-Portal kurulumu
cd ABY-Portal
npm install
cd ..

# 🗃️ ABY-System kurulumu  
cd ABY-System
npm install
cd ..

# 📊 ABY-ProjectManagement kurulumu
cd ABY-ProjectManagement
npm install
cd ..

# 🗺️ ABY-Harita kurulumu
cd ABY-Harita/harita-vue-app
npm install
cd ../..
```

**Toplu kurulum scripti (PowerShell):**
```powershell
# install-all.ps1
foreach ($project in @("ABY-Portal", "ABY-System", "ABY-ProjectManagement")) {
    Write-Host "Installing dependencies for $project..." -ForegroundColor Green
    Set-Location $project
    npm install
    Set-Location ..
}
Write-Host "Installing ABY-Harita..." -ForegroundColor Green
Set-Location "ABY-Harita/harita-vue-app"
npm install
Set-Location "../.."
Write-Host "All installations completed!" -ForegroundColor Cyan
```

---

## 💻 Çalıştırma

### 🌐 Port Konfigürasyonu

| 🏷️ Proje | 🔌 Port | 🌍 URL | 📝 Açıklama |
|-----------|---------|---------|-------------|
| **🌐 ABY-Portal** | `5173` | http://localhost:5173/ | Ana giriş portalı ve navigation hub |
| **🗃️ ABY-System** | `5174` | http://localhost:5174/ | Envanter yönetimi ve stok takip sistemi |  
| **📊 ABY-ProjectManagement** | `5175` | http://localhost:5175/ | Proje takip, görev yönetimi ve raporlama |
| **🗺️ ABY-Harita** | `5176` | http://localhost:5176/ | Coğrafi bilgi sistemi ve harita uygulaması |

### 🚀 Sistemleri Başlatma

#### 1️⃣ ABY-Portal (Ana Portal)
```bash
cd ABY-Portal
npm run dev
```
> 🌐 **Erişim:** http://localhost:5173/  
> 📋 **İşlev:** Ana dashboard ve diğer sistemlere yönlendirme

#### 2️⃣ ABY-System (Envanter Sistemi)
```bash
cd ABY-System  
npm run dev
```
> 🗃️ **Erişim:** http://localhost:5174/  
> 📋 **İşlev:** Stok takip, envanter yönetimi, raporlama

#### 3️⃣ ABY-ProjectManagement (Proje Yönetimi)
```bash
cd ABY-ProjectManagement
npm run dev
```
> 📊 **Erişim:** http://localhost:5175/  
> 📋 **İşlev:** Proje takip, görev atama, bütçe yönetimi

#### 4️⃣ ABY-Harita (GIS Sistemi)
```bash
cd ABY-Harita/harita-vue-app
npm run dev
```
> 🗺️ **Erişim:** http://localhost:5176/  
> 📋 **İşlev:** Coğrafi veri görselleştirme, harita işlemleri

### 🔗 Sistem Entegrasyonu

ABY-Portal'dan diğer sistemlere otomatik yönlendirme aktiftir:

```vue
<!-- AnaGiris.vue navigation cards -->
🗃️ Envanter Yönetimi   → http://localhost:5174/auth/boxed-signin
📊 Proje Takip         → http://localhost:5175/
🗺️ ELD Harita          → http://localhost:5176/
```

---

## 🛠️ Teknolojiler

### 🎨 Frontend Stack
- **🖼️ Framework:** Vue.js 3.4+ (Composition API)
- **⚡ Build Tool:** Vite 5.4+
- **📘 Language:** TypeScript 5.0+
- **🎨 Styling:** Tailwind CSS 3.0+
- **🧭 Routing:** Vue Router 4.0+
- **📦 State Management:** Pinia 2.0+

### 🔧 Development Tools
- **📝 Code Editor:** VS Code (önerilen)
- **🔍 Linting:** ESLint + Prettier
- **📊 TypeScript:** Strict mode enabled
- **🔄 Version Control:** Git + GitHub
- **📦 Package Manager:** npm 9.6+

### 🌐 Browser Support
- **Chrome:** ✅ 90+
- **Firefox:** ✅ 88+  
- **Safari:** ✅ 14+
- **Edge:** ✅ 90+

---

## 📱 Özellikler

### 🌐 ABY-Portal
- ✅ **Responsive Dashboard:** Modern kart bazlı navigasyon
- ✅ **SSO Integration:** Tek noktadan sisteme giriş
- ✅ **Dynamic Routing:** Environment bazlı URL yönlendirme
- ✅ **Theme Support:** Dark/Light mode desteği

### 🗃️ ABY-System  
- ✅ **Inventory Management:** Kapsamlı stok takip sistemi
- ✅ **Real-time Data:** Canlı veri güncelleme
- ✅ **Advanced Search:** Çoklu filtre ve arama
- ✅ **Report Generation:** Otomatik rapor oluşturma

### 📊 ABY-ProjectManagement
- ✅ **Project Dashboard:** Görsel proje takip paneli
- ✅ **Budget Management:** Bütçe planlama ve takip
- ✅ **Excel Integration:** Excel dosya import/export
- ✅ **Task Assignment:** Görev atama ve takip sistemi

### 🗺️ ABY-Harita
- ✅ **Interactive Maps:** Etkileşimli harita arayüzü
- ✅ **GIS Operations:** Coğrafi analiz araçları
- ✅ **Layer Management:** Katman yönetimi
- ✅ **Data Visualization:** Veri görselleştirme araçları

---

## 🔧 Geliştirme

### 🚀 Development Server Başlatma

```bash
# Tüm sistemleri paralel başlatma (önerilen)
# Terminal 1
cd ABY-Portal && npm run dev

# Terminal 2  
cd ABY-System && npm run dev

# Terminal 3
cd ABY-ProjectManagement && npm run dev

# Terminal 4
cd ABY-Harita/harita-vue-app && npm run dev
```

### 🏗️ Production Build

```bash
# Her proje için ayrı build
cd ABY-Portal && npm run build
cd ABY-System && npm run build  
cd ABY-ProjectManagement && npm run build
cd ABY-Harita/harita-vue-app && npm run build
```

### 🧪 Testing

```bash
# Unit testler
npm run test

# E2E testler  
npm run test:e2e

# Coverage raporu
npm run test:coverage
```

### 🔍 Code Quality

```bash
# Linting
npm run lint

# Type checking
npm run type-check

# Format code
npm run format
```

---

## 📚 Dokümantasyon

| 📄 Dosya | 📝 İçerik |
|----------|-----------|
| [📖 README.md](README.md) | Genel proje bilgileri ve kurulum |
| [🤝 GIT_TEAMWORK_GUIDE.md](GIT_TEAMWORK_GUIDE.md) | Git işbirliği rehberi (800+ satır) |
| [🔌 PORT_CONFIGURATION.md](PORT_CONFIGURATION.md) | Port yapılandırma kılavuzu |
| [⚙️ DEVELOPMENT.md](DEVELOPMENT.md) | Geliştirme kuralları ve standartları |

### 📋 Git İş Akışı

```bash
# 1. Güncel kodu çek
git pull origin main

# 2. Yeni özellik dalı oluştur
git checkout -b feature/yeni-ozellik

# 3. Değişiklikleri yap ve commit et
git add .
git commit -m "feat: yeni özellik eklendi"

# 4. GitHub'a gönder
git push origin feature/yeni-ozellik

# 5. Pull Request oluştur
```

### 📊 Commit Standartları

```bash
feat: yeni özellik eklendi
fix: hata düzeltmesi yapıldı  
docs: dokümantasyon güncellendi
style: kod formatı düzeltildi
refactor: kod yeniden düzenlendi
test: test eklendi/güncellendi
chore: genel bakım işlemleri
```

---

## 🐛 Sorun Giderme

### ⚠️ Yaygın Problemler

#### 🔌 Port Çakışması
```bash
# Belirli portu kullanan process bulma
netstat -ano | findstr :5173

# Process sonlandırma
taskkill /PID <process_id> /F
```

#### 📦 Node Modules Eksik
```bash
# Bağımlılıkları yeniden kur
rm -rf node_modules package-lock.json
npm install
```

#### 🌐 CORS Hataları
```bash
# vite.config.ts dosyasında proxy ayarları
server: {
  proxy: {
    '/api': 'http://localhost:3000'
  }
}
```

#### 🔄 Git Merge Conflicts
```bash
# Conflict olan dosyaları göster
git status

# Manual çözüm sonrası
git add .
git commit -m "fix: merge conflict çözüldü"
```

### 🆘 Acil Durum Komutları

```bash
# Tam reset (DİKKATLE!)
git reset --hard origin/main

# Yedek oluştur
git stash push -m "acil durum yedek"

# Temiz başlangıç
rm -rf node_modules
npm install
```

---

## 🤝 Katkıda Bulunma

### 👥 Takım Üyeleri
- **🏆 Lead Developer:** [Adınız]
- **💻 Frontend Developer:** [Arkadaşınızın Adı]

### 🔄 Katkı Süreci

1. **🍴 Fork** repository'yi fork edin
2. **🌿 Branch** yeni özellik dalı oluşturun  
3. **✨ Commit** değişikliklerinizi commit edin
4. **📤 Push** dalınızı GitHub'a gönderin
5. **🔀 Pull Request** oluşturun

### 📏 Code Standards

- **🎨 Style:** Prettier + ESLint kuralları
- **📝 Comments:** TypeScript JSDoc formatı
- **🧪 Tests:** Yeni özellikler için test yazın
- **📚 Docs:** README'yi güncel tutun

---

## 📄 Lisans

Bu proje [MIT License](LICENSE) altında lisanslanmıştır.

```
MIT License - Özgürce kullanabilir, değiştirebilir ve dağıtabilirsiniz.
```

---

<div align="center">

### 🚀 ABY Development Team

**Made with ❤️ using Vue.js 3 + TypeScript**

[![GitHub stars](https://img.shields.io/github/stars/mustylmz15/aby-development?style=social)](https://github.com/mustylmz15/aby-development/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/mustylmz15/aby-development?style=social)](https://github.com/mustylmz15/aby-development/network/members)

[🐛 Report Bug](https://github.com/mustylmz15/aby-development/issues) · 
[✨ Request Feature](https://github.com/mustylmz15/aby-development/issues) · 
[📖 Documentation](https://github.com/mustylmz15/aby-development/wiki)

**⭐ Bu projeyi beğendiyseniz star vermeyi unutmayın!**

</div>
