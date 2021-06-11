export interface User {
    id: number;
    username: string;
    phone?: string;
    email?: string;
    createAt: number;
    updateAt: number;
    roleId: number;
    avatar: string;
}

export interface IAuth {
    user: User;
    token: string;
}
