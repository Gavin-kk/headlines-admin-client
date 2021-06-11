import { combineReducers } from 'redux';
import { reducer as loginReducer } from '@pages/login/store';
import { reducer as weatherReducer } from '@components/weather/store';

const reducer = combineReducers({
  auth: loginReducer,
  weather: weatherReducer,
});
export default reducer;
