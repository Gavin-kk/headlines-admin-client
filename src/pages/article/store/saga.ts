import {
  ForkEffect, takeEvery, put,
} from 'redux-saga/effects';
import { GetArticleListAction } from '@pages/article/types/action.type';
import { IResponse } from '@src/services/types/response.interface';
import { AxiosResponse } from 'axios';
import { getArticleListRequest } from '@src/services/article.request';
import { message } from 'antd';
import { ActionType } from './constant';
import { IArticle } from '../types/response.interface';
import { changeArticleListAction } from './actions';

function* getArticlesList(action:GetArticleListAction) {
  try {
    const result: AxiosResponse<IResponse<IArticle>> = yield getArticleListRequest(action.data);
    yield put(changeArticleListAction(result.data.data));
  } catch (err) {
    yield message.error(err.response.data.message);
  }
}

function* saga(): Generator<ForkEffect<never>> {
  yield takeEvery(ActionType.GET_LIST_OF_ARTICLES, getArticlesList);
}

export default saga;
