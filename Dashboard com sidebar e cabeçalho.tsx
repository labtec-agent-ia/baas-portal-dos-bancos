// src/pages/Dashboard.tsx
import { Box, AppBar, Toolbar, Typography, Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const drawerWidth = 240;

export default function Dashboard() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('clientes');

  const handleNav = (page: string) => {
    setSelected(page);
    navigate(`/${page}`);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Portal Bancário
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" sx={{ width: drawerWidth, flexShrink: 0 }}>
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['clientes', 'transações', 'chaves-pix', 'relatórios'].map((text) => (
              <ListItemButton key={text} selected={selected === text} onClick={() => handleNav(text)}>
                <ListItemText primary={text.charAt(0).toUpperCase() + text.slice(1)} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: `${drawerWidth}px` }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
