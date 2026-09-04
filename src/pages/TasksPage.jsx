import { Alert, Box, Button, CircularProgress, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import TaskCard from '../components/TaskCard';
import TaskFormDialog from '../components/TaskFormDialog';

export default function TasksPage({ taskState, projects }) {
  const { tasks, loading, error, addTask, editTask, changeStatus, removeTask, loadTasks } = taskState;
  const [status, setStatus] = useState(''); const [priority, setPriority] = useState('');
  const [open, setOpen] = useState(false); const [selected, setSelected] = useState(null);
  const applyFilters = () => loadTasks({ status, priority });
  const save = async data => { if (selected) await editTask(selected.id, data); else await addTask(data); setOpen(false); };
  return <Box>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}><Typography variant="h4">Tareas</Typography><Button variant="contained" onClick={() => { setSelected(null); setOpen(true); }}>+ Nueva tarea</Button></Box>
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
      <TextField select label="Estado" value={status} onChange={e => setStatus(e.target.value)} sx={{ minWidth: 180 }}><MenuItem value="">Todos</MenuItem><MenuItem value="TODO">TODO</MenuItem><MenuItem value="IN_PROGRESS">IN_PROGRESS</MenuItem><MenuItem value="DONE">DONE</MenuItem></TextField>
      <TextField select label="Prioridad" value={priority} onChange={e => setPriority(e.target.value)} sx={{ minWidth: 180 }}><MenuItem value="">Todas</MenuItem><MenuItem value="LOW">LOW</MenuItem><MenuItem value="MEDIUM">MEDIUM</MenuItem><MenuItem value="HIGH">HIGH</MenuItem></TextField>
      <Button variant="outlined" onClick={applyFilters}>Aplicar filtros</Button><Button onClick={() => { setStatus(''); setPriority(''); loadTasks(); }}>Limpiar</Button>
    </Box>
    {loading && <CircularProgress />}{error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
    {!loading && !error && tasks.length === 0 && <Alert severity="info">No hay tareas.</Alert>}
    <Grid container spacing={2}>{tasks.map(t => <Grid key={t.id} size={{ xs: 12, md: 6 }}><TaskCard task={t} onEdit={() => { setSelected(t); setOpen(true); }} onDelete={async () => { if (confirm('¿Eliminar esta tarea?')) await removeTask(t.id); }} onStatusChange={s => changeStatus(t.id, s)} /></Grid>)}</Grid>
    <TaskFormDialog open={open} task={selected} projects={projects} onClose={() => setOpen(false)} onSave={save} />
  </Box>;
}
