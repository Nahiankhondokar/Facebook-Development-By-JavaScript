import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";

const ForgotPass = () => {
  return (
    <>
      <Header />
      <div className="reset-area">
        <div className="reset-wraper">
          <div className="reset-box">
            <div className="reset-box-header">
              <span className="title">Find Your Account</span>
            </div>
            <div className="reset-body">
              <p>
                Please enter your email address or phone number to search your
                account.
              </p>
              <div className="code-box">
                <input type="text" placeholder="Enter Your Email or Mobile" />
              </div>
            </div>
            <div className="reset-footer">
              <a href="#">Didn't get a code?</a>
              <div className="reset-btns">
                <Link className="cancel" to="/">
                  Cancel
                </Link>
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

export default ForgotPass;
