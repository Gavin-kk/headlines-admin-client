import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { TOKEN_KEY } from '@common/constant/constant';
import { BASE_URL, TIMEOUT } from './config';

const request = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});

request.interceptors.request.use((config: AxiosRequestConfig) => {
  const token:string | null = window.localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

request.interceptors.response.use((response:AxiosResponse) => response);

export default request;
