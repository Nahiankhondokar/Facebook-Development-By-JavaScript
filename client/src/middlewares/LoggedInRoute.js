import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const LoggedInRoute = ({ children }) => {
  // selector
  const { loginStatus } = useSelector((state) => state.auth);

  return loginStatus === true ? <Outlet /> : <Navigate to="/" />;
};

export default LoggedInRoute;
