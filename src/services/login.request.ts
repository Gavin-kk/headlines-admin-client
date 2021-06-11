import { IValues } from '@pages/login';
import request from './request';

export const loginRequest = (data: IValues):Promise<any> => request.post('/auth/login', data);
