import { IRootReducer } from '@src/store/types/root-reducer.interface';
import { ActionType } from '@pages/layout/store/constant';
import { IUserInfo } from '@pages/layout/types/response.interface';
import { ChangeUserInfoAction, ExitLoginAction, GetUserInfoAction } from '../types/action.type';

// 获取 store 中的 state
export const getState = (state: IRootReducer): IRootReducer => state;
// 获取用户信息
export const getUserInfoAction: GetUserInfoAction = {
  type: ActionType.GET_USER_INFO,
  data: null,
};

// 更改用户信息
export const changeUserInfoAction = (data: IUserInfo): ChangeUserInfoAction => ({
  type: ActionType.CHANGE_USER_INFO,
  data,
});

// 退出登录
export const exitLoginAction: ExitLoginAction = {
  type: ActionType.EXIT_LOGIN,
  data: null,
};
