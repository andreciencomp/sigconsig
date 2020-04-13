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
        console.log(banco);
        return  await this.fachada.salvarBanco(banco);
    }

    async listarBancos(){
        
        return await this.fachada.listarBancos();
    }
}

module.exports = GerenciaBancos;