import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Footer from "../../components/Footer/Footer";
import {
  AccountActivateByCode,
  CheckResetPasswordAccount,
  ResendEmail,
} from "../../redux/auth/action";
import { useState } from "react";
import Cookie from "js-cookie";
import "../../assets/css/style.css";
import CreateToaster from "../../utility/Toaster";
import Header from "../../components/Header/Header";

const Activation = () => {
  // params
  const { key } = useParams();
  // console.log(key);

  // navigaet
  const navigate = useNavigate();

  // dispatch
  const dispatch = useDispatch();

  // activation state
  const [code, setCode] = useState("");

  // get cookie
  const activationEmail = Cookie.get("email");
  //   console.log(activationEmail);

  // cancel code action
  const handleCancelCodeActivation = (e) => {
    e.preventDefault();
    Cookie.remove("email");
    navigate("/");
  };

  // account activate input manage
  const handleActivateCodeManage = (e) => {
    setCode(e.target.value);
  };

  // account activate by code
  const handleAccActivateByCode = (e) => {
    e.preventDefault();
    // validation
    if (!code) {
      CreateToaster("Activation Code is required", "warn");
    } else {
      dispatch(AccountActivateByCode(code, activationEmail, navigate));
    }
  };

  // email resend
  const hanldeResendEmail = (e) => {
    e.preventDefault();
    dispatch(ResendEmail(activationEmail));
  };

  // check reset password Account
  const handleCheckResetPass = (e) => {
    e.preventDefault();
    // validation
    if (!code) {
      CreateToaster("Activation Code is required", "warn");
    } else {
      dispatch(CheckResetPasswordAccount(code, activationEmail, navigate));
    }
  };

  // use effect hook
  useEffect(() => {
    if (!activationEmail) {
      navigate("/");
    }
  });
  return (
    <>
      <Header />

      <div className="reset-area">
        <div className="reset-wraper">
          <div className="reset-box">
            <div className="reset-box-header">
              <span className="title">Enter Activation code</span>
            </div>
            <div className="reset-body">
              <p>
                Please check your emails for a message with your code. Your code
                is 6 numbers long.
              </p>
              <div className="code-box">
                <input
                  type="text"
                  value={code}
                  onChange={handleActivateCodeManage}
                />
                <div className="code-text">
                  <span>We sent your code to:</span>
                  <span>{activationEmail}</span>
                </div>
              </div>
            </div>
            <div className="reset-footer">
              <a href="#" onClick={hanldeResendEmail}>
                Didn't get a code?
              </a>
              <div className="reset-btns">
                <a
                  onClick={handleCancelCodeActivation}
                  className="cancel"
                  href="#"
                >
                  Cancel
                </a>
                <a
                  onClick={
                    key == "account"
                      ? handleAccActivateByCode
                      : handleCheckResetPass
                  }
                  className="continue"
                  href="#"
                >
                  Continue
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Activation;
