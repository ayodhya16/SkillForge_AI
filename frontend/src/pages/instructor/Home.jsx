import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import Card from "../../components/Card";

export default function InstructorHome() {
  const [courses, setCourses] = useState([]);

  const loadCourses = () => {
    axios.get("/api/instructor/courses")
      .then(res => setCourses(res.data));
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const publishCourse = async (id) => {
    await axios.put(`/api/instructor/courses/${id}/publish`);
    loadCourses(); // refresh list
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Instructor Dashboard</h1>

      <Card>
        <h2 className="font-semibold mb-4">My Courses</h2>

        {courses.length === 0 && (
          <div className="text-slate-400">No courses created yet</div>
        )}

        {courses.map(c => (
          <div key={c.id} className="border-b border-slate-700 py-3">
            <div className="font-medium">{c.title}</div>
            <div className="text-sm text-slate-400">{c.description}</div>

            <div className="flex items-center gap-4 mt-2">
              <span className="text-xs">
                Status:{" "}
                <span className={c.published ? "text-green-400" : "text-yellow-400"}>
                  {c.published ? "Published" : "Draft"}
                </span>
              </span>

              {!c.published && (
                <button
                  onClick={() => publishCourse(c.id)}
                  className="bg-indigo-600 px-3 py-1 rounded text-xs"
                >
                  Publish
                </button>
              )}
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
