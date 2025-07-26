// Proje listesi çekme
export async function fetchProjects(token: string | null, baseUrl: string): Promise<any[]> {
  const url = `${baseUrl}/api/v1/projects`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    }
  });
  if (res.ok) {
    const data = await res.json();
    return Array.isArray(data) ? data : (data.items || []);
  }
  return [];
}

// Ürün listesi çekme
export async function fetchProducts(token: string | null, baseUrl: string): Promise<any[]> {
  const url = `${baseUrl}/api/v1/products`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    }
  });
  if (res.ok) {
    const data = await res.json();
    return Array.isArray(data) ? data : (data.items || []);
  }
  return [];
}
