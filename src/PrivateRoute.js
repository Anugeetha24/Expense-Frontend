import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import auth from './services/auth'


// v6 pattern: using a wrapper that renders an <Outlet /> for nested routes
export default function PrivateRoute({ redirectTo = '/login', requireAdmin = false }) {
const user = auth.getCurrentUser()
if (!user) return <Navigate to={redirectTo} replace />
if (requireAdmin) {
const roles = user.roles || user.authorities || []
const isAdmin = roles.includes('ROLE_ADMIN') || roles.includes('ADMIN')
if (!isAdmin) return <Navigate to="/" replace />
}
return <Outlet />
}