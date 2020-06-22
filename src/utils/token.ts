import Cookies from 'js-cookie';

export const TOKEN_KEY = 'Authorization';

export function setToken(token: string) {
  Cookies.set(TOKEN_KEY, token, { expires: 1 });
}

export function getToken() {
  const token = Cookies.get(TOKEN_KEY);
  if (token) return token;
  return false;
}

export function removeToken() {
  const token = Cookies.get(TOKEN_KEY);
  if (token) {
    Cookies.remove(TOKEN_KEY);
  }
}
