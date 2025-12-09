import React from "react";
import Card from "../components/Card";

export default function StudentDashboard() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Student Dashboard</h1>
      <Card>
        <p>Welcome! Here you will find your enrolled courses and progress.</p>
      </Card>
    </div>
  );
}
