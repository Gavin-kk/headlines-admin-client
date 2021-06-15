import { produce } from 'immer';
import { WritableDraft } from 'immer/dist/internal';
import { ReducerActionType } from '../types/action.type';
import { ActionType } from './constant';
import { IAdminState } from '../types/state.interface';

const defaultState: IAdminState = {
  userinfo: null,
};

function reducer(state = defaultState, action: ReducerActionType): IAdminState {
  return produce(state, (draft: WritableDraft<IAdminState>) => {
    switch (action.type) {
      case ActionType.CHANGE_USER_INFO:
        draft.userinfo = action.data;
        return draft;
      default:
        return draft;
    }
  });
}

export default reducer;
