
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; 
import { logout } from '../services/authService';

function LogoutButton() {
  const { setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    } catch (err) {
      console.error('Erro ao fazer logout', err);
    }
  };

  return (
    <button onClick={handleLogout}>
      Sair
    </button>
  );
}

export default LogoutButton;
