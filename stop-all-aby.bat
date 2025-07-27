@echo off
echo ABY Projelerini Durduruyor...
echo.

echo Node.js islemleri sonlandiriliyor...
taskkill /f /im node.exe 2>nul

echo Vite islemleri sonlandiriliyor...
taskkill /f /im vite.exe 2>nul

echo.
echo ✅ Tum ABY projeleri durduruldu!
echo.
pause
