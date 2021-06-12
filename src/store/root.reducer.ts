import { combineReducers } from 'redux';
import { reducer as loginReducer } from '@pages/login/store';
import { reducer as weatherReducer } from '@components/weather/store';
import { reducer as adminReducer } from '@pages/layout/store';

const reducer = combineReducers({
  auth: loginReducer,
  weather: weatherReducer,
  admin: adminReducer,
});
export default reducer;
