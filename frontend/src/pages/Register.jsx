import React, { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../services/auth";
import Input from "../components/Input";
import Button from "../components/Button";
import Toast from "../components/Toast";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  PhoneIcon
} from "@heroicons/react/24/outline";

export default function Register() {
  // 🔒 Role is FIXED to STUDENT (Admins manage roles later)
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "STUDENT"
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState({ type: "", message: "" });

  // ------------------------
  // Helpers
  // ------------------------
  const emailValid = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());

  const showToast = (type, message, duration = 4000) => {
    setToast({ type, message });
    setTimeout(() => setToast({ type: "", message: "" }), duration + 100);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setFieldErrors((fe) => ({ ...fe, [name]: "" }));
  };

  // ------------------------
  // ✅ CLIENT-SIDE VALIDATION
  // ------------------------
  const validate = () => {
    const errors = {};

    if (!form.name.trim())
      errors.name = "Full name is required";

    if (!form.email.trim())
      errors.email = "Email is required";
    else if (!emailValid(form.email))
      errors.email = "Enter a valid email address";

    if (!form.password || form.password.length < 6)
      errors.password = "Password must be at least 6 characters";

    if (!form.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required";
    } else {
      const digits = form.phoneNumber.replace(/\D/g, "");
      if (digits.length < 10)
        errors.phoneNumber = "Enter a valid phone number";
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      showToast(
        "error",
        "Please fix the highlighted fields before submitting.",
        4500
      );
      return false;
    }
    return true;
  };

  // ------------------------
  // Submit handler
  // ------------------------
  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setBusy(true);
    try {
      await register(form);

      showToast(
        "success",
        "Registration successful. You can now sign in.",
        4000
      );
      // ❌ No auto redirect (user decides)
    } catch (error) {
      let msg = "Registration failed";

      if (error?.response?.data) {
        msg =
          typeof error.response.data === "string"
            ? error.response.data
            : error.response.data.message || msg;
      }

      showToast("error", msg, 5000);
    } finally {
      setBusy(false);
    }
  };

  // ------------------------
  // UI
  // ------------------------
  return (
    <>
      <div className="min-h-[72vh] flex items-center justify-center">
        <div className="w-full max-w-lg">
          <div className="card-surface p-8">
            <h2 className="text-2xl font-semibold mb-2">
              Create account
            </h2>
            <p className="text-sm text-slate-400 mb-6">
              Sign up to start learning with SkillForge
            </p>

            <form onSubmit={submit} className="grid gap-3">
              <Input
                name="name"
                label="Full name"
                placeholder="Your name"
                value={form.name}
                onChange={onChange}
                icon={<UserIcon className="w-5 h-5" />}
              />
              {fieldErrors.name && (
                <p style={{ color: "#781717ff", fontSize: 13, marginTop: 4 }}>
                  {fieldErrors.name}
                </p>
              )}

              <Input
                name="email"
                label="Email"
                placeholder="yourmail@gmail.com"
                value={form.email}
                onChange={onChange}
                icon={<EnvelopeIcon className="w-5 h-5" />}
              />
              {fieldErrors.email && (
                <p style={{ color: "#781717ff", fontSize: 13, marginTop: 4 }}>
                  {fieldErrors.email}
                </p>
              )}

              <Input
                name="password"
                type="password"
                label="Password"
                placeholder="Choose a password"
                value={form.password}
                onChange={onChange}
                icon={<LockClosedIcon className="w-5 h-5" />}
              />
              {fieldErrors.password && (
                <p style={{ color: "#781717ff", fontSize: 13, marginTop: 4 }}>
                  {fieldErrors.password}
                </p>
              )}

              <Input
                name="phoneNumber"
                label="Phone number"
                placeholder="Ex: +91 9876543210"
                value={form.phoneNumber}
                onChange={onChange}
                icon={<PhoneIcon className="w-5 h-5" />}
              />
              {fieldErrors.phoneNumber && (
                <p style={{ color: "#781717ff", fontSize: 13, marginTop: 4 }}>
                  {fieldErrors.phoneNumber}
                </p>
              )}

              <div className="flex justify-end mt-2">
                <Button type="submit" disabled={busy}>
                  {busy ? "Creating…" : "Create account"}
                </Button>
              </div>
            </form>
          </div>

          <div className="mt-4 text-center text-slate-500 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-300">
              Sign in
            </Link>
          </div>
        </div>
      </div>

      {/* 🔔 TOP-CENTER TOAST */}
      {toast.message && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast({ type: "", message: "" })}
        />
      )}
    </>
  );
}
