import { produce } from 'immer';
import { WritableDraft } from 'immer/dist/internal';
import { ActionType } from '@pages/publish/store/constant';
import { ReducerActionType } from '../types/action.type';
import { IPublishState } from '../types/state.interface';

const defaultData: IPublishState = {
  channelList: [],
  submissionStatus: false,
};

function reducer(state = defaultData, action: ReducerActionType): IPublishState {
  return produce(state, (draft: WritableDraft<IPublishState>) => {
    switch (action.type) {
      case ActionType.CHANGE_CHANNEL_LIST:
        draft.channelList = action.data;
        return draft;
      case ActionType.CHANGE_WHETHER_SUCCEED:
        draft.submissionStatus = action.data;
        return draft;
      default:
        return draft;
    }
  });
}

export default reducer;
