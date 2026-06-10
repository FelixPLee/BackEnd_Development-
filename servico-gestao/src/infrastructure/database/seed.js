const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Conecta ao banco de dados SQLite (criará o arquivo database.sqlite caso não exista)
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

const seedDatabase = () => {
    db.serialize(() => {
        // 1. Criação das Tabelas
        db.run(`CREATE TABLE IF NOT EXISTS clientes (
            codigo INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS planos (
            codigo INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            custoMensal REAL NOT NULL,
            data TEXT NOT NULL,
            descricao TEXT NOT NULL
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS assinaturas (
            codigo INTEGER PRIMARY KEY AUTOINCREMENT,
            codigoCliente INTEGER NOT NULL,
            codigoPlano INTEGER NOT NULL,
            custoFinal REAL NOT NULL,
            descricao TEXT,
            dataInicio TEXT NOT NULL,
            dataFim TEXT,
            status TEXT CHECK(status IN ('ATIVO', 'CANCELADO')) NOT NULL,
            FOREIGN KEY(codigoCliente) REFERENCES clientes(codigo),
            FOREIGN KEY(codigoPlano) REFERENCES planos(codigo)
        )`);

        // 2. Inserção de 10 Clientes
        const insertCliente = db.prepare(`INSERT INTO clientes (nome, email) VALUES (?, ?)`);
        const clientesData = [
            ['Ana Silva', 'ana.silva@email.com'],
            ['Bruno Souza', 'bruno.souza@email.com'],
            ['Carlos Mendes', 'carlos.mendes@email.com'],
            ['Daniela Costa', 'daniela.costa@email.com'],
            ['Eduardo Lima', 'eduardo.lima@email.com'],
            ['Fernanda Alves', 'fernanda.alves@email.com'],
            ['Gustavo Rocha', 'gustavo.rocha@email.com'],
            ['Helena Gomes', 'helena.gomes@email.com'],
            ['Igor Ribeiro', 'igor.ribeiro@email.com'],
            ['Juliana Castro', 'juliana.castro@email.com']
        ];
        clientesData.forEach(cliente => insertCliente.run(cliente));
        insertCliente.finalize();

        // 3. Inserção de 5 Planos
        const insertPlano = db.prepare(`INSERT INTO planos (nome, custoMensal, data, descricao) VALUES (?, ?, ?, ?)`);
        const planosData = [
            ['Fibra 100 Mega', 79.90, '2026-01-10', 'Plano básico de internet fibra ótica.'],
            ['Fibra 300 Mega', 99.90, '2026-01-15', 'Plano intermediário, ideal para streaming.'],
            ['Fibra 500 Mega + TV', 149.90, '2026-02-01', 'Plano avançado com canais de TV inclusos.'],
            ['Fibra 1 Giga', 199.90, '2026-03-20', 'Plano premium de altíssima velocidade.'],
            ['Móvel 50GB', 59.90, '2026-04-05', 'Plano de internet móvel com ligações ilimitadas.']
        ];
        planosData.forEach(plano => insertPlano.run(plano));
        insertPlano.finalize();

        // 4. Inserção de 5 Assinaturas (vinculando Clientes aos Planos)
        const insertAssinatura = db.prepare(`INSERT INTO assinaturas (codigoCliente, codigoPlano, custoFinal, descricao, dataInicio, dataFim, status) VALUES (?, ?, ?, ?, ?, ?, ?)`);
        const assinaturasData = [
            [1, 1, 79.90, 'Assinatura padrão sem descontos', '2026-05-01', null, 'ATIVO'],
            [2, 3, 134.91, 'Desconto de 10% aplicado', '2026-05-15', null, 'ATIVO'],
            [3, 2, 99.90, 'Assinatura padrão sem descontos', '2026-06-01', null, 'ATIVO'],
            [4, 5, 59.90, 'Assinatura padrão sem descontos', '2026-01-10', '2026-06-05', 'CANCELADO'],
            [5, 4, 199.90, 'Assinatura premium empresarial', '2026-06-10', null, 'ATIVO']
        ];
        assinaturasData.forEach(assinatura => insertAssinatura.run(assinatura));
        insertAssinatura.finalize();

        console.log('Banco de dados populado com sucesso (10 clientes, 5 planos, 5 assinaturas).');
    });
};

seedDatabase();

// Fecha a conexão com o banco de forma limpa após a execução
db.close((err) => {
    if (err) {
        console.error('Erro ao fechar o banco de dados:', err.message);
    }
});