// src/components/Toast.jsx
import React, { useEffect } from "react";

export default function Toast({ type = "info", message = "", onClose = () => {}, duration = 4000 }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => onClose(), duration);
    return () => clearTimeout(t);
  }, [message, duration, onClose]);

  if (!message) return null;

  const colors = {
    success: { bg: "#052e16", border: "#14532d", text: "#bbf7d0" },
    error:   { bg: "#3b0d0d", border: "#7f1d1d", text: "#fecaca" },
    info:    { bg: "#0f172a", border: "#334155", text: "#c7d2fe" }
  };

  const c = colors[type] || colors.info;

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: "fixed",
        top: 20,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        minWidth: 320,
        maxWidth: "90%",
        borderRadius: 10,
        background: c.bg,
        color: c.text,
        border: `1px solid ${c.border}`,
        boxShadow: "0 8px 36px rgba(2,6,23,0.6)",
        padding: "0.75rem 1rem",
        display: "flex",
        alignItems: "center",
        gap: 12,
        fontSize: 14,
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, marginBottom: 2 }}>{type === "success" ? "Success" : type === "error" ? "Error" : "Info"}</div>
        <div style={{ opacity: 0.95 }}>{message}</div>
      </div>

      <button
        onClick={onClose}
        aria-label="Close notification"
        style={{
          background: "transparent",
          border: "none",
          color: c.text,
          cursor: "pointer",
          padding: 6,
          borderRadius: 6,
        }}
      >
        ✕
      </button>
    </div>
  );
}
