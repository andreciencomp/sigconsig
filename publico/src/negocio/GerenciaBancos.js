const FachadaDados = require('../dados/FachadaDados');
const Banco = require('../entidades/Banco');

class GerenciaBancos{
    async obterBancoPorCodigo(codigo){
        const fachada = new FachadaDados();
        return await fachada.obterBancoPorCodigo(codigo);

    }

    async cadastrarBanco(codigo, nome){
        let banco = new Banco();
        banco.codigo = codigo;
        banco.nome = nome;
        const fachada = new FachadaDados();
        return await fachada.salvarBanco(banco);
    }

    async atualizarBanco(campos){
        const fachada = new FachadaDados();
        return await fachada.atualizarBanco(campos);
    }

    async listarBancos(){
        const fachada = new FachadaDados();
        return await fachada.listarBancos();
    }

    async deletarBanco(id){
        const fachadaDados = new FachadaDados();
        return await fachadaDados.deletarBanco(id);
    }
}

module.exports = GerenciaBancos;