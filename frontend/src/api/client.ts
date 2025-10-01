import axios, { AxiosError, type AxiosInstance, type AxiosResponse } from 'axios';
import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

const baseURL = import.meta.env.VITE_API_URL ?? '';

export const apiClient: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token =
      typeof window !== 'undefined' ? window.localStorage.getItem('authToken') : null;

    if (token) {
      config.headers = config.headers ?? {};
      if (typeof config.headers.set === 'function') {
        config.headers.set('Authorization', `Bearer ${token}`);
      } else {
        (config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        console.warn('Unauthorized request. Please log in again.');
      } else if (status >= 500) {
        console.error('Server error encountered. Please try again later.');
      }
    } else {
      console.error('Network error encountered. Please check your connection.');
    }

    return Promise.reject(error);
  },
);

const extractData = <T>(response: AxiosResponse<T>) => response.data;

export const get = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => apiClient.get<T>(url, config).then(extractData);

export const post = async <T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<T> => apiClient.post<T>(url, data, config).then(extractData);

export const put = async <T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<T> => apiClient.put<T>(url, data, config).then(extractData);

export const patch = async <T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<T> => apiClient.patch<T>(url, data, config).then(extractData);

export const del = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => apiClient.delete<T>(url, config).then(extractData);

export default apiClient;