import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Grid, Card, CardContent, Typography, Box, Select, MenuItem, FormControl, IconButton, CircularProgress } from '@mui/material';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@mui/icons-material';
import { useDashboardStore } from '../store/useDashboardStore';

const data7days = [
  { name: 'Seg', uv: 4000, pv: 2400 },
  { name: 'Ter', uv: 3000, pv: 1398 },
  { name: 'Qua', uv: 2000, pv: 9800 },
  { name: 'Qui', uv: 2780, pv: 3908 },
  { name: 'Sex', uv: 1890, pv: 4800 },
  { name: 'Sab', uv: 2390, pv: 3800 },
  { name: 'Dom', uv: 3490, pv: 4300 },
];

const data30days = [
  ...data7days,
  { name: 'Sem2', uv: 12000, pv: 18000 },
  { name: 'Sem3', uv: 15000, pv: 22000 },
  { name: 'Sem4', uv: 20000, pv: 28000 },
];

export default function DashboardHome() {
  const { period, setPeriod } = useDashboardStore();
  const [showBalance, setShowBalance] = useState(true);
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    api.get('/clients')
      .then(response => {
        if (response.data && response.data.length > 0) {
          setBalance(response.data[0].balance);
        }
      })
      .catch(console.error);
  }, []);

  const data = period === '7days' ? data7days : data30days;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">Visão Geral</Typography>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <Select
            value={period}
            onChange={(e) => setPeriod(e.target.value as any)}
            sx={{ bgcolor: 'background.paper', borderRadius: 2 }}
          >
            <MenuItem value="7days">Últimos 7 dias</MenuItem>
            <MenuItem value="30days">Últimos 30 dias</MenuItem>
            <MenuItem value="year">Este ano</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Saldo Disponível
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mr: 2 }}>
                  {showBalance ? (
                    balance !== null ? (
                      new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(balance)
                    ) : (
                      <CircularProgress size={24} />
                    )
                  ) : 'R$ •••••••'}
                </Typography>
                <IconButton onClick={() => setShowBalance(!showBalance)} size="small">
                  {showBalance ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Novos Clientes
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {period === '7days' ? '124' : '458'}
              </Typography>
              <Typography color="success.main" sx={{ display: 'flex', alignItems: 'center', mt: 1, fontSize: '0.875rem' }}>
                +5% comparado ao período anterior
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Chaves PIX Ativas
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                8.902
              </Typography>
              <Typography color="textSecondary" sx={{ display: 'flex', alignItems: 'center', mt: 1, fontSize: '0.875rem' }}>
                Total acumulado
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Evolução do Volume (PIX)
        </Typography>
        <Box sx={{ height: 350, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={10} stroke="#94a3b8" />
              <YAxis axisLine={false} tickLine={false} tickMargin={10} stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.5)', backgroundColor: '#1e293b', color: '#f8fafc' }}
              />
              <Area type="monotone" dataKey="uv" stroke="#60a5fa" strokeWidth={3} fillOpacity={1} fill="url(#colorUv)" />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </Card>
    </Box>
  );
}
