import { combineReducers } from "redux";
import { AuthReducer } from "./auth/reducer";
import toasterReducer from "./toaster/toasterReducer";

// create root reducer
const rootReducer = combineReducers({
  auth: AuthReducer,
  toaster: toasterReducer,
});

// export
export default rootReducer;
