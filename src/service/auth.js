// Lightweight authentication service that uses fetch and localStorage.
const API_BASE = 'http://localhost:8080/api'


async function register(username, email, password, role = 'USER') {
const res = await fetch(`${API_BASE}/auth/register`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ username, email, password, role })
})
if (!res.ok) {
const err = await res.text()
throw new Error(err || 'Registration failed')
}
return res.json()
}


async function login(username, password) {
const res = await fetch(`${API_BASE}/auth/login`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ username, password })
})
if (!res.ok) {
const err = await res.text()
throw new Error(err || 'Login failed')
}
const data = await res.json()
// expecting { token: '...', user: { id, username, email, roles: [...] } }
if (data && data.token) {
localStorage.setItem('user', JSON.stringify(data.user || null))
localStorage.setItem('token', data.token)
}
return data
}


function logout() {
localStorage.removeItem('user')
localStorage.removeItem('token')
}


function getCurrentUser() {
try {
const raw = localStorage.getItem('user')
return raw ? JSON.parse(raw) : null
} catch (e) {
return null
}
}


function getToken() {
return localStorage.getItem('token')
}


function authHeader() {
const token = getToken()
if (token) {
return { Authorization: `Bearer ${token}` }
}
return {}
}


export default {
register,
login,
logout,
getCurrentUser,
getToken,
authHeader,
API_BASE
}