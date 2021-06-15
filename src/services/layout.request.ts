import request from './request';

export const getUserInfoRequest = (): Promise<any> => request.get('/user/info');
