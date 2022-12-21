import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthRedirect = ({ children }) => {
  // selector
  const { loginStatus } = useSelector((state) => state.auth);

  return loginStatus === true ? children : <Navigate to="/" />;
};

export default AuthRedirect;
