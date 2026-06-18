const express = require('express');
const router = express.Router();

const PagamentoRepositorySQLite = require('../database/PagamentoRepositorySQLite');
const RegistrarPagamentoUseCase = require('../../application/usecases/RegistrarPagamentoUseCase');
const FaturamentoController = require('./controllers/FaturamentoController');

// Simulação de um Message Broker (Event Driven)
const mockEventPublisher = {
    publish: (nomeEvento, payload) => {
        console.log(`[MESSAGE BROKER] Disparando evento: '${nomeEvento}'`);
        console.log(`[MESSAGE BROKER] Payload enviado:`, payload);
        // Futuramente: código real de envio via Axios ou RabbitMQ entraria aqui.
    }
};

// Instanciando classes
const pagamentoRepo = new PagamentoRepositorySQLite();
const registrarPagamentoUC = new RegistrarPagamentoUseCase(pagamentoRepo, mockEventPublisher);
const faturamentoController = new FaturamentoController(registrarPagamentoUC);

// Rota solicitada
router.post('/registrarpagamento', (req, res) => faturamentoController.registrar(req, res));

module.exports = router;