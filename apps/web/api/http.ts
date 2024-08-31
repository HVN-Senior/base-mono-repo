import type { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import Cookies from 'js-cookie';

const MAXIMUM_RETRY_UN_AUTHENTICATION = 5;

export interface IErrorResponse {
  code: number;
  message: string[] | string;
  name: string;
  type: string;
}

export interface IApiResponse<T> extends AxiosResponse {
  code: number;
  data: T;
  message: string;
}

interface FailedRequests {
  resolve: (value: AxiosResponse) => void;
  reject: (value: AxiosError) => void;
  config: AxiosRequestConfig;
  error: AxiosError;
}

let failedRequests: FailedRequests[] = [];
let isTokenRefreshing = false;
const refreshTokenCount = new Map();

const APP_URL = process.env.NEXT_PUBLIC_APP_URL;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const http = axios.create({
  baseURL: API_URL,
  withCredentials: false,
});

const removeTokenInCookie = () => {
  Cookies.remove('access_token');
  Cookies.remove('refresh_token');
};

const handleSuccess = <T>(res: AxiosResponse): IApiResponse<T> => {
  const { url } = res.config;
  const result = res.data;

  const existedRefreshTokenCount = refreshTokenCount.has(url);
  if (!existedRefreshTokenCount) {
    refreshTokenCount.set(url, 0);
  }

  return result;
};

const handleError = async (error: AxiosError<IErrorResponse>) => {
  const originalRequest = error.config!;
  const data = error?.response?.data as any;
  const { url } = originalRequest;

  if (data?.code !== 401) {
    return Promise.reject(error);
  }

  if (isTokenRefreshing) {
    return new Promise((resolve, reject) => {
      failedRequests.push({ resolve, reject, config: originalRequest, error });
    });
  }

  const existedRefreshTokenCount = refreshTokenCount.get(url) ?? 0;
  if (existedRefreshTokenCount >= MAXIMUM_RETRY_UN_AUTHENTICATION) {
    return (window.location.href = `${APP_URL}`);
  }

  refreshTokenCount.set(url, existedRefreshTokenCount + 1);
  isTokenRefreshing = true;

  try {
    const refreshToken = Cookies.get('refresh_token') ?? '';
    const urlEndpoint = `${API_URL}/api/token/refresh-token`;
    const response = await axios.post(urlEndpoint, {
      refreshToken,
    });
    const result = response.data;
    const user = result?.user;
    Cookies.set('access_token', user?.token, { path: '/' });
    Cookies.set('refresh_token', user?.refreshToken, { path: '/' });
    failedRequests.forEach(({ resolve, reject, config }) => {
      http(config)
        .then((resHttp) => resolve(resHttp))
        .catch((errorHttp) => reject(errorHttp));
    });
  } catch (_error: unknown) {
    failedRequests.forEach(({ reject, error: errorFailedRequest }) => reject(errorFailedRequest));
    removeTokenInCookie();
    window.location.href = `${APP_URL}`;
    return await Promise.reject(error);
  } finally {
    failedRequests = [];
    isTokenRefreshing = false;
  }

  return http(originalRequest);
};

http.interceptors.response.use(handleSuccess, handleError);

http.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get('access_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => Promise.reject(error)
);
