import User from "./../models/User.js";
import createError from "../utility/createError.js";
import { isEmail, isMobile } from "../utility/validate.js";
import { hasPassword, passwordVerify } from "../utility/hash.js";
import { createToken, tokenVerify } from "../utility/token.js";
import { accActivationEmail, passwordResetEmail } from "../utility/sendMail.js";
import { randomCode } from "../utility/math.js";
import { sendOTP } from "../utility/sendSMS.js";

/**
 *  @access Public
 *  @route api/User/register
 *  @method POST
 */
export const register = async (req, res, next) => {
  //    console.log(req.body);
  try {
    // get all form data
    const {
      first_name,
      sur_name,
      auth,
      password,
      gender,
      birth_date,
      birth_month,
      birth_year,
    } = req.body;

    // form feilds validation
    if (!first_name || !sur_name || !auth || !password) {
      next(createError(404, "All Feids are reqired !"));
    }

    // initial email or mobile data
    let emailData = null;
    let mobileData = null;

    // email validation checking
    if (isEmail(auth)) {
      emailData = auth;
      // email checking
      const emailCheck = await User.findOne({ email: auth });
      if (emailCheck) {
        next(createError(404, "Email already exits !"));
      }
    } else if (isMobile(auth)) {
      mobileData = auth;
      // mobile checking
      const mobileCheck = await User.findOne({ mobile: auth });
      if (mobileCheck) {
        next(createError(404, "Mobile already exits !"));
      }
    } else {
      next(createError(404, "Invalid Email !"));
      // console.log("invalid");
    }

    // create activation code
    let activationCode = randomCode(10000, 99999);

    // unique activation code checking
    let activateCodeCheck = await User.findOne({
      access_token: activationCode,
    });
    if (activateCodeCheck) {
      let activationCode = randomCode(10000, 99999);
    }

    // user register or create
    const user = await User.create({
      first_name,
      sur_name,
      password: hasPassword(password),
      access_token: activationCode,
      email: emailData,
      mobile: mobileData,
      gender,
      birth_date,
      birth_month,
      birth_year,
    });

    // user created message
    if (user) {
      // if it's email
      if (emailData) {
        // create activation token
        const activateToken = createToken({ id: user._id }, "30d");

        // send mail to user
        accActivationEmail(user.email, {
          name: user.first_name + " " + user.sur_name,
          link: `${
            process.env.APP_URL + ":" + process.env.PORT
          }/api/v1/user/activate/${activateToken}`,
          code: activationCode,
        });

        // send confirmation message to user
        res
          .status(200)
          .cookie("email", user.email, {
            expires: new Date(Date.now() + 1000 * 60 * 15),
          })
          .json({
            message: "user created",
            user: user,
          });
      }

      // if it's Mobile Number
      if (mobileData) {
        // sms data
        let userName = user.first_name + " " + user.sur_name;
        let OPTsms = `Hi ${userName} you OTP code is : ${activationCode}`;

        // send activation OTP
        sendOTP(OPTsms, user.mobile);

        // send confirmation message to user
        res
          .status(200)
          .cookie("email", user.mobile, {
            expires: new Date(Date.now() + 1000 * 60 * 15),
          })
          .json({
            message: "user created",
            user: user,
          });
      }
    }
  } catch (error) {
    next(error);
    console.log(error);
  }
};

/**
 *  @access Public
 *  @route api/User/login
 *  @method POST
 */
export const login = async (req, res, next) => {
  try {
    // get all form data
    const { auth, password } = req.body;

    if (isEmail(auth)) {
      // form feilds validation
      if (!auth || !password) {
        next(createError(404, "All Feids are required !"));
      }

      // valid user checking
      const loginUser = await User.findOne({ email: auth });

      // valid user checking
      if (!loginUser) {
        next(createError(404, "User not exists !"));
      } else {
        // user password checking
        if (!passwordVerify(password, loginUser.password)) {
          next(createError(404, "Wrong Password !"));
        } else {
          // create token
          const token = createToken({ id: loginUser._id }, "365d");

          // user LoggedIn message
          res.status(200).cookie("authToken", token).json({
            message: "User LoggedIn Successfully",
            user: loginUser,
            token: token,
          });
        }
      }
    } else if (isMobile(auth)) {
      // form feilds validation
      if (!auth || !password) {
        next(createError(404, "All Feids are required !"));
      }

      // valid user checking
      const loginUser = await User.findOne({ mobile: auth });

      // valid user checking
      if (!loginUser) {
        next(createError(404, "User not exists !"));
      } else {
        // user password checking
        if (!passwordVerify(password, loginUser.password)) {
          next(createError(404, "Wrong Password !"));
        } else {
          // create token
          const token = createToken({ id: loginUser._id }, "365d");

          // user LoggedIn message
          res.status(200).cookie("authToken", token).json({
            message: "User LoggedIn Successfully",
            user: loginUser,
            token: token,
          });
        }
      }
    } else {
      next(createError(404, "Invalid Email or Mobile !"));
    }
  } catch (error) {
    next(error);
  }
};

