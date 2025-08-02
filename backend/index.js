const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./db/conn');

const app = express();

app.use(cors());
app.use(express.json());

// Exemplo de rota inicial
app.get('/', (req, res) => {
    res.send('Music Gallery API funcionando!');
});

// Porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

// Rota de musicas
const musicRoutes = require('./routes/musics');
app.use('/api/musics', musicRoutes);

// Rota da api youtube
const youtubeRoutes = require('./routes/youtube');
app.use('/api/youtube', youtubeRoutes);

// Rota da suggestionspage
const suggestionRoutes = require('./routes/suggestions');
app.use('/api/suggestions', suggestionRoutes);

// Rota de Registro/Login
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);