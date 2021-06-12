import { IActionType } from '@src/store/types/action.interface';
import { ActionType } from '@pages/layout/store/constant';
import { IUserInfo } from '@pages/layout/types/response.interface';

export type GetUserInfoAction = IActionType<ActionType.GET_USER_INFO, null>
export type ChangeUserInfoAction = IActionType<ActionType.CHANGE_USER_INFO, IUserInfo>

export type ReducerActionType = GetUserInfoAction | ChangeUserInfoAction
