import { apiRequest } from './api';

export async function login(username, password) {
  const data = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
  localStorage.setItem('token', data.token);
  localStorage.setItem('username', username);
  return data;
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem('token'));
}
