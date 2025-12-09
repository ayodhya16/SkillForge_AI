import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/auth";

export default function Nav() {
  const navigate = useNavigate();
  const role = localStorage.getItem("sf_role");

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="bg-slate-800 border-b border-slate-700">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-xl font-bold text-indigo-400">SkillForge</Link>
        </div>

        <div className="flex items-center space-x-4">
          {!role ? (
            <>
              <Link to="/login" className="text-slate-200 hover:text-white">Login</Link>
              <Link to="/register" className="bg-indigo-600 text-white px-3 py-1 rounded">Register</Link>
            </>
          ) : (
            <>
              <span className="px-3 py-1 bg-slate-700 rounded text-sm">Role: {role}</span>
              <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
