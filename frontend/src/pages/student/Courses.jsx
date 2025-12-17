import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import CourseCard from "../../components/CourseCard";

export default function StudentCourses() {
  const [courses, setCourses] = useState([]);
  const [enrolledIds, setEnrolledIds] = useState([]);

  useEffect(() => {
    load();
  }, []);
  useEffect(() => {
  axios.get("/api/student/courses")
    .then(res => {
      console.log("STUDENT COURSES RESPONSE:", res.data);
      setCourses(res.data);
    })
    .catch(err => console.error("ERROR:", err));
}, []);

  async function load() {
    const all = await axios.get("/api/student/courses");
    const my = await axios.get("/api/student/my-courses");

    setCourses(all.data);
    setEnrolledIds(my.data.map(e => e.course.id));
  }

  async function enroll(id) {
    await axios.post(`/api/student/courses/${id}/enroll`);
    load();
  }

  async function unenroll(id) {
    await axios.delete(`/api/student/courses/${id}/unenroll`);
    load();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Available Courses</h1>

      {courses.length === 0 ? (
        <p className="text-slate-400">No courses available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {courses.map(c => (
            <CourseCard
              key={c.id}
              course={c}
              enrolled={enrolledIds.includes(c.id)}
              onEnroll={enroll}
              onUnenroll={unenroll}
            />
          ))}
        </div>
      )}
    </div>
  );
}
