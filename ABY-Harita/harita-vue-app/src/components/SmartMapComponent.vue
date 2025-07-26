<template>
  <div class="smart-map-container">
    <!-- Harita Container -->
    <div id="smart-map" ref="mapContainer"></div>
    
    <!-- Yükseklik Kontur Toggle Butonu -->
    <div class="elevation-toggle-container">
      <button 
        @click="toggleElevationContours" 
        class="elevation-toggle-btn"
        :class="{ active: showElevationContours }"
      >
        <span class="elevation-icon">🏔️</span>
        <span class="elevation-text">Yükseklik Konturları</span>
      </button>
    </div>
    
    <!-- Gölgelendirme Toggle Butonu -->
    <div class="shadow-toggle-container">
      <button 
        @click="toggleShadowing" 
        class="shadow-toggle-btn"
        :class="{ active: showShadowing }"
      >
        <span class="shadow-icon">🌄</span>
        <span class="shadow-text">Gölgelendirme</span>
      </button>
    </div>
    
    <!-- Su Kütleleri Toggle Butonu -->
    <div class="water-toggle-container">
      <button 
        @click="toggleWaterBodies" 
        class="water-toggle-btn"
        :class="{ active: showWaterBodies }"
      >
        <span class="water-icon">🌊</span>
        <span class="water-text">Su Kütleleri</span>
      </button>
    </div>
    
    <!-- Nehirler Toggle Butonu -->
    <div class="rivers-toggle-container">
      <button 
        @click="toggleRivers" 
        class="rivers-toggle-btn"
        :class="{ active: showRivers }"
      >
        <span class="rivers-icon">💧</span>
        <span class="rivers-text">Nehirler</span>
      </button>
    </div>
    
    <!-- Dağ Tepeleri Toggle Butonu -->
    <div class="peaks-toggle-container">
      <button 
        @click="togglePeaks" 
        class="peaks-toggle-btn"
        :class="{ active: showPeaks }"
      >
        <span class="peaks-icon">⛰️</span>
        <span class="peaks-text">Dağ Tepeleri</span>
      </button>
    </div>
    
    <!-- Analiz Panel Toggle Butonu -->
    <div class="analysis-toggle-container">
      <button 
        @click="toggleDataAnalysis" 
        class="analysis-toggle-btn"
        :class="{ active: showDataAnalysis }"
      >
        <span class="analysis-icon">📊</span>
        <span class="analysis-text">Veri Analizi</span>
      </button>
    </div>
    
    <!-- Arama Panel Toggle Butonu -->
    <div class="search-toggle-container">
      <button 
        @click="toggleAdvancedSearch" 
        class="search-toggle-btn"
        :class="{ active: showAdvancedSearch }"
      >
        <span class="search-icon">🔍</span>
        <span class="search-text">Gelişmiş Arama</span>
      </button>
    </div>
    
    <!-- Data Analysis Panel -->
    <DataAnalysisPanel 
      :isVisible="showDataAnalysis"
      :selectedRegion="selectedAnalysisRegion"
      @close="showDataAnalysis = false"
      @analyze-area="handleAnalyzeArea"
      @export-data="handleExportData"
      @generate-report="handleGenerateReport"
    />
    
    <!-- Advanced Search Panel -->
    <AdvancedSearchPanel 
      :isVisible="showAdvancedSearch"
      @close="showAdvancedSearch = false"
      @search-coordinates="handleCoordinateSearch"
      @search-address="handleAddressSearch"
      @search-poi="handlePOISearch"
    />
    
    <!-- KGYS Proje Modal -->
    <div v-if="showProjectModal" class="modal-overlay" @click="closeProjectModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>{{ selectedProjectData?.name }}</h2>
          <h3>{{ selectedProjectData?.title }}</h3>
          <button class="close-button" @click="closeProjectModal">×</button>
        </div>
        
        <div class="modal-body">
          <div class="project-info">
            <div class="status-row">
              <span class="status-label">Proje Durumu:</span>
              <span class="status-value active">{{ selectedProjectData?.status }}</span>
            </div>
            <div class="completion-row">
              <span class="completion-label">Tamamlanma:</span>
              <span class="completion-value">{{ selectedProjectData?.completion }}</span>
            </div>
            <div class="update-row">
              <span class="update-label">Son Güncelleme:</span>
              <span class="update-value">{{ selectedProjectData?.lastUpdate }}</span>
            </div>
          </div>
          
          <div class="stats-grid">
            <div 
              v-for="stat in selectedProjectData?.stats" 
              :key="stat.label"
              class="stat-card"
            >
              <div class="stat-icon">{{ stat.icon }}</div>
              <div class="stat-info">
                <div class="stat-value">{{ stat.value }}</div>
                <div class="stat-unit">{{ stat.unit }}</div>
                <div class="stat-label">{{ stat.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- KGYS Nokta Detay Modal -->
    <div v-if="showKgysPointModal" class="kgys-point-modal-overlay" @click="closeKgysPointModal">
      <div class="kgys-point-modal-content" @click.stop>
        <div class="kgys-point-modal-header">
          <h2>📍 {{ selectedKgysPoint?.name }}</h2>
          <button class="kgys-point-modal-close" @click="closeKgysPointModal">✕</button>
        </div>
        
        <div class="kgys-point-modal-body">
          <!-- Sistem Durum Bilgileri -->
          <div class="kgys-section">
            <div class="kgys-section-header">
              <h3>🔧 SİSTEM DURUM BİLGİLERİ</h3>
              <button class="kgys-toggle-btn">📊</button>
            </div>
            <div class="kgys-table-container">
              <table class="kgys-table">
                <thead>
                  <tr>
                    <th>Sıra No</th>
                    <th>Cihaz Adı</th>
                    <th>Sektör</th>
                    <th>Açıklama</th>
                    <th>Durum</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="system in selectedKgysPoint?.systemData" :key="system.id">
                    <td>{{ system.id }}</td>
                    <td>{{ system.systemName }}</td>
                    <td>{{ system.sector }}</td>
                    <td>{{ system.description }}</td>
                    <td>
                      <span :class="getStatusClass(system.status)">
                        {{ system.status }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Konsinye Sistem Bilgisi -->
          <div class="kgys-section">
            <div class="kgys-section-header">
              <h3>📦 KONSİNYE SİSTEM BİLGİSİ</h3>
              <button class="kgys-toggle-btn">📊</button>
            </div>
            <div class="kgys-table-container">
              <table class="kgys-table">
                <thead>
                  <tr>
                    <th>Sıra No</th>
                    <th>Ekipman Adı</th>
                    <th>Sektör</th>
                    <th>Alt Malzeme</th>
                    <th>Durum</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="equipment in selectedKgysPoint?.equipmentData" :key="equipment.id">
                    <td>{{ equipment.id }}</td>
                    <td>{{ equipment.equipment }}</td>
                    <td>{{ equipment.sector }}</td>
                    <td>{{ equipment.description }}</td>
                    <td>
                      <span :class="getStatusClass(equipment.status)">
                        {{ equipment.status }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Personel Durum Bilgileri -->
          <div class="kgys-section">
            <div class="kgys-section-header">
              <h3>👥 PERSONEL DURUM BİLGİLERİ</h3>
              <button class="kgys-toggle-btn">📊</button>
            </div>
            <div class="kgys-table-container">
              <table class="kgys-table">
                <thead>
                  <tr>
                    <th>Sıra No</th>
                    <th>Personel Adı Soyadı</th>
                    <th>Bölüm</th>
                    <th>Açıklama</th>
                    <th>Durum</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="person in selectedKgysPoint?.personnelData" :key="person.id">
                    <td>{{ person.id }}</td>
                    <td>{{ person.name }}</td>
                    <td>{{ person.department }}</td>
                    <td>{{ person.position }}</td>
                    <td>
                      <span :class="getStatusClass(person.status)">
                        {{ person.status }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- UI Overlay -->
    <MapUIOverlay 
      :navigation="navigation"
      :selected-project="selectedProject"
      @go-back="smartGoBack"
      @project-change="onProjectChange"
    />
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import maplibregl from 'maplibre-gl'
import { useSmartMap } from '@/composables/useSmartMap.js'
import MapUIOverlay from '@/components/MapUIOverlay.vue'
import DataAnalysisPanel from '@/components/DataAnalysisPanel.vue'
import AdvancedSearchPanel from '@/components/AdvancedSearchPanel.vue'

export default {
  name: 'SmartMapComponent',
  components: {
    MapUIOverlay,
    DataAnalysisPanel,
    AdvancedSearchPanel
  },
  setup() {
    const mapContainer = ref(null)
    const selectedProject = ref('')
    const showKgysPointModal = ref(false)
    const selectedKgysPoint = ref(null)
    const showElevationContours = ref(false) // Yükseklik kontur çizgileri toggle durumu - varsayılan kapalı
    const showShadowing = ref(false) // Gölgelendirme toggle durumu - varsayılan kapalı
    const showWaterBodies = ref(false) // Su kütleleri toggle durumu - varsayılan kapalı
    const showRivers = ref(false) // Nehirler toggle durumu - varsayılan kapalı
    const showPeaks = ref(false) // Dağ tepeleri toggle durumu - varsayılan kapalı
    const showDataAnalysis = ref(false) // Veri analizi paneli - varsayılan kapalı
    const showAdvancedSearch = ref(false) // Gelişmiş arama paneli - varsayılan kapalı
    const selectedAnalysisRegion = ref(null) // Seçili analiz bölgesi
    
    // Smart Map Composable'ı kullan
    const {
      map,
      mapLoaded,
      navigation,
      smartSelectProvince,
      smartSelectDistrict,
      smartGoBack,
      updateZoom,
      resetHighlights,
      martinUrl
    } = useSmartMap()

    // Demo veri setleri
    const kgysNoktaGeoJSON = {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [37.9985, 38.3440] // Akçadağ orijinal koordinatları
          },
          'properties': {
            'name': 'Akçadağ Yolu Belediye Önü'
          }
        }
      ]
    }

    // KGYS projesi olan iller (Kocaeli hariç tüm iller - 80 il)
    const kgysProvinces = [
      { name: 'Adana', coords: [35.3213, 37.0000] },
      { name: 'Adıyaman', coords: [38.2786, 37.7648] },
      { name: 'Afyonkarahisar', coords: [30.5387, 38.7507] },
      { name: 'Ağrı', coords: [43.0518, 39.7191] },
      { name: 'Amasya', coords: [35.8353, 40.6499] },
      { name: 'Ankara', coords: [32.8597, 39.9334] },
      { name: 'Antalya', coords: [30.7133, 36.8969] },
      { name: 'Artvin', coords: [41.8183, 41.1828] },
      { name: 'Aydın', coords: [27.8414, 37.8444] },
      { name: 'Balıkesir', coords: [27.8826, 39.6484] },
      { name: 'Bilecik', coords: [29.9833, 40.1417] },
      { name: 'Bingöl', coords: [40.4986, 38.8854] },
      { name: 'Bitlis', coords: [42.1072, 38.3938] },
      { name: 'Bolu', coords: [31.6061, 40.7394] },
      { name: 'Burdur', coords: [30.2900, 37.7200] },
      { name: 'Bursa', coords: [29.0601, 40.1826] },
      { name: 'Çanakkale', coords: [26.4142, 40.1553] },
      { name: 'Çankırı', coords: [33.6134, 40.6013] },
      { name: 'Çorum', coords: [34.9556, 40.5506] },
      { name: 'Denizli', coords: [29.0875, 37.7648] },
      { name: 'Diyarbakır', coords: [40.2306, 37.9144] },
      { name: 'Edirne', coords: [26.5557, 41.6818] },
      { name: 'Elazığ', coords: [39.2464, 38.6810] },
      { name: 'Erzincan', coords: [39.7500, 39.7500] },
      { name: 'Erzurum', coords: [41.2769, 39.9334] },
      { name: 'Eskişehir', coords: [30.5206, 39.7767] },
      { name: 'Gaziantep', coords: [37.3781, 37.0662] },
      { name: 'Giresun', coords: [38.3895, 40.9128] },
      { name: 'Gümüşhane', coords: [39.4608, 40.4386] },
      { name: 'Hakkâri', coords: [43.7209, 37.5833] },
      { name: 'Hatay', coords: [36.4018, 36.4018] },
      { name: 'Isparta', coords: [30.5566, 37.7648] },
      { name: 'Mersin', coords: [34.6396, 36.8121] },
      { name: 'İstanbul', coords: [28.9784, 41.0082] },
      { name: 'İzmir', coords: [27.1428, 38.4237] },
      { name: 'Kars', coords: [43.0975, 40.6013] },
      { name: 'Kastamonu', coords: [33.7827, 41.3887] },
      { name: 'Kayseri', coords: [35.4826, 38.7312] },
      { name: 'Kırklareli', coords: [27.2333, 41.7333] },
      { name: 'Kırşehir', coords: [34.1709, 39.1425] },
      { name: 'Konya', coords: [32.4846, 37.8746] },
      { name: 'Kütahya', coords: [29.9833, 39.4167] },
      { name: 'Malatya', coords: [38.3552, 38.3552] },
      { name: 'Manisa', coords: [27.4305, 38.6191] },
      { name: 'Kahramanmaraş', coords: [36.9267, 37.5858] },
      { name: 'Mardin', coords: [40.7245, 37.3212] },
      { name: 'Muğla', coords: [28.3665, 37.2153] },
      { name: 'Muş', coords: [41.7539, 38.9462] },
      { name: 'Nevşehir', coords: [34.7191, 38.6939] },
      { name: 'Niğde', coords: [34.6857, 37.9667] },
      { name: 'Ordu', coords: [37.8764, 40.9839] },
      { name: 'Rize', coords: [40.5234, 41.0201] },
      { name: 'Sakarya', coords: [30.4358, 40.7569] },
      { name: 'Samsun', coords: [36.3350, 41.2867] },
      { name: 'Siirt', coords: [41.9594, 37.9333] },
      { name: 'Sinop', coords: [35.1583, 42.0231] },
      { name: 'Sivas', coords: [37.0179, 39.7477] },
      { name: 'Tekirdağ', coords: [27.5117, 40.9780] },
      { name: 'Tokat', coords: [36.5544, 40.3167] },
      { name: 'Trabzon', coords: [39.7168, 41.0015] },
      { name: 'Tunceli', coords: [39.5401, 39.1079] },
      { name: 'Şanlıurfa', coords: [38.7955, 37.1674] },
      { name: 'Uşak', coords: [29.4058, 38.6823] },
      { name: 'Van', coords: [43.4089, 38.4891] },
      { name: 'Yozgat', coords: [34.8147, 39.8181] },
      { name: 'Zonguldak', coords: [31.7987, 41.4564] },
      { name: 'Aksaray', coords: [34.0370, 38.3687] },
      { name: 'Bayburt', coords: [40.2552, 40.2552] },
      { name: 'Karaman', coords: [33.2287, 37.1759] },
      { name: 'Kırıkkale', coords: [33.5153, 39.8468] },
      { name: 'Batman', coords: [41.1351, 37.8814] },
      { name: 'Şırnak', coords: [42.4918, 37.4187] },
      { name: 'Bartın', coords: [32.3375, 41.6344] },
      { name: 'Ardahan', coords: [42.7022, 41.1105] },
      { name: 'Iğdır', coords: [44.0450, 39.8880] },
      { name: 'Yalova', coords: [29.2769, 40.6560] },
      { name: 'Karabük', coords: [32.6204, 41.2061] },
      { name: 'Kilis', coords: [37.1212, 36.7184] },
      { name: 'Osmaniye', coords: [36.2479, 37.0742] },
      { name: 'Düzce', coords: [31.1565, 40.8438] }
    ]

    // KGYS proje popupları
    const kgysProjectPopups = ref([])
    const kgysDistrictPopups = ref([])
    const selectedProjectData = ref(null)
    const showProjectModal = ref(false)

    // KGYS Proje verileri
    const kgysProjectData = {
      'Malatya': {
        name: 'Malatya İli',
        title: 'KGYS Proje Özeti',
        stats: [
          { icon: '🏢', label: 'KGYS İzleme Merkezi', value: '12', unit: 'Adet' },
          { icon: '⚡', label: '10 kWa UPS', value: '11', unit: 'Adet' },
          { icon: '📍', label: 'KGYS Noktası', value: '500', unit: 'Adet' },
          { icon: '📹', label: 'Hareketli Kamera', value: '457', unit: 'Adet' },
          { icon: '📷', label: 'Sabit Kamera', value: '1633', unit: 'Adet' },
          { icon: '🔌', label: 'C Tipi Ethernet Anahtar', value: '500', unit: 'Adet' },
          { icon: '🔋', label: '1 kWa UPS', value: '500', unit: 'Adet' }
        ],
        status: 'Aktif',
        completion: '95%',
        lastUpdate: '15 Temmuz 2025'
      },
      'İstanbul': {
        name: 'İstanbul İli',
        title: 'KGYS Proje Özeti',
        stats: [
          { icon: '🏢', label: 'KGYS İzleme Merkezi', value: '25', unit: 'Adet' },
          { icon: '⚡', label: '10 kWa UPS', value: '30', unit: 'Adet' },
          { icon: '📍', label: 'KGYS Noktası', value: '1250', unit: 'Adet' },
          { icon: '📹', label: 'Hareketli Kamera', value: '1120', unit: 'Adet' },
          { icon: '📷', label: 'Sabit Kamera', value: '3890', unit: 'Adet' },
          { icon: '🔌', label: 'C Tipi Ethernet Anahtar', value: '1250', unit: 'Adet' },
          { icon: '🔋', label: '1 kWa UPS', value: '1250', unit: 'Adet' }
        ],
        status: 'Aktif',
        completion: '98%',
        lastUpdate: '18 Temmuz 2025'
      },
      'Ankara': {
        name: 'Ankara İli',
        title: 'KGYS Proje Özeti',
        stats: [
          { icon: '🏢', label: 'KGYS İzleme Merkezi', value: '18', unit: 'Adet' },
          { icon: '⚡', label: '10 kWa UPS', value: '22', unit: 'Adet' },
          { icon: '📍', label: 'KGYS Noktası', value: '800', unit: 'Adet' },
          { icon: '📹', label: 'Hareketli Kamera', value: '750', unit: 'Adet' },
          { icon: '📷', label: 'Sabit Kamera', value: '2100', unit: 'Adet' },
          { icon: '🔌', label: 'C Tipi Ethernet Anahtar', value: '800', unit: 'Adet' },
          { icon: '🔋', label: '1 kWa UPS', value: '800', unit: 'Adet' }
        ],
        status: 'Aktif',
        completion: '92%',
        lastUpdate: '16 Temmuz 2025'
      },
      'İzmir': {
        name: 'İzmir İli',
        title: 'KGYS Proje Özeti',
        stats: [
          { icon: '🏢', label: 'KGYS İzleme Merkezi', value: '15', unit: 'Adet' },
          { icon: '⚡', label: '10 kWa UPS', value: '18', unit: 'Adet' },
          { icon: '📍', label: 'KGYS Noktası', value: '650', unit: 'Adet' },
          { icon: '📹', label: 'Hareketli Kamera', value: '580', unit: 'Adet' },
          { icon: '📷', label: 'Sabit Kamera', value: '1890', unit: 'Adet' },
          { icon: '🔌', label: 'C Tipi Ethernet Anahtar', value: '650', unit: 'Adet' },
          { icon: '🔋', label: '1 kWa UPS', value: '650', unit: 'Adet' }
        ],
        status: 'Aktif',
        completion: '88%',
        lastUpdate: '17 Temmuz 2025'
      },
      'Bursa': {
        name: 'Bursa İli',
        title: 'KGYS Proje Özeti',
        stats: [
          { icon: '🏢', label: 'KGYS İzleme Merkezi', value: '10', unit: 'Adet' },
          { icon: '⚡', label: '10 kWa UPS', value: '12', unit: 'Adet' },
          { icon: '📍', label: 'KGYS Noktası', value: '420', unit: 'Adet' },
          { icon: '📹', label: 'Hareketli Kamera', value: '385', unit: 'Adet' },
          { icon: '📷', label: 'Sabit Kamera', value: '1250', unit: 'Adet' },
          { icon: '🔌', label: 'C Tipi Ethernet Anahtar', value: '420', unit: 'Adet' },
          { icon: '🔋', label: '1 kWa UPS', value: '420', unit: 'Adet' }
        ],
        status: 'Aktif',
        completion: '90%',
        lastUpdate: '16 Temmuz 2025'
      }
    }

    // KGYS İlçe proje verileri
    const kgysDistrictData = {
      'Akçadağ': {
        name: 'Akçadağ İlçesi',
        title: 'KGYS İlçe Proje Özeti',
        stats: [
          { icon: '🏢', label: 'KGYS İzleme Merkezi', value: '2', unit: 'Adet' },
          { icon: '⚡', label: '10 kWa UPS', value: '2', unit: 'Adet' },
          { icon: '📍', label: 'KGYS Noktası', value: '85', unit: 'Adet' },
          { icon: '📹', label: 'Hareketli Kamera', value: '72', unit: 'Adet' },
          { icon: '📷', label: 'Sabit Kamera', value: '245', unit: 'Adet' },
          { icon: '🔌', label: 'C Tipi Ethernet Anahtar', value: '85', unit: 'Adet' },
          { icon: '🔋', label: '1 kWa UPS', value: '85', unit: 'Adet' }
        ],
        status: 'Aktif',
        completion: '92%',
        lastUpdate: '14 Temmuz 2025'
      },
      'Battalgazi': {
        name: 'Battalgazi İlçesi',
        title: 'KGYS İlçe Proje Özeti',
        stats: [
          { icon: '🏢', label: 'KGYS İzleme Merkezi', value: '4', unit: 'Adet' },
          { icon: '⚡', label: '10 kWa UPS', value: '4', unit: 'Adet' },
          { icon: '📍', label: 'KGYS Noktası', value: '180', unit: 'Adet' },
          { icon: '📹', label: 'Hareketli Kamera', value: '165', unit: 'Adet' },
          { icon: '📷', label: 'Sabit Kamera', value: '580', unit: 'Adet' },
          { icon: '🔌', label: 'C Tipi Ethernet Anahtar', value: '180', unit: 'Adet' },
          { icon: '🔋', label: '1 kWa UPS', value: '180', unit: 'Adet' }
        ],
        status: 'Aktif',
        completion: '96%',
        lastUpdate: '15 Temmuz 2025'
      },
      'Yeşilyurt': {
        name: 'Yeşilyurt İlçesi',
        title: 'KGYS İlçe Proje Özeti',
        stats: [
          { icon: '🏢', label: 'KGYS İzleme Merkezi', value: '6', unit: 'Adet' },
          { icon: '⚡', label: '10 kWa UPS', value: '5', unit: 'Adet' },
          { icon: '📍', label: 'KGYS Noktası', value: '235', unit: 'Adet' },
          { icon: '📹', label: 'Hareketli Kamera', value: '220', unit: 'Adet' },
          { icon: '📷', label: 'Sabit Kamera', value: '808', unit: 'Adet' },
          { icon: '🔌', label: 'C Tipi Ethernet Anahtar', value: '235', unit: 'Adet' },
          { icon: '🔋', label: '1 kWa UPS', value: '235', unit: 'Adet' }
        ],
        status: 'Aktif',
        completion: '94%',
        lastUpdate: '15 Temmuz 2025'
      },
      'Arapgir': {
        name: 'Arapgir İlçesi',
        title: 'KGYS İlçe Proje Özeti',
        stats: [
          { icon: '🏢', label: 'KGYS İzleme Merkezi', value: '1', unit: 'Adet' },
          { icon: '⚡', label: '10 kWa UPS', value: '1', unit: 'Adet' },
          { icon: '📍', label: 'KGYS Noktası', value: '45', unit: 'Adet' },
          { icon: '📹', label: 'Hareketli Kamera', value: '38', unit: 'Adet' },
          { icon: '📷', label: 'Sabit Kamera', value: '142', unit: 'Adet' },
          { icon: '🔌', label: 'C Tipi Ethernet Anahtar', value: '45', unit: 'Adet' },
          { icon: '🔋', label: '1 kWa UPS', value: '45', unit: 'Adet' }
        ],
        status: 'Aktif',
        completion: '87%',
        lastUpdate: '12 Temmuz 2025'
      },
      'Arguvan': {
        name: 'Arguvan İlçesi',
        title: 'KGYS İlçe Proje Özeti',
        stats: [
          { icon: '🏢', label: 'KGYS İzleme Merkezi', value: '1', unit: 'Adet' },
          { icon: '⚡', label: '10 kWa UPS', value: '1', unit: 'Adet' },
          { icon: '📍', label: 'KGYS Noktası', value: '32', unit: 'Adet' },
          { icon: '📹', label: 'Hareketli Kamera', value: '28', unit: 'Adet' },
          { icon: '📷', label: 'Sabit Kamera', value: '98', unit: 'Adet' },
          { icon: '🔌', label: 'C Tipi Ethernet Anahtar', value: '32', unit: 'Adet' },
          { icon: '🔋', label: '1 kWa UPS', value: '32', unit: 'Adet' }
        ],
        status: 'Aktif',
        completion: '89%',
        lastUpdate: '13 Temmuz 2025'
      },
      'Darende': {
        name: 'Darende İlçesi',
        title: 'KGYS İlçe Proje Özeti',
        stats: [
          { icon: '🏢', label: 'KGYS İzleme Merkezi', value: '2', unit: 'Adet' },
          { icon: '⚡', label: '10 kWa UPS', value: '2', unit: 'Adet' },
          { icon: '📍', label: 'KGYS Noktası', value: '78', unit: 'Adet' },
          { icon: '📹', label: 'Hareketli Kamera', value: '69', unit: 'Adet' },
          { icon: '📷', label: 'Sabit Kamera', value: '265', unit: 'Adet' },
          { icon: '🔌', label: 'C Tipi Ethernet Anahtar', value: '78', unit: 'Adet' },
          { icon: '🔋', label: '1 kWa UPS', value: '78', unit: 'Adet' }
        ],
        status: 'Aktif',
        completion: '91%',
        lastUpdate: '14 Temmuz 2025'
      },
      'Doğanşehir': {
        name: 'Doğanşehir İlçesi',
        title: 'KGYS İlçe Proje Özeti',
        stats: [
          { icon: '🏢', label: 'KGYS İzleme Merkezi', value: '1', unit: 'Adet' },
          { icon: '⚡', label: '10 kWa UPS', value: '1', unit: 'Adet' },
          { icon: '📍', label: 'KGYS Noktası', value: '55', unit: 'Adet' },
          { icon: '📹', label: 'Hareketli Kamera', value: '48', unit: 'Adet' },
          { icon: '📷', label: 'Sabit Kamera', value: '178', unit: 'Adet' },
          { icon: '🔌', label: 'C Tipi Ethernet Anahtar', value: '55', unit: 'Adet' },
          { icon: '🔋', label: '1 kWa UPS', value: '55', unit: 'Adet' }
        ],
        status: 'Aktif',
        completion: '88%',
        lastUpdate: '13 Temmuz 2025'
      },
      'Doğanyol': {
        name: 'Doğanyol İlçesi',
        title: 'KGYS İlçe Proje Özeti',
        stats: [
          { icon: '🏢', label: 'KGYS İzleme Merkezi', value: '1', unit: 'Adet' },
          { icon: '⚡', label: '10 kWa UPS', value: '1', unit: 'Adet' },
          { icon: '📍', label: 'KGYS Noktası', value: '28', unit: 'Adet' },
          { icon: '📹', label: 'Hareketli Kamera', value: '24', unit: 'Adet' },
          { icon: '📷', label: 'Sabit Kamera', value: '89', unit: 'Adet' },
          { icon: '🔌', label: 'C Tipi Ethernet Anahtar', value: '28', unit: 'Adet' },
          { icon: '🔋', label: '1 kWa UPS', value: '28', unit: 'Adet' }
        ],
        status: 'Aktif',
        completion: '85%',
        lastUpdate: '12 Temmuz 2025'
      },
      'Hekimhan': {
        name: 'Hekimhan İlçesi',
        title: 'KGYS İlçe Proje Özeti',
        stats: [
          { icon: '🏢', label: 'KGYS İzleme Merkezi', value: '1', unit: 'Adet' },
          { icon: '⚡', label: '10 kWa UPS', value: '1', unit: 'Adet' },
          { icon: '📍', label: 'KGYS Noktası', value: '42', unit: 'Adet' },
          { icon: '📹', label: 'Hareketli Kamera', value: '36', unit: 'Adet' },
          { icon: '📷', label: 'Sabit Kamera', value: '134', unit: 'Adet' },
          { icon: '🔌', label: 'C Tipi Ethernet Anahtar', value: '42', unit: 'Adet' },
          { icon: '🔋', label: '1 kWa UPS', value: '42', unit: 'Adet' }
        ],
        status: 'Aktif',
        completion: '90%',
        lastUpdate: '14 Temmuz 2025'
      },
      'Kale': {
        name: 'Kale İlçesi',
        title: 'KGYS İlçe Proje Özeti',
        stats: [
          { icon: '🏢', label: 'KGYS İzleme Merkezi', value: '1', unit: 'Adet' },
          { icon: '⚡', label: '10 kWa UPS', value: '1', unit: 'Adet' },
          { icon: '📍', label: 'KGYS Noktası', value: '35', unit: 'Adet' },
          { icon: '📹', label: 'Hareketli Kamera', value: '30', unit: 'Adet' },
          { icon: '📷', label: 'Sabit Kamera', value: '112', unit: 'Adet' },
          { icon: '🔌', label: 'C Tipi Ethernet Anahtar', value: '35', unit: 'Adet' },
          { icon: '🔋', label: '1 kWa UPS', value: '35', unit: 'Adet' }
        ],
        status: 'Aktif',
        completion: '86%',
        lastUpdate: '13 Temmuz 2025'
      },
      'Kuluncak': {
        name: 'Kuluncak İlçesi',
        title: 'KGYS İlçe Proje Özeti',
        stats: [
          { icon: '🏢', label: 'KGYS İzleme Merkezi', value: '1', unit: 'Adet' },
          { icon: '⚡', label: '10 kWa UPS', value: '1', unit: 'Adet' },
          { icon: '📍', label: 'KGYS Noktası', value: '38', unit: 'Adet' },
          { icon: '📹', label: 'Hareketli Kamera', value: '33', unit: 'Adet' },
          { icon: '📷', label: 'Sabit Kamera', value: '125', unit: 'Adet' },
          { icon: '🔌', label: 'C Tipi Ethernet Anahtar', value: '38', unit: 'Adet' },
          { icon: '🔋', label: '1 kWa UPS', value: '38', unit: 'Adet' }
        ],
        status: 'Aktif',
        completion: '88%',
        lastUpdate: '13 Temmuz 2025'
      },
      'Pütürge': {
        name: 'Pütürge İlçesi',
        title: 'KGYS İlçe Proje Özeti',
        stats: [
          { icon: '🏢', label: 'KGYS İzleme Merkezi', value: '1', unit: 'Adet' },
          { icon: '⚡', label: '10 kWa UPS', value: '1', unit: 'Adet' },
          { icon: '📍', label: 'KGYS Noktası', value: '48', unit: 'Adet' },
          { icon: '📹', label: 'Hareketli Kamera', value: '41', unit: 'Adet' },
          { icon: '📷', label: 'Sabit Kamera', value: '156', unit: 'Adet' },
          { icon: '🔌', label: 'C Tipi Ethernet Anahtar', value: '48', unit: 'Adet' },
          { icon: '🔋', label: '1 kWa UPS', value: '48', unit: 'Adet' }
        ],
        status: 'Aktif',
        completion: '89%',
        lastUpdate: '14 Temmuz 2025'
      },
      'Yazıhan': {
        name: 'Yazıhan İlçesi',
        title: 'KGYS İlçe Proje Özeti',
        stats: [
          { icon: '🏢', label: 'KGYS İzleme Merkezi', value: '1', unit: 'Adet' },
          { icon: '⚡', label: '10 kWa UPS', value: '1', unit: 'Adet' },
          { icon: '📍', label: 'KGYS Noktası', value: '52', unit: 'Adet' },
          { icon: '📹', label: 'Hareketli Kamera', value: '45', unit: 'Adet' },
          { icon: '📷', label: 'Sabit Kamera', value: '167', unit: 'Adet' },
          { icon: '🔌', label: 'C Tipi Ethernet Anahtar', value: '52', unit: 'Adet' },
          { icon: '🔋', label: '1 kWa UPS', value: '52', unit: 'Adet' }
        ],
        status: 'Aktif',
        completion: '90%',
        lastUpdate: '14 Temmuz 2025'
      }
    }

    // Harita başlatma
    const initializeSmartMap = () => {
      try {
        map.value = new maplibregl.Map({
          container: mapContainer.value,
          center: [35.2, 38.9],
          zoom: 6,
          interactive: false, // Kullanıcı zoom/pan yapamaz
          doubleClickZoom: false, // Çift tıklama zoom'u devre dışı
          scrollZoom: false, // Scroll zoom devre dışı
          boxZoom: false, // Box zoom devre dışı
          dragRotate: false, // Döndürme devre dışı
          dragPan: false, // Sürükleme devre dışı
          keyboard: false, // Klavye kontrolleri devre dışı
          touchZoomRotate: false, // Dokunma zoom/döndürme devre dışı
          style: {
            version: 8,
            glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
            sources: {
              'osm-polygons': { type: 'vector', url: `${martinUrl}/planet_osm_polygon` },
              'osm-lines': { type: 'vector', url: `${martinUrl}/planet_osm_line` },
              'osm-roads': { type: 'vector', url: `${martinUrl}/planet_osm_roads` },
              'osm-points': { type: 'vector', url: `${martinUrl}/planet_osm_point` },
              'kgys-noktalar-kaynak': { type: 'geojson', data: kgysNoktaGeoJSON },
              'contour-lines': { type: 'vector', url: `${martinUrl}/kontur_cizgileri` }
            },
            layers: [
              { id: 'background', type: 'background', paint: { 'background-color': '#f8f4f0' } },
              
              // Arazi Gölgelendirme Katmanları
              // 1. Orman Alanları - Koyu Yeşil Gölge
              { 
                id: 'forest-shadow', 
                source: 'osm-polygons', 
                'source-layer': 'planet_osm_polygon', 
                type: 'fill', 
                filter: ['any', ['==', 'natural', 'forest'], ['==', 'landuse', 'forest']], 
                layout: { 'visibility': 'none' }, // Başlangıçta kapalı
                paint: { 
                  'fill-color': '#1a5d1a',
                  'fill-opacity': 0.6
                }
              },
              
              // 2. Dağlık Alanlar - Kahverengi Gölge  
              { 
                id: 'mountain-shadow', 
                source: 'osm-polygons', 
                'source-layer': 'planet_osm_polygon', 
                type: 'fill', 
                filter: ['any', ['==', 'natural', 'peak'], ['==', 'natural', 'ridge']], 
                layout: { 'visibility': 'none' }, // Başlangıçta kapalı
                paint: { 
                  'fill-color': '#654321',
                  'fill-opacity': 0.4
                }
              },
              
              // 3. Tarım Alanları - Yeşil Gölge
              { 
                id: 'farmland-shadow', 
                source: 'osm-polygons', 
                'source-layer': 'planet_osm_polygon', 
                type: 'fill', 
                filter: ['any', ['==', 'landuse', 'farmland'], ['==', 'landuse', 'orchard']], 
                layout: { 'visibility': 'none' }, // Başlangıçta kapalı
                paint: { 
                  'fill-color': '#228B22',
                  'fill-opacity': 0.3
                }
              },
              
              // 4. Yerleşim Alanları - Gri Gölge
              { 
                id: 'residential-shadow', 
                source: 'osm-polygons', 
                'source-layer': 'planet_osm_polygon', 
                type: 'fill', 
                filter: ['any', ['==', 'landuse', 'residential'], ['==', 'landuse', 'commercial']], 
                layout: { 'visibility': 'none' }, // Başlangıçta kapalı
                paint: { 
                  'fill-color': '#696969',
                  'fill-opacity': 0.4
                }
              },
              
              // 5. Su Alanları - Mavi Gölge
              { 
                id: 'water-shadow', 
                source: 'osm-polygons', 
                'source-layer': 'planet_osm_polygon', 
                type: 'fill', 
                filter: ['any', ['has', 'waterway'], ['==', 'natural', 'water']], 
                layout: { 'visibility': 'none' }, // Başlangıçta kapalı
                paint: { 
                  'fill-color': '#1e3a8a',
                  'fill-opacity': 0.5
                }
              },
              
              // Ana Su Katmanı
              { id: 'water', source: 'osm-polygons', 'source-layer': 'planet_osm_polygon', type: 'fill', filter: ['any', ['has', 'waterway'], ['==', 'natural', 'water']], paint: { 'fill-color': '#a0c8f0' } },
              
              // Yeni Katmanlar - Su Kütleleri
              {
                id: 'water-bodies-lakes',
                source: 'osm-polygons',
                'source-layer': 'planet_osm_polygon',
                type: 'fill',
                minzoom: 6,
                filter: ['all', ['==', 'natural', 'water'], ['>', 'way_area', 50000]], // Büyük su kütleleri
                layout: { 'visibility': 'none' }, // Başlangıçta kapalı
                paint: {
                  'fill-color': '#1e40af',
                  'fill-opacity': 0.7,
                  'fill-outline-color': '#1d4ed8'
                }
              },
              {
                id: 'water-bodies-reservoirs',
                source: 'osm-polygons',
                'source-layer': 'planet_osm_polygon',
                type: 'fill',
                minzoom: 8,
                filter: ['==', 'water', 'reservoir'],
                layout: { 'visibility': 'none' }, // Başlangıçta kapalı
                paint: {
                  'fill-color': '#0ea5e9',
                  'fill-opacity': 0.8,
                  'fill-outline-color': '#0284c7'
                }
              },
              {
                id: 'water-bodies-labels',
                source: 'osm-polygons',
                'source-layer': 'planet_osm_polygon',
                type: 'symbol',
                minzoom: 8,
                filter: ['all', ['==', 'natural', 'water'], ['has', 'name']],
                layout: {
                  'text-field': ['get', 'name'],
                  'text-font': ['Noto Sans Bold'],
                  'text-size': 12,
                  'visibility': 'none' // Başlangıçta kapalı
                },
                paint: {
                  'text-color': '#1e40af',
                  'text-halo-color': 'white',
                  'text-halo-width': 2
                }
              },
              
              // Nehirler Katmanları
              {
                id: 'rivers-major',
                source: 'osm-lines',
                'source-layer': 'planet_osm_line',
                type: 'line',
                minzoom: 6,
                filter: ['all', ['==', 'waterway', 'river'], ['has', 'name']],
                layout: { 'visibility': 'none' }, // Başlangıçta kapalı
                paint: {
                  'line-color': '#0ea5e9',
                  'line-width': [
                    'interpolate', ['linear'], ['zoom'],
                    6, 2, 10, 4, 14, 8
                  ],
                  'line-opacity': 0.8
                }
              },
              {
                id: 'rivers-minor',
                source: 'osm-lines',
                'source-layer': 'planet_osm_line',
                type: 'line',
                minzoom: 8,
                filter: ['==', 'waterway', 'stream'],
                layout: { 'visibility': 'none' }, // Başlangıçta kapalı
                paint: {
                  'line-color': '#38bdf8',
                  'line-width': [
                    'interpolate', ['linear'], ['zoom'],
                    8, 1, 12, 2, 16, 4
                  ],
                  'line-opacity': 0.6
                }
              },
              {
                id: 'rivers-streams',
                source: 'osm-lines',
                'source-layer': 'planet_osm_line',
                type: 'line',
                minzoom: 10,
                filter: ['in', 'waterway', 'brook', 'canal'],
                layout: { 'visibility': 'none' }, // Başlangıçta kapalı
                paint: {
                  'line-color': '#7dd3fc',
                  'line-width': [
                    'interpolate', ['linear'], ['zoom'],
                    10, 0.5, 14, 1.5, 18, 3
                  ],
                  'line-opacity': 0.5
                }
              },
              {
                id: 'rivers-labels',
                source: 'osm-lines',
                'source-layer': 'planet_osm_line',
                type: 'symbol',
                minzoom: 10,
                filter: ['all', ['==', 'waterway', 'river'], ['has', 'name']],
                layout: {
                  'symbol-placement': 'line',
                  'text-field': ['get', 'name'],
                  'text-font': ['Noto Sans Regular'],
                  'text-size': 10,
                  'text-rotation-alignment': 'map',
                  'visibility': 'none' // Başlangıçta kapalı
                },
                paint: {
                  'text-color': '#0ea5e9',
                  'text-halo-color': 'white',
                  'text-halo-width': 1.5
                }
              },
              
              // Dağ Tepeleri Katmanları
              {
                id: 'mountain-peaks',
                source: 'osm-points',
                'source-layer': 'planet_osm_point',
                type: 'circle',
                minzoom: 8,
                filter: ['all', ['==', 'natural', 'peak'], ['has', 'name']],
                layout: { 'visibility': 'none' }, // Başlangıçta kapalı
                paint: {
                  'circle-color': '#dc2626',
                  'circle-radius': [
                    'interpolate', ['linear'], ['zoom'],
                    8, 3, 12, 6, 16, 10
                  ],
                  'circle-stroke-width': 2,
                  'circle-stroke-color': '#991b1b'
                }
              },
              {
                id: 'peak-labels',
                source: 'osm-points',
                'source-layer': 'planet_osm_point',
                type: 'symbol',
                minzoom: 10,
                filter: ['all', ['==', 'natural', 'peak'], ['has', 'name']],
                layout: {
                  'text-field': [
                    'format',
                    ['get', 'name'],
                    {},
                    '\n',
                    {},
                    ['concat', ['to-string', ['get', 'ele']], 'm'],
                    { 'font-scale': 0.8 }
                  ],
                  'text-font': ['Noto Sans Bold'],
                  'text-size': 11,
                  'text-anchor': 'top',
                  'text-offset': [0, 1],
                  'visibility': 'none' // Başlangıçta kapalı
                },
                paint: {
                  'text-color': '#dc2626',
                  'text-halo-color': 'white',
                  'text-halo-width': 2
                }
              },
              // Yükseklik konturları - ana kontur çizgileri (100m aralıklar)
              { 
                id: 'contour-lines-major', 
                source: 'contour-lines', 
                'source-layer': 'kontur_cizgileri', 
                type: 'line', 
                minzoom: 6,
                filter: ['==', ['%', ['to-number', ['get', 'ele']], 100], 0], // 100m katları
                layout: { 'visibility': 'none' }, // Başlangıçta kapalı
                paint: { 
                  'line-color': '#8B4513',
                  'line-width': [
                    'interpolate', ['linear'], ['zoom'],
                    6, 0.5, 8, 0.8, 12, 1.2, 16, 2
                  ],
                  'line-opacity': [
                    'interpolate', ['linear'], ['zoom'],
                    6, 0.4, 8, 0.6, 12, 0.8, 16, 1
                  ]
                }
              },
              // Yükseklik konturları - ara kontur çizgileri (50m aralıklar)
              { 
                id: 'contour-lines-minor', 
                source: 'contour-lines', 
                'source-layer': 'kontur_cizgileri', 
                type: 'line', 
                minzoom: 8,
                filter: ['!=', ['%', ['to-number', ['get', 'ele']], 100], 0], // 100m katları dışındakiler
                layout: { 'visibility': 'none' }, // Başlangıçta kapalı
                paint: { 
                  'line-color': '#A0522D',
                  'line-width': [
                    'interpolate', ['linear'], ['zoom'],
                    8, 0.3, 10, 0.4, 12, 0.6, 16, 1
                  ],
                  'line-opacity': [
                    'interpolate', ['linear'], ['zoom'],
                    8, 0.3, 10, 0.4, 12, 0.6, 16, 0.8
                  ]
                }
              },
              // Yükseklik etiketleri
              { 
                id: 'contour-labels', 
                source: 'contour-lines', 
                'source-layer': 'kontur_cizgileri', 
                type: 'symbol', 
                minzoom: 10,
                filter: ['==', ['%', ['to-number', ['get', 'ele']], 100], 0], // Sadece 100m katları için etiket
                layout: { 
                  'symbol-placement': 'line',
                  'text-field': [
                    'concat',
                    ['to-string', ['get', 'ele']],
                    'm'
                  ],
                  'text-font': ['Noto Sans Regular'], 
                  'text-size': [
                    'interpolate', ['linear'], ['zoom'],
                    10, 8, 12, 10, 16, 12
                  ],
                  'text-rotation-alignment': 'map',
                  'text-pitch-alignment': 'viewport',
                  'visibility': 'none' // Başlangıçta kapalı
                }, 
                paint: { 
                  'text-color': '#5D4037', 
                  'text-halo-color': '#ffffff', 
                  'text-halo-width': 1.5,
                  'text-opacity': [
                    'interpolate', ['linear'], ['zoom'],
                    10, 0.5, 12, 0.6, 16, 1
                  ]
                }
              },
              
              // Yol Gölgelendirme Katmanları
              // 1. Otoyol Gölgeleri - Koyu Gri
              { 
                'id': 'roads-motorway-shadow',
                'source': 'osm-roads',
                'source-layer': 'planet_osm_roads',
                'type': 'line',
                'minzoom': 6,
                'filter': ['==', 'highway', 'motorway'],
                'layout': { 'visibility': 'none' }, // Başlangıçta kapalı
                'paint': {
                  'line-color': '#2c3e50',
                  'line-width': [
                    'interpolate', ['linear'], ['zoom'],
                    6, 2, 12, 5, 16, 10
                  ],
                  'line-opacity': 0.3,
                  'line-translate': [2, 2]
                }
              },
              
              // 2. Ana Yol Gölgeleri
              { 
                'id': 'roads-primary-shadow',
                'source': 'osm-roads',
                'source-layer': 'planet_osm_roads',
                'type': 'line',
                'minzoom': 8,
                'filter': ['in', 'highway', 'primary', 'trunk'],
                'layout': { 'visibility': 'none' }, // Başlangıçta kapalı
                'paint': {
                  'line-color': '#34495e',
                  'line-width': [
                    'interpolate', ['linear'], ['zoom'],
                    8, 1.5, 12, 3, 16, 6
                  ],
                  'line-opacity': 0.3,
                  'line-translate': [1.5, 1.5]
                }
              },
              
              // 3. İkincil Yol Gölgeleri
              { 
                'id': 'roads-secondary-shadow',
                'source': 'osm-roads',
                'source-layer': 'planet_osm_roads',
                'type': 'line',
                'minzoom': 10,
                'filter': ['==', 'highway', 'secondary'],
                'layout': { 'visibility': 'none' }, // Başlangıçta kapalı
                'paint': {
                  'line-color': '#7f8c8d',
                  'line-width': [
                    'interpolate', ['linear'], ['zoom'],
                    10, 1, 12, 2, 16, 4
                  ],
                  'line-opacity': 0.3,
                  'line-translate': [1, 1]
                }
              },
              
              // Ana Yol Katmanları
              { 
                'id': 'roads-minor', 
                'source': 'osm-roads', 
                'source-layer': 'planet_osm_roads', 
                'type': 'line', 
                'minzoom': 11, 
                'filter': ['in', 'highway', 'tertiary', 'residential', 'service', 'unclassified', 'living_street', 'pedestrian', 'footway'], 
                'paint': { 
                  'line-color': '#ffe066',
                  'line-width': [
                    'interpolate', ['linear'], ['zoom'],
                    11, 0.8, 13, 1.2, 15, 2, 17, 3.5, 19, 6
                  ],
                  'line-opacity': [
                    'interpolate', ['linear'], ['zoom'],
                    11, 0.4, 13, 0.6, 15, 0.8, 17, 1, 19, 1
                  ]
                }
              },
              { 
                'id': 'roads-motorway',
                'source': 'osm-roads',
                'source-layer': 'planet_osm_roads',
                'type': 'line',
                'minzoom': 6,
                'filter': ['==', 'highway', 'motorway'],
                'paint': {
                  'line-color': '#e74c3c',
                  'line-width': [
                    'interpolate', ['linear'], ['zoom'],
                    6, 1.5, 12, 4, 16, 8
                  ]
                }
              },
              { 
                'id': 'roads-major',
                'source': 'osm-roads',
                'source-layer': 'planet_osm_roads',
                'type': 'line',
                'minzoom': 6,
                'filter': ['in', 'highway', 'trunk', 'primary', 'secondary'],
                'paint': {
                  'line-color': '#ffc04d',
                  'line-width': [
                    'interpolate', ['linear'], ['zoom'],
                    6, 0.8, 12, 2.5, 16, 5
                  ]
                }
              },
              { 'id': 'district-boundaries', 'source': 'osm-lines', 'source-layer': 'planet_osm_line', 'type': 'line', 'minzoom': 8, 'filter': ['all', ['==', 'boundary', 'administrative'], ['==', 'admin_level', '6']], 'paint': { 'line-color': '#8e9eab', 'line-width': 1.4 } },
              { 'id': 'province-boundaries', 'source': 'osm-lines', 'source-layer': 'planet_osm_line', 'type': 'line', 'filter': ['all', ['==', 'boundary', 'administrative'], ['==', 'admin_level', '4']], 'paint': { 'line-color': '#6c7a89', 'line-width': 2 } },
              { 'id': 'province-name-labels', 'source': 'osm-points', 'source-layer': 'planet_osm_point', 'type': 'symbol', 'minzoom': 4, 'maxzoom': 8.5, 'filter': ['==', 'place', 'city'], 'layout': { 'text-field': ['get', 'name'], 'text-font': ['Noto Sans Bold'], 'text-size': 14 }, 'paint': { 'text-color': '#2c3e50', 'text-halo-color': 'white', 'text-halo-width': 2 } },
              { 'id': 'district-name-labels', 'source': 'osm-points', 'source-layer': 'planet_osm_point', 'type': 'symbol', 'minzoom': 8.2, 'maxzoom': 11, 'filter': ['==', 'place', 'town'], 'layout': { 'text-field': ['get', 'name'], 'text-font': ['Noto Sans Bold'], 'text-size': 12 }, 'paint': { 'text-color': '#34495e', 'text-halo-color': 'white', 'text-halo-width': 1.5 } },
              { 'id': 'other-place-labels', 'source': 'osm-points', 'source-layer': 'planet_osm_point', 'type': 'symbol', 'minzoom': 11, 'filter': ['in', 'place', 'village', 'suburb', 'hamlet', 'quarter', 'neighbourhood'], 'layout': { 'text-field': ['get', 'name'], 'text-font': ['Noto Sans Regular'], 'text-size': 10 }, 'paint': { 'text-color': '#555', 'text-halo-color': 'white', 'text-halo-width': 1 } },
              { 'id': 'road-name-labels', 'type': 'symbol', 'source': 'osm-roads', 'source-layer': 'planet_osm_roads', 'minzoom': 14, 'filter': ['has', 'name'], 'layout': { 'symbol-placement': 'line', 'text-field': ['get', 'name'], 'text-font': ['Noto Sans Regular'], 'text-size': 10, 'text-pitch-alignment': 'viewport', 'text-rotation-alignment': 'map' }, 'paint': { 'text-color': '#767676', 'text-halo-color': '#ffffff', 'text-halo-width': 1.5 } }
            ]
          }
        })

        // Navigation kontrolü kaldırıldı - kullanıcı manual zoom yapamaz

        // Zoom event listener
        map.value.on('zoom', updateZoom)
        map.value.on('zoomend', updateZoom)

        map.value.on('load', () => {
          mapLoaded.value = true
          console.log('Akıllı harita yüklendi')
          
          // Zoom ve hareket event listener'larını ekle
          map.value.on('zoom', handleZoomChange)
          map.value.on('move', handleMapMove)
          
          // KGYS katmanları (başlangıçta gizli)
          const kgysLayers = [
            { id: 'kgys-provinces', source: 'osm-points', layer: 'planet_osm_point', filter: ['all', ['==', 'place', 'city'], ['!=', 'name', 'Kocaeli']], color: '#e74c3c', radius: 8 },
            { id: 'kgys-districts', source: 'osm-points', layer: 'planet_osm_point', filter: ['==', 'place', 'town'], color: '#3498db', radius: 6 },
            { id: 'kgys-local', source: 'osm-points', layer: 'planet_osm_point', filter: ['in', 'place', 'village', 'suburb', 'hamlet', 'quarter', 'neighbourhood'], color: '#2ecc71', radius: 5 },
            { id: 'kgys-noktalar', source: 'kgys-noktalar-kaynak', filter: null, color: '#2c3e50', radius: 7 }
          ]
          
          kgysLayers.forEach(layerConfig => {
            const layerDef = {
              id: layerConfig.id,
              type: 'circle',
              source: layerConfig.source,
              paint: {
                'circle-color': layerConfig.color,
                'circle-radius': layerConfig.radius,
                'circle-stroke-width': 1,
                'circle-stroke-color': '#ffffff'
              },
              layout: { 'visibility': 'none' }
            }
            
            if (layerConfig.layer) {
              layerDef['source-layer'] = layerConfig.layer
            }
            
            if (layerConfig.filter) {
              layerDef.filter = layerConfig.filter
            }
            
            map.value.addLayer(layerDef)
          })
          
          // Akıllı click handlers
          map.value.on('click', 'province-name-labels', (e) => {
            console.log('Akıllı il seçimi:', e.features[0].properties.name)
            smartSelectProvince(e.features[0])
            
            // Il tıklandığında ilçeleri göster
            showDistrictsForProvince(e.features[0].properties.name)
          })

          map.value.on('click', 'district-name-labels', (e) => {
            console.log('Akıllı ilçe seçimi:', e.features[0].properties.name)
            const districtName = e.features[0].properties.name
            
            // Önce akıllı ilçe seçimini yap
            smartSelectDistrict(e.features[0])
            // İlçe tıklama sonrası normal davranış
            console.log(`${districtName} ilçesi seçildi`)
          })
          
          // Hover effects
          map.value.on('mouseenter', 'province-name-labels', () => {
            map.value.getCanvas().style.cursor = 'pointer'
          })
          
          map.value.on('mouseleave', 'province-name-labels', () => {
            map.value.getCanvas().style.cursor = ''
          })
          
          map.value.on('mouseenter', 'district-name-labels', () => {
            map.value.getCanvas().style.cursor = 'pointer'
          })
          
          map.value.on('mouseleave', 'district-name-labels', () => {
            map.value.getCanvas().style.cursor = ''
          })

          // KGYS siyah noktaları için click event listener
          map.value.on('click', 'kgys-noktalar', (e) => {
            const feature = e.features[0]
            const coordinates = feature.geometry.coordinates
            const name = feature.properties.name || 'KGYS Noktası'
            
            // KGYS nokta detay modalını göster
            openKgysPointModal(name, coordinates)
          })

          // KGYS siyah noktaları için hover effects
          map.value.on('mouseenter', 'kgys-noktalar', () => {
            map.value.getCanvas().style.cursor = 'pointer'
          })
          
          map.value.on('mouseleave', 'kgys-noktalar', () => {
            map.value.getCanvas().style.cursor = ''
          })
        })

        map.value.on('error', (e) => {
          console.error('Harita hatası:', e)
        })

      } catch (error) {
        console.error('Harita oluşturma hatası:', error)
      }
    }

    // Proje değişikliği
    const onProjectChange = (project) => {
      selectedProject.value = project
      
      if (project === 'kgys') {
        // KGYS katmanlarını GİZLİ bırak (kendi popup'larımızı kullanıyoruz)
        if (map.value) {
          ['kgys-provinces', 'kgys-districts', 'kgys-local', 'kgys-noktalar'].forEach(layerId => {
            map.value.setLayoutProperty(layerId, 'visibility', 'none')
          })
          
          // Mahalle/sokak label'larını gizle
          map.value.setLayoutProperty('other-place-labels', 'visibility', 'none')
          map.value.setLayoutProperty('road-name-labels', 'visibility', 'none')
          
          // KGYS proje bildirimlerini göster (sadece kırmızı noktalar)
          showKgysProjectNotifications()
          
          // İlçe bildirimlerini başlangıçta gizle (il tıklandığında görünecek)
          // showKgysDistrictNotifications()
        }
      } else {
        // Katmanları gizle
        if (map.value) {
          ['kgys-provinces', 'kgys-districts', 'kgys-local', 'kgys-noktalar'].forEach(layerId => {
            map.value.setLayoutProperty(layerId, 'visibility', 'none')
          })
          
          // Mahalle/sokak label'larını geri göster
          map.value.setLayoutProperty('other-place-labels', 'visibility', 'visible')
          map.value.setLayoutProperty('road-name-labels', 'visibility', 'visible')
          
          // KGYS bildirimlerini gizle
          hideKgysProjectNotifications()
          
          // İlçe bildirimlerini gizle
          hideKgysDistrictNotifications()
        }
      }
    }

    // KGYS proje bildirimlerini göster
    const showKgysProjectNotifications = () => {
      if (!map.value) return
      
      // Önce mevcut popupları temizle
      hideKgysProjectNotifications()
      
      // Her KGYS ili için bildirim göster
      kgysProvinces.forEach(province => {
        // Minimal kırmızı yuvarlak popup
        const popup = new maplibregl.Popup({
          closeButton: false,
          closeOnClick: false,
          anchor: 'center',
          offset: [0, -20], // Yukarı taşıdık
          className: 'kgys-minimal-popup'
        })
          .setLngLat(province.coords)
          .setHTML(`
            <div class="kgys-minimal-indicator" data-province="${province.name}">
              <div class="kgys-dot"></div>
              <div class="kgys-tooltip">
                <div class="province-name">${province.name}</div>
                <div class="province-status">KGYS Aktif</div>
                <div class="province-click">İlçeleri görmek için tıklayın</div>
              </div>
            </div>
          `)
          .addTo(map.value)
        
        kgysProjectPopups.value.push(popup)
        
        // Popup'a click event listener ekle
        setTimeout(() => {
          const popupElement = document.querySelector(`[data-province="${province.name}"]`)
          
          if (popupElement) {
            popupElement.addEventListener('click', (e) => {
              e.preventDefault()
              e.stopPropagation()
              handleProvinceClick(province.name)
            })
            popupElement.style.cursor = 'pointer'
          }
        }, 500)
      })
    }

    // KGYS proje bildirimlerini gizle
    const hideKgysProjectNotifications = () => {
      kgysProjectPopups.value.forEach(popup => {
        popup.remove()
      })
      kgysProjectPopups.value = []
    }

    // İlçe bildirimlerini göster
    const showKgysDistrictNotifications = () => {
      if (!map.value) return
      
      // Önce mevcut popupları temizle
      hideKgysDistrictNotifications()
      
      // İlçe koordinatları - başlıca ilçeler
      const districtCoordinates = [
        { name: 'Kadıköy', coords: [29.0833, 40.9833] },
        { name: 'Beşiktaş', coords: [29.0059, 41.0422] },
        { name: 'Şişli', coords: [28.9869, 41.0602] },
        { name: 'Üsküdar', coords: [29.0208, 41.0186] },
        { name: 'Bakırköy', coords: [28.8746, 40.9808] },
        { name: 'Çankaya', coords: [32.8618, 39.9180] },
        { name: 'Keçiören', coords: [32.8543, 39.9692] },
        { name: 'Sincan', coords: [32.5833, 39.9667] },
        { name: 'Konak', coords: [27.1287, 38.4189] },
        { name: 'Bornova', coords: [27.2156, 38.4703] },
        { name: 'Karşıyaka', coords: [27.1067, 38.4461] },
        { name: 'Osmangazi', coords: [29.0601, 40.1826] },
        { name: 'Nilüfer', coords: [28.9833, 40.2167] },
        { name: 'Kepez', coords: [30.7133, 36.8969] },
        { name: 'Muratpaşa', coords: [30.7400, 36.8800] },
        { name: 'Seyhan', coords: [35.3213, 37.0000] },
        { name: 'Yüreğir', coords: [35.3500, 37.0500] },
        { name: 'Meram', coords: [32.4846, 37.8746] },
        { name: 'Selçuklu', coords: [32.5000, 37.8900] },
        { name: 'Şahinbey', coords: [37.3781, 37.0662] },
        { name: 'Şehitkamil', coords: [37.3900, 37.0800] },
        { name: 'Battalgazi', coords: [38.3839, 38.3539] },
        { name: 'Yeşilyurt', coords: [38.2969, 38.3205] },
        { name: 'Ortahisar', coords: [39.7168, 41.0015] },
        { name: 'Akçaabat', coords: [39.5700, 41.0200] },
        { name: 'Bağlar', coords: [40.2306, 37.9144] },
        { name: 'Kayapınar', coords: [40.2500, 37.9300] },
        { name: 'Atakum', coords: [36.3350, 41.2867] },
        { name: 'İlkadım', coords: [36.3200, 41.2800] }
      ]
      
      // Her ilçe için turuncu bildirim göster
      districtCoordinates.forEach(district => {
        const popup = new maplibregl.Popup({
          closeButton: false,
          closeOnClick: false,
          anchor: 'center',
          offset: [0, -15], // İl isimlerinden biraz aşağıda
          className: 'kgys-district-popup'
        })
          .setLngLat(district.coords)
          .setHTML(`
            <div class="kgys-district-indicator">
              <div class="kgys-district-dot"></div>
              <div class="kgys-district-tooltip">${district.name}<br>İlçe Merkezi</div>
            </div>
          `)
          .addTo(map.value)
        
        kgysDistrictPopups.value.push(popup)
      })
    }

    // İlçe bildirimlerini gizle
    const hideKgysDistrictNotifications = () => {
      kgysDistrictPopups.value.forEach(popup => {
        popup.remove()
      })
      kgysDistrictPopups.value = []
    }

    // Zoom seviyesi değiştiğinde ilçeleri kontrol et
    const handleZoomChange = () => {
      if (!map.value) return
      
      const zoom = map.value.getZoom()
      
      // Zoom seviyesi 8'den küçükse (Türkiye genel görünümü) ilçeleri gizle
      if (zoom < 8) {
        hideKgysDistrictNotifications()
        hideKgysBlackDots()
      }
    }

    // KGYS siyah noktalarını göster
    const showKgysBlackDots = () => {
      if (!map.value) return
      
      // kgys-noktalar katmanını görünür yap
      if (map.value.getLayer('kgys-noktalar')) {
        map.value.setLayoutProperty('kgys-noktalar', 'visibility', 'visible')
      }
    }

    // KGYS siyah noktalarını gizle
    const hideKgysBlackDots = () => {
      if (!map.value) return
      
      // kgys-noktalar katmanını gizle
      if (map.value.getLayer('kgys-noktalar')) {
        map.value.setLayoutProperty('kgys-noktalar', 'visibility', 'none')
      }
    }

    // Yükseklik kontur çizgilerini toggle et
    const toggleElevationContours = () => {
      if (!map.value) return
      
      showElevationContours.value = !showElevationContours.value
      
      const visibility = showElevationContours.value ? 'visible' : 'none'
      
      console.log('Kontur toggle:', showElevationContours.value, 'Visibility:', visibility)
      
      // Tüm kontur katmanlarını toggle et (gerçek katman isimleri)
      const contourLayers = [
        'contour-lines-major',
        'contour-lines-minor',
        'contour-labels'
      ]
      
      contourLayers.forEach(layerId => {
        if (map.value.getLayer(layerId)) {
          map.value.setLayoutProperty(layerId, 'visibility', visibility)
          console.log(`Katman ${layerId} visibility: ${visibility}`)
        } else {
          console.log(`Katman ${layerId} bulunamadı`)
        }
      })
    }

    // Gölgelendirme katmanlarını toggle et
    const toggleShadowing = () => {
      if (!map.value) return
      
      showShadowing.value = !showShadowing.value
      
      const visibility = showShadowing.value ? 'visible' : 'none'
      
      console.log('Gölgelendirme toggle:', showShadowing.value, 'Visibility:', visibility)
      
      // Tüm gölgelendirme katmanlarını toggle et
      const shadowLayers = [
        'forest-shadow',
        'mountain-shadow',
        'farmland-shadow',
        'residential-shadow',
        'water-shadow',
        'roads-motorway-shadow',
        'roads-primary-shadow',
        'roads-secondary-shadow'
      ]
      
      shadowLayers.forEach(layerId => {
        if (map.value.getLayer(layerId)) {
          map.value.setLayoutProperty(layerId, 'visibility', visibility)
          console.log(`Gölgelendirme katmanı ${layerId} visibility: ${visibility}`)
        } else {
          console.log(`Gölgelendirme katmanı ${layerId} bulunamadı`)
        }
      })
    }

    // Su kütleleri toggle et
    const toggleWaterBodies = () => {
      if (!map.value) return
      
      showWaterBodies.value = !showWaterBodies.value
      
      const visibility = showWaterBodies.value ? 'visible' : 'none'
      
      console.log('Su kütleleri toggle:', showWaterBodies.value, 'Visibility:', visibility)
      
      // Su kütleleri katmanlarını toggle et
      const waterLayers = [
        'water-bodies-lakes',
        'water-bodies-reservoirs',
        'water-bodies-labels'
      ]
      
      waterLayers.forEach(layerId => {
        if (map.value.getLayer(layerId)) {
          map.value.setLayoutProperty(layerId, 'visibility', visibility)
          console.log(`Su kütlesi katmanı ${layerId} visibility: ${visibility}`)
        } else {
          console.log(`Su kütlesi katmanı ${layerId} bulunamadı`)
        }
      })
    }

    // Nehirler toggle et
    const toggleRivers = () => {
      if (!map.value) return
      
      showRivers.value = !showRivers.value
      
      const visibility = showRivers.value ? 'visible' : 'none'
      
      console.log('Nehirler toggle:', showRivers.value, 'Visibility:', visibility)
      
      // Nehir katmanlarını toggle et
      const riverLayers = [
        'rivers-major',
        'rivers-minor',
        'rivers-streams',
        'rivers-labels'
      ]
      
      riverLayers.forEach(layerId => {
        if (map.value.getLayer(layerId)) {
          map.value.setLayoutProperty(layerId, 'visibility', visibility)
          console.log(`Nehir katmanı ${layerId} visibility: ${visibility}`)
        } else {
          console.log(`Nehir katmanı ${layerId} bulunamadı`)
        }
      })
    }

    // Dağ tepeleri toggle et
    const togglePeaks = () => {
      if (!map.value) return
      
      showPeaks.value = !showPeaks.value
      
      const visibility = showPeaks.value ? 'visible' : 'none'
      
      console.log('Dağ tepeleri toggle:', showPeaks.value, 'Visibility:', visibility)
      
      // Dağ tepeleri katmanlarını toggle et
      const peakLayers = [
        'mountain-peaks',
        'peak-labels'
      ]
      
      peakLayers.forEach(layerId => {
        if (map.value.getLayer(layerId)) {
          map.value.setLayoutProperty(layerId, 'visibility', visibility)
          console.log(`Dağ tepesi katmanı ${layerId} visibility: ${visibility}`)
        } else {
          console.log(`Dağ tepesi katmanı ${layerId} bulunamadı`)
        }
      })
    }

    // Veri analizi panelini toggle et
    const toggleDataAnalysis = () => {
      showDataAnalysis.value = !showDataAnalysis.value
      console.log('Veri analizi paneli:', showDataAnalysis.value ? 'açıldı' : 'kapandı')
    }

    // Gelişmiş arama panelini toggle et
    const toggleAdvancedSearch = () => {
      showAdvancedSearch.value = !showAdvancedSearch.value
      console.log('Gelişmiş arama paneli:', showAdvancedSearch.value ? 'açıldı' : 'kapandı')
    }

    // Analiz bölgesi seçimi handler'ı
    const handleAnalyzeArea = (region) => {
      console.log('Bölge analizi başlatıldı:', region)
      // Gerçek analiz işlemleri burada yapılabilir
    }

    // Veri dışa aktarma handler'ı
    const handleExportData = (data) => {
      console.log('Veri dışa aktarılıyor:', data)
      
      // JSON formatında veri indirme
      const dataStr = JSON.stringify(data, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(dataBlob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = `harita-analiz-${new Date().toISOString().split('T')[0]}.json`
      link.click()
      
      URL.revokeObjectURL(url)
    }

    // Rapor oluşturma handler'ı
    const handleGenerateReport = (data) => {
      console.log('Rapor oluşturuluyor:', data)
      
      // HTML raporu oluştur
      const reportHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Harita Analiz Raporu</title>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; color: #333; }
            .stats { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
            .stat-box { padding: 15px; background: #f5f5f5; border-radius: 8px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🗺️ Harita Analiz Raporu</h1>
            <p>Oluşturulma Tarihi: ${new Date().toLocaleDateString('tr-TR')}</p>
          </div>
          <div class="stats">
            <div class="stat-box">
              <h3>📍 Bölge: ${data.region?.name || 'Seçili Bölge'}</h3>
              <p>Yükseklik: ${data.stats.elevation}m</p>
              <p>Alan: ${data.stats.area} km²</p>
            </div>
            <div class="stat-box">
              <h3>🌊 Su Kaynakları</h3>
              <p>Su Kütleleri: ${data.stats.waterBodies}</p>
              <p>Nehir Uzunluğu: ${data.stats.riverLength} km</p>
            </div>
            <div class="stat-box">
              <h3>⛰️ Topografya</h3>
              <p>Dağ Tepeleri: ${data.stats.peaks}</p>
              <p>Ortalama Yükseklik: ${Math.round(data.elevationProfile.reduce((a, b) => a + b, 0) / data.elevationProfile.length)}m</p>
            </div>
            <div class="stat-box">
              <h3>🛣️ Ulaşım</h3>
              <p>Yol Ağı: ${data.stats.roads} km</p>
            </div>
          </div>
        </body>
        </html>
      `
      
      const reportBlob = new Blob([reportHTML], { type: 'text/html' })
      const url = URL.createObjectURL(reportBlob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = `harita-rapor-${new Date().toISOString().split('T')[0]}.html`
      link.click()
      
      URL.revokeObjectURL(url)
    }

    // Koordinat arama handler'ı
    const handleCoordinateSearch = (coords) => {
      console.log('Koordinat arama:', coords)
      
      if (map.value) {
        map.value.flyTo({
          center: [coords.longitude, coords.latitude],
          zoom: 15,
          duration: 2000
        })
        
        // Arama sonucu popup'ı
        const popup = new maplibregl.Popup()
          .setLngLat([coords.longitude, coords.latitude])
          .setHTML(`
            <div style="padding: 10px;">
              <h4>📍 Koordinat Sonucu</h4>
              <p><strong>Enlem:</strong> ${coords.latitude}</p>
              <p><strong>Boylam:</strong> ${coords.longitude}</p>
            </div>
          `)
          .addTo(map.value)
          
        setTimeout(() => popup.remove(), 5000)
      }
    }

    // Adres arama handler'ı
    const handleAddressSearch = (address) => {
      console.log('Adres arama:', address)
      
      // Demo koordinatları - gerçek uygulamada geocoding API kullanılabilir
      const demoCoords = {
        'Ankara, Çankaya': [32.8618, 39.9180],
        'İstanbul, Kadıköy': [29.0833, 40.9833],
        'İzmir, Konak': [27.1287, 38.4189]
      }
      
      const coords = demoCoords[address] || [32.8597, 39.9334] // Varsayılan Ankara
      
      if (map.value) {
        map.value.flyTo({
          center: coords,
          zoom: 12,
          duration: 2000
        })
        
        selectedAnalysisRegion.value = {
          name: address,
          coordinates: coords
        }
        
        const popup = new maplibregl.Popup()
          .setLngLat(coords)
          .setHTML(`
            <div style="padding: 10px;">
              <h4>🏠 Adres Bulundu</h4>
              <p><strong>${address}</strong></p>
              <p>Koordinatlar: ${coords[1].toFixed(4)}, ${coords[0].toFixed(4)}</p>
            </div>
          `)
          .addTo(map.value)
          
        setTimeout(() => popup.remove(), 5000)
      }
    }

    // POI arama handler'ı
    const handlePOISearch = (searchData) => {
      console.log('POI arama:', searchData)
      
      if (searchData.selectedPOI) {
        // Belirli bir POI seçildi
        const demoCoords = [32.8597, 39.9334] // Demo koordinat
        
        if (map.value) {
          map.value.flyTo({
            center: demoCoords,
            zoom: 16,
            duration: 2000
          })
          
          const popup = new maplibregl.Popup()
            .setLngLat(demoCoords)
            .setHTML(`
              <div style="padding: 10px;">
                <h4>🎯 ${searchData.selectedPOI.name}</h4>
                <p><strong>Uzaklık:</strong> ${searchData.selectedPOI.distance} km</p>
                <p><strong>Kategori:</strong> ${searchData.category}</p>
              </div>
            `)
            .addTo(map.value)
            
          setTimeout(() => popup.remove(), 8000)
        }
      } else {
        // Kategori arama
        console.log(`${searchData.category} kategorisinde arama yapılıyor...`)
      }
    }

    // KGYS nokta modalını göster
    const openKgysPointModal = (name, coordinates) => {
      selectedKgysPoint.value = {
        name: name,
        coordinates: coordinates,
        systemData: generateSystemData(),
        personnelData: generatePersonnelData(),
        equipmentData: generateEquipmentData()
      }
      showKgysPointModal.value = true
    }

    // Sistem durumu verileri oluştur
    const generateSystemData = () => {
      return [
        { id: 1, systemName: 'Hareketli Kamera', sector: 'UGES', status: 'Faal', description: 'Kamera sistemi çalışıyor' },
        { id: 2, systemName: 'Sabit Kamera', sector: 'UGES', status: 'Arıza Faal', description: 'Kamera 2 arızalı, diğerleri çalışıyor' },
        { id: 3, systemName: 'UPS', sector: 'UGES', status: 'Faal (Jeneratör)', description: 'Kesintisiz güç kaynağı çalışıyor' },
        { id: 4, systemName: 'Switch', sector: 'UGES', status: 'Faal', description: 'Ağ anahtarı çalışıyor' }
      ]
    }

    // Personel durumu verileri oluştur
    const generatePersonnelData = () => {
      return [
        { id: 1, name: 'Faruk Sarıgül', position: 'IT Uzmanı', department: 'IT', status: 'Sorumluluk Alanında' }
      ]
    }

    // Konsinye sistem bilgileri oluştur
    const generateEquipmentData = () => {
      return [
        { id: 1, equipment: 'Hareketli Kamera', sector: 'UGES', status: 'Konsinye var', description: 'Kamera sistemi konsinye edildi' },
        { id: 2, equipment: 'Sabit Kamera', sector: 'UGES', status: 'Konsinye yok', description: 'Kamera sistemi konsinye edilmedi' },
        { id: 3, equipment: 'Switch', sector: 'UGES', status: 'Konsinye var', description: 'Ağ anahtarı konsinye edildi' },
        { id: 4, equipment: 'UPS', sector: 'UGES', status: 'Konsinye Yok', description: 'UPS sistemi konsinye edilmedi' }
      ]
    }

    // Modal kapatma fonksiyonu
    const closeKgysPointModal = () => {
      showKgysPointModal.value = false
      selectedKgysPoint.value = null
    }

    // Durum CSS sınıfını belirle
    const getStatusClass = (status) => {
      if (status.includes('Konsinye var')) {
        return 'consignment-available'
      } else if (status.includes('Konsinye yok') || status.includes('Konsinye Yok')) {
        return 'consignment-unavailable'
      } else if (status.includes('Faal') || status.includes('Herşeyi İyi') || status.includes('Sorumluluk Alanında')) {
        return 'status-success'
      } else if (status.includes('Arıza') || status.includes('Arızalı')) {
        return 'status-error'
      } else if (status.includes('Onarım') || status.includes('İzinli')) {
        return 'status-warning'
      } else if (status.includes('Jeneratör')) {
        return 'status-info'
      } else {
        return 'status-default'
      }
    }

    // Harita hareket ettiğinde kontrol et
    const handleMapMove = () => {
      if (!map.value) return
      handleZoomChange()
    }

    // İlçe tıklandığında modal aç
    const handleDistrictClick = (districtName) => {
      console.log('handleDistrictClick çağrıldı:', districtName)
      if (!map.value) return
      
      // İl popup gibi, ilçe için de proje modal aç
      openProjectModal(districtName)
      
      // KGYS noktalarını göster
      showKgysBlackDots()
    }

    // İlçe koordinatlarını getir
    const getDistrictCoordinates = (districtName) => {
      // Tüm illerin ilçe listesini kontrol et
      const allProvinceDistricts = {
        'İstanbul': [
          { name: 'Kadıköy', coords: [29.0333, 40.9833], population: '467,919' },
          { name: 'Beşiktaş', coords: [29.0059, 41.0422], population: '175,190' },
          { name: 'Şişli', coords: [28.9869, 41.0602], population: '259,056' },
          { name: 'Üsküdar', coords: [29.0208, 41.0186], population: '524,452' },
          { name: 'Bakırköy', coords: [28.8746, 40.9808], population: '218,388' },
          { name: 'Fatih', coords: [28.9497, 41.0185], population: '368,227' },
          { name: 'Beyoğlu', coords: [28.9744, 41.0370], population: '225,920' }
        ],
        'Ankara': [
          { name: 'Çankaya', coords: [32.8618, 39.9180], population: '915,978' },
          { name: 'Keçiören', coords: [32.8543, 39.9692], population: '934,203' },
          { name: 'Sincan', coords: [32.5833, 39.9667], population: '516,794' },
          { name: 'Mamak', coords: [32.9167, 39.9167], population: '650,493' },
          { name: 'Yenimahalle', coords: [32.8000, 39.9833], population: '674,077' }
        ],
        'İzmir': [
          { name: 'Konak', coords: [27.1287, 38.4189], population: '345,001' },
          { name: 'Bornova', coords: [27.2156, 38.4703], population: '455,463' },
          { name: 'Karşıyaka', coords: [27.1067, 38.4461], population: '334,907' },
          { name: 'Buca', coords: [27.1833, 38.3833], population: '512,886' },
          { name: 'Alsancak', coords: [27.1400, 38.4300], population: '125,000' }
        ],
        'Bursa': [
          { name: 'Osmangazi', coords: [29.0601, 40.1826], population: '880,167' },
          { name: 'Nilüfer', coords: [28.9833, 40.2167], population: '518,285' },
          { name: 'Yıldırım', coords: [29.1167, 40.1833], population: '676,227' }
        ],
        'Malatya': [
          { name: 'Battalgazi', coords: [38.3839, 38.3539], population: '421,845' },
          { name: 'Yeşilyurt', coords: [38.2969, 38.3205], population: '402,132' },
          { name: 'Akçadağ', coords: [37.9920, 38.3320], population: '87,354' },
          { name: 'Arapgir', coords: [38.4983, 39.0567], population: '12,845' },
          { name: 'Arguvan', coords: [38.2733, 38.7750], population: '8,765' },
          { name: 'Darende', coords: [37.5067, 37.9033], population: '28,567' },
          { name: 'Doğanşehir', coords: [37.8933, 37.8767], population: '32,189' },
          { name: 'Doğanyol', coords: [38.0850, 39.2933], population: '6,543' },
          { name: 'Hekimhan', coords: [37.9567, 39.3917], population: '15,234' },
          { name: 'Kale', coords: [39.3417, 38.4567], population: '9,876' },
          { name: 'Kuluncak', coords: [37.9567, 38.9017], population: '11,432' },
          { name: 'Pütürge', coords: [38.1933, 39.1833], population: '13,567' },
          { name: 'Yazıhan', coords: [37.6850, 38.6117], population: '24,789' }
        ]
      }
      
      // Tüm illerin ilçelerinde ara
      for (const province of Object.values(allProvinceDistricts)) {
        const district = province.find(d => d.name === districtName)
        if (district) {
          return district.coords
        }
      }
      
      return null
    }

    // Modal açma fonksiyonu (hem il hem ilçe için)
    const openProjectModal = (name) => {
      // Önce il verilerinde ara
      let projectData = kgysProjectData[name]
      
      // Bulunamazsa ilçe verilerinde ara
      if (!projectData) {
        projectData = kgysDistrictData[name]
      }
      
      if (projectData) {
        selectedProjectData.value = projectData
        showProjectModal.value = true
      } else {
        console.warn('Proje verisi bulunamadı:', name)
      }
    }

    // Modal kapatma fonksiyonu
    const closeProjectModal = () => {
      showProjectModal.value = false
      selectedProjectData.value = null
    }

    // İl tıklandığında modal aç ve ilçeleri göster
    const handleProvinceClick = (provinceName) => {
      if (!map.value) return
      
      // Modal'ı aç
      openProjectModal(provinceName)
      
      // Önce tüm ilçeleri temizle
      hideKgysDistrictNotifications()
      
      // Zoom seviyesini kontrol et - sadece yakın zoom'da ilçeleri göster
      const currentZoom = map.value.getZoom()
      if (currentZoom >= 8) {
        // Seçilen ile ait ilçeleri göster
        setTimeout(() => {
          showDistrictsForProvince(provinceName)
        }, 100)
      }
    }

    // Window scope'una fonksiyonları ekle
    window.handleProvinceClick = handleProvinceClick
    window.handleDistrictClick = handleDistrictClick
    window.closeProjectModal = closeProjectModal

    // İl tıklandığında o ile ait ilçeleri göster
    const showDistrictsForProvince = (provinceName) => {
      if (!map.value) return
      
      // Önce tüm ilçeleri temizle
      hideKgysDistrictNotifications()
      
      // İl bazında ilçe listesi (örnekler)
      const provinceDistricts = {
        'İstanbul': [
          { name: 'Kadıköy', coords: [29.0333, 40.9833], population: '467,919' },
          { name: 'Beşiktaş', coords: [29.0059, 41.0422], population: '175,190' },
          { name: 'Şişli', coords: [28.9869, 41.0602], population: '259,056' },
          { name: 'Üsküdar', coords: [29.0208, 41.0186], population: '524,452' },
          { name: 'Bakırköy', coords: [28.8746, 40.9808], population: '218,388' },
          { name: 'Fatih', coords: [28.9497, 41.0185], population: '368,227' },
          { name: 'Beyoğlu', coords: [28.9744, 41.0370], population: '225,920' }
        ],
        'Ankara': [
          { name: 'Çankaya', coords: [32.8618, 39.9180], population: '915,978' },
          { name: 'Keçiören', coords: [32.8543, 39.9692], population: '934,203' },
          { name: 'Sincan', coords: [32.5833, 39.9667], population: '516,794' },
          { name: 'Mamak', coords: [32.9167, 39.9167], population: '650,493' },
          { name: 'Yenimahalle', coords: [32.8000, 39.9833], population: '674,077' }
        ],
        'İzmir': [
          { name: 'Konak', coords: [27.1287, 38.4189], population: '345,001' },
          { name: 'Bornova', coords: [27.2156, 38.4703], population: '455,463' },
          { name: 'Karşıyaka', coords: [27.1067, 38.4461], population: '334,907' },
          { name: 'Buca', coords: [27.1833, 38.3833], population: '512,886' },
          { name: 'Alsancak', coords: [27.1400, 38.4300], population: '125,000' }
        ],
        'Bursa': [
          { name: 'Osmangazi', coords: [29.0601, 40.1826], population: '880,167' },
          { name: 'Nilüfer', coords: [28.9833, 40.2167], population: '518,285' },
          { name: 'Yıldırım', coords: [29.1167, 40.1833], population: '676,227' }
        ],
        'Malatya': [
          { name: 'Battalgazi', coords: [38.3839, 38.3539], population: '421,845' },
          { name: 'Yeşilyurt', coords: [38.2969, 38.3205], population: '402,132' },
          { name: 'Akçadağ', coords: [37.9920, 38.3320], population: '87,354' },
          { name: 'Arapgir', coords: [38.4983, 39.0567], population: '12,845' },
          { name: 'Arguvan', coords: [38.2733, 38.7750], population: '8,765' },
          { name: 'Darende', coords: [37.5067, 37.9033], population: '28,567' },
          { name: 'Doğanşehir', coords: [37.8933, 37.8767], population: '32,189' },
          { name: 'Doğanyol', coords: [38.0850, 39.2933], population: '6,543' },
          { name: 'Hekimhan', coords: [37.9567, 39.3917], population: '15,234' },
          { name: 'Kale', coords: [39.3417, 38.4567], population: '9,876' },
          { name: 'Kuluncak', coords: [37.9567, 38.9017], population: '11,432' },
          { name: 'Pütürge', coords: [38.1933, 39.1833], population: '13,567' },
          { name: 'Yazıhan', coords: [37.6850, 38.6117], population: '24,789' }
        ]
      }
      
      const districts = provinceDistricts[provinceName]
      if (!districts) return
      
      // Seçilen ile ait ilçeleri göster
      districts.forEach(district => {
        const popup = new maplibregl.Popup({
          closeButton: false,
          closeOnClick: false,
          anchor: 'center',
          offset: [0, -12],
          className: 'kgys-district-popup'
        })
          .setLngLat(district.coords)
          .setHTML(`
            <div class="kgys-district-indicator" data-district="${district.name}">
              <div class="kgys-district-dot"></div>
              <div class="kgys-district-tooltip">
                <div class="district-name">${district.name}</div>
                <div class="district-info">Nüfus: ${district.population}</div>
                <div class="district-status">KGYS Aktif</div>
              </div>
            </div>
          `)
          .addTo(map.value)
        
        kgysDistrictPopups.value.push(popup)
        
        // İlçe popup'a click event listener ekle
        setTimeout(() => {
          const districtElement = document.querySelector(`[data-district="${district.name}"]`)
          if (districtElement) {
            districtElement.addEventListener('click', (e) => {
              e.preventDefault()
              e.stopPropagation()
              handleDistrictClick(district.name)
            })
            districtElement.style.cursor = 'pointer'
          }
        }, 500)
      })
    }

    // Window resize handler
    const handleResize = () => {
      if (map.value) {
        map.value.resize()
      }
    }

    // Lifecycle
    onMounted(() => {
      console.log('Akıllı harita component mounted')
      initializeSmartMap()
      window.addEventListener('resize', handleResize)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
      if (map.value) {
        map.value.remove()
      }
    })

    return {
      mapContainer,
      selectedProject,
      navigation,
      smartGoBack,
      onProjectChange,
      showProjectModal,
      selectedProjectData,
      closeProjectModal,
      handleDistrictClick,
      showKgysPointModal,
      selectedKgysPoint,
      closeKgysPointModal,
      getStatusClass,
      showElevationContours,
      toggleElevationContours,
      showShadowing,
      toggleShadowing,
      showWaterBodies,
      toggleWaterBodies,
      showRivers,
      toggleRivers,
      showPeaks,
      togglePeaks,
      showDataAnalysis,
      toggleDataAnalysis,
      showAdvancedSearch,
      toggleAdvancedSearch,
      selectedAnalysisRegion,
      handleAnalyzeArea,
      handleExportData,
      handleGenerateReport,
      handleCoordinateSearch,
      handleAddressSearch,
      handlePOISearch
    }
  }
}
</script>

<style scoped>
.smart-map-container {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}

#smart-map {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}

/* Yükseklik Kontur Toggle Butonu */
.elevation-toggle-container {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  z-index: 1000;
}

.elevation-toggle-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.elevation-toggle-btn:hover {
  background: rgba(255, 255, 255, 1);
  border-color: #27ae60;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.elevation-toggle-btn.active {
  background: linear-gradient(135deg, #27ae60, #229954);
  border-color: #27ae60;
  color: white;
  box-shadow: 0 4px 12px rgba(39, 174, 96, 0.3);
}

.elevation-toggle-btn.active:hover {
  background: linear-gradient(135deg, #229954, #1e8449);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(39, 174, 96, 0.4);
}

.elevation-icon {
  font-size: 16px;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

.elevation-text {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  letter-spacing: 0.5px;
}

/* Gölgelendirme Toggle Butonu */
.shadow-toggle-container {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(50px);
  z-index: 1000;
}

.shadow-toggle-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.shadow-toggle-btn:hover {
  background: rgba(255, 255, 255, 1);
  border-color: #8e44ad;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.shadow-toggle-btn.active {
  background: linear-gradient(135deg, #8e44ad, #7d3c98);
  border-color: #8e44ad;
  color: white;
  box-shadow: 0 4px 12px rgba(142, 68, 173, 0.3);
}

.shadow-toggle-btn.active:hover {
  background: linear-gradient(135deg, #7d3c98, #6c3483);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(142, 68, 173, 0.4);
}

.shadow-icon {
  font-size: 16px;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

.shadow-text {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  letter-spacing: 0.5px;
}

/* Water Bodies Toggle */
.water-toggle-container {
  position: absolute;
  top: 180px;
  right: 15px;
  z-index: 2000;
}

.water-toggle-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 2px solid #0ea5e9;
  border-radius: 8px;
  background: linear-gradient(135deg, #ffffff, #f8fafc);
  color: #0ea5e9;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(14, 165, 233, 0.1);
}

.water-toggle-btn:hover {
  background: linear-gradient(135deg, #0ea5e9, #0284c7);
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.2);
}

.water-toggle-btn.active {
  background: linear-gradient(135deg, #0ea5e9, #0284c7);
  border-color: #0ea5e9;
  color: white;
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
}

.water-toggle-btn.active:hover {
  background: linear-gradient(135deg, #0284c7, #0369a1);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(14, 165, 233, 0.4);
}

.water-icon {
  font-size: 16px;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

.water-text {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  letter-spacing: 0.5px;
}

/* Rivers Toggle */
.rivers-toggle-container {
  position: absolute;
  top: 230px;
  right: 15px;
  z-index: 2000;
}

.rivers-toggle-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 2px solid #38bdf8;
  border-radius: 8px;
  background: linear-gradient(135deg, #ffffff, #f8fafc);
  color: #38bdf8;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(56, 189, 248, 0.1);
}

.rivers-toggle-btn:hover {
  background: linear-gradient(135deg, #38bdf8, #0ea5e9);
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(56, 189, 248, 0.2);
}

.rivers-toggle-btn.active {
  background: linear-gradient(135deg, #38bdf8, #0ea5e9);
  border-color: #38bdf8;
  color: white;
  box-shadow: 0 4px 12px rgba(56, 189, 248, 0.3);
}

.rivers-toggle-btn.active:hover {
  background: linear-gradient(135deg, #0ea5e9, #0284c7);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(56, 189, 248, 0.4);
}

.rivers-icon {
  font-size: 16px;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

.rivers-text {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  letter-spacing: 0.5px;
}

/* Peaks Toggle */
.peaks-toggle-container {
  position: absolute;
  top: 280px;
  right: 15px;
  z-index: 2000;
}

.peaks-toggle-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 2px solid #dc2626;
  border-radius: 8px;
  background: linear-gradient(135deg, #ffffff, #f8fafc);
  color: #dc2626;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(220, 38, 38, 0.1);
}

.peaks-toggle-btn:hover {
  background: linear-gradient(135deg, #dc2626, #b91c1c);
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.2);
}

.peaks-toggle-btn.active {
  background: linear-gradient(135deg, #dc2626, #b91c1c);
  border-color: #dc2626;
  color: white;
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
}

.peaks-toggle-btn.active:hover {
  background: linear-gradient(135deg, #b91c1c, #991b1b);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(220, 38, 38, 0.4);
}

.peaks-icon {
  font-size: 16px;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

.peaks-text {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  letter-spacing: 0.5px;
}

/* Analysis Panel Toggle */
.analysis-toggle-container {
  position: absolute;
  top: 330px;
  right: 15px;
  z-index: 2000;
}

.analysis-toggle-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 2px solid #667eea;
  border-radius: 8px;
  background: linear-gradient(135deg, #ffffff, #f8fafc);
  color: #667eea;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.1);
}

.analysis-toggle-btn:hover {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
}

.analysis-toggle-btn.active {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-color: #667eea;
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.analysis-toggle-btn.active:hover {
  background: linear-gradient(135deg, #764ba2, #667eea);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

.analysis-icon {
  font-size: 16px;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

.analysis-text {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  letter-spacing: 0.5px;
}

/* Search Panel Toggle */
.search-toggle-container {
  position: absolute;
  top: 380px;
  right: 15px;
  z-index: 2000;
}

.search-toggle-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 2px solid #4f46e5;
  border-radius: 8px;
  background: linear-gradient(135deg, #ffffff, #f8fafc);
  color: #4f46e5;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.1);
}

.search-toggle-btn:hover {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
}

.search-toggle-btn.active {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  border-color: #4f46e5;
  color: white;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

.search-toggle-btn.active:hover {
  background: linear-gradient(135deg, #7c3aed, #4f46e5);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(79, 70, 229, 0.4);
}

.search-icon {
  font-size: 16px;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

.search-text {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  letter-spacing: 0.5px;
}

/* KGYS Minimal Popup'lar */
:global(.kgys-minimal-popup) {
  z-index: 1000;
}

:global(.kgys-minimal-popup .maplibregl-popup-content) {
  padding: 0;
  background: transparent;
  border: none;
  box-shadow: none;
  pointer-events: auto;
}

:global(.kgys-minimal-popup .maplibregl-popup-tip) {
  display: none;
}

:global(.kgys-minimal-indicator) {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: auto;
  transition: transform 0.2s ease;
}

:global(.kgys-minimal-indicator:hover) {
  transform: scale(1.1);
}

:global(.kgys-minimal-indicator:active) {
  transform: scale(0.95);
}

/* İlçe Popup'lar */
:global(.kgys-district-popup) {
  z-index: 1000;
}

:global(.kgys-district-popup .maplibregl-popup-content) {
  padding: 0;
  background: transparent;
  border: none;
  box-shadow: none;
  pointer-events: auto;
}

:global(.kgys-district-popup .maplibregl-popup-tip) {
  display: none;
}

:global(.kgys-district-indicator) {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: auto;
}

:global(.kgys-dot) {
  width: 12px;
  height: 12px;
  background: #e74c3c;
  border: 2px solid #fff;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  animation: kgysPulse 2s infinite;
  cursor: pointer;
}

:global(.kgys-district-dot) {
  width: 10px;
  height: 10px;
  background: #27ae60;
  border: 2px solid #fff;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  animation: kgysDistrictPulse 2s infinite;
  cursor: pointer;
}

:global(.kgys-tooltip) {
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, rgba(231, 76, 60, 0.95), rgba(192, 57, 43, 0.95));
  color: white;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  pointer-events: none;
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 1001;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

:global(.province-name) {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #fff;
}

:global(.province-status) {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2px;
}

:global(.province-click) {
  font-size: 11px;
  color: #ffb3b3;
  font-weight: 500;
}

:global(.kgys-district-tooltip) {
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, rgba(39, 174, 96, 0.95), rgba(34, 139, 77, 0.95));
  color: white;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  pointer-events: none;
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 1001;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

:global(.district-name) {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #fff;
}

:global(.district-info) {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2px;
}

:global(.district-status) {
  font-size: 11px;
  color: #a8e6cf;
  font-weight: 500;
}

:global(.kgys-minimal-indicator:hover .kgys-tooltip) {
  visibility: visible;
  opacity: 1;
}

:global(.kgys-district-indicator:hover .kgys-district-tooltip) {
  visibility: visible;
  opacity: 1;
}

:global(.kgys-dot:hover) {
  transform: scale(1.3);
  transition: transform 0.2s ease;
}

:global(.kgys-district-dot:hover) {
  transform: scale(1.3);
  transition: transform 0.2s ease;
}

@keyframes kgysPulse {
  0% {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 0 0 0 rgba(231, 76, 60, 0.4);
  }
  50% {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 0 0 8px rgba(231, 76, 60, 0.1);
  }
  100% {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 0 0 0 rgba(231, 76, 60, 0);
  }
}

@keyframes kgysDistrictPulse {
  0% {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 0 0 0 rgba(39, 174, 96, 0.4);
  }
  50% {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 0 0 8px rgba(39, 174, 96, 0.1);
  }
  100% {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 0 0 0 rgba(39, 174, 96, 0);
  }
}

@keyframes kgysDistrictPulse {
  0% {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 0 0 0 rgba(39, 174, 96, 0.4);
  }
  50% {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 0 0 8px rgba(39, 174, 96, 0.1);
  }
  100% {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 0 0 0 rgba(39, 174, 96, 0);
  }
}

/* İlçe Turuncu Popup'lar */
:global(.kgys-district-popup) {
  z-index: 999;
}

:global(.kgys-district-popup .maplibregl-popup-content) {
  padding: 0;
  background: transparent;
  border: none;
  box-shadow: none;
  pointer-events: auto;
}

:global(.kgys-district-popup .maplibregl-popup-tip) {
  display: none;
}

:global(.kgys-district-indicator) {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

:global(.kgys-district-dot) {
  width: 10px;
  height: 10px;
  background: #27ae60;
  border: 2px solid #fff;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  animation: kgysDistrictPulse 3s infinite;
  cursor: pointer;
}

:global(.kgys-district-tooltip) {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 3px 6px;
  border-radius: 3px;
  font-size: 10px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s;
  z-index: 1002;
}

:global(.kgys-district-indicator:hover .kgys-district-tooltip) {
  opacity: 1;
}

:global(.kgys-district-dot:hover) {
  transform: scale(1.3);
  transition: transform 0.2s;
}

/* KGYS Proje Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  backdrop-filter: blur(5px);
}

.modal-content {
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  border-radius: 16px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-header {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  padding: 25px 30px;
  border-radius: 16px 16px 0 0;
  position: relative;
}

.modal-header h2 {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.modal-header h3 {
  margin: 8px 0 0 0;
  font-size: 18px;
  font-weight: 400;
  opacity: 0.9;
}

.close-button {
  position: absolute;
  top: 20px;
  right: 25px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 32px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  font-weight: 300;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.modal-body {
  padding: 30px;
}

.project-info {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 25px;
  border-left: 4px solid #e74c3c;
}

.status-row, .completion-row, .update-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.status-row:last-child, .completion-row:last-child, .update-row:last-child {
  margin-bottom: 0;
}

.status-label, .completion-label, .update-label {
  font-weight: 600;
  color: #2c3e50;
  font-size: 16px;
}

.status-value.active {
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 14px;
}

.completion-value {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 14px;
}

.update-value {
  color: #7f8c8d;
  font-weight: 500;
  font-size: 14px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid #e9ecef;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  font-size: 32px;
  margin-right: 15px;
  min-width: 50px;
  text-align: center;
}

.stat-info {
  flex: 1;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 4px;
}

.stat-unit {
  font-size: 14px;
  color: #7f8c8d;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: #34495e;
  font-weight: 500;
  line-height: 1.3;
}

/* Responsive design */
@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    margin: 20px;
  }
  
  .modal-header {
    padding: 20px;
  }
  
  .modal-header h2 {
    font-size: 24px;
  }
  
  .modal-body {
    padding: 20px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}

/* KGYS Nokta Popup Stilleri */
:global(.kgys-point-popup) {
  z-index: 1000;
}

:global(.kgys-point-popup .maplibregl-popup-content) {
  padding: 0;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  border: none;
  min-width: 280px;
  max-width: 320px;
}

:global(.kgys-point-popup .maplibregl-popup-tip) {
  border-top-color: #2c3e50;
}

:global(.kgys-point-info) {
  padding: 20px;
  background: linear-gradient(135deg, #2c3e50, #34495e);
  border-radius: 12px;
  color: white;
}

:global(.kgys-point-info h3) {
  margin: 0 0 15px 0;
  font-size: 18px;
  font-weight: 700;
  color: #ecf0f1;
  text-align: center;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
}

:global(.point-details) {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

:global(.detail-item) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

:global(.detail-item:last-child) {
  border-bottom: none;
}

:global(.detail-label) {
  font-weight: 600;
  color: #bdc3c7;
  font-size: 14px;
}

:global(.detail-value) {
  font-weight: 500;
  color: #ecf0f1;
  font-size: 14px;
}

:global(.status-active) {
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  color: white;
  padding: 4px 8px;
  border-radius: 15px;
  font-weight: 600;
  font-size: 12px;
}

/* KGYS Nokta Modal Stilleri */
.kgys-point-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  backdrop-filter: blur(5px);
}

.kgys-point-modal-content {
  background: white;
  border-radius: 15px;
  width: 90%;
  max-width: 1200px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.kgys-point-modal-header {
  background: linear-gradient(135deg, #2c3e50, #3498db);
  color: white;
  padding: 20px;
  border-radius: 15px 15px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.kgys-point-modal-header h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
}

.kgys-point-modal-close {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 24px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.kgys-point-modal-close:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.kgys-point-modal-body {
  padding: 20px;
}

.kgys-section {
  margin-bottom: 30px;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
}

.kgys-section-header {
  background: linear-gradient(135deg, #34495e, #2c3e50);
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.kgys-section-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.kgys-toggle-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.kgys-toggle-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.kgys-table-container {
  overflow-x: auto;
}

.kgys-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.kgys-table th {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  padding: 12px 8px;
  text-align: left;
  font-weight: 600;
  font-size: 13px;
}

.kgys-table td {
  padding: 12px 8px;
  border-bottom: 1px solid #ecf0f1;
  vertical-align: middle;
}

.kgys-table tr:hover {
  background: #f8f9fa;
}

.kgys-table tr:nth-child(even) {
  background: #f9f9f9;
}

.kgys-table tr:nth-child(even):hover {
  background: #f1f2f6;
}

/* Durum Badge'leri */
.status-success {
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
  min-width: 80px;
  text-align: center;
}

.status-error {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
  min-width: 80px;
  text-align: center;
}

.status-warning {
  background: linear-gradient(135deg, #f39c12, #e67e22);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
  min-width: 80px;
  text-align: center;
}

.status-info {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
  min-width: 80px;
  text-align: center;
}

.status-default {
  background: linear-gradient(135deg, #95a5a6, #7f8c8d);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
  min-width: 80px;
  text-align: center;
}

/* Konsinye Durumları */
.consignment-available {
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
  min-width: 80px;
  text-align: center;
}

.consignment-unavailable {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
  min-width: 80px;
  text-align: center;
}

/* Responsive */
@media (max-width: 768px) {
  .kgys-point-modal-content {
    width: 95%;
    margin: 10px;
  }
  
  .kgys-point-modal-header h2 {
    font-size: 20px;
  }
  
  .kgys-table {
    font-size: 12px;
  }
  
  .kgys-table th, .kgys-table td {
    padding: 8px 6px;
  }
}
</style>
