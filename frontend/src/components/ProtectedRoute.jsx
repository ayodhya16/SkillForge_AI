import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, getRole } from "../services/auth";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  const role = getRole();
  if (allowedRoles.length && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }
  return children;
}
