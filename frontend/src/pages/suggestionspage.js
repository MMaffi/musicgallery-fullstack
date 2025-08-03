import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/style.css';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

function SuggestionsPage() {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const hasWarnedRef = useRef(false);

  useEffect(() => {
    if (!loading && !user && !hasWarnedRef.current) {
      toast.warning('Você precisa estar logado para acessar esta página.');
      hasWarnedRef.current = true;
      navigate('/login');
    }
  }, [user, loading, navigate]);

  const [formData, setFormData] = useState({
    song: '',
    artist: '',
    suggestion: ''
  });

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);

    try {
      const res = await fetch('http://localhost:3000/api/suggestions/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          name: user.name,
          email: user.email
        })
      });

      if (res.ok) {
        toast.success('Obrigado pela sugestão! 🎶');
        setFormData({ song: '', artist: '', suggestion: '' });
      } else {
        toast.error('Ocorreu um erro ao enviar a sugestão.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Erro na conexão com o servidor.');
    } finally {
      setLoadingSubmit(false);
    }
  };

  if (loading) {
    return <main className="suggestions-main"><p>Carregando...</p></main>;
  }

  return (
    <main className="suggestions-main">
      <section className="suggestion-form">
        <h2>Sugira uma música para o próximo cover 🎤</h2>
        <form onSubmit={handleSubmit}>
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

          <button type="submit" disabled={loadingSubmit}>
            {loadingSubmit ? 'Enviando...' : 'Enviar sugestão'}
          </button>
        </form>
      </section>
    </main>
  );
}

export default SuggestionsPage;