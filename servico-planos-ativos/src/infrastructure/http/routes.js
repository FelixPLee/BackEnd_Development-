const express = require('express');
const router = express.Router();

const CacheAssinaturasRepositorySQLite = require('../database/CacheAssinaturasRepositorySQLite');
const VerificarStatusAssinaturaUseCase = require('../../application/usecases/VerificarStatusAssinaturaUseCase');
const PlanosAtivosController = require('./controllers/PlanosAtivosController');

// Instanciação e Injeção de Dependências
const cacheRepo = new CacheAssinaturasRepositorySQLite();
const verificarStatusUC = new VerificarStatusAssinaturaUseCase(cacheRepo);
const planosAtivosController = new PlanosAtivosController(verificarStatusUC);

// Rota de Consulta da Cache (GET /planosativos/:codass)
router.get('/planosativos/:codass', (req, res) => planosAtivosController.verificar(req, res));

// Exportamos também o repositório para o servidor conseguir injetá-lo no escutador de eventos
module.exports = { router, cacheRepo };