import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axiosInstance";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Toast from "../../components/Toast";

export default function CreateExam() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    totalMarks: "",
    passMarks: ""
  });

  const [toast, setToast] = useState({});

  const submit = async (e) => {
    e.preventDefault();

    if (Number(form.passMarks) > Number(form.totalMarks)) {
      setToast({
        type: "error",
        message: "Pass marks cannot exceed total marks"
      });
      return;
    }

    try {
      await axios.post(
        `/api/instructor/courses/${courseId}/exam`,
        form
      );

      setToast({
        type: "success",
        message: "Exam created successfully"
      });

      setTimeout(() => navigate("/instructor/exams"), 1200);

    } catch (e) {
      setToast({
        type: "error",
        message: e.response?.data || "Failed to create exam"
      });
    }
  };

  return (
    <Card className="max-w-md space-y-4">
      <h2 className="text-xl font-semibold">Create Final Exam</h2>

      <form onSubmit={submit} className="space-y-3">
        <input
          className="form-input"
          placeholder="Total Marks"
          type="number"
          required
          value={form.totalMarks}
          onChange={e =>
            setForm({ ...form, totalMarks: e.target.value })
          }
        />

        <input
          className="form-input"
          placeholder="Pass Marks"
          type="number"
          required
          value={form.passMarks}
          onChange={e =>
            setForm({ ...form, passMarks: e.target.value })
          }
        />

        <Button type="submit">Save Exam</Button>
      </form>

      {toast.message && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast({})}
        />
      )}
    </Card>
  );
}
