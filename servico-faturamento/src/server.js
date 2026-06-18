const express = require('express');
const { router, cacheRepo } = require('./infrastructure/http/routes');
const ProcessarPagamentoEventoUseCase = require('./application/usecases/ProcessarPagamentoEventoUseCase');

const app = express();
app.use(express.json());

// Liga as rotas HTTP
app.use('/', router);

const PORT = 3003; // Porta designada para o ServicoPlanosAtivos
app.listen(PORT, () => {
    console.log(`✅ ServicoPlanosAtivos rodando na porta ${PORT}`);
});

// ==========================================
// SIMULAÇÃO DO MESSAGE BROKER (EVENT LISTENER)
// ==========================================
// Para testar, foi criado uma função global que pode ser acionada para simular a chegada do evento.

const processarPagamentoUC = new ProcessarPagamentoEventoUseCase(cacheRepo);

global.simularChegadaDeEventoDePagamento = async (dadosPagamento) => {
    console.log(`\n[EVENT LISTENER] Evento 'PagamentoPlanoServicoPlanosAtivos' recebido!`);
    await processarPagamentoUC.execute(dadosPagamento);
    console.log(`[EVENT LISTENER] Cache atualizada com sucesso.\n`);
};

// SIMULAÇÃO PRÁTICA: 10 segundos após ligar o servidor, simulamos que a assinatura 2 foi paga.
setTimeout(() => {
    global.simularChegadaDeEventoDePagamento({
        dia: 25,
        mes: 10,
        ano: 2023,
        codass: 2, // Assinatura ID 2
        valorPago: 100.50
    });
}, 10000);