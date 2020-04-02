'use strict'

const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports.gerarToken= (dado)=>{
    let token = jwt.sign(dado, config.SECURE_KEY, {expiresIn:'1d'});
    return token;
}

module.exports.decodificarToken = (token)=>{

    let dado = jwt.decode(token, config.SECURE_KEY);

}

/*Obtém um objeto de requisição contendo o cabeçalho de autorização
  Basic e retorna um objeto contendo o nome de usuário e senha desse cabeçalho */
module.exports.obterBasicLoginInfo = (request)=>{
    if(!request.headers.authorization){
        return null;
    }
    let credencial64 = request.headers.authorization.split(' ')[1];
    let credencial = Buffer.from(credencial64,'base64').toString('ascii');
    const[nomeUsuario, senha]= credencial.split(':');
    return {nomeUsuario, senha};

}



module.exports.criarPayload = (token=null,dados=null,excessao=null, msg=null)=>{
    return{
        token:token,
        dados:dados,
        excessao:excessao,
        msg:msg
    }
}