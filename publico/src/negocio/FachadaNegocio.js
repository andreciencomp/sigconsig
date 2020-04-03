
const GerenciaUsuarios = require('../negocio/GerenciaUsuarios');

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

    cadastrarUsuario(nomeUsuario, senha, tipo){

        return "Não implementado ainda";


    }
}

module.exports = FachadaNegocio;