/**
 *  @access Public
 *  @route api/User/account-verfiy
 *  @method POST
 */
export const accountActivateByLink = async (req, res, next) => {
  try {
    // get token
    const { token } = req.params;

    // token exits
    if (!token) {
      next(createError(404, "Empty URL"));
    } else {
      // token verify
      const tokenCheck = tokenVerify(token);

      // token validation
      if (!tokenCheck) {
        next(createError(404, "Invalid Token"));
      }

      // activate account
      if (tokenCheck) {
        // accoutn details
        const account = User.findOne({ _id: tokenCheck.id });

        // account activation checking
        if (account.isActivate == true) {
          next(createError(404, "Accont Already Activated"));
        } else {
          await User.findByIdAndUpdate(tokenCheck.id, {
            isActivate: true,
            access_token: "",
          });

          res.status(200).json({
            message: "account activated",
          });
        }
      }
    }
  } catch (error) {
    next(error);
  }
};

/**
 *  @access Public
 *  @route api/User/activation-code
 *  @method POST
 */
export const accountActivateByCode = async (req, res, next) => {
  try {
    // get activation code
    const { code, email } = req.body;

    // get inactivete user (email : email/mobile)
    const user = await User.findOne().or([{ email: email }, { mobile: email }]);

    // validation checking
    if (!user) {
      next(createError(404, "Email does not exits !"));
    } else {
      if (user.isActivate == true) {
        next(createError(404, "Account already activated !"));
      } else {
        if (user.access_token != code) {
          next(createError(404, "OTP is invalid !"));
        } else {
          // activate user
          await User.findByIdAndUpdate(user._id, {
            isActivate: true,
            access_token: "",
          });

          res.status(200).json({
            status: "User Activated",
          });
        }
      }
    }
  } catch (error) {
    next(error);
  }
};

/**
 *  @access Public
 *  @route api/User/me
 *  @method POST
 */
export const loggedInUser = async (req, res, next) => {
  try {
    // get token
    const auth_token = req.headers.authorization;

    // get only token
    if (auth_token) {
      const token = auth_token.split(" ")[1];

      // get token data
      const user = tokenVerify(token);

      // validation
      if (!user) {
        next(createError(404, "Invalid Token !"));
      }
      // get loggedIn User data
      if (user) {
        const loggedIn_user = await User.findById(user.id);

        // validaiton
        if (!loggedIn_user) {
          next(createError(404, "LoggedIn User no Found!"));
        } else {
          res.status(200).json({ user: loggedIn_user });
        }
      }
    }
  } catch (error) {
    next(error);
  }
};

/**
 *  forgot password
 *  @access Public
 *  @route api/User/forgot-password
 *  @method POST
 */
