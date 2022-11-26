import axios from "axios";
import CreateToaster from "../../utility/Toaster";
import {
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./actionType";

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
          navigate("/activation");
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
  (code, navigate, Cookie) => async (dispatch) => {
    try {
      await axios
        .post("/api/v1/user/activate-code", code)
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
