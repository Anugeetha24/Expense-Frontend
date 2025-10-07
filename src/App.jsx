import React, { useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import AdminPanel from './components/AdminPanel'
import Dashboard from './components/Dashboard'
import PrivateRoute from './PrivateRoute'

function Welcome() {
  return (
    <div className="card">
      <h1>Welcome to Finance UI</h1>
      <p>Manage your personal finances with clarity — income, savings and spending targets in one place.</p>
      <p>Use the navigation above to login or register. Administrators can manage users in the Admin panel.</p>
    </div>
  )
}

export default function App() {
  useEffect(() => {
    // Inject a vibrant and attractive theme into the document head.
    const style = document.createElement('style')
    style.innerHTML = `
      :root{
        --bg-primary:#0a0e27;
        --bg-secondary:#1a1f3a;
        --accent-purple:#a78bfa;
        --accent-pink:#ec4899;
        --accent-blue:#3b82f6;
        --accent-cyan:#06b6d4;
        --accent-green:#10b981;
        --accent-orange:#f59e0b;
        --text-primary:#f0f9ff;
        --text-muted:#94a3b8;
        --glass:rgba(255,255,255,0.05);
        --glow:rgba(167,139,250,0.4);
      }
      
      @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      
      @keyframes glow {
        0%, 100% { box-shadow: 0 0 20px rgba(167,139,250,0.3), 0 0 40px rgba(236,72,153,0.2); }
        50% { box-shadow: 0 0 30px rgba(167,139,250,0.5), 0 0 60px rgba(236,72,153,0.3); }
      }
      
      @keyframes shimmer {
        0% { background-position: -1000px 0; }
        100% { background-position: 1000px 0; }
      }
      
      *{box-sizing:border-box;margin:0;padding:0}
      
      body{
        margin:0;
        font-family:'Inter',ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,'Helvetica Neue',Arial;
        background:linear-gradient(135deg,#0a0e27 0%,#1a1f3a 50%,#0f172a 100%);
        background-size:400% 400%;
        animation:gradient 15s ease infinite;
        color:var(--text-primary);
        min-height:100vh;
        position:relative;
        overflow-x:hidden;
      }
      
      body::before{
        content:'';
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:radial-gradient(circle at 20% 30%,rgba(167,139,250,0.1) 0%,transparent 50%),
                   radial-gradient(circle at 80% 70%,rgba(236,72,153,0.1) 0%,transparent 50%),
                   radial-gradient(circle at 50% 50%,rgba(59,130,246,0.05) 0%,transparent 50%);
        pointer-events:none;
        z-index:0;
      }
      
      .app{
        max-width:1200px;
        margin:28px auto;
        padding:18px;
        position:relative;
        z-index:1;
      }
      
      .navbar{
        display:flex;
        align-items:center;
        justify-content:space-between;
        padding:16px 24px;
        border-radius:16px;
        background:linear-gradient(135deg,rgba(167,139,250,0.1) 0%,rgba(236,72,153,0.1) 100%);
        backdrop-filter:blur(20px);
        border:1px solid rgba(255,255,255,0.1);
        box-shadow:0 8px 32px rgba(0,0,0,0.4),
                   inset 0 1px 0 rgba(255,255,255,0.1);
        animation:glow 3s ease-in-out infinite;
      }
      
      .brand{
        display:flex;
        gap:14px;
        align-items:center;
        animation:float 3s ease-in-out infinite;
      }
      
      .logo{
        width:50px;
        height:50px;
        border-radius:12px;
        background:linear-gradient(135deg,var(--accent-purple),var(--accent-pink),var(--accent-blue));
        background-size:200% 200%;
        animation:gradient 3s ease infinite;
        display:flex;
        align-items:center;
        justify-content:center;
        color:#fff;
        font-weight:800;
        font-size:24px;
        box-shadow:0 4px 20px rgba(167,139,250,0.5),
                   0 0 40px rgba(236,72,153,0.3);
        position:relative;
      }
      
      .logo::after{
        content:'';
        position:absolute;
        inset:-2px;
        border-radius:12px;
        padding:2px;
        background:linear-gradient(135deg,var(--accent-purple),var(--accent-pink));
        -webkit-mask:linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite:xor;
        mask-composite:exclude;
        opacity:0.6;
      }
      
      a{
        color:var(--text-muted);
        text-decoration:none;
        transition:all 0.3s ease;
        position:relative;
        font-weight:500;
      }
      
      a:hover{
        color:var(--accent-purple);
        transform:translateY(-2px);
      }
      
      a::after{
        content:'';
        position:absolute;
        bottom:-4px;
        left:0;
        width:0;
        height:2px;
        background:linear-gradient(90deg,var(--accent-purple),var(--accent-pink));
        transition:width 0.3s ease;
      }
      
      a:hover::after{
        width:100%;
      }
      
      .nav-links{
        display:flex;
        gap:20px;
        align-items:center;
      }
      
      .card{
        background:linear-gradient(135deg,rgba(167,139,250,0.08) 0%,rgba(59,130,246,0.08) 100%);
        backdrop-filter:blur(20px);
        padding:28px;
        border-radius:16px;
        margin-top:24px;
        border:1px solid rgba(255,255,255,0.1);
        box-shadow:0 8px 32px rgba(0,0,0,0.3),
                   inset 0 1px 0 rgba(255,255,255,0.1);
        transition:all 0.3s ease;
        position:relative;
        overflow:hidden;
      }
      
      .card::before{
        content:'';
        position:absolute;
        top:0;
        left:-100%;
        width:100%;
        height:100%;
        background:linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent);
        animation:shimmer 3s infinite;
      }
      
      .card:hover{
        transform:translateY(-4px);
        box-shadow:0 12px 40px rgba(0,0,0,0.4),
                   0 0 60px rgba(167,139,250,0.2);
        border-color:rgba(167,139,250,0.3);
      }
      
      .card h1{
        background:linear-gradient(135deg,var(--accent-purple),var(--accent-pink),var(--accent-blue));
        -webkit-background-clip:text;
        -webkit-text-fill-color:transparent;
        background-clip:text;
        font-size:2.5rem;
        margin-bottom:16px;
      }
      
      .card h2{
        background:linear-gradient(135deg,var(--accent-cyan),var(--accent-green));
        -webkit-background-clip:text;
        -webkit-text-fill-color:transparent;
        background-clip:text;
        font-size:2rem;
        margin-bottom:12px;
      }
      
      .card h3{
        color:var(--accent-purple);
        margin-bottom:12px;
      }
      
      .form{
        display:grid;
        gap:16px;
        max-width:540px;
      }
      
      label{
        font-size:0.9rem;
        color:var(--accent-cyan);
        font-weight:600;
        margin-bottom:4px;
        display:block;
      }
      
      input,select,textarea{
        padding:12px 16px;
        border-radius:10px;
        border:1px solid rgba(167,139,250,0.3);
        background:rgba(10,14,39,0.6);
        color:inherit;
        transition:all 0.3s ease;
        font-size:14px;
      }
      
      input:focus,select:focus,textarea:focus{
        outline:none;
        border-color:var(--accent-purple);
        box-shadow:0 0 0 3px rgba(167,139,250,0.2),
                   0 0 20px rgba(167,139,250,0.3);
        background:rgba(10,14,39,0.8);
      }
      
      button{
        background:linear-gradient(135deg,var(--accent-purple),var(--accent-pink),var(--accent-blue));
        background-size:200% 200%;
        border:none;
        padding:12px 24px;
        border-radius:10px;
        color:#fff;
        font-weight:700;
        cursor:pointer;
        transition:all 0.3s ease;
        position:relative;
        overflow:hidden;
        box-shadow:0 4px 15px rgba(167,139,250,0.4);
      }
      
      button::before{
        content:'';
        position:absolute;
        top:0;
        left:-100%;
        width:100%;
        height:100%;
        background:linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent);
        transition:left 0.5s ease;
      }
      
      button:hover{
        animation:gradient 2s ease infinite;
        transform:translateY(-2px);
        box-shadow:0 6px 25px rgba(167,139,250,0.6),
                   0 0 40px rgba(236,72,153,0.4);
      }
      
      button:hover::before{
        left:100%;
      }
      
      button:active{
        transform:translateY(0);
      }
      
      button:disabled{
        opacity:0.6;
        cursor:not-allowed;
      }
      
      .muted{
        color:var(--text-muted);
        font-size:0.9rem;
      }
      
      .grid-2{
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:16px;
      }
      
      .user-row{
        display:flex;
        justify-content:space-between;
        align-items:center;
        padding:14px;
        border-radius:10px;
        background:linear-gradient(135deg,rgba(167,139,250,0.1),rgba(59,130,246,0.1));
        border:1px solid rgba(255,255,255,0.1);
        transition:all 0.3s ease;
      }
      
      .user-row:hover{
        background:linear-gradient(135deg,rgba(167,139,250,0.15),rgba(59,130,246,0.15));
        transform:translateX(4px);
        border-color:rgba(167,139,250,0.3);
      }
      
      p{
        line-height:1.6;
        color:var(--text-muted);
      }
      
      @media (max-width:720px){
        .grid-2{grid-template-columns:1fr}
        .app{margin:12px;padding:12px}
        .navbar{padding:12px 16px}
        .card{padding:20px}
      }
    `
    document.head.appendChild(style)
    return () => { document.head.removeChild(style) }
  }, [])

  return (
    <div className="app">
      <nav className="navbar">
        <div className="brand">
          <div className="logo">F</div>
          <div>
            <div style={{fontWeight:700}}>Finance UI</div>
            <div className="muted" style={{fontSize:12}}>Personal finance, thoughtfully designed</div>
          </div>
        </div>
        <div style={{display:'flex',gap:12,alignItems:'center'}}>
          <div className="nav-links"><Link to="/">Home</Link></div>
        </div>
        <div style={{marginLeft:20}}>
          <Navbar />
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes using PrivateRoute with nesting */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route element={<PrivateRoute requireAdmin={true} />}>
          <Route path="/admin" element={<AdminPanel />} />
        </Route>

        <Route path="*" element={<div className="card"><h3>404 — Not Found</h3></div>} />
      </Routes>

    </div>
  )
}