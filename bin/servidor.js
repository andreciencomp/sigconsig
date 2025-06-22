'use-strict'

const app = require('../app');
const http = require('http');
const porta = process.env.APP_PORTA;
const servidor = http.createServer(app);
servidor.listen(porta);