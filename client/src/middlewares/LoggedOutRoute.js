import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const LoggedOutRoute = () => {
  // selector
  const { loginStatus } = useSelector((state) => state.auth);

  return loginStatus ? <Navigate to="/" /> : <Outlet />;
};

export default LoggedOutRoute;
