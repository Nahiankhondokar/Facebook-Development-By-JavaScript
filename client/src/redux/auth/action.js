import axios from "axios";
import CreateToaster from "../../utility/Toaster";

// user register
export const UserRegister = (data) => async (dispatch) => {
  try {
    // console.log(data);
    await axios.post("api/v1/user/register", data).then((res) => {
      CreateToaster("User Register Successful", 'success');
    });
  } catch (error) {
    console.log(error);
  }
};
