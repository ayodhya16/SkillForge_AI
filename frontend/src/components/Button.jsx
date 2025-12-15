import React from "react";

export default function Button({ children, type = "button", leftIcon }) {
  return (
    <button type={type} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md inline-flex items-center gap-2">
      {leftIcon && <span className="inline-flex">{leftIcon}</span>}
      {children}
    </button>
  );
}
