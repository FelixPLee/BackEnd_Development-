const IClienteRepository = require('../../domain/repositories/IClienteRepository');
const { openDb } = require('./database');

class ClienteRepositorySQLite extends IClienteRepository {
    async buscarTodos() {
        const db = await openDb();
        const clientes = await db.all('SELECT * FROM clientes'); // Assume que sua tabela se chama 'clientes'
        return clientes;
    }
}
module.exports = ClienteRepositorySQLite;