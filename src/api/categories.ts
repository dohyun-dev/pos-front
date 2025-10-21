import axios from "@/lib/axios";

export interface Category {
  id: number;
  title: string;
  order: number;
  position: number;
  titleI18n?: {
    languages: {
      "en-US"?: string;
      "ko-KR"?: string;
    };
  };
  franchiseNewBadge?: boolean;
  franchiseUpdateBadge?: boolean;
}

export interface CreateCategoryDto {
  title: string;
  titleI18n?: {
    languages: {
      "en-US"?: string;
      "ko-KR"?: string;
    };
  };
}

export interface UpdateCategoryDto extends Partial<CreateCategoryDto> {
  id: number;
  order?: number;
  position?: number;
}

export interface BulkUpdateCategoriesDto {
  categories: UpdateCategoryDto[];
}

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await axios.get("/api/v1/catalog/categories");
  return data.categories || [];
};

export const createCategory = async (
  dto: CreateCategoryDto,
): Promise<Category> => {
  const { data } = await axios.post("/api/pv1/catalog/categories", dto);
  return data;
};

export const updateCategory = async (
  id: number,
  dto: Partial<CreateCategoryDto>,
): Promise<Category> => {
  const { data } = await axios.put(`/api/v1/catalog/categories/${id}`, dto);
  return data;
};

export const bulkUpdateCategories = async (
  dto: BulkUpdateCategoriesDto,
): Promise<Category[]> => {
  const { data } = await axios.put("/api/v1/catalog/categories/bulk", dto);
  return data.categories || [];
};

export const deleteCategory = async (id: number): Promise<void> => {
  await axios.delete(`/api/v1/catalog/categories/${id}`);
};
