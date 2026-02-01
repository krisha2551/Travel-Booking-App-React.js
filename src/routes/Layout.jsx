import React, { Suspense } from "react";
import Navbar from "../components/ui/Navbar";
import { Outlet } from "react-router-dom";
import LoadingPage from "../components/ui/Loading";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Suspense fallback={<LoadingPage />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default Layout;
