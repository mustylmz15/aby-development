import { ref, computed } from 'vue'
import * as XLSX from 'xlsx'

export const useProjectStats = () => {
    const projects = ref<any[]>([])
    const isLoading = ref(false)

    // Excel'den proje verilerini yükle
    const loadProjectsFromExcel = async () => {
        isLoading.value = true
        try {
            const response = await fetch('/excel/PROJE_LİSTESİ_UGES_ÜDM_2025_v3.xlsx')
            const buffer = await response.arrayBuffer()
            const workbook = XLSX.read(buffer, { type: 'array' })
            const worksheet = workbook.Sheets[workbook.SheetNames[0]]

            const loadedProjects: any[] = []
            let row = 2

            while (true) {
                const projeKoduCell = worksheet[`A${row}`]
                if (!projeKoduCell || !projeKoduCell.v) break

                // C ve D kolonlarından tarihleri oku
                const garantiBaslangicCell = worksheet[`C${row}`]
                const garantiBitisCell = worksheet[`D${row}`]
                
                // B kolunundan proje adını oku
                const projeAdiCell = worksheet[`B${row}`]
                let projeAdi = 'Belirtilmemiş'
                if (projeAdiCell && projeAdiCell.v) {
                    projeAdi = projeAdiCell.v.toString()
                }

                let garantiBitis = 'Belirtilmemiş'
                let garantiBaslangic = 'Belirtilmemiş'

                if (garantiBitisCell && garantiBitisCell.v) {
                    const value = garantiBitisCell.v
                    if (typeof value === 'number') {
                        const date = new Date((value - 25569) * 86400 * 1000)
                        garantiBitis = date.toLocaleDateString('tr-TR')
                    } else if (typeof value === 'string') {
                        garantiBitis = value
                    }
                }

                if (garantiBaslangicCell && garantiBaslangicCell.v) {
                    const value = garantiBaslangicCell.v
                    if (typeof value === 'number') {
                        const date = new Date((value - 25569) * 86400 * 1000)
                        garantiBaslangic = date.toLocaleDateString('tr-TR')
                    } else if (typeof value === 'string') {
                        garantiBaslangic = value
                    }
                }

                // Proje gecikme durumunu hesapla
                const calculateProjeGecikmeDurumu = (garantiBitisTarihi: string): string => {
                    if (!garantiBitisTarihi || garantiBitisTarihi === 'Belirtilmemiş') {
                        return 'Belirtilmemiş'
                    }

                    const parseDate = (dateStr: string): Date | null => {
                        const parts = dateStr.split('.')
                        if (parts.length === 3) {
                            const day = parseInt(parts[0])
                            const month = parseInt(parts[1]) - 1
                            const year = parseInt(parts[2])
                            return new Date(year, month, day)
                        }
                        return null
                    }

                    const garantiDate = parseDate(garantiBitisTarihi)
                    if (!garantiDate) return 'Belirtilmemiş'

                    const today = new Date()
                    const oneYearBefore = new Date(garantiDate)
                    oneYearBefore.setFullYear(oneYearBefore.getFullYear() - 1)

                    if (today > garantiDate) {
                        return 'Gecikmiş'
                    } else {
                        return 'Zamanında'
                    }
                }

                const hesaplananProjeGecikmeDurumu = calculateProjeGecikmeDurumu(garantiBitis)

                const newProject = {
                    id: projeKoduCell.v.toString(),
                    projeKodu: projeKoduCell.v.toString(),
                    projeAdi: projeAdi,
                    garantiBitisTarihi: garantiBitis,
                    garantiBaslangicTarihi: garantiBaslangic,
                    projeGecikmeDurumu: hesaplananProjeGecikmeDurumu,
                    kurulumSorumluBirimi: 'Belirtilmemiş' // Şimdilik Excel'den gelmiyor
                }

                loadedProjects.push(newProject)
                row++
            }

            projects.value = loadedProjects
            console.log(`${loadedProjects.length} proje yüklendi`)

        } catch (error) {
            console.error('Excel yükleme hatası:', error)
        } finally {
            isLoading.value = false
        }
    }

    // Proje istatistiklerini hesapla
    const projectStats = computed(() => {
        if (projects.value.length === 0) {
            return {
                delayed: 35,    // Mock değer
                ontrack: 45,    // Mock değer  
                completed: 20   // Mock değer
            }
        }

        const total = projects.value.length
        const delayed = projects.value.filter(p => p.projeGecikmeDurumu === 'Gecikmiş').length
        const ontrack = projects.value.filter(p => p.projeGecikmeDurumu === 'Zamanında').length
        const completed = projects.value.filter(p => p.projeGecikmeDurumu === 'Tamamlandı').length

        return {
            delayed: Math.round((delayed / total) * 100),
            ontrack: Math.round((ontrack / total) * 100),
            completed: Math.round((completed / total) * 100)
        }
    })

    // Toplam proje sayısı
    const totalProjects = computed(() => projects.value.length || 85)

    // Proje dağılımı için gerçek veriler (proje-özeti.vue sayfasındaki veriler)
    const mockProjectsForDistribution = [
        {
            id: 'PSE5924',
            projeKodu: 'PSE5924',
            kurulumSorumluBirimi: 'Güvenlik Sistemleri Program Direktörlüğü'
        },
        {
            id: 'PSE8941',
            projeKodu: 'PSE8941',
            kurulumSorumluBirimi: 'Entegre Lojistik Destek Direktörlüğü'
        },
        {
            id: 'PSE8361',
            projeKodu: 'PSE8361',
            kurulumSorumluBirimi: 'Tasarım Mühendisliği Direktörlüğü'
        },
        {
            id: 'PSE7141',
            projeKodu: 'PSE7141',
            kurulumSorumluBirimi: 'Ulaşım ve Enerji Sistemleri Program Direktörlüğü'
        }
    ]

    // Proje dağılımını hesapla (kurulum sorumlu birime göre)
    const projectDistribution = computed(() => {
        // Mock verilerden hesapla (proje-özeti sayfasındaki gibi)
        const validProjects = mockProjectsForDistribution.filter(p => 
            p.kurulumSorumluBirimi && 
            p.kurulumSorumluBirimi !== 'Belirtilmemiş'
        )

        const total = validProjects.length
        
        const eld = validProjects.filter(p => 
            p.kurulumSorumluBirimi?.includes('Entegre Lojistik Destek')
        ).length
        
        const security = validProjects.filter(p => 
            p.kurulumSorumluBirimi?.includes('Güvenlik Sistemleri')
        ).length
        
        const health = validProjects.filter(p => 
            p.kurulumSorumluBirimi?.includes('Tasarım Mühendisliği')
        ).length
        
        const transport = validProjects.filter(p => 
            p.kurulumSorumluBirimi?.includes('Ulaşım ve Enerji')
        ).length

        return {
            eld: Math.round((eld / total) * 100),
            security: Math.round((security / total) * 100),
            health: Math.round((health / total) * 100),
            transport: Math.round((transport / total) * 100)
        }
    })

    return {
        loadProjectsFromExcel,
        projectStats,
        projectDistribution,
        totalProjects,
        isLoading,
        projects  // Proje listesini de return et
    }
}
