import { produce } from 'immer';
import { WritableDraft } from 'immer/dist/internal';
import { ActionType } from '@pages/discuss/store/constant';
import { ReducerActionType } from '../types/action.type';
import { IDiscussState } from '../types/state.interface';

const defaultData: IDiscussState = {
  page: {
    pageNum: 1,
    pageSize: 10,
  },
};

function reducer(state = defaultData, action: ReducerActionType): IDiscussState {
  return produce(state, (draft: WritableDraft<IDiscussState>) => {
    switch (action.type) {
      case ActionType.CHANGE_PAGE_INFO:
        draft.page = action.data;
        return draft;
      default:
        return draft;
    }
  });
}

export default reducer;
