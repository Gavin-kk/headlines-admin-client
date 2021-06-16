import { produce } from 'immer';
import { WritableDraft } from 'immer/dist/internal';
import { ReducerActionType } from '../types/action.type';
import { ActionType } from './constant';
import { IMaterialState } from '../types/state.interface';

const defaultState: IMaterialState = {
  materialList: null,
  likeList: null,
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
      default:
        return draft;
    }
  });
}

export default reducer;
