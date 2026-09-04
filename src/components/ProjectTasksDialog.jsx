import { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TaskFormDialog from './TaskFormDialog';
import { createProjectTask, deleteTask, getProjectTasks, updateTask } from '../services/taskService';

export default function ProjectTasksDialog({ open, project, projects = [] , onClose }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const loadTasks = useCallback(async () => {
    if (!project?.id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getProjectTasks(project.id);
      setTasks(Array.isArray(data) ? data : data?.content || data?.tasks || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [project?.id]);

  useEffect(() => {
    if (open) loadTasks();
    else {
      setTasks([]);
      setError(null);
      setTaskDialogOpen(false);
      setSelectedTask(null);
    }
  }, [open, loadTasks]);

  const saveTask = async (data) => {
    if (!project?.id) return;
    setSaving(true);
    setError(null);
    try {
      if (selectedTask) await updateTask(selectedTask.id, data);
      else await createProjectTask(project.id, data);
      setTaskDialogOpen(false);
      setSelectedTask(null);
      await loadTasks();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const removeTask = async (task) => {
    if (!window.confirm(`¿Eliminar la tarea "${task.title}"?`)) return;
    setError(null);
    try {
      await deleteTask(task.id);
      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  return <>
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        Tareas de {project?.name || 'proyecto'}
      </DialogTitle>
      <DialogContent dividers>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography color="text.secondary">
            {tasks.length} {tasks.length === 1 ? 'tarea' : 'tareas'} asociadas
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => { setSelectedTask(null); setTaskDialogOpen(true); }}
          >
            Nueva tarea
          </Button>
        </Stack>

        {loading && <Box sx={{ display: 'grid', placeItems: 'center', py: 4 }}><CircularProgress /></Box>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {!loading && !error && tasks.length === 0 && (
          <Alert severity="info">Este proyecto todavía no tiene tareas.</Alert>
        )}

        {!loading && tasks.length > 0 && (
          <List disablePadding>
            {tasks.map((task, index) => <Box key={task.id}>
              {index > 0 && <Divider />}
              <ListItem
                secondaryAction={<Stack direction="row" spacing={0.5}>
                  <Tooltip title="Editar tarea">
                    <IconButton onClick={() => { setSelectedTask(task); setTaskDialogOpen(true); }}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar tarea">
                    <IconButton color="error" onClick={() => removeTask(task)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>}
              >
                <ListItemText
                  primary={task.title}
                  secondary={task.description || 'Sin descripción'}
                  sx={{ pr: 10 }}
                />
                <Stack direction="row" spacing={1} sx={{ mr: 1 }}>
                  <Chip label={task.status || 'TODO'} size="small" />
                  <Chip label={task.priority || 'MEDIUM'} size="small" variant="outlined" />
                </Stack>
              </ListItem>
            </Box>)}
          </List>
        )}
      </DialogContent>
      <DialogActions><Button onClick={onClose}>Cerrar</Button></DialogActions>
    </Dialog>

    <TaskFormDialog
      open={taskDialogOpen}
      task={selectedTask}
      projects={projects}
      projectId={project?.id}
      lockProject
      onClose={() => { if (!saving) { setTaskDialogOpen(false); setSelectedTask(null); } }}
      onSave={saveTask}
      saving={saving}
    />
  </>;
}
