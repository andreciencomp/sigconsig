'use strict'

module.exports.banco = {
    PSQL:1,
    MYSQL:2
};

module.exports.BANCO_ATUAL = 1;

module.exports.POOL_CONFIG = {
    database: process.env.DATABASE_NOME,
    user: process.env.DATABASE_USUARIO,
    password: process.env.DATABASE_SENHA,
    host: 'localhost',
    port: '5432',
};


