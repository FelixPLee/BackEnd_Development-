const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

async function openDb() {
    return open({
        // Ficheiro exclusivo para simular a cache deste microsserviço
        filename: path.resolve(__dirname, '../../../database-cache-planos.sqlite'),
        driver: sqlite3.Database
    });
}

module.exports = { openDb };