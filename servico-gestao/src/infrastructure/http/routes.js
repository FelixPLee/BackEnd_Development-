const express = require('express');
const router = express.Router();

// Repositórios
const ClienteRepositorySQLite = require('../database/ClienteRepositorySQLite');
const PlanoRepositorySQLite = require('../database/PlanoRepositorySQLite');

// Casos de Uso
const ListarClientesUseCase = require('../../application/usecases/ListarClientesUseCase');
const ListarPlanosUseCase = require('../../application/usecases/ListarPlanosUseCase');

// Controllers
const ClienteController = require('./controllers/ClienteController');
const PlanoController = require('./controllers/PlanoController');

// Instanciando e Injetando Dependências (A Mágica do SOLID)
const clienteRepo = new ClienteRepositorySQLite();
const listarClientesUC = new ListarClientesUseCase(clienteRepo);
const clienteController = new ClienteController(listarClientesUC);

const planoRepo = new PlanoRepositorySQLite();
const listarPlanosUC = new ListarPlanosUseCase(planoRepo);
const planoController = new PlanoController(listarPlanosUC);

// Definindo as Rotas
router.get('/gestao/clientes', (req, res) => clienteController.listar(req, res));
router.get('/gestao/planos', (req, res) => planoController.listar(req, res));

module.exports = router;