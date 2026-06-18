const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// =========================================================================
// 1. MAPEAMENTO DO SERVIÇO DE GESTÃO (Porta 3001)
// =========================================================================
app.use('/gerenciaplanos', createProxyMiddleware({ 
    target: 'http://127.0.0.1:3001', // ⚠️ MUDANÇA CRUCIAL AQUI
    changeOrigin: true 
}));

// =========================================================================
// 2. MAPEAMENTO DO SERVIÇO DE FATURAMENTO (Porta 3002)
// =========================================================================
app.use('/registrarpagamento', createProxyMiddleware({ 
    target: 'http://127.0.0.1:3002', // ⚠️ E AQUI
    changeOrigin: true,
    pathRewrite: {
        '^/registrarpagamento': '/registrarpagamento', 
    }
}));

// =========================================================================
// 3. MAPEAMENTO DO SERVIÇO DE PLANOS ATIVOS (Porta 3003)
// =========================================================================
app.use('/planosativos', createProxyMiddleware({ 
    target: 'http://127.0.0.1:3003', // ⚠️ E AQUI
    changeOrigin: true,
    pathRewrite: {
        '^/planosativos': '/planosativos', 
    }
}));

// Interceptor para vermos no terminal o que está chegando
app.use((req, res, next) => {
    console.log(`[GATEWAY LOG] Requisição recebida para o caminho: ${req.url}`);
    next();
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 API GATEWAY ATUALIZADO E ATIVO NA PORTA ${PORT}`);
    console.log(`====================================================`);
});