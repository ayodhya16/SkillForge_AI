// src/services/api.js
// Simple wrapper re-exporting your axios instance from services/auth.js
// This makes imports like "../../services/api" work from pages.

import api from "./auth"; // assumes services/auth.js exists and exports default axios instance
export default api;

// optional named helper (example)
// export async function fetchUsers() { return api.get('/admin/users'); }
