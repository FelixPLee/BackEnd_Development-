const ICacheAssinaturasRepository = require('../../domain/repositories/ICacheAssinaturasRepository');
const { openDb } = require('./database');

class CacheAssinaturasRepositorySQLite extends ICacheAssinaturasRepository {
    async obterStatus(codass) {
        const db = await openDb();
        
        // Garante que a tabela existe
        await db.run('CREATE TABLE IF NOT EXISTS cache_assinaturas (codass INTEGER PRIMARY KEY, ativa BOOLEAN)');
        
        const resultado = await db.get('SELECT ativa FROM cache_assinaturas WHERE codass = ?', [codass]);
        
        // Se não encontrar na cache, assume-se falso (inativo)
        if (!resultado) return false;
        
        // SQLite não tem booleano nativo, armazena como 1 ou 0. Convertemos de volta.
        return resultado.ativa === 1;
    }

    async atualizarStatus(codass, status) {
        const db = await openDb();
        await db.run('CREATE TABLE IF NOT EXISTS cache_assinaturas (codass INTEGER PRIMARY KEY, ativa BOOLEAN)');
        
        const ativaInt = status ? 1 : 0;
        
        // Insere ou substitui o valor na cache (Upsert)
        await db.run(
            'INSERT INTO cache_assinaturas (codass, ativa) VALUES (?, ?) ON CONFLICT(codass) DO UPDATE SET ativa = excluded.ativa',
            [codass, ativaInt]
        );
    }
}
module.exports = CacheAssinaturasRepositorySQLite;