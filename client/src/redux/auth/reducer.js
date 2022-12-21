import {
  LOGGEDIN_USER_FAILED,
  LOGGEDIN_USER_SUCCESS,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  USER_LOGOUT,
} from "./actionType";
import { initialState } from "./initialState";

// create reducer
export const AuthReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload,
      };

    case REGISTER_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
      };

    case LOGIN_FAILED:
      return {
        ...state,
        loginStatus: false,
        message: "login failed",
        user: null,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loginStatus: true,
        loading: true,
        message: "login successful",
        user: payload,
      };

    case LOGGEDIN_USER_SUCCESS:
      return {
        ...state,
        loginStatus: true,
        loading: false,
        user: payload,
      };

    case LOGGEDIN_USER_FAILED:
      return {
        ...state,
        loginStatus: false,
        loading: false,
        user: null,
      };

    case USER_LOGOUT:
      return {
        ...state,
        loginStatus: false,
        loading: false,
        message: null,
        user: null,
      };

    default:
      return state;
  }
};
