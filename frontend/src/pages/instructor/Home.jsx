import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import CourseCard from "../../components/CourseCard";
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
  console.log("PUBLISH CLICKED:", id);

  const res = await axios.put(`/api/instructor/courses/${id}/publish`);

  console.log("PUBLISH RESPONSE:", res.data);

  loadCourses();
};

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Instructor Dashboard</h1>

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {courses.map(c => (
          <div key={c.id} className="relative">
            <CourseCard
              course={c}
              showManage
            />

            {!c.published && (
              <button
                onClick={() => publishCourse(c.id)}
                className="absolute top-3 right-3 bg-indigo-600 px-3 py-1 rounded text-xs"
              >
                Publish
              </button>
            )}
          </div>
        ))}
      </div>
      </Card>
    </div>
  );
}
