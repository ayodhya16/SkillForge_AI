// src/components/Input.jsx
import React from "react";

export default function Input({ label, name, type = "text", placeholder = "", value, onChange, icon }) {
  return (
    <label style={{ display: "block" }}>
      {label && <div style={{ fontSize: 14, color: "#cbd5e1", marginBottom: 6 }}>{label}</div>}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {icon && <div style={{ opacity: 0.85 }}>{icon}</div>}
        <input
          className="form-input"
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          style={{ flex: 1 }}
        />
      </div>
    </label>
  );
}
