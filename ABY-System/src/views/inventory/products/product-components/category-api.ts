// Ürünlerden benzersiz kategori listesi çıkaran fonksiyon
export async function fetchCategories(token: string | null, baseUrl: string): Promise<string[]> {
  const url = `${baseUrl}/api/v1/products`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    }
  });
  if (res.ok) {
    const data = await res.json();
    const products = Array.isArray(data) ? data : (data.items || []);
    // Kategorileri topla ve uniq yap
    const categories = [...new Set(products.map((p: any) => p.category).filter((c: any) => typeof c === 'string' && c))];
    return categories as string[];
  }
  return [];
}
