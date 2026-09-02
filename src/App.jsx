import { useState } from 'react';
import { Button, Box, Typography, CircularProgress, Alert, Paper } from '@mui/material';

function App() {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGetInfo = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://d3ujwk09smrk9z.cloudfront.net/info');
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setInfo(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        p: 4,
        maxWidth: 600,
        mx: 'auto',
      }}
    >
      <Typography variant="h4">Info del servicio</Typography>

      <Button variant="contained" onClick={handleGetInfo} disabled={loading}>
        {loading ? 'Cargando...' : 'Obtener info'}
      </Button>

      {loading && <CircularProgress />}

      {error && (
        <Alert severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      )}

      {info && (
        <Paper elevation={2} sx={{ p: 2, width: '100%' }}>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {JSON.stringify(info, null, 2)}
          </pre>
        </Paper>
      )}
    </Box>
  );
}

export default App;