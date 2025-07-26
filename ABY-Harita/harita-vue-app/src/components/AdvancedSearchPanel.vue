<template>
  <div v-if="isVisible" class="advanced-search-panel">
    <div class="panel-header">
      <h3>🔍 Gelişmiş Arama</h3>
      <button class="close-btn" @click="closePanel">×</button>
    </div>
    
    <div class="panel-content">
      <!-- Arama Türü Seçimi -->
      <div class="search-type-tabs">
        <button 
          v-for="tab in searchTabs" 
          :key="tab.id"
          class="tab-btn"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          {{ tab.icon }} {{ tab.name }}
        </button>
      </div>

      <!-- Koordinat Arama -->
      <div v-if="activeTab === 'coordinates'" class="search-section">
        <h4>📍 Koordinat Arama</h4>
        <div class="coordinate-inputs">
          <div class="input-group">
            <label>Enlem (Latitude):</label>
            <input 
              v-model="coordinateSearch.latitude" 
              type="number" 
              step="0.000001"
              placeholder="39.9334"
              class="coordinate-input"
            />
          </div>
          <div class="input-group">
            <label>Boylam (Longitude):</label>
            <input 
              v-model="coordinateSearch.longitude" 
              type="number" 
              step="0.000001"
              placeholder="32.8597"
              class="coordinate-input"
            />
          </div>
          <button 
            class="search-btn"
            @click="searchByCoordinates"
            :disabled="!coordinateSearch.latitude || !coordinateSearch.longitude"
          >
            📍 Konuma Git
          </button>
        </div>
        
        <!-- Mevcut Konum -->
        <div class="current-location">
          <button class="location-btn" @click="getCurrentLocation">
            🎯 Mevcut Konumum
          </button>
        </div>
      </div>

      <!-- Adres Arama -->
      <div v-if="activeTab === 'address'" class="search-section">
        <h4>🏠 Adres Arama</h4>
        <div class="address-search">
          <input 
            v-model="addressSearch.query"
            type="text"
            placeholder="Ankara, Çankaya, Kızılay..."
            class="address-input"
            @keyup.enter="searchByAddress"
          />
          <button 
            class="search-btn"
            @click="searchByAddress"
            :disabled="!addressSearch.query"
          >
            🔍 Ara
          </button>
        </div>
        
        <!-- Son Aramalar -->
        <div v-if="recentAddresses.length > 0" class="recent-searches">
          <h5>📋 Son Aramalar</h5>
          <div class="recent-list">
            <div 
              v-for="(address, index) in recentAddresses" 
              :key="index"
              class="recent-item"
              @click="searchByAddress(address)"
            >
              📍 {{ address }}
            </div>
          </div>
        </div>
      </div>

      <!-- POI Arama -->
      <div v-if="activeTab === 'poi'" class="search-section">
        <h4>🎯 İlgi Çekici Yerler</h4>
        <div class="poi-categories">
          <div 
            v-for="category in poiCategories" 
            :key="category.id"
            class="poi-category"
            :class="{ active: selectedPOICategory === category.id }"
            @click="selectedPOICategory = category.id"
          >
            <span class="category-icon">{{ category.icon }}</span>
            <span class="category-name">{{ category.name }}</span>
          </div>
        </div>
        
        <div v-if="selectedPOICategory" class="poi-search">
          <input 
            v-model="poiSearch.query"
            type="text"
            :placeholder="`${getCurrentPOICategory().name} ara...`"
            class="poi-input"
            @keyup.enter="searchPOI"
          />
          <button 
            class="search-btn"
            @click="searchPOI"
          >
            🔍 {{ getCurrentPOICategory().name }} Ara
          </button>
        </div>

        <!-- POI Sonuçları -->
        <div v-if="poiResults.length > 0" class="poi-results">
          <h5>📍 Bulunan Yerler</h5>
          <div class="poi-list">
            <div 
              v-for="(poi, index) in poiResults" 
              :key="index"
              class="poi-item"
              @click="goToPOI(poi)"
            >
              <span class="poi-icon">{{ getCurrentPOICategory().icon }}</span>
              <div class="poi-info">
                <div class="poi-name">{{ poi.name }}</div>
                <div class="poi-distance">{{ poi.distance }}km uzaklıkta</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Gelişmiş Filtreler -->
      <div class="advanced-filters">
        <h4>⚙️ Gelişmiş Filtreler</h4>
        <div class="filter-options">
          <label class="filter-option">
            <input 
              v-model="advancedFilters.showElevation"
              type="checkbox"
            />
            <span>Yükseklik bilgisi göster</span>
          </label>
          <label class="filter-option">
            <input 
              v-model="advancedFilters.showDistance"
              type="checkbox"
            />
            <span>Mesafe hesapla</span>
          </label>
          <label class="filter-option">
            <input 
              v-model="advancedFilters.showPopulation"
              type="checkbox"
            />
            <span>Nüfus bilgisi dahil et</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'AdvancedSearchPanel',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close', 'search-coordinates', 'search-address', 'search-poi'],
  setup(props, { emit }) {
    const activeTab = ref('coordinates')
    
    const searchTabs = [
      { id: 'coordinates', name: 'Koordinat', icon: '📍' },
      { id: 'address', name: 'Adres', icon: '🏠' },
      { id: 'poi', name: 'POI', icon: '🎯' }
    ]

    const coordinateSearch = ref({
      latitude: '',
      longitude: ''
    })

    const addressSearch = ref({
      query: ''
    })

    const poiSearch = ref({
      query: ''
    })

    const selectedPOICategory = ref('')
    
    const poiCategories = [
      { id: 'hospital', name: 'Hastane', icon: '🏥' },
      { id: 'school', name: 'Okul', icon: '🎓' },
      { id: 'mosque', name: 'Cami', icon: '🕌' },
      { id: 'restaurant', name: 'Restoran', icon: '🍽️' },
      { id: 'gas_station', name: 'Benzinlik', icon: '⛽' },
      { id: 'bank', name: 'Banka', icon: '🏦' },
      { id: 'pharmacy', name: 'Eczane', icon: '💊' },
      { id: 'shopping', name: 'Alışveriş', icon: '🛒' }
    ]

    const recentAddresses = ref([
      'Ankara, Çankaya',
      'İstanbul, Kadıköy', 
      'İzmir, Konak'
    ])

    const poiResults = ref([])

    const advancedFilters = ref({
      showElevation: false,
      showDistance: false,
      showPopulation: false
    })

    const getCurrentPOICategory = () => {
      return poiCategories.find(cat => cat.id === selectedPOICategory.value) || { name: 'POI', icon: '🎯' }
    }

    const closePanel = () => {
      emit('close')
    }

    const searchByCoordinates = () => {
      const coords = {
        latitude: parseFloat(coordinateSearch.value.latitude),
        longitude: parseFloat(coordinateSearch.value.longitude)
      }
      emit('search-coordinates', coords)
    }

    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            coordinateSearch.value.latitude = position.coords.latitude.toFixed(6)
            coordinateSearch.value.longitude = position.coords.longitude.toFixed(6)
            searchByCoordinates()
          },
          (error) => {
            console.error('Konum alınamadı:', error)
            alert('Konum bilgisi alınamadı. Lütfen tarayıcı izinlerini kontrol edin.')
          }
        )
      } else {
        alert('Tarayıcınız konum bilgisini desteklemiyor.')
      }
    }

    const searchByAddress = (address = null) => {
      const query = address || addressSearch.value.query
      if (query) {
        // Son aramalara ekle
        if (!recentAddresses.value.includes(query)) {
          recentAddresses.value.unshift(query)
          if (recentAddresses.value.length > 5) {
            recentAddresses.value.pop()
          }
        }
        emit('search-address', query)
      }
    }

    const searchPOI = () => {
      if (selectedPOICategory.value) {
        // Demo POI sonuçları
        poiResults.value = [
          { name: 'Hacettepe Hastanesi', distance: 2.5 },
          { name: 'Ankara Şehir Hastanesi', distance: 15.2 },
          { name: 'Numune Hastanesi', distance: 3.8 }
        ]
        
        emit('search-poi', {
          category: selectedPOICategory.value,
          query: poiSearch.value.query
        })
      }
    }

    const goToPOI = (poi) => {
      emit('search-poi', {
        category: selectedPOICategory.value,
        selectedPOI: poi
      })
    }

    return {
      activeTab,
      searchTabs,
      coordinateSearch,
      addressSearch,
      poiSearch,
      selectedPOICategory,
      poiCategories,
      recentAddresses,
      poiResults,
      advancedFilters,
      getCurrentPOICategory,
      closePanel,
      searchByCoordinates,
      getCurrentLocation,
      searchByAddress,
      searchPOI,
      goToPOI
    }
  }
}
</script>

