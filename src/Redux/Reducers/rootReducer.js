import { combineReducers } from 'redux';
import LoginReducer from './login_reducer';
/**
* Creates the global state by combining all the reducer content into 1 global state object
*/
const rootReducer = combineReducers({
    isLoggedin: LoginReducer
});

export default rootReducer;
