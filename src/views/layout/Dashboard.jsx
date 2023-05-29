import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AppLogo from "../../components/images/AppLogo";
import Footer from "../../components/shared/Footer";
import Header from "../../components/shared/Header";
import Card from "./Card";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const user = useSelector((state) => state?.user);
  console.log(user, "user");
  return (
    <div className="w-full bg-gray-100">
      <Header />
      <div className="mx-auto container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
