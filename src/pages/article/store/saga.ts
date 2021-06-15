import { ForkEffect, takeEvery, put, select } from 'redux-saga/effects';
import { DeleteArticlesAction, GetArticleListAction } from '@pages/article/types/action.type';
import { IResponse } from '@src/services/types/response.interface';
import { AxiosResponse } from 'axios';
import { deleteArticleRequest, getArticleListRequest, getChannelListRequest } from '@src/services/article.request';
import { message } from 'antd';
import { IRootReducer } from '@src/store/types/root-reducer.interface';
import { ActionType } from './constant';
import { IArticleInfo, IChannel } from '../types/response.interface';
import { changeArticleListAction, changeChannelListAction, getArticleListAction } from './actions';

function* getArticlesList(action: GetArticleListAction) {
  try {
    const result: AxiosResponse<IResponse<IArticleInfo>> = yield getArticleListRequest(action.data);
    yield put(changeArticleListAction(result.data.data));
  } catch (err) {
    yield message.error(err.response.data.message);
  }
}

function* getChannelList() {
  try {
    const result: AxiosResponse<IResponse<IChannel[]>> = yield getChannelListRequest();
    yield put(changeChannelListAction(result.data.data));
  } catch (err) {
    yield message.error(err.response.data.message);
  }
}

function* deleteArticles(action: DeleteArticlesAction) {
  const { id } = action.data;
  const { article }: IRootReducer = yield select((state: IRootReducer) => state);
  const { articleListLoad } = article;
  try {
    yield deleteArticleRequest(id);
    yield put(getArticleListAction({ ...articleListLoad }));
    yield message.success('删除成功');
  } catch (err) {
    yield message.error(err.response.data.message);
  }
}

function* saga(): Generator<ForkEffect<never>> {
  yield takeEvery(ActionType.GET_LIST_OF_ARTICLES, getArticlesList);
  yield takeEvery(ActionType.GET_CHANNEL_LIST, getChannelList);
  yield takeEvery(ActionType.DELETE_ARTICLES, deleteArticles);
}

export default saga;
