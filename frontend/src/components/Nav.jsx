import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, getRole, logout as authLogout } from "../services/auth";

export default function Nav() {
  const navigate = useNavigate();
  const [logged, setLogged] = useState(isAuthenticated());
  const [role, setRole] = useState(getRole());

  useEffect(() => {
    const syncAuth = () => {
      setLogged(isAuthenticated());
      setRole(getRole());
    };
    syncAuth();
    window.addEventListener("storage", syncAuth);
    window.addEventListener("sf_auth_changed", syncAuth);
    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("sf_auth_changed", syncAuth);
    };
  }, []);

  function handleLogout() {
    authLogout();
    window.dispatchEvent(new Event("sf_auth_changed"));
    navigate("/");
  }

  /* MENUS */
  const guestMenu = [
    { to: "/", label: "Home" },
    { to: "/courses", label: "Courses" },
    { to: "/certifications", label: "Certifications" },
    { to: "/placements", label: "Placements" },
    { to: "/contact", label: "Contact Us" },
  ];

  const studentMenu = [
    { to: "/student/home", label: "Home" },
    { to: "/student/courses", label: "Courses" },
    { to: "/certifications", label: "Certifications" },
    { to: "/placements", label: "Placements" },
    { to: "/contact", label: "Contact Us" },
  ];

  const instructorMenu = [
    { to: "/instructor/home", label: "Home" },
    { to: "/instructor/courses", label: "Courses" },
    { to: "/instructor/certifications", label: "Certifications" },
    { to: "/instructor/exams", label: "Exams"},
    { to: "/contact", label: "Contact Us" },
  ];

  const adminMenu = [
    { to: "/admin/home", label: "Dashboard" },
    { to: "/admin/manageusers", label: "Manage Users" },
    { to: "/admin/viewstudents", label: "Students" },
    { to: "/admin/viewexams", label: "Exams" },
    { to: "/contact", label: "Contact Us" },
  ];

  let menu = guestMenu;
  if (logged) {
    if (role === "STUDENT") menu = studentMenu;
    else if (role === "INSTRUCTOR") menu = instructorMenu;
    else if (role === "ADMIN") menu = adminMenu;
  }

  return (
    <header style={{ padding: 12, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between" }}>
        <Link to="/" style={{ fontWeight: 800, color: "#7c3aed", fontSize: 20, textDecoration: "none" }}>
          SkillForge
        </Link>

        <nav style={{ display: "flex", gap: 16, alignItems: "center" }}>
          {menu.map(m => (
            <Link key={m.to} to={m.to} style={{ color: "#c4b5fd", textDecoration: "none" }}>
              {m.label}
            </Link>
          ))}

          {!logged ? (
            <>
              <Link to="/login" style={{ color: "#c4b5fd" }}>Sign in</Link>
              <Link to="/register" style={{ background: "#6d28d9", color: "#fff", padding: "6px 12px", borderRadius: 999 }}>
                Create account
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              style={{ background: "#6d28d9", color: "#fff", padding: "6px 12px", borderRadius: 999, border: "none" }}
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
