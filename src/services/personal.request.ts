import { AxiosResponse } from 'axios';
import request from './request';

export const getCityListRequest = (id: number): Promise<AxiosResponse> =>
  request.get('/geographic', {
    params: {
      id,
    },
  });
