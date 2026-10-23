import axios, { type AxiosError } from 'axios';

interface AxiosBaseQueryArgs {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  data?: unknown;
  params?: object;
}

export interface AxiosBaseQueryError {
  status?: number;
  data?: unknown;
}

const baseUrl =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const axiosBaseQuery =
  () =>
  async <T = unknown>({
    url,
    method = 'GET',
    data,
    params,
  }: AxiosBaseQueryArgs): Promise<
    { data: T } | { error: AxiosBaseQueryError }
  > => {
    try {
      const token = localStorage.getItem('shopsphere-token');

      const response = await axios({
        url: `${baseUrl}${url}`,
        method,
        data,
        params,
        headers: token
          ? { Authorization: `Bearer ${token}` }
          : undefined,
      });

      return {
        data: response.data as T,
      };
    } catch (error) {
      const axiosError = error as AxiosError;

      return {
        error: {
          status: axiosError.response?.status,
          data: axiosError.response?.data ?? axiosError.message,
        },
      };
    }
  };