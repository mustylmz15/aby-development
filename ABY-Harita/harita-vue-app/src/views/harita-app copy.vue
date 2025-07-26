<template>
  <div class="harita-container">
    <!-- Proje Seçici -->
    <div class="project-selector-container">
      <label for="project-select">Proje Seçimi:</label>
      <select name="projects" id="project-select" v-model="selectedProject" @change="onProjectChange">
        <option value="">Proje Seçiniz...</option>
        <option value="kgys">KGYS Projesi</option>
      </select>
    </div>
    
    <!-- Harita Container -->
    <div id="map" ref="mapContainer"></div>
    
    <!-- Zoom Gösterge -->
    <div class="zoom-indicator" id="zoom-indicator">
      {{ zoomIndicatorText }}
    </div>
    
    <!-- Geri Dönüş Butonu -->
    <button 
      v-if="showBackButton" 
      class="back-button" 
      id="back-button"
      @click="goBackToTurkey"
    >
      {{ backButtonText }}
    </button>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, onUnmounted, version } from 'vue'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

export default {
  name: 'HaritaApp',
  setup() {
    // Refs
    const mapContainer = ref(null)
    const map = ref(null)
    const mapLoaded = ref(false)
    const selectedProject = ref('')
    
    // Navigation State
    const navigation = reactive({
      currentView: 'turkey',
      selectedProvince: null,
      selectedDistrict: null
    })
    
    // Demo Veri Setleri (HTML'den kopyalandı)
    const kgysIlVerileri = { 'Malatya': { sabitKamera: 1000, hareketliKamera: 500, switch: 500, ups: 500 } }
    const kgysIlceVerileri = { 'Akçadağ': { sabitKamera: 300, hareketliKamera: 150, switch: 150, ups: 150 } }
    const kgysYerelVerileri = { 'Kültür Mahallesi': {} }
    const kgysNoktaVerileri = { 'Akçadağ Yolu Belediye Önü': { sabitKamera: 2, hareketliKamera: 1, switch: 1, ups: 1 } }
    
    const kgysNoktaGeoJSON = {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [37.9985, 38.3440]
          },
          'properties': {
            'name': 'Akçadağ Yolu Belediye Önü'
          }
        }
      ]
    }
    
    const martinUrl = "http://localhost:8080"
    
    // Computed Properties
    const zoomIndicatorText = computed(() => {
      const zoom = map.value?.getZoom()
      if (zoom === 6) return 'Türkiye Haritası'
      if (zoom === 8.2) return 'İl Detayı'
      if (zoom === 10) return 'İlçe Detayı'
      return zoom ? `Zoom: ${zoom.toFixed(1)}` : 'Zoom: 6'
    })
    
    const backButtonText = computed(() => {
      if (navigation.currentView === 'district' && navigation.selectedProvince) {
        return `${navigation.selectedProvince.name} İline Dön`
      }
      return 'Türkiye Haritası'
    })
    
    const showBackButton = computed(() => {
      return navigation.currentView !== 'turkey'
    })
    
    // Zoom gösterge güncelleme fonksiyonu
    const updateZoomIndicator = () => {
      // Bu fonksiyon computed property ile otomatik olarak güncelleniyor
    }
    
    // Proje değişikliği
    const onProjectChange = () => {
      if (selectedProject.value === 'kgys') {
        // KGYS katmanlarını göster
        if (map.value) {
          map.value.setLayoutProperty('kgys-provinces', 'visibility', 'visible')
          map.value.setLayoutProperty('kgys-districts', 'visibility', 'visible')
          map.value.setLayoutProperty('kgys-local', 'visibility', 'visible')
          map.value.setLayoutProperty('kgys-noktalar', 'visibility', 'visible')
        }
      } else {
        // Katmanları gizle
        if (map.value) {
          map.value.setLayoutProperty('kgys-provinces', 'visibility', 'none')
          map.value.setLayoutProperty('kgys-districts', 'visibility', 'none')
          map.value.setLayoutProperty('kgys-local', 'visibility', 'none')
          map.value.setLayoutProperty('kgys-noktalar', 'visibility', 'none')
        }
      }
    }
    
    // Map Functions
    const initializeMap = () => {
      try {
        map.value = new maplibregl.Map({
          container: mapContainer.value,
          center: [35.2, 38.9],
          zoom: 6, // Sabit Türkiye zoom seviyesi
          interactive: false, // Zoom kontrolleri devre dışı
          style: {
            version: 8,
            glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
            sources: {
              'osm-polygons': { type: 'vector', url: `${martinUrl}/planet_osm_polygon` },
              'osm-lines': { type: 'vector', url: `${martinUrl}/planet_osm_line` },
              'osm-roads': { type: 'vector', url: `${martinUrl}/planet_osm_roads` },
              'osm-points': { type: 'vector', url: `${martinUrl}/planet_osm_point` },
              'kgys-noktalar-kaynak': { type: 'geojson', data: kgysNoktaGeoJSON }
            },
            layers: [
              { id: 'background', type: 'background', paint: { 'background-color': '#f8f4f0' } },
              { id: 'water', source: 'osm-polygons', 'source-layer': 'planet_osm_polygon', type: 'fill', filter: ['any', ['has', 'waterway'], ['==', 'natural', 'water']], paint: { 'fill-color': '#a0c8f0' } },
              { 
                'id': 'roads-minor', 
                'source': 'osm-roads', 
                'source-layer': 'planet_osm_roads', 
                'type': 'line', 
                'minzoom': 11, 
                'filter': ['in', 'highway', 'tertiary', 'residential', 'service', 'unclassified', 'living_street', 'pedestrian', 'footway'], 
                'paint': { 
                  'line-color': '#ffe066', // Sarı
                  'line-width': [
                    'interpolate', ['linear'], ['zoom'],
                    11, 0.8,
                    13, 1.2,
                    15, 2,
                    17, 3.5,
                    19, 6
                  ],
                  'line-opacity': [
                    'interpolate', ['linear'], ['zoom'],
                    11, 0.4,
                    13, 0.6,
                    15, 0.8,
                    17, 1,
                    19, 1
                  ]
                }
              },
              { // Otoyollar (motorway) kırmızı
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
                    6, 1.5,
                    12, 4,
                    16, 8
                  ]
                }
              },
              { // Karayolları (trunk, primary, secondary) açık turuncu
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
                    6, 0.8,
                    12, 2.5,
                    16, 5
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

        // Navigation kontrolü ekle
        map.value.addControl(new maplibregl.NavigationControl(), 'top-right')

        // Zoom event listener'ı ekle
        map.value.on('zoom', updateZoomIndicator)

        map.value.on('load', () => {
          mapLoaded.value = true
          console.log('Harita başarıyla yüklendi')
          
          // Popup'ı oluştur
          const popup = new maplibregl.Popup({ 
            closeButton: false, 
            closeOnClick: false, 
            className: 'custom-popup' 
          })
          
          // KGYS katmanlarını ekle (başlangıçta gizli)
          map.value.addLayer({ 
            id: 'kgys-provinces', 
            type: 'circle', 
            source: 'osm-points', 
            'source-layer': 'planet_osm_point', 
            filter: ['all', ['==', 'place', 'city'], ['!=', 'name', 'Kocaeli']], 
            paint: { 
              'circle-color': '#e74c3c', 
              'circle-radius': 8, 
              'circle-stroke-width': 1, 
              'circle-stroke-color': '#ffffff' 
            }, 
            layout: { 'visibility': 'none' } 
          })
          
          map.value.addLayer({ 
            id: 'kgys-districts', 
            type: 'circle', 
            source: 'osm-points', 
            'source-layer': 'planet_osm_point', 
            filter: ['==', 'place', 'town'], 
            paint: { 
              'circle-color': '#3498db', 
              'circle-radius': 6, 
              'circle-stroke-width': 1, 
              'circle-stroke-color': '#ffffff' 
            }, 
            layout: { 'visibility': 'none' } 
          })
          
          map.value.addLayer({ 
            id: 'kgys-local', 
            type: 'circle', 
            source: 'osm-points', 
            'source-layer': 'planet_osm_point', 
            filter: ['in', 'place', 'village', 'suburb', 'hamlet', 'quarter', 'neighbourhood'], 
            paint: { 
              'circle-color': '#2ecc71', 
              'circle-radius': 5, 
              'circle-stroke-width': 1, 
              'circle-stroke-color': '#ffffff' 
            }, 
            layout: { 'visibility': 'none' } 
          })
          
          map.value.addLayer({ 
            id: 'kgys-noktalar', 
            type: 'circle', 
            source: 'kgys-noktalar-kaynak', 
            paint: { 
              'circle-color': '#2c3e50', 
              'circle-radius': 7, 
              'circle-stroke-width': 2, 
              'circle-stroke-color': '#ffffff' 
            }, 
            layout: { 'visibility': 'none' } 
          })
          
          // İl tıklama events
          map.value.on('click', 'province-name-labels', (e) => {
            console.log('İl tıklandı:', e.features[0].properties.name)
            selectProvince(e.features[0])
          })

          // İlçe tıklama events
          map.value.on('click', 'district-name-labels', (e) => {
            console.log('İlçe tıklandı:', e.features[0].properties.name)
            selectDistrict(e.features[0])
          })
          
          updateZoomIndicator()
        })

        map.value.on('error', (e) => {
          console.error('Harita hatası:', e)
        })

      } catch (error) {
        console.error('Harita oluşturma hatası:', error)
      }
    }
    
    // Navigation Functions (HTML'den tam kopyalandı)
    const selectProvince = (provinceFeature) => {
      if (!map.value) return
      
      navigation.selectedProvince = {
        name: provinceFeature.properties.name,
        coordinates: provinceFeature.geometry.coordinates
      }
      navigation.currentView = 'province'

      // İl merkez koordinatını biraz güneye kaydır (latitude'den 0.15 çıkar)
      const adjustedCenter = [
        provinceFeature.geometry.coordinates[0], 
        provinceFeature.geometry.coordinates[1] + 0.15
      ]
      
      map.value.jumpTo({ center: adjustedCenter, zoom: 8.2 })

      // Eski overlay'ı kaldır
      if (map.value.getLayer('selected-province-highlight')) {
        map.value.removeLayer('selected-province-highlight')
      }
      if (map.value.getSource('selected-province-highlight')) {
        map.value.removeSource('selected-province-highlight')
      }

      // Province boundaries katmanını kırmızı ve kalın yap
      map.value.setPaintProperty('province-boundaries', 'line-color', [
        'case',
        ['==', ['get', 'name'], provinceFeature.properties.name],
        '#e74c3c', // Seçili il kırmızı
        '#6c7a89'  // Diğerleri gri
      ])
      map.value.setPaintProperty('province-boundaries', 'line-width', [
        'case',
        ['==', ['get', 'name'], provinceFeature.properties.name],
        6, // Seçili il daha kalın ve belirgin
        2  // Diğerleri normal
      ])
    }

    const selectDistrict = (districtFeature) => {
      if (!map.value) return
      
      navigation.selectedDistrict = {
        name: districtFeature.properties.name,
        coordinates: districtFeature.geometry.coordinates
      }
      navigation.currentView = 'district'

      // İlçe merkez koordinatını ayarla
      const adjustedCenter = [
        districtFeature.geometry.coordinates[0],
        districtFeature.geometry.coordinates[1]
      ]
      
      map.value.jumpTo({ center: adjustedCenter, zoom: 10 })

      // İlçe sınırlarını canlı portakal renk ve kalın yap
      map.value.setPaintProperty('district-boundaries', 'line-color', [
        'case',
        ['==', ['get', 'name'], districtFeature.properties.name],
        '#ff6600', // Seçili ilçe canlı portakal rengi
        '#8e9eab'  // Diğerleri gri
      ])
      map.value.setPaintProperty('district-boundaries', 'line-width', [
        'case',
        ['==', ['get', 'name'], districtFeature.properties.name],
        5, // Seçili ilçe daha kalın ve belirgin
        1.4  // Diğerleri normal
      ])
    }

    const goBackToTurkey = () => {
      if (!map.value) return
      
      if (navigation.currentView === 'district') {
        // İlçeden ile dön
        const provinceCenter = [
          navigation.selectedProvince.coordinates[0], 
          navigation.selectedProvince.coordinates[1] + 0.15
        ]
        map.value.jumpTo({ center: provinceCenter, zoom: 8.2 })
        navigation.currentView = 'province'

        // İlçe sınırlarını normale döndür
        map.value.setPaintProperty('district-boundaries', 'line-color', '#8e9eab')
        map.value.setPaintProperty('district-boundaries', 'line-width', 1.4)

        // İl sınırlarını tekrar vurgula
        map.value.setPaintProperty('province-boundaries', 'line-color', [
          'case',
          ['==', ['get', 'name'], navigation.selectedProvince.name],
          '#e74c3c', // Seçili il kırmızı
          '#6c7a89'  // Diğerleri gri
        ])
        map.value.setPaintProperty('province-boundaries', 'line-width', [
          'case',
          ['==', ['get', 'name'], navigation.selectedProvince.name],
          6, // Seçili il kalın
          2  // Diğerleri normal
        ])

      } else if (navigation.currentView === 'province') {
        // İlden Türkiye'ye dön
        map.value.jumpTo({ center: [35.2, 38.9], zoom: 6 })
        navigation.currentView = 'turkey'

        // İl sınırlarını tamamen normale döndür (conditional styling'i kaldır)
        map.value.setPaintProperty('province-boundaries', 'line-color', '#6c7a89')
        map.value.setPaintProperty('province-boundaries', 'line-width', 2)

        // İlçe sınırlarını da normale döndür
        map.value.setPaintProperty('district-boundaries', 'line-color', '#8e9eab')
        map.value.setPaintProperty('district-boundaries', 'line-width', 1.4)

        // Seçili il vurgulamasını kaldır
        if (map.value.getLayer('selected-province-highlight')) {
          map.value.removeLayer('selected-province-highlight')
        }
        if (map.value.getSource('selected-province-highlight')) {
          map.value.removeSource('selected-province-highlight')
        }

        // Province highlight overlay'ini de kaldır
        if (map.value.getLayer('province-highlight-overlay')) {
          map.value.removeLayer('province-highlight-overlay')
        }
        if (map.value.getSource('province-highlight-overlay')) {
          map.value.removeSource('province-highlight-overlay')
        }

        navigation.selectedProvince = null
        navigation.selectedDistrict = null
      }
    }
    
    // Lifecycle
    onMounted(() => {
      console.log('Component mounted, harita başlatılıyor...')
      initializeMap()
      
      // Window resize event listener ekle
      const handleResize = () => {
        if (map.value) {
          map.value.resize()
        }
      }
      window.addEventListener('resize', handleResize)
      
      // Cleanup fonksiyonu için resize listener'ı kaydet
      onUnmounted(() => {
        window.removeEventListener('resize', handleResize)
        if (map.value) {
          map.value.remove()
        }
      })
    })

    return {
      mapContainer,
      mapLoaded,
      selectedProject,
      zoomIndicatorText,
      backButtonText,
      showBackButton,
      goBackToTurkey,
      onProjectChange,
      vueVersion: version
    }
  }
}
</script>

<style scoped>
/* HTML'den alınan CSS stilleri - Tam ekran için düzeltmeler */
.harita-container {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  z-index: 1;
}

#map {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.project-selector-container {
  position: absolute;
  top: 10px;
  right: 80px;
  z-index: 1000;
  background: white;
  padding: 10px 15px;
  border-radius: 4px;
  box-shadow: 0 1px 5px rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
}

