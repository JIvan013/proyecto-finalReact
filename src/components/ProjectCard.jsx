import { Button, Card, CardContent, Stack, Typography } from '@mui/material';
export default function ProjectCard({ project, onEdit, onDelete, onTasks }) {
  return <Card><CardContent>
    <Typography variant="h6">{project.name}</Typography>
    <Typography color="text.secondary" sx={{ minHeight: 48 }}>{project.description || 'Sin descripción'}</Typography>
    <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
      <Button size="small" variant="outlined" onClick={onTasks}>Tareas</Button><Button size="small" onClick={onEdit}>Editar</Button>
      <Button size="small" color="error" onClick={onDelete}>Eliminar</Button>
    </Stack>
  </CardContent></Card>;
}
