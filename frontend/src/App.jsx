import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/Nav";

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Certifications from "./pages/Certifications";
import Placements from "./pages/Placements";
import Contact from "./pages/Contactus";
import Login from "./pages/Login";
import Register from "./pages/Register";

import StudentHome from "./pages/student/Home";
import InstructorLayout from "./pages/instructor/InstructorLayout";
import AdminHome from "./pages/admin/Home";

import StudentCourses from "./pages/student/Courses";
import MyCourses from "./pages/student/MyCourses";
import LearnCourse from "./pages/student/LearnCourse";


import CreateCourse from "./pages/instructor/CreateCourse";
import CourseContent from "./pages/instructor/CourseContent";


import AdminManageUsers from "./pages/admin/ManageUsers";
import ViewStudents from "./pages/admin/ViewStudents";
import ViewExams from "./pages/admin/ViewExams";

import RequireAuth from "./components/RequireAuth";

export default function App() {
  return (
    <>
      <Nav />

      <main style={{ padding: 20, maxWidth: 1100, margin: "0 auto" }}>
        <Routes>

          {/*  Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/placements" element={<Placements />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/*  Student */}
          <Route element={<RequireAuth allowedRoles={["STUDENT"]} />}>
            <Route path="/student/home" element={<StudentHome />} />
            <Route path="/student/courses" element={<StudentCourses />} />
            <Route path="/student/my-courses" element={<MyCourses />} />
            <Route path="/student/courses/:courseId" element={<LearnCourse />} />
          </Route>
          

          {/*  Instructor */}
          <Route element={<RequireAuth allowedRoles={["INSTRUCTOR"]} />}>
            <Route path="/instructor/*" element={<InstructorLayout />} />
            <Route path="/instructor/courses/:courseId/content" element={<CourseContent />} />

          </Route>

          {/* 🛠 Admin */}
          <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
            <Route path="/admin/home" element={<AdminHome />} />
            <Route path="/admin/manageusers" element={<AdminManageUsers />} />
            <Route path="/admin/viewstudents" element={<ViewStudents />} />
            <Route path="/admin/viewexams" element={<ViewExams />} />
          </Route>

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </main>
    </>
  );
}
