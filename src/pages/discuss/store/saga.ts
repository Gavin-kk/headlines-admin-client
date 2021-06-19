import { ForkEffect, put, takeEvery } from 'redux-saga/effects';
import { ActionType } from '@pages/discuss/store/constant';
import { closeCommentRequest } from '@src/services/discuss.request';
import { getArticleListAction } from '@pages/article/store/actions';
import { message } from 'antd';
import { CommentSwitchAction } from '../types/action.type';

function* commentsOff(action: CommentSwitchAction) {
  const { id } = action.data;
  try {
    yield closeCommentRequest(id);
    yield put(getArticleListAction({}));
  } catch (err) {
    yield message.error(err.response.data.message);
  }
}
function* saga(): Generator<ForkEffect<never>> {
  yield takeEvery(ActionType.COMMENT_SWITCH, commentsOff);
}

export default saga;
