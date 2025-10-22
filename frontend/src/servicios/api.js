const BASE = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '');
const PREFIX = (import.meta.env.VITE_API_PREFIX || '').replace(/^([^/])/, '/$1').replace(/\/$/, '');

export const API = (path, opts = {}) => {
  const url = `${BASE}${PREFIX}${path}`;
  return fetch(url, {
    headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
    credentials: 'include',
    ...opts,
  });
};
export default API;
