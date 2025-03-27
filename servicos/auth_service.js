'use strict'

const jwt = require('jsonwebtoken');
const config = require('../config');
const ExceptionService = require('./ExceptionService');

module.exports.gerarToken= (dado)=>{
    let token = jwt.sign(dado, config.SECURE_KEY, {expiresIn:'1d'});
    return token;
}

module.exports.decodificarToken = async (token)=>{

    let dado = null;
    await jwt.verify(token,config.SECURE_KEY,async (err, decoded)=>{

    
            if(err){
                throw 'TOKEN_INVALIDO_EXCEPTION';
            }
            dado = decoded;
      

    });
    return dado;
    

}

/*Obtém um objeto de requisição contendo o cabeçalho de autorização
  Basic e retorna um objeto contendo o nome de usuário e senha desse cabeçalho */
module.exports.obterBasicLoginInfo = (request)=>{
    if(!request.headers.authorization){
        throw 'HEADER_N_ENCONTRADO_EXCEPTION';
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
        throw 'TOKEN_N_ENCONTRADO_EXCEPTION';
    }
    let [tipo, token] = req.headers.authorization.split(' ');
    if(tipo != 'Bearer'){
        throw 'METODO_AUTH_INVALIDO_EXCEPTION';
    }
    return token;
};



module.exports.usuarioSuperFiltro = async (req, res, next)=>{
    try{
        let token = await this.obterBearerToken(req);
        let dado = await this.decodificarToken(token);

        if (dado.tipo != 'USUARIO_SUPER'){

            throw 'USUARIO_N_AUTORIZADO_EXCEPTION';
        }
        next();
    
        }catch(e){
            ExceptionService.checkError(e,res);
    
        }

};

module.exports.usuarioAdminFiltro = async (req, res, next)=>{
    try{
        let token = await this.obterBearerToken(req);
        let dado = await this.decodificarToken(token);

        if (dado.tipo != 'USUARIO_ADMIN' || dado.tipo != 'USUARIO_SUPER'){

            throw 'USUARIO_N_AUTORIZADO_EXCEPTION';
        }
        next();
    
        }catch(e){
            ExceptionService.checkError(e,res);
    
        }

};

module.exports.usuarioFinanceiroFiltro = async (req, res, next)=>{
    try{
        let token = await this.obterBearerToken(req);
        let dado = await this.decodificarToken(token);

        if (dado.tipo != 'USUARIO_FINANCEIRO' || dado.tipo != 'USUARIO_SUPER'){

            throw 'USUARIO_N_AUTORIZADO_EXCEPTION';
        }
        next();
    
        }catch(e){
            ExceptionService.checkError(e,res);
    
        }

};

module.exports.usuarioCadastroFiltro = async (req, res, next)=>{
    try{
        let token = await this.obterBearerToken(req);
        let dado = await this.decodificarToken(token);

        if (dado.tipo != 'USUARIO_CADASTRO' || dado.tipo != 'USUARIO_ADMIN' || 
                        dado.tipo != 'USUARIO_SUPER'){

            throw 'USUARIO_N_AUTORIZADO_EXCEPTION';
        }
        next();
    
        }catch(e){
            ExceptionService.checkError(e,res);
    
        }

};

module.exports.usuarioAutenticadoFiltro = async (req, res, next)=>{
    try{
        let token = await this.obterBearerToken(req);
        let dado = await this.decodificarToken(token);
        next();
        
        }catch(e){
            ExceptionService.checkError(e,res);
    
        }

};