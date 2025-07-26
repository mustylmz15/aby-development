import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/project-products`;

export async function createProjectProduct(token: string, payload: {
  projectId: string;
  productId: string;
  isConsignment?: boolean;
}) {
  const response = await axios.post(API_URL, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
