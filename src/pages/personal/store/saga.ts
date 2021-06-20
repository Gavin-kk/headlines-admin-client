import { ForkEffect, takeEvery, put } from 'redux-saga/effects';
import { ActionType } from '@pages/personal/store/constant';
import { message } from 'antd';
import { editAvatarRequest } from '@services/personal.request';
import { getUserInfoAction } from '@src/pages/layout/store/actions';
import { EditUserInfoAction, SubmitAvatarAction } from '@pages/personal/types/action.type';
import { AxiosResponse } from 'axios';
import { IResponse } from '@services/types/response.interface';
import { ISubmitData } from '../types/request.interface';

function* submitAvatar(action: SubmitAvatarAction) {
  const imgData: FormData = action.data;
  try {
    yield editAvatarRequest(imgData);
    yield put(getUserInfoAction);
    yield message.success('修改成功');
  } catch (err) {
    yield message.error(`提交失败: ${err.response.data.message}`);
  }
}

function* editUserInfo(action: EditUserInfoAction) {
  const { data } = action;
  try {
    const result: AxiosResponse<IResponse<any>> = yield;
    console.log(result);
  } catch (err) {
    yield message.error(err.response.data.message);
  }
}

function* saga(): Generator<ForkEffect<never>> {
  yield takeEvery(ActionType.SUBMIT_AVATAR, submitAvatar);
  yield takeEvery(ActionType.EDIT_USER_INFO, editUserInfo);
}

export default saga;
