
const GerenciaUsuarios = require('../negocio/GerenciaUsuarios');
const GerenciaBancos = require('./GerenciaBancos');
const Banco = require('../entidades/Banco');
const GerenciaOrgaos = require('./GerenciaOrgaos');

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

    async listarBancos(){

        let gerenciaBancos = new GerenciaBancos();
        return await gerenciaBancos.listarBancos();
    }

    async cadastrarOrgao(sigla, nome){
        let gerenciaOrgaos = new GerenciaOrgaos();
        await gerenciaOrgaos.cadastrarOrgao(sigla, nome);
    }

    async listarOrgaos(){

        let gerenciaOrgaos = new GerenciaOrgaos();
        let orgaos = await gerenciaOrgaos.listarOrgaos();
        return orgaos;
    }
}

module.exports.fachada = new FachadaNegocio();

module.exports = FachadaNegocio;