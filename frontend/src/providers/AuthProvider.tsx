import { createContext, useState, useEffect, useRef, ReactNode } from 'react';
import keycloak from '../config/keycloak';
import { CircularProgress, Box, Typography } from '@mui/material';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | undefined;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  token: undefined,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | undefined>(undefined);
  const isRun = useRef(false);

  useEffect(() => {
    if (isRun.current) return;
    isRun.current = true;

    // Inicializa o Keycloak sem iframe de background para evitar bloqueio de CSP.
    // O usuário fará o login manual ao clicar no botão "Entrar".
    keycloak.init({ 
      pkceMethod: 'S256',
      checkLoginIframe: false
    })
      .then((authenticated: boolean) => {
        setIsAuthenticated(authenticated);
        setToken(keycloak.token);
        setIsInitialized(true);

        keycloak.onTokenExpired = () => {
          keycloak.updateToken(30).then((refreshed: boolean) => {
            if (refreshed) {
              setToken(keycloak.token);
            }
          }).catch(() => {
            keycloak.logout();
          });
        };
      })
      .catch((err: any) => {
        console.error("Erro no init do Keycloak:", err);
        setInitError(err?.error || err?.message || JSON.stringify(err) || "Falha de conexão com servidor de autenticação");
        setIsInitialized(true);
      });
  }, []);

  if (!isInitialized) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Conectando à Central de Segurança (Keycloak)...</Typography>
      </Box>
    );
  }

  if (initError) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'center', alignItems: 'center', p: 3, textAlign: 'center' }}>
        <Typography color="error" variant="h5" fontWeight="bold">Erro Crítico de Segurança</Typography>
        <Typography sx={{ mt: 2, color: 'text.secondary' }}>O servidor do Keycloak rejeitou a conexão:</Typography>
        <Typography sx={{ mt: 1, p: 2, bgcolor: '#ffdddd', borderRadius: 1, fontFamily: 'monospace', color: '#900' }}>{initError}</Typography>
      </Box>
    );
  }

  const login = () => keycloak.login();
  const logout = () => keycloak.logout();

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
