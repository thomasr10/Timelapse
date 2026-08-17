import { getCsrfToken } from '../utils/csrf';

export function fetchWithCsrf(url: string, options: RequestInit = {}) {
  const csrfToken = getCsrfToken();
  console.log(csrfToken);
  

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
    },
  });
}