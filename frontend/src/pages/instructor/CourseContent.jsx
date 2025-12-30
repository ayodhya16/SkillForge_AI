import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axiosInstance";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Toast from "../../components/Toast";

export default function CourseContent() {
  const { id } = useParams();
  const courseId = id;

  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    title: "",
    type: "VIDEO",
    url: "",
    textContent: ""
  });
  const [toast, setToast] = useState({ type: "", message: "" });

  const load = async () => {
    const res = await axios.get(
      `/api/instructor/courses/${courseId}/content`
    );
    setList(res.data || []);
  };

  useEffect(() => {
    load();
  }, [courseId]);

  const add = async () => {
    try {
      await axios.post(
        `/api/instructor/courses/${courseId}/content`,
        form
      );
      setForm({ title: "", type: "VIDEO", url: "", textContent: "" });
      load();
      setToast({ type: "success", message: "Content added" });
    } catch (e) {
      setToast({ type: "error", message: e.message });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Add Course Content</h1>

      <Card className="space-y-3">
        <input
          className="form-input"
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />

        <select
          className="form-input"
          value={form.type}
          onChange={e => setForm({ ...form, type: e.target.value })}
        >
          <option value="VIDEO">Video</option>
          <option value="PDF">PDF</option>
          <option value="IMAGE">Image</option>
          <option value="TEXT">Text</option>
          <option value="QUIZ">Quiz</option>
          <option value="EXAM">Exam</option>
        </select>

        {["VIDEO", "PDF", "IMAGE"].includes(form.type) && (
          <input
            className="form-input"
            placeholder="Resource URL"
            value={form.url}
            onChange={e => setForm({ ...form, url: e.target.value })}
          />
        )}

        {form.type === "TEXT" && (
          <textarea
            className="form-input"
            placeholder="Text content"
            value={form.textContent}
            onChange={e =>
              setForm({ ...form, textContent: e.target.value })
            }
          />
        )}

        <Button onClick={add}>Add Content</Button>
      </Card>

      <Card>
        {list.length === 0 && (
          <p className="text-slate-400">No content added yet</p>
        )}

        {list.map(c => (
          <div key={c.id} className="border-b py-2">
            <b>{c.title}</b> — {c.type}
          </div>
        ))}
      </Card>

      {toast.message && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast({})}
        />
      )}
    </div>
  );
}
