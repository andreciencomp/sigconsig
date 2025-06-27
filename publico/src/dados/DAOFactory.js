const conf = require('../../../config');
const PsqlUsuarioDAO = require('./PsqlUsuarioDAO');
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
const DAOFactoryException = require('../excessoes/DAOFactoryException');

class DAOFactory{

    static getUsuarioDAO(){
        switch(conf.BANCO_ATUAL){
            case conf.banco.PSQL:
                return  new PsqlUsuarioDAO();
            default:
                throw new DAOFactoryException("Banco " + conf.BANCO_ATUAL + " não encontrado");
        }
    }

    static getBancoDAO(){
        switch(conf.BANCO_ATUAL){
            case conf.banco.PSQL:
                return new PsqlBancoDAO();
            default:
                throw new DAOFactoryException("Banco " + conf.BANCO_ATUAL + " não encontrado");
        }
    }

    static getOrgaoDAO(){
        switch(conf.BANCO_ATUAL){
            case conf.banco.PSQL:
                return new PsqlOrgaoDAO();
            default:
                throw new DAOFactoryException("Banco " + conf.BANCO_ATUAL + " não encontrado");
        }
    }

    static getEstadoDAO(){
        switch(conf.BANCO_ATUAL){
            case conf.banco.PSQL:
                return new PsqlEstadoDAO();
            default:
                throw new DAOFactoryException("Banco " + conf.BANCO_ATUAL + " não encontrado");
        }
    }

    static getCidadeDao(){
        switch(conf.BANCO_ATUAL){
            case conf.banco.PSQL:
                return new PsqlCidadeDao();
            default:
                throw new DAOFactoryException("Banco " + conf.BANCO_ATUAL + " não encontrado");
        }
    }

    static getEnderecoDao(){
        switch(conf.BANCO_ATUAL){
            case conf.banco.PSQL:
                return new PsqlEnderecoDAO();
            default:
                throw new DAOFactoryException("Banco " + conf.BANCO_ATUAL + " não encontrado");
        }
    }
    static getContaBancariaDao(){
        switch(conf.BANCO_ATUAL){
            case conf.banco.PSQL:
                return new PsqlContaBancariaDAO();
            default:
                throw new DAOFactoryException("Banco " + conf.BANCO_ATUAL + " não encontrado");
        }
    }

    static getCorretorDao(){
        switch(conf.BANCO_ATUAL){
            case conf.banco.PSQL:
                return new PsqlCorretorDAO();
            default:
                throw new DAOFactoryException("Banco " + conf.BANCO_ATUAL + " não encontrado");
        }
    }

    static getClienteDao(){
        switch(conf.BANCO_ATUAL){
            case conf.banco.PSQL:
                return new PsqlClienteDao();
            default:
                throw new DAOFactoryException("Banco " + conf.BANCO_ATUAL + " não encontrado");
        }
    }

    static getProdutoDAO(){
        switch(conf.BANCO_ATUAL){
            case conf.banco.PSQL:
                return new PsqlProdutoDAO();
            default:
                throw new DAOFactoryException("Banco " + conf.BANCO_ATUAL + " não encontrado");
        }
    }

    static getComissionamentoPromotoraDAO(){
        switch(conf.BANCO_ATUAL){
            case conf.banco.PSQL:
                return new PsqlComissionamentoPromotoraDAO();
            default:
                throw new DAOFactoryException("Banco " + conf.BANCO_ATUAL + " não encontrado");
        }
    }

    static getComissionamentoCorretorDAO(){
        switch(conf.BANCO_ATUAL){
            case conf.banco.PSQL:
                return new PsqlComissionamentoCorretorDAO();
            default:
                throw new DAOFactoryException("Banco " + conf.BANCO_ATUAL + " não encontrado");
        }
    }

    static getContratoDAO(){
        switch(conf.BANCO_ATUAL){
            case conf.banco.PSQL:
                return new PsqlContratoDAO();
            default:
                throw new DAOFactoryException("Banco " + conf.BANCO_ATUAL + " não encontrado");
        }
    }

    static getPagamentoComissaoDAO(){
        switch(conf.BANCO_ATUAL){
            case conf.banco.PSQL:
                return new PsqlPagamentoComissaoDAO();
            default:
                throw new DAOFactoryException("Banco " + conf.BANCO_ATUAL + " não encontrado");
        }
    }
}

module.exports = DAOFactory;