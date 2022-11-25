import React, { useState } from "react";
import { useDispatch } from "react-redux";
import crossBtn from "../../assets/icons/cross.png";
import { UserRegister } from "../../redux/auth/action";
import CreateToaster from "../../utility/Toaster";

// fb day array
const fbDay = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
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

const RegisterModal = ({ setRegModal }) => {
  // dispatch
  const dispatach = useDispatch();

  // input data state
  const [input, setInput] = useState({
    fname: "",
    sname: "",
    password: "",
    mobileOrEmail: "",
    fbDay: "",
    fbMonth: "",
    fbYear: "",
    gender: "",
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
    } else {
      // user register
      dispatach(
        UserRegister({
          first_name: input.fname,
          sur_name: input.sname,
          email: input.mobileOrEmail,
          password: input.password,
          gender: input.gender,
          birth_date: input.fbDay,
          birth_month: input.fbMonth,
          birth_year: input.fbYear,
        })
      );

      // make empty feilds
      e.target.reset();
      setInput({
        fname: "",
        sname: "",
        password: "",
        mobileOrEmail: "",
      });

      // close register modal
      setRegModal(false);
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
                  <select name="fbDay" id="" onChange={handleInputData}>
                    {fbDay.map((item, index) => (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <select name="fbMonth" id="" onChange={handleInputData}>
                    {fbMonth.map((item, index) => (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <select name="fbYear" id="" onChange={handleInputData}>
                    {fbYear.map((item, index) => (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="reg-form">
                <span>Gender</span>
                <div className="reg-form-select">
                  <label>
                    Female
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      onChange={handleInputData}
                    />
                  </label>
                  <label>
                    Male
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      onChange={handleInputData}
                    />
                  </label>
                  <label>
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
