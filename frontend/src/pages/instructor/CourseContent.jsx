import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axiosInstance";
import Card from "../../components/Card";
import Button from "../../components/Button";

export default function CourseContent() {
  const { courseId } = useParams();
  const [content, setContent] = useState([]);
  const [form, setForm] = useState({
    title: "",
    type: "VIDEO",
    url: "",
    orderIndex: 1
  });

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await axios.get(`/api/instructor/courses/${courseId}/content`);
    setContent(res.data || []);
  };

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const addContent = async (e) => {
    e.preventDefault();
    await axios.post(`/api/instructor/courses/${courseId}/content`, form);
    setForm({ title: "", type: "VIDEO", url: "", orderIndex: 1 });
    load();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Course Content</h1>

      <Card>
        <h2 className="font-semibold mb-3">Add Lecture</h2>

        <form onSubmit={addContent} className="space-y-3">
          <input className="form-input" name="title" placeholder="Lecture title" value={form.title} onChange={onChange} required />

          <select name="type" className="form-input" value={form.type} onChange={onChange}>
            <option value="VIDEO">Video</option>
            <option value="LINK">Link</option>
            <option value="PDF">PDF</option>
          </select>

          <input className="form-input" name="url" placeholder="Video / Resource URL" value={form.url} onChange={onChange} required />

          <input type="number" className="form-input" name="orderIndex" placeholder="Order" value={form.orderIndex} onChange={onChange} />

          <Button type="submit">Add Content</Button>
        </form>
      </Card>

      <Card>
        <h2 className="font-semibold mb-2">Lectures</h2>

        {content.map((c) => (
          <div key={c.id} className="border-b border-slate-700 py-2">
            <div className="font-medium">{c.orderIndex}. {c.title}</div>
            <div className="text-xs text-slate-400">{c.type}</div>
            <a href={c.url} target="_blank" className="text-indigo-300 text-sm">
              Open Resource
            </a>
          </div>
        ))}
      </Card>
    </div>
  );
}
