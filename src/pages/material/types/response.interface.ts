export interface ILike {
  type: string;
  data: [0 | 1];
}
export interface IMaterial {
  matter: string;
  id: number;
  userId: number;
  like: ILike;
  createAt: string;
  updateAt: string;
}
