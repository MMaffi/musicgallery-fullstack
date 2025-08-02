import React, { useState } from 'react';
import '../styles/style.css';

function SuggestionsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    song: '',
    artist: '',
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
        setFormData({
          name: '',
          email: '',
          song: '',
          artist: '',
          suggestion: ''
        });
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
          <label htmlFor="name">Seu nome:</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Ex: João"
            value={formData.name}
            onChange={handleChange}
            autoComplete="off"
            required
          />

          <label htmlFor="email">Seu e-mail:</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Ex: joao@email.com"
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
            required
          />

          <label htmlFor="song">Nome da música:</label>
          <input
            id="song"
            type="text"
            name="song"
            placeholder="Ex: Trem Bala"
            value={formData.song}
            onChange={handleChange}
            autoComplete="off"
            required
          />

          <label htmlFor="artist">Nome do cantor ou banda:</label>
          <input
            id="artist"
            type="text"
            name="artist"
            placeholder="Ex: Ana Vilela"
            value={formData.artist}
            onChange={handleChange}
            autoComplete="off"
            required
          />

          <label htmlFor="suggestion">Comentário (opcional):</label>
          <textarea
            id="suggestion"
            name="suggestion"
            placeholder="Algo que queira comentar sobre a sugestão?"
            value={formData.suggestion}
            onChange={handleChange}
            autoComplete="off"
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