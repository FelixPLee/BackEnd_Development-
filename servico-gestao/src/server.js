const express = require('express');
const routes = require('./infrastructure/http/routes');

const app = express();
app.use(express.json()); // Permite ler JSON no corpo das requisições

// Registra as rotas
app.use('/', routes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`ServicoGestao rodando na porta ${PORT}...`);
    console.log(`Acesse: http://localhost:${PORT}/gestao/clientes`);
    console.log(`Acesse: http://localhost:${PORT}/gestao/planos`);
});