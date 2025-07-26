<template>
  <div class="map-ui-overlay">
    <!-- Akıllı Zoom Göstergesi -->
    <div class="smart-zoom-indicator" :class="{ 'animating': navigation.isAnimating }">
      <div class="zoom-level">{{ zoomText }}</div>
      <div class="zoom-progress">
        <div 
          class="zoom-bar" 
          :style="{ width: `${zoomProgress}%` }"
        ></div>
      </div>
    </div>

    <!-- Navigasyon Breadcrumb -->
    <div class="navigation-breadcrumb">
      <div class="breadcrumb-item active">
        <i class="icon">🇹🇷</i>
        <span>Türkiye</span>
      </div>
      <div 
        v-if="navigation.selectedProvince" 
        class="breadcrumb-item active"
      >
        <i class="icon">🏙️</i>
        <span>{{ navigation.selectedProvince.name }}</span>
      </div>
      <div 
        v-if="navigation.selectedDistrict" 
        class="breadcrumb-item active"
      >
        <i class="icon">🏘️</i>
        <span>{{ navigation.selectedDistrict.name }}</span>
      </div>
    </div>

    <!-- Akıllı Geri Dönüş -->
    <Transition name="slide-up">
      <div v-if="showBackButton" class="smart-back-button">
        <button 
          @click="$emit('goBack')" 
          :disabled="navigation.isAnimating"
          class="back-btn"
        >
          <i class="icon">⬅️</i>
          <span>{{ backButtonText }}</span>
        </button>
      </div>
    </Transition>

    <!-- Animasyon İndikatörü -->
    <Transition name="fade">
      <div v-if="navigation.isAnimating" class="animation-indicator">
        <div class="spinner"></div>
        <span>{{ animationText }}</span>
      </div>
    </Transition>

    <!-- Proje Seçici - Gelişmiş -->
    <div class="advanced-project-selector">
      <div class="selector-header">
        <i class="icon">🎯</i>
        <span>Proje Seçimi</span>
      </div>
      <select 
        :value="selectedProject" 
        @change="$emit('projectChange', $event.target.value)"
        class="project-select"
      >
        <option value="">Proje Seçiniz...</option>
        <option value="kgys">KGYS Projesi</option>
        <option value="smart-city">Akıllı Şehir</option>
        <option value="traffic">Trafik Yönetimi</option>
      </select>
    </div>

    <!-- Harita Bilgileri -->
    <div class="map-info-panel">
      <div class="info-item">
        <span class="label">Zoom:</span>
        <span class="value">{{ navigation.zoomLevel.toFixed(1) }}</span>
      </div>
      <div class="info-item">
        <span class="label">Görünüm:</span>
        <span class="value">{{ viewModeText }}</span>
      </div>
      <div class="info-item" v-if="navigation.selectedProvince">
        <span class="label">İl:</span>
        <span class="value">{{ navigation.selectedProvince.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'MapUIOverlay',
  props: {
    navigation: {
      type: Object,
      required: true
    },
    selectedProject: {
      type: String,
      default: ''
    }
  },
  emits: ['goBack', 'projectChange'],
  setup(props) {
    const zoomText = computed(() => {
      const view = props.navigation.currentView
      if (view === 'turkey') return 'Türkiye Haritası'
      if (view === 'province') return 'İl Detayı'
      if (view === 'district') return 'İlçe Detayı'
      return 'Harita'
    })

    const zoomProgress = computed(() => {
      const zoom = props.navigation.zoomLevel
      const maxZoom = 12
      const minZoom = 6
      return Math.min(100, Math.max(0, ((zoom - minZoom) / (maxZoom - minZoom)) * 100))
    })

    const backButtonText = computed(() => {
      if (props.navigation.currentView === 'district' && props.navigation.selectedProvince) {
        return `${props.navigation.selectedProvince.name} İline Dön`
      }
      return 'Türkiye Haritası'
    })

    const showBackButton = computed(() => {
      return props.navigation.currentView !== 'turkey'
    })

    const animationText = computed(() => {
      const view = props.navigation.currentView
      if (view === 'province') return 'İl detayına geçiliyor...'
      if (view === 'district') return 'İlçe detayına geçiliyor...'
      return 'Harita güncelleniyor...'
    })

    const viewModeText = computed(() => {
      const view = props.navigation.currentView
      if (view === 'turkey') return 'Genel Görünüm'
      if (view === 'province') return 'İl Görünümü'
      if (view === 'district') return 'İlçe Görünümü'
      return 'Bilinmiyor'
    })

    return {
      zoomText,
      zoomProgress,
      backButtonText,
      showBackButton,
      animationText,
      viewModeText
    }
  }
}
</script>

<style scoped>
.map-ui-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1000;
}

.smart-zoom-indicator {
  position: absolute;
  top: 15px;
  left: 20px;
  background: rgba(255, 255, 255, 0.95);
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  pointer-events: auto;
  transition: all 0.3s ease;
}

.smart-zoom-indicator.animating {
  background: rgba(46, 204, 113, 0.95);
  color: white;
}

.zoom-level {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 8px;
}

.zoom-progress {
  width: 120px;
  height: 4px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.zoom-bar {
  height: 100%;
  background: linear-gradient(90deg, #3498db, #2ecc71);
  transition: width 0.3s ease;
}

.navigation-breadcrumb {
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  pointer-events: auto;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.breadcrumb-item.active {
  background: rgba(52, 152, 219, 0.9);
  color: white;
}

.smart-back-button {
  position: absolute;
  top: 15px;
  right: 20px;
  pointer-events: auto;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
  transition: all 0.3s ease;
}

.back-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(231, 76, 60, 0.4);
}

.back-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.animation-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 12px;
  font-weight: 500;
  pointer-events: auto;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.advanced-project-selector {
  position: absolute;
  top: 80px;
  right: 20px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  pointer-events: auto;
}

.selector-header {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
}

.project-select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 13px;
  min-width: 160px;
  background: white;
}

.map-info-panel {
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 12px;
  border-radius: 8px;
  font-size: 12px;
  pointer-events: auto;
}

.info-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  min-width: 120px;
}

.label {
  font-weight: 500;
  opacity: 0.8;
}

.value {
  font-weight: 600;
}

/* Animasyonlar */
.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from, .slide-up-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
