const IPagamentoRepository = require('../../domain/repositories/IPagamentoRepository');
const { openDb } = require('./database');

class PagamentoRepositorySQLite extends IPagamentoRepository {
    async salvar(pagamento) {
        const db = await openDb();
        
        // Garante que a tabela existe (simulando uma migration rápida)
        await db.run(`
            CREATE TABLE IF NOT EXISTS pagamentos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                dia INTEGER,
                mes INTEGER,
                ano INTEGER,
                codass INTEGER,
                valorPago REAL
            )
        `);

        // Insere o pagamento
        const result = await db.run(
            'INSERT INTO pagamentos (dia, mes, ano, codass, valorPago) VALUES (?, ?, ?, ?, ?)',
            [pagamento.dia, pagamento.mes, pagamento.ano, pagamento.codass, pagamento.valorPago]
        );

        return { id: result.lastID, ...pagamento };
    }
}
module.exports = PagamentoRepositorySQLite;