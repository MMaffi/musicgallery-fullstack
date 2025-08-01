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

const musicRoutes = require('./routes/musics');
app.use('/api/musics', musicRoutes);

const youtubeRoutes = require('./routes/youtube');
app.use('/api/youtube', youtubeRoutes);