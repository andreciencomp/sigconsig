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



}

module.exports = FachadaDados;