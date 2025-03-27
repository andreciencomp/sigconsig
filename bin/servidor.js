'use-strict'

const app = require('../app');
const http = require('http');
const porta = process.env.PORTA;
const servidor = http.createServer(app);
servidor.listen(porta);