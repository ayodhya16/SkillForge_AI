import React from "react";
import { Navigate } from "react-router-dom";

/**
 * children: component to render
 * allowedRoles: array e.g. ['ADMIN','INSTRUCTOR']
 */
export default function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("sf_token");
  const role = localStorage.getItem("sf_role");

  if (!token) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(role)) {
    // redirect to their dashboard or show Forbidden
    if (role === "ADMIN") return <Navigate to="/admin" replace />;
    if (role === "INSTRUCTOR") return <Navigate to="/instructor" replace />;
    if (role === "STUDENT") return <Navigate to="/student" replace />;
    return <div className="p-6">Forbidden</div>;
  }
  return children;
}
