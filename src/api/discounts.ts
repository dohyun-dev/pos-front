import axios from "@/lib/axios";

export type DiscountType = "FIXED_AMOUNT" | "FIXED_PERCENTAGE";
export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";
export type DiningOption = "HERE" | "TOGO" | "DELIVERY" | "PICKUP";

export interface DiscountSchedule {
  dayOfWeeks: DayOfWeek[] | null;
  timeRange: {
    start: string;
    end: string;
  } | null;
  dateRange: {
    start: string;
    end: string;
  } | null;
}

export interface AutoApplyCondition {
  appliedToAll: boolean;
  diningOptions: DiningOption[];
  schedule: DiscountSchedule | null;
}

export interface DiscountTarget {
  targetType: "CATEGORY" | "ITEM";
  targetId: number;
}

export interface AutoApply {
  condition: AutoApplyCondition;
  targets: DiscountTarget[];
}

export interface Discount {
  id: number;
  title: string;
  titleI18n?: {
    languages: {
      "en-US"?: string;
    };
  } | null;
  code?: string;
  type: DiscountType;
  source: "POS";
  percentage?: number;
  amountMoney?: number;
  autoApply?: AutoApply;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDiscountRequest {
  title: string;
  titleI18n?: {
    languages: {
      "en-US"?: string;
    };
  } | null;
  type: DiscountType;
  code?: string;
  discountType: DiscountType;
  source: "POS";
  amountMoney?: number;
  percentage?: number;
  autoApply?: AutoApply;
}

export type UpdateDiscountRequest = CreateDiscountRequest;

// API 함수들
export const getDiscounts = async (): Promise<Discount[]> => {
  const response = await axios.get("/api/discounts");
  return response.data;
};

export const createDiscount = async (
  data: CreateDiscountRequest,
): Promise<Discount> => {
  const response = await axios.post("/api/v1/discounts", data);
  return response.data;
};

export const updateDiscount = async (
  id: number,
  data: UpdateDiscountRequest,
): Promise<Discount> => {
  const response = await axios.put(`/api/v1/discounts/${id}`, data);
  return response.data;
};

export const deleteDiscount = async (id: number): Promise<void> => {
  await axios.delete(`/api/v1/discounts/${id}`);
};
