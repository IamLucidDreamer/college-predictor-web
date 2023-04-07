import React from "react";
import bgAuth from "../../assets/images/auth_bg_mobile.png";

const AuthLayout = ({ imageLink, title, description, form }) => {
  return (
    <div className="max-h-screen w-full bg-white overflow-hidden flex">
      <div
        className="w-7/12 rounded-r-3xl bg-cover bg-no-repeat bg-center hidden lg:block"
        style={{ backgroundImage: `url(${imageLink})` }}
      >
        <div className="min-h-screen flex items-center justify-center bg-primary bg-opacity-80 rounded-r-3xl shadow-2xl shadow-primary">
          <div className="w-2/3 max-w-xl mt-64">
            <h1 className="text-white text-5xl my-8">{title}</h1>
            <p className="text-white text-xl">{description}</p>
          </div>
        </div>
      </div>
      <div
        className="w-full lg:w-5/12  bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: `url(${window.innerWidth < 1024 ? bgAuth : ""})`,
        }}
      >
        <div className="min-h-screen max-h-screen flex items-end lg:items-center justify-center pb-8 overflow-y-scroll">
          {form}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
