import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
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
        user: {},
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loginStatus: true,
        loading: true,
        message: "login successful",
        user: payload,
      };

    default:
      return state;
  }
};
