import React, { useState } from "react";
import crossBtn from "../../assets/icons/cross.png";

const RegisterModal = ({ setRegModal }) => {
  // input data state
  const [input, setInput] = useState({
    fname: "",
    sname: "",
    password: "",
    mobileOrEmail: "",
  });

  // input feilds manage
  const handleInputData = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // input validation state
  const [validate, setValidate] = useState({
    fname: false,
    sname: false,
    email: false,
    mobileOrEmail: false,
  });

  // handle input validate
  const handleInputValidate = (e) => {
    const feildName = e.target.name;
    // console.log(input[feildName]);

    // validaition
    if (!input[feildName]) {
      setValidate((prev) => ({
        ...prev,
        [feildName]: true,
      }));
    } else {
      setValidate((prev) => ({
        ...prev,
        [feildName]: false,
      }));
    }
  };

  return (
    <>
      <div className="blur-box">
        <div className="sign-up-card">
          <div className="sign-up-header">
            <div className="sign-up-content">
              <span>Sign Up</span>
              <span>It's quick and easy.</span>
            </div>
            <button onClick={() => setRegModal(false)}>
              <img src={crossBtn} alt="" />
            </button>
          </div>
          <div className="sign-up-body">
            <form action="">
              <div className="reg-form reg-form-inline">
                <input
                  className={validate.fname && "error-border"}
                  type="text"
                  placeholder="First Name"
                  onChange={handleInputData}
                  value={input.fname}
                  name="fname"
                  onBlur={handleInputValidate}
                />
                <input
                  className={validate.sname && "error-border"}
                  type="text"
                  placeholder="Surname"
                  onChange={handleInputData}
                  value={input.sname}
                  name="sname"
                  onBlur={handleInputValidate}
                />
              </div>
              <div className="reg-form">
                <input
                  className={validate.mobileOrEmail && "error-border"}
                  type="text"
                  placeholder="Mobile number or email address"
                  onChange={handleInputData}
                  value={input.mobileOrEmail}
                  name="mobileOrEmail"
                  onBlur={handleInputValidate}
                />
              </div>
              <div className="reg-form">
                <input
                  className={validate.password && "error-border"}
                  type="text"
                  placeholder="New password"
                  onChange={handleInputData}
                  value={input.password}
                  name="password"
                  onBlur={handleInputValidate}
                />
              </div>
              <div className="reg-form">
                <span>Date of birth</span>
                <div className="reg-form-select">
                  <select name="" id="">
                    <option value="">Day</option>
                  </select>
                  <select name="" id="">
                    <option value="">Month</option>
                  </select>
                  <select name="" id="">
                    <option value="">Year</option>
                  </select>
                </div>
              </div>

              <div className="reg-form">
                <span>Gender</span>
                <div className="reg-form-select">
                  <label>
                    Female
                    <input type="radio" name="gender" />
                  </label>
                  <label>
                    Male
                    <input type="radio" name="gender" />
                  </label>
                  <label>
                    Custom
                    <input type="radio" name="gender" />
                  </label>
                </div>
              </div>

              <div className="reg-form">
                <p>
                  People who use our service may have uploaded your contact
                  information to Facebook. <a href="#">Learn more.</a>
                </p>
              </div>
              <div className="reg-form">
                <p>
                  By clicking Sign Up, you agree to our <a href="#">Terms</a>,
                  <a href="#">Privacy Policy</a> and
                  <a href="#">Cookies Policy</a>. You may receive SMS
                  notifications from us and can opt out at any time.
                </p>
              </div>

              <div className="reg-form">
                <button>Sign Up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterModal;
