import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import '../styles/register.css';
import { NavLink, useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [status, setStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'success') {
      // Redireciona após 1.5 segundos para a página de login
      const timer = setTimeout(() => {
        navigate('/login');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [status, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', password: '' });
      } else {
        const data = await res.json();
        setErrorMessage(data.message || 'Erro ao registrar');
        setStatus('error');
      }
    } catch (err) {
      setErrorMessage('Erro na conexão');
      setStatus('error');
    }
  };

  return (
    <>
      <Navbar subtitle="Registro" />
      <main className='register-container'>
        <div className="register-page">
          <h2>Cadastrar-se</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Nome:</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder='Ex: João'
              value={formData.name}
              onChange={handleChange}
              autoComplete='off'
              required
            />

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
              {status === 'loading' ? 'Registrando...' : 'Registrar'}
            </button>
          </form>

          <div className="status-message">
            {status === 'success' && <p className="success-msg">Usuário registrado com sucesso! Redirecionando para login...</p>}
            {status === 'error' && <p className="error-msg">{errorMessage}</p>}
          </div>

          <p className='linklogin'>
            Já tem cadastro? Faça <NavLink to="/login">Login</NavLink>
          </p>
        </div>
      </main>
    </>
  );
}

export default RegisterPage;