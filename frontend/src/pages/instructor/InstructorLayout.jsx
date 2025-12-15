import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import InstructorDashboard from "./Dashboard";
import InstructorCourses from "./Courses";
import InstructorCertifications from "./Certifications";
import InstructorExams from "./Exams";

export default function InstructorLayout() {
  return (
    <Routes>
      <Route path="home" element={<InstructorDashboard />} />
      <Route path="courses" element={<InstructorCourses />} />
      <Route path="certifications" element={<InstructorCertifications />} />
      <Route path="exams" element={<InstructorExams />} />

      {/* default */}
      <Route path="*" element={<Navigate to="home" replace />} />
    </Routes>
  );
}
