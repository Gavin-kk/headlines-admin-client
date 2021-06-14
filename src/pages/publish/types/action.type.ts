import { IActionType } from '@src/store/types/action.interface';
import { ActionType } from '@pages/publish/store/constant';
import { IChannel } from './response.interface';

export type GetChannelListAction = IActionType<ActionType.GET_CHANNEL_LIST, null>
export type ChangeChannelListAction = IActionType<ActionType.CHANGE_CHANNEL_LIST, IChannel[]>

export type ReducerActionType = GetChannelListAction | ChangeChannelListAction
