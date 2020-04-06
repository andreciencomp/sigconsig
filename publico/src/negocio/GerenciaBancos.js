const FachadaDados = require('../dados/FachadaDados');
class GerenciaBancos{

    constructor(){
        this.fachada = FachadaDados.instancia;
    }



    async obterBancoPorCodigo(codigo){

        return await this.fachada.obterBancoPorCodigo(codigo);

    }
}

module.exports = GerenciaBancos;