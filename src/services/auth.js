// Lightweight authentication service that uses fetch and localStorage.
const API_BASE = 'http://localhost:8080/api'

async function register(username, email, password, role = 'user') {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, emailId: email, role })
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(err || 'Registration failed')
  }
  const responseText = await res.text()
  return { message: responseText }
}

async function login(username, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  const responseText = await res.text();
  
  if (!res.ok) {
    throw new Error(responseText || 'Login failed')
  }

  // Try to parse as JSON if possible, otherwise use text response
  let data;
  try {
    data = JSON.parse(responseText);
  } catch {
    data = { message: responseText };
  }

  if (data.token) {
    localStorage.setItem('user', JSON.stringify(data.user || { username }))
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
