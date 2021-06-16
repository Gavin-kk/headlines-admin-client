import { ForkEffect, takeEvery, put } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { IResponse } from '@services/types/response.interface';
import {
  deleteMaterialRequest,
  getAllMaterialRequest,
  getLikeMaterialRequest,
  likeMaterialRequest,
} from '@services/material.request';
import { IMaterial } from '@pages/material/types/response.interface';
import { message } from 'antd';
import { ActionType } from '../store/constant';
import { DeleteMaterialAction, LikeMaterialAction, UnlikeMaterialAction } from '../types/action.type';
import {
  changeLikeListAction,
  changeMaterialListAction,
  getAllTheMaterialsAction,
  getAllTheMaterialsYouLikeAction,
} from './actions';

function* getAllTheMaterials() {
  try {
    const result: AxiosResponse<IResponse<IMaterial[]>> = yield getAllMaterialRequest();
    yield put(changeMaterialListAction(result.data.data));
  } catch (err) {
    yield message.error(err.response.data.message);
  }
}
function* getAllTheMaterialsYouLike() {
  try {
    const result: AxiosResponse<IResponse<IMaterial[]>> = yield getLikeMaterialRequest();
    yield put(changeLikeListAction(result.data.data));
  } catch (err) {
    yield message.error(err.response.data.message);
  }
}
function* deleteMaterial(action: DeleteMaterialAction) {
  try {
    yield deleteMaterialRequest(action.data.id);
    yield message.success('删除成功');
  } catch (err) {
    yield message.error(err.response.data.message);
  }
}

function* likeMaterial(action: LikeMaterialAction) {
  try {
    const result: AxiosResponse<IResponse<string>> = yield likeMaterialRequest(action.data.id);
    yield put(getAllTheMaterialsAction);
    yield put(getAllTheMaterialsYouLikeAction);
    yield message.success(result.data.data);
  } catch (err) {
    yield message.error(err.response.data.message);
  }
}
function* unlikeMaterial(action: UnlikeMaterialAction) {
  try {
    yield likeMaterialRequest(action.data.id);
    yield put(getAllTheMaterialsYouLikeAction);
    yield message.success('取消喜欢成功');
  } catch (err) {
    yield message.error(err.response.data.message);
  }
}

function* saga(): Generator<ForkEffect<never>> {
  yield takeEvery(ActionType.GET_ALL_THE_MATERIALS, getAllTheMaterials);
  yield takeEvery(ActionType.GET_ALL_THE_MATERIALS_YOU_LIKE, getAllTheMaterialsYouLike);
  yield takeEvery(ActionType.DELETE_MATERIAL, deleteMaterial);
  yield takeEvery(ActionType.UNLIKE_MATERIAL, unlikeMaterial);
  yield takeEvery(ActionType.LIKE_MATERIAL, likeMaterial);
}

export default saga;
