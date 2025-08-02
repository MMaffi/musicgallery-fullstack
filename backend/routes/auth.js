const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/conn');
const router = express.Router();

const SECRET = process.env.JWT_SECRET || 'sua_chave_secreta';

// Registro
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Dados incompletos' });

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error('Erro ao gerar hash:', err);
      return res.status(500).json({ message: 'Erro no servidor' });
    }

    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(sql, [name, email, hash], (error, results) => {
      if (error) {
        console.error('Erro ao inserir usuário:', error);
        if (error.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ message: 'E-mail já cadastrado' });
        }
        return res.status(500).json({ message: 'Erro no servidor' });
      }

      res.status(201).json({ message: 'Usuário registrado com sucesso' });
    });
  });
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error('Erro ao consultar usuário:', err);
      return res.status(500).json({ message: 'Erro no servidor' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (bcryptErr, match) => {
      if (bcryptErr) {
        console.error('Erro ao comparar senha:', bcryptErr);
        return res.status(500).json({ message: 'Erro no servidor' });
      }

      if (!match) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      const token = jwt.sign({ id: user.id, name: user.name }, SECRET, { expiresIn: '1d' });
      return res.status(200).json({ token, name: user.name });
    });
  });
});

module.exports = router;