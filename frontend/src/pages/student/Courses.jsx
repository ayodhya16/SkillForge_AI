// src/pages/student/Courses.jsx
import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import Card from "../../components/Card";
import { Link } from "react-router-dom";

export default function StudentCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  axios.get("/api/student/courses")
    .then(res => {
      console.log("STUDENT COURSES:", res.data);
      setCourses(res.data);
    })
    .catch(err => console.error(err));
}, []);


  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Available Courses</h1>

       <Card>
        {courses.length === 0 ? (
          <div>No courses available right now</div>
        ) : (
          courses.map(c => (
            <div key={c.id} className="border-b border-slate-700 py-3">
              <div className="font-medium">{c.title}</div>
              <div className="text-sm text-slate-400">{c.description}</div>
            </div>
          ))
        )}
      </Card>
    </div>
  );
}
