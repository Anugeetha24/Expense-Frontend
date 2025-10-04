import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import auth from '../services/auth'

export default function Login(){
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await auth.login(form.username, form.password)
      navigate('/profile')
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="card">
      <h2>Login</h2>
      <form className="form" onSubmit={onSubmit}>
        <div>
          <label>Username</label>
          <input name="username" value={form.username} onChange={onChange} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={form.password} onChange={onChange} required />
        </div>
        {error && <div style={{color:'#ffb4b4'}}>{error}</div>}
        <div style={{display:'flex',gap:8}}>
          <button type="submit" disabled={loading}>{loading? 'Signing in...' : 'Sign in'}</button>
          <button type="button" onClick={() => navigate('/register')}>Register</button>
        </div>
      </form>
    </div>
  )
}
