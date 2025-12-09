import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import Card from "../components/Card";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => { load(); }, []);

  async function load() {
    try {
      const res = await axios.get("/api/admin/users");
      setUsers(res.data || []);
    } catch (e) {
      setErr(e.response?.data || e.message);
    }
  }

  async function removeUser(id) {
    if (!confirm("Delete user?")) return;
    await axios.delete(`/api/admin/users/${id}`);
    load();
  }

  async function changeRole(id, role) {
    await axios.put(`/api/admin/users/${id}/role?role=${role}`);
    load();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Admin — Manage Users</h1>
      {err && <div className="text-red-500">{err}</div>}

      <Card>
        <table className="w-full">
          <thead className="text-slate-400 text-sm">
            <tr><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-t border-slate-700">
                <td className="py-2">{u.name}</td>
                <td className="py-2">{u.email}</td>
                <td className="py-2">{u.role}</td>
                <td className="py-2">
                  <button onClick={() => changeRole(u.id, "INSTRUCTOR")} className="mr-2 bg-yellow-600 px-2 py-1 rounded">Make Instructor</button>
                  <button onClick={() => changeRole(u.id, "STUDENT")} className="mr-2 bg-green-600 px-2 py-1 rounded">Make Student</button>
                  <button onClick={() => removeUser(u.id)} className="bg-red-600 px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
