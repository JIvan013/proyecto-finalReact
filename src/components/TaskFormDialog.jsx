import { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material';

export default function TaskFormDialog({ open, task, projects, projectId, lockProject = false, onClose, onSave, saving = false }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [assigneeId, setAssigneeId] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    setTitle(task?.title || '');
    setDescription(task?.description || '');
    setPriority(task?.priority || 'MEDIUM');
    setSelectedProjectId(task?.projectId ? String(task.projectId) : (projectId ? String(projectId) : ''));
    setAssigneeId(task?.assigneeId ? String(task.assigneeId) : '');
    setDueDate(task?.dueDate || '');
  }, [task, open, projectId]);

  const save = () => onSave({
    title: title.trim(),
    description: description.trim(),
    priority,
    ...(assigneeId ? { assigneeId: Number(assigneeId) } : {}),
    ...(dueDate ? { dueDate } : {}),
    ...(selectedProjectId ? { projectId: Number(selectedProjectId) } : {}),
  });

  return <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
    <DialogTitle>{task ? 'Editar tarea' : 'Nueva tarea'}</DialogTitle>
    <DialogContent>
      <TextField fullWidth margin="normal" label="Título" value={title} onChange={e => setTitle(e.target.value)} required autoFocus />
      <TextField fullWidth margin="normal" label="Descripción" multiline rows={3} value={description} onChange={e => setDescription(e.target.value)} />
      <TextField select fullWidth margin="normal" label="Prioridad" value={priority} onChange={e => setPriority(e.target.value)}>
        <MenuItem value="LOW">LOW</MenuItem>
        <MenuItem value="MEDIUM">MEDIUM</MenuItem>
        <MenuItem value="HIGH">HIGH</MenuItem>
      </TextField>
      <TextField
        select fullWidth margin="normal" label="Proyecto" value={selectedProjectId}
        onChange={e => setSelectedProjectId(e.target.value)} disabled={lockProject}
        helperText={lockProject ? 'La tarea se está administrando dentro de este proyecto.' : ''}
      >
        <MenuItem value="">Sin proyecto</MenuItem>
        {projects.map(p => <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>)}
      </TextField>
      <TextField fullWidth margin="normal" label="Assignee ID (opcional)" type="number" value={assigneeId} onChange={e => setAssigneeId(e.target.value)} />
      <TextField fullWidth margin="normal" label="Fecha límite" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} InputLabelProps={{ shrink: true }} />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} disabled={saving}>Cancelar</Button>
      <Button variant="contained" onClick={save} disabled={saving || title.trim().length < 3}>
        {saving ? 'Guardando...' : 'Guardar'}
      </Button>
    </DialogActions>
  </Dialog>;
}
