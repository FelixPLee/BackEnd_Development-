const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// __dirname está em: servico-gestao/src/infrastructure/database
// Subindo 3 níveis (.. / .. / ..) chegamos em: servico-gestao/
const dbPath = path.resolve(__dirname, '..', '..', '..', 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao conectar ao SQLite:', err.message);
    }
});

module.exports = db;