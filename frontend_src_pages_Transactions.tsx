import React, { useEffect, useState } from 'react'
import axios from 'axios'

type Tx = {
  id: string
  amount: number
  status: string
  createdAt?: string
}

export default function Transactions() {
  const [txs, setTxs] = useState<Tx[]>([])
  useEffect(() => {
    const api = import.meta.env.VITE_API_URL || 'http://localhost:8080'
    axios
      .get(`${api}/api/pix/payments`)
      .then((r) => setTxs(r.data || []))
      .catch(() => setTxs([]))
  }, [])

  return (
    <div style={{ maxWidth: 900 }}>
      <h2>Transações</h2>
      <ul>
        {txs.map((t) => (
          <li key={t.id}>
            {t.id}: R$ {t.amount} — {t.status} {t.createdAt ? `(${t.createdAt})` : ''}
          </li>
        ))}
      </ul>
    </div>
  )
}