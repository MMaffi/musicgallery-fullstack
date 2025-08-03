const express = require('express');
const router = express.Router();
const db = require('../db/conn');
const authenticate = require('../middleware/auth');

router.get('/', authenticate, (req, res) => {
  const userId = req.user.id;

  const checkExisting = `
    SELECT s.key_name AS \`key\`, us.value
    FROM user_settings us
    JOIN settings s ON us.setting_id = s.id
    WHERE us.user_id = ?`;

  db.query(checkExisting, [userId], (err, results) => {
    if (err) {
      console.error('Erro no SELECT de configurações:', err);
      return res.status(500).json({ error: 'Erro ao verificar configurações' });
    }

    if (results.length > 0) {
      const settings = {};
      results.forEach(row => settings[row.key] = row.value);
      return res.json(settings);
    }

    const defaultValues = {
      theme: 'dark',
      language: 'pt',
      notifications: 'disable',
    };

    const getAllSettings = 'SELECT id, key_name FROM settings';
        db.query(getAllSettings, (err, settingRows) => {
        if (err) {
            console.error('Erro ao obter configurações padrão:', err);
            return res.status(500).json({ error: 'Erro ao obter configurações padrão' });
        }

        console.log('Configurações disponíveis:', settingRows);
        console.log('Valores padrões:', defaultValues);

        const insertValues = settingRows.map(row => {
            const value = defaultValues[row.key_name] || '';
            console.log(`Inserindo para ${row.key_name}:`, value);
            return [userId, row.id, value];
        });

        const insertQuery = 'INSERT INTO user_settings (user_id, setting_id, value) VALUES ?';

        db.query(insertQuery, [insertValues], (err) => {
            if (err) {
            console.error('Erro ao criar configurações padrão:', err);
            return res.status(500).json({ error: 'Erro ao criar configurações padrão' });
            }

            db.query(checkExisting, [userId], (err, results) => {
            if (err) return res.status(500).json({ error: 'Erro ao carregar configurações após criar' });
            const settings = {};
            results.forEach(row => settings[row.key] = row.value);
            res.json(settings);
            });
        });
    });
  });
});

router.post('/', authenticate, (req, res) => {
  const userId = req.user.id;
  const { key, value } = req.body;

  const getSettingId = 'SELECT id FROM settings WHERE `key_name` = ?';
  db.query(getSettingId, [key], (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ error: 'Configuração inválida' });
    }

    const settingId = results[0].id;
    const upsert = `
      INSERT INTO user_settings (user_id, setting_id, value)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE value = ?`;

    db.query(upsert, [userId, settingId, value, value], (err) => {
      if (err) return res.status(500).json({ error: 'Erro ao salvar configuração' });
      res.json({ message: 'Configuração salva com sucesso' });
    });
  });
});

module.exports = router;