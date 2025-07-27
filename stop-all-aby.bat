@echo off
echo ABY Projelerini Durduruyor...
echo.

echo Node.js işlemleri sonlandırılıyor...
taskkill /f /im node.exe 2>nul

echo Vite işlemleri sonlandırılıyor...
taskkill /f /im vite.exe 2>nul

echo.
echo ✅ Tüm ABY projeleri durduruldu!
echo.
pause
