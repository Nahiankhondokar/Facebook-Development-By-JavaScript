import axios from "axios";
import CreateToaster from "../../utility/Toaster";
import Cookie from "js-cookie";
import {
  LOGGEDIN_USER_FAILED,
  LOGGEDIN_USER_REQUEST,
  LOGGEDIN_USER_SUCCESS,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  USER_LOGOUT,
} from "./actionType";
import Cookies from "js-cookie";
import { LOADER_END, LOADER_START } from "../top-loader/loaderTypes";

// user register
export const UserRegister =
  (data, navigate, e, setInput, setRegModal) => async (dispatch) => {
    try {
      // console.log(data);
      // loading on
      dispatch({
        type: REGISTER_REQUEST,
        payload: "",
      });

      // user register
      await axios
        .post("api/v1/user/register", data)
        .then((res) => {
          // success message
          CreateToaster("User Register Successful", "success");
          dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data.message,
          });

          // make empty feilds
          e.target.reset();
          setInput({
            fname: "",
            sname: "",
            password: "",
            mobileOrEmail: "",
          });

          // close register modal
          setRegModal(false);

          // navigate to account activation page
          navigate("/activation/account");
        })
        .catch((e) => {
          // error message
          CreateToaster(e.response.data.message, "error");
          dispatch({
            type: REGISTER_FAILED,
            payload: e.response.data.message,
          });
        });
    } catch (error) {
      // error message
      CreateToaster(error.response.data.message, "error");
      dispatch({
        type: REGISTER_FAILED,
        payload: error.response.data,
      });
    }
  };

// Account Activate by code
export const AccountActivateByCode =
  (code, email, navigate) => async (dispatch) => {
    try {
      await axios
        .post("/api/v1/user/activate-code", {
          code: code,
          email: email,
        })
        .then((res) => {
          CreateToaster("Account Activated, Please Login", "success");

          // navigate to login page
          navigate("/");

          // remove cookie
          Cookie.remove("email");
        })
        .catch((error) => {
          CreateToaster(error.response.data.message, "error");
        });
    } catch (error) {
      CreateToaster(error.response.data.message, "error");
    }
  };

// Check Reset password account
export const CheckResetPasswordAccount =
  (code, auth, navigate) => async (dispatch) => {
    try {
      await axios
        .post("/api/v1/user/check-password-reset-otp", {
          code: code,
          auth,
        })
        .then((res) => {
          CreateToaster("You Can Change You Password", "success");

          // navigate to login page
          navigate("/change-password");

          // remove cookie
          Cookie.remove("email");
        })
        .catch((error) => {
          CreateToaster(error.response.data.message, "error");
        });
    } catch (error) {
      CreateToaster(error.response.data.message, "error");
    }
  };

// resend email
export const ResendEmail = (email) => async (dispatch) => {
  try {
    await axios
      .post("/api/v1/user/resend-activation-email", {
        auth: email,
      })
      .then((res) => {
        CreateToaster(res.data.message, "success");
      })
      .catch((error) => {
        CreateToaster(error.response.data.message, "error");
      });
  } catch (error) {
    CreateToaster(error.response.data.message, "error");
  }
};

// reset password
export const PasswordReset =
  (code, id, password, navigate) => async (dispatch) => {
    try {
      await axios
        .post("/api/v1/user/password-reset", {
          id,
          code,
          password,
        })
        .then((res) => {
          CreateToaster(res.data.message, "success");
          navigate("/");
          Cookie.remove("cpid");
          Cookie.remove("code");
          Cookie.remove("user");
        })
        .catch((error) => {
          CreateToaster(error.response.data.message, "error");
        });
    } catch (error) {
      CreateToaster(error.response.data.message, "error");
    }
  };

// user login
export const UserLogin = (auth, password, navigate) => async (dispatch) => {
  try {
    // dispatch call
    dispatch({
      type: LOGIN_REQUEST,
    });
    dispatch({
      type: LOADER_START,
    });
    // user login
    await axios
      .post("/api/v1/user/login", {
        auth,
        password,
      })
      .then((res) => {
        // dispatch call
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data.user,
        });
        dispatch({
          type: LOADER_END,
        });
        CreateToaster(res.data.message, "success");
        navigate("/home");
      })
      .catch((error) => {
        // dispatch call
        dispatch({
          type: LOGIN_FAILED,
        });
        dispatch({
          type: LOADER_END,
        });
        CreateToaster(error.response.data.message, "error");
      });
  } catch (error) {
    dispatch({
      type: LOADER_END,
    });
    CreateToaster(error.response.data.message, "error");
  }
};

// get loggedIn user data
export const LoggedInUser = (token) => async (dispatch) => {
  try {
    // dispatch call
    dispatch({
      type: LOGGEDIN_USER_REQUEST,
    });
    dispatch({
      type: LOADER_START,
    });
    // user login
    await axios
      .get("/api/v1/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // dispatch call
        dispatch({
          type: LOGGEDIN_USER_SUCCESS,
          payload: res.data.user,
        });
        dispatch({
          type: LOADER_END,
        });
        CreateToaster(res.data.message, "success");
        // navigate("/home");
      })
      .catch((error) => {
        // dispatch call
        dispatch({
          type: LOGGEDIN_USER_FAILED,
        });
        dispatch({
          type: LOADER_END,
        });
        // user logout
        dispatch(UserLogout());
        CreateToaster(error.response.data.message, "error");
      });
  } catch (error) {
    dispatch({
      type: LOADER_END,
    });
    dispatch(UserLogout());
    CreateToaster(error.response.data.message, "error");
  }
};

// user logout
export const UserLogout = (navigate) => (dispatch) => {
  Cookies.remove("authToken");
  navigate("/");
  dispatch({
    type: LOADER_START,
  });
  dispatch({
    type: USER_LOGOUT,
  });
};
