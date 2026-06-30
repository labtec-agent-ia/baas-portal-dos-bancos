import { useState, useEffect } from 'react';
import { api } from '../services/api';

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

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await api.get('/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handlePixTransfer = async () => {
    if (!pixKey || !amount) return;
    setTransfering(true);
    
    try {
      await api.post('/transactions/transfer', {
        key_value: pixKey,
        amount: amount
      });
      alert(`PIX de R$ ${amount} enviado com sucesso para a chave ${pixKey}!`);
      setOpenPixDialog(false);
      setPixKey('');
      setAmount('');
      fetchTransactions(); // Atualiza a lista com o dado do banco
    } catch (error: any) {
      alert(error.response?.data?.error?.message || 'Erro ao realizar transferência.');
    } finally {
      setTransfering(false);
    }
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
