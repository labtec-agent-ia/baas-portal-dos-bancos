import React, { useEffect, useState } from 'react'
import axios from 'axios'

type Client = {
  id: string
  name: string
  email?: string
}

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const api = import.meta.env.VITE_API_URL || 'http://localhost:8080'
    setLoading(true)
    axios
      .get(`${api}/api/clients`)
      .then((r) => setClients(r.data || []))
      .catch(() => setClients([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div style={{ maxWidth: 900 }}>
      <h2>Clientes</h2>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ textAlign: 'left' }}>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>E-mail</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.email ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}