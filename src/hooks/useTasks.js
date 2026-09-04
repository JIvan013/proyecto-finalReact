import { useCallback, useEffect, useState } from 'react';
import { createTask, deleteTask, getTasks, updateTask, updateTaskStatus } from '../services/taskService';

export function useTasks(enabled = true) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadTasks = useCallback(async (filters = {}) => {
    if (!enabled) return;
    setLoading(true); setError(null);
    try {
      const data = await getTasks(filters);
      setTasks(Array.isArray(data) ? data : data?.content || data?.tasks || []);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }, [enabled]);

  useEffect(() => { loadTasks(); }, [loadTasks]);

  return {
    tasks, loading, error, loadTasks,
    addTask: async (data) => { await createTask(data); await loadTasks(); },
    editTask: async (id, data) => { await updateTask(id, data); await loadTasks(); },
    changeStatus: async (id, status) => { await updateTaskStatus(id, status); await loadTasks(); },
    removeTask: async (id) => { await deleteTask(id); await loadTasks(); },
  };
}
