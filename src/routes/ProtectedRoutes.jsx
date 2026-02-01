import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { user, loading } = useContext(AuthContext);

  const navigate = useNavigate();

  if (loading) {
    return <h4 className="text-center mt-5">Checking Authentication....</h4>;
  }

  if (!user) {
    navigate("/auth");
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRoutes;
