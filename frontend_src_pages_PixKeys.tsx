import React, { useEffect, useState } from 'react'
import axios from 'axios'

type PixKey = {
  id: string
  key: string
  type: string
  createdAt?: string
}

export default function PixKeys() {
  const [keys, setKeys] = useState<PixKey[]>([])

  useEffect(() => {
    const api = import.meta.env.VITE_API_URL || 'http://localhost:8080'
    axios
      .get(`${api}/api/pix/keys`)
      .then((r) => setKeys(r.data || []))
      .catch(() => setKeys([]))
  }, [])

  return (
    <div style={{ maxWidth: 900 }}>
      <h2>Chaves PIX</h2>
      <ul>
        {keys.map((k) => (
          <li key={k.id}>
            [{k.type}] {k.key} {k.createdAt ? `— ${k.createdAt}` : ''}
          </li>
        ))}
      </ul>
    </div>
  )
}