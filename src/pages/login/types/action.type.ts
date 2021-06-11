import { IActionType } from '@src/store/types/action.interface';
import { ActionType } from '@pages/login/store/constant';
import { IValues } from '@pages/login';
import { IAuth } from '@pages/login/types/response.interface';

export type SendLoginRequestAction = IActionType<ActionType.SEND_LOGIN_REQUEST, IValues>
export type ChangeLoginStatusAction = IActionType<ActionType.CHANGE_LOGIN_STATE, { whetherToLogIn: boolean }>
export type ChangeAuthDataAction = IActionType<ActionType.CHANGE_AUTH_DATA, IAuth>
export type ChangeIsRememberAction = IActionType<ActionType.CHANGE_WHETHER_REMEMBER, { IsRemember: boolean }>
export type ChangeLoginBtnLoadingAction = IActionType<ActionType.CHANGE_AUTH_BUTTON_LOADING, { isLoading: boolean }>

export type ReducerActionType = SendLoginRequestAction
    | ChangeLoginStatusAction
    | ChangeAuthDataAction
    | ChangeIsRememberAction
    | ChangeLoginBtnLoadingAction
