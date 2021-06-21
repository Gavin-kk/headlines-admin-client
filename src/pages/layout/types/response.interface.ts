/* 用户信息 */
export interface IUserInfo {
  id: number;
  username: string;
  phone?: string;
  email?: string;
  nickname?: string;
  gender: string;
  intro: string;
  city: { id: number; city: string }[];
  dateOfBirth: string;
  createAt: number;
  updateAt: number;
  avatar: string;
}
