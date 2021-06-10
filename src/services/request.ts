import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { BASE_URL, TIMEOUT } from './config';

const request = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});

request.interceptors.request.use((config: AxiosRequestConfig) => config);

request.interceptors.response.use((response:AxiosResponse) => response);

export default request;
