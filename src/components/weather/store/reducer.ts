import { produce } from 'immer';
import { WritableDraft } from 'immer/dist/internal';

import { ActionType } from './constant';
import { ReducerActionType } from '../types/action.type';
import { IWeatherState } from '../types/state.interface';

const defaultData:IWeatherState = {
  weatherInfo: null,
};

function reducer(state = defaultData, action:ReducerActionType):IWeatherState {
  return produce(state, (draftState: WritableDraft<IWeatherState>) => {
    switch (action.type) {
      case ActionType.CHANGE_WEATHER_INFO:
        draftState.weatherInfo = action.data;
        return draftState;
      default:
        return draftState;
    }
  });
}

export default reducer;
