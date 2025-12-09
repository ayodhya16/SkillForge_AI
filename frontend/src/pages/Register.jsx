import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/auth";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "STUDENT", phoneNumber: "" });
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await register(form);
      alert("Registered! Please login.");
      navigate("/login");
    } catch (error) {
      setErr(error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-lg">
        <div className="bg-slate-800 p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4 text-center">Create an account</h2>
          {err && <div className="bg-red-600 text-white p-2 mb-4 rounded">{err}</div>}
          <form onSubmit={submit} className="grid grid-cols-1 gap-3">
            <input name="name" placeholder="Full name" value={form.name} onChange={onChange}
                   className="w-full px-4 py-2 rounded bg-slate-900 border border-slate-700" />
            <input name="email" placeholder="Email" value={form.email} onChange={onChange}
                   className="w-full px-4 py-2 rounded bg-slate-900 border border-slate-700" />
            <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange}
                   className="w-full px-4 py-2 rounded bg-slate-900 border border-slate-700" />
            <select name="role" value={form.role} onChange={onChange}
                    className="w-full px-4 py-2 rounded bg-slate-900 border border-slate-700">
              <option value="STUDENT">Student</option>
              <option value="INSTRUCTOR">Instructor</option>
              <option value="ADMIN">Admin</option>
            </select>
            <input name="phoneNumber" placeholder="Phone" value={form.phoneNumber} onChange={onChange}
                   className="w-full px-4 py-2 rounded bg-slate-900 border border-slate-700" />
            <button className="w-full bg-green-600 py-2 rounded font-semibold hover:bg-green-500">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}
