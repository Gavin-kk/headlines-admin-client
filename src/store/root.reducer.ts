import { combineReducers } from 'redux';
import { reducer as loginReducer } from '@pages/login/store';

const reducer = combineReducers({
  auth: loginReducer,
});
export default reducer;
