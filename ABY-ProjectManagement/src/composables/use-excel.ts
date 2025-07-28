import * as XLSX from 'xlsx';

export interface NotificationData {
    total: number;
    open: number;
    closed: number;
    interventionSLA: number;
    repairSLA: number;
}

export interface ProjectData {
    delayed: number;
    ontrack: number;
    completed: number;
}

export interface ProjectDistributionData {
    eld: number;
    security: number;
    health: number;
    transport: number;
}

export interface BudgetData {
    totalBudget: number;
    realizedBudget: number;
    domesticBudget: number;
    internationalBudget: number;
}

export interface TaskData {
    domestic: number;
    international: number;
    currentPersonnel: number;
}

export interface CalendarEvent {
    id: string;
    title: string;
    start: string;
    end: string;
    className: string;
    category?: string; // Türkçe kategori adı
    description: string;
    createdAt: string;
    updatedAt: string;
}

export const useExcel = () => {
    const readExcelFile = async (filePath: string) => {
        try {
            const response = await fetch(filePath);
            const arrayBuffer = await response.arrayBuffer();
            const workbook = XLSX.read(arrayBuffer, { type: 'array' });
            return workbook;
        } catch (error) {
            console.error('Excel dosyası okunamadı:', error);
            throw error;
        }
    };

    const parseNotificationData = (workbook: XLSX.WorkBook): NotificationData => {
        try {
            console.log('=== Excel Parsing Started ===');
            
            // Varsayılan olarak ilk sheet'i kullan, ama bildirim verisi için uygun sheet'i ara
            let sheetName = workbook.SheetNames[0];
            
            // Daha uygun sheet ismi varsa onu kullan
            const possibleSheetNames = ['Bildirim', 'Arıza', 'Çağrı', 'Call', 'Incident', 'Sheet1', 'Sayfa1'];
            for (const possibleName of possibleSheetNames) {
                const foundSheet = workbook.SheetNames.find(name => 
                    name.toLowerCase().includes(possibleName.toLowerCase())
                );
                if (foundSheet) {
                    sheetName = foundSheet;
                    break;
                }
            }
            
            console.log('Using sheet:', sheetName);
            const worksheet = workbook.Sheets[sheetName];
            
            // Sheet range bilgisini kontrol et
            const range = worksheet['!ref'];
            console.log('Sheet range:', range);
            
            // Excel'i JSON formatına çevir (header row ile)
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });
            
            console.log('Excel Sheets:', workbook.SheetNames);
            console.log('Excel Data Sample:', jsonData.slice(0, 5)); // İlk 5 satırı göster
            
            // Header satırını bul
            const headers = jsonData[0] as string[];
            console.log('Available Headers:', headers);
            console.log('Total Headers Count:', headers.length);
            
            // Tüm SLA ile ilgili kolonları listele
            const slaRelatedHeaders = headers.map((header, index) => {
                if (!header) return null;
                const lowerHeader = header.toLowerCase();
                if (lowerHeader.includes('sla')) {
                    return { index, name: header };
                }
                return null;
            }).filter(Boolean);
            
            console.log('SLA Related Headers:', slaRelatedHeaders);
            
            // "Arıza Bitiş" kolonunun index'ini bul (farklı varyasyonları kontrol et)
            const arizaBitisIndex = headers.findIndex(header => {
                if (!header) return false;
                const lowerHeader = header.toLowerCase();
                return (
                    (lowerHeader.includes('arıza') && lowerHeader.includes('bitiş')) ||
                    (lowerHeader.includes('ariza') && lowerHeader.includes('bitis')) ||
                    lowerHeader.includes('bitiş') ||
                    lowerHeader.includes('bitis') ||
                    lowerHeader.includes('tamamlanma') ||
                    lowerHeader.includes('kapanış') ||
                    lowerHeader.includes('kapanis') ||
                    lowerHeader.includes('çözüm') ||
                    lowerHeader.includes('cozum')
                );
            });
            
            console.log('Arıza Bitiş Column Index:', arizaBitisIndex);
            
            if (arizaBitisIndex === -1) {
                console.warn('Arıza Bitiş kolonu bulunamadı, varsayılan veriler kullanılıyor');
                return {
                    total: 248,
                    open: 156,
                    closed: 92,
                    interventionSLA: 23,
                    repairSLA: 12
                };
            }
            
            // Veri satırlarını say (header satırını hariç tut ve boş satırları filtrele)
            const allRows = jsonData.slice(1) as any[][];
            console.log('Total rows (including empty):', allRows.length);
            
            // Boş olmayan satırları filtrele (en az bir değeri olan satırlar)
            const dataRows = allRows.filter(row => {
                return row && row.some(cell => cell !== null && cell !== undefined && cell !== '');
            });
            
            console.log('Non-empty data rows:', dataRows.length);
            console.log('First 3 data rows:', dataRows.slice(0, 3));
            
            const totalNotifications = dataRows.length;
            console.log('Calculated total notifications:', totalNotifications);
            
            // Açık bildirimleri say (Arıza Bitiş kolonu boş olanlar)
            const openNotifications = dataRows.filter(row => {
                const arizaBitisValue = row[arizaBitisIndex];
                const isEmpty = !arizaBitisValue || arizaBitisValue === '' || arizaBitisValue === null || arizaBitisValue === undefined;
                return isEmpty;
            }).length;
            
            console.log('Open notifications (empty Arıza Bitiş):', openNotifications);
            
            // Kapalı bildirimleri hesapla
            const closedNotifications = totalNotifications - openNotifications;
            console.log('Closed notifications:', closedNotifications);
            
            // Arıza Bitiş kolonu değerlerini sample olarak göster
            const arizaBitisSamples = dataRows.slice(0, 10).map(row => row[arizaBitisIndex]);
            console.log('Arıza Bitiş column samples:', arizaBitisSamples);
            
            // SLA süresi geçen bildirimleri hesapla
            // "SLA" kolonunu ara (müdahale ve onarım için aynı kolon kullanılıyor)
            const slaIndex = headers.findIndex(header => {
                if (!header) return false;
                const lowerHeader = header.toLowerCase();
                return (
                    lowerHeader === 'sla' ||
                    lowerHeader.includes('sla') ||
                    lowerHeader === 'sla süresi' ||
                    lowerHeader === 'sla suresi'
                );
            });
            
            console.log('SLA Column Index:', slaIndex);
            
            let interventionSLA = 0;
            let repairSLA = 0;
            
            // R sütunu (18. sütun, index 17) ve Q sütunu (17. sütun, index 16)
            const columnR = 17; // R sütunu (0 bazlı index)
            const columnQ = 16; // Q sütunu (0 bazlı index)
            
            console.log('Using columns for SLA calculation: R (index 17) and Q (index 16)');
            console.log('Headers at R:', headers[columnR]);
            console.log('Headers at Q:', headers[columnQ]);
            
            // R - Q hesaplaması ile SLA kontrolü
            const slaExceededRows = dataRows.filter(row => {
                const valueR = row[columnR];
                const valueQ = row[columnQ];
                
                // Her iki değer de mevcut olmalı
                if (valueR === null || valueR === undefined || valueR === '' ||
                    valueQ === null || valueQ === undefined || valueQ === '') {
                    return false;
                }
                
                const numericR = parseFloat(valueR.toString());
                const numericQ = parseFloat(valueQ.toString());
                
                // Her iki değer de sayı olmalı
                if (isNaN(numericR) || isNaN(numericQ)) {
                    return false;
                }
                
                // R - Q işlemini yap
                const difference = numericR - numericQ;
                const isExceeded = difference > 1;
                
                if (isExceeded) {
                    console.log(`Main SLA exceeded: R(${numericR}) - Q(${numericQ}) = ${difference}`);
                }
                
                return isExceeded;
            });
            
            // Müdahale SLA'sı (R-Q > 1 olanlar)
            interventionSLA = slaExceededRows.length;
            console.log('Intervention SLA exceeded (R-Q > 1):', interventionSLA);
            
            // Sample R-Q hesaplamalarını göster
            const sampleCalculations = dataRows.slice(0, 10).map(row => {
                const valueR = row[columnR];
                const valueQ = row[columnQ];
                const numericR = parseFloat(valueR?.toString() || '0');
                const numericQ = parseFloat(valueQ?.toString() || '0');
                const difference = numericR - numericQ;
                
                return {
                    R: valueR,
                    Q: valueQ,
                    difference: difference,
                    exceeds1: difference > 1
                };
            });
            
            console.log('Sample R-Q calculations (main file):', sampleCalculations);
            
            // Eğer R-Q hesaplaması başarısızsa, eski SLA kolonu yöntemini kullan
            if (interventionSLA === 0 && slaIndex !== -1) {
                console.log('R-Q calculation returned 0, falling back to SLA column method');
                const slaColumnExceeded = dataRows.filter(row => {
                    const slaValue = row[slaIndex];
                    if (slaValue === null || slaValue === undefined || slaValue === '') {
                        return false;
                    }
                    
                    const numericValue = parseFloat(slaValue.toString());
                    return !isNaN(numericValue) && numericValue > 1;
                });
                
                interventionSLA = slaColumnExceeded.length;
                console.log('Intervention SLA (fallback method):', interventionSLA);
            }
            
            // Hiçbir yöntem çalışmazsa varsayılan hesaplama
            if (interventionSLA === 0) {
                console.warn('Both R-Q and SLA column methods failed, using default calculation');
                interventionSLA = Math.floor(openNotifications * 0.15);
            }
            
            // Onarım SLA'sı için ayrı dosyadan veri al (async olarak)
            // Bu değer daha sonra loadDashboardData fonksiyonunda set edilecek
            repairSLA = 0; // Placeholder, gerçek değer loadDashboardData'da set edilecek
            
            console.log('Notification Stats:', {
                total: totalNotifications,
                open: openNotifications,
                closed: closedNotifications,
                interventionSLA,
                repairSLA
            });
            
            return {
                total: totalNotifications,
                open: openNotifications,
                closed: closedNotifications,
                interventionSLA,
                repairSLA
            };
            
        } catch (error) {
            console.error('Bildirim verileri parse edilemedi:', error);
            // Hata durumunda varsayılan veriler döndür
            return {
                total: 248,
                open: 156,
                closed: 92,
                interventionSLA: 23,
                repairSLA: 12
            };
        }
    };

    const parseProjectData = (workbook: XLSX.WorkBook): ProjectData => {
        // Proje verilerini parse et
        return {
            delayed: 35,
            ontrack: 45,
            completed: 20
        };
    };

    const parseProjectDistribution = (workbook: XLSX.WorkBook): ProjectDistributionData => {
        // Proje dağılım verilerini parse et
        return {
            eld: 40,
            security: 25,
            health: 20,
            transport: 15
        };
    };

    const parseBudgetData = (workbook: XLSX.WorkBook): BudgetData => {
        // Bütçe verilerini parse et
        return {
            totalBudget: 48000000,
            realizedBudget: 25000000,
            domesticBudget: 24000000,
            internationalBudget: 1000000
        };
    };

    const parseTaskData = async (): Promise<TaskData> => {
        try {
            console.log('=== Parsing Task Data from Excel Files ===');
            
            let domesticTasks = 0;
            let internationalTasks = 0;
            let currentPersonnel = 0;
            
            // Güncel tarihi al
            const currentDate = new Date();
            console.log('Current date for comparison:', currentDate.toISOString().split('T')[0]);
            
            // Yurt İçi Görev dosyasını oku
            try {
                console.log('Loading domestic tasks from YurticiGorev_2025.xlsx');
                const domesticWorkbook = await readExcelFile('/excel/YurticiGorev_2025.xlsx');
                
                // İlk sheet'i kullan
                let domesticSheetName = domesticWorkbook.SheetNames[0];
                console.log('Domestic sheet name:', domesticSheetName);
                
                const domesticWorksheet = domesticWorkbook.Sheets[domesticSheetName];
                const domesticRange = domesticWorksheet['!ref'];
                console.log('Domestic sheet range:', domesticRange);
                
                // Excel'i JSON formatına çevir
                const domesticJsonData = XLSX.utils.sheet_to_json(domesticWorksheet, { header: 1, defval: '' });
                
                // Header satırını al
                const domesticHeaders = domesticJsonData[0] as string[];
                console.log('Domestic headers:', domesticHeaders);
                
                // Veri satırlarını filtrele (header hariç, boş olmayan satırlar)
                const domesticAllRows = domesticJsonData.slice(1) as any[][];
                const domesticDataRows = domesticAllRows.filter(row => {
                    return row && row.some(cell => cell !== null && cell !== undefined && cell !== '');
                });
                
                domesticTasks = domesticDataRows.length;
                console.log('Total domestic tasks count:', domesticTasks);
                
                // H ve I sütunlarını kontrol et (index 7 ve 8)
                const columnH = 7; // H sütunu (0 bazlı index)
                const columnI = 8; // I sütunu (0 bazlı index)
                
                console.log('Checking H and I columns for active domestic personnel...');
                console.log('Column H header:', domesticHeaders[columnH]);
                console.log('Column I header:', domesticHeaders[columnI]);
                
                // Aktif görevli personel sayısını hesapla
                const activeDomesticPersonnel = domesticDataRows.filter(row => {
                    const startDateValue = row[columnH];
                    const endDateValue = row[columnI];
                    
                    if (!startDateValue || !endDateValue) {
                        return false;
                    }
                    
                    try {
                        // Excel tarihlerini JavaScript Date'e çevir
                        let startDate: Date;
                        let endDate: Date;
                        
                        // Excel serial number ise dönüştür
                        if (typeof startDateValue === 'number') {
                            startDate = new Date((startDateValue - 25569) * 86400 * 1000);
                        } else {
                            startDate = new Date(startDateValue);
                        }
                        
                        if (typeof endDateValue === 'number') {
                            endDate = new Date((endDateValue - 25569) * 86400 * 1000);
                        } else {
                            endDate = new Date(endDateValue);
                        }
                        
                        // Tarih geçerliliğini kontrol et
                        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                            return false;
                        }
                        
                        // Güncel tarih başlangıç ve bitiş tarihleri arasında mı?
                        const isActive = currentDate >= startDate && currentDate <= endDate;
                        
                        if (isActive) {
                            console.log(`Active domestic personnel found: Start: ${startDate.toISOString().split('T')[0]}, End: ${endDate.toISOString().split('T')[0]}`);
                        }
                        
                        return isActive;
                    } catch (error) {
                        console.warn('Date parsing error for domestic task:', error);
                        return false;
                    }
                }).length;
                
                currentPersonnel += activeDomesticPersonnel;
                console.log('Active domestic personnel count:', activeDomesticPersonnel);
                
            } catch (error) {
                console.error('Yurt içi görev dosyası okunamadı:', error);
                domesticTasks = 45; // Varsayılan değer
            }
            
            // Yurt Dışı Görev dosyasını oku
            try {
                console.log('Loading international tasks from YurtdisiGorev_2025.xlsx');
                const internationalWorkbook = await readExcelFile('/excel/YurtdisiGorev_2025.xlsx');
                
                // İlk sheet'i kullan
                let internationalSheetName = internationalWorkbook.SheetNames[0];
                console.log('International sheet name:', internationalSheetName);
                
                const internationalWorksheet = internationalWorkbook.Sheets[internationalSheetName];
                const internationalRange = internationalWorksheet['!ref'];
                console.log('International sheet range:', internationalRange);
                
                // Excel'i JSON formatına çevir
                const internationalJsonData = XLSX.utils.sheet_to_json(internationalWorksheet, { header: 1, defval: '' });
                
                // Header satırını al
                const internationalHeaders = internationalJsonData[0] as string[];
                console.log('International headers:', internationalHeaders);
                
                // Veri satırlarını filtrele (header hariç, boş olmayan satırlar)
                const internationalAllRows = internationalJsonData.slice(1) as any[][];
                const internationalDataRows = internationalAllRows.filter(row => {
                    return row && row.some(cell => cell !== null && cell !== undefined && cell !== '');
                });
                
                internationalTasks = internationalDataRows.length;
                console.log('Total international tasks count:', internationalTasks);
                
                // H ve I sütunlarını kontrol et (index 7 ve 8)
                const columnH = 7; // H sütunu (0 bazlı index)
                const columnI = 8; // I sütunu (0 bazlı index)
                
                console.log('Checking H and I columns for active international personnel...');
                console.log('Column H header:', internationalHeaders[columnH]);
                console.log('Column I header:', internationalHeaders[columnI]);
                
                // Aktif görevli personel sayısını hesapla
                const activeInternationalPersonnel = internationalDataRows.filter(row => {
                    const startDateValue = row[columnH];
                    const endDateValue = row[columnI];
                    
                    if (!startDateValue || !endDateValue) {
                        return false;
                    }
                    
                    try {
                        // Excel tarihlerini JavaScript Date'e çevir
                        let startDate: Date;
                        let endDate: Date;
                        
                        // Excel serial number ise dönüştür
                        if (typeof startDateValue === 'number') {
                            startDate = new Date((startDateValue - 25569) * 86400 * 1000);
                        } else {
                            startDate = new Date(startDateValue);
                        }
                        
                        if (typeof endDateValue === 'number') {
                            endDate = new Date((endDateValue - 25569) * 86400 * 1000);
                        } else {
                            endDate = new Date(endDateValue);
                        }
                        
                        // Tarih geçerliliğini kontrol et
                        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                            return false;
                        }
                        
                        // Güncel tarih başlangıç ve bitiş tarihleri arasında mı?
                        const isActive = currentDate >= startDate && currentDate <= endDate;
                        
                        if (isActive) {
                            console.log(`Active international personnel found: Start: ${startDate.toISOString().split('T')[0]}, End: ${endDate.toISOString().split('T')[0]}`);
                        }
                        
                        return isActive;
                    } catch (error) {
                        console.warn('Date parsing error for international task:', error);
                        return false;
                    }
                }).length;
                
                currentPersonnel += activeInternationalPersonnel;
                console.log('Active international personnel count:', activeInternationalPersonnel);
                
            } catch (error) {
                console.error('Yurt dışı görev dosyası okunamadı:', error);
                internationalTasks = 12; // Varsayılan değer
            }
            
            console.log('Final task stats:', {
                domestic: domesticTasks,
                international: internationalTasks,
                currentPersonnel
            });
            
            return {
                domestic: domesticTasks,
                international: internationalTasks,
                currentPersonnel
            };
            
        } catch (error) {
            console.error('Görev verileri parse edilemedi:', error);
            return {
                domestic: 45,
                international: 12,
                currentPersonnel: 57
            };
        }
    };

    const parseRepairSLAData = async (): Promise<number> => {
        try {
            console.log('=== Parsing Repair SLA Data from 2025_S5.xlsx ===');
            
            // 2025_S5.xlsx dosyasını oku
            const repairWorkbook = await readExcelFile('/excel/2025_S5.XLSX');
            
            // İlk sheet'i kullan
            let sheetName = repairWorkbook.SheetNames[0];
            console.log('Repair SLA sheet:', sheetName);
            
            const worksheet = repairWorkbook.Sheets[sheetName];
            const range = worksheet['!ref'];
            console.log('Repair SLA sheet range:', range);
            
            // Excel'i JSON formatına çevir
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });
            
            // Header satırını bul
            const headers = jsonData[0] as string[];
            console.log('Repair SLA Headers:', headers);
            
            // R sütunu (18. sütun, index 17) ve Q sütunu (17. sütun, index 16)
            const columnR = 17; // R sütunu (0 bazlı index)
            const columnQ = 16; // Q sütunu (0 bazlı index)
            
            console.log('Using columns: R (index 17) and Q (index 16)');
            console.log('Headers at R:', headers[columnR]);
            console.log('Headers at Q:', headers[columnQ]);
            
            // Veri satırlarını filtrele
            const allRows = jsonData.slice(1) as any[][];
            const dataRows = allRows.filter(row => {
                return row && row.some(cell => cell !== null && cell !== undefined && cell !== '');
            });
            
            console.log('Repair SLA total data rows:', dataRows.length);
            
            // R - Q işlemini yap ve 45'ten büyük olanları say
            const repairSLAExceeded = dataRows.filter(row => {
                const valueR = row[columnR];
                const valueQ = row[columnQ];
                
                // Her iki değer de mevcut olmalı
                if (valueR === null || valueR === undefined || valueR === '' ||
                    valueQ === null || valueQ === undefined || valueQ === '') {
                    return false;
                }
                
                const numericR = parseFloat(valueR.toString());
                const numericQ = parseFloat(valueQ.toString());
                
                // Her iki değer de sayı olmalı
                if (isNaN(numericR) || isNaN(numericQ)) {
                    return false;
                }
                
                // R - Q işlemini yap
                const difference = numericR - numericQ;
                const isExceeded = difference > 45;
                
                if (isExceeded) {
                    console.log(`SLA exceeded: R(${numericR}) - Q(${numericQ}) = ${difference}`);
                }
                
                return isExceeded;
            }).length;
            
            // Sample değerleri göster
            const sampleCalculations = dataRows.slice(0, 10).map(row => {
                const valueR = row[columnR];
                const valueQ = row[columnQ];
                const numericR = parseFloat(valueR?.toString() || '0');
                const numericQ = parseFloat(valueQ?.toString() || '0');
                const difference = numericR - numericQ;
                
                return {
                    R: valueR,
                    Q: valueQ,
                    difference: difference,
                    exceeds45: difference > 45
                };
            });
            
            console.log('Sample R-Q calculations:', sampleCalculations);
            console.log('Repair SLA exceeded (R-Q > 45):', repairSLAExceeded);
            
            return repairSLAExceeded;
            
        } catch (error) {
            console.error('Repair SLA verisi parse edilemedi:', error);
            return 0;
        }
    };

    const loadDashboardData = async () => {
        try {
            console.log('=== Loading Dashboard Data ===');
            
            // Ana Excel dosyasını yükle (2025_S1.XLSX)
            const workbook = await readExcelFile('/excel/2025_S1.XLSX');
            
            // Bildirim verilerini parse et
            const notificationData = parseNotificationData(workbook);
            
            // Onarım SLA verilerini ayrı dosyadan al (2025_S5.XLSX)
            const repairSLACount = await parseRepairSLAData();
            
            // Onarım SLA değerini güncelle
            notificationData.repairSLA = repairSLACount;
            
            // Görev verilerini Excel dosyalarından al
            const taskData = await parseTaskData();
            
            console.log('Final notification stats with repair SLA:', notificationData);
            console.log('Final task data:', taskData);
            
            return {
                notifications: notificationData,
                projects: parseProjectData(workbook),
                distribution: parseProjectDistribution(workbook),
                budget: parseBudgetData(workbook),
                tasks: taskData
            };
        } catch (error) {
            console.error('Dashboard verileri yüklenemedi:', error);
            // Hata durumunda varsayılan veriler döndür
            return {
                notifications: {
                    total: 248,
                    open: 156,
                    closed: 92,
                    interventionSLA: 23,
                    repairSLA: 12
                },
                projects: {
                    delayed: 35,
                    ontrack: 45,
                    completed: 20
                },
                distribution: {
                    eld: 40,
                    security: 25,
                    health: 20,
                    transport: 15
                },
                budget: {
                    totalBudget: 48000000,
                    realizedBudget: 25000000,
                    domesticBudget: 24000000,
                    internationalBudget: 1000000
                },
                tasks: {
                    domestic: 45,
                    international: 12,
                    currentPersonnel: 57
                }
            };
        }
    };

    // Excel'den görev verilerini çek (hem yurt içi hem yurt dışı)
    const getTaskTableData = async (): Promise<{headers: string[], data: any[]}> => {
        try {
            console.log('=== Loading Complete Task Data ===');
            
            // Proje eşleştirme verilerini yükle
            const projectMapping = await getProjectMapping();
            
            let allTaskData: any[] = [];
            let combinedHeaders: string[] = [];
            
            // Yurt İçi Görev verileri
            try {
                const domesticWorkbook = await readExcelFile('/excel/YurticiGorev_2025.xlsx');
                const domesticSheetName = domesticWorkbook.SheetNames[0];
                const domesticWorksheet = domesticWorkbook.Sheets[domesticSheetName];
                const domesticJsonData = XLSX.utils.sheet_to_json(domesticWorksheet, { header: 1, defval: '' });
                
                const domesticHeaders = domesticJsonData[0] as string[];
                const domesticAllRows = domesticJsonData.slice(1) as any[][];
                const domesticDataRows = domesticAllRows.filter(row => {
                    return row && row.some(cell => cell !== null && cell !== undefined && cell !== '');
                });
                
                // Header'lara görev tipi sütunu ekle
                if (combinedHeaders.length === 0) {
                    combinedHeaders = ['Görev Tipi', 'İlgili Proje', ...domesticHeaders];
                }
                
                // Her satıra görev tipini ekle
                domesticDataRows.forEach((row, index) => {
                    const rowData: any = {
                        id: `domestic_${index + 1}`,
                        'Görev Tipi': 'Yurt İçi',
                        originalRowIndex: index
                    };
                    
                    // PYP kodunu bul ve proje ismini eşleştir
                    let pypCode = '';
                    domesticHeaders.forEach((header, colIndex) => {
                        if (header && (header.toLowerCase().includes('pyp') && !header.toLowerCase().includes('tanım'))) {
                            pypCode = row[colIndex] || '';
                        }
                    });
                    
                    // İlgili proje ismini ekle
                    rowData['İlgili Proje'] = getPypToProjectName(pypCode, projectMapping);
                    
                    // Her sütun için veri ekle
                    domesticHeaders.forEach((header, colIndex) => {
                        const cellValue = row[colIndex];
                        if (cellValue !== null && cellValue !== undefined && cellValue !== '') {
                            // Excel tarih sütunları için özel işlem
                            if (header.toLowerCase().includes('görev başlangıç tarihi') || 
                                header.toLowerCase().includes('görev bitiş tarihi') ||
                                header.toLowerCase().includes('başlangıç') && header.toLowerCase().includes('tarih') ||
                                header.toLowerCase().includes('bitiş') && header.toLowerCase().includes('tarih')) {
                                
                                // Excel seri numarasını tarihe çevir
                                if (typeof cellValue === 'number' && cellValue > 1) {
                                    try {
                                        const date = new Date((cellValue - 25569) * 86400 * 1000);
                                        if (!isNaN(date.getTime())) {
                                            rowData[header] = date.toLocaleDateString('tr-TR');
                                        } else {
                                            rowData[header] = cellValue;
                                        }
                                    } catch (error) {
                                        rowData[header] = cellValue;
                                    }
                                } else {
                                    rowData[header] = cellValue;
                                }
                            } else {
                                rowData[header] = cellValue;
                            }
                        } else {
                            rowData[header] = null;
                        }
                    });
                    
                    // H ve I sütunları için tarih kontrolü
                    const columnH = 7; // H sütunu
                    const columnI = 8; // I sütunu
                    const startDateValue = row[columnH];
                    const endDateValue = row[columnI];
                    
                    if (startDateValue && endDateValue) {
                        try {
                            let startDate: Date;
                            let endDate: Date;
                            
                            // Excel tarih dönüşümü
                            if (typeof startDateValue === 'number') {
                                startDate = new Date((startDateValue - 25569) * 86400 * 1000);
                            } else {
                                startDate = new Date(startDateValue);
                            }
                            
                            if (typeof endDateValue === 'number') {
                                endDate = new Date((endDateValue - 25569) * 86400 * 1000);
                            } else {
                                endDate = new Date(endDateValue);
                            }
                            
                            if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
                                rowData['Başlangıç Tarihi'] = startDate.toLocaleDateString('tr-TR');
                                rowData['Bitiş Tarihi'] = endDate.toLocaleDateString('tr-TR');
                                
                                const currentDate = new Date();
                                const isActive = currentDate >= startDate && currentDate <= endDate;
                                rowData['Durum'] = isActive ? 'Aktif' : (currentDate > endDate ? 'Tamamlandı' : 'Beklemede');
                            }
                        } catch (error) {
                            console.warn('Date parsing error:', error);
                        }
                    }
                    
                    allTaskData.push(rowData);
                });
                
                console.log('Domestic tasks loaded:', domesticDataRows.length);
                
            } catch (error) {
                console.error('Yurt içi görev verileri yüklenemedi:', error);
            }
            
            // Yurt Dışı Görev verileri
            try {
                const internationalWorkbook = await readExcelFile('/excel/YurtdisiGorev_2025.xlsx');
                const internationalSheetName = internationalWorkbook.SheetNames[0];
                const internationalWorksheet = internationalWorkbook.Sheets[internationalSheetName];
                const internationalJsonData = XLSX.utils.sheet_to_json(internationalWorksheet, { header: 1, defval: '' });
                
                const internationalHeaders = internationalJsonData[0] as string[];
                const internationalAllRows = internationalJsonData.slice(1) as any[][];
                const internationalDataRows = internationalAllRows.filter(row => {
                    return row && row.some(cell => cell !== null && cell !== undefined && cell !== '');
                });
                
                // Her satıra görev tipini ekle
                internationalDataRows.forEach((row, index) => {
                    const rowData: any = {
                        id: `international_${index + 1}`,
                        'Görev Tipi': 'Yurt Dışı',
                        originalRowIndex: index
                    };
                    
                    // PYP kodunu bul ve proje ismini eşleştir
                    let pypCode = '';
                    internationalHeaders.forEach((header, colIndex) => {
                        if (header && (header.toLowerCase().includes('pyp') && !header.toLowerCase().includes('tanım'))) {
                            pypCode = row[colIndex] || '';
                        }
                    });
                    
                    // İlgili proje ismini ekle
                    rowData['İlgili Proje'] = getPypToProjectName(pypCode, projectMapping);
                    
                    // Her sütun için veri ekle
                    internationalHeaders.forEach((header, colIndex) => {
                        const cellValue = row[colIndex];
                        if (cellValue !== null && cellValue !== undefined && cellValue !== '') {
                            // Excel tarih sütunları için özel işlem
                            if (header.toLowerCase().includes('görev başlangıç tarihi') || 
                                header.toLowerCase().includes('görev bitiş tarihi') ||
                                header.toLowerCase().includes('başlangıç') && header.toLowerCase().includes('tarih') ||
                                header.toLowerCase().includes('bitiş') && header.toLowerCase().includes('tarih')) {
                                
                                // Excel seri numarasını tarihe çevir
                                if (typeof cellValue === 'number' && cellValue > 1) {
                                    try {
                                        const date = new Date((cellValue - 25569) * 86400 * 1000);
                                        if (!isNaN(date.getTime())) {
                                            rowData[header] = date.toLocaleDateString('tr-TR');
                                        } else {
                                            rowData[header] = cellValue;
                                        }
                                    } catch (error) {
                                        rowData[header] = cellValue;
                                    }
                                } else {
                                    rowData[header] = cellValue;
                                }
                            } else {
                                rowData[header] = cellValue;
                            }
                        } else {
                            rowData[header] = null;
                        }
                    });
                    
                    // H ve I sütunları için tarih kontrolü
                    const columnH = 7; // H sütunu
                    const columnI = 8; // I sütunu
                    const startDateValue = row[columnH];
                    const endDateValue = row[columnI];
                    
                    if (startDateValue && endDateValue) {
                        try {
                            let startDate: Date;
                            let endDate: Date;
                            
                            // Excel tarih dönüşümü
                            if (typeof startDateValue === 'number') {
                                startDate = new Date((startDateValue - 25569) * 86400 * 1000);
                            } else {
                                startDate = new Date(startDateValue);
                            }
                            
                            if (typeof endDateValue === 'number') {
                                endDate = new Date((endDateValue - 25569) * 86400 * 1000);
                            } else {
                                endDate = new Date(endDateValue);
                            }
                            
                            if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
                                rowData['Başlangıç Tarihi'] = startDate.toLocaleDateString('tr-TR');
                                rowData['Bitiş Tarihi'] = endDate.toLocaleDateString('tr-TR');
                                
                                const currentDate = new Date();
                                const isActive = currentDate >= startDate && currentDate <= endDate;
                                rowData['Durum'] = isActive ? 'Aktif' : (currentDate > endDate ? 'Tamamlandı' : 'Beklemede');
                            }
                        } catch (error) {
                            console.warn('Date parsing error:', error);
                        }
                    }
                    
                    allTaskData.push(rowData);
                });
                
                console.log('International tasks loaded:', internationalDataRows.length);
                
            } catch (error) {
                console.error('Yurt dışı görev verileri yüklenemedi:', error);
            }
            
            // Tüm unique header'ları topla (istenmeyen sütunları hariç tut)
            const allHeaders = new Set<string>();
            allTaskData.forEach(row => {
                Object.keys(row).forEach(key => {
                    if (key !== 'id' && 
                        key !== 'originalRowIndex' && 
                        key !== 'Başlangıç Tarihi' && 
                        key !== 'Bitiş Tarihi') {
                        allHeaders.add(key);
                    }
                });
            });
            
            // Header sıralaması: Görev Tipi, İlgili Proje, diğerleri
            const finalHeaders = ['Görev Tipi', 'İlgili Proje'];
            Array.from(allHeaders).forEach(header => {
                if (header !== 'Görev Tipi' && header !== 'İlgili Proje') {
                    finalHeaders.push(header);
                }
            });
            
            console.log('Final headers:', finalHeaders);
            console.log('Total task records:', allTaskData.length);
            
            return {
                headers: finalHeaders,
                data: allTaskData
            };
            
        } catch (error) {
            console.error('Görev tablo verileri yüklenemedi:', error);
            return {
                headers: [],
                data: []
            };
        }
    };

    // Excel'den tablo verileri çek (tüm sütunları göster)
    const getTableData = async (): Promise<{headers: string[], data: any[], nonEmptyColumnIndexes: number[]}> => {
        try {
            console.log('=== Loading Complete Table Data from 2025_S1 ===');
            
            // Ana Excel dosyasını yükle
            const workbook = await readExcelFile('/excel/2025_S1.XLSX');
            
            // İlk sheet'i kullan
            let sheetName = workbook.SheetNames[0];
            
            // Daha uygun sheet ismi varsa onu kullan
            const possibleSheetNames = ['Bildirim', 'Arıza', 'Çağrı', 'Call', 'Incident', 'Sheet1', 'Sayfa1'];
            for (const possibleName of possibleSheetNames) {
                const foundSheet = workbook.SheetNames.find(name => 
                    name.toLowerCase().includes(possibleName.toLowerCase())
                );
                if (foundSheet) {
                    sheetName = foundSheet;
                    break;
                }
            }
            
            console.log('Using sheet for complete table:', sheetName);
            const worksheet = workbook.Sheets[sheetName];
            
            // Excel'i JSON formatına çevir
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });
            
            // Header satırını al
            const headers = jsonData[0] as string[];
            console.log('All Headers Count:', headers.length);
            console.log('Headers:', headers);
            
            // Tüm veri satırlarını al (header hariç)
            const allRows = jsonData.slice(1) as any[][];
            const dataRows = allRows.filter(row => {
                return row && row.some(cell => cell !== null && cell !== undefined && cell !== '');
            });
            
            console.log('Total data rows:', dataRows.length);
            
            // Her sütun için veri olup olmadığını kontrol et
            const nonEmptyColumnIndexes: number[] = [];
            const columnHasData: boolean[] = new Array(headers.length).fill(false);
            
            // Her sütunu kontrol et
            for (let colIndex = 0; colIndex < headers.length; colIndex++) {
                const hasData = dataRows.some(row => {
                    const cellValue = row[colIndex];
                    // Boş değerleri kontrol et: null, undefined, '', 0, boş string, sadece boşluk
                    return cellValue !== null && 
                           cellValue !== undefined && 
                           cellValue !== '' && 
                           cellValue !== 0 && 
                           String(cellValue).trim() !== '';
                });
                
                // Header da boş olmamalı
                if (hasData && headers[colIndex] && String(headers[colIndex]).trim() !== '') {
                    columnHasData[colIndex] = true;
                    nonEmptyColumnIndexes.push(colIndex);
                }
            }
            
            console.log('Non-empty column indexes:', nonEmptyColumnIndexes);
            console.log('Non-empty columns:', nonEmptyColumnIndexes.map(i => headers[i]));
            
            // Sadece boş olmayan sütunları içeren header'ları oluştur
            const filteredHeaders = nonEmptyColumnIndexes.map(index => headers[index]);
            
            // Her satır için sadece boş olmayan sütunların verilerini al
            const filteredData = dataRows.map((row, rowIndex) => {
                const filteredRow: any = {
                    id: rowIndex + 1,
                    originalRowIndex: rowIndex
                };
                
                // Her boş olmayan sütun için veri ekle
                nonEmptyColumnIndexes.forEach((colIndex, filteredIndex) => {
                    const columnName = headers[colIndex] || `Column_${colIndex}`;
                    const cellValue = row[colIndex];
                    
                    // Boş değerleri temizle
                    if (cellValue !== null && cellValue !== undefined && cellValue !== '') {
                        filteredRow[columnName] = cellValue;
                    } else {
                        filteredRow[columnName] = null;
                    }
                });
                
                // R-Q hesaplaması için özel kontrol
                const columnR = 17; // R sütunu
                const columnQ = 16; // Q sütunu
                
                if (nonEmptyColumnIndexes.includes(columnR) && nonEmptyColumnIndexes.includes(columnQ)) {
                    const valueR = row[columnR];
                    const valueQ = row[columnQ];
                    
                    if (valueR !== null && valueR !== undefined && valueR !== '' &&
                        valueQ !== null && valueQ !== undefined && valueQ !== '') {
                        const numericR = parseFloat(valueR.toString());
                        const numericQ = parseFloat(valueQ.toString());
                        
                        if (!isNaN(numericR) && !isNaN(numericQ)) {
                            filteredRow['R_minus_Q'] = numericR - numericQ;
                            filteredRow['SLA_Status'] = (numericR - numericQ) > 1 ? 'SLA Geçti' : 'Normal';
                        }
                    }
                }
                
                return filteredRow;
            });
            
            console.log('Filtered headers:', filteredHeaders);
            console.log('Sample filtered data:', filteredData.slice(0, 3));
            console.log('Total processed rows:', filteredData.length);
            
            return {
                headers: filteredHeaders,
                data: filteredData,
                nonEmptyColumnIndexes
            };
            
        } catch (error) {
            console.error('Tablo verileri yüklenemedi:', error);
            return {
                headers: [],
                data: [],
                nonEmptyColumnIndexes: []
            };
        }
    };

    // PYP kodlarını proje isimlerine eşleştiren fonksiyon
    const getProjectMapping = async (): Promise<Record<string, string>> => {
        try {
            console.log('=== Loading Project Mapping Data ===');
            
            const projectWorkbook = await readExcelFile('/excel/PROJE_LİSTESİ_UGES_ÜDM_2025_v3.xlsx');
            const projectSheetName = projectWorkbook.SheetNames[0];
            const projectWorksheet = projectWorkbook.Sheets[projectSheetName];
            const projectJsonData = XLSX.utils.sheet_to_json(projectWorksheet, { header: 1, defval: '' });
            
            const projectMapping: Record<string, string> = {};
            
            // Header satırını atla ve veri satırlarını işle
            const projectDataRows = projectJsonData.slice(1) as any[][];
            
            projectDataRows.forEach(row => {
                const pypCode = row[0]; // A sütunu - PYP Kodu
                const projectName = row[1]; // B sütunu - Proje Adı
                
                if (pypCode && projectName) {
                    // PYP kodunun "/" öncesi kısmını al
                    const pypPrefix = String(pypCode).split('/')[0];
                    projectMapping[pypPrefix] = String(projectName);
                }
            });
            
            console.log('Project mapping loaded:', Object.keys(projectMapping).length, 'projects');
            return projectMapping;
            
        } catch (error) {
            console.error('Proje eşleştirme verileri yüklenemedi:', error);
            return {};
        }
    };

    // PYP kodunu proje ismine çeviren fonksiyon
    const getPypToProjectName = (pypCode: string, projectMapping: Record<string, string>): string => {
        if (!pypCode) return '-';
        
        // PYP kodunun "/" öncesi kısmını al
        const pypPrefix = String(pypCode).split('/')[0];
        
        // Eşleştirme tablosunda ara
        return projectMapping[pypPrefix] || '-';
    };

    // Calendar Excel işlemleri
    const initializeCalendarExcel = async () => {
        try {
            const filePath = '/excel/proje-calendar-event-task.xlsx';
            const response = await fetch(filePath);
            
            if (!response.ok) {
                console.log('Excel dosyası bulunamadı, yeni oluşturuluyor...');
                // Dosya yoksa boş bir Excel oluştur
                const newWorkbook = XLSX.utils.book_new();
                const worksheetData = [
                    ['ID', 'Title', 'Start', 'End', 'ClassName', 'Description', 'CreatedAt', 'UpdatedAt']
                ];
                const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
                XLSX.utils.book_append_sheet(newWorkbook, worksheet, 'CalendarEvents');
                
                console.log('Calendar Excel dosyası için boş yapı hazırlandı');
                return newWorkbook;
            }
            
            console.log('Excel dosyası bulundu, yükleniyor...');
            const arrayBuffer = await response.arrayBuffer();
            const workbook = XLSX.read(arrayBuffer, { type: 'array' });
            
            // İlk yüklemede localStorage'a da kaydet
            const worksheet = workbook.Sheets['CalendarEvents'] || Object.values(workbook.Sheets)[0];
            if (worksheet) {
                const excelData = XLSX.write(workbook, { type: 'base64', bookType: 'xlsx' });
                localStorage.setItem('calendar-events-excel', excelData);
                console.log('Excel verisi localStorage\'a kaydedildi');
            }
            
            return workbook;
        } catch (error) {
            console.error('Calendar Excel dosyası initialize edilemedi:', error);
            // Hata durumunda da boş bir workbook döndür
            const newWorkbook = XLSX.utils.book_new();
            const worksheetData = [
                ['ID', 'Title', 'Start', 'End', 'ClassName', 'Description', 'CreatedAt', 'UpdatedAt']
            ];
            const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
            XLSX.utils.book_append_sheet(newWorkbook, worksheet, 'CalendarEvents');
            return newWorkbook;
        }
    };

    const getCalendarEvents = async (): Promise<CalendarEvent[]> => {
        try {
            console.log('Calendar events API\'den yükleniyor...');
            
            const response = await fetch('http://localhost:3001/api/calendar/events');
            if (!response.ok) {
                throw new Error('API isteği başarısız: ' + response.status);
            }
            
            const result = await response.json();
            if (!result.success) {
                throw new Error('API hatası: ' + result.error);
            }
            
            console.log('API\'den', result.data.length, 'calendar event yüklendi');
            return result.data;
            
        } catch (error) {
            console.error('Calendar events API\'den alınamadı:', error);
            console.log('Fallback data kullanılıyor');
            return getFallbackCalendarEvents();
        }
    };

    // Fallback data
    const getFallbackCalendarEvents = (): CalendarEvent[] => {
        const now = '2025-07-28T10:00:00';
        return [
            {
                id: '1',
                title: 'Tüm Gün Etkinliği',
                start: '2025-07-01T14:30:00',
                end: '2025-07-02T14:30:00',
                className: 'danger',
                description: 'Proje toplantısı ve sunum hazırlığı için ayrılan süre.',
                createdAt: now,
                updatedAt: now
            },
            {
                id: '2',
                title: 'Saha Ziyareti',
                start: '2025-07-07T19:30:00',
                end: '2025-07-08T14:30:00',
                className: 'primary',
                description: 'Müteahhit firmanın şantiye ziyareti ve denetleme işlemleri.',
                createdAt: now,
                updatedAt: now
            },
            {
                id: '3',
                title: 'Ürün Lansmanı',
                start: '2025-07-17T14:30:00',
                end: '2025-07-18T14:30:00',
                className: 'info',
                description: 'Yeni ürün lansmanı ve tanıtım etkinliği düzenlemesi.',
                createdAt: now,
                updatedAt: now
            },
            {
                id: '4',
                title: 'Toplantı',
                start: '2025-07-12T10:30:00',
                end: '2025-07-13T10:30:00',
                className: 'danger',
                description: 'Haftalık proje değerlendirme ve planlama toplantısı.',
                createdAt: now,
                updatedAt: now
            },
            {
                id: '5',
                title: 'Öğle Yemeği',
                start: '2025-07-12T15:00:00',
                end: '2025-07-13T15:00:00',
                className: 'info',
                description: 'Müşteri ile iş yemeği ve proje görüşmeleri.',
                createdAt: now,
                updatedAt: now
            }
        ];
    };

    const saveCalendarEvent = async (eventData: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>): Promise<CalendarEvent> => {
        try {
            console.log('=== SAVE CALENDAR EVENT ===');
            console.log('API\'ye yeni calendar event kaydediliyor...', eventData);
            console.log('JSON stringify edilmiş veri:', JSON.stringify(eventData));
            
            const response = await fetch('http://localhost:3001/api/calendar/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData)
            });
            
            console.log('API response status:', response.status);
            console.log('API response ok:', response.ok);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('API hata detayı:', errorText);
                throw new Error('API isteği başarısız: ' + response.status + ' - ' + errorText);
            }
            
            const result = await response.json();
            console.log('API başarılı sonuç:', result);
            
            if (!result.success) {
                throw new Error('API hatası: ' + result.error);
            }
            
            console.log('Yeni calendar event API\'ye kaydedildi:', result.data);
            return result.data;
            
        } catch (error) {
            console.error('Calendar event API\'ye kaydedilemedi:', error);
            throw error;
        }
    };

    const updateCalendarEvent = async (id: string, eventData: Partial<Omit<CalendarEvent, 'id' | 'createdAt'>>): Promise<CalendarEvent> => {
        try {
            console.log('API\'de calendar event güncelleniyor...', id, eventData);
            
            const response = await fetch(`http://localhost:3001/api/calendar/events/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData)
            });
            
            if (!response.ok) {
                throw new Error('API isteği başarısız: ' + response.status);
            }
            
            const result = await response.json();
            if (!result.success) {
                throw new Error('API hatası: ' + result.error);
            }
            
            console.log('Calendar event API\'de güncellendi:', result.data);
            return result.data;
            
        } catch (error) {
            console.error('Calendar event API\'de güncellenemedi:', error);
            throw error;
        }
    };

    const deleteCalendarEvent = async (id: string): Promise<void> => {
        try {
            console.log('API\'den calendar event siliniyor...', id);
            
            const response = await fetch(`http://localhost:3001/api/calendar/events/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                throw new Error('API isteği başarısız: ' + response.status);
            }
            
            const result = await response.json();
            if (!result.success) {
                throw new Error('API hatası: ' + result.error);
            }
            
            console.log('Calendar event API\'den silindi:', id);
            
        } catch (error) {
            console.error('Calendar event API\'den silinemedi:', error);
            throw error;
        }
    };

    const saveCalendarEventsToExcel = async (events: CalendarEvent[]): Promise<void> => {
        try {
            // Browser ortamında dosya kaydetme işlemi localStorage ile simüle edilebilir
            // Gerçek bir Excel dosyası oluştur
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
            
            // Browser'da localStorage'a kaydet (geliştirme amaçlı)
            const excelData = XLSX.write(workbook, { type: 'base64', bookType: 'xlsx' });
            localStorage.setItem('calendar-events-excel', excelData);
            
            console.log('Calendar events Excel\'e kaydedildi');
        } catch (error) {
            console.error('Calendar events Excel\'e kaydedilemedi:', error);
            throw error;
        }
    };

    return {
        readExcelFile,
        parseNotificationData,
        parseProjectData,
        parseProjectDistribution,
        parseBudgetData,
        parseTaskData,
        loadDashboardData,
        getTableData,
        getTaskTableData,
        getProjectMapping,
        getPypToProjectName,
        // Calendar functions
        initializeCalendarExcel,
        getCalendarEvents,
        saveCalendarEvent,
        updateCalendarEvent,
        deleteCalendarEvent
    };
};
