import {
  ForkEffect, takeEvery, put, select,
} from 'redux-saga/effects';
import { ActionType } from '@pages/login/store/constant';
import { AxiosResponse } from 'axios';
import { IResponse } from '@services/types/response.interface';
import { loginRequest } from '@services/login.request';
import { message } from 'antd';
import { IValues } from '@pages/login';
import { IRootReducer } from '@src/store/types/root-reducer.interface';
import { TOKEN_KEY } from '@src/common/constant/constant';
import { ReducerActionType } from '../types/action.type';
import { IAuth } from '../types/response.interface';
import {
  changeAuthDataAction, changeLoginBtnLoadingAction, changeLoginStatusAction, getState,
} from './actions';

function* sendLoginRequest(action: ReducerActionType) {
  const state:IRootReducer = yield select(getState);
  try {
    const result: AxiosResponse<IResponse<IAuth>> = yield loginRequest(action.data as IValues);
    yield put(changeLoginStatusAction(true));
    yield put(changeAuthDataAction(result.data.data));
    if (state.auth.IsRemember) {
      window.localStorage.setItem(TOKEN_KEY, result.data.data.token);
    } else {
      window.sessionStorage.setItem(TOKEN_KEY, result.data.data.token);
    }
    yield message.success('登录成功');
  } catch (error) {
    if (state.auth.IsRemember) {
      window.localStorage.removeItem(TOKEN_KEY);
    } else {
      window.sessionStorage.removeItem(TOKEN_KEY);
    }
    yield put(changeLoginStatusAction(false));
    yield put(changeLoginBtnLoadingAction(false));
    yield message.error(error.response.data.message);
  }
}

function* saga(): Generator<ForkEffect<never>> {
  yield takeEvery(ActionType.SEND_LOGIN_REQUEST, sendLoginRequest);
}

export default saga;
