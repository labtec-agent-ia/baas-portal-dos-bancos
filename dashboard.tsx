// src/pages/Clients.tsx
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';

interface Client {
  id: string;
  name: string;
  cpf: string;
  status: 'pending' | 'active' | 'blocked';
}

export default function Clients() {
  const [rows, setRows] = useState<Client[]>([]);

  useEffect(() => {
    axios.get<Client[]>('/api/clients').then(r => setRows(r.data));
  }, []);

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', flex: 1 },
    { field: 'cpf', headerName: 'CPF', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    {
      field: 'actions',
      headerName: 'Ações',
      renderCell: (params) => (
        <button onClick={() => viewDetails(params.row.id)}>Detalhes</button>
      ),
    },
  ];

  return <DataGrid rows={rows} columns={columns} autoHeight />;
}
