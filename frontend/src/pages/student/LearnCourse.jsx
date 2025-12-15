import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axiosInstance";
import Card from "../../components/Card";

export default function LearnCourse() {
  const { courseId } = useParams();
  const [content, setContent] = useState([]);

  useEffect(() => {
    axios.get(`/api/student/courses/${courseId}/content`)
      .then(res => setContent(res.data));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Course Content</h1>

      {content.map(c => (
        <Card key={c.id}>
          <div className="font-medium">{c.orderIndex}. {c.title}</div>

          {c.type === "VIDEO" && (
            <a href={c.url} target="_blank" className="text-indigo-300">
              ▶ Watch Video
            </a>
          )}

          {c.type !== "VIDEO" && (
            <a href={c.url} target="_blank" className="text-indigo-300">
              Open Resource
            </a>
          )}
        </Card>
      ))}
    </div>
  );
}
