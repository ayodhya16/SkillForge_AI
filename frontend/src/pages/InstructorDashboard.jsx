import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import Card from "../components/Card";

export default function InstructorDashboard() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [err, setErr] = useState("");

  useEffect(() => { load(); }, []);

  async function load() {
    try {
      const res = await axios.get("/api/courses");
      setCourses(res.data || []);
    } catch (e) {
      setErr(e.response?.data || e.message);
    }
  }

  async function create(e) {
    e.preventDefault();
    setErr("");
    try {
      await axios.post("/api/courses", form);
      setForm({ title: "", description: "" });
      load();
    } catch (e) {
      setErr(e.response?.data || e.message);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Instructor Dashboard</h1>

      <Card>
        <form onSubmit={create} className="space-y-3">
          <input name="title" placeholder="Course title" value={form.title}
                 onChange={e => setForm({ ...form, title: e.target.value })}
                 className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700" />
          <textarea name="description" placeholder="Short description" value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700" />
          <div className="flex items-center gap-3">
            <button className="bg-indigo-600 px-4 py-2 rounded">Create course</button>
            {err && <div className="text-red-500">{err}</div>}
          </div>
        </form>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map(c => (
          <Card key={c.id}>
            <h3 className="text-lg font-semibold">{c.title}</h3>
            <p className="text-sm mt-2">{c.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
