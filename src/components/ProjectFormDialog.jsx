import { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

export default function ProjectFormDialog({ open, project, onClose, onSave }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  useEffect(() => { setName(project?.name || ''); setDescription(project?.description || ''); }, [project, open]);
  const save = () => onSave({ name, description });
  return <Dialog open={open} onClose={onClose} fullWidth>
    <DialogTitle>{project ? 'Editar proyecto' : 'Nuevo proyecto'}</DialogTitle>
    <DialogContent>
      <TextField fullWidth margin="normal" label="Nombre" value={name} onChange={e => setName(e.target.value)} required />
      <TextField fullWidth margin="normal" label="Descripción" multiline rows={3} value={description} onChange={e => setDescription(e.target.value)} />
    </DialogContent>
    <DialogActions><Button onClick={onClose}>Cancelar</Button><Button variant="contained" onClick={save} disabled={!name.trim()}>Guardar</Button></DialogActions>
  </Dialog>;
}
