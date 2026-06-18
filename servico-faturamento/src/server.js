const express = require('express');
const routes = require('./infrastructure/http/routes');

const app = express();
app.use(express.json());

app.use('/', routes);

const PORT = 3002; // Porta designada para o ServicoFaturamento
app.listen(PORT, () => {
    console.log(`💰 ServicoFaturamento rodando isoladamente na porta ${PORT}...`);
});