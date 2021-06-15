import { IGetArticleListLoad } from '@src/pages/article/types/request.interface';
import { AxiosResponse } from 'axios';
import request from './request';
// 获取文章列表
export const getArticleListRequest = (getTableDto: IGetArticleListLoad): Promise<AxiosResponse> =>
  request.get('/article', {
    params: getTableDto,
  });

// 获取频道列表
export const getChannelListRequest = (): Promise<AxiosResponse> => request.get('/channels');

// 删除文章
export const deleteArticleRequest = (id: number): Promise<AxiosResponse> => request.delete(`/article/${id}`);
