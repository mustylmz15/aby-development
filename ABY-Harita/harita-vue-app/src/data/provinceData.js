// İllerin merkez koordinatları ve optimal zoom seviyeleri
export const provinceData = {
  'İstanbul': {
    center: [28.9784, 41.0082],
    zoom: 9.2,
    bounds: [[28.6, 40.8], [29.3, 41.3]]
  },
  'Ankara': {
    center: [32.8597, 39.9334],
    zoom: 8.8,
    bounds: [[32.2, 39.4], [33.5, 40.4]]
  },
  'İzmir': {
    center: [27.1428, 38.4237],
    zoom: 8.9,
    bounds: [[26.8, 38.1], [27.5, 38.8]]
  },
  'Malatya': {
    center: [38.3552, 38.3552],
    zoom: 8.4,
    bounds: [[37.8, 37.9], [38.9, 38.8]]
  },
  'Bursa': {
    center: [29.0601, 40.1826],
    zoom: 8.7,
    bounds: [[28.7, 39.9], [29.4, 40.5]]
  },
  'Antalya': {
    center: [30.7133, 36.8969],
    zoom: 8.6,
    bounds: [[29.9, 36.2], [31.5, 37.4]]
  },
  'Adana': {
    center: [35.3213, 37.0000],
    zoom: 8.8,
    bounds: [[34.8, 36.5], [35.8, 37.5]]
  },
  'Gaziantep': {
    center: [37.3781, 37.0662],
    zoom: 9.0,
    bounds: [[36.9, 36.7], [37.8, 37.4]]
  },
  'Konya': {
    center: [32.4846, 37.8746],
    zoom: 8.0,
    bounds: [[31.8, 37.2], [33.2, 38.5]]
  },
  'Şanlıurfa': {
    center: [38.7955, 37.1674],
    zoom: 8.7,
    bounds: [[38.3, 36.8], [39.3, 37.6]]
  },
  'Kayseri': {
    center: [35.4826, 38.7312],
    zoom: 8.4,
    bounds: [[35.0, 38.4], [35.9, 39.1]]
  },
  'Trabzon': {
    center: [39.7168, 41.0015],
    zoom: 9.2,
    bounds: [[39.2, 40.7], [40.2, 41.3]]
  },
  'Diyarbakır': {
    center: [40.2306, 37.9144],
    zoom: 8.8,
    bounds: [[39.8, 37.5], [40.7, 38.3]]
  },
  'Samsun': {
    center: [36.3350, 41.2867],
    zoom: 8.9,
    bounds: [[35.9, 40.9], [36.8, 41.6]]
  },
  'Balıkesir': {
    center: [27.8826, 39.6484],
    zoom: 8.4,
    bounds: [[27.2, 39.2], [28.5, 40.1]]
  },
  'Kahramanmaraş': {
    center: [36.9267, 37.5858],
    zoom: 9.0,
    bounds: [[36.4, 37.2], [37.4, 38.0]]
  },
  'Van': {
    center: [43.4089, 38.4891],
    zoom: 8.6,
    bounds: [[42.6, 37.9], [44.2, 39.1]]
  },
  'Aydın': {
    center: [27.8414, 37.8444],
    zoom: 8.8,
    bounds: [[27.4, 37.4], [28.3, 38.3]]
  },
  'Denizli': {
    center: [29.0875, 37.7648],
    zoom: 8.9,
    bounds: [[28.6, 37.4], [29.6, 38.1]]
  },
  'Sakarya': {
    center: [30.4358, 40.7569],
    zoom: 9.1,
    bounds: [[30.0, 40.4], [30.9, 41.1]]
  },
  'Manisa': {
    center: [27.4305, 38.6191],
    zoom: 8.7,
    bounds: [[27.0, 38.2], [27.9, 39.0]]
  },
  'Muğla': {
    center: [28.3665, 37.2153],
    zoom: 8.2,
    bounds: [[27.8, 36.7], [28.9, 37.7]]
  },
  'Ordu': {
    center: [37.8764, 40.9839],
    zoom: 9.0,
    bounds: [[37.4, 40.6], [38.4, 41.3]]
  },
  'Tekirdağ': {
    center: [27.5117, 40.9780],
    zoom: 9.2,
    bounds: [[27.1, 40.6], [27.9, 41.3]]
  },
  'Eskişehir': {
    center: [30.5206, 39.7767],
    zoom: 8.9,
    bounds: [[30.1, 39.4], [30.9, 40.1]]
  },
  'Erzurum': {
    center: [41.2769, 39.9334],
    zoom: 8.5,
    bounds: [[40.8, 39.5], [41.7, 40.3]]
  },
  'Mersin': {
    center: [34.6396, 36.8121],
    zoom: 8.7,
    bounds: [[34.2, 36.4], [35.1, 37.2]]
  },
  'Hatay': {
    center: [36.4018, 36.4018],
    zoom: 8.8,
    bounds: [[35.9, 35.9], [36.9, 36.9]]
  }
}

// İlçe zoom seviyeleri
export const districtZoomLevels = {
  small: 10.5,    // Küçük ilçeler
  medium: 10.2,   // Orta ilçeler  
  large: 9.8,     // Büyük ilçeler
  metro: 9.5      // Metropolitan ilçeler
}

// İl büyüklük kategorileri
export const provinceSizes = {
  'İstanbul': 'metro',
  'Ankara': 'metro', 
  'İzmir': 'metro',
  'Bursa': 'large',
  'Antalya': 'large',
  'Adana': 'large',
  'Konya': 'large',
  'Gaziantep': 'medium',
  'Kayseri': 'medium',
  'Malatya': 'large',
  'Trabzon': 'medium',
  'Diyarbakır': 'medium',
  'Samsun': 'medium',
  'Balıkesir': 'medium',
  'Kahramanmaraş': 'small',
  'Van': 'small',
  'Aydın': 'small',
  'Denizli': 'small',
  'Sakarya': 'small',
  'Manisa': 'small',
  'Muğla': 'small',
  'Ordu': 'small',
  'Tekirdağ': 'small',
  'Eskişehir': 'small',
  'Erzurum': 'small',
  'Mersin': 'large',
  'Hatay': 'medium'
}

// Dinamik zoom hesaplama
export const calculateOptimalZoom = (provinceName, bounds) => {
  const data = provinceData[provinceName]
  if (data) {
    return data.zoom
  }
  
  // Eğer il verisi yoksa bounds'a göre hesapla
  if (bounds) {
    const width = bounds[1][0] - bounds[0][0]
    const height = bounds[1][1] - bounds[0][1] 
    const area = width * height
    
    if (area > 2) return 8.0      // Çok büyük iller
    if (area > 1) return 8.5      // Büyük iller
    if (area > 0.5) return 9.0    // Orta iller
    return 9.5                    // Küçük iller
  }
  
  return 8.8 // Varsayılan
}
