import {combineReducers} from 'redux';
import { AuthReducer } from './auth/reducer';


// create root reducer
const rootReducer = combineReducers({
    auth : AuthReducer
});


// export 
export default rootReducer;