import { Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const nextStatus = task.status === 'TODO' ? 'IN_PROGRESS' : task.status === 'IN_PROGRESS' ? 'DONE' : 'TODO';
  return <Card><CardContent>
    <Typography variant="h6">{task.title}</Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{task.description || 'Sin descripción'}</Typography>
    <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
      <Chip label={task.status || 'TODO'} size="small" />
      <Chip label={task.priority || 'MEDIUM'} size="small" variant="outlined" />
      <Chip label={task.project?.name || (task.projectId ? `Proyecto #${task.projectId}` : 'Sin proyecto')} size="small" variant="outlined" />
    </Stack>
    <Stack direction="row" spacing={1} flexWrap="wrap">
      <Button size="small" variant="outlined" onClick={() => onStatusChange(nextStatus)}>Estado → {nextStatus}</Button>
      <Button size="small" onClick={onEdit}>Editar</Button>
      <Button size="small" color="error" onClick={onDelete}>Eliminar</Button>
    </Stack>
  </CardContent></Card>;
}
