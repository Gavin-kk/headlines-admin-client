import { AxiosResponse } from 'axios';
import { ISubmit } from '@src/store/types/request.interface';
import request from './request';

export const fileUpload = (data: FormData): Promise<AxiosResponse> =>
  request.post('/article/upload/file', data, {
    // headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
    headers: { 'Content-Type': 'multipart/form-data' },
  });

// 获取频道列表
export const getChannelListRequest = (): Promise<AxiosResponse> => request.get('/channels');
// 提交文章
export const submitArticleRequest = (data: ISubmit): Promise<AxiosResponse> => request.post('/article', data);
