import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';

// Types
export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  category: string;
  stock: number;
  image?: string;
  barcode?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductDto {
  name: string;
  price: number;
  description?: string;
  category: string;
  stock: number;
  image?: string;
  barcode?: string;
}

// API Functions
const getProducts = async (params?: {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}): Promise<{ data: Product[]; total: number }> => {
  const response = await axiosInstance.get('/products', { params });
  return response.data;
};

const getProduct = async (id: string): Promise<Product> => {
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data;
};

const createProduct = async (data: CreateProductDto): Promise<Product> => {
  const response = await axiosInstance.post('/products', data);
  return response.data;
};

const updateProduct = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<CreateProductDto>;
}): Promise<Product> => {
  const response = await axiosInstance.put(`/products/${id}`, data);
  return response.data;
};

const deleteProduct = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/products/${id}`);
};

// React Query Hooks
export const useProducts = (params?: {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => getProducts(params),
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
    enabled: !!id,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', variables.id] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
