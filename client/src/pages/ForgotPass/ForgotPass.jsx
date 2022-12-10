import React, { useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { hideEmailMobile } from "./../../utility/helper";
import Cookies from "js-cookie";
import axios from "axios";
import CreateToaster from "../../utility/Toaster";

const ForgotPass = () => {
  // navigate
  const navigate = useNavigate();

  // user state
  const [findUser, setFindUser] = useState({
    name: "",
    email: "",
    mobile: "",
    photo: "",
  });

  // get data from cookies
  const userData = JSON.parse(Cookies.get("user")) ?? null;
  // console.log(userData);

  // handle not you
  const handleNotYou = (e) => {
    e.preventDefault();
    // cookie remove
    Cookies.remove("user");
    navigate("/find-account");
  };

  // reset password
  const handleResetPassword = (e) => {
    e.preventDefault();

    // get data from cookie
    const userInfo = JSON.parse(Cookies.get("user"));

    console.log(userInfo.email);

    // send data
    axios
      .post("/api/v1/user/password-reset-otp", {
        auth: userInfo.email ?? userInfo.mobile,
      })
      .then((res) => {
        CreateToaster("Set password reset OTP", "success");
        navigate("/activation");
      })
      .catch((error) => {
        CreateToaster(error.response.data.message, "error");
      });
  };

  useEffect(() => {
    if (userData) {
      setFindUser({
        name: userData.name,
        email: userData.email ?? null,
        mobile: userData.mobile ?? null,
        photo: userData.photo,
      });
    }
  }, []);

  return (
    <>
      <Header />
      <div className="reset-area">
        <div className="reset-wraper">
          <div className="reset-box">
            <div className="reset-box-header">
              <span className="title">Reset your password</span>
            </div>
            <div className="reset-body">
              <div className="find-user-account">
                <img
                  src={
                    findUser.photo
                      ? findUser.photo
                      : "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png"
                  }
                  alt=""
                />
                <span>{findUser.name}</span>
                <p>
                  {findUser.email ? "Email : " : "Mobile : "}
                  {hideEmailMobile(findUser.email) ??
                    hideEmailMobile(findUser.mobile)}
                </p>
                <p>To reset your account password, please continue</p>
              </div>
            </div>
            <div className="reset-footer">
              <div className="reset-btns" style={{ float: "right" }}>
                <a className="cancel" href="#" onClick={handleNotYou}>
                  Not you ?
                </a>
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

export default ForgotPass;
