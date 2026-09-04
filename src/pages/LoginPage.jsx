import { Box } from '@mui/material';
import LoginForm from '../components/LoginForm';
export default function LoginPage({ onLogin, loading, error }) {
  return <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', p: 2 }}><LoginForm onLogin={onLogin} loading={loading} error={error} /></Box>;
}
