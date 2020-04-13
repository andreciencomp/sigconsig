const conf = require('../../../config');
const PsqlUsuarioSuperDAO = require('./PsqlUsuarioSuperDAO');
const PsqlUsuarioAdmDAO = require('./PsqlUsuarioAdmDAO');
const PsqlUsuarioFinanceiroDAO = require('./PsqlUsuarioFinanceiroDAO');
const PsqlUsuarioCadastroDAO = require('./PsqlUsuarioCadastroDAO');
const PsqlBancoDAO = require('./PsqlBancoDAO');
const PsqlOrgaoDAO = require('./PsqlOrgaoDAO');


class DAOFactory{

    static  async getUsuarioSuperDAO(){
        switch(conf.BANCO_ATUAL){
            case conf.banco.PSQL:
                let dao =  PsqlUsuarioSuperDAO.instancia;
                return   dao;

            default:
                return null;
        }
    }

    static  async getUsuarioAdmDAO(){
        switch(conf.BANCO_ATUAL){
            case conf.banco.PSQL:
                let dao =  await PsqlUsuarioAdmDAO.instancia;
                return   dao;

            default:
                return null;
        }
    }

    static async getUsuarioFinanceiroDAO(){
        switch(conf.BANCO_ATUAL){
            case conf.banco.PSQL:
                let dao = await PsqlUsuarioFinanceiroDAO.instancia;
                return dao;
            default:
                return null;
        }
    }

    static async getUsuarioCadastroDAO(){
        switch(conf.BANCO_ATUAL){
            case conf.banco.PSQL:
                let dao = await PsqlUsuarioCadastroDAO.instancia;
                return dao;
            default:
                return null;
        }
    }

    static async getBancoDAO(){
        switch(conf.BANCO_ATUAL){
            case conf.banco.PSQL:
                let dao = await PsqlBancoDAO.instancia;
                return dao;
            default:
                return null;
        }
    }

    static async getOrgaoDAO(){
        switch(conf.BANCO_ATUAL){
            case conf.banco.PSQL:
                let dao = await PsqlOrgaoDAO.instancia;
                return dao;
            default:
                return null;
        }
    }

    
}

module.exports = DAOFactory;