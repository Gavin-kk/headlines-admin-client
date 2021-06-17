export interface ILike {
  type: string;
  data: [0 | 1];
}
export interface IList {
  matter: string;
  id: number;
  userId: number;
  like: ILike;
  createAt: string;
  updateAt: string;
}
export interface IPage {
  pageSize: number;
  pageNum: number;
  total: number;
}
export interface IMaterial {
  page: IPage;
  list: IList[];
}
