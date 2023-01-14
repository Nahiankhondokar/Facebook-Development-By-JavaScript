import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthReject = ({ children }) => {
  // selector
  const { loginStatus } = useSelector((state) => state.auth);

  return loginStatus ? children : <Navigate to="/" />;
};

export default AuthReject;
