const express = require('express');
const { router, cacheRepo } = require('./infrastructure/http/routes');
const ProcessarPagamentoEventoUseCase = require('./application/usecases/ProcessarPagamentoEventoUseCase');

const app = express();

app.use(express.json());

// Rota GET /planosativos/:codass
app.use('/', router);

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`✅ ServicoPlanosAtivos ativo e isolado na porta ${PORT}`);
    console.log(`====================================================`);
    console.log(`-> Cache síncrona otimizada para alta demanda.`);
    console.log(`----------------------------------------------------`);
});

// =========================================================================
// SIMULAÇÃO DO RECEPTOR DE EVENTOS (MESSAGING CONSUMER)
//Instancia o Caso de Uso que sabe como traduzir o evento e atualizar a cache
// =========================================================================
const processarPagamentoUC = new ProcessarPagamentoEventoUseCase(cacheRepo);

global.simularChegadaDeEventoDePagamento = async (dadosPagamento) => {
    console.log(`\n[EVENTO] Evento assíncrono 'PagamentoPlanoServicoPlanosAtivos' recebido.`);
    await processarPagamentoUC.execute(dadosPagamento);
    console.log(`[EVENTO] Cache local SQLite atualizada com sucesso.\n`);
};

// Teste automatizado: 10 segundos após subir o serviço, injeta um evento de pagamento fictício
setTimeout(() => {
    global.simularChegadaDeEventoDePagamento({
        dia: 25,
        mes: 10,
        ano: 2026,
        codass: 5, // Ativa a assinatura ID 5 na tabela do microsserviço
        valorPago: 149.90
    });
}, 10000);