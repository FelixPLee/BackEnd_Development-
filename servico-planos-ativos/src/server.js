const express = require('express');
const app = express();

app.use(express.json());

// Endpoint de Consulta Rápida de Atividade
app.get('/planosativos/:codass', (req, res) => {
    const { codass } = req.params;

    console.log(`[PlanosAtivos] Verificando status da assinatura ${codass}`);

    // Regra de Negócio: Consultar o cache local (banco em memória ou banco próprio)
    // Para efeito de protótipo inicial, vamos retornar true.
    const assinaturaAtiva = true;

    // Conforme especificado, retorna apenas um booleano
    return res.status(200).json(assinaturaAtiva);
});

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`✅ ServicoPlanosAtivos rodando na porta ${PORT}`);
});