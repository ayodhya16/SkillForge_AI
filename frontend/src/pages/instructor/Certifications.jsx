import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import Card from "../../components/Card";

export default function Certifications() {
  const [issued, setIssued] = useState([]);

  useEffect(() => {
    axios.get("/api/instructor/certificates")
      .then(res => setIssued(res.data));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Issued Certificates</h1>

      {issued.length === 0 && (
        <p className="text-slate-400">No certificates issued yet</p>
      )}

      {issued.map(c => (
        <Card key={c.id}>
          <div className="font-medium">{c.course.title}</div>
          <div className="text-sm text-slate-400">
            Student: {c.student.name}
          </div>
          <div className="text-xs text-slate-500">
            Issued on: {new Date(c.issuedAt).toLocaleDateString()}
          </div>
        </Card>
      ))}
    </div>
  );
}
