import { getCsrfToken } from '../utils/csrf';

export async function fetchWithCsrf(url: string, options: RequestInit = {}) {
  const csrfToken = getCsrfToken();

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
    },
  });

  if (response.status === 401 && window.location.pathname !== '/login') {
    window.location.href = '/login';
  }

  return response;
}