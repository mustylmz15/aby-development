export interface ProductFormModel {
  id?: string;
  parentId: string | null;
  sku: string;
  name: string;
  description?: string;
  category: string;
  brand: string;
  model: string;
  isSerialized: boolean;
  isConsumable: boolean;
  unitOfMeasure: string;
  minimumStock: number | null;
  specifications: Record<string, any>;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}
