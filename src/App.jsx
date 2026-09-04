import { useState } from 'react';
import { AppBar, Box, Button, Container, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { useAuth } from './hooks/useAuth';
import { useProjects } from './hooks/useProjects';
import { useTasks } from './hooks/useTasks';
import LoginPage from './pages/LoginPage';
import ProjectsPage from './pages/ProjectsPage';
import TasksPage from './pages/TasksPage';

function App() {
  const auth = useAuth();
  const projects = useProjects(auth.authenticated);
  const tasks = useTasks(auth.authenticated);
  const [tab, setTab] = useState(0);

  if (!auth.authenticated) return <LoginPage onLogin={auth.signIn} loading={auth.loading} error={auth.error} />;

  return <>
    <AppBar position="static"><Toolbar><Typography variant="h6" sx={{ flexGrow: 1 }}>TaskFlow</Typography><Typography sx={{ mr: 2 }}>{localStorage.getItem('username')}</Typography><Button color="inherit" onClick={auth.signOut}>Cerrar sesión</Button></Toolbar></AppBar>
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Tabs value={tab} onChange={(_, value) => setTab(value)} sx={{ mb: 4 }}><Tab label="Proyectos" /><Tab label="Tareas" /></Tabs>
      <Box>{tab === 0 ? <ProjectsPage projectState={projects} /> : <TasksPage taskState={tasks} projects={projects.projects} />}</Box>
    </Container>
  </>;
}
export default App;
