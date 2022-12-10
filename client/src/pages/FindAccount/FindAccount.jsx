import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import axios from "axios";
import CreateToaster from "../../utility/Toaster";

const FindAccount = () => {
  // input state
  const [auth, setAuth] = useState("");

  // navigate
  const navigate = useNavigate();

  // handle input data
  const handleInputData = (e) => {
    setAuth(e.target.value);
  };

  // handle find user
  const handleFindUser = (e) => {
    e.preventDefault();

    // validation & data send
    if (!auth) {
      CreateToaster("Feild is required", "error");
    } else {
      axios
        .post("/api/v1/user/find-user-account", { auth })
        .then((res) => {
          // console.log(res.data);
          navigate("/forgot-password");
        })
        .catch((error) => {
          CreateToaster(error.response.data.message, "error");
        });
    }
  };

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
                <input
                  type="text"
                  placeholder="Enter Your Email or Mobile"
                  value={auth}
                  onChange={handleInputData}
                />
              </div>
            </div>
            <div className="reset-footer">
              <a href="#">Didn't get a code?</a>
              <div className="reset-btns">
                <Link className="cancel" to="/">
                  Cancel
                </Link>
                <a className="continue" href="#" onClick={handleFindUser}>
                  Search
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

export default FindAccount;
