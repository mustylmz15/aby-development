const XLSX = require('xlsx');
const path = require('path');

const filePath = path.join(__dirname, 'excel', 'PROJE_LİSTESİ_UGES_ÜDM_2025_v3.xlsx');
const workbook = XLSX.readFile(filePath);

console.log('=== TÜM SHEET\'LERDE 4 HANELİ KOD ARAMA ===');
const sheetNames = workbook.SheetNames;

sheetNames.forEach((sheetName, index) => {
    console.log(`\n${index + 1}. SHEET: "${sheetName}"`);
    
    try {
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        
        if (data.length > 0) {
            console.log(`   Satır sayısı: ${data.length}`);
            
            // 4 haneli kod arayan sütunları bul
            const haneliKodKeys = Object.keys(data[0]).filter(key => 
                key.toLowerCase().includes('haneli') || 
                key.toLowerCase().includes('kod') ||
                key.toLowerCase().includes('4')
            );
            
            if (haneliKodKeys.length > 0) {
                console.log('   🎯 BULUNAN SÜTUNLAR:');
                haneliKodKeys.forEach(key => {
                    console.log(`      - "${key}"`);
                    
                    // İlk 3 satırın örnek verilerini göster
                    const samples = data.slice(0, 3)
                        .map((row, idx) => row[key] ? `Satır ${idx + 1}: ${row[key]}` : null)
                        .filter(Boolean);
                    
                    if (samples.length > 0) {
                        console.log('        Örnekler:');
                        samples.forEach(sample => console.log(`          ${sample}`));
                    }
                });
            } else {
                console.log('   ❌ 4 haneli kod içeren sütun bulunamadı');
            }
            
            // Tüm sütun başlıklarını göster
            console.log(`   📋 Tüm sütunlar (${Object.keys(data[0]).length} adet):`);
            Object.keys(data[0]).forEach((key, idx) => {
                console.log(`      ${idx + 1}. ${key}`);
            });
            
        } else {
            console.log('   ⚠️  Veri yok');
        }
    } catch (error) {
        console.log(`   ❌ Hata: ${error.message}`);
    }
});
