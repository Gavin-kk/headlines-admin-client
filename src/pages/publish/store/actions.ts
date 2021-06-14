import { ActionType } from '@pages/publish/store/constant';
import { IChannel } from '@pages/publish/types/response.interface';
import { ChangeChannelListAction, GetChannelListAction } from '../types/action.type';

export const getChannelListAction:GetChannelListAction = {
  type: ActionType.GET_CHANNEL_LIST,
  data: null,
};
export const changeChannelListAction = (data:IChannel[]):ChangeChannelListAction => ({
  type: ActionType.CHANGE_CHANNEL_LIST,
  data,
});
