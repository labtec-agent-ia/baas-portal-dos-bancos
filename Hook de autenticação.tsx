// src/hooks/useAuth.ts
import { useEffect, useState } from 'react';
import axios from 'axios';

export function useAuth() {
  const [isAuthenticated, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/api/me')
      .then(() => setAuth(true))
      .catch(() => setAuth(false))
      .finally(() => setLoading(false));
  }, []);

  return { isAuthenticated, loading };
}
