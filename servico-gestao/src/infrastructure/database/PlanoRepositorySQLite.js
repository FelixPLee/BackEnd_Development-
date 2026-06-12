const IPlanoRepository = require('../../domain/repositories/IPlanoRepository');
const { openDb } = require('./database');

class PlanoRepositorySQLite extends IPlanoRepository {
    async buscarTodos() {
        const db = await openDb();
        return await db.all('SELECT * FROM planos');
    }

    async atualizarCusto(codigo, novoCusto) {
        const db = await openDb();
        await db.run('UPDATE planos SET custoMensal = ? WHERE codigo = ?', [novoCusto, codigo]);
        return await db.get('SELECT * FROM planos WHERE codigo = ?', [codigo]);
    }
}
module.exports = PlanoRepositorySQLite;