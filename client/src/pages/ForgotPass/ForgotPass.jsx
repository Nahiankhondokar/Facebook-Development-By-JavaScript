import React, { useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

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

  useEffect(() => {
    if (userData) {
      setFindUser({
        name: userData.name,
        email: userData.email,
        mobile: userData.mobile,
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
                <span>{findUser.email ?? findUser.mobile}</span>
                <p>To reset your account password, please continue</p>
              </div>
            </div>
            <div className="reset-footer">
              <div className="reset-btns">
                <a className="cancel" href="#" onClick={handleNotYou}>
                  Not you ?
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

export default ForgotPass;
