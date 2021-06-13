import { IGetArticleListLoad } from '@src/pages/article/types/request.interface';
import { AxiosResponse } from 'axios';
import request from './request';

export const getArticleListRequest = (getTableDto:IGetArticleListLoad):Promise<AxiosResponse> => request.get('/article', {
  params: getTableDto,
});
