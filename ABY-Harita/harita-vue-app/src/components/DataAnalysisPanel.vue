<template>
  <div v-if="isVisible" class="data-analysis-panel">
    <div class="panel-header">
      <h3>📊 Veri Analiz Paneli</h3>
      <button class="close-btn" @click="closePanel">×</button>
    </div>
    
    <div class="panel-content">
      <!-- Bölge Seçimi -->
      <div class="section">
        <h4>🎯 Analiz Bölgesi</h4>
        <div class="region-info">
          <span v-if="selectedRegion">{{ selectedRegion.name }}</span>
          <span v-else class="no-selection">Haritadan bir bölge seçin</span>
        </div>
      </div>

      <!-- İstatistikler -->
      <div class="section" v-if="selectedRegion">
        <h4>📈 Bölge İstatistikleri</h4>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-label">Yükseklik:</span>
            <span class="stat-value">{{ regionStats.elevation }}m</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Alan:</span>
            <span class="stat-value">{{ regionStats.area }} km²</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Su Kütleleri:</span>
            <span class="stat-value">{{ regionStats.waterBodies }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Nehir Uzunluğu:</span>
            <span class="stat-value">{{ regionStats.riverLength }} km</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Dağ Tepeleri:</span>
            <span class="stat-value">{{ regionStats.peaks }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Yol Ağı:</span>
            <span class="stat-value">{{ regionStats.roads }} km</span>
          </div>
        </div>
      </div>

      <!-- Yükseklik Profili -->
      <div class="section" v-if="selectedRegion">
        <h4>🏔️ Yükseklik Profili</h4>
        <div class="elevation-profile">
          <div class="profile-chart">
            <div 
              v-for="(point, index) in elevationProfile" 
              :key="index"
              class="profile-bar"
              :style="{ 
                height: (point / maxElevation * 100) + '%',
                backgroundColor: getElevationColor(point)
              }"
              :title="`${point}m`"
            ></div>
          </div>
          <div class="profile-labels">
            <span>Min: {{ Math.min(...elevationProfile) }}m</span>
            <span>Ortalama: {{ Math.round(elevationProfile.reduce((a, b) => a + b, 0) / elevationProfile.length) }}m</span>
            <span>Max: {{ Math.max(...elevationProfile) }}m</span>
          </div>
        </div>
      </div>

      <!-- Analiz Butonları -->
      <div class="section">
        <h4>🔬 Analiz Araçları</h4>
        <div class="analysis-buttons">
          <button 
            class="analysis-btn" 
            @click="calculateAreaStatistics"
            :disabled="!selectedRegion"
          >
            📐 Alan Hesapla
          </button>
          <button 
            class="analysis-btn" 
            @click="exportData"
            :disabled="!selectedRegion"
          >
            💾 Veri Dışa Aktar
          </button>
          <button 
            class="analysis-btn" 
            @click="generateReport"
            :disabled="!selectedRegion"
          >
            📋 Rapor Oluştur
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'

export default {
  name: 'DataAnalysisPanel',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    selectedRegion: {
      type: Object,
      default: null
    }
  },
  emits: ['close', 'analyze-area', 'export-data', 'generate-report'],
  setup(props, { emit }) {
    const regionStats = ref({
      elevation: 0,
      area: 0,
      waterBodies: 0,
      riverLength: 0,
      peaks: 0,
      roads: 0
    })

    const elevationProfile = ref([250, 380, 420, 650, 890, 1240, 1580, 1820, 1650, 1420, 1180, 980, 750, 580, 320])
    
    const maxElevation = computed(() => Math.max(...elevationProfile.value))

    // Yükseklik renk kodlaması
    const getElevationColor = (elevation) => {
      if (elevation < 500) return '#22d3ee' // Mavi - Düşük
      if (elevation < 1000) return '#84cc16' // Yeşil - Orta
      if (elevation < 1500) return '#eab308' // Sarı - Yüksek
      if (elevation < 2000) return '#f97316' // Turuncu - Çok Yüksek
      return '#dc2626' // Kırmızı - En Yüksek
    }

    // Seçili bölge değiştiğinde istatistikleri güncelle
    watch(() => props.selectedRegion, (newRegion) => {
      if (newRegion) {
        updateRegionStatistics(newRegion)
      }
    }, { immediate: true })

    const updateRegionStatistics = (region) => {
      // Gerçek veriler için API çağrısı yapılabilir
      regionStats.value = {
        elevation: Math.floor(Math.random() * 2000 + 200),
        area: Math.floor(Math.random() * 5000 + 100),
        waterBodies: Math.floor(Math.random() * 20 + 1),
        riverLength: Math.floor(Math.random() * 500 + 50),
        peaks: Math.floor(Math.random() * 15 + 1),
        roads: Math.floor(Math.random() * 800 + 100)
      }

      // Yükseklik profilini güncelle
      elevationProfile.value = Array.from({ length: 15 }, () => 
        Math.floor(Math.random() * 2000 + 200)
      )
    }

    const closePanel = () => {
      emit('close')
    }

    const calculateAreaStatistics = () => {
      emit('analyze-area', props.selectedRegion)
    }

    const exportData = () => {
      emit('export-data', {
        region: props.selectedRegion,
        stats: regionStats.value,
        elevationProfile: elevationProfile.value
      })
    }

    const generateReport = () => {
      emit('generate-report', {
        region: props.selectedRegion,
        stats: regionStats.value,
        elevationProfile: elevationProfile.value
      })
    }

    return {
      regionStats,
      elevationProfile,
      maxElevation,
      getElevationColor,
      closePanel,
      calculateAreaStatistics,
      exportData,
      generateReport
    }
  }
}
</script>

<style scoped>
.data-analysis-panel {
  position: fixed;
  top: 20px;
  left: 20px;
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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

.section {
  margin-bottom: 20px;
}

.section h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.region-info {
  padding: 8px 12px;
  background: #f3f4f6;
  border-radius: 6px;
  font-size: 13px;
}

.no-selection {
  color: #6b7280;
  font-style: italic;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 10px;
  background: #f9fafb;
  border-radius: 6px;
  font-size: 12px;
}

.stat-label {
  color: #6b7280;
  font-weight: 500;
}

.stat-value {
  color: #111827;
  font-weight: 600;
}

.elevation-profile {
  background: #f9fafb;
  border-radius: 8px;
  padding: 12px;
}

.profile-chart {
  display: flex;
  align-items: end;
  height: 80px;
  gap: 2px;
  margin-bottom: 8px;
}

.profile-bar {
  flex: 1;
  min-height: 4px;
  border-radius: 2px 2px 0 0;
  transition: all 0.2s;
}

.profile-bar:hover {
  opacity: 0.8;
  transform: scaleY(1.1);
}

.profile-labels {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: #6b7280;
}

.analysis-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.analysis-btn {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: #ffffff;
  color: #374151;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.analysis-btn:hover:not(:disabled) {
  background: #f3f4f6;
  border-color: #9ca3af;
}

.analysis-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
