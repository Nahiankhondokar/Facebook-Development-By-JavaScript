import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import facebook from "../../assets/icons/facebook.svg";
import Footer from "../../components/Footer/Footer";
import Cookie from "js-cookie";
import "../../assets/css/style.css";

const Activation = () => {
  // navigaet
  const navigate = useNavigate();

  // get cookie
  const activationEmail = Cookie.get("email");
  //   console.log(activationEmail);

  // cancel code action
  const handleCancelCodeActivation = (e) => {
    e.preventDefault();
    Cookie.remove("email");
    navigate("/");
  };

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
                <input type="text" />
                <div className="code-text">
                  <span>We sent your code to:</span>
                  <span>{activationEmail}</span>
                </div>
              </div>
            </div>
            <div className="reset-footer">
              <a href="#">Didn't get a code?</a>
              <div className="reset-btns">
                <a
                  onClick={handleCancelCodeActivation}
                  className="cancel"
                  href="#"
                >
                  Cancel
                </a>
                <a className="continue" href="#">
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
