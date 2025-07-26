import XLSX from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Excel dosyasını oku
const excelPath = path.join(__dirname, 'excel', 'Copy of rehber (002).xlsx');
const workbook = XLSX.readFile(excelPath);

// İlk sheet'i al
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// JSON formatına çevir
const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

console.log('Sheet Adı:', sheetName);
console.log('\nSütun Başlıkları:');
if (data.length > 0) {
    const headers = data[0];
    headers.forEach((header, index) => {
        console.log(`${index + 1}. ${header}`);
    });
    
    console.log('\nToplam sütun sayısı:', headers.length);
    
    // İlk birkaç satırı da gösterelim
    console.log('\nİlk 3 satır örneği:');
    for (let i = 0; i < Math.min(4, data.length); i++) {
        console.log(`Satır ${i + 1}:`, data[i]);
    }
} else {
    console.log('Veri bulunamadı!');
}
