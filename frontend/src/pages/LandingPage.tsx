import { Box, Typography, Button, Container, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default' }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography variant="h2" color="primary" sx={{ fontWeight: 800, mb: 2 }}>
          BaaS Portal dos Bancos
        </Typography>
        <Typography variant="h5" color="textSecondary" sx={{ mb: 6 }}>
          A plataforma definitiva para gerenciar PIX, Clientes e Transações com segurança e agilidade.
        </Typography>
        <Stack direction="row" spacing={3} justifyContent="center">
          <Button variant="contained" size="large" onClick={() => navigate('/login')}>
            Acessar a Plataforma
          </Button>
          <Button variant="outlined" size="large" onClick={() => navigate('/dashboard')}>
            Ver Demonstração
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
