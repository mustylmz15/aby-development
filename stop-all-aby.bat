@echo off
echo ABY Projelerini Durduruyor...
echo.

echo Node.js islemleri sonlandiriliyor...
taskkill /f /im node.exe 2>nul
if %errorlevel% equ 0 (
    echo ✅ Node.js islemleri durduruldu
) else (
    echo ℹ️  Calisan Node.js islemi bulunamadi
)

echo.
echo Vite islemleri sonlandiriliyor...
taskkill /f /im vite.exe 2>nul
if %errorlevel% equ 0 (
    echo ✅ Vite islemleri durduruldu
) else (
    echo ℹ️  Calisan Vite islemi bulunamadi
)

echo.
echo 🔍 Portlarda calisan servisler kontrol ediliyor...
echo.
echo Port 3001 (API Server):
netstat -ano | findstr ":3001" | findstr "LISTENING" >nul
if %errorlevel% equ 0 (
    echo ⚠️  Port 3001 hala kullaniliyor
) else (
    echo ✅ Port 3001 serbest
)

echo.
echo Port 5173-5176 (Vue Servers):
for %%p in (5173 5174 5175 5176) do (
    netstat -ano | findstr ":%%p" | findstr "LISTENING" >nul
    if !errorlevel! equ 0 (
        echo ⚠️  Port %%p hala kullaniliyor
    ) else (
        echo ✅ Port %%p serbest
    )
)

echo.
echo ✅ Tum ABY projeleri durduruldu!
echo ℹ️  Eger hala port sorunlari varsa, bilgisayari yeniden baslatmayi deneyin.
echo.
pause
