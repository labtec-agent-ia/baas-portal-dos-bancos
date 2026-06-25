import { Box, Typography, Grid, Card, CardContent, Chip, LinearProgress } from '@mui/material';
import { Settings as SettingsIcon, Storage as StorageIcon, Security as SecurityIcon, NetworkCheck as NetworkCheckIcon } from '@mui/icons-material';

export default function AdminDashboard() {
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
