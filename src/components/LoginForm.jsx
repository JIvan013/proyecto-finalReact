import { useState } from 'react';
import { Alert, Box, Button, Paper, TextField, Typography } from '@mui/material';

export default function LoginForm({ onLogin, loading, error }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    await onLogin(username, password);
  };

  return <Paper elevation={4} sx={{ p: 4, width: '100%', maxWidth: 420 }}>
    <Typography variant="h4" gutterBottom>TaskFlow</Typography>
    <Typography color="text.secondary" sx={{ mb: 3 }}>Inicia sesión para administrar proyectos y tareas.</Typography>
    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
    <Box component="form" onSubmit={submit} sx={{ display: 'grid', gap: 2 }}>
      <TextField label="Usuario" value={username} onChange={e => setUsername(e.target.value)} required />
      <TextField label="Contraseña" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      <Button type="submit" variant="contained" disabled={loading}>{loading ? 'Iniciando...' : 'Iniciar sesión'}</Button>
    </Box>
  </Paper>;
}
