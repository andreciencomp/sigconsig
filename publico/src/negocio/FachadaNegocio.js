
const GerenciaUsuarios = require('../negocio/GerenciaUsuarios');
const GerenciaBancos = require('./GerenciaBancos');

class FachadaNegocio{

    static instancia=new FachadaNegocio();

    constructor(){

        this.gerenciaUsuarios = new GerenciaUsuarios();
    }



    async obterUsuarioPorId(id){
        
        let usuario =  await this.gerenciaUsuarios.obterUsuarioPorId(id);
        return  usuario;
    }

    login(nomeUsuario, senha){

        let usuario = this.gerenciaUsuarios.login(nomeUsuario, senha);
        return usuario;
    }

    async cadastrarUsuario(nomeUsuario, senha, tipo){
        
        await this.gerenciaUsuarios.cadastrarUsuario(nomeUsuario,senha,tipo);


    }

    async obterBancoPorCodigo(codigo){

        let gerenciaBancos = await new GerenciaBancos();
        let banco = await gerenciaBancos.obterBancoPorCodigo(codigo);
        return await banco;
    }
}

module.exports = FachadaNegocio;