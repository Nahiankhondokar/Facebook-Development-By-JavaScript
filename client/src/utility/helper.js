import { isEmail, isMobile } from "./validate";

//email or phone number hassing
export const hideEmailMobile = (data) => {
  // if email
  if (isEmail(data)) {
    // getting data & devide them.
    let mail = data.split("@")[0];
    let com = data.split("@")[1];

    // get first & last digit
    let first_digit = mail.substr(0, 1);
    let last_digit = mail.substr(-1, 1);

    return first_digit + "**************" + last_digit + "@" + com;
  }

  // if Mobile number
  if (isMobile(data)) {
    // get first & last digit
    let first_digit = data.substr(0, 3);
    let last_digit = data.substr(-2);

    return first_digit + "**********" + last_digit;
  }
};
