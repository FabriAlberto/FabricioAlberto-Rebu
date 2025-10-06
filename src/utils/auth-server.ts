import { cookies } from 'next/headers';
import { AUTH_TOKEN } from './auth';

export function getAuthTokenServer() {
  const cookieStore = cookies();
  return cookieStore.get('auth-token')?.value;
}

export function isAuthenticatedServer() {
  const token = getAuthTokenServer();
  return token === AUTH_TOKEN;
}
