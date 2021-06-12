import {
  ForkEffect, takeEvery, put,
} from 'redux-saga/effects';
import { ActionType } from '@pages/layout/store/constant';
import { AxiosResponse } from 'axios';
import { IResponse } from '@services/types/response.interface';
import { message } from 'antd';
import { TOKEN_KEY } from '@src/common/constant/constant';
import { getUserInfoRequest } from '@services/layout.request';
import { IUserInfo } from '@pages/layout/types/response.interface';
import { changeUserInfoAction } from '@pages/layout/store/actions';
import { changeLoginStatusAction } from '@pages/login/store/actions';

function* getUserInfo() {
  try {
    const result: AxiosResponse<IResponse<IUserInfo>> = yield getUserInfoRequest();
    yield put(changeUserInfoAction(result.data.data));
  } catch (err) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(TOKEN_KEY);
    yield put(changeLoginStatusAction(false));
    yield message.error('授权失败');
  }
}

function* saga(): Generator<ForkEffect<never>> {
  yield takeEvery(ActionType.GET_USER_INFO, getUserInfo);
}

export default saga;
