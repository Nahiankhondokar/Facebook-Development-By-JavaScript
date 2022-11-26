import axios from "axios";
import CreateToaster from "../../utility/Toaster";
import {
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./actionType";

// user register
export const UserRegister = (data, navigate) => async (dispatch) => {
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
