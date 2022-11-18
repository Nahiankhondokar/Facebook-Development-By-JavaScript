import {createStore, applyMiddleware} from 'redux'; 
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';


// middlewares 
const middleware = [thunk];

// create store
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));


export default store;