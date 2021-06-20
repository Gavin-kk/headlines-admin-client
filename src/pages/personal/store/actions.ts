import { ActionType } from '@pages/personal/store/constant';
import { ISubmitData } from '@pages/personal/types/request.interface';
import { EditUserInfoAction, SubmitAvatarAction } from '../types/action.type';

export const submitAvatarAction = (data: FormData): SubmitAvatarAction => ({
  type: ActionType.SUBMIT_AVATAR,
  data,
});

export const editUserInfoAction = (data: ISubmitData): EditUserInfoAction => ({
  type: ActionType.EDIT_USER_INFO,
  data,
});
