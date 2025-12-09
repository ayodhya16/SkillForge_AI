import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";

export default function Login() {
  const [cred, setCred] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => setCred({ ...cred, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const data = await login(cred);
      if (data.role === "ADMIN") navigate("/admin");
      else if (data.role === "INSTRUCTOR") navigate("/instructor");
      else navigate("/student");
    } catch (error) {
      setErr(error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4 text-center">Sign in to SkillForge</h2>
          {err && <div className="bg-red-600 text-white p-2 mb-4 rounded">{err}</div>}
          <form onSubmit={submit} className="space-y-4">
            <input name="email" placeholder="Email" value={cred.email} onChange={onChange}
                   className="w-full px-4 py-2 rounded bg-slate-900 border border-slate-700" />
            <input name="password" type="password" placeholder="Password" value={cred.password} onChange={onChange}
                   className="w-full px-4 py-2 rounded bg-slate-900 border border-slate-700" />
            <button className="w-full bg-indigo-600 py-2 rounded font-semibold hover:bg-indigo-500">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
