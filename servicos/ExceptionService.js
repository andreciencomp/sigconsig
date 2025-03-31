const BDException = require("../publico/src/excessoes/BDException");
const ChaveRepetidaException = require("../publico/src/excessoes/ChaveRepetidaException");
const DadosInvalidosException = require("../publico/src/excessoes/DadosInvalidosException");
const HeaderNaoEncontradoException = require("../publico/src/excessoes/HeaderNaoEncontradoException");
const MetodoAuthInvalidoException = require("../publico/src/excessoes/MetodoAuthInvalidoException");
const SenhaIncorretaException = require("../publico/src/excessoes/SenhaIncorretaException");
const TokenInvalidoException = require("../publico/src/excessoes/TokenInvalidoException");
const TokenNaoEncontradoException = require("../publico/src/excessoes/TokenNaoEncontradoException");
const UsuarioInexistenteException = require("../publico/src/excessoes/UsuarioInexistenteException");
const UsuarioNaoAutorizadoException = require("../publico/src/excessoes/UsuarioNaoAutorizadoException");

/* Classe responsável por retornar a mensagem de excessão para a API */
class ExceptionService{

    static checkError(e, res){
        switch(e.name){
            case new UsuarioInexistenteException().name:
                res.status(401).send({excessao: e.name, msg: e.message});
                break;

            case new SenhaIncorretaException().name:
                res.status(401).send({excessao: e.name, msg: e.message});
                break;

            case new UsuarioNaoAutorizadoException().name:
                res.status(401).send({excessao: e.name, msg: e.message});
                break;
                

            case new ChaveRepetidaException().name:
                res.status(401).send({excessao:e.name, msg:e.message});
                break;
            
            case new BDException().name:
                res.status(500).send({excessao:e.name,msg:e.message});
                break;

            case new DadosInvalidosException().name:
                res.status(401).send({excessao: e.name, msg: e.message});
                break;

            case new HeaderNaoEncontradoException().name:
                res.status(401).send({excessao: e.name, msg: e.message});
                break;

            case new MetodoAuthInvalidoException().name:
                res.status(400).send({excessao: e.name, msg: e.message});
                break;

            case new UsuarioNaoAutenticadoException().name:
                res.status(401).send({excessao: e.name, msg: e.message});
                break;

            case new TokenInvalidoException().name:
                res.status(401).send({excessao: e.name, msg: e.message});
                break;

            case new TokenNaoEncontradoException().name:
                res.status(400).send({excessao: e.name, msg: e.message});
                break;

            default:
                console.log(e);
                res.status(500).send({excessao:'ERRO_DE_SERVIDOR', msg:'Erro no servidor'});
                break;    
        }
    }
}

module.exports = ExceptionService;

