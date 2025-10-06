import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import auth from '../services/auth'

export default function Register(){
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'user' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const response = await auth.register(form.username, form.email, form.password, form.role)
      toast.success(response.message || 'Registration successful!')
      // After registration, navigate to login
      navigate('/login')
    } catch (err) {
      const errorMessage = err.message || 'Registration failed'
      toast.error(errorMessage)
      setError(errorMessage)
    } finally { setLoading(false) }
  }

  return (
    <>
      <div className="card">
        <h2>Create an account</h2>
        <form className="form" onSubmit={onSubmit}>
          <div>
            <label>Username</label>
            <input name="username" value={form.username} onChange={onChange} required />
          </div>
          <div>
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={onChange} required />
          </div>
          <div>
            <label>Password</label>
            <input type="password" name="password" value={form.password} onChange={onChange} required />
          </div>
          <div>
            <label>Role</label>
            <select name="role" value={form.role} onChange={onChange}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {error && <div style={{color:'#ffb4b4'}}>{error}</div>}
          <div style={{display:'flex',gap:8}}>
            <button type="submit" disabled={loading}>{loading? 'Creating...' : 'Create account'}</button>
            <button type="button" onClick={() => navigate('/login')}>Already have an account?</button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}
