const FachadaDados = require('../dados/FachadaDados');
const Banco = require('../entidades/Banco');

class GerenciaBancos{

    constructor(){
        this.fachada = FachadaDados.instancia;
    }

    async obterBancoPorCodigo(codigo){
        return await this.fachada.obterBancoPorCodigo(codigo);

    }

    async cadastrarBanco(codigo, nome){
        let banco = new Banco();
        banco.codigo = codigo;
        banco.nome = nome;
        return await this.fachada.salvarBanco(banco);
    }

    async atualizarBanco(campos){
        return await this.fachada.atualizarBanco(campos);
    }

    async listarBancos(){
        return await this.fachada.listarBancos();
    }

    async deletarBanco(id){
        const fachadaDados = new FachadaDados();
        return await fachadaDados.deletarBanco(id);
    }
}

module.exports = GerenciaBancos;