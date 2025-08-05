import axios from 'axios';

const LOCAL_STORAGE_KEY = 'search_history';
const MAX_HISTORY = 50;

export async function getSearchHistory(user) {
  if (!user) {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
  }

  try {
    const res = await axios.get('http://localhost:3000/api/history', { withCredentials: true });
    return res.data;
  } catch (error) {
    console.error('Erro ao buscar histórico do banco:', error);
    return [];
  }
}

export async function addSearchTerm(term, user) {
  if (!term || !term.trim()) return;

  term = term.trim();

  if (!user) {
    const current = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');

    // Remove duplicatas
    const updated = [term, ...current.filter(t => t.toLowerCase() !== term.toLowerCase())];

    // Limita a 50 entradas
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated.slice(0, MAX_HISTORY)));
    return;
  }

  try {
    await axios.post('/api/history', { term });
  } catch (error) {
    console.error('Erro ao salvar termo no banco:', error);
  }
}

export function clearSearchHistory(user) {
  if (!user) {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } else {
    console.warn('Limpar histórico do banco ainda não implementado');
  }
}