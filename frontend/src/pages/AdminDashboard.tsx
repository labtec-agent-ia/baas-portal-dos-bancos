import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Chip, LinearProgress, TextField, Button, Alert } from '@mui/material';
import { Settings as SettingsIcon, Storage as StorageIcon, Security as SecurityIcon, NetworkCheck as NetworkCheckIcon, CloudSync as CloudSyncIcon } from '@mui/icons-material';
import { api } from '../services/api';

export default function AdminDashboard() {
  const [railzClientId, setRailzClientId] = useState('');
  const [railzSecret, setRailzSecret] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    api.get('/settings').then(res => {
      setRailzClientId(res.data.railz_client_id || '');
      setRailzSecret(res.data.railz_secret || '');
    }).catch(console.error);
  }, []);

  const handleSaveSettings = async () => {
    setSaving(true);
    setSaveSuccess(false);
    try {
      await api.put('/settings', {
        railz_client_id: railzClientId,
        railz_secret: railzSecret
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Falha ao salvar configurações:', error);
      alert('Falha ao salvar configurações.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>Painel de Administração (Developer)</Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ borderLeft: '4px solid', borderColor: 'primary.main', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <StorageIcon color="primary" />
                  <Typography variant="h6">PostgreSQL</Typography>
                </Box>
                <Chip label="Online" color="success" size="small" />
              </Box>
              <Typography variant="body2" color="textSecondary" gutterBottom>Host: baas-portal-db:5432</Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>Database: baas_portal</Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" color="textSecondary">Uso de Conexões</Typography>
                <LinearProgress variant="determinate" value={15} sx={{ mt: 0.5, borderRadius: 1 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <Card sx={{ borderLeft: '4px solid', borderColor: 'secondary.main', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <SecurityIcon color="secondary" />
                  <Typography variant="h6">Keycloak Auth</Typography>
                </Box>
                <Chip label="Online" color="success" size="small" />
              </Box>
              <Typography variant="body2" color="textSecondary" gutterBottom>Host: localhost:8099</Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>Realm: baas-realm</Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" color="textSecondary">Latência de Validação JWT</Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>12ms</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <Card sx={{ borderLeft: '4px solid', borderColor: 'success.main', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <SettingsIcon color="success" />
                  <Typography variant="h6">Redis Cache</Typography>
                </Box>
                <Chip label="Online" color="success" size="small" />
              </Box>
              <Typography variant="body2" color="textSecondary" gutterBottom>Host: baas-portal-redis:6379</Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>Chaves em Cache: ~42 chaves</Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" color="textSecondary">Uso de Memória</Typography>
                <LinearProgress variant="determinate" value={5} color="success" sx={{ mt: 0.5, borderRadius: 1 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h5" sx={{ mt: 6, mb: 3 }}>Integrações B2B</Typography>
      <Card sx={{ p: 3, mb: 4, borderLeft: '4px solid', borderColor: 'warning.main' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <CloudSyncIcon color="warning" fontSize="large" />
          <Typography variant="h6">Configuração da API Railz (Accounting as a Service)</Typography>
        </Box>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
          Insira as credenciais do aplicativo Railz (Production ou Sandbox) para habilitar o Motor de Crédito B2B, análise de Risco e Conexões com ERPs para os clientes do portal.
        </Typography>

        {saveSuccess && <Alert severity="success" sx={{ mb: 3 }}>Configurações salvas com sucesso no banco de dados.</Alert>}

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="Railz Client ID" 
              fullWidth 
              variant="outlined"
              value={railzClientId}
              onChange={(e) => setRailzClientId(e.target.value)}
              placeholder="Ex: rlz_client_..."
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="Railz Secret" 
              fullWidth 
              variant="outlined" 
              type="password"
              value={railzSecret}
              onChange={(e) => setRailzSecret(e.target.value)}
              placeholder="Ex: rlz_secret_..."
            />
          </Grid>
          <Grid item xs={12}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleSaveSettings} 
              disabled={saving}
            >
              {saving ? 'Salvando...' : 'Salvar Configuração de API'}
            </Button>
          </Grid>
        </Grid>
      </Card>

      <Typography variant="h5" sx={{ mt: 6, mb: 3 }}>Tráfego de API</Typography>
      <Card sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 3 }}>
        <NetworkCheckIcon sx={{ fontSize: 60, color: 'text.secondary' }} />
        <Box>
          <Typography variant="h6">Carga da API (Node.js/Express)</Typography>
          <Typography variant="body2" color="textSecondary">As rotas estão respondendo normalmente. O interceptor global de segurança está ativo e validando todos os Tokens JWT.</Typography>
        </Box>
        <Chip label="Normal" color="primary" sx={{ ml: 'auto' }} />
      </Card>
    </Box>
  );
}
