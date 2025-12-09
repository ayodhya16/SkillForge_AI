import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import StudentDashboard from './pages/StudentDashboard'
import InstructorDashboard from './pages/InstructorDashboard'
import AdminDashboard from './pages/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import Nav from './components/Nav'

export default function App(){
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* protected by JWT + role checks */}
        <Route path="/student/*" element={
          <ProtectedRoute allowedRoles={['STUDENT']} >
            <StudentDashboard />
          </ProtectedRoute>
        } />

        <Route path="/instructor/*" element={
          <ProtectedRoute allowedRoles={['INSTRUCTOR']} >
            <InstructorDashboard />
          </ProtectedRoute>
        } />

        <Route path="/admin/*" element={
          <ProtectedRoute allowedRoles={['ADMIN']} >
            <AdminDashboard />
          </ProtectedRoute>
        } />

        <Route path="*" element={<div>404 Not found</div>} />
      </Routes>
    </>
  )
}
