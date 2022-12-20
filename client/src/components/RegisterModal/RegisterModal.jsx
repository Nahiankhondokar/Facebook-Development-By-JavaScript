import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import crossBtn from "../../assets/icons/cross.png";
import { UserRegister } from "../../redux/auth/action";
import CreateToaster from "../../utility/Toaster";
import { AiFillExclamationCircle } from "react-icons/ai";

const RegisterModal = ({ setRegModal }) => {
  // dispatch
  const dispatach = useDispatch();

  //navigate
  const navigate = useNavigate();

  // fb day array
  const fbDay = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];

  // fb month array
  const fbMonth = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Opt",
    "Nov",
    "Dec",
  ];

  // fb year
  const fbYear = Array.from(
    { length: 70 },
    (_, i) => new Date().getFullYear() - i
  );

  // current date
  const date = new Date();

  // input data state
  const [input, setInput] = useState({
    fname: "",
    sname: "",
    password: "",
    mobileOrEmail: "",
    fbDay: date.getDate(),
    fbMonth: fbMonth[date.getMonth()],
    fbYear: date.getFullYear(),
    gender: "",
  });

  // tooltip state
  const [tooltip, setTooltip] = useState({
    fname: false,
    sname: false,
    mobileOrEmail: false,
    password: false,
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
    mobileOrEmail: false,
    gender: false,
    password: false,
    dob: false,
  });

  // handle input border validate
  const handleInputValidate = (e) => {
    const feildName = e.target.name;
    // console.log(feildName);

    // validaition
    if (!input[feildName]) {
      // border validation
      setValidate((prev) => ({
        ...prev,
        [feildName]: true,
      }));

      // tooltip validation
      setTooltip({
        ...tooltip,
        [feildName]: false,
      });
    } else {
      // border validation
      setValidate((prev) => ({
        ...prev,
        [feildName]: false,
      }));
    }
  };

  // handle tooltip
  const handleTooltip = (e) => {
    const feildName = e.target.name;
    // console.log(feildName);

    if (validate[feildName] === true) {
      // border validation
      setValidate((prev) => ({
        ...prev,
        [feildName]: false,
      }));

      // tooltip validation
      setTooltip({
        ...tooltip,
        [feildName]: true,
      });
    }
  };

  // user registraion
  const handleUserRegister = (e) => {
    e.preventDefault();

    // validaiton
    if (
      !input.fname ||
      !input.sname ||
      !input.password ||
      !input.mobileOrEmail ||
      !input.gender
    ) {
      CreateToaster("All Feilds Are Require");
      setValidate({
        fname: true,
        sname: true,
        password: true,
        mobileOrEmail: true,
        gender: true,
        dob: true,
      });
    } else {
      // user register
      dispatach(
        UserRegister(
          {
            first_name: input.fname,
            sur_name: input.sname,
            auth: input.mobileOrEmail,
            password: input.password,
            gender: input.gender,
            birth_date: input.fbDay,
            birth_month: input.fbMonth,
            birth_year: input.fbYear,
          },
          navigate,
          e,
          setInput,
          setRegModal
        )
      );
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
            <form onSubmit={handleUserRegister}>
              <div className="reg-form reg-form-inline">
                <input
                  className={validate.fname && "error-border"}
                  type="text"
                  placeholder="First Name"
                  onChange={handleInputData}
                  value={input.fname}
                  name="fname"
                  onBlur={handleInputValidate}
                  onFocus={handleTooltip}
                />
                {validate.fname && (
                  <span className="exclamation-sign-fname">
                    <AiFillExclamationCircle />
                  </span>
                )}
                {tooltip.fname && (
                  <span className="tooltip-fname">
                    <div className="tooltip-arrow-sign"></div>
                    <p>What's your name ?</p>
                  </span>
                )}
                <input
                  className={validate.sname && "error-border"}
                  type="text"
                  placeholder="Surname"
                  onChange={handleInputData}
                  value={input.sname}
                  name="sname"
                  onBlur={handleInputValidate}
                  onFocus={handleTooltip}
                />
                {validate.sname && (
                  <span className="exclamation-sign-sname">
                    <AiFillExclamationCircle />
                  </span>
                )}

                {tooltip.sname && (
                  <span className="tooltip-sname">
                    <div className="tooltip-arrow-sign"></div>
                    <p>What's your surname ?</p>
                  </span>
                )}
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
                  onFocus={handleTooltip}
                />
                {validate.mobileOrEmail && (
                  <span className="exclamation-sign-mobileOrEmail">
                    <AiFillExclamationCircle />
                  </span>
                )}
                {tooltip.mobileOrEmail && (
                  <span className="tooltip-mobileOrEmail">
                    <div className="tooltip-arrow-sign"></div>
                    <p>What's your Email, Mobile ?</p>
                  </span>
                )}
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
                  onFocus={handleTooltip}
                />
                {validate.password && (
                  <span className="exclamation-sign-password">
                    <AiFillExclamationCircle />
                  </span>
                )}
                {tooltip.password && (
                  <span className="tooltip-password">
                    <div className="tooltip-arrow-sign"></div>
                    <p>What's your password ?</p>
                  </span>
                )}
              </div>
              <div className="reg-form">
                <span>
                  Date of birth
                  {validate.dob && (
                    <span className="exclamation-sign-dob">
                      <AiFillExclamationCircle />
                    </span>
                  )}
                </span>

                <div className="reg-form-select">
                  <select
                    name="fbDay"
                    id=""
                    onChange={handleInputData}
                    className={validate.dob && "error-border"}
                  >
                    {fbDay.map((item, index) => (
                      <option
                        value={item}
                        key={index}
                        selected={item === input.fbDay ? true : false}
                      >
                        {item}
                      </option>
                    ))}
                  </select>

                  <select
                    name="fbMonth"
                    id=""
                    onChange={handleInputData}
                    className={validate.dob && "error-border"}
                  >
                    {fbMonth.map((item, index) => (
                      <option
                        selected={item === input.fbMonth ? true : false}
                        value={item}
                        key={index}
                      >
                        {item}
                      </option>
                    ))}
                  </select>
                  <select
                    name="fbYear"
                    id=""
                    onChange={handleInputData}
                    className={validate.dob && "error-border"}
                  >
                    {fbYear.map((item, index) => (
                      <option
                        value={item}
                        key={index}
                        selected={item === input.fbYear ? true : false}
                      >
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="reg-form">
                <span>
                  Gender
                  {validate.dob && (
                    <span className="exclamation-sign-gender">
                      <AiFillExclamationCircle />
                    </span>
                  )}
                </span>
                <div className="reg-form-select">
                  <label className={validate.gender && "error-border"}>
                    Female
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      onChange={handleInputData}
                    />
                  </label>
                  <label className={validate.gender && "error-border"}>
                    Male
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      onChange={handleInputData}
                    />
                  </label>
                  <label className={validate.gender && "error-border"}>
                    Custom
                    <input
                      type="radio"
                      name="gender"
                      value="Custom"
                      onChange={handleInputData}
                    />
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
