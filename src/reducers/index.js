import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import SelectPopokReducer from './SelectPopokReducer';

export default combineReducers({
    pikachu: () => 'Ryan Reynolds',
    auth: AuthReducer,
    selectedPopok: SelectPopokReducer
});