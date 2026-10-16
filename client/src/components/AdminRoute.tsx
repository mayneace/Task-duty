import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import RollerLoader from "./RollerLoader";

const AdminRoute: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <RollerLoader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
