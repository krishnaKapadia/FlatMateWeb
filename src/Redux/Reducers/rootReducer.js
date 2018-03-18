import { combineReducers } from 'redux';
import LoginReducer from './login_reducer';
import LocalUserReducer from './local_user';
/**
* Creates the global state by combining all the reducer content into 1 global state object
*/
const rootReducer = combineReducers({
    isLoggedIn: LoginReducer, local_user: LocalUserReducer
});

export default rootReducer;
