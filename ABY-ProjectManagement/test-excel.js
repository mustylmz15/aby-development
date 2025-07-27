import XLSX from 'xlsx';

async function testExcelMatching() {
    try {
        console.log('🔄 Excel dosyaları analiz ediliyor...\n');
        
        // 1. Görev verilerini oku
        console.log('📊 Görev verileri yükleniyor...');
        const taskWorkbook1 = XLSX.readFile('./excel/YurticiGorev_2025.xlsx');
        const taskWorkbook2 = XLSX.readFile('./excel/YurtdisiGorev_2025.xlsx');
        
        // İlk dosyadan başlıkları al
        const sheet1 = taskWorkbook1.Sheets[taskWorkbook1.SheetNames[0]];
        const taskData1 = XLSX.utils.sheet_to_json(sheet1, { header: 1 });
        const headers1 = taskData1[0];
        
        const sheet2 = taskWorkbook2.Sheets[taskWorkbook2.SheetNames[0]];
        const taskData2 = XLSX.utils.sheet_to_json(sheet2, { header: 1 });
        const headers2 = taskData2[0];
        
        console.log('✅ Yurt İçi Görev başlıkları:', headers1);
        console.log('✅ Yurt Dışı Görev başlıkları:', headers2);
        console.log('📈 Yurt İçi kayıt sayısı:', taskData1.length - 1);
        console.log('📈 Yurt Dışı kayıt sayısı:', taskData2.length - 1);
        
        // PYP ile ilgili sütunları ara
        const pypColumns1 = headers1.map((h, i) => ({ index: i, header: h }))
            .filter(item => item.header && item.header.toString().toLowerCase().includes('pyp'));
        
        const pypColumns2 = headers2.map((h, i) => ({ index: i, header: h }))
            .filter(item => item.header && item.header.toString().toLowerCase().includes('pyp'));
        
        console.log('\n🎯 Yurt İçi PYP sütunları:', pypColumns1);
        console.log('🎯 Yurt Dışı PYP sütunları:', pypColumns2);
        
        // 2. Proje listesini oku
        console.log('\n📋 Proje listesi yükleniyor...');
        const projectWorkbook = XLSX.readFile('./excel/PROJE_LİSTESİ_UGES_ÜDM_2025_v3.xlsx');
        const projectSheet = projectWorkbook.Sheets[projectWorkbook.SheetNames[0]];
        const projectData = XLSX.utils.sheet_to_json(projectSheet, { header: 1 });
        
        console.log('✅ Proje listesi başlıkları:', projectData[0]);
        console.log('📈 Proje sayısı:', projectData.length - 1);
        
        // Proje Map'i oluştur (A kolonu -> B kolonu)
        const projectMap = new Map();
        for (let i = 1; i < projectData.length; i++) {
            const row = projectData[i];
            if (row[0] && row[1]) {
                projectMap.set(row[0].toString().trim(), row[1].toString().trim());
            }
        }
        
        console.log('🗺️ Proje Map boyutu:', projectMap.size);
        console.log('📋 İlk 5 proje örneği:');
        let count = 0;
        for (const [code, name] of projectMap.entries()) {
            if (count < 5) {
                console.log(`   ${code} -> ${name}`);
                count++;
            }
        }
        
        // 3. Eşleştirme analizi
        console.log('\n🔍 Eşleştirme Analizi (/ öncesi kısım):');
        console.log('=========================================');
        
        if (pypColumns1.length > 0) {
            const pypIndex = pypColumns1[0].index;
            console.log(`\n📊 Yurt İçi "${pypColumns1[0].header}" sütunu analizi:`);
            
            const pypValues = [];
            let matchCount = 0;
            let totalCount = 0;
            
            for (let i = 1; i < Math.min(taskData1.length, 20); i++) { // İlk 20 satır
                const row = taskData1[i];
                if (row[pypIndex]) {
                    const fullPypCode = row[pypIndex].toString().trim();
                    // / öncesi kısmı al
                    const pypCode = fullPypCode.split('/')[0];
                    pypValues.push({ full: fullPypCode, clean: pypCode });
                    totalCount++;
                    
                    if (projectMap.has(pypCode)) {
                        matchCount++;
                        console.log(`   ✅ ${fullPypCode} → ${pypCode} → ${projectMap.get(pypCode)}`);
                    } else {
                        console.log(`   ❌ ${fullPypCode} → ${pypCode} → EŞLEŞMEDİ`);
                    }
                }
            }
            
            console.log(`\n📈 Eşleşme Sonucu: ${matchCount}/${totalCount} kayıt eşleşti (${((matchCount/totalCount)*100).toFixed(1)}%)`);
        }
        
        if (pypColumns2.length > 0) {
            const pypIndex = pypColumns2[0].index;
            console.log(`\n📊 Yurt Dışı "${pypColumns2[0].header}" sütunu analizi:`);
            
            let matchCount = 0;
            let totalCount = 0;
            
            for (let i = 1; i < Math.min(taskData2.length, 20); i++) { // İlk 20 satır
                const row = taskData2[i];
                if (row[pypIndex]) {
                    const fullPypCode = row[pypIndex].toString().trim();
                    // / öncesi kısmı al
                    const pypCode = fullPypCode.split('/')[0];
                    totalCount++;
                    
                    if (projectMap.has(pypCode)) {
                        matchCount++;
                        console.log(`   ✅ ${fullPypCode} → ${pypCode} → ${projectMap.get(pypCode)}`);
                    } else {
                        console.log(`   ❌ ${fullPypCode} → ${pypCode} → EŞLEŞMEDİ`);
                    }
                }
            }
            
            console.log(`\n📈 Eşleşme Sonucu: ${matchCount}/${totalCount} kayıt eşleşti (${((matchCount/totalCount)*100).toFixed(1)}%)`);
        }
        
    } catch (error) {
        console.error('❌ Hata:', error.message);
    }
}

testExcelMatching();
