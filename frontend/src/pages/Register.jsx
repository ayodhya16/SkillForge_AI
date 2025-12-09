import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../services/auth'

export default function Register(){
  const [form, setForm] = useState({name:'', email:'', password:'', role:'STUDENT', phoneNumber:''})
  const [err, setErr] = useState('')
  const navigate = useNavigate()

  const onChange = e => setForm({...form, [e.target.name]: e.target.value})

  const submit = async (e) => {
    e.preventDefault()
    setErr('')
    try {
      await register(form)
      alert('Registered! Please login.')
      navigate('/login')
    } catch (error) {
      setErr(error.response?.data || error.message)
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Register</h2>
      {err && <div style={{color:'red'}}>{err}</div>}
      <form onSubmit={submit}>
        <input name="name" placeholder="Name" value={form.name} onChange={onChange} /><br/>
        <input name="email" placeholder="Email" value={form.email} onChange={onChange} /><br/>
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} /><br/>
        <select name="role" value={form.role} onChange={onChange}>
          <option value="STUDENT">Student</option>
          <option value="INSTRUCTOR">Instructor</option>
          <option value="ADMIN">Admin</option>
        </select><br/>
        <input name="phoneNumber" placeholder="Phone" value={form.phoneNumber} onChange={onChange} /><br/>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}
