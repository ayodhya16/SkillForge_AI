import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import Card from "../../components/Card";

export default function InstructorDashboard() {
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    completedStudents: 0,
  });

  useEffect(() => {
    axios.get("/api/instructor/courses")
      .then(res => setCourses(res.data));
  }, []);

  useEffect(() => {
    axios.get("/api/instructor/analytics")
      .then(res => setStats(res.data));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Instructor Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>Total Courses: {stats.totalCourses}</Card>
        <Card>Total Students: {stats.totalStudents}</Card>
        <Card>Completed Students: {stats.completedStudents}</Card>
      </div>

      {/* Courses */}
      <Card>
        <h2 className="font-semibold mb-3">My Courses</h2>

        {courses.length === 0 && (
          <div className="text-slate-400 text-sm">No courses yet</div>
        )}

        {courses.map(c => (
          <div key={c.id} className="border-b border-slate-700 py-2">
            <div className="font-medium">{c.title}</div>
            <div className="text-sm text-slate-400">{c.description}</div>
            <div className="text-xs mt-1">
              Status: {c.published ? "Published" : "Draft"}
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
