import { Alert, Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import ProjectFormDialog from '../components/ProjectFormDialog';
import ProjectTasksDialog from '../components/ProjectTasksDialog';

export default function ProjectsPage({ projectState }) {
  const { projects, loading, error, addProject, editProject, removeProject } = projectState;
  const [open, setOpen] = useState(false); const [selected, setSelected] = useState(null);
  const [tasksProject, setTasksProject] = useState(null);
  const save = async data => { if (selected) await editProject(selected.id, data); else await addProject(data); setOpen(false); };
  return <Box>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}><Typography variant="h4">Proyectos</Typography><Button variant="contained" onClick={() => { setSelected(null); setOpen(true); }}>+ Nuevo proyecto</Button></Box>
    {loading && <CircularProgress />}{error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
    {!loading && !error && projects.length === 0 && <Alert severity="info">No hay proyectos.</Alert>}
    <Grid container spacing={2}>{projects.map(p => <Grid key={p.id} size={{ xs: 12, md: 6, lg: 4 }}><ProjectCard project={p} onTasks={() => setTasksProject(p)} onEdit={() => { setSelected(p); setOpen(true); }} onDelete={async () => { if (confirm('¿Eliminar este proyecto?')) await removeProject(p.id); }} /></Grid>)}</Grid>
    <ProjectFormDialog open={open} project={selected} onClose={() => setOpen(false)} onSave={save} />
    <ProjectTasksDialog open={Boolean(tasksProject)} project={tasksProject} projects={projects} onClose={() => setTasksProject(null)} />
  </Box>;
}
