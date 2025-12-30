// src/pages/student/Courses.jsx
import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import Card from "../../components/Card";
import { useNavigate } from "react-router-dom";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [enrolledIds, setEnrolledIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    load();
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map(course => {
          const enrolled = enrolledIds.includes(course.id);

          return (
            <Card key={course.id}>
              <h2 className="text-lg font-bold">{course.title}</h2>
              <p className="text-sm text-slate-400 mt-1">
                {course.description}
              </p>

              <div className="text-xs mt-2 text-slate-400">
                Category: {course.category} | Level: {course.level}
              </div>

              <div className="flex gap-3 mt-4">
                {enrolled ? (
                  <>
                    <button
                      className="bg-indigo-600 px-3 py-1 rounded text-xs"
                      onClick={() =>
                        navigate(`/student/courses/${course.id}`)
                      }
                    >
                      Start Learning
                    </button>

                    <button
                      className="bg-red-600 px-3 py-1 rounded text-xs"
                      onClick={() => unenroll(course.id)}
                    >
                      Unenroll
                    </button>
                  </>
                ) : (
                  <button
                    className="bg-green-600 px-3 py-1 rounded text-xs"
                    onClick={() => enroll(course.id)}
                  >
                    Enroll
                  </button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
