import { ForkEffect, takeEvery, put, select } from 'redux-saga/effects';
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
import { IRootReducer } from '@src/store/types/root-reducer.interface';
import { ActionType } from '../store/constant';
import {
  DeleteMaterialAction,
  GetAllTheMaterialsAction,
  GetAllTheMaterialsYouLikeAction,
  LikeMaterialAction,
} from '../types/action.type';

import {
  changeLikeListAction,
  changeLikePageAction,
  changeMaterialListAction,
  changePageAction,
  getAllTheMaterialsAction,
  getAllTheMaterialsYouLikeAction,
} from './actions';

function* getAllTheMaterials(action: GetAllTheMaterialsAction) {
  const { pageNum: reqPageNum, pageSize: reqPageSize } = action.data;
  try {
    const result: AxiosResponse<IResponse<IMaterial>> = yield getAllMaterialRequest(reqPageNum, reqPageSize);
    yield put(changeMaterialListAction(result.data.data.list));
    const { pageNum, pageSize, total } = result.data.data.page;
    yield put(changePageAction(pageSize, pageNum, total));
  } catch (err) {
    yield message.error(err.response.data.message);
  }
}
function* getAllTheMaterialsYouLike(action: GetAllTheMaterialsYouLikeAction) {
  const { pageNum: reqPageNum, pageSize: reqPageSize } = action.data;
  try {
    const result: AxiosResponse<IResponse<IMaterial>> = yield getLikeMaterialRequest(reqPageNum, reqPageSize);
    yield put(changeLikeListAction(result.data.data.list));
    const { pageNum, pageSize, total } = result.data.data.page;
    yield put(changeLikePageAction(pageSize, pageNum, total));
  } catch (err) {
    yield message.error(err.response.data.message);
  }
}
function* deleteMaterial(action: DeleteMaterialAction) {
  const { id, type } = action.data;
  const {
    material: { page, likePage },
  }: IRootReducer = yield select((state: IRootReducer) => state);
  try {
    const result: AxiosResponse<IResponse<string>> = yield deleteMaterialRequest(id);
    if (type !== 'auto') {
      yield put(getAllTheMaterialsAction(page.pageNum, page.pageSize));
      yield put(getAllTheMaterialsYouLikeAction(likePage.pageNum, likePage.pageSize));
      yield message.success(result.data.data);
    }
  } catch (err) {
    yield message.error(err.response.data.message);
  }
}

function* likeMaterial(action: LikeMaterialAction) {
  const {
    material: { page, likePage },
  }: IRootReducer = yield select((state: IRootReducer) => state);
  try {
    const result: AxiosResponse<IResponse<string>> = yield likeMaterialRequest(action.data.id);
    yield put(getAllTheMaterialsAction(page.pageNum, page.pageSize));
    yield put(getAllTheMaterialsYouLikeAction(likePage.pageNum, likePage.pageSize));
    yield message.success(result.data.data);
  } catch (err) {
    yield message.error(err.response.data.message);
  }
}

function* saga(): Generator<ForkEffect<never>> {
  yield takeEvery(ActionType.GET_ALL_THE_MATERIALS, getAllTheMaterials);
  yield takeEvery(ActionType.GET_ALL_THE_MATERIALS_YOU_LIKE, getAllTheMaterialsYouLike);
  yield takeEvery(ActionType.DELETE_MATERIAL, deleteMaterial);
  yield takeEvery(ActionType.LIKE_MATERIAL, likeMaterial);
}

export default saga;
