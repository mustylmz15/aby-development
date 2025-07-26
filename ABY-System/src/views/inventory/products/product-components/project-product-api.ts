
// Tüm satırı göndermek için ProjectProduct tipini kullanıyoruz
export async function updateProjectProductConsignment(
  token: string,
  projectId: string,
  productId: string,
  isConsignment: boolean
) {
  // Yeni endpoint ve payload
  const url = `${API_URL}/${projectId}/${productId}`;
  const body = { isConsignment };
  const response = await axios.put(
    url,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/project-products`;

export async function fetchProjectProducts(token: string) {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
