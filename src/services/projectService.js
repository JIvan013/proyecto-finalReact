import { apiRequest } from './api';

export const getProjects = () => apiRequest('/projects');
export const getProject = (id) => apiRequest(`/projects/${id}`);
export const createProject = (data) => apiRequest('/projects', { method: 'POST', body: JSON.stringify(data) });
export const updateProject = (id, data) => apiRequest(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteProject = (id) => apiRequest(`/projects/${id}`, { method: 'DELETE' });
