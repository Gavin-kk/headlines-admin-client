import { AxiosResponse } from 'axios';
import { ISubmitData } from '@pages/personal/types/request.interface';
import request from './request';

export const getCityListRequest = (id: number): Promise<AxiosResponse> =>
  request.get('/geographic', {
    params: {
      id,
    },
  });

// 修改头像
export const editAvatarRequest = (data: FormData): Promise<AxiosResponse> => request.post('/user/avatar', data);

// 修改用户信息
export const editUserInfoRequest = (data: ISubmitData): Promise<AxiosResponse> => request.patch('/user/profile', data);
