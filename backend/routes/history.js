const express = require('express');
const router = express.Router();
const pool = require('../db/conn');

// Middleware de autenticação
const requireAuth = require('../middleware/auth');

// GET: histórico do usuário
router.get('/', requireAuth, async (req, res) => {
  const { id } = req.user;
  const [rows] = await pool.query(
    'SELECT term FROM search_history WHERE user_id = ? ORDER BY timestamp DESC LIMIT 10',
    [id]
  );
  res.json(rows.map(row => row.term));
});

// POST: adicionar novo termo
router.post('/', requireAuth, async (req, res) => {
  const { id } = req.user;
  const { term } = req.body;

  if (!term || term.trim().length < 2) {
    return res.status(400).json({ error: 'Search term is too short' });
  }

  const trimmedTerm = term.trim();

  // Verifica se o último termo é igual ao atual
  const [lastSearch] = await pool.query(
    'SELECT term FROM search_history WHERE user_id = ? ORDER BY timestamp DESC LIMIT 1',
    [id]
  );

  if (lastSearch.length > 0 && lastSearch[0].term === trimmedTerm) {
    return res.status(200).json({ message: 'Term already saved recently' });
  }

  // Insere novo termo
  await pool.query(
    'INSERT INTO search_history (user_id, term) VALUES (?, ?)',
    [id, trimmedTerm]
  );

  // Remove termos mais antigos se exceder 50
  await pool.query(
    `DELETE FROM search_history
     WHERE user_id = ?
     AND id NOT IN (
       SELECT id FROM (
         SELECT id FROM search_history
         WHERE user_id = ?
         ORDER BY timestamp DESC
         LIMIT 50
       ) AS sub
     )`,
    [id, id]
  );

  res.status(201).json({ success: true });
});

module.exports = router;