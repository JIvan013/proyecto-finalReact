import { apiRequest } from './api';

export const getTasks = (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.status) params.set('status', filters.status);
  if (filters.priority) params.set('priority', filters.priority);
  const query = params.toString();
  return apiRequest(`/tasks${query ? `?${query}` : ''}`);
};

export const getTask = (id) => apiRequest(`/tasks/${id}`);

export const createTask = (data) => apiRequest('/tasks', {
  method: 'POST',
  body: JSON.stringify(data),
});

export const getProjectTasks = (projectId) => apiRequest(`/projects/${projectId}/tasks`);
export const createProjectTask = (projectId, data) => apiRequest(`/projects/${projectId}/tasks`, {
  method: 'POST',
  body: JSON.stringify(data),
});

export const updateTask = (id, data) => apiRequest(`/tasks/${id}`, {
  method: 'PUT',
  body: JSON.stringify(data),
});

export const updateTaskStatus = (id, status) => apiRequest(`/tasks/${id}/status`, {
  method: 'PATCH',
  body: JSON.stringify({ status }),
});

export const deleteTask = (id) => apiRequest(`/tasks/${id}`, {
  method: 'DELETE',
});
