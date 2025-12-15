import { Routes, Route } from "react-router-dom";
import StudentCourses from "./Courses";

export default function StudentHome() {
  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div>
        <h1 className="text-3xl font-bold text-indigo-300 mb-2">
          Student Dashboard
        </h1>
        <p className="text-slate-300">
          Welcome, student! Explore your courses and exams.
        </p>
      </div>

      {/* Nested Routes */}
      <Routes>
        <Route path="courses" element={<StudentCourses />} />
      </Routes>
    </div>
  );
}
