const express = require('express');
const app = express();

app.use(express.json());

// Endpoint de Consulta Rápida de Atividade
app.get('/planosativos/:codass', (req, res) => {
    const { codass } = req.params;

    console.log(`[PlanosAtivos] Verificando status da assinatura ${codass}`);
    const assinaturaAtiva = true;
    return res.status(200).json(assinaturaAtiva);
});

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`✅ ServicoPlanosAtivos rodando na porta ${PORT}`);
});