export const forgotPassword = async (req, res, next) => {
  try {
    // get user info
    const { email } = req.body;

    // check valid user
    const user = await User.findOne({ email });

    // validation
    if (!user) {
      next(createError(404, "User not found"));
    }

    // email send to user for reset password
    if (user) {
      // create activation token
      const resetPasswordToken = createToken({ id: user._id }, "30m");

      // create activation code
      let activationCode = randomCode(10000, 99999);

      // unique activation code checking
      let activateCodeCheck = await User.findOne({
        access_token: activationCode,
      });
      if (activateCodeCheck) {
        let activationCode = randomCode(10000, 99999);
      }

      // send mail for reset password
      passwordResetEmail(user.email, {
        name: user.first_name + " " + user.sur_name,
        link: `${
          process.env.APP_URL + ":" + process.env.PORT
        }/api/v1/user/forgot-password/${resetPasswordToken}`,
        code: activationCode,
      });

      // update user access token
      await User.findByIdAndUpdate(user._id, {
        access_token: activationCode,
      });

      // resposne send
      res.status(200).json({
        message: "Password reset link sent to email",
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 *  @access Public
 *  @route api/User/password-reset-link
 *  @method POST
 */
export const passwordResetByLink = async (req, res, next) => {
  try {
    // get token & new password
    const { token } = req.params;
    const { password } = req.body;

    // token exits
    if (!token) {
      next(createError(404, "Empty URL"));
    }

    // valid token or password reset
    if (token) {
      // token verify
      const tokenCheck = tokenVerify(token);

      // token validation
      if (!tokenCheck) {
        next(createError(404, "Invalid Token"));
      }

      // reset password
      if (tokenCheck) {
        // get user
        await User.findByIdAndUpdate(tokenCheck.id, {
          password: hasPassword(password),
        });

        // resposne send
        res.status(200).json({
          message: "Password reset successfully",
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

/**
 *  @access Public
 *  @route api/User/resend-accActivateEmail
 *  @method POST
 */
export const resendAccActivateEmail = async (req, res, next) => {
  try {
    // get all form data
    const { auth } = req.body;

    // initial email or mobile data
    let emailData = null;
    let mobileData = null;

    // create activation code
    let activationCode = randomCode(10000, 99999);

    // email validation checking
    if (isEmail(auth)) {
      // get data
      emailData = auth;
      // inactivate user checking
      const emailUser = await User.findOne({ email: auth });

      // validation
      if (!emailUser) {
        next(createError(404, "Email User Not Found"));
      }
      if (emailUser.isActivate) {
        next(createError(404, "Account already activated"));
      }

      // message resend to user & update access token
      if (emailUser) {
        // create activation token
        const activateToken = createToken({ id: emailUser._id }, "30d");

        // send mail
        accActivationEmail(emailUser.email, {
          name: emailUser.first_name + " " + emailUser.sur_name,
          link: `${
            process.env.APP_URL + ":" + process.env.PORT
          }/api/v1/user/activate/${activateToken}`,
          code: activationCode,
        });

        // user accesss token update
        await User.findByIdAndUpdate(emailUser._id, {
          access_token: activationCode,
        });

        // send confirmation message to user
        res
          .status(200)
          .cookie("email", emailUser.email, {
            expires: new Date(Date.now() + 1000 * 60 * 15),
          })
          .json({
            message: "Activation Email Has Been Sent",
          });
      }
    } else if (isMobile(auth)) {
      mobileData = auth;
      // inactivate user checking
      const mobileUser = await User.findOne({ mobile: auth });

      // validation
      if (!mobileUser) {
        next(createError(404, "Mobile User Not Found"));
      }
      if (mobileUser.isActivate) {
        next(createError(404, "Mobile Account already activated"));
      }

      // if it's Mobile Number
      if (mobileData) {
        // sms data
        let userName = mobileUser.first_name + " " + mobileUser.sur_name;
        let OPTsms = `Hi ${userName} you OTP code is : ${activationCode}`;

        // send activation OTP to mobile
        sendOTP(OPTsms, mobileUser.mobile);

        // send confirmation message to user
        res
          .status(200)
          .cookie("email", mobileUser.mobile, {
            expires: new Date(Date.now() + 1000 * 60 * 15),
          })
          .json({
            message: "New Activation OTP Sent",
            user: mobileUser,
          });
      }

      // user accesss token update
      await User.findByIdAndUpdate(mobileUser._id, {
        access_token: activationCode,
      });
    } else {
      next(createError(404, "Invalid Request !"));
      // console.log("invalid");
    }
  } catch (error) {
    next(error);
    // console.log(error);
  }
};

/**
 *  @access Public
 *  @route api/User/find-user-account for reset password
 *  @method POST
 */
export const findUserAccount = async (req, res, next) => {
  const { auth } = req.body;
  try {
    // email validation checking
    if (isEmail(auth)) {
      // email checking
      const emailCheck = await User.findOne({ email: auth });
      if (!emailCheck) {
        next(createError(404, "Email not found !"));
      } else {
        res
          .status(200)
          .cookie(
            "user",
            JSON.stringify({
              name: emailCheck.first_name + " " + emailCheck.sur_name,
              email: emailCheck.email,
              photo: emailCheck.profile_photo,
            }),
            {
              expires: new Date(Date.now() + 1000 * 60 * 15),
            }
          )
          .json({
            user: emailCheck,
          });
      }
    } else if (isMobile(auth)) {
      // mobile checking
      const mobileCheck = await User.findOne({ mobile: auth });
      if (!mobileCheck) {
        next(createError(404, "Mobile not found !"));
      } else {
        res
          .status(200)
          .cookie(
            "user",
            JSON.stringify({
              name: mobileCheck.first_name + " " + mobileCheck.sur_name,
              mobile: mobileCheck.mobile,
              photo: mobileCheck.profile_photo,
            }),
            {
              expires: new Date(Date.now() + 1000 * 60 * 15),
            }
          )
          .json({
            user: mobileCheck,
          });
      }
    } else {
      next(createError(404, "Invalid Email or Mobile !"));
      // console.log("invalid");
    }
  } catch (error) {
    next(error);
  }
};

/**
 *  @access Public
 *  @route api/User/resend-accActivateEmail
 *  @method POST
 */
export const sendPasswordResetOTP = async (req, res, next) => {
  try {
    // get all form data
    const { auth } = req.body;

    console.log(auth);

    // initial email or mobile data
    let emailData = null;
    let mobileData = null;

    // create activation code
    let activationCode = randomCode(10000, 99999);

    // email validation checking
    if (isEmail(auth)) {
      // get data
      emailData = auth;
      // inactivate user checking
      const emailUser = await User.findOne({ email: auth });

      // validation
      if (!emailUser) {
        next(createError(404, "Email User Not Found"));
      }

      // message resend to user & update access token
      if (emailUser) {
        // create activation token
        const activateToken = createToken({ id: emailUser._id }, "30d");

        // send mail
        accActivationEmail(
          emailUser.email,
          {
            name: emailUser.first_name + " " + emailUser.sur_name,
            link: `${
              process.env.APP_URL + ":" + process.env.PORT
            }/api/v1/user/activate/${activateToken}`,
            code: activationCode,
          },
          "Reset Password"
        );

        // user accesss token update
        await User.findByIdAndUpdate(emailUser._id, {
          access_token: activationCode,
        });

        // send confirmation message to user
        res
          .status(200)
          .cookie("email", emailUser.email, {
            expires: new Date(Date.now() + 1000 * 60 * 15),
          })
          .json({
            message: "Activation Email Has Been Sent",
          });
      }
    } else if (isMobile(auth)) {
      mobileData = auth;
      // inactivate user checking
      const mobileUser = await User.findOne({ mobile: auth });

      // validation
      if (!mobileUser) {
        next(createError(404, "Mobile User Not Found"));
      }

      // if it's Mobile Number
      if (mobileData) {
        // sms data
        let userName = mobileUser.first_name + " " + mobileUser.sur_name;
        let OPTsms = `Hi ${userName} you OTP code is : ${activationCode}`;

        // send activation OTP to mobile
        sendOTP(OPTsms, mobileUser.mobile);

        // send confirmation message to user
        res
          .status(200)
          .cookie("email", mobileUser.mobile, {
            expires: new Date(Date.now() + 1000 * 60 * 15),
          })
          .json({
            message: "New Activation OTP Sent",
            user: mobileUser,
          });
      }

      // user accesss token update
      await User.findByIdAndUpdate(mobileUser._id, {
        access_token: activationCode,
      });
    } else {
      next(createError(404, "Invalid Request !"));
      // console.log("invalid");
    }
  } catch (error) {
    next(error);
    // console.log(error);
  }
};

/**
 *  @access Public
 *  @route api/User/check-password-rest-OTP
 *  @method POST
 */
export const checkPasswordResetOTP = async (req, res, next) => {
  try {
    // get all form data
    const { auth, code } = req.body;

    // email validation checking
    if (isEmail(auth)) {
      // reset password user checking
      const emailUser = await User.findOne().and([
        { email: auth },
        { access_token: code },
      ]);

      // validation
      if (!emailUser) {
        next(createError(404, "Email User Not Found"));
      }

      // get reset password user
      if (emailUser) {
        // send confirmation message to user
        res
          .status(200)
          .cookie("cpid", emailUser._id.toString(), {
            expires: new Date(Date.now() + 1000 * 60 * 30),
          })
          .cookie("code", code, {
            expires: new Date(Date.now() + 1000 * 60 * 30),
          })
          .json({
            message: "You Can Change Your Passwrod",
          });
      }
    } else if (isMobile(auth)) {
      // reset password user checking
      const mobileUser = await User.findOne().and([
        { mobile: auth },
        { access_token: code },
      ]);

      // validation
      if (!mobileUser) {
        next(createError(404, "Email User Not Found"));
      }

      // get reset password user
      if (mobileUser) {
        // send confirmation message to user
        res
          .status(200)
          .cookie("cpid", mobileUser._id.toString(), {
            expires: new Date(Date.now() + 1000 * 60 * 30),
          })
          .cookie("code", code, {
            expires: new Date(Date.now() + 1000 * 60 * 30),
          })
          .json({
            message: "You Can Change Your Passwrod",
          });
      }
    } else {
      next(createError(404, "Invalid Request !"));
      // console.log("invalid");
    }
  } catch (error) {
    next(error);
    // console.log(error);
  }
};

/**
 *  @access Public
 *  @route api/User/password-reset
 *  @method POST
 */
export const passwordReset = async (req, res, next) => {
  try {
    // get all form data
    const { id, code, password } = req.body;

    // get data
    const user = await User.findOne().and([
      { _id: id },
      { access_token: code },
    ]);

    // validation
    if (!user) {
      return next(createError(404, "User Not Found !"));
    }

    if (user) {
      await User.findByIdAndUpdate(id, {
        password: hasPassword(password),
        access_token: null,
      });

      return res
        .clearCookie("code")
        .clearCookie("cpid")
        .clearCookie("user")
        .status(200)
        .json({
          message: "Password Changed Successfully",
        });
    }
  } catch (error) {
    next(error);
    // console.log(error);
  }
};
