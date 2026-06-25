import { Box, Button, Typography, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleKeycloakLogin = () => {
    login();
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default' }}>
      <Card sx={{ width: 400, p: 4, borderRadius: 4 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, textAlign: 'center' }}>
          Acesso Seguro
        </Typography>

        <Button 
          variant="contained" 
          size="large" 
          fullWidth 
          onClick={handleKeycloakLogin}
          sx={{ py: 1.5, fontWeight: 'bold' }}
        >
          Fazer Login Seguro
        </Button>

        <Button 
          variant="text" 
          fullWidth 
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Voltar para Início
        </Button>
      </Card>
    </Box>
  );
}
