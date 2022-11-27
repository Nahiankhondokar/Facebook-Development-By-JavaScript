import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import facebook from "../../assets/icons/facebook.svg";
import Footer from "../../components/Footer/Footer";
import { AccountActivateByCode, ResendEmail } from "../../redux/auth/action";
import { useState } from "react";
import Cookie from "js-cookie";
import "../../assets/css/style.css";
import CreateToaster from "../../utility/Toaster";

const Activation = () => {
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

  // use effect hook
  useEffect(() => {
    if (!activationEmail) {
      navigate("/");
    }
  });
  return (
    <>
      <div className="reset-header">
        <div className="reset-header-wraper">
          <div className="reset-logo">
            <img src={facebook} alt="" />
          </div>
          <div className="login-part">
            <input type="text" placeholder="Email or mobile number" />
            <input type="text" placeholder="Password" />
            <button>Log In</button>
            <a href="#">Forgotten account?</a>
          </div>
        </div>
      </div>

      <div className="reset-area">
        <div className="reset-wraper">
          <div className="reset-box">
            <div className="reset-box-header">
              <span className="title">Enter security code</span>
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
                  onClick={handleAccActivateByCode}
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
