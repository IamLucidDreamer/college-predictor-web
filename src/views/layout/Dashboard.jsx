import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AppLogo from "../../components/images/AppLogo";
import Footer from "../../components/shared/Footer";
import Header from "../../components/shared/Header";
import Card from "./Card";

export default function Dashboard() {
  return (
    <>
      <Header />
      <div className="mx-auto container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
