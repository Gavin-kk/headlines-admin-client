import { ActionType } from '@pages/publish/store/constant';
import { IChannel } from '@pages/publish/types/response.interface';
import { ISubmit } from '@src/store/types/request.interface';
import {
  ChangeChannelListAction,
  ChangeSubmissionStatusAction,
  GetChannelListAction,
  SubmitArticleAction,
} from '../types/action.type';
// 获取频道列表
export const getChannelListAction: GetChannelListAction = {
  type: ActionType.GET_CHANNEL_LIST,
  data: null,
};
// 更改频道列表
export const changeChannelListAction = (data: IChannel[]): ChangeChannelListAction => ({
  type: ActionType.CHANGE_CHANNEL_LIST,
  data,
});

// 提交文章
export const submitArticleAction = (data: ISubmit): SubmitArticleAction => ({
  type: ActionType.SUBMIT_ARTICLE,
  data,
});

// 更改当前提交状态
export const changeSubmissionStatusAction = (status: boolean): ChangeSubmissionStatusAction => ({
  type: ActionType.CHANGE_WHETHER_SUCCEED,
  data: status,
});
