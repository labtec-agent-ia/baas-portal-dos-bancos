import { useState, useEffect } from 'react';

import {
  Box,
  Typography,
  Card,
  Grid,
  CardContent,
  IconButton,
  CircularProgress,
  Chip
} from '@mui/material';
import {
  ContentCopy as CopyIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Fingerprint as CpfIcon,
  Shuffle as RandomIcon
} from '@mui/icons-material';

export default function PixKeys() {
  const [keys, setKeys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock de chaves PIX
    const mockKeys = [
      { id: 1, key_type: 'cpf', key_value: '123.456.789-00', owner: 'João Silva', status: 'active' },
      { id: 2, key_type: 'email', key_value: 'joao.silva@empresa.com.br', owner: 'João Silva', status: 'active' },
      { id: 3, key_type: 'phone', key_value: '+55 11 99999-9999', owner: 'João Silva', status: 'inactive' },
      { id: 4, key_type: 'random', key_value: 'e2b3c4d5-f6a7-8b9c-0d1e-2f3a4b5c6d7e', owner: 'João Silva', status: 'active' }
    ];

    setTimeout(() => {
      setKeys(mockKeys);
      setLoading(false);
    }, 1000);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'cpf': return <CpfIcon />;
      case 'email': return <EmailIcon />;
      case 'phone': return <PhoneIcon />;
      default: return <RandomIcon />;
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>Gerenciamento de Chaves PIX</Typography>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {keys.map((pix) => (
            <Grid item xs={12} sm={6} md={4} key={pix.id}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Box sx={{ color: 'primary.main', display: 'flex' }}>
                    {getIcon(pix.key_type)}
                  </Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, textTransform: 'uppercase' }}>
                    {pix.key_type}
                  </Typography>
                  <Chip 
                    label={pix.status} 
                    size="small" 
                    color={pix.status === 'active' ? 'success' : 'default'} 
                    sx={{ ml: 'auto', height: 20, fontSize: '0.7rem' }} 
                  />
                </Box>
                
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Titular: {pix.owner}
                </Typography>
                
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  bgcolor: 'background.default',
                  p: 1.5,
                  borderRadius: 2,
                  mt: 2
                }}>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', wordBreak: 'break-all', mr: 2 }}>
                    {pix.key_value}
                  </Typography>
                  <IconButton size="small" color="primary">
                    <CopyIcon fontSize="small" />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      )}
    </Box>
  );
}
