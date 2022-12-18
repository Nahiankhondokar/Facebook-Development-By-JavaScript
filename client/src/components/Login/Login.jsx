import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { UserLogin } from "../../redux/auth/action";

const Login = ({ setRegModal }) => {
  // dispatch or navigate
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // input feild state
  const [input, setInput] = useState({
    auth: "",
    password: "",
  });

  // input data manage
  const handleInputData = (e) => {
    setInput((prevState) => ({
      ...input,
      [e.target.name]: e.target.value,
    }));
  };

  // handle form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(UserLogin(input.auth, input.password, navigate));
  };

  return (
    <>
      <div className="auth-box">
        <form onSubmit={handleFormSubmit}>
          <div className="auth-form">
            <input
              type="text"
              placeholder="Email address or phone number"
              name="auth"
              onChange={handleInputData}
            />
          </div>
          <div className="auth-form">
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleInputData}
            />
          </div>
          <div className="auth-form">
            <button type="submit">Log In</button>
          </div>
        </form>

        <Link to="/find-account">Forgotten password?</Link>

        <div className="divider"></div>

        <button onClick={() => setRegModal(true)}>Create New Account</button>
      </div>
    </>
  );
};

export default Login;
