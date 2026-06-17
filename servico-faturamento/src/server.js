const express = require('express');
const app = express();

app.use(express.json());

// Endpoint de Registrar Pagamento
app.post('/faturamento/pagamento', (req, res) => {
    const { dia, mes, ano, codass, valorPago } = req.body;
    
    console.log(`[Faturamento] Recebido pagamento de R$${valorPago} para a assinatura ${codass}`);
    
    return res.status(200).json({ 
        mensagem: "Pagamento registrado com sucesso",
        dados: { codass, valorPago }
    });
});

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`💰 ServicoFaturamento rodando na porta ${PORT}`);
});