import XLSX from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Excel dosyasını oku
const excelPath = path.join(__dirname, 'excel', 'PROJE_LİSTESİ_UGES_ÜDM_2025_v3.xlsx');
console.log('Excel dosyası yolu:', excelPath);

try {
    const workbook = XLSX.readFile(excelPath);
    
    console.log('\n=== EXCEL DOSYASI ANALİZİ ===');
    console.log('Bulunan Sheet\'ler:', workbook.SheetNames);
    
    // Her sheet'i incele
    workbook.SheetNames.forEach((sheetName, index) => {
        console.log(`\n--- SHEET ${index + 1}: ${sheetName} ---`);
        
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        if (data.length > 0) {
            console.log('Toplam satır sayısı:', data.length);
            
            // Başlık satırı
            console.log('\nSütun Başlıkları:');
            const headers = data[0];
            headers.forEach((header, idx) => {
                if (header) {
                    console.log(`  ${idx + 1}. ${header}`);
                }
            });
            
            console.log('\nToplam sütun sayısı:', headers.filter(h => h).length);
            
            // İlk birkaç veri satırı
            console.log('\nÖrnek veri (ilk 3 satır):');
            for (let i = 1; i < Math.min(4, data.length); i++) {
                console.log(`\nSatır ${i}:`);
                const row = data[i];
                headers.forEach((header, idx) => {
                    if (header && row[idx]) {
                        console.log(`  ${header}: ${row[idx]}`);
                    }
                });
            }
            
            // Veri tiplerini analiz et
            console.log('\n--- VERİ TİPİ ANALİZİ ---');
            const sampleRow = data[1]; // İlk veri satırı
            if (sampleRow) {
                headers.forEach((header, idx) => {
                    if (header && sampleRow[idx] !== undefined) {
                        const value = sampleRow[idx];
                        const type = typeof value;
                        const isDate = value instanceof Date || (typeof value === 'string' && !isNaN(Date.parse(value)));
                        console.log(`  ${header}: ${type}${isDate ? ' (muhtemelen tarih)' : ''} - Örnek: ${value}`);
                    }
                });
            }
        } else {
            console.log('Bu sheet\'te veri bulunamadı.');
        }
    });
    
} catch (error) {
    console.error('Hata:', error.message);
}
