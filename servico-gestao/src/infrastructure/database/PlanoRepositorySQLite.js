const IPlanoRepository = require('../../domain/repositories/IPlanoRepository');
const { openDb } = require('./database');

class PlanoRepositorySQLite extends IPlanoRepository {
    async buscarTodos() {
        const db = await openDb();
        const planos = await db.all('SELECT * FROM planos'); // Assume que sua tabela se chama 'planos'
        return planos;
    }
}
module.exports = PlanoRepositorySQLite;