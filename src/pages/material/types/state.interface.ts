import { IList } from './response.interface';

export interface IMaterialState {
  materialList: IList[] | null;
  likeList: IList[] | null;
  page: {
    pageNum: number;
    pageSize: number;
    total?: number;
  };
  likePage: {
    pageNum: number;
    pageSize: number;
    total?: number;
  };
}
