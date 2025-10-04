import React, { useEffect, useState } from 'react'
import auth from '../services/auth'

export default function AdminPanel(){
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let mounted = true
    async function fetchUsers(){
      setLoading(true)
      try{
        const res = await fetch(`${auth.API_BASE}/admin/users`, {
          headers: { 'Content-Type': 'application/json', ...auth.authHeader() }
        })
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        if (mounted) setUsers(data || [])
      }catch(err){
        console.error(err)
      }finally{ setLoading(false) }
    }
    fetchUsers()
    return () => { mounted = false }
  },[])

  return (
    <div className="card">
      <h2>Admin Panel</h2>
      <div className="muted">Manage users</div>
      <div style={{marginTop:12}}>
        {loading && <div className="muted">Loading users…</div>}
        {!loading && users.length === 0 && <div className="muted">No users found</div>}
        <div style={{display:'grid',gap:8,marginTop:8}}>
          {users.map(u => (
            <div key={u.id || u.username} className="user-row">
              <div>
                <div style={{fontWeight:700}}>{u.username}</div>
                <div className="muted" style={{fontSize:12}}>{u.email}</div>
              </div>
              <div className="muted">{(u.roles || u.authorities || []).join(', ')}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
