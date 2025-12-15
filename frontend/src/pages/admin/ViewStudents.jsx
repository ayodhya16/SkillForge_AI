import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import Card from "../../components/Card";
import Toast from "../../components/Toast";

export default function ViewStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ type: "", message: "" });

  useEffect(() => {
    loadStudents();
  }, []);

  const showToast = (type, message, duration = 4000) => {
    setToast({ type, message });
    setTimeout(() => setToast({ type: "", message: "" }), duration);
  };

  async function loadStudents() {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/students");
      setStudents(res.data || []);
    } catch (e) {
      showToast("error", e.response?.data || "Failed to load students");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Admin — Students</h1>

        <Card>
          {loading ? (
            <div className="text-slate-400">Loading students...</div>
          ) : students.length === 0 ? (
            <div className="text-slate-400">No students found</div>
          ) : (
            <table className="w-full table-fixed border-collapse text-sm">
              <thead className="text-slate-300">
                <tr>
                  <th className="w-[20%] text-left px-3 py-2">Name</th>
                  <th className="w-[30%] text-left px-3 py-2">Email</th>
                  <th className="w-[15%] text-left px-3 py-2">Phone</th>
                  <th className="w-[15%] text-left px-3 py-2">Status</th>
                  <th className="w-[20%] text-left px-3 py-2">Registered</th>
                </tr>
              </thead>

              <tbody>
                {students.map((s) => (
                  <tr
                    key={s.id}
                    className="border-t border-slate-700 hover:bg-slate-800/40"
                  >
                    <td className="px-3 py-2 truncate">{s.name}</td>
                    <td className="px-3 py-2 truncate">{s.email}</td>
                    <td className="px-3 py-2 truncate">
                      {s.phoneNumber || "—"}
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          s.status === "ACTIVE"
                            ? "bg-green-600/30 text-green-300"
                            : "bg-red-600/30 text-red-300"
                        }`}
                      >
                        {s.status || "ACTIVE"}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-slate-400">
                      {new Date(s.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>
      </div>

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
