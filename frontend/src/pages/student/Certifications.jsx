import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import Card from "../../components/Card";

export default function Certifications() {
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    axios.get("/api/student/certificates")
      .then(res => setCerts(res.data));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">My Certificates</h1>

      {certs.length === 0 && (
        <p className="text-slate-400">No certificates earned yet</p>
      )}

      {certs.map(c => (
        <Card key={c.id}>
          <h2 className="font-semibold">{c.course.title}</h2>
          <p className="text-xs text-slate-400">
            Issued on: {new Date(c.issuedAt).toLocaleDateString()}
          </p>

          <a
            href={c.certificateUrl}
            target="_blank"
            rel="noreferrer"
            className="text-indigo-400 underline mt-2 inline-block"
          >
            Download Certificate
          </a>
        </Card>
      ))}
    </div>
  );
}
