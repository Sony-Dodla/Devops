export function setAuth(token, user) {
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("user", JSON.stringify(user));
}

export function clearAuth() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
}

export function getToken() {
  return sessionStorage.getItem("token");
}

export function getUser() {
  const raw = sessionStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
}

// Decode JWT payload to check exp (no extra library)
export function parseJwt(token) {
  try {
    const payloadBase64 = token.split(".")[1];
    const payloadJson = atob(payloadBase64.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(payloadJson);
  } catch {
    return null;
  }
}

export function isTokenExpired(token) {
  const payload = parseJwt(token);
  if (!payload?.exp) return true; // if missing exp, treat as expired
  const now = Math.floor(Date.now() / 1000);
  return payload.exp <= now;
}

export function isAuthenticated() {
  const token = getToken();
  if (!token) return false;
  return !isTokenExpired(token);
}