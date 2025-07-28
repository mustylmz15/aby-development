const XLSX = require('xlsx');

// Demo veriler - Farklı kategorilerde çeşitli etkinlikler
const data = [
    ['ID', 'Title', 'Start', 'End', 'ClassName', 'Description', 'CreatedAt', 'UpdatedAt'],
    ['1', 'Proje Toplantısı', '2025-07-28T09:00:00', '2025-07-28T10:30:00', 'danger', 'Aylık proje değerlendirme toplantısı', '2025-07-28T08:00:00', '2025-07-28T08:00:00'],
    ['2', 'Müşteri Sunumu', '2025-07-29T14:00:00', '2025-07-29T16:00:00', 'primary', 'Yeni proje önerisi sunumu', '2025-07-28T08:00:00', '2025-07-28T08:00:00'],
    ['3', 'Doktor Randevusu', '2025-07-30T11:00:00', '2025-07-30T12:00:00', 'success', 'Yıllık kontrol muayenesi', '2025-07-28T08:00:00', '2025-07-28T08:00:00'],
    ['4', 'İstanbul Seyahati', '2025-08-01T08:00:00', '2025-08-03T18:00:00', 'info', 'İş seyahati - müşteri ziyaretleri', '2025-07-28T08:00:00', '2025-07-28T08:00:00'],
    ['5', 'Kod İncelemesi', '2025-08-05T15:00:00', '2025-08-05T17:00:00', 'primary', 'Haftalık kod review toplantısı', '2025-07-28T08:00:00', '2025-07-28T08:00:00'],
    ['6', 'Aile Yemeği', '2025-08-07T19:00:00', '2025-08-07T22:00:00', 'success', 'Aile ile hafta sonu yemeği', '2025-07-28T08:00:00', '2025-07-28T08:00:00'],
    ['7', 'Acil Sistem Bakımı', '2025-08-10T02:00:00', '2025-08-10T05:00:00', 'danger', 'Sunucu bakım çalışması', '2025-07-28T08:00:00', '2025-07-28T08:00:00'],
    ['8', 'Ankara Konferansı', '2025-08-12T09:00:00', '2025-08-14T17:00:00', 'info', 'Teknoloji konferansı katılımı', '2025-07-28T08:00:00', '2025-07-28T08:00:00'],
    ['9', 'Spor Salonu', '2025-08-15T18:00:00', '2025-08-15T20:00:00', 'success', 'Haftalık fitness antrenmanı', '2025-07-28T08:00:00', '2025-07-28T08:00:00'],
    ['10', 'Proje Teslimi', '2025-08-18T16:00:00', '2025-08-18T18:00:00', 'danger', 'Final proje teslim toplantısı', '2025-07-28T08:00:00', '2025-07-28T08:00:00'],
    ['11', 'Ekip Toplantısı', '2025-08-20T10:00:00', '2025-08-20T12:00:00', 'primary', 'Haftalık ekip koordinasyon toplantısı', '2025-07-28T08:00:00', '2025-07-28T08:00:00'],
    ['12', 'Dış Uzman Toplantısı', '2025-08-22T13:30:00', '2025-08-22T15:30:00', 'primary', 'Harici danışman ile strateji toplantısı', '2025-07-28T08:00:00', '2025-07-28T08:00:00'],
    ['13', 'Kitap Fuarı', '2025-08-25T10:00:00', '2025-08-25T18:00:00', 'success', 'İstanbul Kitap Fuarı ziyareti', '2025-07-28T08:00:00', '2025-07-28T08:00:00'],
    ['14', 'İzmir İş Gezisi', '2025-08-27T07:00:00', '2025-08-29T20:00:00', 'info', 'Fabrika ziyareti ve denetleme', '2025-07-28T08:00:00', '2025-07-28T08:00:00'],
    ['15', 'Acil Güvenlik Toplantısı', '2025-09-02T08:00:00', '2025-09-02T10:00:00', 'danger', 'Siber güvenlik değerlendirmesi', '2025-07-28T08:00:00', '2025-07-28T08:00:00']
];

const worksheet = XLSX.utils.aoa_to_sheet(data);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, 'CalendarEvents');
XLSX.writeFile(workbook, 'public/excel/proje-calendar-event-task.xlsx');

console.log('Excel demo verilerle dolduruldu!');
console.log('Toplam ' + (data.length - 1) + ' etkinlik eklendi.');
console.log('');
console.log('Kategoriler:');
console.log('- danger (Önemli): Proje toplantıları, acil durumlar');
console.log('- primary (İş): İş toplantıları, kod incelemeleri');
console.log('- info (Seyahat): İş seyahatleri, konferanslar');
console.log('- success (Kişisel): Kişisel etkinlikler, sosyal aktiviteler');
