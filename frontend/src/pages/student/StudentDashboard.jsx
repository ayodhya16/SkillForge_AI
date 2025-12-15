import React from "react";
export default function StudentDashboard(){
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Student Dashboard</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-800 rounded">My Courses</div>
        <div className="p-4 bg-slate-800 rounded">Upcoming Exams</div>
        <div className="p-4 bg-slate-800 rounded">Certifications</div>
      </div>
    </div>
  );
}
