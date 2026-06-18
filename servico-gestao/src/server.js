const express = require('express');
// 👇 Caminho corrigido para apontar para o local certo da Arquitetura Limpa
const routes = require('./infrastructure/http/routes'); 

const app = express();

// Middleware essencial para interceptar e ler corpos de requisição JSON (POST/PATCH)
app.use(express.json());

// Acopla os endpoints do serviço de gerenciamento (/gerenciaplanos/*)
app.use('/', routes);

// Porta 3001 designada para liberar a porta 3000 para o API Gateway
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`📶 ServicoGestao (Fase 1) ativo e isolado na porta ${PORT}`);
    console.log(`====================================================`);
    console.log(`-> Endpoints integrados via Clean Architecture.`);
    console.log(`----------------------------------------------------`);
});