import { useEffect, useState } from 'react';
import { login, logout } from '../services/authService';

export function useAuth() {
  const [authenticated, setAuthenticated] = useState(Boolean(localStorage.getItem('token')));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signIn = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      await login(username, password);
      setAuthenticated(true);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    logout();
    setAuthenticated(false);
  };

  useEffect(() => {
    const handleLogout = () => setAuthenticated(false);
    window.addEventListener('auth:logout', handleLogout);
    return () => window.removeEventListener('auth:logout', handleLogout);
  }, []);

  return { authenticated, loading, error, signIn, signOut };
}
