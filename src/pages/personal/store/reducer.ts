import { produce } from 'immer';
import { WritableDraft } from 'immer/dist/internal';
import { ReducerActionType } from '../types/action.type';
import { ActionType } from './constant';
import { IPersonalState } from '../types/state.interface';

const defaultState: IPersonalState = {};

function reducer(state = defaultState, action: ReducerActionType): IPersonalState {
  return produce(state, (draft: WritableDraft<IPersonalState>) => {
    switch (action.type) {
      default:
        return draft;
    }
  });
}

export default reducer;
