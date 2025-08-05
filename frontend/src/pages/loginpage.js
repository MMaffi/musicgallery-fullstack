import React, { useState, useContext, useRef, useEffect } from 'react';
import '../styles/register.css';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

function LoginPage() {
  const { setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [status, setStatus] = useState(null);

  const emailInputRef = useRef(null);

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);

        setStatus('success');
        toast.success('Login realizado com sucesso!');

        // Aguarda um pouco e recarrega a página na home
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      } else {
        let errorMsg = 'Erro no login';
        try {
          const data = await res.json();
          if (data.message) errorMsg = data.message;
        } catch {
          const text = await res.text();
          if (text) errorMsg = text;
        }
        setStatus('error');
        toast.error(errorMsg);
      }
    } catch (err) {
      setStatus('error');
      toast.error('Erro na conexão');
    }
  };

  return (
    <>
      <main className='register-container'>
        <div className="register-page">
          <h2>Entrar</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">E-mail:</label>
            <input
              ref={emailInputRef}
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

          <p className='linklogin'>
            Ainda não tem cadastro? <NavLink to="/register">Cadastrar-se</NavLink>
          </p>
        </div>
      </main>
    </>
  );
}

export default LoginPage;