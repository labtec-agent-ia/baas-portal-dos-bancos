// src/pages/ClientsList.tsx
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Client {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  status: 'pending' | 'active' | 'blocked';
}

export default function ClientsList() {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery<Client[]>(['clients'], async () => {
    const res = await axios.get('/api/clients');
    return res.data;
  });

  const columns: GridColDef[] = [
    { field: 'nome', headerName: 'Nome', flex: 1 },
    { field: 'cpf', headerName: 'CPF', flex: 1 },
    { field: 'email', headerName: 'E‑mail', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    {
      field: 'actions',
      headerName: 'Ações',
      renderCell: (params) => (
        <Button variant="contained" size="small" onClick={() => navigate(`/clientes/${params.row.id}`)}>
          Detalhes
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid rows={data ?? []} columns={columns} loading={isLoading} pageSize={10} rowsPerPageOptions={[10]} />
    </Box>
  );
}
