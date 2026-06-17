const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Roteamento para o Serviço de Gestão (Rodando na porta 3001)
app.use('/gerenciaplanos', createProxyMiddleware({ 
    target: 'http://localhost:3001', 
    changeOrigin: true 
}));

// Roteamento para o Serviço de Faturamento (Rodando na porta 3002)
app.use('/faturamento', createProxyMiddleware({ 
    target: 'http://localhost:3002', 
    changeOrigin: true 
}));

// Roteamento para o Serviço de Planos Ativos (Rodando na porta 3003)
app.use('/planosativos', createProxyMiddleware({ 
    target: 'http://localhost:3003', 
    changeOrigin: true 
}));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 API Gateway rodando na porta ${PORT}`);
    console.log(`-> Roteando /gerenciaplanos para a porta 3001`);
    console.log(`-> Roteando /faturamento para a porta 3002`);
    console.log(`-> Roteando /planosativos para a porta 3003`);
});