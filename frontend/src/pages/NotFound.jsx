import React from "react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-3xl font-bold">404 — Not Found</h2>
        <p className="mt-4 text-slate-400">The page you requested does not exist.</p>
      </div>
    </div>
  );
}
