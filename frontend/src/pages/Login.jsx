import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/auth";
import Input from "../components/Input";
import Button from "../components/Button";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";

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
      const role = data?.role;
      if (role === "ADMIN") navigate("/admin/home");
      else if (role === "INSTRUCTOR") navigate("/instructor/home");
      else navigate("/student/home");
    } catch (error) {
      setErr(error?.response?.data || error?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-[72vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="card-surface p-8">
          <h2 className="text-2xl font-semibold mb-2">Welcome back</h2>
          <p className="text-sm text-slate-400 mb-6">Sign in to your SkillForge account</p>

          {err && <div className="mb-4 text-red-400">{err}</div>}

          <form onSubmit={submit} className="space-y-4">
            <Input
              name="email"
              label="Email"
              placeholder="you@company.com"
              value={cred.email}
              onChange={onChange}
              icon={<EnvelopeIcon className="w-5 h-5" />}
            />

            <Input
              name="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              value={cred.password}
              onChange={onChange}
              icon={<LockClosedIcon className="w-5 h-5" />}
            />

            <div className="flex justify-between items-center">
              <div className="text-sm text-slate-400">
                Don’t have an account? <Link to="/register" className="text-indigo-300">Sign up</Link>
              </div>

              <Button type="submit" leftIcon={<LockClosedIcon className="w-5 h-5 text-white" />}>
                Sign in
              </Button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
