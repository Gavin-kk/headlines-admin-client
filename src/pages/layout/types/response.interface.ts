/* 用户信息 */
export interface IUserInfo {
    id: number;
    username: string;
    phone?: string;
    email?: string;
    createAt: number;
    updateAt: number;
    roleId: number;
    avatar: string;
}
