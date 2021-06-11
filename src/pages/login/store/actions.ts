import { IValues } from '@pages/login';
import { IAuth } from '@pages/login/types/response.interface';
import { IRootReducer } from '@src/store/types/root-reducer.interface';
import {
  ChangeAuthDataAction,
  ChangeIsRememberAction,
  ChangeLoginBtnLoadingAction,
  ChangeLoginStatusAction,
  SendLoginRequestAction,
} from '../types/action.type';
import { ActionType } from './constant';
// 获取 store 中的 state
export const getState = (state:IRootReducer):IRootReducer => state;
// 发送登录请求
export const sendLoginRequestAction = (data:IValues):SendLoginRequestAction => ({
  type: ActionType.SEND_LOGIN_REQUEST,
  data,
});
// 改变登录状态
export const changeLoginStatusAction = (whetherToLogIn:boolean):ChangeLoginStatusAction => ({
  type: ActionType.CHANGE_LOGIN_STATE,
  data: { whetherToLogIn },
});
// 改变登录信息
export const changeAuthDataAction = (data:IAuth):ChangeAuthDataAction => ({
  type: ActionType.CHANGE_AUTH_DATA,
  data,
});
// 改变是否记住登录
export const changeWhetherRememberAction = (IsRemember:boolean):ChangeIsRememberAction => ({
  type: ActionType.CHANGE_WHETHER_REMEMBER,
  data: {
    IsRemember,
  },
});
// 改变登陆页 btn按钮的loading效果
export const changeLoginBtnLoadingAction = (isLoading:boolean):ChangeLoginBtnLoadingAction => ({
  type: ActionType.CHANGE_AUTH_BUTTON_LOADING,
  data: {
    isLoading,
  },
});
