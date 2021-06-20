import { IActionType } from '@src/store/types/action.interface';
import { ISubmitData } from '@pages/personal/types/request.interface';
import { ActionType } from '../store/constant';

export type SubmitAvatarAction = IActionType<ActionType.SUBMIT_AVATAR, FormData>;
export type EditUserInfoAction = IActionType<ActionType.EDIT_USER_INFO, ISubmitData>;

export type ReducerActionType = SubmitAvatarAction | EditUserInfoAction;
