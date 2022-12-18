import { combineReducers } from "redux";
import { AuthReducer } from "./auth/reducer";
import toasterReducer from "./toaster/toasterReducer";
import { loaderReducer } from "./top-loader/loaderReducer";

// create root reducer
const rootReducer = combineReducers({
  auth: AuthReducer,
  toaster: toasterReducer,
  loader: loaderReducer,
});

// export
export default rootReducer;
