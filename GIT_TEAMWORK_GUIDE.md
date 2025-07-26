# Git Ortak Çalışma Rehberi 📚

> **ABY Development Team** için kapsamlı Git kılavuzu  
> Repository: `mustylmz15/aby-development`  
> Son güncelleme: 26 Temmuz 2025  

## 📖 İçindekiler

1. [Git Nedir ve Neden Kullanıyoruz?](#git-nedir)
2. [Temel Git Kavramları](#temel-kavramlar)
3. [Git Kurulumu ve İlk Ayarlar](#kurulum)
4. [Repository Yönetimi](#repository-yonetimi)
5. [Günlük İş Akışı](#gunluk-is-akisi)
6. [Git Komutları Rehberi](#git-komutlari)
7. [Branch (Dal) Yönetimi](#branch-yonetimi)
8. [Merge Conflicts Çözümü](#merge-conflicts)
9. [İleri Seviye Teknikler](#ileri-seviye)
10. [Sorun Giderme](#sorun-giderme)
11. [Best Practices](#best-practices)

---

## 🤝 Git ile Takım Çalışması Nasıl Olur? {#git-nedir}

Git, birden fazla kişinin aynı proje üzerinde çalışmasını sağlayan bir **dağıtık versiyon kontrol sistemi**dir. 

### 🏗️ Temel Yapı

```
    🌐 GitHub Repository (Merkezi Depo)
    │     ↙ clone/pull     ↘ clone/pull
    │                               │
👨‍💻 Geliştirici A    ←→    👨‍💻 Geliştirici B
    │     ↖ push           ↗ push
    └─────────────────────────────┘
         Ortak Çalışma Alanı
```

### 🎯 Neden Git Kullanıyoruz?

- **📝 Versiyon Kontrolü**: Her değişiklik kaydedilir
- **🔄 Paralel Çalışma**: Aynı anda farklı özellikler geliştirilebilir  
- **🔙 Geri Alma**: Hatalı değişiklikler kolayca geri alınabilir
- **📊 İzlenebilirlik**: Kim ne zaman ne değiştirmiş görülebilir
- **🌿 Branch Sistemi**: Farklı özellikler ayrı dallarda geliştirilebilir

---

## 🧠 Temel Git Kavramları {#temel-kavramlar}

### 📁 Repository (Repo)
- **Tanım**: Projenizin tüm dosyalarının ve geçmişinin tutulduğu klasör
- **Yerel Repo**: Bilgisayarınızdaki kopya
- **Uzak Repo**: GitHub'daki merkezi kopya

### 📦 Commit
- **Tanım**: Projenizin belirli bir andaki fotoğrafı
- **Hash**: Her commit'in benzersiz kimliği (örn: `f6e49d3`)
- **Message**: Commit'te ne değiştiğinin açıklaması

### 🌊 Working Directory, Staging Area, Repository

```
📝 Working Directory     📋 Staging Area      📚 Repository
(Çalıştığınız dosyalar)  (Hazırlanan dosyalar)  (Kaydedilen commitler)
         │                       │                      │
         │ git add               │ git commit           │
         └──────────────────────→└─────────────────────→│
```

### 🌿 Branch (Dal)
- **main/master**: Ana geliştirme dalı
- **feature branches**: Yeni özellikler için ayrı dallar
- **hotfix branches**: Acil düzeltmeler için dallar

---

## ⚙️ Git Kurulumu ve İlk Ayarlar {#kurulum}

### 🔧 İlk Konfigürasyon

```bash
# Kullanıcı bilgilerinizi ayarlayın (GİTHUB BİLGİLERİNİZLE AYNI OLMALI!)
git config --global user.name "Adınız Soyadınız"
git config --global user.email "github@email.com"

# Varsayılan editörü ayarlayın
git config --global core.editor "code --wait"

# Varsayılan dal adını ayarlayın
git config --global init.defaultBranch main

# Ayarlarınızı kontrol edin
git config --list
```

### 🔑 SSH Key Kurulumu (Önerilen)

```bash
# SSH key oluşturun
ssh-keygen -t ed25519 -C "github@email.com"

# SSH agent'ı başlatın
eval "$(ssh-agent -s)"

# SSH key'i agent'a ekleyin
ssh-add ~/.ssh/id_ed25519

# Public key'i kopyalayın ve GitHub'a ekleyin
cat ~/.ssh/id_ed25519.pub
```

---

## 📂 Repository Yönetimi {#repository-yonetimi}

### 🆕 Yeni Repository Oluşturma

```bash
# Yerel olarak yeni repo oluştur
mkdir yeni-proje
cd yeni-proje
git init

# İlk commit
echo "# Yeni Proje" > README.md
git add README.md
git commit -m "İlk commit"

# GitHub'a bağla
git remote add origin https://github.com/kullanici/repo-adi.git
git push -u origin main
```

### 📥 Mevcut Repository'yi Klonlama

```bash
# HTTPS ile klonlama
git clone https://github.com/mustylmz15/aby-development.git

# SSH ile klonlama (önerilen)
git clone git@github.com:mustylmz15/aby-development.git

# Belirli klasöre klonlama
git clone https://github.com/mustylmz15/aby-development.git proje-klasoru
```

---

## 📋 Günlük İş Akışı Adımları {#gunluk-is-akisi}

### 1. 🌅 **Güne Başlarken (Her Gün İlk İş)**

```bash
# 1. Proje klasörüne gidin
cd "C:\Users\KGYS\Desktop\ABY_Proje"

# 2. Mevcut durumu kontrol edin
git status

# 3. Uzak repository'den güncellemeleri çekin
git fetch origin

# 4. Ana dala geçin (eğer başka daldaysanız)
git checkout main

# 5. Değişiklikleri birleştirin
git pull origin main

# 6. Durum kontrolü yapın
git status
```

**✅ Kontrol Listesi:**
- [ ] Repository güncel mi? (`git status`)
- [ ] Proje çalışıyor mu? (`npm run dev`)
- [ ] Son commit'ler görünüyor mu? (`git log --oneline -3`)

### 2. 🔨 **Geliştirme Yaparken**

#### A) Kod Değişikliği Öncesi
```bash
# Yeni özellik için dal oluştur (önerilen)
git checkout -b feature/yeni-ozellik

# VEYA ana dalda çalış (küçük değişiklikler için)
git checkout main
```

#### B) Değişiklik Yaptıktan Sonra
```bash
# 1. Hangi dosyalar değişmiş kontrol et
git status

# 2. Değişiklikleri göster
git diff

# 3. Değişiklikleri sahneye ekle
git add .
# VEYA seçici olarak:
git add src/views/dashboard.vue src/components/navbar.vue

# 4. Değişiklikleri kaydet
git commit -m "feat: dashboard bütçe bölümü eklendi"

# 5. Uzak repository'ye gönder
git push origin main
# VEYA feature dalındaysanız:
git push origin feature/yeni-ozellik
```

### 3. 📬 **Güncellemeleri Alma ve Gönderme**

```bash
# Düzenli olarak güncellemeleri kontrol edin
git fetch origin

# Ana dalı güncelleyin
git pull origin main

# Uzak dalları da kontrol edin
git remote show origin
```

### 4. 🏁 **Gün Sonu Rutini**

```bash
# 1. Son durum kontrolü
git status

# 2. Kaydedilmemiş değişiklik varsa commit edin
git add .
git commit -m "docs: günlük değişiklikler tamamlandı"

# 3. Uzak repository'ye gönderin
git push origin main

# 4. Günlük özet çıkarın
git log --oneline --since="1 day ago"
```

---

## 🛠️ Git Komutları Rehberi {#git-komutlari}

### 📊 **Durum ve Bilgi Komutları**

| Komut | Açıklama | Örnek Kullanım |
|-------|----------|----------------|
| `git status` | Mevcut durum | `git status` |
| `git log` | Commit geçmişi | `git log --oneline -10` |
| `git show` | Commit detayları | `git show HEAD` |
| `git diff` | Değişiklikleri karşılaştır | `git diff main..feature` |
| `git blame` | Satır bazında kim yazmış | `git blame src/App.vue` |
| `git reflog` | Tüm işlem geçmişi | `git reflog --oneline` |

### 📝 **Değişiklik Komutları**

| Komut | Açıklama | Örnek Kullanım |
|-------|----------|----------------|
| `git add` | Staging area'ya ekle | `git add .` |
| `git commit` | Değişiklikleri kaydet | `git commit -m "mesaj"` |
| `git reset` | Değişiklikleri geri al | `git reset --soft HEAD~1` |
| `git checkout` | Dosyaları geri getir | `git checkout -- dosya.txt` |
| `git revert` | Commit'i geri al | `git revert HEAD` |
| `git stash` | Geçici kaydet | `git stash push -m "mesaj"` |

### 🌐 **Uzak Repository Komutları**

| Komut | Açıklama | Örnek Kullanım |
|-------|----------|----------------|
| `git clone` | Repository'yi kopyala | `git clone URL` |
| `git remote` | Uzak repository yönet | `git remote -v` |
| `git fetch` | Değişiklikleri kontrol et | `git fetch origin` |
| `git pull` | Değişiklikleri çek ve birleştir | `git pull origin main` |
| `git push` | Değişiklikleri gönder | `git push origin main` |

### 🌿 **Branch (Dal) Komutları**

| Komut | Açıklama | Örnek Kullanım |
|-------|----------|----------------|
| `git branch` | Dal listesi | `git branch -a` |
| `git checkout` | Dal değiştir | `git checkout main` |
| `git switch` | Dal değiştir (yeni) | `git switch feature-branch` |
| `git merge` | Dalları birleştir | `git merge feature-branch` |
| `git rebase` | Dal geçmişini yeniden yaz | `git rebase main` |

---

## 🌿 Branch (Dal) Yönetimi {#branch-yonetimi}

### 🌱 **Branch Nedir ve Neden Kullanılır?**

Branch (dal), ana kodunuzu etkilemeden yeni özellikler geliştirmenizi sağlar:

```
main     A---B---C---F---G
              \         /
feature       D---E---/
```

### 🔧 **Branch İşlemleri**

#### Yeni Branch Oluşturma ve Geçiş
```bash
# Yeni dal oluştur ve geç
git checkout -b feature/kullanici-profili

# Modern komut (Git 2.23+)
git switch -c feature/kullanici-profili

# Sadece dal oluştur (geçme)
git branch feature/kullanici-profili
```

#### Branch'ler Arası Geçiş
```bash
# Ana dala geç
git checkout main
git switch main

# Feature dalına geç
git checkout feature/kullanici-profili
git switch feature/kullanici-profili

# Son dalına geri dön
git checkout -
git switch -
```

#### Branch Silme
```bash
# Yerel dal sil (birleştirilmişse)
git branch -d feature/kullanici-profili

# Zorla sil (birleştirilmemiş olsa bile)
git branch -D feature/kullanici-profili

# Uzak dal sil
git push origin --delete feature/kullanici-profili
```

### 🔄 **Branch Workflow Stratejileri**

#### Git Flow (Karmaşık Projeler)
```
main ──────○──────○──────○─────→ (Production)
             \             /
develop ──────●───●───●───○─────→ (Development)
               \     /
feature ────────●───○─────────→ (Features)
```

#### GitHub Flow (Basit Projeler - Önerilen)
```bash
# 1. Ana daldan yeni dal oluştur
git checkout main
git pull origin main
git checkout -b feature/yeni-ozellik

# 2. Değişiklik yap ve commit et
git add .
git commit -m "feat: yeni özellik eklendi"

# 3. GitHub'a gönder
git push origin feature/yeni-ozellik

# 4. Pull Request oluştur (GitHub'da)

# 5. Review sonrası merge et

# 6. Dalı temizle
git checkout main
git pull origin main
git branch -d feature/yeni-ozellik
```

---

## ⚠️ Merge Conflicts (Çakışma) Çözümü {#merge-conflicts}

### 🤔 **Conflict Ne Zaman Oluşur?**

İki geliştirici aynı dosyanın aynı satırlarını farklı şekilde değiştirdiğinde:

```bash
git pull origin main
# CONFLICT (content): Merge conflict in src/views/dashboard.vue
# Automatic merge failed; fix conflicts and then commit the result.
```

### 🛠️ **Conflict Çözüm Adımları**

#### 1. Conflict'ı Görme
```bash
# Conflicted dosyaları gör
git status

# Conflict'ı detaylı gör
git diff
```

#### 2. VS Code'da Çözüm
VS Code otomatik olarak conflict'ları gösterir:

```vue
<<<<<<< HEAD (Current Change)
<h1>Kullanıcı Dashboard</h1>
=======
<h1>Admin Panel</h1>
>>>>>>> feature-branch (Incoming Change)
```

**Seçenekleriniz:**
- `Accept Current Change`: Sizin versiyonunuzu kabul et
- `Accept Incoming Change`: Gelen versiyonu kabul et
- `Accept Both Changes`: İkisini de kabul et
- `Compare Changes`: Detaylı karşılaştırma

#### 3. Manuel Çözüm
```vue
<!-- Conflict'ı temizleyip istediğinizi yazın -->
<h1>Kullanıcı Dashboard - Admin Panel</h1>
```

#### 4. Çözümü Kaydetme
```bash
# Düzeltilmiş dosyaları ekle
git add .

# Merge commit'i tamamla
git commit -m "fix: dashboard başlık conflict çözüldü"

# GitHub'a gönder
git push origin main
```

### � **Conflict Önleme Yöntemleri**

1. **Sık Pull Yapın**: `git pull origin main`
2. **Küçük Commitler**: Büyük değişiklikleri bölün
3. **Branch Kullanın**: Feature'ları ayrı dallarda geliştirin
4. **İletişim**: Ne üzerinde çalıştığınızı belirtin

---

## 🚀 İleri Seviye Teknikler {#ileri-seviye}

### 📚 **Git Stash (Geçici Kayıt)**

Yarım kalan işleri geçici kaydetmek için:

```bash
# Mevcut değişiklikleri geçici kaydet
git stash push -m "yarım kalan dashboard değişiklikleri"

# Stash listesini gör
git stash list

# Stash'i geri getir
git stash pop

# Belirli stash'i geri getir
git stash apply stash@{0}

# Stash'i sil
git stash drop stash@{0}

# Tüm stash'leri temizle
git stash clear
```

### � **Git Rebase (Geçmiş Düzenleme)**

Commit geçmişini temizlemek için:

```bash
# Son 3 commit'i düzenle
git rebase -i HEAD~3

# Feature dalını main'e rebase et
git checkout feature/yeni-ozellik
git rebase main

# Interactive rebase seçenekleri:
# pick   = commit'i koru
# reword = commit mesajını değiştir
# edit   = commit'i düzenle
# squash = bir önceki commit ile birleştir
# drop   = commit'i sil
```

### 🏷️ **Git Tags (Versiyon İşaretleme)**

```bash
# Mevcut durumu etiketle
git tag v1.0.0

# Açıklamalı tag
git tag -a v1.0.0 -m "İlk stable versiyon"

# Tag'ları listele
git tag

# Tag'ı GitHub'a gönder
git push origin v1.0.0

# Tüm tag'ları gönder
git push origin --tags

# Tag'ı sil
git tag -d v1.0.0
git push origin --delete v1.0.0
```

### 🔍 **Git Hooks (Otomatik İşlemler)**

`.git/hooks/` klasöründe otomatik script'ler:

```bash
# Pre-commit hook örneği
#!/bin/sh
# .git/hooks/pre-commit
npm run lint
npm run test
```

### 📊 **Git Worktree (Çoklu Çalışma Alanı)**

Aynı anda farklı dallarda çalışmak için:

```bash
# Yeni worktree oluştur
git worktree add ../feature-worktree feature/yeni-ozellik

# Worktree'leri listele
git worktree list

# Worktree'yi sil
git worktree remove ../feature-worktree
```

---

## 🚨 Sorun Giderme {#sorun-giderme}

### 🔧 **Yaygın Problemler ve Çözümleri**

#### Problem 1: "Your branch is ahead of origin/main"
```bash
# Çözüm: Değişiklikleri GitHub'a gönderin
git push origin main
```

#### Problem 2: "Your branch is behind origin/main"
```bash
# Çözüm: Uzak değişiklikleri çekin
git pull origin main
```

#### Problem 3: "fatal: not a git repository"
```bash
# Çözüm: Git repository'si başlatın
git init
# VEYA doğru klasöre gidin
cd proje-klasoru
```

#### Problem 4: "Permission denied (publickey)"
```bash
# Çözüm: SSH key'inizi kontrol edin
ssh -T git@github.com
# VEYA HTTPS kullanın
git remote set-url origin https://github.com/mustylmz15/aby-development.git
```

#### Problem 5: "Merge conflict"
```bash
# Çözüm: Conflict'ları çözün (yukarıdaki bölüme bakın)
git status  # Conflicted dosyaları gör
# Dosyaları düzenle
git add .
git commit -m "fix: conflict çözüldü"
```

### 🆘 **Acil Durum Kurtarma Komutları**

#### Dosyayı Yanlışlıkla Sildiniz
```bash
# Son commit'ten geri getir
git checkout HEAD -- dosya-adi.vue

# Belirli commit'ten geri getir
git checkout a1b2c3d -- dosya-adi.vue
```

#### Yanlış Commit Yaptınız
```bash
# Son commit'i geri al (dosyalar korunsun)
git reset --soft HEAD~1

# Son commit'i tamamen geri al
git reset --hard HEAD~1

# GitHub'a gönderilmiş commit'i güvenli şekilde geri al
git revert HEAD
git push origin main
```

#### Tam Karmaşa Oldu
```bash
# Tüm yerel değişiklikleri sil, GitHub'daki hali getir
git fetch origin
git reset --hard origin/main

# Alternatif: Yeni baştan klonla
cd ..
rm -rf proje-klasoru
git clone https://github.com/mustylmz15/aby-development.git
```

#### Commit'e Dosya Eklemeyi Unuttunuz
```bash
# Son commit'e dosya ekle
git add unutulan-dosya.vue
git commit --amend --no-edit

# VEYA yeni commit
git add unutulan-dosya.vue
git commit -m "feat: unutulan dosya eklendi"
```

---

## ✅ Best Practices (En İyi Uygulamalar) {#best-practices}

### 📝 **Commit Mesajları**

#### Conventional Commits Standardı
```bash
# Format: type(scope): description
git commit -m "feat(dashboard): bütçe tablosu eklendi"
git commit -m "fix(login): validation hatası düzeltildi"
git commit -m "docs(readme): kurulum adımları güncellendi"
git commit -m "style(navbar): renk paleti değiştirildi"
git commit -m "refactor(utils): kod temizliği yapıldı"
git commit -m "test(auth): unit testler eklendi"
```

#### Commit Mesaj Türleri
- `feat`: Yeni özellik
- `fix`: Hata düzeltmesi
- `docs`: Dokümantasyon
- `style`: Kod formatı (işlevsellik değişmiyor)
- `refactor`: Kod temizliği
- `test`: Test ekleme/düzeltme
- `chore`: Diğer değişiklikler

### 🏗️ **Proje Yapısı**

#### .gitignore Dosyası Örnegi
```gitignore
# Node.js
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Vue.js
dist/
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
logs/
*.log
```

### 🔒 **Güvenlik**

#### Hassas Bilgileri Koruma
```bash
# .env dosyalarını .gitignore'a ekleyin
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore

# Yanlışlıkla eklediğiniz hassas dosyayı kaldırın
git rm --cached .env
echo ".env" >> .gitignore
git add .gitignore
git commit -m "feat: .env dosyası gitignore'a eklendi"
```

### 📊 **Performance**

#### Büyük Dosyalarla Çalışma
```bash
# Git LFS kurulumu
git lfs install

# Büyük dosya türlerini LFS'e ekle
git lfs track "*.zip"
git lfs track "*.pdf"
git add .gitattributes

# LFS dosyaları hakkında bilgi
git lfs ls-files
```

---

## 🎯 Günlük Rutinler ve Kontrol Listesi

### 🌅 **Sabah Rutini (5 dakika)**
```bash
# 1. Proje klasörüne git
cd "C:\Users\KGYS\Desktop\ABY_Proje"

# 2. Git durumu kontrol et
git status

# 3. Uzak değişiklikleri çek
git pull origin main

# 4. Proje çalışıyor mu test et
npm run dev

# 5. Son commitlerde ne olmuş bak
git log --oneline -5
```

**✅ Kontrol Listesi:**
- [ ] `git status` temiz mi?
- [ ] `git pull` başarılı mı?
- [ ] Proje çalışıyor mu?
- [ ] Yapılacak işler listesi hazır mı?

### 🔨 **Çalışma Sırası**
```bash
# Değişiklik öncesi
git checkout -b feature/yapilacak-is  # Yeni dal oluştur
git status                           # Durum kontrol

# Değişiklik sonrası
git add .                           # Dosyaları ekle
git commit -m "feat: açıklayıcı mesaj"  # Commit et
git push origin feature/yapilacak-is    # GitHub'a gönder
```

### 🌆 **Gün Sonu (3 dakika)**
```bash
# 1. Son durum
git status

# 2. Bekleyen commit var mı?
git add .
git commit -m "docs: günlük çalışma tamamlandı"

# 3. GitHub'a gönder
git push origin main

# 4. Günün özeti
git log --oneline --since="1 day ago" --author="$(git config user.name)"
```

---

## 📞 İletişim ve Takım Çalışması

### 💬 **Günlük İletişim**

#### Başlarken:
```
🌅 "Günaydın! Bugün Dashboard'un bütçe bölümü üzerinde çalışacağım"
🔄 "Main branch'ı pull ettim, herşey güncel"
```

#### Çalışırken:
```
🔨 "Dashboard bütçe tablosu %50 tamamlandı"
⚠️ "Login.vue dosyasında conflict var, çözmeye çalışıyorum"
```

#### Bitirirken:
```
✅ "Bugünkü değişiklikleri push ettim"
📝 "Yarın navbar componentine bakacağım"
```

### 🚀 **GitHub İşbirliği**

#### Pull Request (PR) Süreci
1. **Branch oluştur**: `git checkout -b feature/yeni-ozellik`
2. **Geliştir ve commit et**: `git commit -m "feat: yeni özellik"`
3. **GitHub'a push et**: `git push origin feature/yeni-ozellik`
4. **PR oluştur**: GitHub'da "Pull Request" butonuna tıkla
5. **Review bekle**: Takım arkadaşından onay
6. **Merge et**: Onay sonrası ana dal ile birleştir

#### Issues (Sorun Takibi)
- Hataları GitHub Issues'da raporlayın
- Her issue için ayrı branch oluşturun
- Issue numarasını commit mesajında belirtin: `fix: navbar hatası düzeltildi (closes #15)`

---

## 📚 Ek Kaynaklar

### 🔗 **Faydalı Linkler**
- [Git Resmi Dokümantasyon](https://git-scm.com/docs)
- [GitHub Guides](https://guides.github.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)

### � **Kitap Önerileri**
- Pro Git (Scott Chacon)
- Git Pocket Guide (Richard E. Silverman)

### 🎥 **Video Eğitimler**
- GitHub YouTube Kanalı
- Git & GitHub Crash Course

---

## 🎯 **ABY Project Özel Konfigürasyonu**

### 📁 **Proje Yapısı**
```
ABY_Proje/
├── ABY-Portal/       (Port: 5173)
├── ABY-System/       (Port: 5174)  
├── ABY-ProjectManagement/ (Port: 5175)
├── ABY-Harita/       (Port: 5176)
├── README.md
├── PORT_CONFIGURATION.md
└── GIT_TEAMWORK_GUIDE.md
```

### ⚙️ **Özel Komutlar**
```bash
# Tüm projeleri aynı anda başlat
npm run dev:all

# Port kontrolü
netstat -ano | findstr :5173
netstat -ano | findstr :5174
netstat -ano | findstr :5175
netstat -ano | findstr :5176

# ABY özel git kısayolları
alias aby-status="git status && git log --oneline -3"
alias aby-sync="git pull origin main && git push origin main"
```

---

## 🆘 **Hızlı Yardım**

### ❓ **Sık Sorulan Sorular**

**S: Commit mesajını yanlış yazdım, nasıl değiştirim?**
```bash
# Son commit mesajını değiştir (henüz push etmediyseniz)
git commit --amend -m "Doğru commit mesajı"
```

**S: Yanlış dosyayı commit ettim, nasıl çıkarırım?**
```bash
# Dosyayı son commit'ten çıkar
git reset HEAD~1 -- yanlis-dosya.txt
git commit --amend --no-edit
```

**S: Eski bir commit'e geri dönmek istiyorum**
```bash
# Commit hash'ini bul
git log --oneline

# O commit'e geçici git
git checkout a1b2c3d

# Kalıcı olarak o commit'e dön (DİKKATLE!)
git reset --hard a1b2c3d
```

**S: Push etmeyi unuttum, arkadaşım pull edemiyor**
```bash
# Senin yapman gereken:
git push origin main

# Arkadaşının yapması gereken:
git pull origin main
```

---

**🔖 Bu rehberi yer imlerinize ekleyin!**

> **Son güncelleme:** 26 Temmuz 2025  
> **Proje:** ABY Development  
> **Repository:** [mustylmz15/aby-development](https://github.com/mustylmz15/aby-development)  
> **Katkıda bulunanlar:** ABY Development Team
