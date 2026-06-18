const express = require('express');
const routes = require('./infrastructure/http/routes');

const app = express();

// Middleware essencial para ler o JSON enviado pelo Gateway ou Postman
app.use(express.json());

// Vincula a rota POST /registrarpagamento e a injeção do mock de mensageria
app.use('/', routes);

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`💰 ServicoFaturamento ativo e isolado na porta ${PORT}`);
    console.log(`====================================================`);
    console.log(`-> Responsável pela persistência e disparo de eventos.`);
    console.log(`----------------------------------------------------`);
});