import { createContext, useEffect, useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    if (!user) {
      setSettings({});  // limpa as configurações ao deslogar
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/settings', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      } else {
        setSettings({});
      }
    } catch (err) {
      console.error('Erro ao carregar configurações:', err);
      setSettings({});
    } finally {
      setLoading(false);
    }
  };

  // Atualiza uma configuração e salva no backend
  const updateSetting = async (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    try {
      const res = await fetch('http://localhost:3000/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value }),
        credentials: 'include',
      });
      if (!res.ok) {
        const data = await res.json();
        console.error('Erro ao salvar configuração:', data);
      }
    } catch (err) {
      console.error('Erro ao salvar configuração (fetch error):', err);
    }
  };

  // Recarrega as configurações quando usuário mudar (login/logout)
  useEffect(() => {
    setLoading(true);
    fetchSettings();
  }, [user]);

  useEffect(() => {
    const theme = settings.theme || 'dark';
    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.body.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
      document.body.setAttribute('data-theme', theme);
    }
  }, [settings.theme]);

  return (
    <SettingsContext.Provider value={{ settings, updateSetting, loading }}>
      {children}
    </SettingsContext.Provider>
  );
}