import { IAuth } from '@pages/login/types/response.interface';

export interface LoginStateInterface {
    whetherToLogIn: boolean;
    IsRemember: boolean;
    authInfo: IAuth | null
}
