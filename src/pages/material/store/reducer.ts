import { produce } from 'immer';
import { WritableDraft } from 'immer/dist/internal';
import { ReducerActionType } from '../types/action.type';
import { ActionType } from './constant';
import { IMaterialState } from '../types/state.interface';

const defaultState: IMaterialState = {
  materialList: null,
  likeList: null,
  page: {
    pageNum: 1,
    pageSize: 32,
    total: 32,
  },
  likePage: {
    pageNum: 1,
    pageSize: 32,
    total: 32,
  },
};

function reducer(state = defaultState, action: ReducerActionType): IMaterialState {
  return produce(state, (draft: WritableDraft<IMaterialState>) => {
    switch (action.type) {
      case ActionType.CHANGE_MATERIAL_LIST:
        draft.materialList = action.data.list;
        return draft;
      case ActionType.CHANGE_LIKE_LIST:
        draft.likeList = action.data.list;
        return draft;
      case ActionType.CHANGE_PAGE:
        draft.page = action.data;
        return draft;
      case ActionType.CHANGE_LIKE_PAGE:
        draft.likePage = action.data;
        return draft;
      default:
        return draft;
    }
  });
}

export default reducer;
