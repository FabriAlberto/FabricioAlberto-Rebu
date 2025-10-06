export const AUTH_CREDENTIALS = {
  email: 'admin@rebuhr.com',
  password: 'password123'
};

export const AUTH_TOKEN = 'auth-token-12345';

// Funciones para el cliente (browser)
export function setAuthCookieClient() {
  if (typeof window !== 'undefined') {
    document.cookie = `auth-token=${AUTH_TOKEN}; path=/; max-age=604800; SameSite=Lax`;
  }
}

export function clearAuthCookieClient() {
  if (typeof window !== 'undefined') {
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}

export function getAuthTokenClient() {
  if (typeof window !== 'undefined') {
    const cookies = document.cookie.split(';');
    const authCookie = cookies.find(cookie => cookie.trim().startsWith('auth-token='));
    return authCookie ? authCookie.split('=')[1] : null;
  }
  return null;
}

export function isAuthenticatedClient() {
  const token = getAuthTokenClient();
  return token === AUTH_TOKEN;
}
