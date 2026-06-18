const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

async function openDb() {
    return open({
        // Cria um banco de dados próprio para o Faturamento
        filename: path.resolve(__dirname, '../../../database-faturamento.sqlite'),
        driver: sqlite3.Database
    });
}

module.exports = { openDb };