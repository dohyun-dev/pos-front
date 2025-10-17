import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

// Types
export interface ProductCategory {
  id: string;
  name: string;
  displayOrder: number;
  isActive: boolean;
}

export interface ProductOption {
  id: string;
  name: string;
  description?: string;
  extraPrice: number;
  displayOrder: number;
  isActive: boolean;
}

export interface ProductOptionGroup {
  id: string;
  name: string;
  description?: string;
  isRequired: boolean;
  selectableOptionCount: number;
  options: ProductOption[];
  displayOrder: number;
  isActive: boolean;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  basePrice: number;
  barcode?: string;
  uom?: string;
  description?: string;
  category?: ProductCategory;
  optionGroups?: ProductOptionGroup[];
}

export interface CreateProductDto {
  code: string;
  name: string;
  basePrice: number;
  barcode?: string;
  uom?: string;
  description?: string;
  category?: { id: string; name: string } | null;
  optionGroupIds?: string[];
}

export interface UpdateProductDto {
  code: string;
  name: string;
  basePrice: number;
  barcode?: string;
  uom?: string;
  description?: string;
  optionGroupIds?: string[];
}

export interface CreateCategoryDto {
  name: string;
}

export interface UpdateCategoryDto {
  name: string;
}

export interface CreateOptionDto {
  name: string;
  description?: string;
  extraPrice?: number;
}

export interface CreateOptionGroupDto {
  name: string;
  description?: string;
  isRequired: boolean;
  selectableOptionCount: number;
  options?: CreateOptionDto[];
}

export interface UpdateOptionGroupDto {
  name: string;
  description?: string;
  isRequired: boolean;
  selectableOptionCount: number;
  options?: CreateOptionDto[];
}

export interface CatalogResponse {
  categories: Array<{
    id: string;
    name: string;
    displayOrder: number;
    isActive: boolean;
    products?: Product[];
    subCategories?: CatalogResponse["categories"];
  }>;
}

export interface SearchProductsParams {
  keyword?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  hasOptions?: boolean;
  page?: number;
  size?: number;
}

export interface SearchProductsResponse {
  products: Product[];
  totalCount: number;
  page: number;
  size: number;
  totalPages: number;
}

// API Functions - Products
const getProducts = async (params?: {
  includeOptions?: boolean;
}): Promise<Product[]> => {
  const response = await axiosInstance.get("/api/v1/catalog/products", {
    params,
  });
  return response.data;
};

const getProduct = async (id: string): Promise<Product> => {
  const response = await axiosInstance.get(`/api/v1/catalog/products/${id}`);
  return response.data;
};

const searchProducts = async (
  params: SearchProductsParams,
): Promise<SearchProductsResponse> => {
  const response = await axiosInstance.get("/api/v1/catalog/search", {
    params,
  });
  return response.data;
};

const getProductsBatch = async (
  ids: string[],
  includeOptions?: boolean,
): Promise<Product[]> => {
  const response = await axiosInstance.post(
    "/api/v1/catalog/products/batch",
    ids,
    {
      params: { includeOptions },
    },
  );
  return response.data;
};

const createProduct = async (
  data: CreateProductDto,
): Promise<{ productId: string }> => {
  const response = await axiosInstance.post("/api/v1/products", data);
  return response.data;
};

const updateProduct = async ({
  id,
  data,
}: {
  id: string;
  data: UpdateProductDto;
}): Promise<{ productId: string }> => {
  const response = await axiosInstance.put(`/api/v1/products/${id}`, data);
  return response.data;
};

