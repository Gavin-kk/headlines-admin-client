import { IMaterial } from './response.interface';

export interface IMaterialState {
  materialList: IMaterial[] | null;
  likeList: IMaterial[] | null;
}