<style scoped>
.advanced-search-panel {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 320px;
  max-height: calc(100vh - 40px);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 1000;
  overflow-y: auto;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  border-radius: 12px 12px 0 0;
}

.panel-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.close-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.panel-content {
  padding: 16px;
}

.search-type-tabs {
  display: flex;
  margin-bottom: 16px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
}

.tab-btn {
  flex: 1;
  padding: 8px 4px;
  border: none;
  background: #f9fafb;
  color: #6b7280;
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn.active {
  background: #4f46e5;
  color: white;
}

.search-section {
  margin-bottom: 20px;
}

.search-section h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.coordinate-inputs {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.input-group label {
  font-size: 12px;
  font-weight: 500;
  color: #6b7280;
}

.coordinate-input,
.address-input,
.poi-input {
  padding: 8px 10px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 13px;
  transition: border-color 0.2s;
}

.coordinate-input:focus,
.address-input:focus,
.poi-input:focus {
  outline: none;
  border-color: #4f46e5;
}

.search-btn,
.location-btn {
  padding: 8px 12px;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 8px;
}

.search-btn:hover:not(:disabled),
.location-btn:hover {
  background: #4338ca;
}

.search-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.current-location {
  margin-top: 12px;
}

.location-btn {
  width: 100%;
  margin-top: 0;
  background: #059669;
}

.location-btn:hover {
  background: #047857;
}

.recent-searches {
  margin-top: 16px;
}

.recent-searches h5 {
  margin: 0 0 8px 0;
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
}

.recent-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.recent-item {
  padding: 6px 8px;
  background: #f3f4f6;
  border-radius: 4px;
  font-size: 11px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.recent-item:hover {
  background: #e5e7eb;
}

.poi-categories {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  margin-bottom: 12px;
}

.poi-category {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 10px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 11px;
}

.poi-category:hover {
  background: #f3f4f6;
}

.poi-category.active {
  background: #ede9fe;
  border-color: #7c3aed;
  color: #7c3aed;
}

.poi-results h5 {
  margin: 12px 0 8px 0;
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
}

.poi-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.poi-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background: #f9fafb;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.poi-item:hover {
  background: #f3f4f6;
}

.poi-info {
  flex: 1;
}

.poi-name {
  font-size: 12px;
  font-weight: 500;
  color: #374151;
}

.poi-distance {
  font-size: 10px;
  color: #6b7280;
}

.advanced-filters {
  border-top: 1px solid #e5e7eb;
  padding-top: 16px;
  margin-top: 16px;
}

.advanced-filters h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-option {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #6b7280;
  cursor: pointer;
}

.filter-option input[type="checkbox"] {
  width: 14px;
  height: 14px;
}
</style>
