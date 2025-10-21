import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

// Types
export interface ProductOption {
  id: string;
  name: string;
  description?: string;
  extraPrice: number;
  displayOrder: number;
  isActive: boolean;
}

export interface OptionChoice {
  id: string;
  title: string;
  priceValue: number;
  order: number;
  state: 'ON_SALE' | 'SOLD_OUT';
  imageUrl?: string | null;
  franchiseNewBadge?: boolean;
  franchiseUpdateBadge?: boolean;
}

export interface OptionGroup {
  id: string;
  title: string;
  titleI18n?: {
    languages: {
      'en-US': string;
    };
  };
  choices: OptionChoice[];
  isRequired: boolean;
  minChoices: number;
  maxChoices: number;
  defaultChoices: string[];
  order: number;
  kioskEnabled: boolean;
  franchiseNewBadge?: boolean;
  franchiseUpdateBadge?: boolean;
  // Legacy fields for backward compatibility
  name?: string;
  description?: string;
  selectableOptionCount?: number;
  options?: ProductOption[];
  displayOrder?: number;
  isActive?: boolean;
}

export interface CreateChoiceDto {
  title: string;
  priceValue: number;
  imageUrl?: string | null;
}

export interface CreateOptionGroupDto {
  title: string;
  titleI18n?: {
    languages: {
      'en-US': string;
    };
  };
  choices: CreateChoiceDto[];
  isRequired: boolean;
  minChoices: number;
  maxChoices: number;
  defaultChoices?: string[];
  kioskEnabled?: boolean;
  // Legacy format for API compatibility
  name?: string;
  description?: string;
  selectableOptionCount?: number;
  options?: Array<{
    name: string;
    description?: string;
    extraPrice?: number;
  }>;
}

export interface UpdateOptionGroupDto {
  title: string;
  titleI18n?: {
    languages: {
      'en-US': string;
    };
  };
  choices: CreateChoiceDto[];
  isRequired: boolean;
  minChoices: number;
  maxChoices: number;
  defaultChoices?: string[];
  kioskEnabled?: boolean;
  // Legacy format for API compatibility
  name?: string;
  description?: string;
  selectableOptionCount?: number;
  options?: Array<{
    name: string;
    description?: string;
    extraPrice?: number;
  }>;
}

export interface UpdateOptionGroupKioskDto {
  kioskEnabled: boolean;
}

// API Functions
const getOptionGroups = async (): Promise<OptionGroup[]> => {
  const response = await axiosInstance.get("/api/v1/product-options");
  return response.data;
};

const getOptionGroup = async (id: string): Promise<OptionGroup> => {
  const response = await axiosInstance.get(`/api/v1/product-options/${id}`);
  return response.data;
};

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

const updateOptionGroupKiosk = async ({
  id,
  data,
}: {
  id: string;
  data: UpdateOptionGroupKioskDto;
}): Promise<{ optionGroupId: string }> => {
  const response = await axiosInstance.put(
    `/api/v1/product-options/${id}`,
    data,
  );
  return response.data;
};

const updateOptionGroupDisplayOrders = async (
  data: { optionGroupIds: string[] },
): Promise<void> => {
  await axiosInstance.put("/api/v1/product-options/display-orders", data);
};

const deleteOptionGroup = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/api/v1/product-options/${id}`);
};

// React Query Hooks
export const useOptionGroups = () => {
  return useQuery({
    queryKey: ["option-groups"],
    queryFn: getOptionGroups,
  });
};

export const useOptionGroup = (id: string) => {
  return useQuery({
    queryKey: ["option-group", id],
    queryFn: () => getOptionGroup(id),
    enabled: !!id,
  });
};

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

export const useUpdateOptionGroupKioskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOptionGroupKiosk,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["option-groups"] });
      queryClient.invalidateQueries({
        queryKey: ["option-group", variables.id],
      });
    },
  });
};

export const useUpdateOptionGroupDisplayOrdersMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOptionGroupDisplayOrders,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["option-groups"] });
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
