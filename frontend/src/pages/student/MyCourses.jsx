import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import { Link } from "react-router-dom";
import Card from "../../components/Card";

export default function MyCourses() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    axios.get("/api/student/my-courses")
      .then(res => setEnrollments(res.data));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">My Courses</h1>

      {enrollments.map(e => (
        <Card key={e.id}>
          <div className="font-semibold">{e.course.title}</div>
          <Link
            to={`/student/courses/${e.course.id}`}
            className="text-indigo-300 text-sm"
          >
            Continue Learning →
          </Link>
        </Card>
      ))}
    </div>
  );
}
