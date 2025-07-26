# Development Guidelines

## Git Workflow

Bu proje için Git kullanım kuralları:

### Branch Naming Convention
- `feature/ozellik-adi` - Yeni özellikler için
- `fix/hata-adi` - Bug düzeltmeleri için  
- `update/guncelleme-adi` - Güncellemeler için

### Commit Message Format
- `feat: yeni özellik açıklaması`
- `fix: hata düzeltmesi açıklaması`
- `docs: dokümantasyon güncellemesi`
- `style: kod formatı düzenlemesi`
- `refactor: kod yeniden düzenlemesi`

### Example Workflow
```bash
git checkout -b feature/login-system
# kod yazın
git add .
git commit -m "feat: kullanıcı login sistemi eklendi"
git push origin feature/login-system
# GitHub'da Pull Request oluşturun
```

### Daily Workflow
1. `git pull origin main` - Güncel kodu alın
2. Yeni branch oluşturun
3. Kod yazın ve test edin
4. Sık commit yapın
5. Push edin ve PR oluşturun
