import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import Card from "../../components/Card";
import Button from "../../components/Button";

export default function InstructorCourses() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    level: "Beginner"
  });

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const res = await axios.get("/api/instructor/courses");
    setCourses(res.data || []);
  };

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const createCourse = async (e) => {
    e.preventDefault();
    await axios.post("/api/instructor/courses", form);
    setForm({ title: "", description: "", category: "", level: "Beginner" });
    loadCourses();
  };

  const publishCourse = async (id) => {
    await axios.put(`/api/instructor/courses/${id}/publish`);
    loadCourses();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">My Courses</h1>

      {/* Create Course */}
      <Card>
        <h2 className="font-semibold mb-3">Create New Course</h2>

        <form onSubmit={createCourse} className="space-y-3">
          <input className="form-input" name="title" placeholder="Course title" value={form.title} onChange={onChange} required />
          <textarea className="form-input" name="description" placeholder="Course description" value={form.description} onChange={onChange} required />
          <input className="form-input" name="category" placeholder="Category (Java, AI, Web)" value={form.category} onChange={onChange} required />

          <select name="level" className="form-input" value={form.level} onChange={onChange}>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>

          <Button type="submit">Create Course</Button>
        </form>
      </Card>

      {/* List Courses */}
      <Card>
        <h2 className="font-semibold mb-2">Your Courses</h2>

        {courses.length === 0 && (
          <div className="text-slate-400">No courses created yet</div>
        )}

        {courses.map((c) => (
          <div key={c.id} className="border-b border-slate-700 py-2">
            <div className="font-medium">{c.title}</div>
            <div className="text-sm text-slate-400">{c.description}</div>
            <div className="text-xs mt-1">
              Status: {c.published ? "Published" : "Draft"}
            </div>

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
      </Card>
    </div>
  );
}
