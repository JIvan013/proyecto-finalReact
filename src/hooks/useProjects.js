import { useCallback, useEffect, useState } from 'react';
import { createProject, deleteProject, getProjects, updateProject } from '../services/projectService';

export function useProjects(enabled = true) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadProjects = useCallback(async () => {
    if (!enabled) return;
    setLoading(true); setError(null);
    try {
      const data = await getProjects();
      setProjects(Array.isArray(data) ? data : data?.content || data?.projects || []);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }, [enabled]);

  useEffect(() => { loadProjects(); }, [loadProjects]);

  return {
    projects, loading, error, loadProjects,
    addProject: async (data) => { await createProject(data); await loadProjects(); },
    editProject: async (id, data) => { await updateProject(id, data); await loadProjects(); },
    removeProject: async (id) => { await deleteProject(id); await loadProjects(); },
  };
}
