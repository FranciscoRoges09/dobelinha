require('dotenv').config();

const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/allow-pay', async (req, res) => {
  console.log('📦 Body recebido do front:', req.body);
  try {
    // Substituindo a URL do RealTechDev pela URL do Allow Pay
    const response = await fetch('https://api.allowpay.com.br/v1/transactions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.ALLOW_PAY_API_KEY}`,
        'Content-Type': 'application/json',
        'User-Agent': 'AllowPay API'
      },
      body: JSON.stringify({
        company_id: process.env.ALLOW_PAY_COMPANY_ID,
        ...req.body  // Inclui os dados recebidos do frontend
      })
    });

    const data = await response.json();
    console.log('✅ Resposta do Allow Pay:', response.status, data);
    res.status(response.status).json(data);
  } catch (err) {
    console.error('❌ Erro no fetch do Allow Pay:', err);
    res.status(500).json({ error: 'Erro ao conectar com o Allow Pay' });
  }
});

app.listen(3000, () => console.log('🚀 Servidor rodando em http://localhost:3000'));
