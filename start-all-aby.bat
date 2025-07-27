@echo off
echo ABY Projelerini Başlatıyor...
echo.

echo [1/4] ABY-Portal başlatılıyor (Port 5173)...
start "ABY-Portal" cmd /k "cd /d C:\Users\KGYS\Desktop\ABY_Proje\ABY-Portal && npm run dev"

timeout /t 3 /nobreak >nul

echo [2/4] ABY-System başlatılıyor (Port 5174)...
start "ABY-System" cmd /k "cd /d C:\Users\KGYS\Desktop\ABY_Proje\ABY-System && npm run dev"

timeout /t 3 /nobreak >nul

echo [3/4] ABY-ProjectManagement başlatılıyor (Port 5175)...
start "ABY-ProjectManagement" cmd /k "cd /d C:\Users\KGYS\Desktop\ABY_Proje\ABY-ProjectManagement && npm run dev"

timeout /t 3 /nobreak >nul

echo [4/4] ABY-Harita başlatılıyor (Port 5176)...
start "ABY-Harita" cmd /k "cd /d C:\Users\KGYS\Desktop\ABY_Proje\ABY-Harita\harita-vue-app && npm run dev"

echo.
echo ✅ Tüm ABY projeleri başlatıldı!
echo.
echo 📋 Erişim URL'leri:
echo ├── ABY-Portal:         http://localhost:5173/
echo ├── ABY-System:         http://localhost:5174/
echo ├── ABY-ProjectMgmt:    http://localhost:5175/
echo └── ABY-Harita:         http://localhost:5176/
echo.
pause
