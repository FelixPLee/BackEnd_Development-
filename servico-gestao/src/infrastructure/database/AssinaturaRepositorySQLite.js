const { openDb } = require('./database');

class AssinaturaRepositorySQLite {
    async criar(assinatura) {
        const db = await openDb();
        
        // 1. Captura a data atual no formato ISO (ex: 2023-10-25)
        const dataHoje = new Date().toISOString().split('T')[0]; 

        // 2. Adicionamos a coluna dataInicio e o seu valor (?) no INSERT
        const result = await db.run(
            'INSERT INTO assinaturas (codigoCliente, codigoPlano, dataInicio, custoFinal, descricao, status) VALUES (?, ?, ?, ?, ?, ?)',
            [
                assinatura.codigoCliente, 
                assinatura.codigoPlano, 
                dataHoje,                 // <- A data gerada entra aqui
                assinatura.custoFinal, 
                assinatura.descricao, 
                'ATIVO'
            ]
        );
        
        // 3. Retornamos o objeto completo incluindo a data gerada
        return { 
            id: result.lastID, 
            dataInicio: dataHoje,
            ...assinatura, 
            status: 'ATIVO' 
        };
    }

    async buscarPorTipo(tipo) {
        const db = await openDb();
        if (tipo === 'TODOS') return await db.all('SELECT * FROM assinaturas');
        return await db.all('SELECT * FROM assinaturas WHERE status = ?', [tipo]);
    }

    async buscarPorCliente(codcli) {
        const db = await openDb();
        return await db.all('SELECT * FROM assinaturas WHERE codigoCliente = ?', [codcli]);
    }

    async buscarPorPlano(codplano) {
        const db = await openDb();
        return await db.all('SELECT * FROM assinaturas WHERE codigoPlano = ?', [codplano]);
    }
}
module.exports = AssinaturaRepositorySQLite;