import { produce } from 'immer';
import { WritableDraft } from 'immer/dist/internal';
import { ReducerActionType } from '../types/action.type';
import { ActionType } from './constant';
import { LoginStateInterface } from '../types/state.interface';

const defaultState: LoginStateInterface = {
  whetherToLogIn: false,
  IsRemember: true,
  authInfo: null,
  loading: false,
};

function reducer(state = defaultState, action: ReducerActionType): LoginStateInterface {
  return produce(state, (draft: WritableDraft<LoginStateInterface>) => {
    switch (action.type) {
      case ActionType.CHANGE_LOGIN_STATE:
        draft.whetherToLogIn = action.data.whetherToLogIn;
        return draft;
      case ActionType.CHANGE_AUTH_DATA:
        draft.authInfo = action.data;
        return draft;
      case ActionType.CHANGE_WHETHER_REMEMBER:
        draft.IsRemember = action.data.IsRemember;
        return draft;
      case ActionType.CHANGE_AUTH_BUTTON_LOADING:
        draft.loading = action.data.isLoading;
        return draft;
      default:
        return draft;
    }
  });
}

export default reducer;
