# Git Ortak Çalışma Rehberi 📚

## 🤝 Git ile Takım Çalışması Nasıl Olur?

Git, birden fazla kişinin aynı proje üzerinde çalışmasını sağlayan bir **dağıtık versiyon kontrol sistemi**dir. 

### 🏗️ Temel Yapı

```
GitHub Repository (Merkezi Depo)
        ↓ clone/pull
Sizin Bilgisayarınız ←→ Arkadaşınızın Bilgisayarı
        ↑ push              ↑ push
        └─────────────────────┘
```

## 📋 Günlük İş Akışı Adımları

### 1. 🌅 **Güne Başlarken (Her Gün İlk İş)**

```bash
# Arkadaşınızın değişikliklerini alın
git pull origin main
```

**Neden yapıyoruz?** Arkadaşınız dün değişiklik yapmış olabilir. Siz de güncel kodla çalışmaya başlamalısınız.

### 2. 🔨 **Değişiklik Yaparken**

Kod değişikliği yaptıktan sonra:

```bash
# 1. Hangi dosyalar değişmiş görelim
git status

# 2. Değişiklikleri "sahneye" ekleyelim
git add .
# VEYA sadece belirli dosyaları:
git add src/views/index.vue

# 3. Değişiklikleri kaydetelim (commit)
git commit -m "Dashboard bütçe bölümü güncellendi"

# 4. GitHub'a gönderelim
git push origin main
```

### 3. 📬 **Arkadaşınızdan Güncellemeleri Alma**

```bash
# Arkadaşınızın son değişikliklerini alın
git pull origin main
```

## ⚠️ **ÖNEMLİ: Merge Conflicts (Çakışma) Durumu**

Eğer siz ve arkadaşınız aynı dosyanın aynı kısmını değiştirirseniz:

```bash
git pull origin main
# CONFLICT hatası alırsınız!
```

**Çözüm:**
1. VS Code çakışan dosyaları açar
2. Hangi değişikliği tutacağınızı seçersiniz
3. Dosyayı kaydedersiniz
4. `git add .` ve `git commit` yaparsınız

## 🔄 **Günlük Rutininiz**

### Sabah (İş Başı):
```bash
cd "C:\Users\KGYS\Desktop\ABY_Proje"
git pull origin main
```

### İş Sonu (Değişiklik Sonrası):
```bash
git add .
git commit -m "Bugün yaptığım değişikliklerin açıklaması"
git push origin main
```

## 📨 **Arkadaşınızdan Bildirim Gelir Mi?**

**HAYIR**, otomatik bildirim gelmez. Ama şunları yapabilirsiniz:

### GitHub'da Takip:
1. https://github.com/mustylmz15/aby-development sayfasına gidin
2. "Commits" sekmesine bakın
3. Son değişiklikleri görebilirsiniz

### VS Code'da Kontrol:
```bash
# Son 5 commit'i göster
git log --oneline -5

# Arkadaşınızın son değişikliklerini göster
git pull origin main
```

## 🔙 **Geri Alma İşlemleri**

### 1. **Henüz Commit Edilmemiş Değişiklikleri Geri Al**

```bash
# Tüm değişiklikleri geri al
git checkout .

# Sadece bir dosyayı geri al
git checkout -- src/views/index.vue
```

### 2. **Son Commit'i Geri Al (Henüz Push Edilmemişse)**

```bash
# Son commit'i geri al ama dosyalar değişmiş halde kalsın
git reset --soft HEAD~1

# Son commit'i tamamen geri al
git reset --hard HEAD~1
```

### 3. **GitHub'a Gönderilmiş Commit'i Geri Al**

```bash
# Tehlikeli! Sadece emin olduğunuzda:
git revert HEAD
git push origin main
```

## 🌿 **Branch (Dal) Kullanımı (İleri Seviye)**

Büyük değişiklikler için ayrı dal oluşturun:

```bash
# Yeni dal oluştur ve geç
git checkout -b yeni-ozellik

# Değişiklik yap, commit et
git add .
git commit -m "Yeni özellik eklendi"

# Dal'ı GitHub'a gönder
git push origin yeni-ozellik

# Ana dal'a geri dön
git checkout main

# Dal'ı ana dal ile birleştir
git merge yeni-ozellik
```

## 🚨 **Acil Durum Kurtarma**

### Dosyayı Yanlışlıkla Sildiyseniz:
```bash
git checkout HEAD -- dosya-adi.vue
```

### Tam Karmaşa Olmuşsa:
```bash
# Tüm yerel değişiklikleri sil, GitHub'daki hale getir
git reset --hard origin/main
```

### Önceki Bir Versiyona Dönmek:
```bash
# Commit hash'ini bulun
git log --oneline

# O commit'e dönün
git checkout a1b2c3d
```

## 📱 **Pratik İpuçları**

### 1. **Commit Mesajları**
```bash
# İyi örnekler:
git commit -m "Dashboard bütçe tablosu eklendi"
git commit -m "Port konfigürasyonu 5174'e güncellendi"
git commit -m "Login sayfası hata düzeltmesi"

# Kötü örnekler:
git commit -m "düzeltme"
git commit -m "çalışıyor"
git commit -m "son hali"
```

### 2. **Sık Commit Edin**
```bash
# Her mantıklı değişiklikten sonra commit edin
git add . && git commit -m "Navbar renk değişikliği"
# Sonra devam edin...
git add . && git commit -m "Footer link düzeltmesi"
```

### 3. **Push Etmeden Önce Test Edin**
```bash
npm run dev  # Proje çalışıyor mu?
git push origin main  # Çalışıyorsa gönder
```

## 🔧 **Faydalı Git Komutları**

```bash
# Durum kontrolü
git status

# Değişiklikleri göster
git diff

# Son 10 commit
git log --oneline -10

# Dosya geçmişi
git log --follow src/views/index.vue

# Kim ne değiştirmiş
git blame src/views/index.vue

# Uzak repository durumu
git remote -v

# Dal listesi
git branch -a
```

## 🎯 **Önerilen Günlük Rutin**

### Sabah:
1. Kahveyi al ☕
2. `git pull origin main` çalıştır
3. `npm run dev` ile projeyi başlat
4. Çalışmaya başla

### Değişiklik Sonrası:
1. Değişikliği test et
2. `git add .`
3. `git commit -m "Açıklayıcı mesaj"`
4. `git push origin main`

### Akşam:
1. Son değişiklikleri push et
2. Arkadaşına ne yaptığını anlat (WhatsApp/Slack)

## 📞 **İletişim Önemli!**

Git teknik altyapıyı halleder ama iletişim de çok önemli:

```
💬 "Bugün Dashboard'da bütçe tablosunu değiştirdim"
💬 "Yarın Login sayfası üzerinde çalışacağım"
💬 "Port ayarlarını güncelliyorum, pull et"
```

## 🆘 **Yardım Almak**

Sorun olursa:
1. `git status` çalıştırın
2. Çıktıyı arkadaşınıza gönderin
3. GitHub'da "Issues" bölümünü kullanın
4. Stack Overflow'da aratın

---

Bu rehberi yer imlerinize ekleyin! 🔖
