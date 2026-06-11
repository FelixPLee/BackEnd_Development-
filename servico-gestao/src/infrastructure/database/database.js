const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

// Abre a conexão com o banco database.sqlite na raiz
async function openDb() {
    return open({
        filename: path.resolve(__dirname, '../../../database.sqlite'),
        driver: sqlite3.Database
    });
}

module.exports = { openDb };