import { AxiosResponse } from 'axios';
import request from './request';

export const getCityListRequest = (id: number): Promise<AxiosResponse> =>
  request.get('/geographic', {
    params: {
      id,
    },
  });

// 修改头像
export const editAvatarRequest = (data: FormData): Promise<AxiosResponse> => request.post('/user/avatar', data);
