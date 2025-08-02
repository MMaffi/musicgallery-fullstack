const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/send', async (req, res) => {
  const { name, email, suggestion } = req.body;

  if (!name || !suggestion) {
    return res.status(400).json({ error: 'Nome e sugestão são obrigatórios.' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: `"Sugestão do site Music Gallery" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `Nova sugestão de música de ${name}`,
    text: `Nome: ${name}\nEmail: ${email || 'Não informado'}\n\nSugestão:\n${suggestion}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Sugestão enviada com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar sugestão:', error);
    res.status(500).json({ error: 'Erro ao enviar sugestão' });
  }
});

module.exports = router;