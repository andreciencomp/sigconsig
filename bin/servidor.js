'use-strict'

const app = require('../app');
const http = require('http');
const porta = 8080;

const servidor = http.createServer(app);
servidor.listen(porta);