import React, { useState, useContext } from 'react';
import Navbar from '../components/navbar';
import '../styles/register.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function LoginPage() {
  const { setUser } = useContext(AuthContext); // pega setUser do contexto
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [status, setStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      if (res.ok) {
        const data = await res.json();

        setUser({ name: data.name });

        setStatus('success');
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        const data = await res.json();
        setErrorMessage(data.message || 'Erro no login');
        setStatus('error');
      }
    } catch (err) {
      setErrorMessage('Erro na conexão');
      setStatus('error');
    }
  };

  return (
    <>
      <Navbar subtitle="Login" />
      <main className='register-container'>
        <div className="register-page">
          <h2>Entrar</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">E-mail:</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder='Ex: joao@email.com'
              value={formData.email}
              onChange={handleChange}
              autoComplete='off'
              required
            />
            <label htmlFor="password">Senha:</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder='Ex: 123456'
              value={formData.password}
              onChange={handleChange}
              autoComplete='off'
              required
            />
            <button type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="status-message">
            {status === 'success' && <p className="success-msg">Login realizado com sucesso!</p>}
            {status === 'error' && <p className="error-msg">{errorMessage}</p>}
          </div>

          <p className='linklogin'>
            Ainda não tem cadastro? Faça <NavLink to="/register">Registro</NavLink>
          </p>
        </div>
      </main>
    </>
  );
}

export default LoginPage;