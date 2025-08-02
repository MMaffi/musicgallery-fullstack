const API_URL = 'http://localhost:3000/api/auth';

export async function login(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || 'Erro no login');
  }

  const data = await res.json();
  return data;
}

export async function register(name, email, password) {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || 'Erro no registro');
  }

  const data = await res.json();
  return data;
}

export async function logout() {
  const res = await fetch(`${API_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || 'Erro ao sair');
  }

  return await res.json();
}