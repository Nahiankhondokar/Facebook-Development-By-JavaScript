import React, { useState } from "react";
import RegisterModal from "../../components/RegisterModal/RegisterModal";
import facebook from "../../assets/icons/facebook.svg";
import Login from "../../components/Login/Login";
import "../../assets/css/style.css";
import Footer from "../../components/Footer/Footer";
import { useSelector } from "react-redux";
import Home from "../Home/Home";

const Auth = () => {
  // registration modal manage
  const [regModal, setRegModal] = useState(false);

  // selector
  const { loginStatus } = useSelector((state) => state.auth);

  return (
    <>
      {loginStatus ? (
        <Home />
      ) : (
        <>
          <div className="fb-auth">
            <div className="auth-wraper">
              <div className="auth-left">
                <img src={facebook} alt="" />
                <h2>
                  Facebook helps you connect and share with the people in your
                  life.
                </h2>
              </div>
              <div className="auth-right">
                <Login setRegModal={setRegModal} />
                <p>
                  <a href="#">Create a Page</a> for a celebrity, brand or
                  business.
                </p>
              </div>
            </div>
          </div>
          <Footer />
          {regModal && <RegisterModal setRegModal={setRegModal} />}
        </>
      )}
    </>
  );
};

export default Auth;
