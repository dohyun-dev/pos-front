import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { useAuthStore } from '@/stores/authStore';

// Types
export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  accessToken: string;
  refreshToken: string;
}

// API Functions
const login = async (data: LoginDto): Promise<AuthResponse> => {
  const response = await axiosInstance.post('/auth/login', data);
  return response.data;
};

const register = async (data: RegisterDto): Promise<AuthResponse> => {
  const response = await axiosInstance.post('/auth/register', data);
  return response.data;
};

const logout = async (): Promise<void> => {
  await axiosInstance.post('/auth/logout');
};

// React Query Hooks
export const useLogin = () => {
  const { login: setAuth } = useAuthStore();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken, data.refreshToken);
    },
  });
};

export const useRegister = () => {
  const { login: setAuth } = useAuthStore();

  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken, data.refreshToken);
    },
  });
};

export const useLogout = () => {
  const { logout: clearAuth } = useAuthStore();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearAuth();
    },
  });
};
