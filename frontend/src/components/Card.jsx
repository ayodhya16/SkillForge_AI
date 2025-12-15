import React from "react";

export default function Card({ children, className = "" }) {
  return (
    <div className={`card-surface ${className}`}>
      {children}
    </div>
  );
}
