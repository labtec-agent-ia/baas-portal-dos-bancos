import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Clients from './pages/Clients'
import Transactions from './pages/Transactions'
import PixKeys from './pages/PixKeys'

export default function App() {
  return (
    <div>
      <header style={{ padding: 16, borderBottom: '1px solid #ddd' }}>
        <nav style={{ display: 'flex', gap: 12 }}>
          <Link to="/">Home</Link>
          <Link to="/clients">Clientes</Link>
          <Link to="/transactions">Transações</Link>
          <Link to="/pix-keys">Chaves PIX</Link>
          <Link to="/login">Login</Link>
        </nav>
      </header>

      <main style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<h2>Bem-vindo ao Portal dos Bancos</h2>} />
          <Route path="/login" element={<Login />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/pix-keys" element={<PixKeys />} />
        </Routes>
      </main>
    </div>
  )
}