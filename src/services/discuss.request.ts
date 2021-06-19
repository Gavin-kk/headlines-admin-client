import { AxiosResponse } from 'axios';
import request from './request';

export const closeCommentRequest = (id: number): Promise<AxiosResponse> => request.patch(`article/${id}`);
