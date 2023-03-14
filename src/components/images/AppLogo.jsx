import React from "react";
import appLogo from "../../assets/images/careerkick_logo.png";

const AppLogo = ({ width = "200px", height = "200px", classname = "" }) => {
  return (
    <img src={appLogo} width={width} height={height} className={classname} />
  );
};

export default AppLogo;
