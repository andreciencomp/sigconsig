const UsuarioSuperDAOFactory = require('./UsuarioSuperDAOFactory');
const UsuarioSuper = require('../entidades/UsuarioSuper');
const PsqlUsuarioDao = require('../dados/PsqlUsuarioSuperDAO');
const DAOFactory = require('./DAOFactory');

class FachadaDados{

    static instancia = new FachadaDados();

    constructor(){
        this.factory = new DAOFactory();
    }

    static getInstancia(){

        if(this.instancia == null){
            this.instancia = new FachadaDados();
            return this.instancia;
        }

        return this.instancia;
    }

    salvarUsuario(usuario){

        console.log("Não implementado ainda");
    }

    async obterUsuarioPorId(id){

        let dao = await this.factory.getUsuarioSuperDAO();  
        let usr;
        usr =  dao.obter(id);
        return usr;
    }

    async obterUsuarioSuperPorNome(nomeUsuario){
        let fac = new DAOFactory()
        const dao = await DAOFactory.getUsuarioSuperDAO();
        let usr = await dao.obterPorNome(nomeUsuario);
        return usr;
    }

    async obterUsuarioAdmPorNome(nomeUsuario){
        //let fac = new DAOFactory();
        const dao = await DAOFactory.getUsuarioAdmDAO();
        let usr = await dao.obterPorNome(nomeUsuario);
        return usr;
    }

    async obterUsuarioFinanceiroPorNome(nomeUsuario){
        //let fac = new DAOFactory();
        const dao = await DAOFactory.getUsuarioFinanceiroDAO();
        let usr = await dao.obterPorNome(nomeUsuario);
        return usr;
    }

    async obterUsuarioCadastroPorNome(nomeUsuario){
        const dao = await DAOFactory.getUsuarioCadastroDAO();
        let usr = await dao.obterPorNome(nomeUsuario);
        return usr;
    }

    async salvarUsuarioSuper(usuario){
        const dao = await DAOFactory.getUsuarioSuperDAO();
        await dao.salvar(usuario);
    }

    async salvarUsuarioAdmin(usuario){
        const dao = await DAOFactory.getUsuarioAdmDAO();
        await dao.salvar(usuario);
    }

    async salvarUsuarioFinanceiro(usuario){
        const dao = await DAOFactory.getUsuarioFinanceiroDAO();
        await dao.salvar(usuario);
    }

    async salvarUsuarioCadastro(usuario){
        const dao = await DAOFactory.getUsuarioCadastroDAO();
        await dao.salvar(usuario);
    }

    async obterBancoPorCodigo(codigo){
        const dao = await DAOFactory.getBancoDAO();
        return await dao.obterPorCodigo(codigo);
    }

}

module.exports = FachadaDados;