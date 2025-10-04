import React, { useEffect, useState } from 'react'
import auth from '../services/auth'

export default function Profile(){
  const user = auth.getCurrentUser()
  const [profile, setProfile] = useState({ income: '', savings: '', targetExpenses: '' })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    let mounted = true
    async function fetchProfile() {
      setLoading(true)
      try {
        const res = await fetch(`${auth.API_BASE}/profile`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', ...auth.authHeader() }
        })
        if (!res.ok) throw new Error('Failed to load profile')
        const data = await res.json()
        if (mounted) setProfile({
          income: data.income ?? '',
          savings: data.savings ?? '',
          targetExpenses: data.targetExpenses ?? ''
        })
      } catch (err) {
        console.error(err)
      } finally { setLoading(false) }
    }
    fetchProfile()
    return () => { mounted = false }
  }, [])

  const onChange = (e) => setProfile(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const onSave = async () => {
    setMessage(null)
    setLoading(true)
    try {
      const res = await fetch(`${auth.API_BASE}/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...auth.authHeader() },
        body: JSON.stringify(profile)
      })
      if (!res.ok) throw new Error('Failed to save')
      setMessage('Saved successfully')
    } catch (err) {
      setMessage(err.message)
    } finally { setLoading(false) }
  }

  return (
    <div className="card">
      <h2>Profile</h2>
      <div className="muted">Logged in as <strong>{user?.username}</strong></div>

      <div style={{marginTop:12}}>
        <div className="form">
          <div>
            <label>Monthly Income</label>
            <input name="income" value={profile.income} onChange={onChange} placeholder="e.g. 50000" />
          </div>

          <div>
            <label>Savings</label>
            <input name="savings" value={profile.savings} onChange={onChange} placeholder="e.g. 10000" />
          </div>

          <div>
            <label>Target Monthly Expenses</label>
            <input name="targetExpenses" value={profile.targetExpenses} onChange={onChange} placeholder="e.g. 30000" />
          </div>

          <div style={{display:'flex',gap:10}}>
            <button onClick={onSave} disabled={loading}>{loading ? 'Saving...' : 'Save profile'}</button>
          </div>

          {message && <div className="muted">{message}</div>}
        </div>

        <div style={{marginTop:18}} className="card">
          <h3>Quick Insights</h3>
          <div className="grid-2">
            <div className="user-row">
              <div>
                <div className="muted">Income</div>
                <div style={{fontWeight:700}}>{profile.income || '—'}</div>
              </div>
              <div className="muted">Monthly</div>
            </div>
            <div className="user-row">
              <div>
                <div className="muted">Savings</div>
                <div style={{fontWeight:700}}>{profile.savings || '—'}</div>
              </div>
              <div className="muted">Goal</div>
            </div>

            <div className="user-row">
              <div>
                <div className="muted">Target Expenses</div>
                <div style={{fontWeight:700}}>{profile.targetExpenses || '—'}</div>
              </div>
              <div className="muted">Planned</div>
            </div>

            <div className="user-row">
              <div>
                <div className="muted">Savings Rate</div>
                <div style={{fontWeight:700}}>{computeSavingsRate(profile)}%</div>
              </div>
              <div className="muted">Estimate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function computeSavingsRate(profile){
  const income = parseFloat(profile.income) || 0
  const savings = parseFloat(profile.savings) || 0
  if (income <= 0) return '—'
  const rate = (savings / income) * 100
  return (Number.isFinite(rate) ? rate.toFixed(1) : '—')
}
