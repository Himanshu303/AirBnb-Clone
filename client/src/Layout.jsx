import React from "react";
import HeaderPage from "./Pages/HeaderPage";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="py-5 px-8 flex flex-col min-h-screen">
      <HeaderPage />
      <Outlet />
    </div>
  );
};

export default Layout;
