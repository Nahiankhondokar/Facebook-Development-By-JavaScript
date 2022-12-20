import Cookies from "js-cookie";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { PasswordReset } from "../../redux/auth/action";

const ChangePassword = () => {
  // dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // password state
  const [password, setPassword] = useState({
    pass: "",
  });

  // handle Input Data
  const handleInputData = (e) => {
    setPassword({
      ...password,
      pass: e.target.value,
    });
  };

  // get data form cookies
  const id = Cookies.get("cpid");
  const code = Cookies.get("code");

  // reset password
  const handleResetPassword = (e) => {
    e.preventDefault();
    dispatch(PasswordReset(code, id, password.pass, navigate));
  };

  return (
    <>
      <Header />
      <div className="reset-area">
        <div className="reset-wraper">
          <div className="reset-box">
            <div className="reset-box-header">
              <span className="title">Choose a new password</span>
            </div>
            <div className="reset-body">
              <p>
                Create a new password that is at least 6 characters long. A
                strong password has a combination of letters, digits and
                punctuation marks.
              </p>
              <div className="code-box">
                <input
                  className="w-100"
                  type="text"
                  placeholder="New password"
                  value={password.pass}
                  onChange={handleInputData}
                />
              </div>
            </div>
            <div className="reset-footer">
              <a href="#"></a>
              <div className="reset-btns">
                <Link className="cancel" to="/">
                  Skip
                </Link>
                <a className="continue" href="#" onClick={handleResetPassword}>
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

export default ChangePassword;
