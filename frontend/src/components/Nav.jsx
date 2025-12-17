import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, getRole, logout } from "../services/auth";

export default function Nav() {
  const navigate = useNavigate();
  const [logged, setLogged] = useState(isAuthenticated());
  const [role, setRole] = useState(getRole());

  useEffect(() => {
    const sync = () => {
      setLogged(isAuthenticated());
      setRole(getRole());
    };
    window.addEventListener("storage", sync);
    window.addEventListener("sf_auth_changed", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("sf_auth_changed", sync);
    };
  }, []);

  function handleLogout() {
    logout();
    window.dispatchEvent(new Event("sf_auth_changed"));
    navigate("/");
  }

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
    { to: "/student/exams", label: "Exams"},
    { to: "/placements", label: "Placements" },
    { to: "/contact", label: "Contact Us" },
  ];

  const instructorMenu = [
  { to: "/instructor/home", label: "Home" },
  { to: "/instructor/dashboard", label: "Dashboard" },
  { to: "/instructor/courses", label: "Courses" },
  { to: "/instructor/certifications", label: "Certifications" },
  { to: "/instructor/exams", label: "Exams" },
  { to: "/contact", label: "Contact Us" }
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
    <header style={{ padding: 12, borderBottom: "1px solid #222" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between" }}>
        <Link to="/" style={{ fontWeight: 800, fontSize: 20, color: "#7c3aed" }}>
          SkillForge
        </Link>

        <nav style={{ display: "flex", gap: 16 }}>
          {menu.map(m => (
            <Link key={m.to} to={m.to} style={{ color: "#c4b5fd" }}>
              {m.label}
            </Link>
          ))}

          {!logged ? (
            <>
              <Link to="/login">Sign in</Link>
              <Link to="/register">Create account</Link>
            </>
          ) : (
            <button onClick={handleLogout}>Logout</button>
          )}
        </nav>
      </div>
    </header>
  );
}
