import axios from "axios";
import CreateToaster from "../../utility/Toaster";
import Cookie from "js-cookie";
import {
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./actionType";
import Cookies from "js-cookie";

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
    await axios
      .post("/api/v1/user/login", {
        auth,
        password,
      })
      .then((res) => {
        CreateToaster(res.data.message, "success");
        navigate("/home");
      })
      .catch((error) => {
        CreateToaster(error.response.data.message, "error");
      });
  } catch (error) {
    CreateToaster(error.response.data.message, "error");
  }
};
