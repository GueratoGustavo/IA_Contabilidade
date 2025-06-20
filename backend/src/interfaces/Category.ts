export interface Category {
  id: string;
  name: string;
  parentCategoryId?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
