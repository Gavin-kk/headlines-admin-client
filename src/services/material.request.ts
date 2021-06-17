import { AxiosResponse } from 'axios';
import request from './request';
// 获取全部素材
export const getAllMaterialRequest = (pageNum: number, pageSize: number): Promise<AxiosResponse> =>
  request.get('/material', {
    params: {
      pageNum,
      pageSize,
    },
  });
// 获取个人喜欢的所有素材
export const getLikeMaterialRequest = (pageNum: number, pageSize: number): Promise<AxiosResponse> =>
  request.get('/material/like/all', {
    params: {
      pageNum,
      pageSize,
    },
  });
// 删除素材
export const deleteMaterialRequest = (id: number): Promise<AxiosResponse> => request.delete(`/material/${id}`);
// 取消喜欢素材
export const unlikeMaterialRequest = (id: number): Promise<AxiosResponse> =>
  request.delete('/material/like', {
    params: {
      id,
    },
  });
// 喜欢素材
export const likeMaterialRequest = (id: number): Promise<AxiosResponse> => request.post('/material/like', { id });
