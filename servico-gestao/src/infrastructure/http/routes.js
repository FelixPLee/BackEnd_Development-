const express = require('express');
const router = express.Router();

// 1. Importar Repositórios
const ClienteRepositorySQLite = require('../database/ClienteRepositorySQLite');
const PlanoRepositorySQLite = require('../database/PlanoRepositorySQLite');
const AssinaturaRepositorySQLite = require('../database/AssinaturaRepositorySQLite');

// 2. Importar Casos de Uso
const ListarClientesUseCase = require('../../application/usecases/ListarClientesUseCase');
const ListarPlanosUseCase = require('../../application/usecases/ListarPlanosUseCase');
const AtualizarCustoPlanoUseCase = require('../../application/usecases/AtualizarCustoPlanoUseCase');

// 3. Importar Controladores
const ClienteController = require('./controllers/ClienteController');
const PlanoController = require('./controllers/PlanoController');
const AssinaturaController = require('./controllers/AssinaturaController');

// 4. Injeção de Dependências (Instanciando)
const clienteRepo = new ClienteRepositorySQLite();
const clienteController = new ClienteController(new ListarClientesUseCase(clienteRepo));

const planoRepo = new PlanoRepositorySQLite();
const planoController = new PlanoController(
    new ListarPlanosUseCase(planoRepo),
    new AtualizarCustoPlanoUseCase(planoRepo)
);

const assinaturaRepo = new AssinaturaRepositorySQLite();
const assinaturaController = new AssinaturaController(assinaturaRepo);

// ==========================================
// 5. MAPEAMENTO DE ENDPOINTS (Padrão Postman)
// ==========================================

// Clientes
router.get('/gerenciaplanos/clientes', (req, res) => clienteController.listar(req, res));

// Planos
router.get('/gerenciaplanos/planos', (req, res) => planoController.listar(req, res));
router.patch('/gerenciaplanos/planos/:idPlano', (req, res) => planoController.atualizarCusto(req, res));

// Assinaturas
router.post('/gerenciaplanos/assinaturas', (req, res) => assinaturaController.criar(req, res));
router.get('/gerenciaplanos/assinaturas/:tipo', (req, res) => assinaturaController.listarPorTipo(req, res));
router.get('/gerenciaplanos/asscli/:codcli', (req, res) => assinaturaController.listarPorCliente(req, res));
router.get('/gerenciaplanos/assinaturaplano/:codplano', (req, res) => assinaturaController.listarPorPlano(req, res));

module.exports = router;