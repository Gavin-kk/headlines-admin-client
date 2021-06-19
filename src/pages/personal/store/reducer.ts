import { produce } from 'immer';
import { WritableDraft } from 'immer/dist/internal';
import { ReducerActionType } from '../types/action.type';
import { ActionType } from './constant';
import { IPersonalState } from '../types/state.interface';

const defaultState: IPersonalState = {
  city: [],
  cascaderOption: [],
};

function reducer(state = defaultState, action: ReducerActionType): IPersonalState {
  return produce(state, (draft: WritableDraft<IPersonalState>) => {
    switch (action.type) {
      case ActionType.CHANGE_CITY_LIST:
        draft.city = action.data;
        return draft;
      case ActionType.CHANGE_CASCADE_OPTIONS:
        draft.cascaderOption = action.data;
        return draft;
      case ActionType.CHANGE_CURRENT_CASCADE_OPTION_lOADING:
        draft.cascaderOption[action.data.index].loading = action.data.isLoading;
        return draft;
      case ActionType.ADD_CURRENT_SELECTED_OPTION_CHILD:
        draft.cascaderOption[action.data.index].children = action.data.child;
        return draft;
      default:
        return draft;
    }
  });
}

export default reducer;