.project-selector-container label {
  margin-right: 10px;
  font-weight: bold;
  font-size: 14px;
  color: #333;
}

.project-selector-container select {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.zoom-indicator {
  position: absolute;
  top: 10px;
  left: 20px;
  z-index: 1000;
  background: rgba(255,255,255,0.95);
  padding: 7px 14px;
  border-radius: 4px;
  font-size: 15px;
  color: #222;
  box-shadow: 0 1px 5px rgba(0,0,0,0.13);
  font-weight: bold;
  letter-spacing: 0.5px;
}

.back-button {
  position: absolute;
  top: 10px;
  left: 160px;
  z-index: 1000;
  background: #e74c3c;
  color: white;
  padding: 7px 14px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 1px 5px rgba(0,0,0,0.13);
  font-weight: bold;
  border: none;
  transition: background-color 0.3s;
}

.back-button:hover {
  background: #c0392b;
}

.back-button:active {
  transform: translateY(1px);
}

/* Custom popup stilleri */
:global(.custom-popup .maplibregl-popup-content) {
  padding: 15px;
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.15);
  font-size: 14px;
  color: #333;
}

:global(.custom-popup h3) {
  margin: 0 0 10px;
  color: #2c3e50;
  font-size: 16px;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
}

:global(.custom-popup ul) {
  list-style: none;
  margin: 0;
  padding: 0;
}

:global(.custom-popup li) {
  margin-bottom: 5px;
}

:global(.custom-popup li strong) {
  color: #e74c3c;
  margin-right: 5px;
}

:global(.custom-popup li strong.district-data) {
  color: #3498db;
}

:global(.custom-popup li strong.local-data) {
  color: #2ecc71;
}

:global(.custom-popup li strong.point-data) {
  color: #2c3e50;
}
</style>
