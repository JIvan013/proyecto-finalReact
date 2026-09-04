const API_URL = import.meta.env.VITE_API_URL || 'https://d3ujwk09smrk9z.cloudfront.net';

export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');

  if (token) headers.set('Authorization', `Bearer ${token}`);

  const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });

  if (response.status === 401) {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('auth:logout'));
  }

  if (!response.ok) {
    let message = `Error ${response.status}: ${response.statusText}`;
    try {
      const data = await response.json();
      message = data.message || data.error || message;
    } catch (_) {}
    throw new Error(message);
  }

  if (response.status === 204) return null;
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}
