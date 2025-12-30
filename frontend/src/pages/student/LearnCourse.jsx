// src/pages/student/LearnCourse.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axiosInstance";
import Card from "../../components/Card";

export default function LearnCourse() {
  const { courseId } = useParams();
  const [contents, setContents] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/student/courses/${courseId}/content`)
      .then(res => setContents(res.data));
  }, [courseId]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Course Content</h1>

      {contents.length === 0 && (
        <p className="text-slate-400">No content added yet</p>
      )}

      {contents.map(c => (
        <Card key={c.id}>
          <h2 className="font-semibold">{c.title}</h2>
          <p className="text-xs text-slate-400 mb-2">{c.type}</p>

          {c.type === "IMAGE" && (
            <img src={c.url} className="max-w-full rounded" />
         )}

          {c.type === "TEXT" && (
            <p className="text-slate-300">{c.textContent}</p>
          )}
          {c.type === "QUIZ" && (
            <button className="bg-indigo-600 px-3 py-1 rounded">
              Start Quiz
            </button>
          )}

          {c.type === "EXAM" && (
            <button className="bg-red-600 px-3 py-1 rounded">
              Start Exam
            </button>
          )}
          {c.type === "NOTE" && <p>{c.content}</p>}
        </Card>
      ))}
    </div>
  );
}
