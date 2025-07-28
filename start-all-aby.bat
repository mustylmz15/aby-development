@echo off
echo ABY Projelerini Baslatiyor...
echo.

echo [1/5] ABY-Portal baslatiliyor (Port 5173)...
start "ABY-Portal" cmd /k "cd /d .\ABY-Portal && npm run dev"

timeout /t 3 /nobreak >nul

echo [2/5] ABY-System baslatiliyor (Port 5174)...
start "ABY-System" cmd /k "cd /d .\ABY-System && npm run dev"

timeout /t 3 /nobreak >nul

echo [3/5] ABY-ProjectManagement baslatiliyor (Port 5175)...
start "ABY-ProjectManagement" cmd /k "cd /d .\ABY-ProjectManagement && npm run dev"

timeout /t 3 /nobreak >nul

echo [4/5] ABY-ProjectManagement API Server baslatiliyor (Port 3001)...
start "ABY-API-Server" cmd /k "cd /d .\ABY-ProjectManagement && node api/calendar.cjs"

timeout /t 3 /nobreak >nul

echo [5/5] ABY-Harita baslatiliyor (Port 5176)...
start "ABY-Harita" cmd /k "cd /d .\ABY-Harita\harita-vue-app && npm run dev"

echo.
echo ✅ Tum ABY projeleri baslatildi!
echo.
echo 📋 Erisim URL'leri:
echo ├── ABY-Portal:         http://localhost:5173/
echo ├── ABY-System:         http://localhost:5174/
echo ├── ABY-ProjectMgmt:    http://localhost:5175/
echo ├── ABY-API Server:     http://localhost:3001/
echo └── ABY-Harita:         http://localhost:5176/
echo.
echo 📅 Calendar API Endpoints:
echo ├── GET    /api/calendar/events     - Etkinlikleri listele
echo ├── POST   /api/calendar/events     - Yeni etkinlik ekle
echo ├── PUT    /api/calendar/events/:id - Etkinlik guncelle
echo └── DELETE /api/calendar/events/:id - Etkinlik sil
echo.
pause
