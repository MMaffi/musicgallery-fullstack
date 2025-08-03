import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; 
import { logout } from '../services/authService';
import { toast } from 'react-toastify';

function LogoutButton() {
  const { setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('username');

      toast.success('Logout realizado com sucesso!');

      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } catch (err) {
      console.error('Erro ao fazer logout', err);
      toast.error('Erro ao fazer logout');
    }
  };

  return (
    <button onClick={handleLogout}>
      Sair
    </button>
  );
}

export default LogoutButton;