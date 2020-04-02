'use strict'

module.exports.banco = {
    PSQL:1,
    MYSQL:2
};

module.exports.BANCO_ATUAL = 1;

module.exports.POOL_CONFIG = {
    database: 'sigconsigdb',
    user: 'postgres',
    password: '12345',
    host: 'localhost',
    port: '5432',
};

module.exports.CONNECTION_POSTGRESQL = 'postgresql://'+
                                        'postgres:12345@localhost:5432/sigconsigdb';
                                        
module.exports.SECURE_KEY = '5bf9dda8d40d49e681281dded03f7225';


