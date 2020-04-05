'use strict'

const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports.gerarToken= (dado)=>{
    let token = jwt.sign(dado, config.SECURE_KEY, {expiresIn:'1d'});
    return token;
}

module.exports.decodificarToken = async (token)=>{

    try{
        let dado = await jwt.decode(token, config.SECURE_KEY);
        return dado;
    }catch(e){
        console.log("Em decodificar");
        throw e;
    }
    

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

module.exports.obterBearerToken = (req)=>{
    if (!req.headers.authorization){
        return null
    }
    let [tipo, token] = req.headers.authorization.split(' ');
    if(tipo != 'Bearer'){
        return null
    }
    return token;
}



module.exports.usuarioSuperFiltro = async (req, res, next)=>{

    
    let token = await this.obterBearerToken(req);
    if(!token){
        res.status(401).send(this.criarPayload(null,null,
            'FORMATO_TOKEN_INVALIDO','Token inválido'));
        return;
    }
    let dado = await this.decodificarToken(token);

    if (!dado){
        res.status(401).send(this.criarPayload(null,null,
            'USUARIO_N_AUTENTICADO','Você não está autenticado'));
    }

    if (dado.tipo != 'USUARIO_SUPER'){

        res.status(401).send(this.criarPayload(null,null,
            'USUARIO_N_AUTORIZADO','Você não tem a permissão para executar a operação'));
        return;
    }

    next();
}

module.exports.usuarioAdminFiltro = async (req, res, next)=>{

    
    let token = await this.obterBearerToken(req);
    if(!token){
        res.status(401).send(this.criarPayload(null,null,
            'FORMATO_TOKEN_INVALIDO','Token inválido'));
        return;
    }
    let dado = await this.decodificarToken(token);

    if (!dado){
        res.status(401).send(this.criarPayload(null,null,
            'USUARIO_N_AUTENTICADO','Você não está autenticado'));
    }
    if (dado.tipo != 'USUARIO_ADMIN' && dado.tipo != 'USUARIO_SUPER'){
        res.status(401).send(this.criarPayload(null,null,
            'USUARIO_N_AUTORIZADO','Você não tem a permissão para executar a operação'));
        return;
    }

    next();
}

module.exports.usuarioFinanceiroFiltro = async (req, res, next)=>{

    
    let token = await this.obterBearerToken(req);
    if(!token){
        res.status(401).send(this.criarPayload(null,null,
            'FORMATO_TOKEN_INVALIDO','Token inválido'));
        return;
    }
    let dado = await this.decodificarToken(token);
    if (!dado){
        res.status(401).send(this.criarPayload(null,null,
            'USUARIO_N_AUTENTICADO','Você não está autenticado'));
    }

    if (dado.tipo!= 'USUARIO_FINACEIRO' &&
            dado.tipo != 'USUARIO_ADMIN' && dado.tipo && 'USUARIO_SUPER'){
        res.status(401).send(this.criarPayload(null,null,
            'USUARIO_N_AUTORIZADO','Você não tem a permissão para executar a operação'));
        return;
    }

    next();
}

module.exports.usuarioCadastroFiltro = async (req, res, next)=>{

    
    let token = await this.obterBearerToken(req);
    if(!token){
        res.status(401).send(this.criarPayload(null,null,
            'FORMATO_TOKEN_INVALIDO','Token inválido'));
        return;
    }
    let dado = await this.decodificarToken(token);
    if (!dado){
        res.status(401).send(this.criarPayload(null,null,
            'USUARIO_N_AUTENTICADO','Você não está autenticado'));
    }
    if (dado.tipo!= 'USUARIO_CADASTRO' && 
            dado.tipo && 'USUARIO_ADMIN' && dado.tipo != 'USUARIO_SUPER'){
        res.status(401).send(this.criarPayload(null,null,
            'USUARIO_N_AUTORIZADO','Você não tem a permissão para executar a operação'));
        return;
    }

    next();
}

module.exports.usuarioAutenticadoFiltro = async (req, res, next)=>{

    
    let token = await this.obterBearerToken(req);
    
    if(!token){
        res.status(401).send(this.criarPayload(null,null,
            'FORMATO_TOKEN_INVALIDO','Token inválido'));
        return;
    }
    
    let dado = await this.decodificarToken(token);
    
    if (!dado){
        res.status(401).send(this.criarPayload(null,null,
            'USUARIO_N_AUTENTICADO','Você não está autenticado'));
        return;
    }

    next();
}