const conf = require('../../../config');
const PsqlUsuarioSuperDAO = require('./PsqlUsuarioSuperDAO');
const PsqlUsuarioAdmDAO = require('./PsqlUsuarioAdmDAO');
const PsqlUsuarioFinanceiroDAO = require('./PsqlUsuarioFinanceiroDAO');
const PsqlUsuarioCadastroDAO = require('./PsqlUsuarioCadastroDAO');
const PsqlBancoDAO = require('./PsqlBancoDAO');
const PsqlOrgaoDAO = require('./PsqlOrgaoDAO');
const PsqlEstadoDAO = require('./PsqlEstadoDAO');
const PsqlCidadeDao = require('./PsqlCidadeDAO');
const PsqlEnderecoDAO = require('./PsqlEnderecoDAO');
const PsqlContaBancariaDAO = require('./PsqlContaBancariaDao');
const PsqlCorretorDAO = require('./PsqlCorretorDAO');
const PsqlClienteDao = require('./PsqlClienteDAO');
const PsqlProdutoDAO = require('./PsqlProdutoDAO');
const PsqlComissionamentoPromotoraDAO = require('./PsqlComissionamentoPromotoraDAO');
const PsqlComissionamentoCorretorDAO = require('./PsqlComissionamentoCorretorDAO');
const PsqlContratoDAO = require('./PsqlContratoDAO');
const PsqlPagamentoComissaoDAO = require('./PsqlPagamentoComissaoDAO');

class DAOFactory{

    constructor(){
        
    }

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

    static async getEstadoDAO(){
        switch(conf.BANCO_ATUAL){
            case conf.banco.PSQL:
                let dao = await PsqlEstadoDAO.instancia;
                return dao;
            default:
                return null;
        }
    }

    static async getCidadeDao(){
        switch(conf.BANCO_ATUAL){
            case conf.banco.PSQL:
                let dao = await PsqlCidadeDao.instancia;
                return dao;
            default:
                return null;
        }
    }

    static async getEnderecoDao(){
        switch(conf.BANCO_ATUAL){
            case conf.banco.PSQL:
                let dao = await PsqlEnderecoDAO.instancia;
                return dao;
            default:
                return null;
        }
    }
    static async getContaBancariaDao(){
        switch(conf.BANCO_ATUAL){
            case conf.banco.PSQL:
                let dao = await PsqlContaBancariaDAO.instancia;
                return dao;
            default:
                return null;
        }
    }

    static async getCorretorDao(){
        switch(conf.BANCO_ATUAL){
            case conf.banco.PSQL:
                let dao = await PsqlCorretorDAO.instancia;
                return dao;
            default:
                return null;
        }
    }

    static async getClienteDao(){
        switch(conf.BANCO_ATUAL){
            case conf.banco.PSQL:
                let dao = await PsqlClienteDao.instancia;
                return dao;
            default:
                return null;
        }
    }

    static async getProdutoDAO(){
        switch(conf.BANCO_ATUAL){
            case conf.banco.PSQL:
                let dao = await PsqlProdutoDAO.instancia;
                return dao;
            default:
                return null;
        }
    }

    static async getComissionamentoPromotoraDAO(){
        switch(conf.BANCO_ATUAL){
            case conf.banco.PSQL:
                let dao = await PsqlComissionamentoPromotoraDAO.instancia;
                return dao;
            default:
                return null;
        }
    }

    static async getComissionamentoCorretorDAO(){
        switch(conf.BANCO_ATUAL){
            case conf.banco.PSQL:
                let dao = await PsqlComissionamentoCorretorDAO.getInstancia();
                return dao;
            default:
                return null;
        }
    }

    static async getContratoDAO(){
        switch(conf.BANCO_ATUAL){
            case conf.banco.PSQL:
                let dao = await PsqlContratoDAO.getInstancia();
                return dao;
            default:
                return null;
        }
    }

    static getPagamentoComissaoDAO(){
        switch(conf.BANCO_ATUAL){
            case conf.banco.PSQL:
                let dao = new PsqlPagamentoComissaoDAO();
                return dao;
            default:
                return null;
        }
    }
}

module.exports = DAOFactory;