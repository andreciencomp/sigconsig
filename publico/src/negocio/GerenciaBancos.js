const FachadaDados = require('../dados/FachadaDados');
const ChaveRepetidaException = require('../excessoes/ChaveRepetidaException');

class GerenciaBancos{
    async obterBancoPorCodigo(codigo){
        const fachada = new FachadaDados();
        return await fachada.obterBancoPorCodigo(codigo);

    }

    async cadastrarBanco(banco){
        const fachada = new FachadaDados();
        if(await fachada.existeCodigoDeBanco(banco.codigo)){
            throw new ChaveRepetidaException("Já existe um banco com este código","codigo");
        }
        if(await fachada.existeNomeDeBanco(banco.nome)){
            throw new ChaveRepetidaException("Já existe um banco com este nome","nome");
        }
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