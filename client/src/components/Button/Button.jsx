import React from "react";
import "./../../assets/css/style.css";

const Button = ({ title }) => {
  return (
    <>
      <button className="button-css" style={{ margin: "5px 0px" }}>
        {title}
      </button>
    </>
  );
};

export default Button;
