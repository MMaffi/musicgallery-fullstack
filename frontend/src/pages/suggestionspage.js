import React, { useState } from 'react';

import '../styles/style.css';

function SuggestionsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    suggestion: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('enviando');

    try {
      const res = await fetch('http://localhost:3000/api/suggestions/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatus('sucesso');
        setFormData({ name: '', email: '', suggestion: '' });
      } else {
        setStatus('erro');
      }
    } catch (err) {
      console.error('Erro ao enviar:', err);
      setStatus('erro');
    }
  };

  return (
    <main className="suggestions-main">
      <section className="suggestion-form">
        <h2>Sugira uma música para o próximo cover 🎤</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Seu nome"
            value={formData.name}
            onChange={handleChange}
            autoComplete='off'
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Seu e-mail (opcional)"
            value={formData.email}
            onChange={handleChange}
            autoComplete='off'
          />
          <textarea
            name="suggestion"
            placeholder="Qual música você gostaria de ouvir?"
            value={formData.suggestion}
            onChange={handleChange}
            autoComplete='off'
            required
          ></textarea>
          <button type="submit">Enviar sugestão</button>
          {status === 'enviando' && <p>Enviando...</p>}
          {status === 'sucesso' && <p>Obrigado pela sugestão! 🎶</p>}
          {status === 'erro' && <p>Ocorreu um erro. Tente novamente.</p>}
        </form>
      </section>
    </main>
  );
}

export default SuggestionsPage;
