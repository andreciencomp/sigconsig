const BDException = require("../publico/src/excessoes/BDException");
const ChaveRepetidaException = require("../publico/src/excessoes/ChaveRepetidaException");
const ComissaoNaoCadastradaException = require("../publico/src/excessoes/ComissaoNaoCadastradaException");
const ComissionamentoInvalidoException = require("../publico/src/excessoes/ComissionamentoInvalidoException");
const DadosInvalidosException = require("../publico/src/excessoes/DadosInvalidosException");
const DadosNulosException = require("../publico/src/excessoes/DadosNulosException");
const EntidadeNaoEncontradaException = require("../publico/src/excessoes/EntidadeNaoEncontrada");
const HeaderNaoEncontradoException = require("../publico/src/excessoes/HeaderNaoEncontradoException");
const LiberacaoNaoPossivelException = require("../publico/src/excessoes/LiberacaoNaoPossivelException");
const MetodoAuthInvalidoException = require("../publico/src/excessoes/MetodoAuthInvalidoException");
const PagamentoJaCadastradoException = require("../publico/src/excessoes/PagamentoJaCadastradoException");
const RestricaoChaveEstrangeiraException = require("../publico/src/excessoes/RestricaoChaveEstrangeiraException");
const SenhaIncorretaException = require("../publico/src/excessoes/SenhaIncorretaException");
const TokenInvalidoException = require("../publico/src/excessoes/TokenInvalidoException");
const TokenNaoEncontradoException = require("../publico/src/excessoes/TokenNaoEncontradoException");
const UsuarioInexistenteException = require("../publico/src/excessoes/UsuarioInexistenteException");
const UsuarioNaoAutenticadoException = require("../publico/src/excessoes/UsuarioNaoAutenticadoException");
const UsuarioNaoAutorizadoException = require("../publico/src/excessoes/UsuarioNaoAutorizadoException");

/* Classe responsável por retornar a mensagem de excessão para a API */
class ExceptionService {

    static checkError(e, res) {
        switch (e.name) {
            case new UsuarioInexistenteException().name:
                return res.status(404).send({ excessao: e.name, msg: e.message });
               
            case new SenhaIncorretaException().name:
                return res.status(401).send({ excessao: e.name, msg: e.message });

            case new UsuarioNaoAutorizadoException().name:
                return res.status(401).send({ excessao: e.name, msg: e.message });

            case new ChaveRepetidaException().name:
                return res.status(400).send({ excessao: e.name, msg: e.message });

            case new DadosNulosException().name:
                return res.status(400).send({ excessao: e.name, msg: e.message });
                
            case new BDException().name:
                return res.status(500).send({ excessao: e.name, msg: e.message });

            case new DadosInvalidosException().name:
                return res.status(400).send({ excessao: e.name, msg: e.message });

            case new HeaderNaoEncontradoException().name:
                return res.status(401).send({ excessao: e.name, msg: e.message });

            case new MetodoAuthInvalidoException().name:
                return res.status(400).send({ excessao: e.name, msg: e.message });

            case new UsuarioNaoAutenticadoException().name:
                return res.status(401).send({ excessao: e.name, msg: e.message });

            case new TokenInvalidoException().name:
                return res.status(401).send({ excessao: e.name, msg: e.message });

            case new EntidadeNaoEncontradaException().name:
                return res.status(404).send({ excessao: e.name, msg: e.message });

            case new TokenNaoEncontradoException().name:
                return res.status(400).send({ excessao: e.name, msg: e.message });

            case new ComissionamentoInvalidoException().name:
                return res.status(400).send({excessao:e.name, msg:e.message});

            case new LiberacaoNaoPossivelException().name:
                return res.status(400).send({excessao:e.name, msg:e.name});

            case new PagamentoJaCadastradoException().name:
                return res.status(400).send({excessao:e.name, msg:e.message});
                
            case new ComissaoNaoCadastradaException().name:
                return res.status(404).send({ excessao: e.name, msg: e.message });

            case new RestricaoChaveEstrangeiraException().name:
                return res.status(400).send({excessao: e.name, msg:e.message});

            default:
                console.log(e);
                return res.status(500).send({ excessao: 'ERRO_DE_SERVIDOR', msg: 'Erro no servidor' });
        }
    }
}

module.exports = ExceptionService;

