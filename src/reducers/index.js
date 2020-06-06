import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

// changes by jj

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    
});
