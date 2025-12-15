import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import Card from "../../components/Card";
import Toast from "../../components/Toast";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [toast, setToast] = useState({ type: "", message: "" });

  useEffect(() => {
    loadUsers();
  }, []);

  const showToast = (type, message, duration = 4000) => {
    setToast({ type, message });
    setTimeout(() => setToast({ type: "", message: "" }), duration);
  };

  async function loadUsers() {
    try {
      const res = await axios.get("/api/admin/users");
      setUsers(res.data || []);
    } catch (e) {
      showToast("error", e.response?.data || e.message);
    }
  }

  async function changeRole(user, role) {
    if (user.role === "ADMIN") {
      showToast("error", "Admin role cannot be changed");
      return;
    }

    if (!window.confirm(`Change ${user.name}'s role to ${role}?`)) return;

    try {
      await axios.put(`/api/admin/users/${user.id}/role?role=${role}`);
      showToast("success", `Role updated to ${role}`);
      loadUsers();
    } catch (e) {
      showToast("error", e.response?.data || e.message);
    }
  }

  async function removeUser(user) {
    if (user.role === "ADMIN") {
      showToast("error", "Admin accounts cannot be deleted");
      return;
    }

    if (!window.confirm(`Delete ${user.name}?`)) return;

    try {
      await axios.delete(`/api/admin/users/${user.id}`);
      showToast("success", "User deleted successfully");
      loadUsers();
    } catch (e) {
      showToast("error", e.response?.data || e.message);
    }
  }

  return (
    <>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Admin - Manage Users</h1>

        <Card>
          <table className="w-full table-fixed border-collapse text-sm">
            <thead className="text-slate-300">
              <tr>
                <th className="w-[20%] text-left px-4 py-2">Name</th>
                <th className="w-[30%] text-left px-4 py-2">Email</th>
                <th className="w-[15%] text-left px-4 py-2">Role</th>
                <th className="w-[35%] text-left px-4 py-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => {
                const isAdmin = u.role === "ADMIN";

                return (
                  <tr key={u.id} className="border-t border-slate-700">
                    <td className="px-4 py-3 truncate">{u.name}</td>
                    <td className="px-4 py-3 truncate">{u.email}</td>
                    <td className="px-4 py-3 font-medium">{u.role}</td>

                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">

                        <button
                          disabled={u.role === "ADMIN"}
                          onClick={() => changeRole(u, "STUDENT")}
                          className="bg-green-600 px-3 py-1 rounded text-xs disabled:opacity-40"
                        >
                          Student
                        </button>

                        <button
                          disabled={u.role === "ADMIN"}
                          onClick={() => changeRole(u, "INSTRUCTOR")}
                          className="bg-yellow-600 px-3 py-1 rounded text-xs disabled:opacity-40"
                        >
                          Instructor
                        </button>

                        <button
                          disabled={u.role === "ADMIN"}
                          onClick={() => changeRole(u, "ADMIN")}
                          className="bg-purple-700 px-3 py-1 rounded text-xs opacity-50 cursor-not-allowed"
                        >
                          Admin
                        </button>
                        {u.role !== "ADMIN" &&(
                            <button
                              onClick={() => removeUser(u)}
                              className="bg-red-600 px-3 py-1 rounded text-xs"
                            >
                              Delete
                            </button>
                        )}

                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
