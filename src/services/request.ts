import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import json from 'json-bigint';
import { TOKEN_KEY } from '@common/constant/constant';
import { BASE_URL, TIMEOUT } from './config';

const request = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  // 可以在这里自定义后端返回的原始json数据 一般不使用 碰到像超越最大数的数字类型时 使用
  transformResponse: [(data:string) => {
    /*
    * 例子: const data:string =  '{"id":1000000000000001111}'
    *   const id = JSON.stringify(num).id !== 1000000000000001111
    * 所以我们要使用 json-bigint包来解决这个问题 他会通过一个特殊的算法来处理超越最大数的 数字 使用时 使用.toString 就可以获得字符串类型的 数字
    * */
    try {
      return json.parse(data);
    } catch (err) {
      return data;
    }
  }],
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
