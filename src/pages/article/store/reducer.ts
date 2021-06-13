import { produce } from 'immer';
import { WritableDraft } from 'immer/dist/internal';
import { ActionType } from '@pages/article/store/constant';
import { ReducerActionType } from '../types/action.type';
import { IArticleState } from '../types/state.interface';

const defaultState:IArticleState = {
  articleInfo: null,
};

function reducer(state = defaultState, action:ReducerActionType):IArticleState {
  return produce(state, (draft:WritableDraft<IArticleState>) => {
    switch (action.type) {
      case ActionType.CHANGE_LIST_OF_ARTICLES:
        draft.articleInfo = action.data;
        return draft;
      default:
        return draft;
    }
  });
}

export default reducer;
