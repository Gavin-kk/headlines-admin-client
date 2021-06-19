import { combineReducers } from 'redux';
import { reducer as loginReducer } from '@pages/login/store';
import { reducer as weatherReducer } from '@components/weather/store';
import { reducer as adminReducer } from '@pages/layout/store';
import { reducer as articleReducer } from '@pages/article/store';
import { reducer as publishReducer } from '@pages/publish/store';
import { reducer as materialReducer } from '@pages/material/store';
import { reducer as personalReducer } from '@pages/personal/store';

const reducer = combineReducers({
  auth: loginReducer,
  weather: weatherReducer,
  admin: adminReducer,
  article: articleReducer,
  publish: publishReducer,
  material: materialReducer,
  personal: personalReducer,
});
export default reducer;
