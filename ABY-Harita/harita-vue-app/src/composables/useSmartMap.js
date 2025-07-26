import { ref, reactive } from 'vue'
import maplibregl from 'maplibre-gl'
import { provinceData, calculateOptimalZoom, districtZoomLevels, provinceSizes } from '@/data/provinceData.js'

export const useSmartMap = () => {
  const map = ref(null)
  const mapLoaded = ref(false)
  const currentAnimation = ref(null)
  
  const navigation = reactive({
    currentView: 'turkey',
    selectedProvince: null,
    selectedDistrict: null,
    zoomLevel: 6,
    isAnimating: false
  })

  const martinUrl = "http://localhost:18080"

  // Akıllı il seçimi - dinamik zoom
  const smartSelectProvince = (provinceFeature) => {
    if (!map.value || navigation.isAnimating) return
    
    const provinceName = provinceFeature.properties.name
    const coordinates = provinceFeature.geometry.coordinates
    
    // İl verilerini al
    const provinceInfo = provinceData[provinceName]
    let targetZoom, targetCenter
    
    if (provinceInfo) {
      // Önceden tanımlanmış optimal değerler
      targetZoom = provinceInfo.zoom
      targetCenter = provinceInfo.center
    } else {
      // Dinamik hesaplama
      targetZoom = calculateOptimalZoom(provinceName)
      targetCenter = [coordinates[0], coordinates[1] + 0.15]
    }
    
    navigation.selectedProvince = {
      name: provinceName,
      coordinates: coordinates,
      optimalZoom: targetZoom,
      center: targetCenter
    }
    
    navigation.currentView = 'province'
    navigation.isAnimating = true
    
    // Sabit zoom ile anında geçiş
    map.value.jumpTo({
      center: targetCenter,
      zoom: targetZoom
    })
    
    // Kısa gecikme sonrası güncelleme
    setTimeout(() => {
      navigation.isAnimating = false
      navigation.zoomLevel = targetZoom
      highlightProvince(provinceName)
    }, 100)
  }

  // Akıllı ilçe seçimi
  const smartSelectDistrict = (districtFeature) => {
    if (!map.value || navigation.isAnimating) return
    
    const districtName = districtFeature.properties.name
    const coordinates = districtFeature.geometry.coordinates
    const provinceName = navigation.selectedProvince?.name
    
    // İlçe zoom seviyesini il büyüklüğüne göre ayarla
    const provinceSize = provinceSizes[provinceName] || 'medium'
    const targetZoom = districtZoomLevels[provinceSize]
    
    navigation.selectedDistrict = {
      name: districtName,
      coordinates: coordinates,
      optimalZoom: targetZoom
    }
    
    navigation.currentView = 'district'
    navigation.isAnimating = true
    
    // Sabit zoom ile anında geçiş
    map.value.jumpTo({
      center: coordinates,
      zoom: targetZoom
    })
    
    setTimeout(() => {
      navigation.isAnimating = false
      navigation.zoomLevel = targetZoom
      highlightDistrict(districtName)
    }, 100)
  }

  // İl vurgulama
  const highlightProvince = (provinceName) => {
    if (!map.value) return
    
    map.value.setPaintProperty('province-boundaries', 'line-color', [
      'case',
      ['==', ['get', 'name'], provinceName],
      '#e74c3c',
      '#6c7a89'
    ])
    
    map.value.setPaintProperty('province-boundaries', 'line-width', [
      'case',
      ['==', ['get', 'name'], provinceName],
      6,
      2
    ])
  }

  // İlçe vurgulama
  const highlightDistrict = (districtName) => {
    if (!map.value) return
    
    map.value.setPaintProperty('district-boundaries', 'line-color', [
      'case',
      ['==', ['get', 'name'], districtName],
      '#ff6600',
      '#8e9eab'
    ])
    
    map.value.setPaintProperty('district-boundaries', 'line-width', [
      'case',
      ['==', ['get', 'name'], districtName],
      5,
      1.4
    ])
  }

  // Akıllı geri dönüş
  const smartGoBack = () => {
    if (!map.value || navigation.isAnimating) return
    
    navigation.isAnimating = true
    
    if (navigation.currentView === 'district') {
      // İlçeden ile dön
      const provinceInfo = navigation.selectedProvince
      
      map.value.jumpTo({
        center: provinceInfo.center,
        zoom: provinceInfo.optimalZoom
      })
      
      setTimeout(() => {
        navigation.currentView = 'province'
        navigation.isAnimating = false
        navigation.zoomLevel = provinceInfo.optimalZoom
        
        // İlçe vurgusunu kaldır
        map.value.setPaintProperty('district-boundaries', 'line-color', '#8e9eab')
        map.value.setPaintProperty('district-boundaries', 'line-width', 1.4)
        
        // İl vurgusunu geri getir
        highlightProvince(provinceInfo.name)
      }, 100)
      
    } else if (navigation.currentView === 'province') {
      // İlden Türkiye'ye dön
      map.value.jumpTo({
        center: [35.2, 38.9],
        zoom: 6
      })
      
      setTimeout(() => {
        navigation.currentView = 'turkey'
        navigation.isAnimating = false
        navigation.zoomLevel = 6
        
        // Tüm vurguları temizle
        resetHighlights()
        
        navigation.selectedProvince = null
        navigation.selectedDistrict = null
      }, 100)
    }
  }

  // Vurguları temizle
  const resetHighlights = () => {
    if (!map.value) return
    
    map.value.setPaintProperty('province-boundaries', 'line-color', '#6c7a89')
    map.value.setPaintProperty('province-boundaries', 'line-width', 2)
    map.value.setPaintProperty('district-boundaries', 'line-color', '#8e9eab')
    map.value.setPaintProperty('district-boundaries', 'line-width', 1.4)
  }

  // Zoom güncelleme
  const updateZoom = () => {
    if (map.value) {
      navigation.zoomLevel = map.value.getZoom()
    }
  }

  return {
    map,
    mapLoaded,
    navigation,
    smartSelectProvince,
    smartSelectDistrict,
    smartGoBack,
    updateZoom,
    resetHighlights,
    martinUrl
  }
}
