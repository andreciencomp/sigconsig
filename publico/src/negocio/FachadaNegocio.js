
const GerenciaUsuarios = require('../negocio/GerenciaUsuarios');
const GerenciaBancos = require('./GerenciaBancos');
const Banco = require('../entidades/Banco');

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

    async cadastrarBanco(codigo, nome){

        let gerenciaBancos = new GerenciaBancos();
        await gerenciaBancos.cadastrarBanco(codigo, nome);

    }
}

module.exports = FachadaNegocio;