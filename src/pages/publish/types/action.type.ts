import { IActionType } from '@src/store/types/action.interface';
import { ActionType } from '@pages/publish/store/constant';
import { ISubmit } from '@src/store/types/request.interface';
import { IChannel } from './response.interface';

export type GetChannelListAction = IActionType<ActionType.GET_CHANNEL_LIST, null>;

export type ChangeChannelListAction = IActionType<ActionType.CHANGE_CHANNEL_LIST, IChannel[]>;
export type SubmitArticleAction = IActionType<ActionType.SUBMIT_ARTICLE, ISubmit>;
export type ChangeSubmissionStatusAction = IActionType<ActionType.CHANGE_WHETHER_SUCCEED, boolean>;

export type ReducerActionType =
  | GetChannelListAction
  | ChangeChannelListAction
  | SubmitArticleAction
  | ChangeSubmissionStatusAction;
