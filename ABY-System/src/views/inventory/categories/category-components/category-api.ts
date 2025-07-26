// Basit kategori API fonksiyonları (TypeScript)

import axios from 'axios';

// .env dosyasından alınan base url
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const API_URL = API_BASE_URL + '/api/v1/products';

// Auth token'ı localStorage veya başka bir global state'den dinamik al
function getAuthToken(): string {
  // Tüm uygulamada tek anahtar: 'token'
  return localStorage.getItem('token') || '';
}

export interface Category {
  name: string;
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await axios.get(API_URL, {
    headers: {
      'Authorization': 'Bearer ' + getAuthToken(),
      'Content-Type': 'application/json',
    },
  });
  // products endpointinden kategorileri benzersiz olarak türet
  const products = res.data;
  const categories: Category[] = [];
  const seen = new Set<string>();
  for (const p of products) {
    if (p.category && !seen.has(p.category)) {
      categories.push({ name: p.category });
      seen.add(p.category);
    }
  }
  return categories;
}
