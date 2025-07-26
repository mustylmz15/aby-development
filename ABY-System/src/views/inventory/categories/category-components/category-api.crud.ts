import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const PRODUCTS_URL = API_BASE_URL + '/api/v1/products';

function getAuthToken(): string {
  return localStorage.getItem('token') || '';
}

export interface Category {
  name: string;
}

// Ürünlerin category kolonundan benzersiz kategori listesi türet
export async function fetchCategories(): Promise<Category[]> {
  const res = await axios.get(PRODUCTS_URL, {
    headers: {
      'Authorization': 'Bearer ' + getAuthToken(),
      'Content-Type': 'application/json',
    },
  });
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

// Ürün ekleyerek yeni kategori ekle (kategori ismiyle yeni ürün eklenir)
export async function addCategory(category: Category): Promise<Category> {
  // Burada sadece yeni bir ürün eklenirse kategori oluşur, backend'e göre uyarlayın
  const res = await axios.post(PRODUCTS_URL, { name: 'Kategori Ürünü', category: category.name }, {
    headers: {
      'Authorization': 'Bearer ' + getAuthToken(),
      'Content-Type': 'application/json',
    },
  });
  return { name: res.data.category };
}

// Kategori güncelleme: Tüm ürünlerde eski kategori adını yeniyle değiştir
export async function updateCategory(oldName: string, newName: string): Promise<void> {
  // Backend'de toplu güncelleme endpointiniz varsa onu kullanın, yoksa burada örnek olarak bırakıldı
  await axios.put(PRODUCTS_URL + '/update-category', { oldName, newName }, {
    headers: {
      'Authorization': 'Bearer ' + getAuthToken(),
      'Content-Type': 'application/json',
    },
  });
}

// Kategori silme: O kategoriye ait ürünleri sil veya kategori alanını boşalt
export async function deleteCategoryApi(categoryName: string): Promise<void> {
  // Backend'de toplu silme endpointiniz varsa onu kullanın, yoksa burada örnek olarak bırakıldı
  await axios.delete(PRODUCTS_URL + '/delete-category', {
    headers: {
      'Authorization': 'Bearer ' + getAuthToken(),
      'Content-Type': 'application/json',
    },
    data: { category: categoryName },
  });
}
