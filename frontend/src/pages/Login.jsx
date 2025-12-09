import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/auth'

export default function Login(){
  const [cred, setCred] = useState({email:'', password:''})
  const [err, setErr] = useState('')
  const navigate = useNavigate()

  const onChange = e => setCred({...cred, [e.target.name]: e.target.value})

  const submit = async (e) => {
    e.preventDefault()
    setErr('')
    try {
      const data = await login(cred)
      // role-based redirect
      if (data.role === 'ADMIN') navigate('/admin')
      else if (data.role === 'INSTRUCTOR') navigate('/instructor')
      else navigate('/student')
    } catch (error) {
      setErr(error.response?.data || error.message)
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>
      {err && <div style={{color:'red'}}>{err}</div>}
      <form onSubmit={submit}>
        <input name="email" placeholder="Email" value={cred.email} onChange={onChange} /><br/>
        <input name="password" type="password" placeholder="Password" value={cred.password} onChange={onChange} /><br/>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
