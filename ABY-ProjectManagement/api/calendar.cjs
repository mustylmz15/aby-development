const express = require('express');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

const EXCEL_FILE_PATH = path.join(__dirname, '../public/excel/proje-calendar-event-task.xlsx');

// Kategori eşleştirme tablosu
const CATEGORY_MAPPING = {
    // CSS class -> Türkçe kategori
    'primary': 'İş',
    'info': 'Seyahat', 
    'success': 'Kişisel',
    'danger': 'Önemli'
};

// Ters eşleştirme tablosu
const REVERSE_CATEGORY_MAPPING = {
    // Türkçe kategori -> CSS class
    'İş': 'primary',
    'Seyahat': 'info',
    'Kişisel': 'success', 
    'Önemli': 'danger'
};

// Kategori çevirme fonksiyonları
const classNameToCategory = (className) => {
    return CATEGORY_MAPPING[className] || className;
};

const categoryToClassName = (category) => {
    return REVERSE_CATEGORY_MAPPING[category] || category;
};

// Excel dosyasını oku
const readExcelFile = () => {
    try {
        if (!fs.existsSync(EXCEL_FILE_PATH)) {
            // Dosya yoksa boş oluştur
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.aoa_to_sheet([
                ['ID', 'Title', 'Start', 'End', 'ClassName', 'Description', 'CreatedAt', 'UpdatedAt']
            ]);
            XLSX.utils.book_append_sheet(workbook, worksheet, 'CalendarEvents');
            XLSX.writeFile(workbook, EXCEL_FILE_PATH);
        }

        const workbook = XLSX.readFile(EXCEL_FILE_PATH);
        const worksheet = workbook.Sheets['CalendarEvents'];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        const events = [];
        for (let i = 1; i < jsonData.length; i++) {
            const row = jsonData[i];
            if (row && row[0]) {
                const className = String(row[4] || 'primary');
                const category = classNameToCategory(className);
                console.log(`Event ${row[0]}: ${className} -> ${category}`); // Debug log
                events.push({
                    id: String(row[0]),
                    title: String(row[1] || ''),
                    start: String(row[2] || ''),
                    end: String(row[3] || ''),
                    className: className,
                    category: category, // Türkçe kategori adı eklendi
                    description: String(row[5] || ''),
                    createdAt: String(row[6] || ''),
                    updatedAt: String(row[7] || '')
                });
            }
        }
        
        return events;
    } catch (error) {
        console.error('Excel okuma hatası:', error);
        return [];
    }
};

// Excel dosyasına yaz
const writeExcelFile = (events) => {
    try {
        const worksheetData = [
            ['ID', 'Title', 'Start', 'End', 'ClassName', 'Description', 'CreatedAt', 'UpdatedAt'],
            ...events.map(event => [
                event.id,
                event.title,
                event.start,
                event.end,
                event.className,
                event.description,
                event.createdAt,
                event.updatedAt
            ])
        ];
        
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'CalendarEvents');
        XLSX.writeFile(workbook, EXCEL_FILE_PATH);
        
        console.log('Excel dosyası güncellendi, toplam event:', events.length);
        return true;
    } catch (error) {
        console.error('Excel yazma hatası:', error);
        return false;
    }
};

// API Routes

// Tüm eventleri getir
app.get('/api/calendar/events', (req, res) => {
    try {
        const events = readExcelFile();
        console.log('GET /api/calendar/events - Event sayısı:', events.length);
        res.json({ success: true, data: events });
    } catch (error) {
        console.error('Events getirme hatası:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Yeni event ekle
app.post('/api/calendar/events', (req, res) => {
    try {
        console.log('=== POST /api/calendar/events ===');
        console.log('Request body:', req.body);
        console.log('Request headers:', req.headers);
        
        const events = readExcelFile();
        const { title, start, end, className, description } = req.body;
        
        console.log('Extracted fields:', { title, start, end, className, description });
        
        // Yeni ID oluştur
        const maxId = events.length > 0 ? Math.max(...events.map(e => parseInt(e.id) || 0)) : 0;
        const newId = String(maxId + 1);
        
        console.log('Yeni ID:', newId);
        
        const now = new Date().toISOString();
        const finalClassName = className || 'primary';
        const newEvent = {
            id: newId,
            title: title || '',
            start: start || '',
            end: end || '',
            className: finalClassName,
            category: classNameToCategory(finalClassName), // Türkçe kategori adı
            description: description || '',
            createdAt: now,
            updatedAt: now
        };
        
        events.push(newEvent);
        
        if (writeExcelFile(events)) {
            console.log('POST /api/calendar/events - Yeni event eklendi:', newEvent.id);
            res.json({ success: true, data: newEvent });
        } else {
            res.status(500).json({ success: false, error: 'Excel yazma hatası' });
        }
    } catch (error) {
        console.error('Event ekleme hatası:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Event güncelle
app.put('/api/calendar/events/:id', (req, res) => {
    try {
        const events = readExcelFile();
        const eventId = req.params.id;
        const { title, start, end, className, description } = req.body;
        
        const eventIndex = events.findIndex(e => e.id === eventId);
        if (eventIndex === -1) {
            return res.status(404).json({ success: false, error: 'Event bulunamadı' });
        }
        
        // Event'i güncelle
        const updatedClassName = className !== undefined ? className : events[eventIndex].className;
        events[eventIndex] = {
            ...events[eventIndex],
            title: title !== undefined ? title : events[eventIndex].title,
            start: start !== undefined ? start : events[eventIndex].start,
            end: end !== undefined ? end : events[eventIndex].end,
            className: updatedClassName,
            category: classNameToCategory(updatedClassName), // Türkçe kategori adı
            description: description !== undefined ? description : events[eventIndex].description,
            updatedAt: new Date().toISOString()
        };
        
        if (writeExcelFile(events)) {
            console.log('PUT /api/calendar/events/' + eventId + ' - Event güncellendi');
            res.json({ success: true, data: events[eventIndex] });
        } else {
            res.status(500).json({ success: false, error: 'Excel yazma hatası' });
        }
    } catch (error) {
        console.error('Event güncelleme hatası:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Event sil
app.delete('/api/calendar/events/:id', (req, res) => {
    try {
        const events = readExcelFile();
        const eventId = req.params.id;
        
        const eventIndex = events.findIndex(e => e.id === eventId);
        if (eventIndex === -1) {
            return res.status(404).json({ success: false, error: 'Event bulunamadı' });
        }
        
        // Event'i sil
        events.splice(eventIndex, 1);
        
        if (writeExcelFile(events)) {
            console.log('DELETE /api/calendar/events/' + eventId + ' - Event silindi');
            res.json({ success: true, message: 'Event silindi' });
        } else {
            res.status(500).json({ success: false, error: 'Excel yazma hatası' });
        }
    } catch (error) {
        console.error('Event silme hatası:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Server başlat
app.listen(PORT, () => {
    console.log(`Calendar API server http://localhost:${PORT} adresinde çalışıyor`);
    console.log('Excel dosya yolu:', EXCEL_FILE_PATH);
    
    // İlk yüklemede Excel dosyasını kontrol et
    const events = readExcelFile();
    console.log('Başlangıçta', events.length, 'event bulundu');
});

module.exports = app;
