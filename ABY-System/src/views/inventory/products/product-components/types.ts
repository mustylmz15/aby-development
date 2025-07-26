export interface Project {
  id: string;
  code: string;
  name: string;
  [key: string]: any;
}
export interface Product {
  id: string;
  sku: string;
  name: string;
  [key: string]: any;
}
export interface ProjectProduct {
  id: string;
  projectId: string;
  productId: string;
  isConsignment: boolean;
  project: Project;
  product: Product;
}
