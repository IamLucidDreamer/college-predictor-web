import { combineReducers } from 'redux';
import userReducers from "./userReducers"

const createReducer = combineReducers({
    user: userReducers
});

export default createReducer;