import { ForkEffect, put, takeEvery } from 'redux-saga/effects';
import { ActionType } from '@pages/publish/store/constant';
import { getChannelListRequest, submitArticleRequest } from '@src/services/publish.request';
import { AxiosResponse } from 'axios';
import { IResponse } from '@services/types/response.interface';
import { changeChannelListAction, changeSubmissionStatusAction } from '@pages/publish/store/actions';
import { message } from 'antd';
import { SubmitArticleAction } from '@pages/publish/types/action.type';
import { IChannel } from '../types/response.interface';

function* getChannelList() {
  try {
    const result: AxiosResponse<IResponse<IChannel[]>> = yield getChannelListRequest();
    yield put(changeChannelListAction(result.data.data));
  } catch (e) {
    yield message.error(e.response.data.message);
  }
}

function* submitArticle(action: SubmitArticleAction) {
  const { data } = action;
  try {
    yield submitArticleRequest(data);
    yield put(changeSubmissionStatusAction(true));
    yield message.success('提交成功');
  } catch (e) {
    yield put(changeSubmissionStatusAction(false));
    yield message.error(`提交失败${e.response.data.message}`);
  }
}

function* saga(): Generator<ForkEffect<never>> {
  yield takeEvery(ActionType.GET_CHANNEL_LIST, getChannelList);
  yield takeEvery(ActionType.SUBMIT_ARTICLE, submitArticle);
}

export default saga;
