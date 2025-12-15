import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated, getRole } from "../services/auth";

export default function RequireAuth({ allowedRoles }) {
  const location = useLocation();
  const loggedIn = isAuthenticated();
  const role = getRole();

  // not logged in → go to login
  if (!loggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // logged in but role not allowed → go home
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  // ✅ VERY IMPORTANT
  return <Outlet />;
}