const deleteProduct = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/api/v1/products/${id}`);
};

// API Functions - Categories
const getCategories = async (): Promise<ProductCategory[]> => {
  const response = await axiosInstance.get("/api/v1/product-categories");
  return response.data;
};

const getCategory = async (id: string): Promise<ProductCategory> => {
  const response = await axiosInstance.get(`/api/v1/catalog/categories/${id}`);
  return response.data;
};

const getCategoryProducts = async (
  id: string,
  params?: { includeSubCategories?: boolean; includeOptions?: boolean },
): Promise<Product[]> => {
  const response = await axiosInstance.get(
    `/api/v1/catalog/categories/${id}/products`,
    { params },
  );
  return response.data;
};

const getCatalog = async (params?: {
  includeProducts?: boolean;
  includeSubCategories?: boolean;
  onlyRootCategories?: boolean;
}): Promise<CatalogResponse> => {
  const response = await axiosInstance.get("/api/v1/catalog", { params });
  return response.data;
};

const createCategory = async (
  data: CreateCategoryDto,
): Promise<{ categoryId: string }> => {
  const response = await axiosInstance.post("/api/v1/product-categories", data);
  return response.data;
};

const updateCategory = async ({
  id,
  data,
}: {
  id: string;
  data: UpdateCategoryDto;
}): Promise<{ categoryId: string }> => {
  const response = await axiosInstance.put(
    `/api/v1/product-categories/${id}`,
    data,
  );
  return response.data;
};

const toggleActiveProductCategory = async ({
  id,
}: {
  id: string;
  data: UpdateCategoryDto;
}): Promise<{ categoryId: string }> => {
  const response = await axiosInstance.put(
    `/api/v1/product-categories/${id}/toggle-active`,
  );
  return response.data;
};

const deleteCategory = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/api/v1/product-categories/${id}`);
};

// API Functions - Options
const createOptionGroup = async (
  data: CreateOptionGroupDto,
): Promise<{ optionGroupId: string }> => {
  const response = await axiosInstance.post("/api/v1/product-options", data);
  return response.data;
};

const updateOptionGroup = async ({
  id,
  data,
}: {
  id: string;
  data: UpdateOptionGroupDto;
}): Promise<{ optionGroupId: string }> => {
  const response = await axiosInstance.put(
    `/api/v1/product-options/${id}`,
    data,
  );
  return response.data;
};

const deleteOptionGroup = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/api/v1/product-options/${id}`);
};

// React Query Hooks - Products
export const useProducts = (params?: { includeOptions?: boolean }) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    enabled: !!id,
  });
};

export const useSearchProducts = (params: SearchProductsParams) => {
  return useQuery({
    queryKey: ["products", "search", params],
    queryFn: () => searchProducts(params),
  });
};

export const useProductsBatch = (ids: string[], includeOptions?: boolean) => {
  return useQuery({
    queryKey: ["products", "batch", ids, includeOptions],
    queryFn: () => getProductsBatch(ids, includeOptions),
    enabled: ids.length > 0,
  });
};

export const useCreateProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["catalog"] });
    },
  });
};

export const useUpdateProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["catalog"] });
    },
  });
};

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["catalog"] });
    },
  });
};

// React Query Hooks - Categories
export const useCategoriesQuery = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};

export const useCategory = (id: string) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategory(id),
    enabled: !!id,
  });
};

export const useCategoryProducts = (
  id: string,
  params?: { includeSubCategories?: boolean; includeOptions?: boolean },
) => {
  return useQuery({
    queryKey: ["category", id, "products", params],
    queryFn: () => getCategoryProducts(id, params),
    enabled: !!id,
  });
};

export const useCatalog = (params?: {
  includeProducts?: boolean;
  includeSubCategories?: boolean;
  onlyRootCategories?: boolean;
}) => {
  return useQuery({
    queryKey: ["catalog", params],
    queryFn: () => getCatalog(params),
  });
};

export const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["catalog"] });
    },
  });
};

export const useUpdateCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCategory,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["category", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["catalog"] });
    },
  });
};

export const useToggleActiveCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleActiveProductCategory,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["category", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["catalog"] });
    },
  });
};

export const useDeleteCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["catalog"] });
    },
  });
};

// React Query Hooks - Options
export const useCreateOptionGroupMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOptionGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["option-groups"] });
    },
  });
};

export const useUpdateOptionGroupMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOptionGroup,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["option-groups"] });
      queryClient.invalidateQueries({
        queryKey: ["option-group", variables.id],
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useDeleteOptionGroupMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOptionGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["option-groups"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
