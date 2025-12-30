import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

export default function Exams() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/instructor/courses")
      .then(res => setCourses(res.data || []));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Course Exams</h1>

      {courses.length === 0 && (
        <p className="text-slate-400">No courses created yet</p>
      )}

      {courses.map(course => (
        <Card key={course.id} className="flex justify-between items-center">
          <div>
            <h2 className="font-medium">{course.title}</h2>
            <p className="text-xs text-slate-400">
              Level: {course.level}
            </p>
          </div>

          <Button
            onClick={() =>
              navigate(`/instructor/exams/create/${course.id}`)
            }
          >
            Manage Exam
          </Button>
        </Card>
      ))}
    </div>
  );
}
