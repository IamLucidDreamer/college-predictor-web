import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import userReducers from "./userReducers"

const createReducer = combineReducers({
    user: userReducers
});

export default createReducer;