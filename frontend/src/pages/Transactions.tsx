import { useState, useEffect } from 'react';

import {
  Box, Typography, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Button, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';
import { 
  ArrowUpward as ArrowUpIcon, 
  ArrowDownward as ArrowDownIcon,
  Add as AddIcon
} from '@mui/icons-material';

export default function Transactions() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openPixDialog, setOpenPixDialog] = useState(false);
  const [pixKey, setPixKey] = useState('');
  const [amount, setAmount] = useState('');
  const [transfering, setTransfering] = useState(false);

  const fetchTransactions = () => {
    setLoading(true);
    // Mock de transações
    const mockTransactions = [
      { id: 1, date: '2026-06-23T10:30:00Z', type: 'PIX Recebido', origin: 'Maria Oliveira', amount: '1500.00', status: 'Concluído' },
      { id: 2, date: '2026-06-22T14:45:00Z', type: 'PIX Enviado', origin: 'Mercado Livre', amount: '299.90', status: 'Concluído' },
      { id: 3, date: '2026-06-21T09:15:00Z', type: 'PIX Recebido', origin: 'Empresa XYZ', amount: '5400.00', status: 'Concluído' },
      { id: 4, date: '2026-06-20T18:20:00Z', type: 'PIX Enviado', origin: 'Posto Ipiranga', amount: '120.00', status: 'Concluído' }
    ];

    setTimeout(() => {
      setTransactions(mockTransactions);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handlePixTransfer = () => {
    setTransfering(true);
    
    // Simula tempo de rede para a transferência PIX
    setTimeout(() => {
      alert(`PIX de R$ ${amount} enviado com sucesso para a chave ${pixKey}!`);
      setOpenPixDialog(false);
      
      // Adiciona o novo PIX na lista mockada para efeito visual imediato
      const newPix = {
        id: Date.now(),
        date: new Date().toISOString(),
        type: 'PIX Enviado',
        origin: pixKey,
        amount: parseFloat(amount).toFixed(2),
        status: 'Concluído'
      };
      setTransactions(prev => [newPix, ...prev]);
      setPixKey('');
      setAmount('');
      setTransfering(false);
    }, 1500);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">Histórico de Transações</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenPixDialog(true)}>
          Novo PIX
        </Button>
      </Box>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>
      ) : (
      <Card sx={{ p: 0 }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ bgcolor: 'background.default' }}>
              <TableRow>
                <TableCell>Data</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Origem/Destino</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{new Date(row.date).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {row.type.includes('Recebido') ? (
                        <ArrowUpIcon color="success" fontSize="small" />
                      ) : (
                        <ArrowDownIcon color="error" fontSize="small" />
                      )}
                      <Typography variant="body2">{row.type}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{row.origin}</TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: row.type.includes('Recebido') ? 'success.main' : 'error.main' 
                  }}>
                    {row.type.includes('Recebido') ? '+' : '-'} R$ {row.amount}
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={row.status} 
                      size="small"
                      color="success"
                      sx={{ fontWeight: 500 }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      )}

      {/* Modal PIX */}
      <Dialog open={openPixDialog} onClose={() => setOpenPixDialog(false)} fullWidth maxWidth="xs">
        <DialogTitle>Transferência PIX</DialogTitle>
        <DialogContent>
          <TextField 
            autoFocus margin="dense" label="Chave PIX do Destinatário" type="text" fullWidth variant="outlined" 
            value={pixKey} onChange={(e) => setPixKey(e.target.value)} sx={{ mb: 2, mt: 1 }}
          />
          <TextField 
            margin="dense" label="Valor (R$)" type="number" fullWidth variant="outlined" 
            value={amount} onChange={(e) => setAmount(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenPixDialog(false)} color="inherit">Cancelar</Button>
          <Button onClick={handlePixTransfer} variant="contained" disabled={transfering}>
            {transfering ? 'Enviando...' : 'Transferir'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
