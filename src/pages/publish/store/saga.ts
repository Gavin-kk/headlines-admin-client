import { ForkEffect, put, takeEvery } from 'redux-saga/effects';
import { ActionType } from '@pages/publish/store/constant';
import { getChannelListRequest } from '@src/services/publish.request';
import { AxiosResponse } from 'axios';
import { IResponse } from '@services/types/response.interface';
import { changeChannelListAction } from '@pages/publish/store/actions';
import { message } from 'antd';
import { IChannel } from '../types/response.interface';

function* getChannelList() {
  try {
    const result:AxiosResponse<IResponse<IChannel[]>> = yield getChannelListRequest();
    yield put(changeChannelListAction(result.data.data));
  } catch (e) {
    yield message.error(e.response.data.message);
  }
}

function* saga(): Generator<ForkEffect<never>> {
  yield takeEvery(ActionType.GET_CHANNEL_LIST, getChannelList);
}

export default saga;
